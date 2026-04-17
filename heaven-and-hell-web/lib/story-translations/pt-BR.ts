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

  // ── Valerius Bolt (pt-BR) ────────────────────────────────────────────────────

  valerius_start: {
    title: "Os Picos Estilhaçados — Primeiro Contato",
    text: `O ar a 3.200 metros tem uma qualidade particular: rarefeito o suficiente para lembrar seus pulmões de que respirar é opcional, frio o suficiente para tornar cada expiração visível e elétrico o suficiente para arrepiar seus cabelos antes mesmo de você fazer qualquer coisa a respeito.

Valerius Bolt está em uma saliência precária, lança crepitante com carga acumulada, observando a fenda pulsante que apareceu onde o céu e a pedra costumavam concordar sobre seus limites. A brecha tem a largura de um ombro, cuspindo faíscas laranja e violeta — e nos últimos trinta minutos não estava fazendo absolutamente nada ameaçador.

Então ela cospe dois demônios.

Eles estão, notavelmente, confusos.

Demônio A — alto, carmim, absurdamente magro, segurando um mapa de cabeça pra baixo — franzе o cenho para a paisagem. "Eu te digo, Malphas, as instruções diziam 'Vire à esquerda no vazio que grita.' Isso aqui parece um vazio que grita pra você?"

Demônio B — baixinho, robusto, asas pequenas demais pro seu corpo — protege os olhos da luz. "Tá claro demais, Slag. Meus olhos estão fazendo aquela coisa de 'queimar' — e não o tipo bom de queimar." Ele nota Valerius. "Ei — olha! Um morador!"

A lança sobe. Faíscas dançam entre os dedos de Valerius.

"Morador?" ela diz. "Eu sou a dona do pedaço. E o aluguel de vocês é pago em raios. O que vocês estão fazendo nos Picos?"

Slag levanta as duas mãos. "Calma, calma! Pera com esse bastão brilhante, moça! Estamos procurando o Ponto de Invasão 4-B: O Buffet Eterno. Falaram que ia ter aldeões indefesos e talvez um arsonzinho leve. Isso aqui parece só... pedras. Isso é o Inferno?"

"Isso é a Terra. E vocês estão a cinco segundos de virarem uma mancha de carvão nessas rochas."

Malphas parece horrorizado. "Terra? Que nojo. Ouvi dizer que eles têm 'imposto de renda' e 'ansiedade social' por aqui. Olha, moça — se você só nos apontar de volta pro portal mais próximo, a gente some. Somos só estagiários, juro. Nem plano odontológico a gente tem."`,
    choices: [
      "⚡ Zapa Primeiro, Pergunta Nunca — reduzi-los a cinzas",
      "🚪 Devolva ao Remetente — deixá-los rastejar de volta pelo buraco",
    ],
  },

  valerius_fight_start: {
    title: "Zapa Primeiro, Pergunta Nunca",
    battle: {
      description:
        "A pele de Slag fica cinza fosco e emborrachada — o raio ricocheteia! Malphas enfia um bastão de ferro serrilhado na falésia para sugar o raio em cadeia direto do ar. Eles não são tão inofensivos quanto pareciam. Lute fisicamente. Role 5+ em um d8 para dominá-los.",
    },
  },

  valerius_fight_aftermath: {
    title: "O Aviso Enviado",
    text: `Malphas cospe icor preto. Suas mãos tremem — mas ele ainda se move. Ainda rabisca freneticamente num pedaço de pergaminho chamuscado enquanto Valerius fecha a distância.

"Não."

Ele joga o papel para o ar. Ele se transforma num aviãozinho de papel em chamas e dispara pela fenda que fecha antes que ela consiga alcançá-lo.

Do outro lado, um enorme Comandante da Fossa de quatro braços o pega. Lê. Sorri.

O céu sobre os Picos Estilhaçados fica vermelho-sangue. Um som se segue: baixo, rítmico, as batidas de asas em massa de algo que estava esperando para ser solto.

Valerius olha para cima. Começa a contar.

Para de contar em quarenta.

"Beleza", ela diz.

Seu aperto na lança se firma.

O céu fica vermelho.`,
    choices: ["Preparar para a horda →"],
  },

  valerius_horde_phase1: {
    title: "Fase 1: O Funil",
    battle: {
      description:
        "Os Picos Estilhaçados são um labirinto de agulhas de granito separadas por abismos, conectadas por pontes naturais tão estreitas que dois humanos mal passariam lado a lado. Você alimentou carga elétrica nas fissuras naturais da pedra há dez segundos. Acione-a quando a primeira onda inundar a ponte. Role 3+ em um d6 para enviar doze demônios ao abismo.",
    },
  },

  valerius_horde_phase2: {
    title: "Fase 2: A Dança",
    battle: {
      description:
        "O Comandante da Fossa: quatro braços, pele como armadura forjada, pode voar. Ele sempre gira para a esquerda — você o viu fazer isso três vezes. Conduza-o até a fissura estreita. Deixe as correntes de obsidiana passarem sobre seus ombros a distância zero. Libere tudo num único raio branco. Role 4+ em um d6.",
    },
  },

  valerius_horde_phase3: {
    title: "Fase 3: A Fuga",
    text: `O Comandante está no chão. A cratera que ele deixou no granito ainda fumega.

Valerius pousa.

E percebe que o mundo está girando.

Quanto eu usei?

A resposta chegou como náusea imediata, como alguém puxando um tapete de baixo dos pés: tudo. Ela havia despejado cada acúmulo da dança inteira num único ponto. A estratégia havia funcionado perfeitamente.

E havia a deixado completamente vazia.

Restavam dezesseis demônios. E eles estavam avançando.

Ela não tinha raios. Não tinha faíscas. A lança era um bastão de metal pesado na mão que ela carregava por puro instinto de não largar a arma.

Os demônios eram mais rápidos no ar.

Mas ela conhecia a montanha.`,
    choices: ["Subir ao pico mais alto — pior posição, última opção"],
  },

  valerius_climax: {
    title: "O Preço do Pico",
    battle: {
      description:
        "A pior posição tática possível. A melhor posição para uma Valquíria sem energia. Você sentiu a frente elétrica no sudoeste — a 3km, se movendo leste. Enterre a lança no granito do pico. Torne-se o pára-raios. Deixe a física fazer o resto. Role 2+ em um d6 para sobreviver ao raio.",
    },
  },

  valerius_epilogue: {
    title: "O Sinal — Capítulo I Completo",
    text: `Três segundos.

É quanto tempo o raio dura quando passa por um corpo humano vindo de uma tempestade natural.

Quando terminou, o pico estava limpo. O granito ao redor estava vitrificado. O ar cheirava a ozônio tão forte que ardia.

Valerius estava de joelhos, as mãos presas à lança enterrada, a cabeça baixa, a respiração em frangalhos.

Ela ficou assim por um longo tempo.

—

O céu ainda estava vermelho quando ela desceu.

Mais devagar agora. Muito mais devagar. Cada degrau da montanha custava uma negociação entre a vontade e os músculos que haviam dado mais do que tinham.

Lá embaixo, nas planícies entre os Picos e os vales, mais portões continuavam se abrindo. Pequenos daqui de cima, mas ela sabia a escala real. Havia visto antes de subir.

Isso não é uma incursão. É uma invasão.

Valerius parou numa saliência intermediária, arrancou um fragmento de granito ainda quente da batalha — impregnado com resíduo elétrico, o tipo que durava horas — e o apertou na palma da mão ensanguentada. Uma prática antiga. Uma pedra de tempestade.

Para quem soubesse a frequência, era um farol.

Ela não sabia se algum dos outros saberia ouvir. Não sabia se Thalassa ainda estava no bosque, se Krell ainda segurava aquela maldita parede, se Xandros havia saído da biblioteca em chamas.

Mas mandou o sinal.

E começou a descer em direção ao vale central — o único ponto equidistante dos cinco fronts que ela conhecia. A Encruzilhada do Destino, como chamavam nos mapas antigos. Um nome dramático para o que era essencialmente uma bifurcação de estradas com uma fonte seca no meio.

Ela desceu. Exausta. Sem raios. Sem recursos.

Com uma lança, um sinal enviado, e a certeza de que o que havia visto nos vales era grande demais para enfrentar sozinha.

Suficiente, decidiu. Por hoje, suficiente.`,
  },

  valerius_let_go: {
    title: "Devolva ao Remetente",
    text: `Valerius abaixa a lança.

As faíscas entre seus dedos não desaparecem — ela as mantém zumbindo, a um mau pensamento de uma descarga completa — mas dá um passo atrás. "Tá bom. Fechem esse buraco e somam. Se eu ver qualquer um de vocês de novo, faço um casaco com as asas de vocês."

Os demônios não precisam de mais convencimento. Eles tropeçam de volta em direção à fenda, se atrapalhando, Slag ainda segurando o mapa do jeito errado, Malphas fazendo um barulho que pode ser gratidão ou pode ser só um reflexo.

A fenda começa a fechar.

Valerius não confia neles nem um segundo.

Ela ativa o Manto Estático — um truque antigo, carrega o ar ao redor do corpo para borrar sua silhueta em forma de calor sobre asfalto — e corre para a abertura que se fecha.

Ela passa pelo último milímetro.`,
    choices: ["Segui-los mais fundo →"],
  },

  valerius_spy: {
    title: "O que Está Atrás do Portal",
    text: `Seguir dois demônios perdidos por uma fenda interdimensional enquanto torce para que nenhum deles se vire é, objetivamente, não uma decisão tática brilhante.

Valerius faz de qualquer jeito.

O outro lado é um espaço cinza intermediário — quente, cheirando a enxofre, o ar espesso de um jeito que não tem nada a ver com altitude. Slag e Malphas tropeçam à frente, ainda discutindo sobre o mapa. Ela os segue a dez metros de distância, o Manto Estático borrando seus contornos.

Eles a levam ao que chamaram de Buffet Eterno.

Não é um restaurante.

É um vale. E o vale está cheio.

Dúzias de arcos de obsidiana se erguem em fileiras organizadas pelo chão do vale — cada um um portal, cada um operacional, cada um processando uma fila ininterrupta de demônios marchando em formação. Valerius observa do alto da crista. Conta os arcos.

Para em sessenta.

Slag e Malphas encontram sua unidade e desaparecem na massa. Eles eram apenas a ponta do iceberg. A fenda nos Picos foi uma sonda, um teste. A coisa real é essa.

Ela entende, com clareza absoluta, que não pode enfrentar isso sozinha. Não hoje. Não nunca.`,
    choices: ["Mandar o sinal — e sair daqui"],
  },

  valerius_epilogue_b: {
    title: "O Sinal — Capítulo I Completo",
    text: `Voltar requer mais sorte do que habilidade.

Há um portal perto da borda do vale — pequeno, sem vigilância, provavelmente acesso de manutenção — e Valerius o atinge correndo, Manto Estático ainda ativo, a abertura mal larga o suficiente para uma humana com uma lança. Ela passa rolando para o granito frio e se levanta de pé por memória muscular pura.

Atrás dela, o portal fecha com um estalo.

Ela não para de se mover até ter três cristas entre ela e a localização da fenda.

Então para. Respira. Faz um balanço.

O céu ainda está vermelho.

Valerius arranca um fragmento de granito quente de uma saliência e o aperta na palma — saturado com carga elétrica residual suficiente para ser sentida por alguém sintonizado na frequência. Uma prática antiga. Uma pedra de tempestade.

Para quem soubesse ouvir, era um farol.

Ela não sabia se os outros ainda estavam de pé. Não sabia onde Thalassa estava, ou se Krell tinha finalmente largado o que quer que estivesse segurando fechado, ou se Xandros havia encontrado seu feitiço antes da biblioteca terminar de queimar.

Mas mandou o sinal.

E começou a andar em direção ao vale central — a antiga Encruzilhada do Destino, equidistante de todos os fronts — porque a única resposta para o que havia visto lá embaixo era mais pessoas. Pessoas melhores. Ou pelo menos, pessoas igualmente relutantes em desistir.`,
  },

  // ── Thalassa "A Raiz" (pt-BR) ────────────────────────────────────────────────

  thalassa_start: {
    title: "A Floresta Sagrada — Temporada de Adubo",
    text: `O ar cheira a resina de pinheiro, fogo infernal e algo que era um Cão do Inferno antes de Thalassa introduzi-lo ao conceito de fertilizante.

O Bosque Sagrado está queimando em manchas há três horas — o bosque leste perto do antigo santuário, a clareira perto da Pedra Vigilante, a trilha que leva ao Riacho Cantante. A incursão demoníaca entrou pelo sul, onde as árvores ficam mais esparsas e o solo ainda está solto desde a tempestade do outono passado, e se espalhou com a confiança casual de algo que nunca foi mordido por vegetação senciente antes.

Agora foi mordido por vegetação senciente.

Thalassa está no centro da carnificina, blindada com casca e profundamente entediada, seu cajado antigo crepitando com energia verde. As vinhas ao seu redor não são plantas. São opiniões. Especificamente, elas formaram uma posição muito firme sobre a incursão demoníaca envolvendo espinhos.

Três Cães do Inferno a circulam a uma distância que aprenderam, por experiência recente dolorosa, ser o raio mínimo de segurança.

"Saiam do meu jardim", ela diz — não em voz alta, porque não precisa ser em voz alta. "E digam a quem quer que tenha aberto aquele portal que, se danificarem o Carvalho Velho, eu pessoalmente os acompanharei de volta por ele dentro de uma sacola de composto."

Uma vinha bate em seu ombro. A atualiza sobre a situação do bosque leste.

"Esse também", ela diz. "A situação do bosque leste também está sendo resolvida."

Os Cães do Inferno se entreolham. Olham para as vinhas. Emitem um som que se traduz, aproximadamente, como um pedido de transferência de unidade.`,
    choices: ["Capítulo 2 — Em Breve ›"],
  },

  thalassa_coming_soon: {
    title: "A Ser Continuado…",
    text: `O capítulo completo de Thalassa está sendo escrito.

O Bosque Sagrado vai aguentar. Sempre aguentou.

As raízes são profundas, as vinhas têm opiniões, e os Cães do Inferno estão reconsiderando suas escolhas de vida.

Volte em breve — essa história ainda está crescendo.`,
  },

  // ── Krell, o Inquebrantável (pt-BR) ─────────────────────────────────────────

  krell_start: {
    title: "A Cidade em Ruínas — Muro de Um",
    text: `O portal tem aproximadamente quatro metros de altura, pulsa com luz magenta profunda, e está tentando abrir completamente há quarenta e sete minutos.

Não conseguiu. Porque Krell está no caminho.

Não estrategicamente no caminho. Não taticamente bloqueando. Apenas — parado lá com os dois braços firmados contra as bordas que cedem, mantendo o portal em cerca de trinta por cento de capacidade através da aplicação de pura teimosia e o tipo de força que se acumula quando você passa seus anos formativos carregando coisas que ninguém mais quer tocar.

As runas inscritas ao longo de seus antebraços estão fazendo parte do trabalho. O resto é Krell.

Ao redor dele, a cidade de Valmark é principalmente escombros — os distritos do oeste foram embora, o distrito do mercado está em chamas de um jeito que sugere que vai continuar em chamas por algum tempo, e a coluna de refugiados seguindo para o leste tem se movido sem parar desde o amanhecer. Krell os observou partir. Decidiu que a coluna estaria mais segura se o portal permanecesse fechado. Tomou uma decisão.

Isso foi há quarenta e sete minutos.

A coisa do outro lado tem batido no portal regularmente — testando, sondando, tentando alargar a abertura. Cada vez que faz isso, Krell se firma mais e as runas ficam mais brilhantes.

Seus braços estão começando a doer. Ele não mencionou isso a ninguém porque não há ninguém para mencionar.`,
    choices: ["Capítulo 2 — Em Breve ›"],
  },

  krell_coming_soon: {
    title: "A Ser Continuado…",
    text: `O capítulo completo de Krell está sendo escrito.

Ele ainda está segurando o portal.

Vai segurar o tempo que for necessário.

Volte em breve.`,
  },

  // ── Arquivista Xandros (pt-BR) ───────────────────────────────────────────────

  xandros_start: {
    title: "A Biblioteca Arcana — Apêndice F",
    text: `O fogo começou na ala leste.

Isso foi, objetivamente, o melhor cenário possível. A ala leste continha os registros históricos, a coleção de periódicos e dezessete anos de anotações pessoais do Arquivista Xandros — tudo isso sendo um pouco menos insubstituível do que os índices de feitiços teóricos na ala oeste, o cofre de artefatos no porão ou a coleção de grimórios indexados na torre norte.

Xandros está atualmente na torre norte.

O fogo também está atualmente na torre norte.

"Está no apêndice", ele diz — para ninguém em particular, ou melhor, para a pilha de volumes de referência que está cruzando a uma velocidade que seria impressionante em qualquer circunstância, e é quase sobrenatural dado que ele está fazendo isso enquanto chamas avançam por três das quatro estantes adjacentes à sua posição. "Dispensar o Mal Maior é definitivamente um feitiço de referência, o que significa que está no apêndice, o que significa—"

O teto colapsa. A três palmos à sua esquerda, na seção que ele já procurou.

"—o que significa", ele continua, puxando o próximo volume da prateleira, "que está no apêndice F a H. Possivelmente com referência cruzada sob 'E' de Expulsão. A indexação nesta edição sempre foi inconsistente."

Algo demoníaco se move na porta da escadaria. Xandros aponta dois dedos para lá sem levantar os olhos. Uma armadilha de glifo que ele instalou treze minutos atrás é ativada. Problema resolvido.

"Apêndice G", ele murmura.

"Está aqui."`,
    choices: ["Capítulo 2 — Em Breve ›"],
  },

  xandros_coming_soon: {
    title: "A Ser Continuado…",
    text: `O capítulo completo de Xandros está sendo escrito.

Ele encontrou a entrada no Apêndice G. Se isso vai ajudar é outra questão.

A biblioteca pode estar queimando, mas o conhecimento perdura.

Volte em breve.`,
  },
}
