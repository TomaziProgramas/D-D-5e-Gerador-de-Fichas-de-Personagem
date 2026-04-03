// ============================================================================
// D&D 5e - Classes (PT-BR)
// Dados completos das 12 classes base do Jogador
// ============================================================================

// ---------------------------------------------------------------------------
// Tabelas de Spell Slots reutilizáveis
// ---------------------------------------------------------------------------

// Conjurador completo (Bardo, Clérigo, Druida, Feiticeiro, Mago)
// Índice: [nível do personagem 0-19][nível da magia 1-9]
const FULL_CASTER_SLOTS = [
  // Nv1                  Nv2                  Nv3                  Nv4
  [2,0,0,0,0,0,0,0,0], [3,0,0,0,0,0,0,0,0], [4,2,0,0,0,0,0,0,0], [4,3,0,0,0,0,0,0,0],
  // Nv5                  Nv6                  Nv7                  Nv8
  [4,3,2,0,0,0,0,0,0], [4,3,3,0,0,0,0,0,0], [4,3,3,1,0,0,0,0,0], [4,3,3,2,0,0,0,0,0],
  // Nv9                  Nv10                 Nv11                 Nv12
  [4,3,3,3,1,0,0,0,0], [4,3,3,3,2,0,0,0,0], [4,3,3,3,2,1,0,0,0], [4,3,3,3,2,1,0,0,0],
  // Nv13                 Nv14                 Nv15                 Nv16
  [4,3,3,3,2,1,1,0,0], [4,3,3,3,2,1,1,0,0], [4,3,3,3,2,1,1,1,0], [4,3,3,3,2,1,1,1,0],
  // Nv17                 Nv18                 Nv19                 Nv20
  [4,3,3,3,2,1,1,1,1], [4,3,3,3,3,1,1,1,1], [4,3,3,3,3,2,1,1,1], [4,3,3,3,3,2,2,1,1],
];

// Meio-conjurador (Paladino, Ranger) - começa no nível 2
// Índice: [nível do personagem 0-19][nível da magia 1-5]
const HALF_CASTER_SLOTS = [
  // Nv1       Nv2       Nv3       Nv4       Nv5
  [0,0,0,0,0],[2,0,0,0,0],[3,0,0,0,0],[3,0,0,0,0],
  // Nv6       Nv7       Nv8       Nv9       Nv10
  [4,2,0,0,0],[4,2,0,0,0],[4,3,0,0,0],[4,3,0,0,0],[4,3,2,0,0],
  // Nv11      Nv12      Nv13      Nv14      Nv15
  [4,3,2,0,0],[4,3,3,0,0],[4,3,3,0,0],[4,3,3,1,0],[4,3,3,1,0],
  // Nv16      Nv17      Nv18      Nv19      Nv20
  [4,3,3,2,0],[4,3,3,2,0],[4,3,3,3,0],[4,3,3,3,1],[4,3,3,3,1],
];

// Bruxo (Magia de Pacto) - slots e nível de slot
// [quantidade de slots, nível do slot]
const WARLOCK_PACT_SLOTS = [
  [1,1],[2,1],[2,2],[2,2],[2,3],
  [2,3],[2,4],[2,4],[2,5],[2,5],
  [3,5],[3,5],[3,5],[3,5],[3,5],
  [3,5],[4,5],[4,5],[4,5],[4,5],
];

// ---------------------------------------------------------------------------
// Truques conhecidos por nível para cada classe
// ---------------------------------------------------------------------------
const BARD_CANTRIPS    = [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4];
const CLERIC_CANTRIPS  = [3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5];
const DRUID_CANTRIPS   = [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4];
const SORCERER_CANTRIPS= [4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6];
const WARLOCK_CANTRIPS = [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4];
const WIZARD_CANTRIPS  = [3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5];

// ---------------------------------------------------------------------------
// Magias conhecidas (para conjuradores do tipo "known")
// ---------------------------------------------------------------------------
const BARD_SPELLS_KNOWN    = [4,5,6,7,8,9,10,11,12,14,15,15,16,18,19,19,20,22,22,22];
const SORCERER_SPELLS_KNOWN= [2,3,4,5,6,7,8,9,10,11,12,12,13,13,14,14,15,15,15,15];
const WARLOCK_SPELLS_KNOWN = [2,3,4,5,6,7,8,9,10,10,11,11,12,12,13,13,14,14,15,15];
const RANGER_SPELLS_KNOWN  = [0,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11];

// ============================================================================
// CLASSES
// ============================================================================

export const CLASSES = [
  // -------------------------------------------------------------------------
  // BÁRBARO
  // -------------------------------------------------------------------------
  {
    id: 'barbaro',
    name: 'Bárbaro',
    hitDie: 12,
    primaryAbility: 'for',
    savingThrows: ['for', 'con'],
    armorProficiencies: ['Armaduras leves', 'Armaduras médias', 'Escudos'],
    weaponProficiencies: ['Armas simples', 'Armas marciais'],
    toolProficiencies: [],
    skillChoices: {
      choose: 2,
      from: [
        'adestrar-animais', 'atletismo', 'intimidacao', 'natureza',
        'percepcao', 'sobrevivencia',
      ],
    },
    spellcasting: null,
    subclassLevel: 3,
    subclasses: [
      {
        id: 'berserker',
        name: 'Caminho do Berserker',
        description: 'Para alguns bárbaros, a fúria é um meio para um fim — e esse fim é a violência. O Caminho do Berserker é um caminho de fúria descontrolada, encharcado de sangue.',
      },
      {
        id: 'totemico',
        name: 'Caminho do Guerreiro Totêmico',
        description: 'O Caminho do Guerreiro Totêmico é uma jornada espiritual, na qual o bárbaro aceita um espírito animal como guia, protetor e inspiração.',
      },
    ],
    features: [
      { level: 1, name: 'Fúria', description: 'Em batalha, você luta com uma ferocidade primitiva. No seu turno, você pode entrar em fúria como uma ação bônus. Durante a fúria, você ganha vantagem em testes de Força e resistência a dano contundente, cortante e perfurante.' },
      { level: 1, name: 'Defesa sem Armadura', description: 'Quando você não está usando armadura, sua CA é 10 + modificador de Destreza + modificador de Constituição. Você pode usar um escudo e ainda obter esse benefício.' },
      { level: 2, name: 'Ataque Descuidado', description: 'Você pode abrir mão de toda preocupação com a defesa para atacar com uma ferocidade implacável. Você tem vantagem nas jogadas de ataque corpo a corpo usando Força, mas ataques contra você têm vantagem.' },
      { level: 2, name: 'Percepção de Perigo', description: 'Você tem vantagem em testes de resistência de Destreza contra efeitos que você pode ver, como armadilhas e magias. Não funciona se estiver cego, surdo ou incapacitado.' },
      { level: 3, name: 'Caminho Primitivo', description: 'Você escolhe um caminho que molda a natureza da sua fúria: Caminho do Berserker ou Caminho do Guerreiro Totêmico.' },
      { level: 4, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada. O máximo é 20.' },
      { level: 5, name: 'Ataque Extra', description: 'Você pode atacar duas vezes, ao invés de uma, sempre que usar a ação de Ataque no seu turno.' },
      { level: 5, name: 'Movimento Rápido', description: 'Seu deslocamento aumenta em 3 metros enquanto você não estiver usando armadura pesada.' },
      { level: 6, name: 'Característica do Caminho Primitivo', description: 'Você ganha uma característica concedida pelo seu Caminho Primitivo.' },
      { level: 7, name: 'Instinto Selvagem', description: 'Seus instintos são tão afiados que você tem vantagem em jogadas de iniciativa. Além disso, se estiver surpreso no início do combate, pode agir normalmente se entrar em fúria.' },
      { level: 8, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 9, name: 'Crítico Brutal (1 dado)', description: 'Você pode rolar um dado de dano de arma adicional ao determinar o dano extra de um acerto crítico com um ataque corpo a corpo.' },
      { level: 10, name: 'Característica do Caminho Primitivo', description: 'Você ganha uma característica concedida pelo seu Caminho Primitivo.' },
      { level: 11, name: 'Fúria Implacável', description: 'Sua fúria pode mantê-lo lutando apesar de ferimentos graves. Se cair a 0 pontos de vida durante a fúria e não morrer, pode fazer um teste de resistência de Constituição CD 10 para cair a 1 PV.' },
      { level: 12, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 13, name: 'Crítico Brutal (2 dados)', description: 'Você pode rolar dois dados de dano de arma adicionais ao determinar o dano extra de um acerto crítico com um ataque corpo a corpo.' },
      { level: 14, name: 'Característica do Caminho Primitivo', description: 'Você ganha uma característica concedida pelo seu Caminho Primitivo.' },
      { level: 15, name: 'Fúria Persistente', description: 'Sua fúria é tão intensa que ela só termina prematuramente se você cair inconsciente ou escolher encerrá-la.' },
      { level: 16, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 17, name: 'Crítico Brutal (3 dados)', description: 'Você pode rolar três dados de dano de arma adicionais ao determinar o dano extra de um acerto crítico com um ataque corpo a corpo.' },
      { level: 18, name: 'Força Indomável', description: 'Se o total de um teste de Força seu for menor que seu valor de Força, você pode usar esse valor no lugar do total.' },
      { level: 19, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 20, name: 'Campeão Primitivo', description: 'Você incorpora o poder da natureza selvagem. Seus valores de Força e Constituição aumentam em 4. Seu máximo para esses valores agora é 24.' },
    ],
    startingEquipment: [
      '(a) um machado grande ou (b) qualquer arma marcial corpo a corpo',
      '(a) dois machados de mão ou (b) qualquer arma simples',
      'Um pacote de aventureiro e quatro azagaias',
    ],
  },

  // -------------------------------------------------------------------------
  // BARDO
  // -------------------------------------------------------------------------
  {
    id: 'bardo',
    name: 'Bardo',
    hitDie: 8,
    primaryAbility: 'car',
    savingThrows: ['des', 'car'],
    armorProficiencies: ['Armaduras leves'],
    weaponProficiencies: ['Armas simples', 'Bestas de mão', 'Espadas longas', 'Rapieiras', 'Espadas curtas'],
    toolProficiencies: ['Três instrumentos musicais à sua escolha'],
    skillChoices: {
      choose: 3,
      from: [
        'acrobacia', 'adestrar-animais', 'arcanismo', 'atletismo',
        'enganacao', 'furtividade', 'historia', 'intimidacao',
        'intuicao', 'investigacao', 'medicina', 'natureza',
        'percepcao', 'performance', 'persuasao', 'prestidigitacao',
        'religiao', 'sobrevivencia',
      ],
    },
    spellcasting: {
      ability: 'car',
      type: 'known',
      cantripsKnown: BARD_CANTRIPS,
      spellSlots: FULL_CASTER_SLOTS,
      spellsKnown: BARD_SPELLS_KNOWN,
    },
    subclassLevel: 3,
    subclasses: [
      {
        id: 'conhecimento',
        name: 'Colégio do Conhecimento',
        description: 'Os bardos do Colégio do Conhecimento sabem algo sobre a maioria das coisas, coletando pedaços de conhecimento de diversas fontes. Sua magia é moldada pela erudição.',
      },
      {
        id: 'valor',
        name: 'Colégio do Valor',
        description: 'Os bardos do Colégio do Valor são bardos ousados que mantêm viva a memória dos grandes heróis do passado para inspirar uma nova geração de heróis.',
      },
    ],
    features: [
      { level: 1, name: 'Conjuração', description: 'Você aprendeu a desfazer e remodelar o tecido da realidade em harmonia com seus desejos e música. Carisma é sua habilidade de conjuração.' },
      { level: 1, name: 'Inspiração Bárdica (d6)', description: 'Você pode inspirar outros através de palavras ou música. Uma criatura que receba seu dado de Inspiração Bárdica pode rolar o dado e somar ao resultado de um teste de habilidade, jogada de ataque ou teste de resistência.' },
      { level: 2, name: 'Versatilidade', description: 'Você pode adicionar metade do seu bônus de proficiência, arredondado para baixo, a qualquer teste de habilidade que não inclua seu bônus de proficiência.' },
      { level: 2, name: 'Canção de Descanso (d6)', description: 'Você pode usar música ou oratória calmante para ajudar a revitalizar seus aliados feridos durante um descanso curto. Criaturas aliadas recuperam um d6 extra de PV.' },
      { level: 3, name: 'Colégio Bárdico', description: 'Você se aprofunda nas práticas avançadas de um colégio bárdico de sua escolha: Colégio do Conhecimento ou Colégio do Valor.' },
      { level: 3, name: 'Especialização', description: 'Escolha duas de suas proficiências em perícias. Seu bônus de proficiência é dobrado para qualquer teste de habilidade que use essas perícias.' },
      { level: 4, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 5, name: 'Inspiração Bárdica (d8)', description: 'Seu dado de Inspiração Bárdica se torna um d8.' },
      { level: 5, name: 'Fonte de Inspiração', description: 'Você recupera todos os usos de Inspiração Bárdica quando termina um descanso curto ou longo.' },
      { level: 6, name: 'Contramágica', description: 'Você ganha a habilidade de usar notas musicais ou palavras de poder para interromper efeitos de encantamento de mente. Você pode usar sua reação para conceder vantagem em testes de resistência contra medo ou encantamento.' },
      { level: 6, name: 'Característica do Colégio Bárdico', description: 'Você ganha uma característica concedida pelo seu Colégio Bárdico.' },
      { level: 8, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 10, name: 'Inspiração Bárdica (d10)', description: 'Seu dado de Inspiração Bárdica se torna um d10.' },
      { level: 10, name: 'Segredos Mágicos', description: 'Você aprendeu dois magias de qualquer classe. As magias escolhidas contam como magias de bardo para você.' },
      { level: 10, name: 'Especialização (adicional)', description: 'Escolha mais duas de suas proficiências em perícias para dobrar o bônus de proficiência.' },
      { level: 12, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 14, name: 'Característica do Colégio Bárdico', description: 'Você ganha uma característica concedida pelo seu Colégio Bárdico.' },
      { level: 14, name: 'Segredos Mágicos (adicional)', description: 'Você aprende mais duas magias de qualquer classe.' },
      { level: 15, name: 'Inspiração Bárdica (d12)', description: 'Seu dado de Inspiração Bárdica se torna um d12.' },
      { level: 16, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 18, name: 'Segredos Mágicos (adicional)', description: 'Você aprende mais duas magias de qualquer classe.' },
      { level: 19, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 20, name: 'Inspiração Superior', description: 'Quando você rolar iniciativa e não tiver nenhum uso de Inspiração Bárdica restante, você recupera um uso.' },
    ],
    startingEquipment: [
      '(a) uma rapieira, (b) uma espada longa ou (c) qualquer arma simples',
      '(a) um pacote de diplomata ou (b) um pacote de artista',
      '(a) um alaúde ou (b) qualquer outro instrumento musical',
      'Armadura de couro e uma adaga',
    ],
  },

  // -------------------------------------------------------------------------
  // CLÉRIGO
  // -------------------------------------------------------------------------
  {
    id: 'clerigo',
    name: 'Clérigo',
    hitDie: 8,
    primaryAbility: 'sab',
    savingThrows: ['sab', 'car'],
    armorProficiencies: ['Armaduras leves', 'Armaduras médias', 'Escudos'],
    weaponProficiencies: ['Armas simples'],
    toolProficiencies: [],
    skillChoices: {
      choose: 2,
      from: ['historia', 'intuicao', 'medicina', 'persuasao', 'religiao'],
    },
    spellcasting: {
      ability: 'sab',
      type: 'prepared',
      cantripsKnown: CLERIC_CANTRIPS,
      spellSlots: FULL_CASTER_SLOTS,
      spellsKnown: null,
    },
    subclassLevel: 1,
    subclasses: [
      {
        id: 'vida',
        name: 'Domínio da Vida',
        description: 'O Domínio da Vida se concentra na energia positiva vibrante — uma das forças fundamentais do universo — que sustenta toda a vida. Os deuses da vida promovem vitalidade e saúde.',
      },
      {
        id: 'luz',
        name: 'Domínio da Luz',
        description: 'Os deuses da luz — incluindo Helm, Lathander e Pholtus — promovem os ideais de renascimento e renovação, verdade, vigilância e beleza.',
      },
      {
        id: 'guerra',
        name: 'Domínio da Guerra',
        description: 'Os deuses da guerra inspiram atos de bravura, supervisam as artes do combate e recompensam a coragem com vitória.',
      },
    ],
    features: [
      { level: 1, name: 'Conjuração', description: 'Como um condutor do poder divino, você pode conjurar magias de clérigo. Sabedoria é sua habilidade de conjuração.' },
      { level: 1, name: 'Domínio Divino', description: 'Escolha um domínio relacionado à sua divindade. Cada domínio fornece magias de domínio e outras características.' },
      { level: 2, name: 'Canalizar Divindade (1/descanso)', description: 'Você ganha a habilidade de canalizar energia divina diretamente da sua divindade, usando essa energia para alimentar efeitos mágicos. Você começa com dois efeitos: Expulsar Mortos-vivos e um efeito do seu domínio.' },
      { level: 2, name: 'Canalizar Divindade: Expulsar Mortos-Vivos', description: 'Como uma ação, você apresenta seu símbolo sagrado e fala uma prece censurando os mortos-vivos. Cada morto-vivo que puder ver ou ouvir deve fazer um teste de resistência de Sabedoria ou será expulso.' },
      { level: 4, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 5, name: 'Destruir Mortos-Vivos (CR 1/2)', description: 'Quando um morto-vivo falha em seu teste de resistência contra sua Expulsão, a criatura é instantaneamente destruída se seu CR for igual ou menor que 1/2.' },
      { level: 6, name: 'Canalizar Divindade (2/descanso)', description: 'Você pode usar Canalizar Divindade duas vezes entre descansos.' },
      { level: 6, name: 'Característica do Domínio Divino', description: 'Você ganha uma característica concedida pelo seu Domínio Divino.' },
      { level: 8, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 8, name: 'Destruir Mortos-Vivos (CR 1)', description: 'Você pode destruir mortos-vivos de CR 1 ou menor com Expulsar Mortos-Vivos.' },
      { level: 8, name: 'Característica do Domínio Divino', description: 'Você ganha uma característica concedida pelo seu Domínio Divino.' },
      { level: 10, name: 'Intervenção Divina', description: 'Você pode clamar a sua divindade para intervir em seu favor quando sua necessidade é grande. Role um d100; se o resultado for menor ou igual ao seu nível de clérigo, a divindade intervém.' },
      { level: 11, name: 'Destruir Mortos-Vivos (CR 2)', description: 'Você pode destruir mortos-vivos de CR 2 ou menor.' },
      { level: 12, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 14, name: 'Destruir Mortos-Vivos (CR 3)', description: 'Você pode destruir mortos-vivos de CR 3 ou menor.' },
      { level: 16, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 17, name: 'Destruir Mortos-Vivos (CR 4)', description: 'Você pode destruir mortos-vivos de CR 4 ou menor.' },
      { level: 17, name: 'Característica do Domínio Divino', description: 'Você ganha uma característica concedida pelo seu Domínio Divino.' },
      { level: 18, name: 'Canalizar Divindade (3/descanso)', description: 'Você pode usar Canalizar Divindade três vezes entre descansos.' },
      { level: 19, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 20, name: 'Intervenção Divina Aprimorada', description: 'Sua chamada à divindade é automaticamente bem-sucedida, sem necessidade de rolar.' },
    ],
    startingEquipment: [
      '(a) uma maça ou (b) um martelo de guerra (se proficiente)',
      '(a) brunea, (b) armadura de couro ou (c) cota de malha (se proficiente)',
      '(a) uma besta leve e 20 virotes ou (b) qualquer arma simples',
      '(a) um pacote de sacerdote ou (b) um pacote de aventureiro',
      'Um escudo e um símbolo sagrado',
    ],
  },

  // -------------------------------------------------------------------------
  // DRUIDA
  // -------------------------------------------------------------------------
  {
    id: 'druida',
    name: 'Druida',
    hitDie: 8,
    primaryAbility: 'sab',
    savingThrows: ['int', 'sab'],
    armorProficiencies: ['Armaduras leves', 'Armaduras médias', 'Escudos (não metálicos)'],
    weaponProficiencies: ['Clavas', 'Adagas', 'Dardos', 'Azagaias', 'Maças', 'Bordões', 'Cimitarras', 'Foices', 'Fundas', 'Lanças'],
    toolProficiencies: ['Kit de herbalismo'],
    skillChoices: {
      choose: 2,
      from: [
        'adestrar-animais', 'arcanismo', 'intuicao', 'medicina',
        'natureza', 'percepcao', 'religiao', 'sobrevivencia',
      ],
    },
    spellcasting: {
      ability: 'sab',
      type: 'prepared',
      cantripsKnown: DRUID_CANTRIPS,
      spellSlots: FULL_CASTER_SLOTS,
      spellsKnown: null,
    },
    subclassLevel: 2,
    subclasses: [
      {
        id: 'terra',
        name: 'Círculo da Terra',
        description: 'O Círculo da Terra é formado por místicos e sábios que guardam conhecimento antigo. A associação ao círculo é marcada por áreas geográficas e concede magias adicionais.',
      },
      {
        id: 'lua',
        name: 'Círculo da Lua',
        description: 'Os druidas do Círculo da Lua são guardiões ferozes da natureza selvagem. Sua ordem se reúne sob a lua cheia para compartilhar notícias e trocar avisos. Eles dominam a Forma Selvagem de combate.',
      },
    ],
    features: [
      { level: 1, name: 'Druídico', description: 'Você conhece o Druídico, a linguagem secreta dos druidas. Pode falar e deixar mensagens ocultas nessa língua.' },
      { level: 1, name: 'Conjuração', description: 'Através da essência divina da própria natureza, você pode conjurar magias. Sabedoria é sua habilidade de conjuração.' },
      { level: 2, name: 'Forma Selvagem', description: 'Você pode usar sua ação para assumir magicamente a forma de uma besta que já viu antes. Pode usar essa habilidade duas vezes por descanso curto ou longo.' },
      { level: 2, name: 'Círculo Druídico', description: 'Você escolhe se identificar com um círculo de druidas: Círculo da Terra ou Círculo da Lua.' },
      { level: 4, name: 'Forma Selvagem Aprimorada', description: 'Você pode usar Forma Selvagem para se transformar em bestas de CR 1/2 (sem limitação de movimento). No nível 8, CR 1.' },
      { level: 4, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 6, name: 'Característica do Círculo Druídico', description: 'Você ganha uma característica concedida pelo seu Círculo Druídico.' },
      { level: 8, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 10, name: 'Característica do Círculo Druídico', description: 'Você ganha uma característica concedida pelo seu Círculo Druídico.' },
      { level: 12, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 14, name: 'Característica do Círculo Druídico', description: 'Você ganha uma característica concedida pelo seu Círculo Druídico.' },
      { level: 16, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 18, name: 'Corpo Intemporal', description: 'A magia primitiva que você exerce faz com que você envelheça mais lentamente. Para cada 10 anos que passam, seu corpo envelhece apenas 1 ano.' },
      { level: 18, name: 'Conjuração Bestial', description: 'Você pode conjurar muitas de suas magias de druida em qualquer forma assumida através de Forma Selvagem. Pode realizar componentes somáticos e verbais, mas não pode utilizar componentes materiais.' },
      { level: 19, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 20, name: 'Arquidruida', description: 'Você pode usar sua Forma Selvagem um número ilimitado de vezes. Além disso, pode ignorar componentes verbais e somáticos de magias de druida, bem como componentes materiais sem custo.' },
    ],
    startingEquipment: [
      '(a) um escudo de madeira ou (b) qualquer arma simples',
      '(a) uma cimitarra ou (b) qualquer arma corpo a corpo simples',
      'Armadura de couro, um pacote de aventureiro e um foco druídico',
    ],
  },

  // -------------------------------------------------------------------------
  // GUERREIRO
  // -------------------------------------------------------------------------
  {
    id: 'guerreiro',
    name: 'Guerreiro',
    hitDie: 10,
    primaryAbility: 'for',
    savingThrows: ['for', 'con'],
    armorProficiencies: ['Todas as armaduras', 'Escudos'],
    weaponProficiencies: ['Armas simples', 'Armas marciais'],
    toolProficiencies: [],
    skillChoices: {
      choose: 2,
      from: [
        'acrobacia', 'adestrar-animais', 'atletismo', 'historia',
        'intimidacao', 'intuicao', 'percepcao', 'sobrevivencia',
      ],
    },
    spellcasting: null,
    subclassLevel: 3,
    subclasses: [
      {
        id: 'campeao',
        name: 'Campeão',
        description: 'O arquétipo do Campeão foca no desenvolvimento do poder físico bruto, aperfeiçoado até a perfeição mortal.',
      },
      {
        id: 'mestre-de-batalha',
        name: 'Mestre de Batalha',
        description: 'Os Mestres de Batalha empregam técnicas marciais passadas de geração em geração. Usam dados de superioridade para realizar manobras especiais.',
      },
      {
        id: 'cavaleiro-arcano',
        name: 'Cavaleiro Arcano',
        description: 'O Cavaleiro Arcano combina a maestria marcial com o estudo cuidadoso de magias, usando a tradição arcana de abjuração e evocação.',
      },
    ],
    features: [
      { level: 1, name: 'Estilo de Luta', description: 'Você adota um estilo de luta particular como sua especialidade. Escolha entre: Arquearia, Defesa, Duelismo, Luta com Armas Grandes, Proteção ou Luta com Duas Armas.' },
      { level: 1, name: 'Retomar Fôlego', description: 'Você possui uma reserva limitada de energia que pode usar para se proteger. No seu turno, você pode usar uma ação bônus para recuperar pontos de vida iguais a 1d10 + seu nível de guerreiro. Uma vez por descanso curto ou longo.' },
      { level: 2, name: 'Surto de Ação', description: 'Você pode forçar seu corpo além dos limites normais por um momento. No seu turno, você pode realizar uma ação adicional além da ação e ação bônus regulares. Uma vez por descanso curto ou longo.' },
      { level: 3, name: 'Arquétipo Marcial', description: 'Você escolhe um arquétipo que se esforça para emular: Campeão, Mestre de Batalha ou Cavaleiro Arcano.' },
      { level: 4, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 5, name: 'Ataque Extra (1)', description: 'Você pode atacar duas vezes, ao invés de uma, sempre que usar a ação de Ataque no seu turno.' },
      { level: 6, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 7, name: 'Característica do Arquétipo Marcial', description: 'Você ganha uma característica concedida pelo seu Arquétipo Marcial.' },
      { level: 8, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 9, name: 'Indomável (1 uso)', description: 'Você pode rolar novamente um teste de resistência que falhou. Se fizer isso, deve usar o novo resultado. Pode usar uma vez entre descansos longos.' },
      { level: 10, name: 'Característica do Arquétipo Marcial', description: 'Você ganha uma característica concedida pelo seu Arquétipo Marcial.' },
      { level: 11, name: 'Ataque Extra (2)', description: 'Você pode atacar três vezes sempre que usar a ação de Ataque no seu turno.' },
      { level: 12, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 13, name: 'Indomável (2 usos)', description: 'Você pode usar Indomável duas vezes entre descansos longos.' },
      { level: 14, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 15, name: 'Característica do Arquétipo Marcial', description: 'Você ganha uma característica concedida pelo seu Arquétipo Marcial.' },
      { level: 16, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 17, name: 'Surto de Ação (2 usos)', description: 'Você pode usar Surto de Ação duas vezes entre descansos curtos ou longos, mas apenas uma vez no mesmo turno.' },
      { level: 17, name: 'Indomável (3 usos)', description: 'Você pode usar Indomável três vezes entre descansos longos.' },
      { level: 18, name: 'Característica do Arquétipo Marcial', description: 'Você ganha uma característica concedida pelo seu Arquétipo Marcial.' },
      { level: 19, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 20, name: 'Ataque Extra (3)', description: 'Você pode atacar quatro vezes sempre que usar a ação de Ataque no seu turno.' },
    ],
    startingEquipment: [
      '(a) cota de malha ou (b) gibão de peles, arco longo e 20 flechas',
      '(a) uma arma marcial e um escudo ou (b) duas armas marciais',
      '(a) uma besta leve e 20 virotes ou (b) dois machados de arremesso',
      '(a) um pacote de aventureiro ou (b) um pacote de explorador',
    ],
  },

  // -------------------------------------------------------------------------
  // MONGE
  // -------------------------------------------------------------------------
  {
    id: 'monge',
    name: 'Monge',
    hitDie: 8,
    primaryAbility: 'des',
    savingThrows: ['for', 'des'],
    armorProficiencies: [],
    weaponProficiencies: ['Armas simples', 'Espadas curtas'],
    toolProficiencies: ['Um tipo de ferramenta de artesão ou um instrumento musical'],
    skillChoices: {
      choose: 2,
      from: [
        'acrobacia', 'atletismo', 'furtividade', 'historia',
        'intuicao', 'religiao',
      ],
    },
    spellcasting: null,
    subclassLevel: 3,
    subclasses: [
      {
        id: 'mao-aberta',
        name: 'Caminho da Mão Aberta',
        description: 'Monges do Caminho da Mão Aberta são os mestres supremos das artes marciais de combate, seja com armas ou desarmados. Aprendem técnicas para empurrar e derrubar oponentes.',
      },
      {
        id: 'sombra',
        name: 'Caminho da Sombra',
        description: 'Monges do Caminho da Sombra seguem uma tradição que valoriza a furtividade e a subterfúgio. Esses monges podem ser chamados de ninjas ou dançarinos das sombras.',
      },
    ],
    features: [
      { level: 1, name: 'Defesa sem Armadura', description: 'Quando você não está usando armadura nem escudo, sua CA é igual a 10 + modificador de Destreza + modificador de Sabedoria.' },
      { level: 1, name: 'Artes Marciais', description: 'Seu treinamento em artes marciais concede maestria em estilos de combate que usam golpes desarmados e armas de monge. O dado de dano começa em d4 e aumenta com o nível. Pode usar Destreza em vez de Força para ataques desarmados.' },
      { level: 2, name: 'Ki', description: 'Seu treinamento permite aproveitar a energia mística do ki. Você tem um número de pontos de ki igual ao seu nível de monge. Pode gastar esses pontos para usar Rajada de Golpes, Defesa Paciente e Passo do Vento.' },
      { level: 2, name: 'Movimento sem Armadura', description: 'Seu deslocamento aumenta em 3 metros enquanto não estiver usando armadura ou escudo. Esse bônus aumenta conforme o nível.' },
      { level: 3, name: 'Tradição Monástica', description: 'Você se compromete com uma tradição monástica: Caminho da Mão Aberta ou Caminho da Sombra.' },
      { level: 3, name: 'Desviar Projéteis', description: 'Você pode usar sua reação para desviar ou pegar um projétil quando é atingido por um ataque de arma à distância. Reduz o dano em 1d10 + mod. Destreza + nível de monge.' },
      { level: 4, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 4, name: 'Queda Lenta', description: 'Você pode usar sua reação quando cai para reduzir qualquer dano de queda que receber em uma quantidade igual a cinco vezes seu nível de monge.' },
      { level: 5, name: 'Ataque Extra', description: 'Você pode atacar duas vezes, ao invés de uma, sempre que usar a ação de Ataque no seu turno.' },
      { level: 5, name: 'Ataque Atordoante', description: 'Você pode interferir no fluxo de ki do corpo de um oponente. Quando atingir uma criatura com um ataque corpo a corpo, pode gastar 1 ponto de ki para tentar um ataque atordoante. O alvo deve ter sucesso em um teste de resistência de Constituição ou ficará atordoado.' },
      { level: 6, name: 'Golpes de Ki', description: 'Seus golpes desarmados contam como mágicos para superar resistências e imunidades a ataques e danos não mágicos.' },
      { level: 6, name: 'Característica da Tradição Monástica', description: 'Você ganha uma característica concedida pela sua Tradição Monástica.' },
      { level: 7, name: 'Evasão', description: 'Quando sujeito a um efeito que permite um teste de resistência de Destreza para receber metade do dano, você não recebe dano se for bem-sucedido e apenas metade se falhar.' },
      { level: 7, name: 'Mente Tranquila', description: 'Você pode usar sua ação para encerrar um efeito em si mesmo que está causando a condição enfeitiçado ou amedrontado.' },
      { level: 8, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 9, name: 'Movimento sem Armadura Aprimorado', description: 'Você ganha a habilidade de se mover ao longo de superfícies verticais e sobre líquidos no seu turno sem cair durante o movimento.' },
      { level: 10, name: 'Pureza do Corpo', description: 'Sua maestria no ki que flui através de você torna você imune a doenças e venenos.' },
      { level: 11, name: 'Característica da Tradição Monástica', description: 'Você ganha uma característica concedida pela sua Tradição Monástica.' },
      { level: 12, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 13, name: 'Idioma do Sol e da Lua', description: 'Você aprende a tocar o ki de outras mentes de tal forma que compreende todos os idiomas falados. Além disso, qualquer criatura que possa entender um idioma pode entender o que você diz.' },
      { level: 14, name: 'Alma de Diamante', description: 'Sua maestria no ki concede proficiência em todos os testes de resistência. Além disso, sempre que falhar em um teste de resistência, pode gastar 1 ponto de ki para rolar novamente.' },
      { level: 15, name: 'Corpo Intemporal', description: 'Seu ki sustenta você de tal forma que você não sofre os efeitos da velhice e não pode ser envelhecido magicamente. Você não precisa de comida ou água.' },
      { level: 16, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 17, name: 'Característica da Tradição Monástica', description: 'Você ganha uma característica concedida pela sua Tradição Monástica.' },
      { level: 18, name: 'Corpo Vazio', description: 'Você pode usar sua ação para gastar 4 pontos de ki e se tornar invisível por 1 minuto. Também pode gastar 8 pontos de ki para conjurar Projeção Astral, sem precisar de componentes materiais.' },
      { level: 19, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 20, name: 'Perfeição do Ser', description: 'Quando você rolar iniciativa e não tiver pontos de ki restantes, você recupera 4 pontos de ki.' },
    ],
    startingEquipment: [
      '(a) uma espada curta ou (b) qualquer arma simples',
      '(a) um pacote de explorador ou (b) um pacote de aventureiro',
      '10 dardos',
    ],
  },

  // -------------------------------------------------------------------------
  // PALADINO
  // -------------------------------------------------------------------------
  {
    id: 'paladino',
    name: 'Paladino',
    hitDie: 10,
    primaryAbility: 'for',
    savingThrows: ['sab', 'car'],
    armorProficiencies: ['Todas as armaduras', 'Escudos'],
    weaponProficiencies: ['Armas simples', 'Armas marciais'],
    toolProficiencies: [],
    skillChoices: {
      choose: 2,
      from: [
        'atletismo', 'intimidacao', 'intuicao', 'medicina',
        'persuasao', 'religiao',
      ],
    },
    spellcasting: {
      ability: 'car',
      type: 'prepared',
      cantripsKnown: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      spellSlots: HALF_CASTER_SLOTS,
      spellsKnown: null,
    },
    subclassLevel: 3,
    subclasses: [
      {
        id: 'devocao',
        name: 'Juramento de Devoção',
        description: 'O Juramento de Devoção liga um paladino aos mais elevados ideais de justiça, virtude e ordem. Também chamados de cavaleiros santos, cavaleiros brancos ou guerreiros sagrados.',
      },
      {
        id: 'antigos',
        name: 'Juramento dos Antigos',
        description: 'O Juramento dos Antigos é tão antigo quanto a raça dos elfos e os rituais dos druidas. Os paladinos que juram esse juramento aliaram sua luz à luta contra a escuridão porque amam as coisas belas e vivificantes do mundo.',
      },
    ],
    features: [
      { level: 1, name: 'Sentido Divino', description: 'A presença de mal forte causa uma sensação nos seus sentidos. Como uma ação, você pode abrir sua consciência para detectar tais forças. Até o final do seu próximo turno, você sabe a localização de celestiais, corruptores ou mortos-vivos num raio de 18 metros.' },
      { level: 1, name: 'Cura pelas Mãos', description: 'Seu toque abençoado pode curar ferimentos. Você tem uma reserva de poder curativo que recarrega após um descanso longo. Pode restaurar um total de pontos de vida igual a 5 x seu nível de paladino.' },
      { level: 2, name: 'Estilo de Luta', description: 'Você adota um estilo de luta particular como sua especialidade.' },
      { level: 2, name: 'Conjuração', description: 'Você aprendeu a canalizar magia divina através de meditação e prece para conjurar magias como um clérigo. Carisma é sua habilidade de conjuração.' },
      { level: 2, name: 'Destruição Divina', description: 'Quando você atinge uma criatura com um ataque corpo a corpo com arma, pode gastar um espaço de magia para causar dano radiante adicional de 2d8 para um slot de 1° nível, mais 1d8 para cada nível de slot acima do 1°, até um máximo de 5d8. O dano aumenta em 1d8 se o alvo for um morto-vivo ou corruptor.' },
      { level: 3, name: 'Saúde Divina', description: 'A magia divina que flui através de você torna você imune a doenças.' },
      { level: 3, name: 'Juramento Sagrado', description: 'Você faz o juramento que o liga como paladino para sempre: Juramento de Devoção ou Juramento dos Antigos.' },
      { level: 4, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 5, name: 'Ataque Extra', description: 'Você pode atacar duas vezes, ao invés de uma, sempre que usar a ação de Ataque no seu turno.' },
      { level: 6, name: 'Aura de Proteção', description: 'Sempre que você ou uma criatura amigável num raio de 3 metros fizer um teste de resistência, a criatura ganha um bônus ao teste igual ao seu modificador de Carisma (mínimo +1). No nível 18, o alcance aumenta para 9 metros.' },
      { level: 7, name: 'Característica do Juramento Sagrado', description: 'Você ganha uma característica concedida pelo seu Juramento Sagrado.' },
      { level: 8, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 9, name: 'Destruição Divina Aprimorada', description: 'O dano da sua Destruição Divina aumenta.' },
      { level: 10, name: 'Aura de Coragem', description: 'Você e criaturas amigáveis num raio de 3 metros não podem ser amedrontados enquanto você estiver consciente. No nível 18, o alcance aumenta para 9 metros.' },
      { level: 11, name: 'Destruição Divina Aprimorada', description: 'Sempre que atingir uma criatura com uma arma corpo a corpo, a criatura recebe 1d8 de dano radiante extra. Se usar Destruição Divina, o dano se soma.' },
      { level: 12, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 14, name: 'Toque Purificador', description: 'Você pode usar sua ação para terminar uma magia em si mesmo ou em uma criatura voluntária que tocar. Pode usar essa habilidade um número de vezes igual ao seu modificador de Carisma (mínimo 1).' },
      { level: 15, name: 'Característica do Juramento Sagrado', description: 'Você ganha uma característica concedida pelo seu Juramento Sagrado.' },
      { level: 16, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 18, name: 'Aura Aprimorada', description: 'O alcance das suas auras (Aura de Proteção e Aura de Coragem) aumenta para 9 metros.' },
      { level: 19, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 20, name: 'Característica do Juramento Sagrado', description: 'Você ganha uma característica capstone concedida pelo seu Juramento Sagrado.' },
    ],
    startingEquipment: [
      '(a) uma arma marcial e um escudo ou (b) duas armas marciais',
      '(a) cinco azagaias ou (b) qualquer arma simples corpo a corpo',
      '(a) um pacote de sacerdote ou (b) um pacote de aventureiro',
      'Cota de malha e um símbolo sagrado',
    ],
  },

  // -------------------------------------------------------------------------
  // RANGER
  // -------------------------------------------------------------------------
  {
    id: 'ranger',
    name: 'Ranger',
    hitDie: 10,
    primaryAbility: 'des',
    savingThrows: ['for', 'des'],
    armorProficiencies: ['Armaduras leves', 'Armaduras médias', 'Escudos'],
    weaponProficiencies: ['Armas simples', 'Armas marciais'],
    toolProficiencies: [],
    skillChoices: {
      choose: 3,
      from: [
        'adestrar-animais', 'atletismo', 'furtividade', 'intuicao',
        'investigacao', 'natureza', 'percepcao', 'sobrevivencia',
      ],
    },
    spellcasting: {
      ability: 'sab',
      type: 'known',
      cantripsKnown: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      spellSlots: HALF_CASTER_SLOTS,
      spellsKnown: RANGER_SPELLS_KNOWN,
    },
    subclassLevel: 3,
    subclasses: [
      {
        id: 'cacador',
        name: 'Caçador',
        description: 'Emular o arquétipo do Caçador significa aceitar seu lugar como baluarte entre a civilização e os terrores da natureza selvagem. Você aprende técnicas de combate especializadas contra ameaças.',
      },
      {
        id: 'mestre-das-bestas',
        name: 'Mestre das Bestas',
        description: 'O arquétipo do Mestre das Bestas encarna uma amizade entre as raças civilizadas e as bestas do mundo. Você ganha um companheiro animal que o acompanha em aventuras.',
      },
    ],
    features: [
      { level: 1, name: 'Inimigo Favorito', description: 'Você tem experiência significativa estudando, rastreando, caçando e até falando com certo tipo de inimigo. Escolha um tipo de inimigo favorito. Você tem vantagem em testes de Sabedoria (Sobrevivência) para rastrear e testes de Inteligência para lembrar informações sobre eles.' },
      { level: 1, name: 'Explorador Natural', description: 'Você é um mestre de navegar no mundo natural. Escolha um tipo de terreno favorito. Nesse terreno, seu grupo não pode se perder exceto por meios mágicos, e você ganha diversos bônus de exploração.' },
      { level: 2, name: 'Estilo de Luta', description: 'Você adota um estilo de luta particular como sua especialidade.' },
      { level: 2, name: 'Conjuração', description: 'Você aprendeu a usar a essência mágica da natureza para conjurar magias. Sabedoria é sua habilidade de conjuração.' },
      { level: 3, name: 'Arquétipo de Ranger', description: 'Você escolhe um arquétipo que se esforça para emular: Caçador ou Mestre das Bestas.' },
      { level: 3, name: 'Consciência Primitiva', description: 'Você pode usar sua ação e gastar um espaço de magia de ranger para focar sua consciência na região ao redor. Por 1 minuto por nível do slot, pode sentir tipos de criaturas num raio de 1,5 km.' },
      { level: 4, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 5, name: 'Ataque Extra', description: 'Você pode atacar duas vezes, ao invés de uma, sempre que usar a ação de Ataque no seu turno.' },
      { level: 6, name: 'Inimigo Favorito Aprimorado', description: 'Você escolhe um tipo adicional de inimigo favorito. Além disso, você aprende um idioma adicional de sua escolha.' },
      { level: 6, name: 'Explorador Natural Aprimorado', description: 'Você escolhe um tipo adicional de terreno favorito.' },
      { level: 7, name: 'Característica do Arquétipo de Ranger', description: 'Você ganha uma característica concedida pelo seu Arquétipo de Ranger.' },
      { level: 8, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 8, name: 'Caminhada na Terra', description: 'Mover-se por terreno difícil não mágico não custa movimento extra. Você também pode passar por plantas não mágicas sem ser retardado ou receber dano.' },
      { level: 10, name: 'Esconder-se nas Sombras', description: 'Você pode gastar 1 minuto criando camuflagem para si mesmo. Enquanto camuflado e imóvel, criaturas que tentem vê-lo precisam de um teste de Sabedoria (Percepção) contra CD 10 + mod. Destreza + bônus de proficiência.' },
      { level: 10, name: 'Explorador Natural Aprimorado', description: 'Você escolhe um tipo adicional de terreno favorito.' },
      { level: 11, name: 'Característica do Arquétipo de Ranger', description: 'Você ganha uma característica concedida pelo seu Arquétipo de Ranger.' },
      { level: 12, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 14, name: 'Inimigo Favorito Aprimorado', description: 'Você escolhe um tipo adicional de inimigo favorito.' },
      { level: 14, name: 'Desaparecer', description: 'Você pode usar a ação de Esconder como uma ação bônus no seu turno. Além disso, você não pode ser rastreado por meios não mágicos, a menos que escolha deixar um rastro.' },
      { level: 15, name: 'Característica do Arquétipo de Ranger', description: 'Você ganha uma característica concedida pelo seu Arquétipo de Ranger.' },
      { level: 16, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 18, name: 'Sentidos Selvagens', description: 'Você ganha sentidos sobrenaturais que ajudam a lutar contra criaturas que não pode ver. Quando ataca uma criatura que não pode ver, sua incapacidade de vê-la não impõe desvantagem nas jogadas de ataque. Você também está ciente da localização de criaturas invisíveis num raio de 9 metros.' },
      { level: 19, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 20, name: 'Matador de Inimigos', description: 'Você se torna um caçador inigualável de seus inimigos. Uma vez por turno, pode adicionar seu modificador de Sabedoria ao ataque ou ao dano contra um inimigo favorito. Além disso, pode usar essa habilidade contra qualquer criatura cujo tipo você desconheça.' },
    ],
    startingEquipment: [
      '(a) brunea ou (b) armadura de couro',
      '(a) duas espadas curtas ou (b) duas armas simples corpo a corpo',
      '(a) um pacote de explorador ou (b) um pacote de aventureiro',
      'Um arco longo e uma aljava com 20 flechas',
    ],
  },

  // -------------------------------------------------------------------------
  // LADINO
  // -------------------------------------------------------------------------
  {
    id: 'ladino',
    name: 'Ladino',
    hitDie: 8,
    primaryAbility: 'des',
    savingThrows: ['des', 'int'],
    armorProficiencies: ['Armaduras leves'],
    weaponProficiencies: ['Armas simples', 'Bestas de mão', 'Espadas longas', 'Rapieiras', 'Espadas curtas'],
    toolProficiencies: ['Ferramentas de ladrão'],
    skillChoices: {
      choose: 4,
      from: [
        'acrobacia', 'atletismo', 'enganacao', 'furtividade',
        'intimidacao', 'intuicao', 'investigacao', 'percepcao',
        'performance', 'persuasao', 'prestidigitacao',
      ],
    },
    spellcasting: null,
    subclassLevel: 3,
    subclasses: [
      {
        id: 'ladrao',
        name: 'Ladrão',
        description: 'Você aprimora suas habilidades nas artes do furto. Assaltantes, bandidos, batedores de carteira e outros criminosos tipicamente seguem este arquétipo.',
      },
      {
        id: 'assassino',
        name: 'Assassino',
        description: 'Você concentra seu treinamento na arte sombria da morte. Aqueles que seguem esse arquétipo são diversos: assassinos de aluguel, espiões, caçadores de recompensas e até padres especialmente ungidos.',
      },
      {
        id: 'trapaceiro-arcano',
        name: 'Trapaceiro Arcano',
        description: 'Alguns ladinos aprimoram suas habilidades furtivas com magia, aprendendo truques de encantamento e ilusão. Inclui batedores de carteira e assaltantes, bem como brincalhões e mestres da intriga.',
      },
    ],
    features: [
      { level: 1, name: 'Especialidade', description: 'Escolha duas de suas proficiências em perícias, ou uma proficiência em perícia e sua proficiência com ferramentas de ladrão. Seu bônus de proficiência é dobrado para qualquer teste de habilidade que use essas proficiências.' },
      { level: 1, name: 'Ataque Furtivo (1d6)', description: 'Você sabe como golpear sutilmente e explorar a distração de um inimigo. Uma vez por turno, pode causar 1d6 de dano extra a uma criatura que atingir com um ataque se tiver vantagem na jogada de ataque ou se outro inimigo da criatura estiver a 1,5 metro dela.' },
      { level: 1, name: 'Gíria de Ladrão', description: 'Você aprendeu a gíria dos ladrões, um misto secreto de dialeto, jargão e código que permite esconder mensagens em conversas aparentemente normais.' },
      { level: 2, name: 'Ação Ardilosa', description: 'Sua agilidade mental e física permite agir rapidamente. Você pode usar uma ação bônus em cada turno de combate para Disparada, Desengajar ou Esconder.' },
      { level: 3, name: 'Arquétipo de Ladino', description: 'Você escolhe um arquétipo que emula no exercício de suas habilidades de ladino: Ladrão, Assassino ou Trapaceiro Arcano.' },
      { level: 3, name: 'Ataque Furtivo (2d6)', description: 'Seu dano de Ataque Furtivo aumenta para 2d6.' },
      { level: 4, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 5, name: 'Esquiva Sobrenatural', description: 'Quando um atacante que você pode ver atinge você com um ataque, pode usar sua reação para reduzir o dano pela metade.' },
      { level: 5, name: 'Ataque Furtivo (3d6)', description: 'Seu dano de Ataque Furtivo aumenta para 3d6.' },
      { level: 6, name: 'Especialidade (adicional)', description: 'Escolha mais duas de suas proficiências (em perícias ou ferramentas de ladrão) para dobrar o bônus de proficiência.' },
      { level: 7, name: 'Evasão', description: 'Quando sujeito a um efeito que permite um teste de resistência de Destreza para receber metade do dano, você não recebe dano se for bem-sucedido e apenas metade se falhar.' },
      { level: 7, name: 'Ataque Furtivo (4d6)', description: 'Seu dano de Ataque Furtivo aumenta para 4d6.' },
      { level: 8, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 9, name: 'Característica do Arquétipo de Ladino', description: 'Você ganha uma característica concedida pelo seu Arquétipo de Ladino.' },
      { level: 9, name: 'Ataque Furtivo (5d6)', description: 'Seu dano de Ataque Furtivo aumenta para 5d6.' },
      { level: 10, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 11, name: 'Talento Confiável', description: 'Você refinou suas perícias escolhidas até a quase perfeição. Sempre que fizer um teste de habilidade que inclua seu bônus de proficiência, pode tratar um resultado de d20 de 9 ou menos como um 10.' },
      { level: 11, name: 'Ataque Furtivo (6d6)', description: 'Seu dano de Ataque Furtivo aumenta para 6d6.' },
      { level: 12, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 13, name: 'Característica do Arquétipo de Ladino', description: 'Você ganha uma característica concedida pelo seu Arquétipo de Ladino.' },
      { level: 13, name: 'Ataque Furtivo (7d6)', description: 'Seu dano de Ataque Furtivo aumenta para 7d6.' },
      { level: 14, name: 'Sentido Cego', description: 'Se estiver apto a ouvir, você está ciente da localização de qualquer criatura escondida ou invisível num raio de 3 metros de você.' },
      { level: 15, name: 'Mente Escorregadia', description: 'Você adquiriu maior força mental. Você ganha proficiência em testes de resistência de Sabedoria.' },
      { level: 15, name: 'Ataque Furtivo (8d6)', description: 'Seu dano de Ataque Furtivo aumenta para 8d6.' },
      { level: 16, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 17, name: 'Característica do Arquétipo de Ladino', description: 'Você ganha uma característica concedida pelo seu Arquétipo de Ladino.' },
      { level: 17, name: 'Ataque Furtivo (9d6)', description: 'Seu dano de Ataque Furtivo aumenta para 9d6.' },
      { level: 18, name: 'Elusivo', description: 'Você é tão evasivo que atacantes raramente obtêm vantagem contra você. Nenhuma jogada de ataque tem vantagem contra você enquanto não estiver incapacitado.' },
      { level: 19, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 19, name: 'Ataque Furtivo (10d6)', description: 'Seu dano de Ataque Furtivo aumenta para 10d6.' },
      { level: 20, name: 'Golpe de Sorte', description: 'Você tem um talento sobrenatural para ter sucesso quando precisa. Se seu ataque errar um alvo ao alcance, pode transformar o erro em acerto. Ou se falhar em um teste de habilidade, pode tratar o d20 como um 20. Uma vez por descanso curto ou longo.' },
    ],
    startingEquipment: [
      '(a) uma rapieira ou (b) uma espada curta',
      '(a) um arco curto e aljava com 20 flechas ou (b) uma espada curta',
      '(a) um pacote de assaltante, (b) um pacote de aventureiro ou (c) um pacote de explorador',
      'Armadura de couro, duas adagas e ferramentas de ladrão',
    ],
  },

  // -------------------------------------------------------------------------
  // FEITICEIRO
  // -------------------------------------------------------------------------
  {
    id: 'feiticeiro',
    name: 'Feiticeiro',
    hitDie: 6,
    primaryAbility: 'car',
    savingThrows: ['con', 'car'],
    armorProficiencies: [],
    weaponProficiencies: ['Adagas', 'Dardos', 'Fundas', 'Bordões', 'Bestas leves'],
    toolProficiencies: [],
    skillChoices: {
      choose: 2,
      from: [
        'arcanismo', 'enganacao', 'intimidacao', 'intuicao',
        'persuasao', 'religiao',
      ],
    },
    spellcasting: {
      ability: 'car',
      type: 'known',
      cantripsKnown: SORCERER_CANTRIPS,
      spellSlots: FULL_CASTER_SLOTS,
      spellsKnown: SORCERER_SPELLS_KNOWN,
    },
    subclassLevel: 1,
    subclasses: [
      {
        id: 'draconico',
        name: 'Linhagem Dracônica',
        description: 'Sua magia inata vem da magia dracônica que foi misturada ao seu sangue ou ao de seus ancestrais. Feiticeiros com essa origem traçam sua descendência de um poderoso dragão ancestral.',
      },
      {
        id: 'magia-selvagem',
        name: 'Magia Selvagem',
        description: 'Sua magia inata vem das forças selvagens do caos que fundamentam a ordem da criação. Você pode ter suportado exposição a alguma forma de magia bruta, ou ter sido abençoado por uma entidade caótica.',
      },
    ],
    features: [
      { level: 1, name: 'Conjuração', description: 'Um evento no seu passado, ou na vida de um parente ou ancestral, deixou uma marca indelével em você, infundindo-o com magia arcana. Carisma é sua habilidade de conjuração.' },
      { level: 1, name: 'Origem de Feitiçaria', description: 'Escolha uma origem de feitiçaria que descreva a fonte do seu poder inato: Linhagem Dracônica ou Magia Selvagem.' },
      { level: 2, name: 'Fonte de Magia', description: 'Você tem 2 pontos de feitiçaria que pode usar para ganhar slots de magia adicionais ou para alimentar Metamagias. O número de pontos aumenta com o nível.' },
      { level: 3, name: 'Metamagia', description: 'Você ganha a habilidade de torcer suas magias para atender suas necessidades. Escolha duas opções de Metamagia (como Magia Acelerada, Magia Sutil, Magia Potencializada, etc.).' },
      { level: 4, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 6, name: 'Característica da Origem de Feitiçaria', description: 'Você ganha uma característica concedida pela sua Origem de Feitiçaria.' },
      { level: 8, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 10, name: 'Metamagia (adicional)', description: 'Você escolhe uma opção de Metamagia adicional.' },
      { level: 12, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 14, name: 'Característica da Origem de Feitiçaria', description: 'Você ganha uma característica concedida pela sua Origem de Feitiçaria.' },
      { level: 16, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 17, name: 'Metamagia (adicional)', description: 'Você escolhe uma opção de Metamagia adicional.' },
      { level: 18, name: 'Característica da Origem de Feitiçaria', description: 'Você ganha uma característica concedida pela sua Origem de Feitiçaria.' },
      { level: 19, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 20, name: 'Restauração de Feitiçaria', description: 'Você recupera 4 pontos de feitiçaria gastos sempre que terminar um descanso curto.' },
    ],
    startingEquipment: [
      '(a) uma besta leve e 20 virotes ou (b) qualquer arma simples',
      '(a) uma bolsa de componentes ou (b) um foco arcano',
      '(a) um pacote de explorador ou (b) um pacote de aventureiro',
      'Duas adagas',
    ],
  },

  // -------------------------------------------------------------------------
  // BRUXO
  // -------------------------------------------------------------------------
  {
    id: 'bruxo',
    name: 'Bruxo',
    hitDie: 8,
    primaryAbility: 'car',
    savingThrows: ['sab', 'car'],
    armorProficiencies: ['Armaduras leves'],
    weaponProficiencies: ['Armas simples'],
    toolProficiencies: [],
    skillChoices: {
      choose: 2,
      from: [
        'arcanismo', 'enganacao', 'historia', 'intimidacao',
        'investigacao', 'natureza', 'religiao',
      ],
    },
    spellcasting: {
      ability: 'car',
      type: 'pact',
      cantripsKnown: WARLOCK_CANTRIPS,
      // Magia de Pacto: slots de mesmo nível, recuperados em descanso curto
      // pactSlots[nível][0] = qtd de slots, pactSlots[nível][1] = nível do slot
      pactSlots: WARLOCK_PACT_SLOTS,
      spellsKnown: WARLOCK_SPELLS_KNOWN,
      // Bruxos também ganham Invocações Místicas e magias Arcanum
      // Magias Arcanum (uma de cada nível, 1/dia): nível 11 (6°), 13 (7°), 15 (8°), 17 (9°)
      mysticArcanum: [
        { level: 11, spellLevel: 6 },
        { level: 13, spellLevel: 7 },
        { level: 15, spellLevel: 8 },
        { level: 17, spellLevel: 9 },
      ],
    },
    subclassLevel: 1,
    subclasses: [
      {
        id: 'arquifada',
        name: 'O Arquifada',
        description: 'Seu patrono é um senhor ou senhora do reino feérico, uma criatura de lenda que detém segredos há milênios. As motivações desses seres são frequentemente inescrutáveis e às vezes caprichosas.',
      },
      {
        id: 'corruptor',
        name: 'O Corruptor',
        description: 'Você fez um pacto com um corruptor dos planos inferiores da existência, um ser cujos objetivos são o mal, mesmo que você lute contra esses objetivos. Demônios poderosos e outros seres se enquadram nessa categoria.',
      },
      {
        id: 'grande-antigo',
        name: 'O Grande Antigo',
        description: 'Seu patrono é uma entidade misteriosa cuja natureza é absolutamente estranha ao tecido da realidade. Pode vir do Reino Distante ou ser um dos deuses antigos conhecidos apenas em lendas.',
      },
    ],
    features: [
      { level: 1, name: 'Patrono Transcendental', description: 'Você estabeleceu um pacto com um ser transcendental de sua escolha: O Arquifada, O Corruptor ou O Grande Antigo. Cada patrono concede características e magias expandidas.' },
      { level: 1, name: 'Magia de Pacto', description: 'Suas pesquisas arcanas e a magia concedida pelo seu patrono lhe dão facilidade com magias. Carisma é sua habilidade de conjuração. Seus slots de magia são todos de mesmo nível e são recuperados após um descanso curto.' },
      { level: 2, name: 'Invocações Místicas', description: 'No seu estudo do conhecimento oculto, você desenterrou invocações místicas, fragmentos de conhecimento proibido que lhe concedem uma habilidade mágica permanente. Você ganha duas invocações.' },
      { level: 3, name: 'Dádiva do Pacto', description: 'Seu patrono transcendental lhe concede uma dádiva por seus serviços leais. Escolha entre: Pacto da Corrente (familiar aprimorado), Pacto da Lâmina (arma de pacto) ou Pacto do Grimório (livro de sombras).' },
      { level: 4, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 5, name: 'Invocações Místicas (adicional)', description: 'Você aprende uma invocação mística adicional.' },
      { level: 6, name: 'Característica do Patrono Transcendental', description: 'Você ganha uma característica concedida pelo seu Patrono Transcendental.' },
      { level: 7, name: 'Invocações Místicas (adicional)', description: 'Você aprende uma invocação mística adicional.' },
      { level: 8, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 9, name: 'Invocações Místicas (adicional)', description: 'Você aprende uma invocação mística adicional.' },
      { level: 10, name: 'Característica do Patrono Transcendental', description: 'Você ganha uma característica concedida pelo seu Patrono Transcendental.' },
      { level: 11, name: 'Arcano Místico (6° nível)', description: 'Seu patrono lhe concede um segredo mágico chamado arcano. Escolha uma magia de 6° nível da lista de bruxo como seu arcano. Pode conjurá-la uma vez sem gastar um slot de magia. Deve terminar um descanso longo para fazê-lo novamente.' },
      { level: 12, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 13, name: 'Arcano Místico (7° nível)', description: 'Você escolhe uma magia de 7° nível da lista de bruxo como um arcano.' },
      { level: 14, name: 'Característica do Patrono Transcendental', description: 'Você ganha uma característica concedida pelo seu Patrono Transcendental.' },
      { level: 15, name: 'Arcano Místico (8° nível)', description: 'Você escolhe uma magia de 8° nível da lista de bruxo como um arcano.' },
      { level: 16, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 17, name: 'Arcano Místico (9° nível)', description: 'Você escolhe uma magia de 9° nível da lista de bruxo como um arcano.' },
      { level: 18, name: 'Invocações Místicas (adicional)', description: 'Você aprende uma invocação mística adicional.' },
      { level: 19, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 20, name: 'Mestre Arcano', description: 'Você pode pedir ao seu patrono para restaurar todos os seus slots de magia gastos. Uma vez por descanso longo, pode gastar 1 minuto suplicando ao seu patrono para recuperar todos os slots.' },
    ],
    startingEquipment: [
      '(a) uma besta leve e 20 virotes ou (b) qualquer arma simples',
      '(a) uma bolsa de componentes ou (b) um foco arcano',
      '(a) um pacote de estudioso ou (b) um pacote de explorador',
      'Armadura de couro, qualquer arma simples e duas adagas',
    ],
  },

  // -------------------------------------------------------------------------
  // MAGO
  // -------------------------------------------------------------------------
  {
    id: 'mago',
    name: 'Mago',
    hitDie: 6,
    primaryAbility: 'int',
    savingThrows: ['int', 'sab'],
    armorProficiencies: [],
    weaponProficiencies: ['Adagas', 'Dardos', 'Fundas', 'Bordões', 'Bestas leves'],
    toolProficiencies: [],
    skillChoices: {
      choose: 2,
      from: [
        'arcanismo', 'historia', 'intuicao', 'investigacao',
        'medicina', 'religiao',
      ],
    },
    spellcasting: {
      ability: 'int',
      type: 'prepared',
      cantripsKnown: WIZARD_CANTRIPS,
      spellSlots: FULL_CASTER_SLOTS,
      spellsKnown: null, // Mago prepara de seu grimório
    },
    subclassLevel: 2,
    subclasses: [
      {
        id: 'abjuracao',
        name: 'Escola de Abjuração',
        description: 'A Escola de Abjuração enfatiza a magia que bloqueia, proíbe e protege. Abjuradores são buscados quando espíritos malignos precisam ser exorcizados ou portais para outros planos precisam ser selados.',
      },
      {
        id: 'evocacao',
        name: 'Escola de Evocação',
        description: 'Você foca seu estudo em magias que criam efeitos elementais poderosos como frio cortante, chamas intensas, trovões estrondosos, ácido corrosivo e relâmpagos.',
      },
      {
        id: 'ilusao',
        name: 'Escola de Ilusão',
        description: 'Você focou seus estudos em magia que fascina os sentidos, confunde a mente e engana até os mais sábios. Sua magia é sutil, feita para enganar e não para destruição direta.',
      },
    ],
    features: [
      { level: 1, name: 'Conjuração', description: 'Como um estudante de magia arcana, você possui um grimório contendo magias que mostram os primeiros vislumbres do seu verdadeiro poder. Inteligência é sua habilidade de conjuração.' },
      { level: 1, name: 'Recuperação Arcana', description: 'Você aprendeu a recuperar parte de sua energia mágica estudando seu grimório. Uma vez por dia, quando terminar um descanso curto, pode recuperar espaços de magia cujo nível somado seja igual ou menor que metade do seu nível de mago (arredondado para cima), sem slots acima do 5° nível.' },
      { level: 2, name: 'Tradição Arcana', description: 'Você escolhe uma tradição arcana, moldando sua prática mágica em uma das oito escolas de magia: Abjuração, Evocação, Ilusão, entre outras.' },
      { level: 4, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 6, name: 'Característica da Tradição Arcana', description: 'Você ganha uma característica concedida pela sua Tradição Arcana.' },
      { level: 8, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 10, name: 'Característica da Tradição Arcana', description: 'Você ganha uma característica concedida pela sua Tradição Arcana.' },
      { level: 12, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 14, name: 'Característica da Tradição Arcana', description: 'Você ganha uma característica concedida pela sua Tradição Arcana.' },
      { level: 16, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 18, name: 'Domínio de Magia', description: 'Você alcançou tal maestria sobre certas magias que pode conjurá-las à vontade. Escolha uma magia de mago de 1° nível e uma de 2° nível que estejam no seu grimório. Pode conjurá-las em seu nível mais baixo sem gastar um slot. Pode trocá-las ao estudar.' },
      { level: 19, name: 'Incremento no Valor de Habilidade', description: 'Você pode aumentar um valor de habilidade em 2, ou dois valores de habilidade em 1 cada.' },
      { level: 20, name: 'Magias Assinatura', description: 'Você ganha maestria sobre duas magias poderosas e pode conjurá-las com pouco esforço. Escolha duas magias de mago de 3° nível no seu grimório como magias assinatura. Cada uma pode ser conjurada uma vez sem gastar slot, recuperando após descanso curto ou longo.' },
    ],
    startingEquipment: [
      '(a) um bordão ou (b) uma adaga',
      '(a) uma bolsa de componentes ou (b) um foco arcano',
      '(a) um pacote de estudioso ou (b) um pacote de aventureiro',
      'Um grimório',
    ],
  },
];

export default CLASSES;
