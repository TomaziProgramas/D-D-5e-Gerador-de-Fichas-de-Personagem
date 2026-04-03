// Dice rolling utilities for D&D 5e

export function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

export function rollDice(count, sides) {
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push(rollDie(sides));
  }
  return results;
}

export function roll4d6DropLowest() {
  const rolls = rollDice(4, 6);
  const sorted = [...rolls].sort((a, b) => a - b);
  const dropped = sorted[0];
  const kept = sorted.slice(1);
  const total = kept.reduce((sum, v) => sum + v, 0);
  return { rolls, dropped, kept, total };
}

export function rollAbilityScores() {
  const scores = [];
  for (let i = 0; i < 6; i++) {
    scores.push(roll4d6DropLowest());
  }
  return scores;
}

export function getModifier(score) {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod) {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function getProficiencyBonus(level) {
  if (level <= 4) return 2;
  if (level <= 8) return 3;
  if (level <= 12) return 4;
  if (level <= 16) return 5;
  return 6;
}

// Point Buy costs
export const POINT_BUY_COSTS = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
};

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

export const POINT_BUY_TOTAL = 27;

// Roll with advantage/disadvantage
export function rollD20WithAdvantage() {
  const roll1 = rollDie(20);
  const roll2 = rollDie(20);
  const result = Math.max(roll1, roll2);
  return { roll1, roll2, result, total: result, type: 'advantage' };
}

export function rollD20WithDisadvantage() {
  const roll1 = rollDie(20);
  const roll2 = rollDie(20);
  const result = Math.min(roll1, roll2);
  return { roll1, roll2, result, total: result, type: 'disadvantage' };
}

// Parse dice notation like "2d6+3"
export function parseDiceNotation(notation) {
  const match = notation.match(/^(\d+)d(\d+)([+-]\d+)?$/);
  if (!match) return null;
  return {
    count: parseInt(match[1]),
    sides: parseInt(match[2]),
    modifier: match[3] ? parseInt(match[3]) : 0
  };
}

export function rollFromNotation(notation) {
  const parsed = parseDiceNotation(notation);
  if (!parsed) return null;
  const rolls = rollDice(parsed.count, parsed.sides);
  const subtotal = rolls.reduce((sum, v) => sum + v, 0);
  const total = subtotal + parsed.modifier;
  return { rolls, subtotal, modifier: parsed.modifier, total, notation };
}

// Calculate HP
export function calculateHP(hitDie, conModifier, level, rollHP = false) {
  if (level === 1) {
    return hitDie + conModifier;
  }

  const firstLevelHP = hitDie + conModifier;
  let additionalHP = 0;

  if (rollHP) {
    for (let i = 1; i < level; i++) {
      const roll = rollDie(hitDie);
      additionalHP += Math.max(1, roll + conModifier);
    }
  } else {
    const averageRoll = Math.floor(hitDie / 2) + 1;
    additionalHP = (level - 1) * (averageRoll + conModifier);
  }

  return Math.max(level, firstLevelHP + additionalHP);
}

// Calculate AC
export function calculateAC(armor, dexModifier, shield = false, unarmoredBonus = 0) {
  let ac = 10 + dexModifier;

  if (armor) {
    if (armor.type === 'light') {
      ac = armor.ac + dexModifier;
    } else if (armor.type === 'medium') {
      ac = armor.ac + Math.min(dexModifier, 2);
    } else if (armor.type === 'heavy') {
      ac = armor.ac;
    }
  } else if (unarmoredBonus > 0) {
    ac = 10 + dexModifier + unarmoredBonus;
  }

  if (shield) ac += 2;

  return ac;
}

// Dice history
let rollHistory = [];

export function addToHistory(roll) {
  rollHistory.unshift({
    ...roll,
    timestamp: Date.now(),
    id: Math.random().toString(36).slice(2, 11)
  });
  if (rollHistory.length > 20) {
    rollHistory = rollHistory.slice(0, 20);
  }
  return [...rollHistory];
}

export function getRollHistory() {
  return [...rollHistory];
}

export function clearRollHistory() {
  rollHistory = [];
  return [];
}
