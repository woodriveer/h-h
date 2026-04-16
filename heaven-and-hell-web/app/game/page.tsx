"use client"

import { useState } from "react"
import { STORY_NODES, STARTING_NODE } from "@/lib/story-data"
import { StoryScene } from "@/components/game/story-scene"
import { BattleScene } from "@/components/game/battle-scene"
import { EndingScene } from "@/components/game/ending-scene"
import type { StoryNode } from "@/lib/story-engine"

export default function GamePage() {
  const [nodeId, setNodeId] = useState(STARTING_NODE)

  const node: StoryNode | undefined = STORY_NODES[nodeId]

  if (!node) {
    return (
      <main className="flex min-h-svh items-center justify-center p-4">
        <p className="text-muted-foreground">Story node &quot;{nodeId}&quot; not found.</p>
      </main>
    )
  }

  return (
    <main className="flex min-h-svh justify-center p-4 py-10">
      <div key={nodeId} className="w-full max-w-2xl">
        {node.isEnding ? (
          <EndingScene
            node={{ ...node, isEnding: true as const }}
            onRestart={() => setNodeId(STARTING_NODE)}
          />
        ) : node.battle ? (
          <BattleScene
            node={{ ...node, battle: node.battle }}
            onWin={(nextId) => setNodeId(nextId)}
          />
        ) : node.choices ? (
          <StoryScene
            node={{ ...node, choices: node.choices }}
            onChoice={(nextId) => setNodeId(nextId)}
          />
        ) : (
          <p className="text-muted-foreground">Invalid story node.</p>
        )}
      </div>
    </main>
  )
}
