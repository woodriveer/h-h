"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { StoryScene } from "@/components/game/story-scene"
import { BattleScene } from "@/components/game/battle-scene"
import { EndingScene } from "@/components/game/ending-scene"
import { JourneyPanel } from "@/components/game/journey-panel"
import { Button } from "@/components/ui/button"
import { saveGameResult } from "@/app/actions/save-game-result"
import type { Choice, PathStep, StoryNode } from "@/lib/story-engine"

function makeStep(node: StoryNode): PathStep {
  return {
    nodeId: node.id,
    title: node.title,
    image: node.image,
    endingType: node.endingType,
  }
}

interface GameClientProps {
  storyNodes: Record<string, StoryNode>
  startingNode: string
}

export function GameClient({ storyNodes, startingNode }: GameClientProps) {
  const t = useTranslations("game")

  const [nodeId, setNodeId] = useState(startingNode)
  const [path, setPath] = useState<PathStep[]>([makeStep(storyNodes[startingNode])])
  const [showJourney, setShowJourney] = useState(false)
  const savedRef = useRef(false)

  const node: StoryNode | undefined = storyNodes[nodeId]

  useEffect(() => {
    if (node?.isEnding && node.endingType && !savedRef.current) {
      savedRef.current = true
      saveGameResult(node.endingType, node.title, path)
    }
  }, [node, path])

  if (!node) {
    return (
      <main className="flex min-h-svh items-center justify-center p-4">
        <p className="text-muted-foreground">{t("nodeNotFound", { nodeId })}</p>
      </main>
    )
  }

  const handleChoice = (choice: Choice) => {
    const nextNode = storyNodes[choice.nextId]
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

  const handleBattleWin = (nextId: string, diceResult: number, attempts: number) => {
    const nextNode = storyNodes[nextId]
    setPath((prev) => {
      const updated = [...prev]
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        exit: { type: "battle", result: diceResult, attempts },
      }
      return [...updated, makeStep(nextNode)]
    })
    setNodeId(nextId)
  }

  const handleRestart = () => {
    const startNode = storyNodes[startingNode]
    setNodeId(startingNode)
    setPath([makeStep(startNode)])
    setShowJourney(false)
    savedRef.current = false
  }

  return (
    <>
      <main className="flex min-h-svh justify-center p-4 py-10">
        <div className="w-full max-w-2xl">
          {!node.isEnding && (
            <div className="mb-4 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setShowJourney(true)}
              >
                {t("journeyButton", { count: path.length })}
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
              <p className="text-muted-foreground">{t("invalidNode")}</p>
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
