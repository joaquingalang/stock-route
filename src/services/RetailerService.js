import { supabase } from '../supabase/supabase.js'

// READ - Get all retailers
export const getAllRetailers = async () => {
  try {
    const { data, error } = await supabase
      .from('retailers')
      .select('*')
      .order('retailer_id', { ascending: true })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching retailers:', error)
    return { data: null, error }
  }
}

// READ - Get retailer by ID
export const getRetailerById = async (retailerId) => {
  try {
    const { data, error } = await supabase
      .from('retailers')
      .select('*')
      .eq('retailer_id', retailerId)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching retailer:', error)
    return { data: null, error }
  }
}