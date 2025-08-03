import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './index'

/**
 * Typed useDispatch Hook
 * Pre-typed dispatch hook for better TypeScript support
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()

/**
 * Typed useSelector Hook
 * Pre-typed selector hook for better TypeScript support
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

/**
 * Custom Hook: useAuth
 * Provides easy access to authentication state and actions
 */
export const useAuth = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)
  const tokens = useAppSelector((state) => state.user.tokens)
  const isLoading = useAppSelector((state) => state.user.isLoading)
  const error = useAppSelector((state) => state.user.error)

  return {
    // State
    user,
    isAuthenticated,
    tokens,
    isLoading,
    error,
    // Dispatch for easy access
    dispatch,
  }
}

/**
 * Custom Hook: useUser
 * Provides easy access to user data and user-related actions
 */
export const useUser = () => {
  const user = useAppSelector((state) => state.user.user)
  const isLoading = useAppSelector((state) => state.user.isLoading)
  const error = useAppSelector((state) => state.user.error)

  return {
    user,
    isLoading,
    error,
    // Computed values
    isLoggedIn: !!user,
    userName: user?.fullName || '',
    userEmail: user?.email || '',
    userStatus: user?.status || '',
  }
}
