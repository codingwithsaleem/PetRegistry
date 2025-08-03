import { VerifyUserForm } from "@/components/auth/verify-user-form"

export default function VerifyUserPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <VerifyUserForm />
      </div>
    </div>
  )
}
