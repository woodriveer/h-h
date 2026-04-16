"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { respondToRequest } from "@/app/actions/friend-actions"
import type { Friendship, Profile } from "@/lib/supabase/types"

interface PendingRequest {
  friendship: Friendship
  requester: Profile
}

export function FriendRequests({ requests }: { requests: PendingRequest[] }) {
  const [resolved, setResolved] = useState<Set<string>>(new Set())
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handle(friendshipId: string, response: "accepted" | "declined") {
    startTransition(async () => {
      await respondToRequest(friendshipId, response)
      setResolved((prev) => new Set([...prev, friendshipId]))
      router.refresh()
    })
  }

  const visible = requests.filter((r) => !resolved.has(r.friendship.id))

  if (visible.length === 0) return null

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-semibold">Friend Requests</h2>
        <p className="text-xs text-muted-foreground">{visible.length} pending</p>
      </div>
      <ul>
        {visible.map(({ friendship, requester }) => (
          <li
            key={friendship.id}
            className="flex items-center justify-between gap-3 border-b border-border/50 px-5 py-3 last:border-0"
          >
            <div>
              <p className="text-sm font-semibold">{requester.nickname}</p>
              {requester.full_name && (
                <p className="text-xs text-muted-foreground">{requester.full_name}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={isPending}
                onClick={() => handle(friendship.id, "accepted")}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground"
                disabled={isPending}
                onClick={() => handle(friendship.id, "declined")}
              >
                Decline
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
