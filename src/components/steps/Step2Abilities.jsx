import { useState, useCallback } from 'react';
import { useCharacter } from '../../hooks/useCharacter';
import { ABILITIES } from '../../data/skills';
import { RACES } from '../../data/races';
import { getModifier, formatModifier, getProficiencyBonus, rollAbilityScores, POINT_BUY_COSTS, STANDARD_ARRAY, POINT_BUY_TOTAL } from '../../utils/dice';

export default function Step2Abilities() {
  const { character, setField, dispatch } = useCharacter();
  const [rolledScores, setRolledScores] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [standardAssignment, setStandardAssignment] = useState({});

  const race = RACES.find(r => r.id === character.raceId);
  const subrace = race?.subraces.find(s => s.id === character.subraceId);

  const getRacialBonus = (abilityId) => {
    let bonus = 0;
    if (race?.abilityBonuses[abilityId]) bonus += race.abilityBonuses[abilityId];
    if (subrace?.abilityBonuses?.[abilityId]) bonus += subrace.abilityBonuses[abilityId];
    return bonus;
  };

  const getTotalScore = (abilityId) => {
    return (character.abilityScores[abilityId] || 10) + getRacialBonus(abilityId);
  };

  const getPointBuySpent = () => {
    return Object.values(character.abilityScores).reduce((total, val) => {
      return total + (POINT_BUY_COSTS[val] || 0);
    }, 0);
  };

  const handleRollScores = useCallback(() => {
    setRolling(true);
    setTimeout(() => {
      const scores = rollAbilityScores();
      setRolledScores(scores);
      setRolling(false);
    }, 500);
  }, []);

  const assignRolledScore = useCallback((abilityId, scoreIndex) => {
    if (!rolledScores) return;
    const newScores = { ...character.abilityScores };
    // Remove any previous assignment of this index
    Object.entries(newScores).forEach(([key, val]) => {
      const prevIndex = rolledScores.findIndex(r => r.total === val);
    });
    newScores[abilityId] = rolledScores[scoreIndex].total;
    dispatch({ type: 'SET_ABILITY_SCORES', scores: newScores });
  }, [rolledScores, character.abilityScores, dispatch]);

  const handlePointBuyChange = useCallback((abilityId, delta) => {
    const current = character.abilityScores[abilityId];
    const newVal = current + delta;
    if (newVal < 8 || newVal > 15) return;

    const testScores = { ...character.abilityScores, [abilityId]: newVal };
    const newSpent = Object.values(testScores).reduce((total, val) => total + (POINT_BUY_COSTS[val] || 0), 0);
    if (newSpent > POINT_BUY_TOTAL) return;

    dispatch({ type: 'SET_ABILITY_SCORE', ability: abilityId, value: newVal });
  }, [character.abilityScores, dispatch]);

  const handleStandardAssign = useCallback((abilityId, value) => {
    const newAssignment = { ...standardAssignment };
    // Remove previous assignment of this value
    Object.entries(newAssignment).forEach(([key, val]) => {
      if (val === value) delete newAssignment[key];
    });
    newAssignment[abilityId] = value;
    setStandardAssignment(newAssignment);

    const newScores = { ...character.abilityScores };
    // Reset all to 8 first
    ABILITIES.forEach(a => { newScores[a.id] = 8; });
    // Assign selected values
    Object.entries(newAssignment).forEach(([key, val]) => {
      newScores[key] = val;
    });
    dispatch({ type: 'SET_ABILITY_SCORES', scores: newScores });
  }, [standardAssignment, character.abilityScores, dispatch]);

  const getAvailableStandardValues = (currentAbility) => {
    const used = Object.entries(standardAssignment)
      .filter(([key]) => key !== currentAbility)
      .map(([, val]) => val);
    return STANDARD_ARRAY.filter(v => !used.includes(v));
  };

  return (
    <div className="animate-fadeIn">
      <div className="step-title">
        <span className="step-icon">&#9733;</span>
        Atributos
      </div>

      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <label className="label">Método de Geração</label>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          {[
            { id: 'standard', label: 'Array Padrão' },
            { id: 'pointbuy', label: 'Compra de Pontos' },
            { id: 'roll', label: 'Rolagem de Dados' },
          ].map(method => (
            <button
              key={method.id}
              className={`btn ${character.abilityMethod === method.id ? 'btn-primary' : ''}`}
              onClick={() => {
                setField('abilityMethod', method.id);
                if (method.id === 'pointbuy') {
                  dispatch({ type: 'SET_ABILITY_SCORES', scores: { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 } });
                }
              }}
            >
              {method.label}
            </button>
          ))}
        </div>
      </div>

      {character.abilityMethod === 'roll' && (
        <div className="card" style={{ marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
          <button
            className="btn btn-primary"
            onClick={handleRollScores}
            disabled={rolling}
            style={{ marginBottom: 'var(--space-md)' }}
          >
            {rolling ? 'Rolando...' : 'Rolar 4d6 (descartar menor)'}
          </button>
          {rolledScores && (
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              {rolledScores.map((score, i) => (
                <div key={i} className="card" style={{ padding: 'var(--space-sm)', minWidth: 80, textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--gold)' }}>
                    {score.total}
                  </div>
                  <div className="dice-individual" style={{ marginTop: 'var(--space-xs)' }}>
                    {score.rolls.map((r, j) => (
                      <span key={j} className={`die ${r === score.dropped ? 'dropped' : ''}`} style={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {rolledScores && (
            <p style={{ marginTop: 'var(--space-sm)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Use os seletores abaixo para atribuir cada valor a um atributo
            </p>
          )}
        </div>
      )}

      {character.abilityMethod === 'pointbuy' && (
        <div className="card" style={{ marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: getPointBuySpent() > POINT_BUY_TOTAL ? 'var(--red-light)' : 'var(--gold)' }}>
            Pontos: {getPointBuySpent()} / {POINT_BUY_TOTAL}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 'var(--space-xs)' }}>
            Valores de 8 a 15 — Custo progressivo
          </div>
        </div>
      )}

      <div className="card" style={{ marginBottom: 'var(--space-md)', textAlign: 'center', padding: 'var(--space-sm)' }}>
        <span className="badge" style={{ fontSize: '0.85rem' }}>
          Bônus de Proficiência: +{getProficiencyBonus(character.level)}
        </span>
      </div>

      <div className="ability-scores-grid">
        {ABILITIES.map(ability => {
          const baseScore = character.abilityScores[ability.id];
          const racialBonus = getRacialBonus(ability.id);
          const totalScore = baseScore + racialBonus;
          const mod = getModifier(totalScore);

          return (
            <div key={ability.id} className="ability-score-block">
              <div className="ability-name">{ability.name}</div>

              {character.abilityMethod === 'pointbuy' ? (
                <div className="point-buy-counter" style={{ marginBottom: 'var(--space-xs)' }}>
                  <button
                    className="point-buy-btn"
                    onClick={() => handlePointBuyChange(ability.id, -1)}
                    disabled={baseScore <= 8}
                  >−</button>
                  <span className="ability-value" style={{ minWidth: 40 }}>{baseScore}</span>
                  <button
                    className="point-buy-btn"
                    onClick={() => handlePointBuyChange(ability.id, 1)}
                    disabled={baseScore >= 15}
                  >+</button>
                </div>
              ) : character.abilityMethod === 'standard' ? (
                <select
                  className="select"
                  style={{ marginBottom: 'var(--space-xs)', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
                  value={standardAssignment[ability.id] || ''}
                  onChange={e => handleStandardAssign(ability.id, parseInt(e.target.value))}
                >
                  <option value="">—</option>
                  {getAvailableStandardValues(ability.id).map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                  {standardAssignment[ability.id] && (
                    <option value={standardAssignment[ability.id]}>{standardAssignment[ability.id]}</option>
                  )}
                </select>
              ) : character.abilityMethod === 'roll' && rolledScores ? (
                <select
                  className="select"
                  style={{ marginBottom: 'var(--space-xs)', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
                  value={baseScore}
                  onChange={e => dispatch({ type: 'SET_ABILITY_SCORE', ability: ability.id, value: parseInt(e.target.value) })}
                >
                  <option value="10">—</option>
                  {rolledScores.map((s, i) => (
                    <option key={i} value={s.total}>{s.total}</option>
                  ))}
                </select>
              ) : (
                <div className="ability-value">{baseScore}</div>
              )}

              <div className="ability-value" style={{ fontSize: '1.5rem', color: 'var(--text-highlight)' }}>
                {totalScore}
              </div>

              <div className="ability-modifier">
                {formatModifier(mod)}
              </div>

              {racialBonus !== 0 && (
                <div className="ability-racial-bonus">
                  +{racialBonus} racial
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
