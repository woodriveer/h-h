import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import type { GameResult, PlayerStats } from "@/lib/supabase/types"
import type { PathStep } from "@/lib/story-engine"

function computeStats(results: GameResult[]): PlayerStats {
  const total = results.length
  const good = results.filter((r) => r.ending_type === "good").length
  const goodRate = total > 0 ? Math.round((good / total) * 100) : 0

  // Count total battle dice rolls across all games
  let totalAttempts = 0
  let battleCount = 0
  for (const r of results) {
    const path = r.path as PathStep[]
    for (const step of path) {
      if (step.exit?.type === "battle") {
        totalAttempts++
        battleCount++
      }
    }
  }

  return {
    total_games: total,
    good_endings: good,
    good_ending_rate: goodRate,
    avg_battle_attempts: battleCount > 0 ? Math.round((totalAttempts / battleCount) * 10) / 10 : null,
  }
}

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth?redirectTo=/profile")

  const [{ data: profile }, { data: results }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase
      .from("game_results")
      .select("*")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false }),
  ])

  const stats = computeStats((results ?? []) as GameResult[])

  return (
    <main className="flex min-h-svh justify-center p-4 py-16">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Player
          </p>
          <h1 className="text-3xl font-bold">{profile?.nickname ?? "Unknown"}</h1>
        </div>

        {/* Stats grid */}
        <div className="mb-8 grid grid-cols-3 gap-3">
          <StatCard label="Games Played" value={stats.total_games} />
          <StatCard label="Good Endings" value={`${stats.good_ending_rate}%`} />
          <StatCard
            label="Avg. Battle Attempts"
            value={stats.avg_battle_attempts != null ? stats.avg_battle_attempts : "—"}
          />
        </div>

        {/* Recent games */}
        {stats.total_games > 0 && (
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border px-5 py-4">
              <h2 className="font-semibold">Recent Games</h2>
            </div>
            <ul>
              {((results ?? []) as GameResult[]).slice(0, 10).map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between gap-3 border-b border-border/50 px-5 py-3 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">{r.ending_title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(r.completed_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      r.ending_type === "good"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {r.ending_type === "good" ? "Salvation" : "Fallen"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {stats.total_games === 0 && (
          <p className="text-sm text-muted-foreground">
            No games recorded yet.{" "}
            <Link href="/game" className="underline underline-offset-2">
              Play now
            </Link>
          </p>
        )}

        <div className="mt-8">
          <Link href="/friends">
            <Button variant="outline">Friends &amp; Feed</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <p className="mb-1 text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
