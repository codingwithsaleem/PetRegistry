import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/lib/services/types'

/**
 * User State Interface
 * Defines the shape of the user state in Redux store
 */
export interface UserState {
  // Current authenticated user information
  user: User | null
  
  // Authentication status
  isAuthenticated: boolean
  
  // JWT tokens for API authentication
  tokens: {
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: string | null
    refreshTokenExpiresAt: string | null
  }
  
  // Loading state for async operations
  isLoading: boolean
  
  // Error message for failed operations
  error: string | null
}

/**
 * Initial State
 * Default values for user state
 */
const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  tokens: {
    accessToken: null,
    refreshToken: null,
    accessTokenExpiresAt: null,
    refreshTokenExpiresAt: null,
  },
  isLoading: false,
  error: null,
}

/**
 * User Slice
 * Redux Toolkit slice for user state management
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Set loading state
     * Used to show loading indicators during async operations
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      // Clear error when starting new operation
      if (action.payload) {
        state.error = null
      }
    },

    /**
     * Set error message
     * Used to display error messages to user
     */
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },

    /**
     * Clear error message
     * Used to reset error state
     */
    clearError: (state) => {
      state.error = null
    },

    /**
     * Login Success
     * Saves user data and tokens after successful login
     */
    loginSuccess: (state, action: PayloadAction<{
      user: User
      tokens: {
        accessToken: string
        refreshToken: string
        accessTokenExpiresAt: string
        refreshTokenExpiresAt: string
      }
    }>) => {
      const { user, tokens } = action.payload
      
      state.user = user
      state.isAuthenticated = true
      state.tokens = tokens
      state.isLoading = false
      state.error = null

      // Store in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('accessToken', tokens.accessToken)
        localStorage.setItem('refreshToken', tokens.refreshToken)
      }
    },

    /**
     * Update tokens after refresh
     * Updates stored tokens without changing user data
     */
    updateTokens: (state, action: PayloadAction<{
      accessToken: string
      refreshToken: string
      accessTokenExpiresAt: string
      refreshTokenExpiresAt: string
    }>) => {
      state.tokens = action.payload

      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', action.payload.accessToken)
        localStorage.setItem('refreshToken', action.payload.refreshToken)
      }
    },

    /**
     * Update user information
     * Updates current user data (e.g., after profile update)
     */
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload

      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload))
      }
    },

    /**
     * Logout
     * Clears all user data and authentication state
     */
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.tokens = {
        accessToken: null,
        refreshToken: null,
        accessTokenExpiresAt: null,
        refreshTokenExpiresAt: null,
      }
      state.isLoading = false
      state.error = null

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
      }
    },

    /**
     * Restore user from storage
     * Used to restore user state from localStorage on app load
     */
    restoreUser: (state) => {
      if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem('user')
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')

        if (userStr && accessToken && refreshToken) {
          try {
            const user = JSON.parse(userStr)
            state.user = user
            state.isAuthenticated = true
            state.tokens.accessToken = accessToken
            state.tokens.refreshToken = refreshToken
          } catch (error) {
            // If parsing fails, clear invalid data
            localStorage.removeItem('user')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
          }
        }
      }
    },

    /**
     * Set authentication status
     * Used to manually set authentication state
     */
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
  },
})

// Export actions for use in components
export const {
  setLoading,
  setError,
  clearError,
  loginSuccess,
  updateTokens,
  updateUser,
  logout,
  restoreUser,
  setAuthenticated,
} = userSlice.actions

// Export selectors for easy state access
export const selectUser = (state: { user: UserState }) => state.user.user
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated
export const selectTokens = (state: { user: UserState }) => state.user.tokens
export const selectIsLoading = (state: { user: UserState }) => state.user.isLoading
export const selectError = (state: { user: UserState }) => state.user.error

// Export reducer for store configuration
export default userSlice.reducer
