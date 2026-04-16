"use client"

import { Button } from "@/components/ui/button"
import type { Choice, StoryNode } from "@/lib/story-engine"

interface StorySceneProps {
  node: StoryNode & { choices: NonNullable<StoryNode["choices"]> }
  onChoice: (choice: Choice) => void
}

export function StoryScene({ node, onChoice }: StorySceneProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {node.image && (
          <div className="relative h-52 w-full overflow-hidden">
            <img
              src={node.image}
              alt={node.title}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent" />
          </div>
        )}
        <div className="p-6">
          <p className="mb-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Chapter
          </p>
          <h1 className="mb-5 text-2xl font-bold text-card-foreground">{node.title}</h1>
          <div className="space-y-4">
            {node.text.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-card-foreground/90">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          What do you do?
        </p>
        {node.choices.map((choice) => (
          <Button
            key={choice.nextId}
            variant="outline"
            size="lg"
            className="h-auto justify-start py-3 text-left text-sm whitespace-normal"
            onClick={() => onChoice(choice)}
          >
            {choice.text}
          </Button>
        ))}
      </div>
    </div>
  )
}
