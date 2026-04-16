"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function sendFriendRequest(addresseeId: string): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }
  if (user.id === addresseeId) return { error: "Cannot add yourself" }

  const { error } = await supabase.from("friendships").insert({
    requester_id: user.id,
    addressee_id: addresseeId,
  })

  if (error) return { error: error.message }

  revalidatePath("/friends")
  return { error: null }
}

export async function respondToRequest(
  friendshipId: string,
  response: "accepted" | "declined",
): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase
    .from("friendships")
    .update({ status: response })
    .eq("id", friendshipId)
    .eq("addressee_id", user.id) // RLS also enforces this

  if (error) return { error: error.message }

  revalidatePath("/friends")
  return { error: null }
}
