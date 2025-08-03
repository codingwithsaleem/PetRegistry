import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Check if token is expired
 */
const isTokenExpired = (expiresAt: string): boolean => {
  if (!expiresAt) return true
  return new Date(expiresAt) <= new Date()
}

/**
 * Next.js 15 Middleware for Route Protection
 * Protects authenticated and public routes based on user authentication status
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get authentication token and expiry from cookies
  const accessToken = request.cookies.get('accessToken')?.value
  const accessTokenExpiresAt = request.cookies.get('accessTokenExpiresAt')?.value
  
  // Check if token exists and is not expired
  const isAuthenticated = !!(accessToken && accessTokenExpiresAt && !isTokenExpired(accessTokenExpiresAt))
  
  // Define protected routes (require authentication)
  const protectedRoutes = [
    '/',
    '/dashboard',
    '/animals',
    '/reports', 
    '/settings',
    '/profile'
  ]
  
  // Define auth routes (accessible only when not authenticated)
  const authRoutes = [
    '/login',
    '/signup', 
    '/forgot-password',
    '/reset-password',
    '/verify-user',
    '/verify-forgot-password'
  ]
  
  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => {
    return pathname === route || (route !== '/' && pathname.startsWith(route + '/'))
  })
  
  // Check if current path is an auth route
  const isAuthRoute = authRoutes.some(route => {
    return pathname === route || pathname.startsWith(route + '/')
  })
  
  // Route protection logic
  if (isProtectedRoute && !isAuthenticated) {
    // Redirect unauthenticated users to login page
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname) // Store intended destination
    return NextResponse.redirect(loginUrl)
  }
  
  if (isAuthRoute && isAuthenticated) {
    // Check if there's a redirect parameter in the URL
    const redirectTo = request.nextUrl.searchParams.get('redirect') || '/'
    const dashboardUrl = new URL(redirectTo, request.url)
    return NextResponse.redirect(dashboardUrl)
  }
  
  // Add auth headers for API requests
  const response = NextResponse.next()
  
  // Add authentication header if token exists
  if (accessToken) {
    response.headers.set('Authorization', `Bearer ${accessToken}`)
  }
  
  // Set CORS headers for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }
  
  return response
}

/**
 * Middleware Configuration
 * Specify which routes should trigger the middleware
 */
export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/animals",
    "/reports",
    "/settings",
    "/profile",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password", 
    "/verify-user",
    "/verify-forgot-password",

  ],
}
