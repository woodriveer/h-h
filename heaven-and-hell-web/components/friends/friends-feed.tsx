"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { FeedItem } from "@/lib/supabase/types"
import type { PathStep } from "@/lib/story-engine"

export function FriendsFeed({ items }: { items: FeedItem[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No activity yet. Add friends and play together!
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <FeedCard key={item.result.id} item={item} />
      ))}
    </div>
  )
}

function FeedCard({ item }: { item: FeedItem }) {
  const [expanded, setExpanded] = useState(false)
  const { result, profile } = item
  const isGood = result.ending_type === "good"
  const path = result.path as PathStep[]

  // Count battle dice rolls in this game
  const battleRolls = path.filter((s) => s.exit?.type === "battle").length

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {profile.nickname.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold">{profile.nickname}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(result.completed_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              isGood
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "bg-destructive/10 text-destructive",
            )}
          >
            {isGood ? "Salvation" : "Fallen"}
          </span>
        </div>

        <p className="mt-2 text-sm font-medium">{result.ending_title}</p>

        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{path.length} steps</span>
          {battleRolls > 0 && <span>{battleRolls} battle{battleRolls > 1 ? "s" : ""} won</span>}
          <button
            className="ml-auto underline underline-offset-2 hover:text-foreground"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Hide path" : "View path"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          <ol className="flex flex-col gap-1">
            {path.map((step, i) => {
              const isLast = i === path.length - 1
              return (
                <li key={`${step.nodeId}-${i}`} className="flex items-start gap-2">
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                      isLast && isGood && "bg-amber-500/20 text-amber-600 dark:text-amber-400",
                      isLast && !isGood && "bg-destructive/20 text-destructive",
                      !isLast && "bg-muted text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{step.title}</p>
                    {step.exit && (
                      <p className="text-[11px] text-muted-foreground">
                        {step.exit.type === "choice" ? (
                          <span className="italic">&ldquo;{step.exit.text}&rdquo;</span>
                        ) : (
                          <span>Rolled {step.exit.result}</span>
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
    </div>
  )
}
