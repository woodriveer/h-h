"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { setLocale } from "@/app/actions/set-locale"
import type { Locale } from "@/i18n/request"

const LOCALES: { locale: Locale; flag: string; label: string }[] = [
  { locale: "en", flag: "🇬🇧", label: "English" },
  { locale: "pt-BR", flag: "🇧🇷", label: "Português" },
]

interface LangSelectorProps {
  current: Locale
}

export function LangSelector({ current }: LangSelectorProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const active = LOCALES.find((l) => l.locale === current) ?? LOCALES[0]

  function handleSelect(locale: Locale) {
    if (locale === current) { setOpen(false); return }
    setOpen(false)
    startTransition(async () => {
      await setLocale(locale)
      router.refresh()
    })
  }

  return (
    <div className="relative">
      <button
        type="button"
        disabled={isPending}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2 text-sm transition-colors hover:bg-muted",
          isPending && "opacity-50",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span aria-hidden="true">{active.flag}</span>
        <span className="text-xs font-medium text-foreground/80">{active.label}</span>
        <svg
          viewBox="0 0 16 16"
          className={cn("h-3 w-3 fill-current text-muted-foreground transition-transform", open && "rotate-180")}
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <ul
            role="listbox"
            className="absolute right-0 top-10 z-50 min-w-[9rem] overflow-hidden rounded-xl border border-border bg-card shadow-lg animate-in fade-in duration-150"
          >
            {LOCALES.map(({ locale, flag, label }) => (
              <li key={locale} role="option" aria-selected={locale === current}>
                <button
                  type="button"
                  onClick={() => handleSelect(locale)}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2.5 text-sm transition-colors hover:bg-muted",
                    locale === current && "font-semibold text-foreground",
                    locale !== current && "text-foreground/70",
                  )}
                >
                  <span className="text-base" aria-hidden="true">{flag}</span>
                  <span>{label}</span>
                  {locale === current && (
                    <svg viewBox="0 0 16 16" className="ml-auto h-3.5 w-3.5 fill-current text-primary" aria-hidden="true">
                      <path d="M13.5 4L6.5 11 2.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
