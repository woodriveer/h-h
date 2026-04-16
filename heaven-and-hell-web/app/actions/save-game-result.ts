"use server"

import { createClient } from "@/lib/supabase/server"
import type { PathStep } from "@/lib/story-engine"

export async function saveGameResult(
  endingType: "good" | "bad",
  endingTitle: string,
  path: PathStep[],
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: null } // Silently skip if not logged in

  const { error } = await supabase.from("game_results").insert({
    user_id: user.id,
    ending_type: endingType,
    ending_title: endingTitle,
    path,
  })

  if (error) {
    console.error("Failed to save game result:", error.message)
    return { error: error.message }
  }

  return { error: null }
}
