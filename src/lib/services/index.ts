// API Client
export { default as apiClient } from './api-client'

// Services
export { default as authService, authService as auth } from './auth.service'

// Types
export * from './types'

// Error Handler
export { default as ApiErrorHandler } from './error-handler'

// Re-export commonly used utilities
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/user-register',
    VERIFY_USER: '/auth/user-verify',
    LOGIN: '/auth/user-login',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY_FORGOT_PASSWORD_OTP: '/auth/verify-forgot-password-otp',
    RESET_PASSWORD: '/auth/reset-password',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
  },
} as const
