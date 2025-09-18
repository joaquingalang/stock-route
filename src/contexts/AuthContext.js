import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase/supabase.js'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserData(session.user)
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserData(session.user)
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserData = async (authUser) => {
    try {
      // Fetch user data with role information
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select(`
          *,
          roles:role_id (
            role_id,
            role_title
          )
        `)
        .eq('user_id', authUser.id)
        .single()
      
      if (userData) {
        setUser({ ...authUser, userData })
      } else {
        setUser(authUser)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      setUser(authUser)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password, selectedRole) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (data?.user) {
      // Fetch user data with role information
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select(`
          *,
          roles:role_id (
            role_id,
            role_title
          )
        `)
        .eq('user_id', data.user.id)
        .single()
      
      if (userData) {
        // Determine actual role based on role_id
        const actualRole = userData.role_id === 1 ? 'user' : 'admin'
        
        // Validate role selection
        if (selectedRole !== actualRole) {
          await supabase.auth.signOut()
          return { 
            data: null, 
            error: { 
              message: `Invalid role. This account is registered as ${actualRole}, not ${selectedRole}.` 
            } 
          }
        }
        
        setUser({ ...data.user, userData })
        return { data: { ...data, userData }, error: null }
      } else {
        await supabase.auth.signOut()
        return { 
          data: null, 
          error: { 
            message: 'User not found in database. Please contact administrator.' 
          } 
        }
      }
    }
    
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setUser(null) 
    }
    return { error }
  }

  const value = {
    user,
    loading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}