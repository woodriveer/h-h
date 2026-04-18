"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { HeroConfig } from "@/lib/hero-config"

interface CharacterSelectProps {
  heroes: HeroConfig[]
  onSelect: (hero: HeroConfig) => void
}

export function CharacterSelect({ heroes, onSelect }: CharacterSelectProps) {
  const t = useTranslations("characterSelect")
  const tChar = useTranslations("characters")
  const availableHeroes = heroes.filter((h) => h.available)

  const [highlightedId, setHighlightedId] = useState<string>(availableHeroes[0]?.id ?? "")

  const highlighted = heroes.find((h) => h.id === highlightedId) ?? null

  const move = useCallback(
    (dir: -1 | 1) => {
      const idx = availableHeroes.findIndex((h) => h.id === highlightedId)
      const next = availableHeroes[(idx + dir + availableHeroes.length) % availableHeroes.length]
      if (next) setHighlightedId(next.id)
    },
    [availableHeroes, highlightedId],
  )

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") move(-1)
      else if (e.key === "ArrowRight") move(1)
      else if ((e.key === "Enter" || e.key === " ") && highlighted?.available) {
        onSelect(highlighted)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [move, highlighted, onSelect])

  return (
    <main
      className="min-h-svh flex flex-col items-center justify-center gap-8 p-4 py-10"
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, hsl(var(--primary) / 0.08) 0%, transparent 70%), var(--background)",
      }}
    >
      {/* Header */}
      <div className="text-center select-none">
        <p className="text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase mb-2">
          {t("subtitle")}
        </p>
        <h1
          className="text-4xl sm:text-5xl font-black tracking-widest uppercase text-foreground"
          style={{ textShadow: "0 0 30px hsl(var(--primary) / 0.6)" }}
        >
          {t("title")}
        </h1>
      </div>

      {/* Character grid */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {heroes.map((hero) => {
          const isSelected = hero.id === highlightedId
          const isAvailable = hero.available

          return (
            <button
              key={hero.id}
              disabled={!isAvailable}
              onClick={() => {
                if (isAvailable) setHighlightedId(hero.id)
              }}
              onDoubleClick={() => {
                if (isAvailable) onSelect(hero)
              }}
              aria-label={tChar(`${hero.id}.name` as never)}
              aria-pressed={isSelected}
              className={cn(
                "relative w-28 h-40 sm:w-32 sm:h-48 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none",
                !isAvailable && "opacity-40 cursor-not-allowed grayscale",
                isAvailable && !isSelected && "border-border hover:border-primary/40 hover:scale-105",
                isSelected &&
                  isAvailable &&
                  "border-primary scale-110 shadow-[0_0_24px_hsl(var(--primary)/0.8)]",
              )}
            >
              {/* Portrait */}
              {hero.image ? (
                <Image
                  src={hero.image}
                  alt={tChar(`${hero.id}.name` as never)}
                  fill
                  sizes="720px"
                  className="object-cover object-top"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-4xl">
                  ?
                </div>
              )}

              {/* Bottom name strip */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 py-1 px-1 text-center transition-colors",
                  isSelected && isAvailable
                    ? "bg-primary/80"
                    : "bg-black/70",
                )}
              >
                <p className="text-[10px] sm:text-xs font-bold text-white leading-tight truncate">
                  {tChar(`${hero.id}.name` as never).split(/[\s,]/)[0]}
                </p>
              </div>

              {/* Locked overlay */}
              {!isAvailable && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                  <span className="text-3xl">🔒</span>
                  <span className="text-white text-[10px] mt-1 font-medium">{t("locked")}</span>
                </div>
              )}

              {/* Selection flash border */}
              {isSelected && isAvailable && (
                <div className="absolute inset-0 rounded-lg pointer-events-none ring-2 ring-primary ring-offset-0 animate-pulse" />
              )}
            </button>
          )
        })}
      </div>

      {/* Selected hero info panel */}
      <div
        key={highlightedId}
        className="w-full max-w-md border border-primary/20 bg-card rounded-xl p-6 animate-in fade-in duration-300 min-h-[140px]"
      >
        {highlighted ? (
          <div className="text-center space-y-1">
            <h2 className="text-lg sm:text-xl font-bold">{tChar(`${highlighted.id}.name` as never)}</h2>
            <p className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wide">
              {tChar(`${highlighted.id}.class` as never)}
            </p>
            <p className="text-sm text-muted-foreground italic mt-2">{tChar(`${highlighted.id}.vibe` as never)}</p>
            <p className="text-sm leading-relaxed mt-3 text-foreground/80">
              {tChar(`${highlighted.id}.combatStyle` as never)}
            </p>
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-sm">{t("selectPrompt")}</p>
        )}
      </div>

      {/* Start button */}
      <div className="flex flex-col items-center gap-2">
        <Button
          size="lg"
          className="px-12 text-sm sm:text-base font-black tracking-[0.2em] uppercase"
          style={{ boxShadow: highlighted?.available ? "0 0 20px hsl(var(--primary) / 0.4)" : undefined }}
          disabled={!highlighted?.available}
          onClick={() => highlighted && onSelect(highlighted)}
        >
          ⚔ {t("startButton")}
        </Button>
        <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">
          {t("keyboardHint")}
        </p>
      </div>
    </main>
  )
}
