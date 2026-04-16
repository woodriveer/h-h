export type EndingType = "good" | "bad"
export type FriendshipStatus = "pending" | "accepted" | "declined"

export interface Profile {
  id: string
  nickname: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
}

export interface GameResult {
  id: string
  user_id: string
  ending_type: EndingType
  ending_title: string
  path: import("@/lib/story-engine").PathStep[]
  completed_at: string
}

export interface Friendship {
  id: string
  requester_id: string
  addressee_id: string
  status: FriendshipStatus
  created_at: string
}

// Enriched types for UI
export interface FriendWithProfile {
  friendship: Friendship
  profile: Profile
}

export interface FeedItem {
  result: GameResult
  profile: Profile
}

export interface PlayerStats {
  total_games: number
  good_endings: number
  good_ending_rate: number
  avg_battle_attempts: number | null
}
