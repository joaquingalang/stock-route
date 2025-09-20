import { supabase } from '../supabase/supabase.js'

// INBOUND DATA - Get all procurement orders (inbound data)
export const getInboundData = async () => {
  try {
    const { data, error } = await supabase
      .from('procurement_orders')
      .select(`
        *,
        items:item_id (
          item_id,
          name,
          unit_price
        ),
        suppliers:supplier_id (
          supplier_id,
          supplier_name
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Transform data to match the expected format
    const transformedData = data.map(order => ({
        po_id: order.po_id,
        supplier_id: order.supplier_id,
        supplier_name: order.suppliers?.supplier_name || 'Unknown Supplier',
        product_id: order.item_id,
        product_name: order.items?.name || 'Unknown Product',
        order_qty: order.ordered_quantity,
        received_qty: order.received_quantity,
        damaged: order.damaged_items || 0,
        missing: order.missing_items || 0,
        rejected: order.rejected_items || 0,
        net_qty: order.net_quantity,
        created_at: order.created_at
    }))

    return { data: transformedData, error: null }
  } catch (error) {
    console.error('Error fetching inbound data:', error)
    return { data: null, error }
  }
}

// OUTBOUND DATA - Get paid orders (where billed_by is not empty)
export const getOutboundData = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            items:item_id (
              item_id,
              name
            )
          ),
          retailers:retailer_id (
            retailer_id,
            name
          )
        `)
        .not('billed_by', 'is', null)
        .order('order_id', { ascending: true })
  
      if (error) throw error
  
      // Transform data to match the expected format
      const transformedData = data.flatMap(order => 
        order.order_items.map(item => ({
          order_item_id: item.order_item_id,
          order_id: order.order_id,
          retailer_name: order.retailers?.name || 'Unknown Customer',
          product_name: item.items?.name || 'Unknown Product',
          order_qty: item.quantity,
          status: order.isShipped ? 'Shipped' : 'Paid',
          created_at: order.created_at
        }))
      )
  
      return { data: transformedData, error: null }
    } catch (error) {
      console.error('Error fetching outbound data:', error)
      return { data: null, error }
    }
  }

// STOCK DATA - Get current inventory from items table
export const getStockData = async () => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select(`
        *,
        categories:category_id (
          category_id,
          name
        )
      `)
      .order('name', { ascending: true })

    if (error) throw error

    // Transform data to match the expected format
    const transformedData = data.map(item => ({
      product_id: item.item_id,
      product_name: item.name,
      available_stock: item.stock_quantity,
      last_updated: item.updated_at || item.created_at
    }))

    return { data: transformedData, error: null }
  } catch (error) {
    console.error('Error fetching stock data:', error)
    return { data: null, error }
  }
}

// UPDATE INBOUND DATA - Update procurement order
export const updateInboundData = async (poId, itemId, updateData) => {
    try {
      // Validate data before updating
      if (updateData.received_qty > updateData.order_qty) {
        throw new Error('Received quantity cannot exceed order quantity');
      }
  
      if (updateData.damaged > updateData.received_qty) {
        throw new Error('Damaged quantity cannot exceed received quantity');
      }
  
      if (updateData.received_qty < 0 || updateData.damaged < 0 || updateData.order_qty < 0) {
        throw new Error('Quantities cannot be negative');
      }
  
      // First, get the current procurement order to compare values
      const { data: currentOrder, error: fetchError } = await supabase
        .from('procurement_orders')
        .select('net_quantity')
        .eq('po_id', poId)
        .eq('item_id', itemId)
        .single()
  
      if (fetchError) {
        console.error('Error fetching current procurement order:', fetchError)
        throw fetchError
      }
  
      // Update the procurement order
      const newNetQuantity = updateData.net_qty
      const stockDifference = newNetQuantity - currentOrder.net_quantity
  
      const { data, error } = await supabase
        .from('procurement_orders')
        .update({
          received_quantity: updateData.received_qty,
          damaged_items: updateData.damaged,
          missing_items: updateData.missing,
          net_quantity: newNetQuantity
        })
        .eq('po_id', poId)
        .eq('item_id', itemId)
        .select()
        .single()
  
      if (error) throw error
  
      // Update the stock quantity in the items table
      if (stockDifference !== 0) {
        const { data: currentItem, error: itemError } = await supabase
          .from('items')
          .select('stock_quantity')
          .eq('item_id', itemId)
          .single()
  
        if (itemError) {
          console.error('Error fetching current item stock:', itemError)
          // Still return success for procurement order update
          return { data, error: null }
        }
  
        // Calculate new stock quantity
        const newStockQuantity = currentItem.stock_quantity + stockDifference
  
        // Update the items table with new stock quantity
        const { error: updateError } = await supabase
          .from('items')
          .update({ stock_quantity: newStockQuantity })
          .eq('item_id', itemId)
  
        if (updateError) {
          console.error('Error updating item stock:', updateError)
          // Still return success for procurement order update
          return { data, error: null }
        }
  
        console.log(`Updated stock for item ${itemId}: ${currentItem.stock_quantity} + ${stockDifference} = ${newStockQuantity}`)
      }
  
      return { data, error: null }
    } catch (error) {
      console.error('Error updating inbound data:', error)
      return { data: null, error }
    }
  }

// CREATE NEW PROCUREMENT ORDER
export const createProcurementOrder = async (procurementData) => {
    try {
      // Validate data before creating
      if (procurementData.received_qty > procurementData.order_qty) {
        throw new Error('Received quantity cannot exceed order quantity');
      }
  
      if (procurementData.damaged > procurementData.received_qty) {
        throw new Error('Damaged quantity cannot exceed received quantity');
      }
  
      if (procurementData.received_qty < 0 || procurementData.damaged < 0 || procurementData.order_qty <= 0) {
        throw new Error('Invalid quantity values');
      }
  
      if (!procurementData.supplier_id) {
        throw new Error('Supplier is required');
      }
  
      if (!procurementData.product_id) {
        throw new Error('Product is required');
      }
  
      // First, create the procurement order
      const { data, error } = await supabase
        .from('procurement_orders')
        .insert([{
          item_id: procurementData.product_id,
          supplier_id: procurementData.supplier_id,
          ordered_quantity: procurementData.order_qty,
          received_quantity: procurementData.received_qty,
          damaged_items: procurementData.damaged,
          missing_items: procurementData.missing,
          net_quantity: procurementData.net_qty,
          created_by: procurementData.created_by
        }])
        .select()
        .single()
  
      if (error) throw error
  
      // Then, update the stock quantity in the items table
      const { data: currentItem, error: itemError } = await supabase
        .from('items')
        .select('stock_quantity')
        .eq('item_id', procurementData.product_id)
        .single()
  
      if (itemError) {
        console.error('Error fetching current item stock:', itemError)
        // Still return success for procurement order creation
        return { data, error: null }
      }
  
      // Calculate new stock quantity
      const newStockQuantity = currentItem.stock_quantity + procurementData.net_qty
  
      // Update the items table with new stock quantity
      const { error: updateError } = await supabase
        .from('items')
        .update({ stock_quantity: newStockQuantity })
        .eq('item_id', procurementData.product_id)
  
      if (updateError) {
        console.error('Error updating item stock:', updateError)
        // Still return success for procurement order creation
        return { data, error: null }
      }
  
      console.log(`Updated stock for item ${procurementData.product_id}: ${currentItem.stock_quantity} + ${procurementData.net_qty} = ${newStockQuantity}`)
      
      return { data, error: null }
    } catch (error) {
      console.error('Error creating procurement order:', error)
      return { data: null, error }
    }
  }

// GET SUPPLIERS for dropdown
export const getSuppliers = async () => {
  try {
    const { data, error } = await supabase
      .from('suppliers')
      .select('supplier_id, supplier_name')
      .order('supplier_name', { ascending: true })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching suppliers:', error)
    return { data: null, error }
  }
}

// GET ITEMS for dropdown
export const getItems = async () => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('item_id, name, unit_price')
      .order('name', { ascending: true })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching items:', error)
    return { data: null, error }
  }
}

export const getItemsBySupplier = async (supplierId) => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('item_id, name, unit_price')
        .eq('supplier_id', supplierId)
        .order('name', { ascending: true })
  
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching items by supplier:', error)
      return { data: null, error }
    }
  }

// UPDATE ORDER SHIPPING STATUS
export const updateOrderShippingStatus = async (orderId) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ isShipped: true })
        .eq('order_id', orderId)
        .select()
        .single()
  
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating order shipping status:', error)
      return { data: null, error }
    }
  }