import Link from "next/link"
import { getTranslations, getLocale } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { LangSelector } from "@/components/lang-selector"
import type { Locale } from "@/i18n/request"

export default async function Page() {
  const t = await getTranslations("home")
  const locale = (await getLocale()) as Locale

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-sm flex-col items-center gap-6 text-center">
        <LangSelector current={locale} label={t("language")} />

        <div>
          <p className="mb-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            {t("tagline")}
          </p>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <Button asChild size="lg" className="px-8">
          <Link href="/game">{t("begin")}</Link>
        </Button>

        <p className="text-xs text-muted-foreground">{t("darkMode")}</p>
      </div>
    </main>
  )
}
