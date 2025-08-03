/**
 * Cookie Utilities
 * Helper functions for managing cookies in both client and server environments
 */

/**
 * Set a cookie from client-side
 */
export const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof window !== 'undefined') {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure=${window.location.protocol === 'https:'}`
  }
}

/**
 * Get a cookie value from client-side
 */
export const getCookie = (name: string): string | null => {
  if (typeof window !== 'undefined') {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
  }
  return null
}

/**
 * Delete a cookie
 */
export const deleteCookie = (name: string) => {
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`
  }
}

/**
 * Set authentication cookies
 */
export const setAuthCookies = (tokens: {
  accessToken: string
  refreshToken: string
  accessTokenExpiresAt: string
  refreshTokenExpiresAt: string
}) => {
  // Set access token (shorter expiry)
  setCookie('accessToken', tokens.accessToken, 1) // 1 day
  
  // Set refresh token (longer expiry)
  setCookie('refreshToken', tokens.refreshToken, 7) // 7 days
  
  // Set expiry times
  setCookie('accessTokenExpiresAt', tokens.accessTokenExpiresAt, 1)
  setCookie('refreshTokenExpiresAt', tokens.refreshTokenExpiresAt, 7)
}

/**
 * Clear authentication cookies
 */
export const clearAuthCookies = () => {
  deleteCookie('accessToken')
  deleteCookie('refreshToken')
  deleteCookie('accessTokenExpiresAt')
  deleteCookie('refreshTokenExpiresAt')
}

/**
 * Check if token is expired
 */
export const isTokenExpired = (expiresAt: string): boolean => {
  if (!expiresAt) return true
  return new Date(expiresAt) <= new Date()
}

/**
 * Get authentication status from cookies
 */
export const getAuthStatusFromCookies = () => {
  const accessToken = getCookie('accessToken')
  const accessTokenExpiresAt = getCookie('accessTokenExpiresAt')
  
  if (!accessToken || !accessTokenExpiresAt) {
    return { isAuthenticated: false, token: null }
  }
  
  if (isTokenExpired(accessTokenExpiresAt)) {
    return { isAuthenticated: false, token: null }
  }
  
  return { isAuthenticated: true, token: accessToken }
}
