import { getLocale } from "next-intl/server"
import { getStoryNodes, STARTING_NODE } from "@/lib/story-data"
import { GameClient } from "./game-client"

export default async function GamePage() {
  const locale = await getLocale()
  const storyNodes = getStoryNodes(locale)

  return <GameClient storyNodes={storyNodes} startingNode={STARTING_NODE} />
}
