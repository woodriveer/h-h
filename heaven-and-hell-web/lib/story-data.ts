import type { StoryNode } from "./story-engine"

export const STARTING_NODE = "intro"

export const STORY_NODES: Record<string, StoryNode> = {
  intro: {
    id: "intro",
    title: "The Crossroads of Eternity",
    text: `The last thing you remember is a blinding flash — then silence.

You open your eyes to a vast stone bridge stretching into the void, half bathed in cold golden light, half swallowed by churning shadow. The air smells of ozone and old ash, of something ancient deciding your fate.

A cloaked figure materializes beside you. Its face is hidden beneath a hood stitched from starlight and smoke, but its voice carries the weight of a thousand judgments.

"Welcome, wandering soul. Your story is not yet written." It gestures at the two paths ahead. "Choose wisely — or choose boldly. But do not linger. The bridge does not wait."

Behind you, there is only darkness and the fading echo of a life already lived.`,
    choices: [
      { text: "Step into the shadows", nextId: "shadow_path" },
      { text: "Walk toward the light", nextId: "light_path" },
    ],
  },

  shadow_path: {
    id: "shadow_path",
    title: "The Shadow Realm",
    text: `Cold wraps around you like a second skin the moment you step off the bridge into darkness. Shapes writhe in the void — the outlines of souls who came before you and were never heard from again.

Then it rises.

A Shade Guardian emerges from the black: eight feet of compressed shadow and hollow rage, its eye sockets burning with hellfire. It has guarded this passage since the first soul ever tried to walk it.

"Only the strong pass through shadow," it growls, the words pressing against your chest like a physical force.

It lunges without warning. You have no weapon. You have no armor. You have only your will, and whatever it is that brought you this far.

Steel yourself. This is your first test.`,
    battle: {
      description:
        "The Shade Guardian attacks! Roll 4 or higher on a d6 to overpower it with sheer force of will.",
      diceMax: 6,
      winMin: 4,
      winNextId: "shadow_victory",
    },
  },

  shadow_victory: {
    id: "shadow_victory",
    title: "The Crossroads of Souls",
    text: `The Shade dissolves with a shriek that rattles your bones, its dark form scattering into particles of cold light that drift upward and disappear.

Beyond where it stood, you find something you did not expect: a floating orb of swirling memory, pulsing with a light that is neither heaven nor hell. Images flicker inside it — a life lived in complicated ways, moments of cruelty and moments of unexpected grace, all tangled together.

A voice speaks from somewhere behind the orb. Not god. Not demon. Something older than both.

"You carry both shadow and light within you. Every soul does. But it is the choice you make now — not the life you lived — that defines what you become."

The orb waits. The bridge behind you is gone. There is only forward.`,
    choices: [
      {
        text: "Embrace the darkness — claim its power without apology",
        nextId: "fallen_ending",
      },
      {
        text: "Turn toward the light — surrender to the chance of redemption",
        nextId: "redemption_battle",
      },
    ],
  },

  fallen_ending: {
    id: "fallen_ending",
    title: "The Fallen",
    text: `You reach into the orb and drink the shadow to its depths.

It fills your chest like ice and fire at once — silencing old doubts, old guilt, old questions you never let yourself finish asking. Whatever softness was left in you crystallizes into something harder and colder and, in its own way, beautiful.

The voice behind the orb does not speak again. It simply sighs — a sound like a door closing on what might have been.

Far below, the gates of Hell swing open. Not as punishment. Not as condemnation. As a welcome.

You chose your nature. You will live in it now, and rule it, and perhaps — in some distant turn of an age — wonder what the other path held.

Your story ends here, in fire and absolute sovereignty.`,
    isEnding: true,
    endingType: "bad",
  },

  redemption_battle: {
    id: "redemption_battle",
    title: "The Trial of Redemption",
    text: `You turn from the shadow and reach toward the light.

It does not come easily.

Three Angels of Judgment descend from above — beings of cold, perfect radiance, their eyes like scales that have weighed ten thousand souls and found most of them wanting. They do not speak immediately. They look at you the way a flame looks at tinder.

"Redemption is not a gift," one says at last. "It is not mercy. It is earned. Through the bare substance of who you are — not who you intended to be."

They draw swords of living flame and form a circle around you.

This is not a fight you win with strength. It is a fight you win by being, in this moment, exactly as worthy as you hope you are.`,
    battle: {
      description:
        "Face the Judgment of the Angels! Roll 3 or higher on a d6 to be found worthy of redemption.",
      diceMax: 6,
      winMin: 3,
      winNextId: "heaven_ending",
    },
  },

  light_path: {
    id: "light_path",
    title: "The Path of Light",
    text: `Warmth washes over you the moment you step into the amber glow. Ancient runes drift past like fireflies, burning briefly with recognition before dissolving into the air. This path has been walked by many. Not all of them made it to the end.

A Guardian of Truth materializes ahead — a radiant being whose presence makes you feel utterly transparent, every memory and choice laid bare like text on a page. It does not threaten you. It simply looks, and in its looking, you feel every secret you ever kept rise to the surface.

It says nothing for a long moment. Then:

"The gates are close. How you approach them matters more than you might think."

Behind the Guardian, you can almost see the shapes of what waits beyond. But between you and it is still a choice — the last one this path asks of you.`,
    choices: [
      {
        text: "Step forward boldly — you have earned your place here",
        nextId: "gates_bold",
      },
      {
        text: "Kneel in humility — you are grateful, and you know what you are",
        nextId: "gates_humble",
      },
    ],
  },

  gates_bold: {
    id: "gates_bold",
    title: "The Gate of Valor",
    text: `The Guardian tilts its head. "Boldness," it says. There is something like respect in its voice — and something like a warning.

You stand at the gates of Heaven themselves now. Pearl and gold and light so concentrated it has weight, pressing gently against your face. Between you and entry stands the Final Guardian — ancient beyond reckoning, its form shifting between human and something much larger.

"You came here with strength," it says. Its voice does not echo. It simply fills everything. "That is not nothing. But the gates do not open for strength alone. They open for something more difficult."

It extends one vast hand, palm up, waiting. Not for a weapon. Not for a battle.

For proof.`,
    battle: {
      description:
        "The Final Guardian demands proof of your worth. Roll 4 or higher on a d6 to be found worthy.",
      diceMax: 6,
      winMin: 4,
      winNextId: "heaven_ending",
    },
  },

  gates_humble: {
    id: "gates_humble",
    title: "The Gate of Grace",
    text: `The Guardian pauses for a long moment after you kneel.

"Humility," it says finally, and something in its voice has shifted — still careful, still measuring, but warmer. "That is rarer than most souls realize. Even here."

You approach the gates of Heaven, and the final Guardian who meets you is different from the one those who walk in boldness must face. Quieter. More still. It asks you nothing about strength.

"Show me," it says, "that what brought you this far was real. Not performance. Not hope. Real."

It is, in some ways, the hardest test of all — because you cannot fake it. You can only be exactly what you are and see if that is enough.`,
    battle: {
      description:
        "Prove the sincerity of your heart to the Gate Guardian. Roll 2 or higher on a d6 to enter.",
      diceMax: 6,
      winMin: 2,
      winNextId: "heaven_ending",
    },
  },

  heaven_ending: {
    id: "heaven_ending",
    title: "Heaven Awaits",
    text: `The gates open.

Not with a crash or a fanfare. Not with trumpets or proclamation. They open the way a held breath finally releases — with the quiet exhale of something that has been waiting a very long time.

Light pours through, warm and particular in a way light rarely is: it carries the scent of rain on warm stone, of bread cooling on a windowsill, of every ordinary beautiful thing you had stopped noticing and had forgotten to miss.

There are voices. Not in ceremony — in recognition. They knew you were coming. They are glad you are here.

You step through, and the bridge and the shadow and the long uncertain journey collapse into something that was, it turns out, exactly the right length.

You are home.`,
    isEnding: true,
    endingType: "good",
  },
}
