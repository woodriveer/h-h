import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { FriendSearch } from "@/components/friends/friend-search"
import { FriendRequests } from "@/components/friends/friend-requests"
import { FriendsFeed } from "@/components/friends/friends-feed"
import type { FeedItem, Friendship, GameResult, Profile } from "@/lib/supabase/types"

export default async function FriendsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth?redirectTo=/friends")

  // Parallel fetch: incoming pending requests + accepted friends' feed
  const [{ data: incomingRaw }, { data: feedRaw }, { data: acceptedFriendships }] =
    await Promise.all([
      // Pending requests addressed to me
      supabase
        .from("friendships")
        .select("*")
        .eq("addressee_id", user.id)
        .eq("status", "pending"),

      // Recent results from the friends_feed view (accepts RLS)
      supabase
        .from("friends_feed")
        .select("*")
        .order("completed_at", { ascending: false })
        .limit(20),

      // Accepted friendships so we can show accepted friends list
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

  // Build feed items
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

  return (
    <main className="flex min-h-svh justify-center p-4 py-16">
      <div className="w-full max-w-xl space-y-8">
        {/* Header */}
        <div>
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Social
          </p>
          <h1 className="text-3xl font-bold">Friends</h1>
          {friendCount > 0 && (
            <p className="mt-1 text-sm text-muted-foreground">
              {friendCount} friend{friendCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Pending requests */}
        {pendingRequests.length > 0 && (
          <FriendRequests requests={pendingRequests} />
        )}

        {/* Add friend */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 font-semibold">Add Friend</h2>
          <FriendSearch currentUserId={user.id} />
        </div>

        {/* Friends activity feed */}
        <div>
          <h2 className="mb-3 font-semibold">Friends&apos; Activity</h2>
          <FriendsFeed items={feedItems} />
        </div>
      </div>
    </main>
  )
}
