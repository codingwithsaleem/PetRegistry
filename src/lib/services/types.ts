// Base API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  timestamp: string
}

export interface ApiError {
  success: false
  error: {
    type: string
    code: string
    message: string
    statusCode: number
    timestamp: string
    requestId: string
    details?: Record<string, any>
    stack?: string
  }
  meta: {
    path: string
    method: string
    userAgent: string
    ip: string
  }
}

// Auth-related types
export interface User {
  id: string
  email: string
  fullName: string
  status: 'active' | 'inactive'
  createdAt: string
}

export interface Session {
  id: string
  expiresAt: string
}

export interface Tokens {
  accessToken: string
  refreshToken: string
  accessTokenExpiresAt: string
  refreshTokenExpiresAt: string
}

export interface LoginResponse {
  user: User
  session: Session
  tokens: Tokens
}

// Auth Request Types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  fullName: string
  phone: string
  status?: string
}

export interface VerifyUserRequest {
  otp: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface VerifyOtpRequest {
  otp: string
}

export interface ResetPasswordRequest {
  newPassword: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}
