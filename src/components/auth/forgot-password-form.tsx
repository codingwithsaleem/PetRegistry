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
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAuth } from "@/store/hooks"
import { authService, ApiErrorHandler } from "@/lib/services"
import { setLoading, setError, clearError } from "@/store/slices/userSlice"
import { useEffect } from "react"

/**
 * Forgot Password Form Validation Schema
 * Defines validation rules for email input
 */
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAuth()
  const router = useRouter()

  /**
   * React Hook Form Setup
   * Handles form validation and submission
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  /**
   * Handle forgot password errors
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
   * Uses auth service directly for forgot password
   */
  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // Set loading state
      dispatch(setLoading(true))

      // Store email in localStorage for OTP verification
      localStorage.setItem('userEmail', data.email);

      // Call auth service directly
      const response = await authService.forgotPassword(data)
      
      if (response.success) {
        // Show success message and redirect to OTP verification
        toast.success("Password reset OTP sent to your email!")
        router.push("/verify-forgot-password")
      } else {
        dispatch(setError(response.message || 'Failed to send reset OTP'))
      }
      
    } catch (error) {
      const errorMessage = ApiErrorHandler.getErrorMessage(error)
      dispatch(setError(errorMessage))
      console.error("Forgot password failed:", error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
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

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Remember your password?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Back to login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
