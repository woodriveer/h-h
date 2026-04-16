import type { StoryTranslation } from "./types"

export const ptBRStory: StoryTranslation = {
  intro: {
    title: "A Encruzilhada da Eternidade",
    text: `A última coisa que você se lembra é um clarão cegante — depois, silêncio.

Você abre os olhos diante de uma vasta ponte de pedra que se estende até o vazio, metade banhada em luz dourada e fria, metade engolida por sombras revoltas. O ar cheira a ozônio e cinzas antigas, ao peso de algo primordial decidindo o seu destino.

Uma figura encapuzada se materializa ao seu lado. Seu rosto está oculto sob um capuz tecido de luz estelar e fumaça, mas sua voz carrega o peso de mil julgamentos.

"Bem-vindo, alma errante. Sua história ainda não foi escrita." Ela gesticula para os dois caminhos à frente. "Escolha com sabedoria — ou com ousadia. Mas não demore. A ponte não espera."

Atrás de você, há apenas escuridão e o eco distante de uma vida já vivida.`,
    choices: [
      "Adentre as sombras",
      "Caminhe em direção à luz",
    ],
  },

  shadow_path: {
    title: "O Reino das Sombras",
    text: `O frio se envolve em você como uma segunda pele no momento em que você abandona a ponte rumo à escuridão. Formas se contorcem no vazio — contornos de almas que vieram antes de você e nunca mais foram ouvidas.

Então, ele surge.

Um Guardião das Sombras emerge do breu: oito palmos de sombra comprimida e fúria vazia, suas órbitas ardendo com fogo infernal. Ele guarda essa passagem desde que a primeira alma ousou percorrê-la.

"Apenas os fortes atravessam as sombras", ele rosna, as palavras pressionando seu peito como uma força física.

Ele avança sem aviso. Você não tem arma. Não tem armadura. Você tem apenas sua vontade, e o que quer que seja que o trouxe até aqui.

Prepare-se. Este é o seu primeiro teste.`,
    battle: {
      description: "O Guardião das Sombras ataca! Role 4 ou mais em um d6 para dominá-lo com força de vontade.",
    },
  },

  shadow_victory: {
    title: "A Encruzilhada das Almas",
    text: `O Guardião se dissolve com um grito que estremece seus ossos, sua forma sombria se espalhando em partículas de luz fria que sobem e desaparecem.

Além do lugar onde ele estava, você encontra algo que não esperava: um orbe flutuante de memórias revoltas, pulsando com uma luz que não é nem céu nem inferno. Imagens cintilam dentro dele — uma vida vivida de formas complicadas, momentos de crueldade e momentos de graça inesperada, todos entrelaçados.

Uma voz fala de algum lugar atrás do orbe. Não é deus. Não é demônio. É algo mais antigo do que ambos.

"Você carrega sombra e luz dentro de si. Toda alma carrega. Mas é a escolha que você faz agora — não a vida que você viveu — que define o que você se tornará."

O orbe aguarda. A ponte atrás de você sumiu. Só existe o caminho à frente.`,
    choices: [
      "Abrace as trevas — reivindique seu poder sem arrependimento",
      "Volte-se para a luz — renda-se à chance de redenção",
    ],
  },

  fallen_ending: {
    title: "O Caído",
    text: `Você mergulha a mão no orbe e bebe a sombra até o fundo.

Ela preenche seu peito como gelo e fogo ao mesmo tempo — silenciando antigas dúvidas, antigas culpas, antigas perguntas que você nunca se permitiu terminar de formular. O que restava de suavidade em você se cristaliza em algo mais duro, mais frio e, à sua maneira, belo.

A voz atrás do orbe não fala mais. Apenas suspira — um som como uma porta se fechando sobre o que poderia ter sido.

Lá embaixo, os portões do Inferno se abrem. Não como punição. Não como condenação. Como uma boas-vindas.

Você escolheu sua natureza. Você viverá nela agora, vai dominá-la e talvez — em alguma virada distante de uma era — se perguntar o que o outro caminho guardava.

Sua história termina aqui, em fogo e soberania absoluta.`,
  },

  redemption_battle: {
    title: "O Julgamento da Redenção",
    text: `Você se afasta da sombra e alcança a luz.

Ela não vem facilmente.

Três Anjos do Julgamento descem das alturas — seres de radiância fria e perfeita, seus olhos como balanças que pesaram dez mil almas e encontraram a maioria delas insuficiente. Eles não falam imediatamente. Eles olham para você da forma como uma chama olha para a madeira.

"A redenção não é um dom", diz um por fim. "Não é misericórdia. É conquistada. Pela pura substância de quem você é — não de quem você pretendia ser."

Eles desembainham espadas de chama viva e formam um círculo ao seu redor.

Esta não é uma luta que se vence com força. É uma luta que se vence sendo, neste momento, exatamente tão digno quanto você espera ser.`,
    battle: {
      description: "Enfrente o Julgamento dos Anjos! Role 3 ou mais em um d6 para ser considerado digno da redenção.",
    },
  },

  light_path: {
    title: "O Caminho da Luz",
    text: `O calor envolve você no momento em que você adentra o brilho âmbar. Runas antigas derivam como vagalumes, acendendo brevemente em reconhecimento antes de se dissolverem no ar. Esse caminho foi percorrido por muitos. Nem todos chegaram ao fim.

Um Guardião da Verdade se materializa à sua frente — um ser radiante cuja presença faz você se sentir completamente transparente, cada memória e escolha expostas como texto em uma página. Ele não o ameaça. Ele simplesmente olha, e nesse olhar, você sente cada segredo que já guardou emergir à superfície.

Ele não fala por um longo momento. Então:

"Os portões estão próximos. A forma como você se aproxima deles importa mais do que você pode imaginar."

Atrás do Guardião, você quase consegue ver as formas do que aguarda além. Mas entre você e elas ainda há uma escolha — a última que esse caminho lhe pede.`,
    choices: [
      "Avance com ousadia — você conquistou seu lugar aqui",
      "Ajoelhe-se com humildade — você é grato, e sabe quem é",
    ],
  },

  gates_bold: {
    title: "O Portão da Bravura",
    text: `O Guardião inclina a cabeça. "Ousadia", diz ele. Há algo como respeito em sua voz — e algo como um aviso.

Você está diante dos próprios portões do Paraíso. Pérola, ouro e uma luz tão concentrada que tem peso, pressionando suavemente contra seu rosto. Entre você e a entrada está o Guardião Final — antigo além da compreensão, sua forma alternando entre humana e algo muito maior.

"Você chegou até aqui com força", diz ele. Sua voz não ecoa. Ela simplesmente preenche tudo. "Isso não é nada. Mas os portões não se abrem apenas para a força. Eles se abrem para algo mais difícil."

Ele estende uma vasta mão, com a palma voltada para cima, aguardando. Não por uma arma. Não por uma batalha.

Por prova.`,
    battle: {
      description: "O Guardião Final exige prova do seu valor. Role 4 ou mais em um d6 para ser considerado digno.",
    },
  },

  gates_humble: {
    title: "O Portão da Graça",
    text: `O Guardião faz uma longa pausa depois que você se ajoelha.

"Humildade", diz ele por fim, e algo em sua voz mudou — ainda cauteloso, ainda atento, mas mais quente. "Isso é mais raro do que a maioria das almas percebe. Mesmo aqui."

Você se aproxima dos portões do Paraíso, e o Guardião Final que o recebe é diferente daquele que os que caminham com ousadia devem enfrentar. Mais quieto. Mais sereno. Ele não lhe pergunta nada sobre força.

"Mostre-me", diz ele, "que o que o trouxe até aqui era real. Não aparência. Não esperança. Real."

É, em certos aspectos, o teste mais difícil de todos — porque você não pode fingir. Você só pode ser exatamente o que é e ver se isso é suficiente.`,
    battle: {
      description: "Prove a sinceridade do seu coração ao Guardião do Portão. Role 2 ou mais em um d6 para entrar.",
    },
  },

  heaven_ending: {
    title: "O Paraíso te Aguarda",
    text: `Os portões se abrem.

Não com estrondo ou fanfarra. Não com trombetas ou proclamações. Eles se abrem como uma respiração presa que finalmente se solta — com o exalar silencioso de algo que esperava há muito tempo.

A luz jorra, quente e particular de uma forma que a luz raramente é: ela carrega o cheiro de chuva em pedra morna, de pão esfriando no peitoril, de cada coisa ordinária e bela que você havia parado de notar e esquecido de sentir falta.

Há vozes. Não em cerimônia — em reconhecimento. Elas sabiam que você estava vindo. Estão felizes que você está aqui.

Você atravessa, e a ponte e a sombra e a longa jornada incerta se colapsam em algo que era, afinal, exatamente do tamanho certo.

Você chegou em casa.`,
  },
}
