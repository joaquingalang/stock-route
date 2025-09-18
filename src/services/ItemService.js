// src/services/itemService.js
import { supabase } from '../supabase/supabase.js'

// CREATE - Add a new item
export const createItem = async (itemData) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .insert([{
        name: itemData.name,
        description: itemData.description,
        unit_price: itemData.unit_price,
        stock_quantity: itemData.stock_quantity,
        category_id: itemData.category_id
      }])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating item:', error)
    return { data: null, error }
  }
}

// READ - Get all items with category information
export const getAllItems = async () => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select(`
        *,
        categories:category_id (
          category_id,
          category_name
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching items:', error)
    return { data: null, error }
  }
}

// READ - Get a single item by ID
export const getItemById = async (itemId) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select(`
        *,
        categories:category_id (
          category_id,
          category_name
        )
      `)
      .eq('item_id', itemId)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching item:', error)
    return { data: null, error }
  }
}

// READ - Get items by category
export const getItemsByCategory = async (categoryId) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select(`
        *,
        categories:category_id (
          category_id,
          category_name
        )
      `)
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching items by category:', error)
    return { data: null, error }
  }
}

// READ - Search items by name or description
export const searchItems = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select(`
        *,
        categories:category_id (
          category_id,
          category_name
        )
      `)
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error searching items:', error)
    return { data: null, error }
  }
}

// READ - Get low stock items (quantity below threshold)
export const getLowStockItems = async (threshold = 10) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select(`
        *,
        categories:category_id (
          category_id,
          category_name
        )
      `)
      .lt('stock_quantity', threshold)
      .order('stock_quantity', { ascending: true })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching low stock items:', error)
    return { data: null, error }
  }
}

// READ - Get out of stock items
export const getOutOfStockItems = async () => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select(`
        *,
        categories:category_id (
          category_id,
          category_name
        )
      `)
      .eq('stock_quantity', 0)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching out of stock items:', error)
    return { data: null, error }
  }
}

// UPDATE - Update an item
export const updateItem = async (itemId, updateData) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .update({
        name: updateData.name,
        description: updateData.description,
        unit_price: updateData.unit_price,
        stock_quantity: updateData.stock_quantity,
        category_id: updateData.category_id
      })
      .eq('item_id', itemId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating item:', error)
    return { data: null, error }
  }
}

// UPDATE - Update stock quantity only
export const updateStockQuantity = async (itemId, newQuantity) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .update({ stock_quantity: newQuantity })
      .eq('item_id', itemId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating stock quantity:', error)
    return { data: null, error }
  }
}

// UPDATE - Adjust stock quantity (add or subtract)
export const adjustStockQuantity = async (itemId, adjustment) => {
  try {
    // First get current quantity
    const { data: currentItem, error: fetchError } = await supabase
      .from('items')
      .select('stock_quantity')
      .eq('item_id', itemId)
      .single()

    if (fetchError) throw fetchError

    const newQuantity = currentItem.stock_quantity + adjustment
    
    // Ensure quantity doesn't go below 0
    const finalQuantity = Math.max(0, newQuantity)

    const { data, error } = await supabase
      .from('items')
      .update({ stock_quantity: finalQuantity })
      .eq('item_id', itemId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error adjusting stock quantity:', error)
    return { data: null, error }
  }
}

// DELETE - Delete an item
export const deleteItem = async (itemId) => {
  try {
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('item_id', itemId)

    if (error) throw error
    return { data: { success: true }, error: null }
  } catch (error) {
    console.error('Error deleting item:', error)
    return { data: null, error }
  }
}

// BULK OPERATIONS

// BULK UPDATE - Update multiple items
export const bulkUpdateItems = async (updates) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .upsert(updates)
      .select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error bulk updating items:', error)
    return { data: null, error }
  }
}

// BULK DELETE - Delete multiple items
export const bulkDeleteItems = async (itemIds) => {
  try {
    const { error } = await supabase
      .from('items')
      .delete()
      .in('item_id', itemIds)

    if (error) throw error
    return { data: { success: true, deletedCount: itemIds.length }, error: null }
  } catch (error) {
    console.error('Error bulk deleting items:', error)
    return { data: null, error }
  }
}

// ANALYTICS FUNCTIONS

// Get popular products (most sold - you'll need to implement this based on your orders table)
export const getPopularProducts = async (limit = 10) => {
  try {
    // This is a placeholder - you'll need to join with your orders/order_items table
    const { data, error } = await supabase
      .from('items')
      .select(`
        *,
        categories:category_id (
          category_id,
          category_name
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching popular products:', error)
    return { data: null, error }
  }
}

// Get inventory summary
export const getInventorySummary = async () => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('stock_quantity, unit_price')

    if (error) throw error

    const summary = data.reduce((acc, item) => {
      acc.totalItems += 1
      acc.totalQuantity += item.stock_quantity
      acc.totalValue += item.stock_quantity * item.unit_price
      if (item.stock_quantity === 0) acc.outOfStock += 1
      if (item.stock_quantity < 10) acc.lowStock += 1
      return acc
    }, {
      totalItems: 0,
      totalQuantity: 0,
      totalValue: 0,
      outOfStock: 0,
      lowStock: 0
    })

    return { data: summary, error: null }
  } catch (error) {
    console.error('Error fetching inventory summary:', error)
    return { data: null, error }
  }
}