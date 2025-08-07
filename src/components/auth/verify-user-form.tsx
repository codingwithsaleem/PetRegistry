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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
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
import { useEffect, useState } from "react"

/**
 * Verify User Form Validation Schema
 * Defines validation rules for OTP verification
 */
const verifyUserSchema = z.object({
  otp: z.string().min(6, "OTP must be at least 6 digits").max(8, "OTP must be at most 8 digits"),
})

type VerifyUserFormData = z.infer<typeof verifyUserSchema>

export function VerifyUserForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAuth()
  const router = useRouter()

  // Timer state for resend OTP functionality
  const [resendTimer, setResendTimer] = useState(0)
  const [canResend, setCanResend] = useState(true)
  const [otpValue, setOtpValue] = useState("")
  const [userEmail, setUserEmail] = useState("")

  /**
   * Get user email on component mount
   */
  useEffect(() => {
    const email = localStorage.getItem('userEmail') || ''
    setUserEmail(email)
  }, [])

  /**
   * React Hook Form Setup
   * Handles form validation and submission
   */
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<VerifyUserFormData>({
    resolver: zodResolver(verifyUserSchema),
  })

  /**
   * Timer Effect
   * Manages the countdown timer for resend OTP
   */
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (resendTimer > 0) {
      setCanResend(false)
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [resendTimer])

  /**
   * Handle OTP Value Change
   * Updates form value when OTP input changes
   */
  useEffect(() => {
    setValue('otp', otpValue)
    if (otpValue.length === 6) {
      trigger('otp') // Trigger validation when OTP is complete
    }
  }, [otpValue, setValue, trigger])

  /**
   * Handle verification errors
   * Display error messages from Redux store
   */
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError()) // Clear error after showing
    }
  }, [error, dispatch])

  /**
   * Initialize timer on component mount
   * Start timer assuming OTP was just sent
   */
  useEffect(() => {
    // Start initial timer (60 seconds) when component mounts
    setResendTimer(60)
  }, [])

  /**
   * Form Submission Handler
   * Uses auth service directly for verification
   */
  const onSubmit = async (data: VerifyUserFormData) => {
    try {
      // Set loading state
      dispatch(setLoading(true))

      const verificationData = {
        otp: data.otp,
        email: userEmail, // Include email for verification
      }
      
      // Call auth service directly
      const response = await authService.verifyUser(verificationData)

      if (response.success) {
        // Clear stored email after successful verification
        localStorage.removeItem('userEmail')
        
        // Show success message and redirect to login
        toast.success("Account verified successfully!")
        router.push("/login")
      } else {
        dispatch(setError(response.message || 'Verification failed'))
      }
      
    } catch (error) {
      const errorMessage = ApiErrorHandler.getErrorMessage(error)
      dispatch(setError(errorMessage))
      console.error("Verification failed:", error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  /**
   * Handle Resend OTP
   * Resends OTP to user's email for verification with timer
   */
  const handleResendOTP = async () => {
    if (!canResend) return

    try {
      // Set loading state
      dispatch(setLoading(true))

      // Get the user's email from localStorage
      const userEmail = localStorage.getItem('userEmail') || ''
      
      if (!userEmail) {
        toast.error("Email not found. Please try signing up again.")
        return
      }

      // Start the timer (60 seconds)
      setResendTimer(60)

      // Call auth service directly
      const response = await authService.resendVerificationOtp({ email: userEmail , type: "verification" })
      
      if (response.success) {
        toast.success("New OTP sent to your email!")
      } else {
        dispatch(setError(response.message || 'Failed to resend OTP'))
        // Reset timer on error
        setResendTimer(0)
        setCanResend(true)
      }
    } catch (error) {
      const errorMessage = ApiErrorHandler.getErrorMessage(error)
      dispatch(setError(errorMessage))
      toast.error("Failed to resend OTP. Please try again.")
      // Reset timer on error
      setResendTimer(0)
      setCanResend(true)
    } finally {
      dispatch(setLoading(false))
    }
  }

  /**
   * Format timer display
   * Converts seconds to MM:SS format
   */
  const formatTimer = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Verify your account</CardTitle>
          <CardDescription>
            Enter the 6-digit verification code sent to your email address
            {userEmail && (
              <span className="block mt-1 font-medium text-blue-600">
                {userEmail}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* OTP Input Section */}
              <div className="grid gap-3">
                <Label className="text-center">Verification Code</Label>
                <div className="flex justify-center">
                  <InputOTP 
                    maxLength={6} 
                    value={otpValue} 
                    onChange={setOtpValue}
                    disabled={isLoading}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                
                {/* Progress indicator */}
                <div className="text-center text-sm text-gray-500">
                  {otpValue.length}/6 digits entered
                </div>
                
                {errors.otp && (
                  <p className="text-sm text-red-500 text-center">{errors.otp.message}</p>
                )}
                {otpValue && otpValue.length === 6 && !errors.otp && (
                  <p className="text-sm text-green-600 text-center">✓ OTP is complete!</p>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || otpValue.length !== 6}
              >
                {isLoading ? "Verifying..." : "Verify Account"}
              </Button>

              {/* Resend OTP Button with Timer */}
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={handleResendOTP}
                disabled={isLoading || !canResend}
              >
                {!canResend && resendTimer > 0 
                  ? `Resend OTP in ${formatTimer(resendTimer)}`
                  : "Resend OTP"
                }
              </Button>

              {/* Timer Information */}
              {!canResend && resendTimer > 0 && (
                <p className="text-sm text-gray-500 text-center">
                  You can request a new OTP in {formatTimer(resendTimer)}
                </p>
              )}
            </div>
            <div className="mt-4 text-center text-sm">
              Already verified?{" "}
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
