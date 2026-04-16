import { AuthForm } from "@/components/auth/auth-form"
import { useTranslations } from "next-intl"

export default function AuthPage() {
  const t = useTranslations()
  return (
    <main className="flex min-h-svh items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">{t("system.title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("system.sign-in-description")}
          </p>
        </div>
        <AuthForm />
      </div>
    </main>
  )
}
