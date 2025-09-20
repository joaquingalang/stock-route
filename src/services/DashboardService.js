import { supabase } from '../supabase/supabase.js'

// Get dashboard metrics
export const getDashboardMetrics = async () => {
  try {
    // New Orders = count of orders that was not approved by Team Lead (approved_by is null)
    const { count: newOrdersCount, error: newOrdersError } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .is('approved_by', null)

    if (newOrdersError) throw newOrdersError

    // Total Orders = count of all orders
    const { count: totalOrdersCount, error: totalOrdersError } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })

    if (totalOrdersError) throw totalOrdersError

    // In Progress = orders that are not yet shipped (isShipped is False, isCancelled is False, isRejected is false)
    const { count: inProgressCount, error: inProgressError } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('isShipped', false)
      .eq('isCancelled', false)
      .eq('isRejected', false)

    if (inProgressError) throw inProgressError

    return {
      data: {
        newOrders: newOrdersCount || 0,
        totalOrders: totalOrdersCount || 0,
        inProgress: inProgressCount || 0
      },
      error: null
    }
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error)
    return { data: null, error }
  }
}

// Helper function to determine order status (same logic as OrdersPage)
const getOrderStatus = (order) => {
  if (order.isRejected) {
    return "rejected"; // Rejected - red color
  }
  if (order.isCancelled) {
    return "cancelled"; // Cancelled - light red color
  }
  if (order.isShipped) {
    return "shipped"; // Shipped - dark green color
  }
  if (order.billed_by && !order.isRejected && !order.isCancelled) {
    return "paid"; // Paid - blue color
  }
  if (order.approved_by && !order.isRejected && !order.isCancelled) {
    return "ready"; // Approved - green color
  }
  if (!order.approved_by && !order.isRejected) {
    return "progress"; // Waiting for approval - yellow color
  }
  return "progress"; // Default fallback
}

// Get order list (recent orders) - only show In Progress, Ready, and Paid
export const getOrderList = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          quantity,
          items:item_id (
            name
          )
        ),
        retailers:retailer_id (
          name
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Transform data to match expected format and filter for specific statuses
    const transformedData = data
      .map(order => {
        // Calculate total items across all order items for this order
        const totalItems = order.order_items?.reduce((sum, item) => sum + item.quantity, 0) || 0
        
        // Use retailer name as display name
        const displayName = order.retailers?.name || 'Unknown Retailer'
        
        // Use the same status logic as OrdersPage
        const status = getOrderStatus(order)

        return {
          id: order.order_id,
          name: displayName, // Now shows retailer name instead of product name
          quantity: totalItems, // Total items across all products in the order
          status: status,
          retailer: order.retailers?.name || 'Unknown Retailer'
        }
      })
      .filter(order => {
        // Only show orders with these statuses: progress, ready, paid
        return ['progress', 'ready', 'paid'].includes(order.status)
      })
      .slice(0, limit) // Apply limit after filtering

    return { data: transformedData, error: null }
  } catch (error) {
    console.error('Error fetching order list:', error)
    return { data: null, error }
  }
}

// Get payment list (orders that have been approved but not paid)
export const getPaymentList = async () => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          quantity,
          items:item_id (
            name
          )
        ),
        retailers:retailer_id (
          name
        )
      `)
      .not('approved_by', 'is', null)
      .is('billed_by', null)
      .eq('isRejected', false)
      .eq('isCancelled', false)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Transform data to match expected format for PaymentTile
    const transformedData = data.map(order => {
      // Use retailer name as the display name
      const displayName = order.retailers?.name || 'Unknown Retailer'
      
      // Use the same status logic as OrdersPage
      const status = getOrderStatus(order)
      
      return {
        id: order.order_id, // order_id as id
        name: displayName, // retailer name as name
        cost: order.total_amount || 0, // total_amount as cost
        orderId: `ORD-${order.order_id}`,
        retailer: order.retailers?.name || 'Unknown Retailer',
        status: status
      }
    })

    return { data: transformedData, error: null }
  } catch (error) {
    console.error('Error fetching payment list:', error)
    return { data: null, error }
  }
}

// Get top 3 popular products based on order count
export const getPopularProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('order_items')
      .select(`
        item_id,
        items:item_id (
          name,
          image_url
        )
      `)

    if (error) throw error

    // Count occurrences of each item
    const itemCounts = {}
    data.forEach(item => {
      const itemId = item.item_id
      if (itemCounts[itemId]) {
        itemCounts[itemId].count++
      } else {
        itemCounts[itemId] = {
          id: itemId,
          name: item.items?.name || 'Unknown Product',
          image_url: item.items?.image_url || null,
          count: 1
        }
      }
    })

    // Sort by count and get top 3
    const popularProducts = Object.values(itemCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)

    return { data: popularProducts, error: null }
  } catch (error) {
    console.error('Error fetching popular products:', error)
    return { data: null, error }
  }
}

// Get out of stock items
export const getOutOfStockItems = async () => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('item_id, name, image_url, updated_at, created_at')
      .eq('stock_quantity', 0)
      .order('name', { ascending: true })

    if (error) throw error

    return { data: data || [], error: null }
  } catch (error) {
    console.error('Error fetching out of stock items:', error)
    return { data: null, error }
  }
}