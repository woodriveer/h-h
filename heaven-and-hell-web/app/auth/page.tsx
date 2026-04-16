import { AuthForm } from "@/components/auth/auth-form"

export default function AuthPage() {
  return (
    <main className="flex min-h-svh items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Heaven & Hell</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to track your journey and connect with friends.
          </p>
        </div>
        <AuthForm />
      </div>
    </main>
  )
}
