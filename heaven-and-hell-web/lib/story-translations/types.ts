export interface StoryNodeTranslation {
  title: string
  text: string
  choices?: string[]          // ordered by choice index
  battle?: { description: string }
}

export type StoryTranslation = Record<string, StoryNodeTranslation>
