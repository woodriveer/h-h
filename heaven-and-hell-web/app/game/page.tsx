import { getLocale } from "next-intl/server"
import { getStoryNodes } from "@/lib/story-data"
import { GameClient } from "./game-client"

export default async function GamePage() {
  const locale = await getLocale()
  const storyNodes = getStoryNodes(locale)

  return <GameClient storyNodes={storyNodes} />
}
