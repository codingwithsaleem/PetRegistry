import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService, ApiErrorHandler } from '@/lib/services'
import {
  LoginRequest,
  RegisterRequest,
  VerifyUserRequest,
  ForgotPasswordRequest,
  VerifyOtpRequest,
  ResetPasswordRequest,
} from '@/lib/services/types'

/**
 * Async Thunk: Login User
 * Handles user login with API integration
 */
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials)
      
      if (response.success && response.data) {
        return {
          user: response.data.user,
          tokens: response.data.tokens,
        }
      } else {
        return rejectWithValue('Login failed')
      }
    } catch (error) {
      const errorMessage = ApiErrorHandler.getErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  }
)

/**
 * Async Thunk: Register User
 * Handles user registration with API integration
 */
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData)
      
      if (response.success) {
        return response.message || 'Registration successful'
      } else {
        return rejectWithValue('Registration failed')
      }
    } catch (error) {
      const errorMessage = ApiErrorHandler.getErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  }
)

/**
 * Async Thunk: Verify User
 * Handles user verification with OTP
 */
export const verifyUser = createAsyncThunk(
  'user/verify',
  async (verificationData: VerifyUserRequest, { rejectWithValue }) => {
    try {
      const response = await authService.verifyUser(verificationData)
      
      if (response.success) {
        return response.message || 'Verification successful'
      } else {
        return rejectWithValue('Verification failed')
      }
    } catch (error) {
      const errorMessage = ApiErrorHandler.getErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  }
)

/**
 * Async Thunk: Forgot Password
 * Handles forgot password request
 */
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (emailData: ForgotPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPassword(emailData)
      
      if (response.success) {
        return response.message || 'Reset link sent successfully'
      } else {
        return rejectWithValue('Failed to send reset link')
      }
    } catch (error) {
      const errorMessage = ApiErrorHandler.getErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  }
)

/**
 * Async Thunk: Verify Forgot Password OTP
 * Handles OTP verification for password reset
 */
export const verifyForgotPasswordOtp = createAsyncThunk(
  'user/verifyForgotPasswordOtp',
  async (otpData: VerifyOtpRequest, { rejectWithValue }) => {
    try {
      const response = await authService.verifyForgotPasswordOtp(otpData)
      
      if (response.success) {
        return response.message || 'OTP verified successfully'
      } else {
        return rejectWithValue('OTP verification failed')
      }
    } catch (error) {
      const errorMessage = ApiErrorHandler.getErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  }
)

/**
 * Async Thunk: Reset Password
 * Handles password reset
 */
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (passwordData: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(passwordData)
      
      if (response.success) {
        return response.message || 'Password reset successfully'
      } else {
        return rejectWithValue('Password reset failed')
      }
    } catch (error) {
      const errorMessage = ApiErrorHandler.getErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  }
)

/**
 * Async Thunk: Resend Verification OTP
 * Resends OTP for user verification
 */
export const resendVerificationOtp = createAsyncThunk(
  'user/resendVerificationOtp',
  async (emailData: ForgotPasswordRequest, { rejectWithValue }) => {
    try {
      // Note: Using forgot password endpoint for now
      // You might want to create a separate endpoint for verification OTP
      const response = await authService.forgotPassword(emailData)
      
      if (response.success) {
        return response.message || 'Verification OTP sent successfully'
      } else {
        return rejectWithValue('Failed to send verification OTP')
      }
    } catch (error) {
      const errorMessage = ApiErrorHandler.getErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  }
)

/**
 * Async Thunk: Logout User
 * Handles user logout with API integration
 */
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.logout()
      
      if (response.success) {
        return response.message || 'Logout successful'
      } else {
        return rejectWithValue('Logout failed')
      }
    } catch (error) {
      // Even if API call fails, we should clear local data
      const errorMessage = ApiErrorHandler.getErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  }
)
