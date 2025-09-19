import { supabase } from '../supabase/supabase.js'

// READ - Get all categories
export const getAllCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('category_id', { ascending: true })
  
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching suppliers:', error)
      return { data: null, error }
    }
  }