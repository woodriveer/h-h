export interface Hero {
  id: string
  name: string
  class: string
  vibe: string
  combatStyle: string
  image: string
  startNode: string
  available: boolean
}

export const HEROES: Hero[] = [
  {
    id: "valerius",
    name: "Valerius Bolt",
    class: "Valquíria Coroada pela Tempestade",
    vibe: '"Eu sou o raio e o trovão."',
    combatStyle: "Ataques aéreos de alta mobilidade e lanças de relâmpago perfurantes.",
    image: "/assets/valerius.png",
    startNode: "valerius_start",
    available: true,
  },
  {
    id: "thalassa",
    name: 'Thalassa "A Raiz"',
    class: "Guardiã Primordial",
    vibe: '"Sai do meu jardim... e do meu planeta."',
    combatStyle: "Controle de multidão com vinhas sencientes e pancadas pesadas de cajado.",
    image: "/assets/thalassa.png",
    startNode: "thalassa_start",
    available: true,
  },
  {
    id: "krell",
    name: "Krell, o Inquebrantável",
    class: "Juggernaut Rúnico",
    vibe: '"Esse portal parece socável? Parece."',
    combatStyle: "Força física bruta infundida com runas cinéticas crepitantes.",
    image: "/assets/krell.png",
    startNode: "krell_start",
    available: true,
  },
  {
    id: "xandros",
    name: "Arquivista Xandros",
    class: "Mago de Batalha Eldrítico",
    vibe: '"Eu li sobre isso num livro. Termina muito mal pra você."',
    combatStyle: "Conjuração tática, armadilhas de glifos e feixes de energia de longo alcance.",
    image: "/assets/xandro.png",
    startNode: "xandros_start",
    available: true,
  },
  {
    id: "seraphina",
    name: "Seraphina Noir",
    class: "Inquisidora Forjada no Inferno",
    vibe: '"Confiar é difícil. Trair é fácil."',
    combatStyle: "Furtividade, dual wield de adagas sagradas com uma pitada demoníaca.",
    image: "",
    startNode: "seraphina_start",
    available: false,
  },
]
