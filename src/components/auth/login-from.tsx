"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAuth } from "@/store/hooks"
import { authService, ApiErrorHandler } from "@/lib/services"
import { setLoading, setError, clearError, loginSuccess } from "@/store/slices/userSlice"
import { ButtonLoader } from "@/components/ui/loader"
import { useEffect } from "react"

/**
 * Login Form Validation Schema
 * Defines validation rules for login form fields
 */
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useAppDispatch()
  const { isLoading, error, isAuthenticated } = useAuth()
  const router = useRouter()

  /**
   * React Hook Form Setup
   * Handles form validation and submission
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  /**
   * Handle successful login
   * Redirect user to dashboard after successful authentication
   */
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful!")
      router.push("/") // Redirect to dashboard or home page
    }
  }, [isAuthenticated, router])

  /**
   * Handle login errors
   * Display error messages from Redux store
   */
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError()) // Clear error after showing
    }
  }, [error, dispatch])

  /**
   * Form Submission Handler
   * Uses auth service directly for login
   */
  const onSubmit = async (data: LoginFormData) => {
    try {
      // Set loading state
      dispatch(setLoading(true))
      
      // Call auth service directly
      const response = await authService.login(data)
      
      if (response.success && response.data) {
        // Dispatch login success action
        dispatch(loginSuccess({
          user: response.data.user,
          tokens: response.data.tokens,
        }))
        
        toast.success("Login successful!")
        router.push("/") // Redirect to dashboard
      } else {
        dispatch(setError(response.message || 'Login failed'))
      }
    } catch (error) {
      const errorMessage = ApiErrorHandler.getErrorMessage(error)
      dispatch(setError(errorMessage))
      console.error("Login failed:", error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Email Field */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <PasswordInput 
                  id="password" 
                  placeholder="Enter your password"
                  {...register("password")}
                  className={errors.password ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col gap-3">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? <ButtonLoader /> : "Login"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  type="button"
                  disabled={isLoading}
                >
                  Login with Google
                </Button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
