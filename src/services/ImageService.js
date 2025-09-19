import { supabase } from '../supabase/supabase.js'

// Upload image to Supabase Storage
export const uploadImage = async (file) => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

    // Upload file to Supabase Storage (no folder, just the filename)
    const { data, error } = await supabase.storage
      .from('item_images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    // Get public URL
    const { data: publicData } = supabase.storage
      .from('item_images')
      .getPublicUrl(fileName)

    return { 
      data: { 
        path: fileName, 
        publicUrl: publicData.publicUrl 
      }, 
      error: null 
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    return { data: null, error }
  }
}

// Delete image from Supabase Storage
export const deleteImage = async (filePath) => {
  try {
    const { error } = await supabase.storage
      .from('item_images')
      .remove([filePath])

    if (error) throw error
    return { data: { success: true }, error: null }
  } catch (error) {
    console.error('Error deleting image:', error)
    return { data: null, error }
  }
}