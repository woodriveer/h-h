"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { PathStep } from "@/lib/story-engine"

interface JourneyPanelProps {
  path: PathStep[]
  open: boolean
  onClose: () => void
}

export function JourneyPanel({ path, open, onClose }: JourneyPanelProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background/95 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Journey so far"
    >
      <div className="mx-auto w-full max-w-2xl px-4 py-6">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Your path
            </p>
            <h2 className="text-2xl font-bold">Journey So Far</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close journey">
            ✕
          </Button>
        </div>

        {/* Timeline */}
        <ol>
          {path.map((step, i) => {
            const isLast = i === path.length - 1
            const isCurrent = isLast && !step.exit
            const isEnding = !!step.endingType

            return (
              <li key={`${step.nodeId}-${i}`} className="relative flex gap-4">
                {/* Left column: dot + connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold",
                      isCurrent && !isEnding &&
                        "border-primary bg-primary text-primary-foreground",
                      isEnding && step.endingType === "good" &&
                        "border-amber-500 bg-amber-500/20 text-amber-600 dark:text-amber-400",
                      isEnding && step.endingType === "bad" &&
                        "border-destructive bg-destructive/20 text-destructive",
                      !isCurrent && !isEnding &&
                        "border-border bg-muted text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </div>
                  {/* Vertical connector */}
                  {!isLast && (
                    <div className="mt-1 w-px flex-1 bg-border" style={{ minHeight: "2rem" }} />
                  )}
                </div>

                {/* Right column: content */}
                <div className="mb-2 min-w-0 flex-1 pb-4">
                  {/* Node card */}
                  <div
                    className={cn(
                      "overflow-hidden rounded-lg border",
                      isCurrent && !isEnding && "border-primary/30 bg-primary/5",
                      isEnding && step.endingType === "good" &&
                        "border-amber-500/30 bg-amber-500/5",
                      isEnding && step.endingType === "bad" &&
                        "border-destructive/30 bg-destructive/5",
                      !isCurrent && !isEnding && "border-border bg-card",
                    )}
                  >
                    {step.image && (
                      <img
                        src={step.image}
                        alt={step.title}
                        className="h-28 w-full object-cover"
                      />
                    )}
                    <div className="px-3 py-2">
                      <p
                        className={cn(
                          "text-sm font-semibold",
                          isEnding && step.endingType === "good" &&
                            "text-amber-600 dark:text-amber-400",
                          isEnding && step.endingType === "bad" && "text-destructive",
                        )}
                      >
                        {step.title}
                        {isCurrent && (
                          <span className="ml-2 text-xs font-normal text-muted-foreground">
                            — current
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Exit connector: what the player chose or rolled */}
                  {step.exit && (
                    <div className="mt-2 flex items-center gap-1.5 pl-1 text-xs text-muted-foreground">
                      {step.exit.type === "choice" ? (
                        <>
                          <span className="text-foreground/40">→</span>
                          <span className="italic">&ldquo;{step.exit.text}&rdquo;</span>
                        </>
                      ) : (
                        <>
                          <span className="text-foreground/40">→</span>
                          <span>
                            Rolled <strong className="text-foreground">{step.exit.result}</strong>
                            {" — Victory"}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
