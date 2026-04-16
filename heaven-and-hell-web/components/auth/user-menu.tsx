"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import type { Profile } from "@/lib/supabase/types"

interface UserMenuProps {
  profile: Profile | null
}

export function UserMenu({ profile }: UserMenuProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    router.push("/game")
    router.refresh()
  }

  if (!profile) {
    return (
      <Link href="/auth">
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
          Sign In
        </Button>
      </Link>
    )
  }

  const initial = profile.nickname.charAt(0).toUpperCase()

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground transition-opacity hover:opacity-80"
        aria-label="User menu"
      >
        {initial}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          {/* Dropdown */}
          <div className="absolute right-0 top-10 z-50 w-44 overflow-hidden rounded-xl border border-border bg-card shadow-lg animate-in fade-in duration-150">
            <div className="border-b border-border px-3 py-2">
              <p className="text-xs font-semibold text-foreground">{profile.nickname}</p>
            </div>
            <div className="py-1">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-sm text-foreground/80 hover:bg-muted"
              >
                My Stats
              </Link>
              <Link
                href="/friends"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-sm text-foreground/80 hover:bg-muted"
              >
                Friends
              </Link>
              <button
                onClick={signOut}
                className={cn(
                  "w-full px-3 py-2 text-left text-sm text-destructive hover:bg-muted",
                )}
              >
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
