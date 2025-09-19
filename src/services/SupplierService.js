import { supabase } from '../supabase/supabase.js'

// READ - Get all suppliers
export const getAllSuppliers = async () => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('supplier_id', { ascending: true })
  
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching suppliers:', error)
      return { data: null, error }
    }
  }