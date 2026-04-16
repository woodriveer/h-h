"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { sendFriendRequest } from "@/app/actions/friend-actions"
import type { Profile } from "@/lib/supabase/types"

export function FriendSearch({ currentUserId }: { currentUserId: string }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Profile[]>([])
  const [searching, setSearching] = useState(false)
  const [sent, setSent] = useState<Set<string>>(new Set())
  const [isPending, startTransition] = useTransition()

  const supabase = createClient()

  async function search() {
    if (!query.trim()) return
    setSearching(true)
    const q = query.trim()

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .or(`nickname.ilike.%${q}%,full_name.ilike.%${q}%`)
      .neq("id", currentUserId)
      .limit(10)

    setResults((data ?? []) as Profile[])
    setSearching(false)
  }

  function handleSend(addresseeId: string) {
    startTransition(async () => {
      const { error } = await sendFriendRequest(addresseeId)
      if (!error) setSent((prev) => new Set([...prev, addresseeId]))
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search by nickname or name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
        <Button onClick={search} disabled={searching} variant="outline">
          {searching ? "…" : "Search"}
        </Button>
      </div>

      {results.length > 0 && (
        <ul className="flex flex-col gap-2">
          {results.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold">{p.nickname}</p>
                {p.full_name && (
                  <p className="text-xs text-muted-foreground">{p.full_name}</p>
                )}
              </div>
              <Button
                size="sm"
                variant={sent.has(p.id) ? "ghost" : "outline"}
                disabled={sent.has(p.id) || isPending}
                onClick={() => handleSend(p.id)}
              >
                {sent.has(p.id) ? "Sent ✓" : "Add Friend"}
              </Button>
            </li>
          ))}
        </ul>
      )}

      {results.length === 0 && query && !searching && (
        <p className="text-sm text-muted-foreground">No players found.</p>
      )}
    </div>
  )
}
