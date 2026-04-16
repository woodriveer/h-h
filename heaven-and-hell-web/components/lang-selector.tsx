"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { setLocale } from "@/app/actions/set-locale"
import type { Locale } from "@/i18n/request"

const LABELS: Record<Locale, string> = {
  en: "English",
  "pt-BR": "Português",
}

interface LangSelectorProps {
  current: Locale
  label: string
}

export function LangSelector({ current, label }: LangSelectorProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleChange(locale: Locale) {
    if (locale === current) return
    startTransition(async () => {
      await setLocale(locale)
      router.refresh()
    })
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
        {label}
      </p>
      <div className="flex rounded-lg border border-border bg-muted p-0.5">
        {(Object.entries(LABELS) as [Locale, string][]).map(([locale, name]) => (
          <button
            key={locale}
            type="button"
            disabled={isPending}
            onClick={() => handleChange(locale)}
            className={cn(
              "rounded-md px-3 py-1 text-sm font-medium transition-all",
              current === locale
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}
