import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { FriendSearch } from "@/components/friends/friend-search"
import { FriendRequests } from "@/components/friends/friend-requests"
import { FriendsFeed } from "@/components/friends/friends-feed"
import type { FeedItem, Friendship, GameResult, PlayerStats, Profile } from "@/lib/supabase/types"
import type { PathStep } from "@/lib/story-engine"
import { getTranslations } from "next-intl/server"

function computeStats(results: GameResult[]): PlayerStats {
  const total = results.length
  const good = results.filter((r) => r.ending_type === "good").length
  const goodRate = total > 0 ? Math.round((good / total) * 100) : 0

  let totalAttempts = 0
  let battleCount = 0
  for (const r of results) {
    const path = r.path as PathStep[]
    for (const step of path) {
      if (step.exit?.type === "battle") {
        totalAttempts += step.exit.attempts ?? 1
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
  const t = await getTranslations()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth?redirectTo=/profile")

  const [
    { data: profile },
    { data: results },
    { data: incomingRaw },
    { data: feedRaw },
    { data: acceptedFriendships },
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase
      .from("game_results")
      .select("*")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false }),
    supabase
      .from("friendships")
      .select("*")
      .eq("addressee_id", user.id)
      .eq("status", "pending"),
    supabase
      .from("friends_feed")
      .select("*")
      .order("completed_at", { ascending: false })
      .limit(20),
    supabase
      .from("friendships")
      .select("*")
      .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)
      .eq("status", "accepted"),
  ])

  // Enrich pending requests with requester profiles
  const incomingFriendships = (incomingRaw ?? []) as Friendship[]
  const requesterIds = incomingFriendships.map((f) => f.requester_id)
  const { data: requesterProfiles } = requesterIds.length
    ? await supabase.from("profiles").select("*").in("id", requesterIds)
    : { data: [] }

  const profileMap = Object.fromEntries(
    ((requesterProfiles ?? []) as Profile[]).map((p) => [p.id, p]),
  )

  const pendingRequests = incomingFriendships
    .map((f) => ({ friendship: f, requester: profileMap[f.requester_id] }))
    .filter((r) => r.requester != null)

  const feedItems: FeedItem[] = ((feedRaw ?? []) as (GameResult & {
    nickname: string
    full_name: string | null
    avatar_url: string | null
  })[]).map((row) => ({
    result: {
      id: row.id,
      user_id: row.user_id,
      ending_type: row.ending_type,
      ending_title: row.ending_title,
      path: row.path,
      completed_at: row.completed_at,
    },
    profile: {
      id: row.user_id,
      nickname: row.nickname,
      full_name: row.full_name,
      avatar_url: row.avatar_url,
      created_at: "",
    },
  }))

  const friendCount = (acceptedFriendships ?? []).length
  const stats = computeStats((results ?? []) as GameResult[])

  return (
    <main className="flex min-h-svh justify-center p-4 py-16">
      <div className="w-full max-w-xl space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {t("profile.player")}
            </p>
            <h1 className="text-3xl font-bold">{profile?.nickname ?? "Unknown"}</h1>
          </div>
          <Link href="/" className="shrink-0 mt-1">
            <Button variant="outline" size="sm">{t("profile.play_game")}</Button>
          </Link>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard label={t("profile.games_played")} value={stats.total_games} />
          <StatCard label={t("profile.good_endings")} value={`${stats.good_ending_rate}%`} />
          <StatCard
            label={t("profile.avg_battle_attempts")}
            value={stats.avg_battle_attempts != null ? stats.avg_battle_attempts : "—"}
          />
        </div>

        {/* Recent games */}
        {stats.total_games > 0 && (
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border px-5 py-4">
              <h2 className="font-semibold">{t("profile.recent_games")}</h2>
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
                    {r.ending_type === "good" ? t("profile.salvation") : t("profile.fallen")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {stats.total_games === 0 && (
          <p className="text-sm text-muted-foreground">
            {t("profile.no_games_recorded")}{" "}
            <Link href="/game" className="underline underline-offset-2">
              {t("profile.play_now")}
            </Link>
          </p>
        )}

        {/* Social section */}
        <div>
          <p className="mb-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            {t("profile.friends_section")}
          </p>
          <h2 className="mb-1 text-2xl font-bold">Friends</h2>
          {friendCount > 0 && (
            <p className="mb-6 text-sm text-muted-foreground">
              {t("profile.friend_count", { count: friendCount })}
            </p>
          )}
          {friendCount === 0 && <div className="mb-6" />}
        </div>

        {/* Pending requests */}
        {pendingRequests.length > 0 && (
          <FriendRequests requests={pendingRequests} />
        )}

        {/* Add friend */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 font-semibold">{t("profile.add_friend")}</h2>
          <FriendSearch currentUserId={user.id} />
        </div>

        {/* Friends activity feed */}
        <div>
          <h2 className="mb-3 font-semibold">{t("profile.friends_activity")}</h2>
          <FriendsFeed items={feedItems} />
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
