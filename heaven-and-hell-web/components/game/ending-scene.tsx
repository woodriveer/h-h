"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ShareButton } from "@/components/game/share-button"
import type { PathStep, StoryNode } from "@/lib/story-engine"

interface EndingSceneProps {
  node: StoryNode & { isEnding: true }
  path: PathStep[]
  onRestart: () => void
}

export function EndingScene({ node, path, onRestart }: EndingSceneProps) {
  const t = useTranslations("ending")
  const tJourney = useTranslations("journey")
  const isGood = node.endingType === "good"

  return (
    <div className="flex flex-col gap-6">
      {/* Ending card */}
      <div
        className={cn(
          "overflow-hidden rounded-xl border shadow-sm",
          isGood ? "border-amber-500/30 bg-amber-500/5" : "border-destructive/30 bg-destructive/5",
        )}
      >
        {node.image && (
          <div className="relative h-52 w-full overflow-hidden">
            <img
              src={node.image}
              alt={node.title}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t to-transparent",
                isGood ? "from-amber-950/60" : "from-red-950/60",
              )}
            />
          </div>
        )}
        <div className="p-6">
          <p
            className={cn(
              "mb-1 text-xs font-medium tracking-widest uppercase",
              isGood ? "text-amber-500" : "text-destructive",
            )}
          >
            {isGood ? t("salvation") : t("fallen")}
          </p>
          <h1
            className={cn(
              "mb-5 text-2xl font-bold",
              isGood ? "text-amber-600 dark:text-amber-400" : "text-destructive",
            )}
          >
            {node.title}
          </h1>
          <div className="space-y-4">
            {node.text.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-card-foreground/90">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Journey — shown inline at endings */}
      {path.length > 0 && (
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {t("completePath")}
            </p>
            <h2 className="text-lg font-bold">{t("journey")}</h2>
          </div>
          <ol className="px-6 py-4">
            {path.map((step, i) => {
              const isLastStep = i === path.length - 1

              return (
                <li key={`${step.nodeId}-${i}`} className="relative flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold",
                        isLastStep && step.endingType === "good" &&
                          "border-amber-500 bg-amber-500/20 text-amber-600 dark:text-amber-400",
                        isLastStep && step.endingType === "bad" &&
                          "border-destructive bg-destructive/20 text-destructive",
                        !isLastStep && "border-border bg-muted text-muted-foreground",
                      )}
                    >
                      {i + 1}
                    </div>
                    {!isLastStep && (
                      <div className="mt-1 w-px flex-1 bg-border" style={{ minHeight: "1.5rem" }} />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 pb-3">
                    <p className="text-sm font-medium text-foreground">{step.title}</p>
                    {step.exit && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {step.exit.type === "choice" ? (
                          <span className="italic">&ldquo;{step.exit.text}&rdquo;</span>
                        ) : step.exit.attempts > 1 ? (
                          <span>{t("rolledVictoryAttempts", { result: step.exit.result, attempts: step.exit.attempts })}</span>
                        ) : (
                          <span>{t("rolledVictory", { result: step.exit.result })}</span>
                        )}
                      </p>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground">{t("complete")}</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="lg" onClick={onRestart} className="flex-1">
            {t("playAgain")}
          </Button>
          <ShareButton endingTitle={node.title} endingType={node.endingType ?? "bad"} />
        </div>
      </div>
    </div>
  )
}
