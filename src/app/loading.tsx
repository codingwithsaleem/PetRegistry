'use client'

/**
 * Next.js 15 Default Loading Page
 * Displays during page transitions and loading states
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
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
              Loading content...
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

        {/* Loading Message */}
        <div className="text-center space-y-2">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Please wait while we load your content...
          </p>
          <div className="w-48 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
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
