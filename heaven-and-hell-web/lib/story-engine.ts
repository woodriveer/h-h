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
  choices?: Choice[]
  battle?: Battle
  isEnding?: boolean
  endingType?: "good" | "bad"
}

export function checkWin(result: number, battle: Battle): boolean {
  const max = battle.winMax ?? battle.diceMax
  return result >= battle.winMin && result <= max
}
