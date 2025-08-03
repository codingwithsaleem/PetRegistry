import { AxiosError } from 'axios'
import { ApiError } from './types'

export class ApiErrorHandler {
  /**
   * Extract error message from API error response
   */
  static getErrorMessage(error: unknown): string {
    if (error instanceof AxiosError) {
      // Handle network errors
      if (!error.response) {
        return 'Network error. Please check your internet connection.'
      }

      // Handle API error responses
      const apiError = error.response.data as ApiError
      if (apiError?.error?.message) {
        return apiError.error.message
      }

      // Fallback to HTTP status text
      return error.response.statusText || 'An error occurred'
    }

    // Handle other types of errors
    if (error instanceof Error) {
      return error.message
    }

    return 'An unexpected error occurred'
  }

  /**
   * Get error code from API error response
   */
  static getErrorCode(error: unknown): string | null {
    if (error instanceof AxiosError && error.response?.data) {
      const apiError = error.response.data as ApiError
      return apiError?.error?.code || null
    }
    return null
  }

  /**
   * Get error details from API error response
   */
  static getErrorDetails(error: unknown): Record<string, any> | null {
    if (error instanceof AxiosError && error.response?.data) {
      const apiError = error.response.data as ApiError
      return apiError?.error?.details || null
    }
    return null
  }

  /**
   * Check if error is a specific type
   */
  static isErrorType(error: unknown, errorType: string): boolean {
    const code = this.getErrorCode(error)
    return code === errorType
  }

  /**
   * Check if error is authentication related
   */
  static isAuthError(error: unknown): boolean {
    if (error instanceof AxiosError) {
      return error.response?.status === 401
    }
    return false
  }

  /**
   * Check if error is validation related
   */
  static isValidationError(error: unknown): boolean {
    if (error instanceof AxiosError) {
      return error.response?.status === 400
    }
    return false
  }

  /**
   * Format error for display to user
   */
  static formatUserError(error: unknown): {
    message: string
    code?: string
    details?: Record<string, any>
  } {
    return {
      message: this.getErrorMessage(error),
      code: this.getErrorCode(error) || undefined,
      details: this.getErrorDetails(error) || undefined,
    }
  }
}

export default ApiErrorHandler
