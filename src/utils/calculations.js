// D&D 5e calculation utilities
import { getModifier, getProficiencyBonus } from './dice';

export function calculateSkillBonus(abilityScore, proficient, expertise, level) {
  const mod = getModifier(abilityScore);
  const profBonus = getProficiencyBonus(level);

  if (expertise) return mod + (profBonus * 2);
  if (proficient) return mod + profBonus;
  return mod;
}

export function calculatePassivePerception(wisdomScore, proficient, level) {
  return 10 + calculateSkillBonus(wisdomScore, proficient, false, level);
}

export function calculateSpellSaveDC(abilityScore, level) {
  return 8 + getModifier(abilityScore) + getProficiencyBonus(level);
}

export function calculateSpellAttackBonus(abilityScore, level) {
  return getModifier(abilityScore) + getProficiencyBonus(level);
}

export function calculateAttackBonus(abilityScore, level, proficient = true) {
  const mod = getModifier(abilityScore);
  return proficient ? mod + getProficiencyBonus(level) : mod;
}

export function calculateCarryingCapacity(strengthScore) {
  return strengthScore * 15;
}

export function getSpeedByRace(raceId) {
  const speeds = {
    'humano': 9,
    'elfo': 9,
    'anao': 7.5,
    'halfling': 7.5,
    'draconato': 9,
    'gnomo': 7.5,
    'meio-elfo': 9,
    'meio-orc': 9,
    'tiefling': 9
  };
  return speeds[raceId] || 9;
}

export function getHitDieByClass(classId) {
  const hitDice = {
    'barbaro': 12,
    'bardo': 8,
    'clerigo': 8,
    'druida': 8,
    'guerreiro': 10,
    'monge': 8,
    'paladino': 10,
    'ranger': 10,
    'ladino': 8,
    'feiticeiro': 6,
    'bruxo': 8,
    'mago': 6
  };
  return hitDice[classId] || 8;
}

// Experience points thresholds by level
export const XP_BY_LEVEL = [
  0, 0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000,
  85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
];

export function getLevelFromXP(xp) {
  for (let i = 20; i >= 1; i--) {
    if (xp >= XP_BY_LEVEL[i]) return i;
  }
  return 1;
}

// Conditions in PT-BR
export const CONDITIONS = [
  { id: 'blinded', name: 'Cego', icon: '👁️' },
  { id: 'charmed', name: 'Enfeitiçado', icon: '💫' },
  { id: 'deafened', name: 'Surdo', icon: '🔇' },
  { id: 'frightened', name: 'Amedrontado', icon: '😨' },
  { id: 'grappled', name: 'Agarrado', icon: '🤝' },
  { id: 'incapacitated', name: 'Incapacitado', icon: '💤' },
  { id: 'invisible', name: 'Invisível', icon: '👻' },
  { id: 'paralyzed', name: 'Paralisado', icon: '⚡' },
  { id: 'petrified', name: 'Petrificado', icon: '🪨' },
  { id: 'poisoned', name: 'Envenenado', icon: '🧪' },
  { id: 'prone', name: 'Caído', icon: '⬇️' },
  { id: 'restrained', name: 'Impedido', icon: '⛓️' },
  { id: 'stunned', name: 'Atordoado', icon: '💫' },
  { id: 'unconscious', name: 'Inconsciente', icon: '😵' },
  { id: 'exhaustion', name: 'Exaustão', icon: '😩' }
];
