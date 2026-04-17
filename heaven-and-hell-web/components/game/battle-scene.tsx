"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { checkWin, type StoryNode, type Battle } from "@/lib/story-engine"

interface BattleSceneProps {
  node: StoryNode & { battle: Battle }
  onWin: (nextId: string, diceResult: number, attempts: number) => void
}

type Phase = "ready" | "rolling" | "result"

function DiceFace({
  display,
  phase,
  won,
}: {
  display: number | null
  phase: Phase
  won: boolean | null
}) {
  return (
    <div
      className={cn(
        "flex h-24 w-24 items-center justify-center rounded-2xl border-2 text-4xl font-black shadow-lg transition-all duration-300",
        phase === "ready" && "border-border bg-card text-muted-foreground",
        phase === "rolling" && "animate-bounce border-amber-500 bg-amber-500/10 text-amber-500",
        phase === "result" && won === true && "border-green-500 bg-green-500/10 text-green-500",
        phase === "result" && won === false && "border-destructive bg-destructive/10 text-destructive",
      )}
    >
      {display ?? "?"}
    </div>
  )
}

export function BattleScene({ node, onWin }: BattleSceneProps) {
  const { battle } = node
  const t = useTranslations("dice")
  const tScene = useTranslations("scene")

  const [attempt, setAttempt] = useState(0)
  const [phase, setPhase] = useState<Phase>("ready")
  const [display, setDisplay] = useState<number | null>(null)
  const [result, setResult] = useState<number | null>(null)
  const [won, setWon] = useState<boolean | null>(null)

  const startRoll = useCallback(() => {
    setPhase("rolling")
    setDisplay(null)
    setResult(null)
    setWon(null)
  }, [])

  useEffect(() => {
    if (phase !== "rolling") return

    let count = 0
    const totalTicks = 20

    const id = setInterval(() => {
      setDisplay(Math.ceil(Math.random() * battle.diceMax))
      count++

      if (count >= totalTicks) {
        clearInterval(id)
        const finalResult = Math.ceil(Math.random() * battle.diceMax)
        const didWin = checkWin(finalResult, battle)
        setDisplay(finalResult)
        setResult(finalResult)
        setWon(didWin)
        setPhase("result")
      }
    }, 80)

    return () => clearInterval(id)
  }, [phase, attempt, battle])

  const handleRetry = () => {
    setAttempt((a) => a + 1)
    setPhase("ready")
    setDisplay(null)
    setResult(null)
    setWon(null)
  }

  const winMax = battle.winMax ?? battle.diceMax

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {node.image && (
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src={node.image}
              alt={node.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent" />
          </div>
        )}
        <div className="p-6">
          <p className="mb-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            {tScene("battle")}
          </p>
          <h1 className="mb-5 text-2xl font-bold text-card-foreground">{node.title}</h1>
          <div className="space-y-4">
            {node.text.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-card-foreground/90">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <p className="mb-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
          {t("label")}
        </p>
        <p className="mb-5 text-sm text-card-foreground/80">{battle.description}</p>

        <div className="mb-5 flex items-center gap-4">
          <DiceFace display={display} phase={phase} won={won} />

          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <span>
              {t("die")}: <strong className="text-foreground">d{battle.diceMax}</strong>
            </span>
            <span>
              {t("winOn")}:{" "}
              <strong className="text-foreground">
                {battle.winMin === winMax
                  ? battle.winMin
                  : `${battle.winMin}–${winMax}`}
              </strong>
            </span>
            {phase === "result" && result !== null && (
              <span
                className={cn(
                  "mt-1 font-semibold",
                  won ? "text-green-500" : "text-destructive",
                )}
              >
                {t("rolled")}: {result}
              </span>
            )}
          </div>
        </div>

        {phase === "result" && won === true && result !== null && (
          <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm font-medium text-green-600 dark:text-green-400">
            {t("victory", { result })}
          </div>
        )}

        {phase === "result" && won === false && result !== null && (
          <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm font-medium text-destructive">
            {t("defeat", { result })}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {phase !== "result" && (
            <Button
              onClick={startRoll}
              disabled={phase === "rolling"}
              size="lg"
              className="min-w-36"
            >
              {phase === "rolling" ? t("rolling") : t("roll")}
            </Button>
          )}

          {phase === "result" && won === true && result !== null && (
            <Button size="lg" onClick={() => onWin(battle.winNextId, result, attempt + 1)}>
              {t("continue")}
            </Button>
          )}

          {phase === "result" && won === false && (
            <Button size="lg" variant="outline" onClick={handleRetry}>
              {t("tryAgain")}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
