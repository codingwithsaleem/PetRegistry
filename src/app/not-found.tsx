'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, Search } from 'lucide-react'

/**
 * Next.js 15 Default Not Found Page
 * Displays when a page is not found (404 error)
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Error Code */}
        <div className="space-y-4">
          <div className="text-9xl font-black text-black dark:text-white opacity-20">
            404
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Page Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>

        {/* Pet Registry Branding */}
        <div className="py-8">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <div className="h-12 w-12 rounded-xl bg-black dark:bg-white flex items-center justify-center">
              <span className="text-2xl text-white dark:text-black">🐾</span>
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Pet Registry
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Animal Management System
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="flex items-center space-x-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                <span>Go Home</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex items-center space-x-2">
              <Link href="/animals">
                <Search className="h-4 w-4" />
                <span>Browse Animals</span>
              </Link>
            </Button>
          </div>
          
          <Button variant="ghost" asChild className="flex items-center space-x-2 text-sm">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
            Popular Pages
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link 
              href="/animals" 
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Animals
            </Link>
            <Link 
              href="/reports" 
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Reports
            </Link>
            <Link 
              href="/settings" 
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Settings
            </Link>
            <Link 
              href="/profile" 
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Profile
            </Link>
          </div>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-black dark:bg-white opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  )
}
