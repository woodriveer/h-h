export interface Choice {
  text: string
  nextId: string
}

export interface Battle {
  description: string
  diceMax: number
  winMin: number
  winMax?: number
  winNextId: string
}

export interface StoryNode {
  id: string
  title: string
  text: string
  image?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  choices?: Choice[]
  battle?: Battle
  isEnding?: boolean
  endingType?: "good" | "bad"
}

export type PathStepExit =
  | { type: "choice"; text: string }
  | { type: "battle"; result: number; attempts: number }

export interface PathStep {
  nodeId: string
  title: string
  image?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  endingType?: "good" | "bad"
  exit?: PathStepExit
}

export function checkWin(result: number, battle: Battle): boolean {
  const max = battle.winMax ?? battle.diceMax
  return result >= battle.winMin && result <= max
}
