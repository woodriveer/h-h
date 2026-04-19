import type { StoryNode } from "./story-engine"
import type { StoryTranslation } from "./story-translations/types"
import { ptBRStory } from "./story-translations/pt-BR"

import valerius_start from "@/public/assets/valerious_start.png"
import valerius_img from "@/public/assets/valerius.png"
import thalassa_img from "@/public/assets/thalassa.png"
import krell_img from "@/public/assets/krell.png"
import xandros_img from "@/public/assets/xandro.png"

export const STARTING_NODE = "intro"

// ─── Structure (locale-independent) ──────────────────────────────────────────
// Only contains node IDs, image URLs, choice targets, and battle mechanics.
// User-visible text comes from the locale translation overlay.

type NodeStructure = Pick<StoryNode, "id" | "image" | "isEnding" | "endingType"> & {
  choices?: { nextId: string }[]
  battle?: { diceMax: number; winMin: number; winMax?: number; winNextId: string }
}

const NODE_STRUCTURE: NodeStructure[] = [
  // ── Legacy demo nodes (original crossroads story) ────────────────────────────
  {
    id: "intro",
    image: "https://picsum.photos/seed/eternal-bridge-mist/1200/500",
    choices: [{ nextId: "shadow_path" }, { nextId: "light_path" }],
  },
  {
    id: "shadow_path",
    image: "https://picsum.photos/seed/dark-void-shadows/1200/500",
    battle: { diceMax: 6, winMin: 4, winNextId: "shadow_victory" },
  },
  {
    id: "shadow_victory",
    image: "https://picsum.photos/seed/memory-orb-spirits/1200/500",
    choices: [{ nextId: "fallen_ending" }, { nextId: "redemption_battle" }],
  },
  {
    id: "fallen_ending",
    image: "https://picsum.photos/seed/hellfire-descent/1200/500",
    isEnding: true,
    endingType: "bad",
  },
  {
    id: "redemption_battle",
    image: "https://picsum.photos/seed/angels-judgment-light/1200/500",
    battle: { diceMax: 6, winMin: 3, winNextId: "heaven_ending" },
  },
  {
    id: "light_path",
    image: "https://picsum.photos/seed/golden-radiance-path/1200/500",
    choices: [{ nextId: "gates_bold" }, { nextId: "gates_humble" }],
  },
  {
    id: "gates_bold",
    image: "https://picsum.photos/seed/pearl-gates-valor/1200/500",
    battle: { diceMax: 6, winMin: 4, winNextId: "heaven_ending" },
  },
  {
    id: "gates_humble",
    image: "https://picsum.photos/seed/grace-kneeling-light/1200/500",
    battle: { diceMax: 6, winMin: 2, winNextId: "heaven_ending" },
  },
  {
    id: "heaven_ending",
    image: "https://picsum.photos/seed/heaven-golden-peace/1200/500",
    isEnding: true,
    endingType: "good",
  },

  // ── Valerius Bolt — Capítulo 1: Os Picos Estilhaçados ────────────────────────
  {
    id: "valerius_start",
    image: valerius_start,
    choices: [{ nextId: "valerius_fight_start" }, { nextId: "valerius_let_go" }],
  },
  {
    id: "valerius_fight_start",
    image: "https://picsum.photos/seed/lightning-battle-mountain-storm/1200/500",
    battle: { diceMax: 8, winMin: 5, winNextId: "valerius_fight_aftermath" },
  },
  {
    id: "valerius_fight_aftermath",
    image: "https://picsum.photos/seed/apocalypse-red-sky-invasion/1200/500",
    choices: [{ nextId: "valerius_horde_phase1" }],
  },
  {
    id: "valerius_horde_phase1",
    image: "https://picsum.photos/seed/narrow-mountain-pass-battle/1200/500",
    battle: { diceMax: 6, winMin: 3, winNextId: "valerius_horde_phase2" },
  },
  {
    id: "valerius_horde_phase2",
    image: "https://picsum.photos/seed/aerial-commander-four-arms/1200/500",
    battle: { diceMax: 6, winMin: 4, winNextId: "valerius_horde_phase3" },
  },
  {
    id: "valerius_horde_phase3",
    image: "https://picsum.photos/seed/desperate-mountain-escape-dark/1200/500",
    choices: [{ nextId: "valerius_climax" }],
  },
  {
    id: "valerius_climax",
    image: "https://picsum.photos/seed/lone-warrior-mountaintop-storm/1200/500",
    battle: { diceMax: 6, winMin: 2, winNextId: "valerius_epilogue" },
  },
  {
    id: "valerius_epilogue",
    image: valerius_img,
    isEnding: true,
    endingType: "good",
  },
  // Path B — Mantenha seus Inimigos por Perto
  {
    id: "valerius_let_go",
    image: "/assets/valerius_let_go.png",
    choices: [{ nextId: "valerius_spy" }],
  },
  {
    id: "valerius_spy",
    image: "https://picsum.photos/seed/massive-demon-army-obsidian-arches/1200/500",
    choices: [{ nextId: "valerius_epilogue_b" }],
  },
  {
    id: "valerius_epilogue_b",
    image: valerius_img,
    isEnding: true,
    endingType: "good",
  },

  {
    id: "thalassa_start",
    image: thalassa_img,
    choices: [{ nextId: "thalassa_coming_soon" }],
  },
  {
    id: "thalassa_coming_soon",
    image: "https://picsum.photos/seed/forest-guardian-ancient-roots/1200/500",
    isEnding: true,
    endingType: "good",
  },

  {
    id: "krell_start",
    image: krell_img,
    choices: [{ nextId: "krell_coming_soon" }],
  },
  {
    id: "krell_coming_soon",
    image: "https://picsum.photos/seed/runic-warrior-stone-fortress/1200/500",
    isEnding: true,
    endingType: "good",
  },

  {
    id: "xandros_start",
    image: xandros_img,
    choices: [{ nextId: "xandros_coming_soon" }],
  },
  {
    id: "xandros_coming_soon",
    image: "https://picsum.photos/seed/mage-battle-eldritch-light/1200/500",
    isEnding: true,
    endingType: "good",
  },
]

// ─── English translations (inline — keeps en as the source of truth) ──────────

const enStory: StoryTranslation = {
  intro: {
    title: "The Crossroads of Eternity",
    text: `The last thing you remember is a blinding flash — then silence.

You open your eyes to a vast stone bridge stretching into the void, half bathed in cold golden light, half swallowed by churning shadow. The air smells of ozone and old ash, of something ancient deciding your fate.

A cloaked figure materializes beside you. Its face is hidden beneath a hood stitched from starlight and smoke, but its voice carries the weight of a thousand judgments.

"Welcome, wandering soul. Your story is not yet written." It gestures at the two paths ahead. "Choose wisely — or choose boldly. But do not linger. The bridge does not wait."

Behind you, there is only darkness and the fading echo of a life already lived.`,
    choices: ["Step into the shadows", "Walk toward the light"],
  },

  shadow_path: {
    title: "The Shadow Realm",
    text: `Cold wraps around you like a second skin the moment you step off the bridge into darkness. Shapes writhe in the void — the outlines of souls who came before you and were never heard from again.

Then it rises.

A Shade Guardian emerges from the black: eight feet of compressed shadow and hollow rage, its eye sockets burning with hellfire. It has guarded this passage since the first soul ever tried to walk it.

"Only the strong pass through shadow," it growls, the words pressing against your chest like a physical force.

It lunges without warning. You have no weapon. You have no armor. You have only your will, and whatever it is that brought you this far.

Steel yourself. This is your first test.`,
    battle: {
      description: "The Shade Guardian attacks! Roll 4 or higher on a d6 to overpower it with sheer force of will.",
    },
  },

  shadow_victory: {
    title: "The Crossroads of Souls",
    text: `The Shade dissolves with a shriek that rattles your bones, its dark form scattering into particles of cold light that drift upward and disappear.

Beyond where it stood, you find something you did not expect: a floating orb of swirling memory, pulsing with a light that is neither heaven nor hell. Images flicker inside it — a life lived in complicated ways, moments of cruelty and moments of unexpected grace, all tangled together.

A voice speaks from somewhere behind the orb. Not god. Not demon. Something older than both.

"You carry both shadow and light within you. Every soul does. But it is the choice you make now — not the life you lived — that defines what you become."

The orb waits. The bridge behind you is gone. There is only forward.`,
    choices: [
      "Embrace the darkness — claim its power without apology",
      "Turn toward the light — surrender to the chance of redemption",
    ],
  },

  fallen_ending: {
    title: "The Fallen",
    text: `You reach into the orb and drink the shadow to its depths.

It fills your chest like ice and fire at once — silencing old doubts, old guilt, old questions you never let yourself finish asking. Whatever softness was left in you crystallizes into something harder and colder and, in its own way, beautiful.

The voice behind the orb does not speak again. It simply sighs — a sound like a door closing on what might have been.

Far below, the gates of Hell swing open. Not as punishment. Not as condemnation. As a welcome.

You chose your nature. You will live in it now, and rule it, and perhaps — in some distant turn of an age — wonder what the other path held.

Your story ends here, in fire and absolute sovereignty.`,
  },

  redemption_battle: {
    title: "The Trial of Redemption",
    text: `You turn from the shadow and reach toward the light.

It does not come easily.

Three Angels of Judgment descend from above — beings of cold, perfect radiance, their eyes like scales that have weighed ten thousand souls and found most of them wanting. They do not speak immediately. They look at you the way a flame looks at tinder.

"Redemption is not a gift," one says at last. "It is not mercy. It is earned. Through the bare substance of who you are — not who you intended to be."

They draw swords of living flame and form a circle around you.

This is not a fight you win with strength. It is a fight you win by being, in this moment, exactly as worthy as you hope you are.`,
    battle: {
      description: "Face the Judgment of the Angels! Roll 3 or higher on a d6 to be found worthy of redemption.",
    },
  },

  light_path: {
    title: "The Path of Light",
    text: `Warmth washes over you the moment you step into the amber glow. Ancient runes drift past like fireflies, burning briefly with recognition before dissolving into the air. This path has been walked by many. Not all of them made it to the end.

A Guardian of Truth materializes ahead — a radiant being whose presence makes you feel utterly transparent, every memory and choice laid bare like text on a page. It does not threaten you. It simply looks, and in its looking, you feel every secret you ever kept rise to the surface.

It says nothing for a long moment. Then:

"The gates are close. How you approach them matters more than you might think."

Behind the Guardian, you can almost see the shapes of what waits beyond. But between you and it is still a choice — the last one this path asks of you.`,
    choices: [
      "Step forward boldly — you have earned your place here",
      "Kneel in humility — you are grateful, and you know what you are",
    ],
  },

  gates_bold: {
    title: "The Gate of Valor",
    text: `The Guardian tilts its head. "Boldness," it says. There is something like respect in its voice — and something like a warning.

You stand at the gates of Heaven themselves now. Pearl and gold and light so concentrated it has weight, pressing gently against your face. Between you and entry stands the Final Guardian — ancient beyond reckoning, its form shifting between human and something much larger.

"You came here with strength," it says. Its voice does not echo. It simply fills everything. "That is not nothing. But the gates do not open for strength alone. They open for something more difficult."

It extends one vast hand, palm up, waiting. Not for a weapon. Not for a battle.

For proof.`,
    battle: {
      description: "The Final Guardian demands proof of your worth. Roll 4 or higher on a d6 to be found worthy.",
    },
  },

  gates_humble: {
    title: "The Gate of Grace",
    text: `The Guardian pauses for a long moment after you kneel.

"Humility," it says finally, and something in its voice has shifted — still careful, still measuring, but warmer. "That is rarer than most souls realize. Even here."

You approach the gates of Heaven, and the final Guardian who meets you is different from the one those who walk in boldness must face. Quieter. More still. It asks you nothing about strength.

"Show me," it says, "that what brought you this far was real. Not performance. Not hope. Real."

It is, in some ways, the hardest test of all — because you cannot fake it. You can only be exactly what you are and see if that is enough.`,
    battle: {
      description: "Prove the sincerity of your heart to the Gate Guardian. Roll 2 or higher on a d6 to enter.",
    },
  },

  heaven_ending: {
    title: "Heaven Awaits",
    text: `The gates open.

Not with a crash or a fanfare. Not with trumpets or proclamation. They open the way a held breath finally releases — with the quiet exhale of something that has been waiting a very long time.

Light pours through, warm and particular in a way light rarely is: it carries the scent of rain on warm stone, of bread cooling on a windowsill, of every ordinary beautiful thing you had stopped noticing and had forgotten to miss.

There are voices. Not in ceremony — in recognition. They knew you were coming. They are glad you are here.

You step through, and the bridge and the shadow and the long uncertain journey collapse into something that was, it turns out, exactly the right length.

You are home.`,
  },

  // ── Valerius Bolt (EN) ───────────────────────────────────────────────────────

  valerius_start: {
    title: "The Shattered Peaks — First Contact",
    text: `The air at 3,200 meters has a particular quality: thin enough to remind your lungs that breathing is optional, cold enough to make every exhale visible, and electric enough to set your hair on end even before you do anything about it.

Valerius Bolt stands on a precarious ledge, lance humming with stored charge, surveying the churning rift that appeared where sky and stone used to agree on their arrangement. The breach is shoulder-width, spitting sparks of orange and violet — and for the last thirty minutes it has been doing absolutely nothing threatening.

Then it spits out two demons.

They are, notably, confused.

Demon A — tall, crimson, absurdly thin, holding a map that is demonstrably upside down — squints at the landscape. "I'm telling you, Malphas, the instructions said 'turn left at the screaming void.' Does this look like a screaming void to you?"

Demon B — short, stout, wings that cannot possibly be aerodynamically sufficient — shields his eyes from the light. "Too bright, Slag. My eyes are doing the burning thing — and not the good kind of burning." He notices Valerius. "Hey — look. A local!"

The lance rises. Lightning dances between Valerius's fingers.

"A local?" she says. "I'm the landlord. And your rent is due in lightning. What are you doing on the Peaks?"

Slag holds up both hands. "Hang on! Lower the glowy stick, lady! We're looking for Invasion Point 4-B: The Eternal Buffet. They said there'd be defenseless villagers and some light arson. This looks like... just rocks. Is this Hell?"

"This is Earth. And you have five seconds before you become a carbon smear on these rocks."

Malphas looks appalled. "Earth? Ugh. I heard they have 'income tax' and 'social anxiety' here. Listen — if you just point us back to the nearest portal, we'll disappear. We're interns. We don't even have dental."`,
    choices: [
      "⚡ Shock and Awe — reduce them to ash",
      "🚪 Return to Sender — let them crawl back through their hole",
    ],
  },

  valerius_fight_start: {
    title: "Shock and Awe",
    battle: {
      description:
        "Slag's skin turns rubber-grey — your lightning bounces! Malphas jams a serrated iron rod into the cliff to ground your chain strikes. They're not as helpless as they look. Fight physical. Roll 5+ on a d8 to overpower them.",
    },
  },

  valerius_fight_aftermath: {
    title: "Warning Sent",
    text: `Malphas spits black ichor. His hands are shaking — but he's still moving. Still scrabbling frantically on a scrap of singed parchment while Valerius closes the distance.

"Don't."

He throws the paper into the air. It folds itself into a burning paper plane and shoots through the narrowing rift before she can reach it.

On the other side, a Pit Commander with four arms catches it. Reads it. Smiles.

The sky above the Shattered Peaks turns the color of an open wound. A sound follows: low, rhythmic, the massed wingbeats of something that has been waiting to be unleashed.

Valerius looks up. Begins counting.

Stops counting at forty.

"Right," she says.

Her grip tightens on the lance.

The sky goes red.`,
    choices: ["Brace for the horde →"],
  },

  valerius_horde_phase1: {
    title: "Phase 1: The Funnel",
    battle: {
      description:
        "The Shattered Peaks are a maze of granite needles connected by bridges barely wide enough for two. You preloaded electricity into the natural rock cracks ten seconds ago. Trigger the charge as the first wave floods the stone bridge. Roll 3+ on a d6 to send twelve demons into the abyss.",
    },
  },

  valerius_horde_phase2: {
    title: "Phase 2: The Dance",
    battle: {
      description:
        "The Pit Commander: four arms, forged-armor skin, can fly. He always pivots left — you've watched him do it three times. Lead him to the narrow fissure. Let the obsidian chains pass over your shoulders at point-blank range. Release everything in one white-lightning strike. Roll 4+ on a d6.",
    },
  },

  valerius_horde_phase3: {
    title: "Phase 3: The Escape",
    text: `The commander is down. The crater he left in the granite is still smoking.

Valerius lands.

And realizes the world is spinning.

How much did I use?

The answer arrives as immediate nausea — like someone yanking a rug from under her feet: everything. She poured every ounce of the dance's accumulated charge into one strike. The strategy worked perfectly.

And it has left her completely empty.

Sixteen demons remain. They are advancing.

She has no lightning. No sparks. The lance is a heavy metal stick in her hand, carried by pure reflex because letting go of her weapon is not something she is willing to do.

The demons are faster in the air.

But she knows this mountain.`,
    choices: ["Climb to the highest peak — worst position, last option"],
  },

  valerius_climax: {
    title: "The Price of the Peak",
    battle: {
      description:
        "Worst tactical position. Best position for a Valkyrie with nothing left. You sensed the storm front from the southwest — 3km out, moving east. Bury the lance in the granite peak. Become the lightning rod. Let physics do the rest. Roll 2+ on a d6 to survive the strike.",
    },
  },

  valerius_epilogue: {
    title: "The Signal — Chapter I Complete",
    text: `Three seconds.

That's how long the lightning lasts when a storm passes through a human body on the highest peak.

When it ends, the summit is clean. The granite nearby has vitrified. The air smells of ozone so strongly it burns.

Valerius is on her knees, hands fused to the lance buried in the rock, head bowed, breathing in pieces.

She stays like that for a long time.

—

The sky is still red when she descends. Much more slowly. Every step is a negotiation between willpower and muscles that gave more than they had.

Below, in the plains between the Peaks and the valleys, more portals keep opening. Small from up here, but she knows the real scale. She saw it before climbing.

This is not a raid. It is an invasion.

Valerius stops on an intermediate ledge. She pries a fragment of still-warm granite from the battle — saturated with electrical residue, the kind that lasts hours — and presses it into her bleeding palm. An old practice. A storm stone.

For those who knew the frequency, it was a beacon.

She didn't know if any of the others would hear it. Didn't know if Thalassa was still in the forest, if Krell still held that damned portal, if Xandros had made it out of the burning library.

But she sent the signal.

And began descending toward the central valley — equidistant from all five fronts. The Crossroads of Fate, as the old maps called it. A dramatic name for what was essentially a fork in the road with a dry fountain in the middle.

She descended. Exhausted. Without lightning. Without reserves.

With a lance, a signal sent, and the certainty that what she had seen in the valleys was too large to face alone.

Enough, she decided. For today, enough.`,
  },

  valerius_let_go: {
    title: "Return to Sender",
    text: `Valerius lowers the lance.

The sparks between her fingers don't disappear — she keeps them humming, one bad thought away from a full discharge — but she takes a step back. "All right. Close your hole and disappear. If I see either of you again, I'll make a coat from your wings."

The demons need no more convincing. They tumble back toward the rift, tripping over each other, Slag still clutching the map the wrong way, Malphas making a noise that might be gratitude or might just be reflex.

The rift begins to close.

Valerius doesn't trust them for a second.

She activates the Static Cloak — an old trick, charges the air around her body to blur her silhouette into heat shimmer — and sprints for the narrowing gap.

She slips through in the last millimeter.`,
    choices: ["Follow them deeper →"],
  },

  valerius_spy: {
    title: "What Lies Behind the Portal",
    text: `Following two lost demons through an inter-dimensional rift while hoping neither of them turns around is, objectively, not a brilliant tactical decision.

Valerius does it anyway.

The other side is a grey in-between space — warm, sulfur-scented, the air thick in a way that has nothing to do with altitude. Slag and Malphas stumble ahead, still arguing about the map. She follows at thirty feet, Static Cloak blurring her outline.

They lead her to what they called the Eternal Buffet.

It is not a restaurant.

It is a valley. And the valley is full.

Dozens of obsidian arches rise in neat rows across the valley floor — each one a portal, each one operational, each one processing an unbroken line of demons marching through in formation. Valerius watches from the ridge above. She counts arches.

Stops at sixty.

Slag and Malphas find their unit and vanish into the mass. They were the tip of the iceberg. The rift on the Peaks was a probe, a test. The real thing is this.

She understands, with absolute clarity, that she cannot fight this alone. Not today. Not ever.`,
    choices: ["Send the signal — and get out"],
  },

  valerius_epilogue_b: {
    title: "The Signal — Chapter I Complete",
    text: `Getting back out requires more luck than skill.

There's a small portal near the valley's edge — unmanned, probably maintenance access — and Valerius hits it running, Static Cloak still active, the gap barely wide enough for a human with a lance. She tumbles through onto cold granite and rolls to her feet by pure muscle memory.

Behind her, the portal snaps shut.

She doesn't stop moving until she has three ridgelines between herself and the rift's location.

Then she stops. Breathes. Takes stock.

The sky is still red.

Valerius pries a fragment of warm granite from a sun-baked ledge and presses it into her palm — saturated with enough residual charge to be felt by someone attuned to the frequency. An old practice. A storm stone.

For those who knew how to listen, it was a beacon.

She didn't know if the others were still standing. Didn't know where Thalassa was, or if Krell had finally let go of whatever he was holding closed, or if Xandros had found his spell before the library finished burning.

But she sent the signal.

And started moving toward the central valley — the old Crossroads of Fate — because the only answer to what she'd seen down there was more people. Better people. Or at least, people equally unwilling to quit.`,
  },

  // ── Thalassa "A Raiz" (EN) ───────────────────────────────────────────────────

  thalassa_start: {
    title: "The Sacred Forest — Mulch Season",
    text: `The air smells of pine resin, hellfire, and something that used to be a Hellhound.

The Sacred Forest has been burning in patches for the last three hours — the eastern grove, the clearing by the Watching Stone, the trail to the Singing Brook. The demonic incursion came in from the south, where the trees thin and the soil is still loose from last autumn's windstorm, and spread with the casual confidence of something that has never been bitten by sentient vegetation before.

It has now been bitten by sentient vegetation.

Thalassa stands at the center of the carnage, bark-armored and deeply unimpressed, her ancient staff crackling with green energy. The vines around her are not plants. They are opinions. Specifically, they have formed a very firm stance on demonic incursion involving thorns.

Three Hellhounds circle her at a distance they have learned, through recent painful experience, is the minimum safe radius.

"Get out of my forest," she says — not loudly, because she does not need to be loud. "And tell whoever opened that gate that if they damage the Old Oak, I will personally escort them back through it in a compost bag."

A vine taps her shoulder. Updates her on the east grove situation.

"That too," she says. "The east grove situation is also being dealt with."

The Hellhounds look at each other. They look at the vines. They make a sound that translates, roughly, to a request for reassignment.`,
    choices: ["Chapter 2 — Coming Soon ›"],
  },

  thalassa_coming_soon: {
    title: "To Be Continued…",
    text: `Thalassa's full chapter is being written.

The Sacred Forest will hold. It always has.

The roots run deep, the vines have opinions, and the Hellhounds are reconsidering their life choices.

Come back soon — this story is still growing.`,
  },

  // ── Krell, o Inquebrantável (EN) ─────────────────────────────────────────────

  krell_start: {
    title: "The Ruined City — Wall of One",
    text: `The portal is approximately four meters tall, pulsing with deep magenta light, and has been trying to fully open for the past forty-seven minutes.

It hasn't managed it. Because Krell is in the way.

Not strategically in the way. Not tactically blocking it. Just — standing there with both arms braced against the collapsing frame, keeping the portal at roughly thirty percent capacity through the application of pure stubbornness and the kind of strength that accumulates when you spend your formative years carrying things no one else will touch.

The runes inscribed along his forearms are doing some of the work. The rest is Krell.

Around him, the city of Valmark is mostly rubble — the western districts are gone, the market district is on fire in a way that suggests it will be on fire for some time, and the refugee column heading east has been moving without stopping since dawn. Krell watched them go. Decided the column would be safer if the portal stayed closed. Made a decision.

That was forty-seven minutes ago.

The thing on the other side has been hitting the portal regularly — testing, probing, trying to widen the gap. Each time it does, Krell braces harder and the runes flare brighter.

His arms are starting to hurt. He has not mentioned this to anyone because there is no one to mention it to.`,
    choices: ["Chapter 2 — Coming Soon ›"],
  },

  krell_coming_soon: {
    title: "To Be Continued…",
    text: `Krell's full chapter is being written.

He's still holding the portal.

He'll hold it as long as it takes.

Come back soon.`,
  },

  // ── Arquivista Xandros (EN) ───────────────────────────────────────────────────

  xandros_start: {
    title: "The Arcane Library — Appendix F",
    text: `The fire started in the east wing.

This was, objectively, the best case scenario. The east wing held the historical records, the periodical collection, and seventeen years of Archivist Xandros's personal marginalia — all of which were somewhat less irreplaceable than the theoretical spell indices in the west wing, the artifact vault in the basement, or the indexed grimoire collection in the north tower.

Xandros is currently in the north tower.

The fire is also currently in the north tower.

"It's in the appendix," he says — to no one in particular, or rather to the stack of reference volumes he is cross-checking at a speed that would be impressive under any circumstances, and is extraordinary given that he is doing it while flames advance along three of the four bookshelves adjacent to his position. "Dismiss Greater Evil is a reference spell, which puts it in the appendix, which means—"

The ceiling collapses. Three feet to his left, into the section he already searched.

"—which means," he continues, pulling the next volume from the shelf, "it's in appendix F through H. Possibly cross-referenced under 'E' for Expulsion. The indexing in this edition has always been inconsistent."

Something demonic moves at the stairwell door. Xandros points two fingers at it without looking up. A glyph trap he set thirteen minutes ago activates. Problem solved.

"Appendix G," he mutters.

"There it is."`,
    choices: ["Chapter 2 — Coming Soon ›"],
  },

  xandros_coming_soon: {
    title: "To Be Continued…",
    text: `Xandros's full chapter is being written.

He found the entry in Appendix G. Whether that helps remains to be seen.

The library may be burning, but the knowledge endures.

Come back soon.`,
  },
}

// ─── Locale map ───────────────────────────────────────────────────────────────

const translations: Record<string, StoryTranslation> = {
  en: enStory,
  "pt-BR": ptBRStory,
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function getStoryNodes(locale: string): Record<string, StoryNode> {
  const t = translations[locale] ?? enStory

  const nodes: Record<string, StoryNode> = {}

  for (const s of NODE_STRUCTURE) {
    const tr = t[s.id]
    if (!tr) continue

    const node: StoryNode = {
      id: s.id,
      title: tr.title,
      text: tr.text ?? "",
      image: s.image,
      isEnding: s.isEnding,
      endingType: s.endingType,
    }

    if (s.choices && tr.choices) {
      node.choices = s.choices.map((c, i) => ({
        text: tr.choices![i] ?? "",
        nextId: c.nextId,
      }))
    }

    if (s.battle && tr.battle) {
      node.battle = {
        description: tr.battle.description,
        diceMax: s.battle.diceMax,
        winMin: s.battle.winMin,
        winMax: s.battle.winMax,
        winNextId: s.battle.winNextId,
      }
    }

    nodes[s.id] = node
  }

  return nodes
}

// Keep backward-compatible default for any existing imports that use STORY_NODES directly
export const STORY_NODES = getStoryNodes("en")
