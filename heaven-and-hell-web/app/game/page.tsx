"use client"

import { useState } from "react"
import { STORY_NODES, STARTING_NODE } from "@/lib/story-data"
import { StoryScene } from "@/components/game/story-scene"
import { BattleScene } from "@/components/game/battle-scene"
import { EndingScene } from "@/components/game/ending-scene"
import { JourneyPanel } from "@/components/game/journey-panel"
import { Button } from "@/components/ui/button"
import type { Choice, PathStep, StoryNode } from "@/lib/story-engine"

function makeStep(node: StoryNode): PathStep {
  return {
    nodeId: node.id,
    title: node.title,
    image: node.image,
    endingType: node.endingType,
  }
}

export default function GamePage() {
  const [nodeId, setNodeId] = useState(STARTING_NODE)
  const [path, setPath] = useState<PathStep[]>([makeStep(STORY_NODES[STARTING_NODE])])
  const [showJourney, setShowJourney] = useState(false)

  const node: StoryNode | undefined = STORY_NODES[nodeId]

  if (!node) {
    return (
      <main className="flex min-h-svh items-center justify-center p-4">
        <p className="text-muted-foreground">Story node &quot;{nodeId}&quot; not found.</p>
      </main>
    )
  }

  const handleChoice = (choice: Choice) => {
    const nextNode = STORY_NODES[choice.nextId]
    setPath((prev) => {
      const updated = [...prev]
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        exit: { type: "choice", text: choice.text },
      }
      return [...updated, makeStep(nextNode)]
    })
    setNodeId(choice.nextId)
  }

  const handleBattleWin = (nextId: string, diceResult: number) => {
    const nextNode = STORY_NODES[nextId]
    setPath((prev) => {
      const updated = [...prev]
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        exit: { type: "battle", result: diceResult },
      }
      return [...updated, makeStep(nextNode)]
    })
    setNodeId(nextId)
  }

  const handleRestart = () => {
    const startNode = STORY_NODES[STARTING_NODE]
    setNodeId(STARTING_NODE)
    setPath([makeStep(startNode)])
    setShowJourney(false)
  }

  return (
    <>
      <main className="flex min-h-svh justify-center p-4 py-10">
        <div className="w-full max-w-2xl">
          {/* Journey button — visible during gameplay, hidden at endings */}
          {!node.isEnding && (
            <div className="mb-4 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setShowJourney(true)}
              >
                Journey ({path.length})
              </Button>
            </div>
          )}

          <div key={nodeId} className="animate-in fade-in duration-500">
            {node.isEnding ? (
              <EndingScene
                node={{ ...node, isEnding: true as const }}
                path={path}
                onRestart={handleRestart}
              />
            ) : node.battle ? (
              <BattleScene
                node={{ ...node, battle: node.battle }}
                onWin={handleBattleWin}
              />
            ) : node.choices ? (
              <StoryScene
                node={{ ...node, choices: node.choices }}
                onChoice={handleChoice}
              />
            ) : (
              <p className="text-muted-foreground">Invalid story node.</p>
            )}
          </div>
        </div>
      </main>

      <JourneyPanel
        path={path}
        open={showJourney}
        onClose={() => setShowJourney(false)}
      />
    </>
  )
}
