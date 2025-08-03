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
 * Reset Password Form Validation Schema
 * Defines validation rules for password reset form fields
 */
const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm({
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
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  /**
   * Handle reset password errors
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
   * Uses auth service directly for reset password
   */
  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      // Set loading state
      dispatch(setLoading(true))

      const resetData = {
        newPassword: data.newPassword
      }
      
      // Call auth service directly
      const response = await authService.resetPassword(resetData)
      
      if (response.success) {
        // Show success message and redirect to login
        toast.success("Password reset successfully!")
        router.push("/login")
      } else {
        dispatch(setError(response.message || 'Password reset failed'))
      }
      
    } catch (error) {
      const errorMessage = ApiErrorHandler.getErrorMessage(error)
      dispatch(setError(errorMessage))
      console.error("Password reset failed:", error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  {...register("newPassword")}
                  className={errors.newPassword ? "border-red-500" : ""}
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-500">{errors.newPassword.message}</p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  {...register("newPassword")}
                  className={errors.newPassword ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-500">{errors.newPassword.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
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
