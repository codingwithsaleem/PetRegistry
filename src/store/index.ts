import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import userReducer from './slices/userSlice'

/**
 * Root Reducer
 * Combines all slice reducers into a single root reducer
 */
const rootReducer = combineReducers({
  user: userReducer,
  // Add more slices here as your app grows
  // posts: postsReducer,
  // notifications: notificationsReducer,
})

/**
 * Redux Persist Configuration
 * Configures which parts of the state should be persisted
 */
const persistConfig = {
  key: 'root', // Key for localStorage
  storage, // Storage engine (localStorage)
  whitelist: ['user'], // Only persist user slice
  // blacklist: [], // Slices to exclude from persistence
}

/**
 * Persisted Reducer
 * Wraps root reducer with persistence capabilities
 */
const persistedReducer = persistReducer(persistConfig, rootReducer)

/**
 * Redux Store Configuration
 * Creates the main Redux store with persistence and dev tools
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Configure middleware to work with redux-persist
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
          'persist/FLUSH',
        ],
      },
    }),
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production',
})

/**
 * Persistor
 * Handles the persistence of the store
 */
export const persistor = persistStore(store)

/**
 * TypeScript Types
 * Define types for the store, state, and dispatch
 */
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/**
 * Store Helper Functions
 * Utility functions for common store operations
 */
export const getState = () => store.getState()
export const dispatch = store.dispatch

// Export store and persistor as default for easy importing
export default { store, persistor }
