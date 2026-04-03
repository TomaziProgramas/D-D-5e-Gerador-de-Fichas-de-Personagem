import { createContext, useContext, useReducer, useCallback } from 'react';

const CharacterContext = createContext(null);

const initialCharacter = {
  // Step 1 - Basic
  name: '',
  pronouns: '',
  raceId: '',
  subraceId: '',
  classId: '',
  subclassId: '',
  level: 1,
  backgroundId: '',
  alignment: '',
  playerName: '',
  xp: 0,

  // Step 2 - Ability Scores
  abilityMethod: 'standard', // 'roll', 'pointbuy', 'standard'
  abilityScores: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
  abilityRolls: null,

  // Step 3 - Skills
  skillProficiencies: [],
  skillExpertise: [],

  // Step 4 - Combat
  currentHP: 0,
  maxHP: 0,
  tempHP: 0,
  rolledHP: false,
  equippedArmorId: null,
  equippedShieldId: null,
  deathSaves: { successes: 0, failures: 0 },

  // Step 5 - Equipment
  inventory: [],
  currency: { pp: 0, gp: 0, ep: 0, sp: 0, cp: 0 },

  // Step 6 - Features (auto-calculated)

  // Step 7 - Spells
  knownSpells: [],
  preparedSpells: [],
  usedSlots: {},

  // Step 8 - Backstory
  personalityTraits: ['', ''],
  ideals: '',
  bonds: '',
  flaws: '',
  backstory: '',
  appearance: {
    age: '',
    height: '',
    weight: '',
    eyes: '',
    skin: '',
    hair: ''
  },
  avatar: null,
  notes: '',

  // Session state
  inspiration: false,
  conditions: [],
  sessionNotes: '',
};

function characterReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };

    case 'SET_NESTED':
      return {
        ...state,
        [action.field]: { ...state[action.field], [action.key]: action.value }
      };

    case 'SET_ABILITY_SCORE':
      return {
        ...state,
        abilityScores: { ...state.abilityScores, [action.ability]: action.value }
      };

    case 'SET_ABILITY_SCORES':
      return { ...state, abilityScores: action.scores };

    case 'TOGGLE_SKILL':
      return {
        ...state,
        skillProficiencies: state.skillProficiencies.includes(action.skillId)
          ? state.skillProficiencies.filter(s => s !== action.skillId)
          : [...state.skillProficiencies, action.skillId]
      };

    case 'TOGGLE_EXPERTISE':
      return {
        ...state,
        skillExpertise: state.skillExpertise.includes(action.skillId)
          ? state.skillExpertise.filter(s => s !== action.skillId)
          : [...state.skillExpertise, action.skillId]
      };

    case 'ADD_ITEM':
      return {
        ...state,
        inventory: [...state.inventory, { ...action.item, id: Date.now().toString() }]
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        inventory: state.inventory.filter(i => i.id !== action.itemId)
      };

    case 'UPDATE_ITEM':
      return {
        ...state,
        inventory: state.inventory.map(i =>
          i.id === action.itemId ? { ...i, ...action.updates } : i
        )
      };

    case 'ADD_SPELL':
      return {
        ...state,
        knownSpells: state.knownSpells.includes(action.spellId)
          ? state.knownSpells
          : [...state.knownSpells, action.spellId]
      };

    case 'REMOVE_SPELL':
      return {
        ...state,
        knownSpells: state.knownSpells.filter(s => s !== action.spellId),
        preparedSpells: state.preparedSpells.filter(s => s !== action.spellId)
      };

    case 'TOGGLE_PREPARED':
      return {
        ...state,
        preparedSpells: state.preparedSpells.includes(action.spellId)
          ? state.preparedSpells.filter(s => s !== action.spellId)
          : [...state.preparedSpells, action.spellId]
      };

    case 'USE_SLOT':
      return {
        ...state,
        usedSlots: {
          ...state.usedSlots,
          [action.level]: (state.usedSlots[action.level] || 0) + 1
        }
      };

    case 'RESTORE_SLOT':
      return {
        ...state,
        usedSlots: {
          ...state.usedSlots,
          [action.level]: Math.max(0, (state.usedSlots[action.level] || 0) - 1)
        }
      };

    case 'RESTORE_ALL_SLOTS':
      return { ...state, usedSlots: {} };

    case 'SHORT_REST':
      return { ...state };

    case 'LONG_REST':
      return {
        ...state,
        currentHP: state.maxHP,
        usedSlots: {},
        deathSaves: { successes: 0, failures: 0 },
        tempHP: 0
      };

    case 'TOGGLE_CONDITION':
      return {
        ...state,
        conditions: state.conditions.includes(action.conditionId)
          ? state.conditions.filter(c => c !== action.conditionId)
          : [...state.conditions, action.conditionId]
      };

    case 'SET_DEATH_SAVE':
      return {
        ...state,
        deathSaves: {
          ...state.deathSaves,
          [action.saveType]: action.value
        }
      };

    case 'LOAD_CHARACTER':
      return { ...initialCharacter, ...action.character };

    case 'RESET':
      return { ...initialCharacter };

    case 'SET_PERSONALITY_TRAIT':
      const newTraits = [...state.personalityTraits];
      newTraits[action.index] = action.value;
      return { ...state, personalityTraits: newTraits };

    case 'SET_APPEARANCE':
      return {
        ...state,
        appearance: { ...state.appearance, [action.key]: action.value }
      };

    default:
      return state;
  }
}

export function CharacterProvider({ children }) {
  const [character, dispatch] = useReducer(characterReducer, initialCharacter);

  const setField = useCallback((field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  }, []);

  const setAbilityScore = useCallback((ability, value) => {
    dispatch({ type: 'SET_ABILITY_SCORE', ability, value });
  }, []);

  const toggleSkill = useCallback((skillId) => {
    dispatch({ type: 'TOGGLE_SKILL', skillId });
  }, []);

  const toggleExpertise = useCallback((skillId) => {
    dispatch({ type: 'TOGGLE_EXPERTISE', skillId });
  }, []);

  const saveCharacter = useCallback(() => {
    const characters = JSON.parse(localStorage.getItem('dnd-characters') || '[]');
    const existing = characters.findIndex(c => c.name === character.name && c.savedAt);
    const data = { ...character, savedAt: Date.now() };
    if (existing >= 0) {
      characters[existing] = data;
    } else {
      characters.push(data);
    }
    localStorage.setItem('dnd-characters', JSON.stringify(characters));
    return characters;
  }, [character]);

  const loadCharacter = useCallback((charData) => {
    dispatch({ type: 'LOAD_CHARACTER', character: charData });
  }, []);

  const getSavedCharacters = useCallback(() => {
    return JSON.parse(localStorage.getItem('dnd-characters') || '[]');
  }, []);

  const deleteCharacter = useCallback((index) => {
    const characters = JSON.parse(localStorage.getItem('dnd-characters') || '[]');
    characters.splice(index, 1);
    localStorage.setItem('dnd-characters', JSON.stringify(characters));
    return characters;
  }, []);

  const exportJSON = useCallback(() => {
    const data = JSON.stringify(character, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.name || 'personagem'}-dnd5e.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [character]);

  const importJSON = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          dispatch({ type: 'LOAD_CHARACTER', character: data });
          resolve(data);
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsText(file);
    });
  }, []);

  return (
    <CharacterContext.Provider value={{
      character,
      dispatch,
      setField,
      setAbilityScore,
      toggleSkill,
      toggleExpertise,
      saveCharacter,
      loadCharacter,
      getSavedCharacters,
      deleteCharacter,
      exportJSON,
      importJSON
    }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const ctx = useContext(CharacterContext);
  if (!ctx) throw new Error('useCharacter must be used within CharacterProvider');
  return ctx;
}
