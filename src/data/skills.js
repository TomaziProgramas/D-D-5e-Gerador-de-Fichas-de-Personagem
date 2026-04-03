export const SKILLS = [
  { id: 'acrobacia', name: 'Acrobacia', ability: 'dex' },
  { id: 'arcanismo', name: 'Arcanismo', ability: 'int' },
  { id: 'atletismo', name: 'Atletismo', ability: 'str' },
  { id: 'atuacao', name: 'Atuação', ability: 'cha' },
  { id: 'blefar', name: 'Blefar', ability: 'cha' },
  { id: 'furtividade', name: 'Furtividade', ability: 'dex' },
  { id: 'historia', name: 'História', ability: 'int' },
  { id: 'intimidacao', name: 'Intimidação', ability: 'cha' },
  { id: 'intuicao', name: 'Intuição', ability: 'wis' },
  { id: 'investigacao', name: 'Investigação', ability: 'int' },
  { id: 'lidar-com-animais', name: 'Lidar com Animais', ability: 'wis' },
  { id: 'medicina', name: 'Medicina', ability: 'wis' },
  { id: 'natureza', name: 'Natureza', ability: 'int' },
  { id: 'percepcao', name: 'Percepção', ability: 'wis' },
  { id: 'persuasao', name: 'Persuasão', ability: 'cha' },
  { id: 'prestidigitacao', name: 'Prestidigitação', ability: 'dex' },
  { id: 'religiao', name: 'Religião', ability: 'int' },
  { id: 'sobrevivencia', name: 'Sobrevivência', ability: 'wis' },
];

export const ABILITIES = [
  { id: 'str', name: 'Força', abbr: 'FOR' },
  { id: 'dex', name: 'Destreza', abbr: 'DES' },
  { id: 'con', name: 'Constituição', abbr: 'CON' },
  { id: 'int', name: 'Inteligência', abbr: 'INT' },
  { id: 'wis', name: 'Sabedoria', abbr: 'SAB' },
  { id: 'cha', name: 'Carisma', abbr: 'CAR' },
];

export const ALIGNMENTS = [
  ['Leal e Bom', 'Neutro e Bom', 'Caótico e Bom'],
  ['Leal e Neutro', 'Neutro', 'Caótico e Neutro'],
  ['Leal e Mau', 'Neutro e Mau', 'Caótico e Mau'],
];

// Index 0 is unused; levels 1-20
export const PROFICIENCY_BONUS = [
  0,  // index 0 (placeholder)
  2, 2, 2, 2,       // levels 1-4
  3, 3, 3, 3,       // levels 5-8
  4, 4, 4, 4,       // levels 9-12
  5, 5, 5, 5,       // levels 13-16
  6, 6, 6, 6,       // levels 17-20
];
