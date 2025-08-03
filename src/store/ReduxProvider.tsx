"use client"

import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './index'
import { restoreUser } from './slices/userSlice'

/**
 * Store Initializer Component
 * Handles initial store setup and user restoration
 */
const StoreInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Restore user data from localStorage on app initialization
    store.dispatch(restoreUser())
  }, [])

  return <>{children}</>
}

/**
 * Loading Component
 * Displayed while Redux Persist is rehydrating the store
 */
const PersistLoader: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
        <p className="text-gray-600">Loading application...</p>
      </div>
    </div>
  )
}

/**
 * Redux Provider Component
 * Wraps the entire app with Redux store and persistence
 * 
 * Usage:
 * Wrap your app or specific components with this provider
 * to enable Redux state management and persistence
 */
export const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<PersistLoader />} persistor={persistor}>
        <StoreInitializer>
          {children}
        </StoreInitializer>
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider
