import { supabase } from '../supabase/supabase.js'

// CREATE - Create a new order
export const createOrder = async (orderData) => {
    try {
      console.log('Creating order with data:', orderData) // Debug log
      
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          retailer_id: orderData.retailer_id,
          created_by: orderData.created_by,
          total_amount: orderData.total_amount
        }])
        .select()
        .single()
  
      if (error) {
        console.error('Supabase error creating order:', error)
        throw error
      }
      
      console.log('Order created successfully:', data) // Debug log
      return { data, error: null }
    } catch (error) {
      console.error('Error creating order:', error)
      return { data: null, error }
    }
  }

// CREATE - Create order items for an order
export const createOrderItems = async (orderId, orderItems) => {
    try {
      console.log('Creating order items for order:', orderId, 'with items:', orderItems) // Debug log
      
      const itemsToInsert = orderItems.map(item => ({
        order_id: orderId,
        item_id: item.item_id,
        quantity: item.quantity,
        total_price: item.unit_price * item.quantity
      }))
  
      const { data, error } = await supabase
        .from('order_items')
        .insert(itemsToInsert)
        .select()
  
      if (error) {
        console.error('Supabase error creating order items:', error)
        throw error
      }
      
      console.log('Order items created successfully:', data) // Debug log
      return { data, error: null }
    } catch (error) {
      console.error('Error creating order items:', error)
      return { data: null, error }
    }
  }

// CREATE - Create complete order with items
export const createCompleteOrder = async (orderData, orderItems) => {
    try {
      // First create the order
      const orderResult = await createOrder(orderData)
      
      if (orderResult.error || !orderResult.data) {
        console.error('Error creating order:', orderResult.error)
        return { data: null, error: orderResult.error || 'Failed to create order' }
      }
  
      // Then create the order items
      const itemsResult = await createOrderItems(orderResult.data.order_id, orderItems)
      
      if (itemsResult.error || !itemsResult.data) {
        console.error('Error creating order items:', itemsResult.error)
        return { data: null, error: itemsResult.error || 'Failed to create order items' }
      }
  
      return { 
        data: { 
          order: orderResult.data, 
          items: itemsResult.data 
        }, 
        error: null 
      }
    } catch (error) {
      console.error('Error creating complete order:', error)
      return { data: null, error }
    }
  }

// READ - Get all orders with details
export const getAllOrders = async () => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          order_item_id,
          quantity,
          total_price,
          items (
            item_id,
            name,
            unit_price,
            image_url
          )
        )
      `)
      .order('order_id', { ascending: true })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching orders:', error)
    return { data: null, error }
  }
}

// READ - Get order by ID with items
export const getOrderById = async (orderId) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          order_item_id,
          quantity,
          total_price,
          items (
            item_id,
            name,
            unit_price,
            image_url
          )
        )
      `)
      .eq('order_id', orderId)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching order:', error)
    return { data: null, error }
  }
}

// READ - Get orders by status (pending, approved, billed)
export const getOrdersByStatus = async (status) => {
  try {
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items (
          order_item_id,
          quantity,
          total_price,
          items (
            item_id,
            name,
            unit_price,
            image_url
          )
        )
      `)

    if (status === 'pending') {
      query = query.is('approved_by', null)
    } else if (status === 'approved') {
      query = query.not('approved_by', 'is', null).is('billed_by', null)
    } else if (status === 'billed') {
      query = query.not('billed_by', 'is', null)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching orders by status:', error)
    return { data: null, error }
  }
}

// UPDATE - Approve order (set approved_by)
export const approveOrder = async (orderId, approvedBy) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ approved_by: approvedBy })
      .eq('order_id', orderId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error approving order:', error)
    return { data: null, error }
  }
}

// UPDATE - Bill order (set billed_by)
export const billOrder = async (orderId, billedBy) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ billed_by: billedBy })
      .eq('order_id', orderId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error billing order:', error)
    return { data: null, error }
  }
}

// UPDATE - Update order total amount
export const updateOrderTotal = async (orderId, totalAmount) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ total_amount: totalAmount })
      .eq('order_id', orderId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating order total:', error)
    return { data: null, error }
  }
}

// DELETE - Delete order and its items
export const deleteOrder = async (orderId) => {
  try {
    // First delete order items
    const { error: itemsError } = await supabase
      .from('order_items')
      .delete()
      .eq('order_id', orderId)

    if (itemsError) throw itemsError

    // Then delete the order
    const { error: orderError } = await supabase
      .from('orders')
      .delete()
      .eq('order_id', orderId)

    if (orderError) throw orderError

    return { data: { success: true }, error: null }
  } catch (error) {
    console.error('Error deleting order:', error)
    return { data: null, error }
  }
}

// ANALYTICS FUNCTIONS

// Get order statistics
export const getOrderStats = async () => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('total_amount, created_at, approved_by, billed_by')

    if (error) throw error

    const stats = data.reduce((acc, order) => {
      acc.totalOrders += 1
      acc.totalRevenue += order.total_amount || 0
      
      if (!order.approved_by) {
        acc.pendingOrders += 1
      } else if (!order.billed_by) {
        acc.approvedOrders += 1
      } else {
        acc.billedOrders += 1
      }
      
      return acc
    }, {
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      approvedOrders: 0,
      billedOrders: 0
    })

    return { data: stats, error: null }
  } catch (error) {
    console.error('Error fetching order stats:', error)
    return { data: null, error }
  }
}

// Get orders by date range
export const getOrdersByDateRange = async (startDate, endDate) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          order_item_id,
          quantity,
          total_price,
          items (
            item_id,
            name,
            unit_price,
            image_url
          )
        )
      `)
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching orders by date range:', error)
    return { data: null, error }
  }
}