export const RACES = [
  {
    id: 'humano',
    name: 'Humano',
    abilityBonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    speed: 9,
    size: 'Medio',
    languages: ['Comum', 'um idioma adicional a sua escolha'],
    traits: [
      {
        name: 'Aumento de Pontuacao de Habilidade',
        description:
          'Seu valor em cada pontuacao de habilidade aumenta em 1.',
      },
      {
        name: 'Versatilidade',
        description:
          'Humanos sao os mais adaptaveis e ambiciosos entre as racas comuns. Eles possuem gostos, morais e habitos bastante variados.',
      },
    ],
    subraces: [],
    proficiencies: [],
    darkvision: 0,
  },
  {
    id: 'elfo',
    name: 'Elfo',
    abilityBonuses: { dex: 2 },
    speed: 9,
    size: 'Medio',
    languages: ['Comum', 'Elfico'],
    traits: [
      {
        name: 'Visao no Escuro',
        description:
          'Acostumado as florestas crepusculares e ao ceu noturno, voce possui visao superior em condicoes de escuridao e penumbra. Voce pode enxergar na penumbra a ate 18 metros como se fosse luz plena, e no escuro como se fosse penumbra. Voce nao pode discernir cores no escuro, apenas tons de cinza.',
      },
      {
        name: 'Sentidos Aguados',
        description: 'Voce possui proficiencia na pericia Percepcao.',
      },
      {
        name: 'Ancestral Feerico',
        description:
          'Voce possui vantagem em testes de resistencia contra ser enfeiticado, e magias nao podem coloca-lo para dormir.',
      },
      {
        name: 'Transe',
        description:
          'Elfos nao precisam dormir. Ao inves disso, eles meditam profundamente, permanecendo semiconscientes, durante 4 horas por dia. Apos descansar dessa forma, voce ganha os mesmos beneficios que um humano ganharia com 8 horas de sono.',
      },
    ],
    subraces: [
      {
        id: 'alto-elfo',
        name: 'Alto Elfo',
        abilityBonuses: { int: 1 },
        traits: [
          {
            name: 'Treinamento Elfico com Armas',
            description:
              'Voce possui proficiencia com espadas longas, espadas curtas, arcos longos e arcos curtos.',
          },
          {
            name: 'Truque',
            description:
              'Voce conhece um truque, a sua escolha, da lista de magias do mago. Inteligencia e a sua habilidade de conjuracao para esse truque.',
          },
          {
            name: 'Idioma Adicional',
            description:
              'Voce pode falar, ler e escrever um idioma adicional a sua escolha.',
          },
        ],
      },
      {
        id: 'elfo-da-floresta',
        name: 'Elfo da Floresta',
        abilityBonuses: { wis: 1 },
        traits: [
          {
            name: 'Treinamento Elfico com Armas',
            description:
              'Voce possui proficiencia com espadas longas, espadas curtas, arcos longos e arcos curtos.',
          },
          {
            name: 'Pes Ligeiros',
            description: 'Seu deslocamento base de caminhada aumenta para 10,5 metros.',
          },
          {
            name: 'Mascara da Natureza',
            description:
              'Voce pode tentar se esconder mesmo quando estiver apenas levemente obscurecido por folhagem, chuva forte, neve caindo, nevoa e outros fenomenos naturais.',
          },
        ],
      },
      {
        id: 'drow',
        name: 'Drow (Elfo Negro)',
        abilityBonuses: { cha: 1 },
        traits: [
          {
            name: 'Visao no Escuro Superior',
            description:
              'Sua visao no escuro tem alcance de 36 metros.',
          },
          {
            name: 'Sensibilidade a Luz Solar',
            description:
              'Voce possui desvantagem em jogadas de ataque e testes de Sabedoria (Percepcao) que dependam de visao quando voce, o alvo do seu ataque, ou o que quer que voce esteja tentando perceber estiver sob luz solar direta.',
          },
          {
            name: 'Magia Drow',
            description:
              'Voce conhece o truque luzes dancantes. Quando alcanca o 3o nivel, voce pode conjurar a magia fogo das fadas uma vez com esse traco e recupera a habilidade de faze-lo apos um descanso longo. Quando alcanca o 5o nivel, voce pode conjurar a magia escuridao uma vez com esse traco e recupera a habilidade de faze-lo apos um descanso longo. Carisma e a sua habilidade de conjuracao para essas magias.',
          },
          {
            name: 'Treinamento Drow com Armas',
            description:
              'Voce possui proficiencia com rapieiras, espadas curtas e bestas de mao.',
          },
        ],
      },
    ],
    proficiencies: ['Percepcao'],
    darkvision: 18,
  },
  {
    id: 'anao',
    name: 'Anao',
    abilityBonuses: { con: 2 },
    speed: 7.5,
    size: 'Medio',
    languages: ['Comum', 'Ananico'],
    traits: [
      {
        name: 'Visao no Escuro',
        description:
          'Acostumado a vida subterranea, voce possui visao superior em condicoes de escuridao e penumbra. Voce pode enxergar na penumbra a ate 18 metros como se fosse luz plena, e no escuro como se fosse penumbra. Voce nao pode discernir cores no escuro, apenas tons de cinza.',
      },
      {
        name: 'Resiliencia Anae',
        description:
          'Voce possui vantagem em testes de resistencia contra venenos, e voce possui resistencia contra dano de veneno.',
      },
      {
        name: 'Treinamento em Combate Anao',
        description:
          'Voce possui proficiencia com machados de batalha, machadinhas, martelos leves e martelos de guerra.',
      },
      {
        name: 'Proficiencia com Ferramentas',
        description:
          'Voce possui proficiencia com uma das seguintes ferramentas de artesao a sua escolha: ferramentas de ferreiro, suprimentos de cervejeiro ou ferramentas de pedreiro.',
      },
      {
        name: 'Especialista em Rochas',
        description:
          'Sempre que voce realizar um teste de Inteligencia (Historia) relacionado a origem de um trabalho em pedra, voce e considerado proficiente na pericia Historia e adiciona o dobro do seu bonus de proficiencia ao teste, ao inves do seu bonus de proficiencia normal.',
      },
    ],
    subraces: [
      {
        id: 'anao-da-colina',
        name: 'Anao da Colina',
        abilityBonuses: { wis: 1 },
        traits: [
          {
            name: 'Tenacidade Anae',
            description:
              'Seu maximo de pontos de vida aumenta em 1, e aumenta em 1 novamente cada vez que voce ganha um nivel.',
          },
        ],
      },
      {
        id: 'anao-da-montanha',
        name: 'Anao da Montanha',
        abilityBonuses: { str: 2 },
        traits: [
          {
            name: 'Treinamento Anao com Armaduras',
            description:
              'Voce possui proficiencia com armaduras leves e medias.',
          },
        ],
      },
    ],
    proficiencies: [
      'Machado de batalha',
      'Machadinha',
      'Martelo leve',
      'Martelo de guerra',
    ],
    darkvision: 18,
  },
  {
    id: 'halfling',
    name: 'Halfling',
    abilityBonuses: { dex: 2 },
    speed: 7.5,
    size: 'Pequeno',
    languages: ['Comum', 'Halfling'],
    traits: [
      {
        name: 'Sortudo',
        description:
          'Quando voce obtiver um 1 natural em uma jogada de ataque, teste de habilidade ou teste de resistencia, voce pode jogar o dado novamente e deve utilizar o novo resultado.',
      },
      {
        name: 'Bravura',
        description:
          'Voce possui vantagem em testes de resistencia contra ficar amedrontado.',
      },
      {
        name: 'Agilidade Halfling',
        description:
          'Voce pode mover-se atraves do espaco de qualquer criatura que seja de um tamanho maior que o seu.',
      },
    ],
    subraces: [
      {
        id: 'pes-leves',
        name: 'Pes Leves',
        abilityBonuses: { cha: 1 },
        traits: [
          {
            name: 'Furtividade Natural',
            description:
              'Voce pode tentar se esconder mesmo quando estiver obscurecido apenas por uma criatura que seja, no minimo, um tamanho maior que voce.',
          },
        ],
      },
      {
        id: 'robusto',
        name: 'Robusto',
        abilityBonuses: { con: 1 },
        traits: [
          {
            name: 'Resiliencia dos Robustos',
            description:
              'Voce possui vantagem em testes de resistencia contra venenos, e voce possui resistencia contra dano de veneno.',
          },
        ],
      },
    ],
    proficiencies: [],
    darkvision: 0,
  },
  {
    id: 'draconato',
    name: 'Draconato',
    abilityBonuses: { str: 2, cha: 1 },
    speed: 9,
    size: 'Medio',
    languages: ['Comum', 'Draconico'],
    traits: [
      {
        name: 'Ancestral Draconico',
        description:
          'Voce possui ancestralidade draconida. Escolha um tipo de dragao da tabela de Ancestral Draconico. Sua arma de sopro e resistencia a dano sao determinadas pelo tipo de dragao escolhido.',
      },
      {
        name: 'Arma de Sopro',
        description:
          'Voce pode usar sua acao para exalar energia destrutiva. Seu ancestral draconico determina o tamanho, forma e tipo de dano da exalacao. Quando voce usa sua arma de sopro, cada criatura na area da exalacao deve realizar um teste de resistencia, cujo tipo e determinado pelo seu ancestral draconico. A CD desse teste de resistencia e igual a 8 + seu modificador de Constituicao + seu bonus de proficiencia. Uma criatura sofre 2d6 de dano se falhar no teste de resistencia, e metade desse dano se obtiver sucesso. O dano aumenta para 3d6 no 6o nivel, 4d6 no 11o nivel e 5d6 no 16o nivel. Apos usar sua arma de sopro, voce nao podera utiliza-la novamente ate completar um descanso curto ou longo.',
      },
      {
        name: 'Resistencia a Dano',
        description:
          'Voce possui resistencia ao tipo de dano associado ao seu ancestral draconico.',
      },
    ],
    subraces: [],
    proficiencies: [],
    darkvision: 0,
  },
  {
    id: 'gnomo',
    name: 'Gnomo',
    abilityBonuses: { int: 2 },
    speed: 7.5,
    size: 'Pequeno',
    languages: ['Comum', 'Gnomico'],
    traits: [
      {
        name: 'Visao no Escuro',
        description:
          'Acostumado a vida subterranea, voce possui visao superior em condicoes de escuridao e penumbra. Voce pode enxergar na penumbra a ate 18 metros como se fosse luz plena, e no escuro como se fosse penumbra. Voce nao pode discernir cores no escuro, apenas tons de cinza.',
      },
      {
        name: 'Esperteza Gnomida',
        description:
          'Voce possui vantagem em todos os testes de resistencia de Inteligencia, Sabedoria e Carisma contra magia.',
      },
    ],
    subraces: [
      {
        id: 'gnomo-da-floresta',
        name: 'Gnomo da Floresta',
        abilityBonuses: { dex: 1 },
        traits: [
          {
            name: 'Ilusionista Natural',
            description:
              'Voce conhece o truque ilusao menor. Inteligencia e a sua habilidade de conjuracao para esse truque.',
          },
          {
            name: 'Falar com Bestas Pequenas',
            description:
              'Atraves de sons e gestos, voce pode comunicar ideias simples para Bestas de tamanho Pequeno ou menor. Gnomos da floresta amam os animais e costumam ter esquilos, texugos, coelhos, toupeiras, pica-paus e outras criaturas como amados animais de estimacao.',
          },
        ],
      },
      {
        id: 'gnomo-das-rochas',
        name: 'Gnomo das Rochas',
        abilityBonuses: { con: 1 },
        traits: [
          {
            name: 'Conhecimento de Artifice',
            description:
              'Sempre que voce fizer um teste de Inteligencia (Historia) relacionado a itens magicos, objetos alquimicos ou dispositivos tecnologicos, voce pode adicionar o dobro do seu bonus de proficiencia, ao inves de qualquer bonus de proficiencia que voce normalmente aplicaria.',
          },
          {
            name: 'Engenhoqueiro',
            description:
              'Voce possui proficiencia com ferramentas de artesao (ferramentas de funileiro). Usando essas ferramentas, voce pode gastar 1 hora e 10 po em materiais para construir um Dispositivo Mecanico Minusculo (CA 5, 1 pv). O dispositivo para de funcionar apos 24 horas (a menos que voce gaste 1 hora reparando-o para manter o dispositivo funcionando), ou quando voce usa sua acao para desmonta-lo; nesse momento, voce pode recuperar os materiais usados para cria-lo. Voce pode ter ate tres desses dispositivos ativos ao mesmo tempo.',
          },
        ],
      },
    ],
    proficiencies: [],
    darkvision: 18,
  },
  {
    id: 'meio-elfo',
    name: 'Meio-Elfo',
    abilityBonuses: { cha: 2 },
    specialChoice: {
      type: 'abilityBonus',
      count: 2,
      amount: 1,
      exclude: ['cha'],
      description:
        'Duas pontuacoes de habilidade diferentes, a sua escolha, aumentam em 1 (alem de Carisma).',
    },
    speed: 9,
    size: 'Medio',
    languages: ['Comum', 'Elfico', 'um idioma adicional a sua escolha'],
    traits: [
      {
        name: 'Visao no Escuro',
        description:
          'Gracas ao seu sangue elfico, voce possui visao superior em condicoes de escuridao e penumbra. Voce pode enxergar na penumbra a ate 18 metros como se fosse luz plena, e no escuro como se fosse penumbra. Voce nao pode discernir cores no escuro, apenas tons de cinza.',
      },
      {
        name: 'Ancestral Feerico',
        description:
          'Voce possui vantagem em testes de resistencia contra ser enfeiticado, e magias nao podem coloca-lo para dormir.',
      },
      {
        name: 'Versatilidade em Pericias',
        description: 'Voce possui proficiencia em duas pericias, a sua escolha.',
      },
    ],
    subraces: [],
    proficiencies: [],
    darkvision: 18,
  },
  {
    id: 'meio-orc',
    name: 'Meio-Orc',
    abilityBonuses: { str: 2, con: 1 },
    speed: 9,
    size: 'Medio',
    languages: ['Comum', 'Orc'],
    traits: [
      {
        name: 'Visao no Escuro',
        description:
          'Gracas ao seu sangue orc, voce possui visao superior em condicoes de escuridao e penumbra. Voce pode enxergar na penumbra a ate 18 metros como se fosse luz plena, e no escuro como se fosse penumbra. Voce nao pode discernir cores no escuro, apenas tons de cinza.',
      },
      {
        name: 'Ameacador',
        description: 'Voce possui proficiencia na pericia Intimidacao.',
      },
      {
        name: 'Resistencia Implacavel',
        description:
          'Quando voce e reduzido a 0 pontos de vida, mas nao e morto completamente, voce pode voltar para 1 ponto de vida. Voce nao pode usar esse traco novamente ate terminar um descanso longo.',
      },
      {
        name: 'Ataques Selvagens',
        description:
          'Quando voce obtem um acerto critico com um ataque corpo a corpo com arma, voce pode rolar um dos dados de dano da arma mais uma vez e adiciona-lo ao dano extra do acerto critico.',
      },
    ],
    subraces: [],
    proficiencies: ['Intimidacao'],
    darkvision: 18,
  },
  {
    id: 'tiefling',
    name: 'Tiefling',
    abilityBonuses: { cha: 2, int: 1 },
    speed: 9,
    size: 'Medio',
    languages: ['Comum', 'Infernal'],
    traits: [
      {
        name: 'Visao no Escuro',
        description:
          'Gracas a sua heranca infernal, voce possui visao superior em condicoes de escuridao e penumbra. Voce pode enxergar na penumbra a ate 18 metros como se fosse luz plena, e no escuro como se fosse penumbra. Voce nao pode discernir cores no escuro, apenas tons de cinza.',
      },
      {
        name: 'Resistencia Infernal',
        description: 'Voce possui resistencia a dano de fogo.',
      },
      {
        name: 'Legado Infernal',
        description:
          'Voce conhece o truque taumaturgia. Quando alcanca o 3o nivel, voce pode conjurar a magia repreensao infernal como uma magia de 2o nivel uma vez com esse traco e recupera a habilidade de faze-lo apos um descanso longo. Quando alcanca o 5o nivel, voce pode conjurar a magia escuridao uma vez com esse traco e recupera a habilidade de faze-lo apos um descanso longo. Carisma e a sua habilidade de conjuracao para essas magias.',
      },
    ],
    subraces: [],
    proficiencies: [],
    darkvision: 18,
  },
];
