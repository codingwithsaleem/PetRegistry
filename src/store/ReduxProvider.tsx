"use client"

import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './index'
import { restoreUser } from './slices/userSlice'
import { AppLoader } from '@/components/ui/loader'

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
      <PersistGate loading={<AppLoader />} persistor={persistor}>
        <StoreInitializer>
          {children}
        </StoreInitializer>
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider
