export interface HeroConfig {
  id: string
  image: string
  startNode: string
  available: boolean
}

export const HERO_CONFIGS: HeroConfig[] = [
  { id: "valerius", image: "/assets/valerius.png", startNode: "valerius_start", available: true },
  { id: "thalassa", image: "/assets/thalassa.png", startNode: "thalassa_start", available: true },
  { id: "krell",    image: "/assets/krell.png",    startNode: "krell_start",    available: true },
  { id: "xandros",  image: "/assets/xandro.png",   startNode: "xandros_start",  available: true },
  { id: "seraphina",image: "",                     startNode: "seraphina_start",available: false },
]
