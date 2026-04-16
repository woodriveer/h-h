"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { StoryNode } from "@/lib/story-engine"

interface EndingSceneProps {
  node: StoryNode & { isEnding: true }
  onRestart: () => void
}

export function EndingScene({ node, onRestart }: EndingSceneProps) {
  const isGood = node.endingType === "good"

  return (
    <div className="flex flex-col gap-6">
      <div
        className={cn(
          "rounded-xl border p-6 shadow-sm",
          isGood
            ? "border-amber-500/30 bg-amber-500/5"
            : "border-destructive/30 bg-destructive/5",
        )}
      >
        <p
          className={cn(
            "mb-1 text-xs font-medium tracking-widest uppercase",
            isGood ? "text-amber-500" : "text-destructive",
          )}
        >
          {isGood ? "Ending — Salvation" : "Ending — The Fallen"}
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

      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground">The story is complete.</p>
        <Button variant="outline" size="lg" onClick={onRestart}>
          Play Again
        </Button>
      </div>
    </div>
  )
}
