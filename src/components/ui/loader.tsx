"use client"

import React from 'react'

/**
 * Attractive Application Loader with Black Theme
 * Modern loading animation with smooth transitions
 */
export const AppLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center space-y-8">
        {/* Main Logo/Brand Area */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            {/* Animated Pet Icon */}
            <div className="relative h-16 w-16 rounded-2xl bg-black dark:bg-white flex items-center justify-center">
              <div className="text-2xl text-white dark:text-black font-bold">
                🐾
              </div>
              {/* Pulse Animation */}
              <div className="absolute inset-0 rounded-2xl bg-black dark:bg-white animate-pulse opacity-20"></div>
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Pet Registry
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Loading your dashboard...
            </p>
          </div>
        </div>

        {/* Elegant Loading Animation */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="h-20 w-20 rounded-full border-4 border-gray-200 dark:border-gray-800"></div>
          
          {/* Animated Ring */}
          <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-transparent border-t-black dark:border-t-white animate-spin"></div>
          
          {/* Inner Dots */}
          <div className="absolute inset-4 flex items-center justify-center">
            <div className="flex space-x-1">
              <div className="h-2 w-2 rounded-full bg-black dark:bg-white animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2 w-2 rounded-full bg-black dark:bg-white animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="h-2 w-2 rounded-full bg-black dark:bg-white animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64">
          <div className="mb-2 flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Initializing...</span>
            <span>Please wait</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Floating Particles Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-black dark:bg-white opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Custom CSS for float animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  )
}

/**
 * Minimal Loading Spinner for smaller components
 */
export const MiniLoader: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6', 
    lg: 'h-8 w-8'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full border-2 border-gray-200 dark:border-gray-700 border-t-black dark:border-t-white animate-spin`}></div>
    </div>
  )
}

/**
 * Button Loading State
 */
export const ButtonLoader: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="h-4 w-4 rounded-full border-2 border-gray-300 border-t-white animate-spin"></div>
      <span>Loading...</span>
    </div>
  )
}

export default AppLoader
