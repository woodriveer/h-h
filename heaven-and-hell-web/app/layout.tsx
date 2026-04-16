import { Geist_Mono, Inter } from "next/font/google"
import { getMessages, getLocale } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { UserMenu } from "@/components/auth/user-menu"
import { LangSelector } from "@/components/lang-selector"
import { createClient } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/request"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [supabase, messages, locale] = await Promise.all([
    createClient(),
    getMessages(),
    getLocale(),
  ])

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()
    profile = data
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <header className="fixed top-0 right-0 z-30 flex items-center gap-2 p-3">
              <LangSelector current={locale as Locale} />
              <UserMenu profile={profile} />
            </header>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
