import { useEffect } from 'react';
import { useCharacter } from '../../hooks/useCharacter';
import { CLASSES } from '../../data/classes';
import { RACES } from '../../data/races';
import { ARMORS } from '../../data/equipment';
import { getModifier, formatModifier, getProficiencyBonus, calculateHP } from '../../utils/dice';
import { calculateAC } from '../../utils/dice';
import { CONDITIONS } from '../../utils/calculations';

export default function Step4Combat() {
  const { character, setField, dispatch } = useCharacter();

  const selectedClass = CLASSES.find(c => c.id === character.classId);
  const race = RACES.find(r => r.id === character.raceId);
  const subrace = race?.subraces.find(s => s.id === character.subraceId);

  const getTotal = (ability) => {
    let racialBonus = 0;
    if (race?.abilityBonuses[ability]) racialBonus += race.abilityBonuses[ability];
    if (subrace?.abilityBonuses?.[ability]) racialBonus += subrace.abilityBonuses[ability];
    return (character.abilityScores[ability] || 10) + racialBonus;
  };

  const conMod = getModifier(getTotal('con'));
  const dexMod = getModifier(getTotal('dex'));
  const strMod = getModifier(getTotal('str'));

  const hitDie = selectedClass?.hitDie || 8;
  const maxHP = calculateHP(hitDie, conMod, character.level, character.rolledHP);
  const speed = race?.speed || 9;
  const profBonus = getProficiencyBonus(character.level);

  // Calculate AC
  const equippedArmor = ARMORS.find(a => a.id === character.equippedArmorId);
  let ac = 10 + dexMod;
  if (equippedArmor) {
    if (equippedArmor.type === 'light') ac = equippedArmor.ac + dexMod;
    else if (equippedArmor.type === 'medium') ac = equippedArmor.ac + Math.min(dexMod, 2);
    else if (equippedArmor.type === 'heavy') ac = equippedArmor.ac;
  } else if (character.classId === 'barbaro') {
    ac = 10 + dexMod + getModifier(getTotal('con'));
  } else if (character.classId === 'monge') {
    ac = 10 + dexMod + getModifier(getTotal('wis'));
  }
  if (character.equippedShieldId) ac += 2;

  useEffect(() => {
    if (character.maxHP === 0) {
      setField('maxHP', maxHP);
      setField('currentHP', maxHP);
    }
  }, []);

  const handleRollHP = () => {
    let total = hitDie + conMod;
    for (let i = 1; i < character.level; i++) {
      const roll = Math.floor(Math.random() * hitDie) + 1;
      total += Math.max(1, roll + conMod);
    }
    total = Math.max(character.level, total);
    setField('maxHP', total);
    setField('currentHP', total);
  };

  const currentMax = character.maxHP || maxHP;
  const hpPercent = currentMax > 0 ? (character.currentHP / currentMax) * 100 : 100;
  const hpBarClass = hpPercent <= 25 ? 'danger' : hpPercent <= 50 ? 'warning' : '';

  return (
    <div className="animate-fadeIn">
      <div className="step-title">
        <span className="step-icon">&#9876;</span>
        Saúde e Combate
      </div>

      <div className="grid-4" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="stat-block">
          <div className="stat-label">Classe de Armadura</div>
          <div className="stat-value">{ac}</div>
          <div className="stat-modifier">CA</div>
        </div>
        <div className="stat-block">
          <div className="stat-label">Iniciativa</div>
          <div className="stat-value">{formatModifier(dexMod)}</div>
          <div className="stat-modifier">DES</div>
        </div>
        <div className="stat-block">
          <div className="stat-label">Deslocamento</div>
          <div className="stat-value">{speed}m</div>
          <div className="stat-modifier">base</div>
        </div>
        <div className="stat-block">
          <div className="stat-label">Dados de Vida</div>
          <div className="stat-value">{character.level}d{hitDie}</div>
          <div className="stat-modifier">total</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="card-header">Pontos de Vida</div>

        <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
          <div className="stat-block" style={{ flex: '0 0 auto', minWidth: 120 }}>
            <div className="stat-label">PV Máximo</div>
            <input
              type="number"
              className="input"
              style={{ width: 80, textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-highlight)', background: 'transparent', border: 'none', padding: 0 }}
              value={character.maxHP}
              min={1}
              onChange={e => {
                const val = Math.max(1, parseInt(e.target.value) || 1);
                setField('maxHP', val);
                if (character.currentHP > val) setField('currentHP', val);
              }}
            />
            <button
              className="btn btn-small btn-primary"
              style={{ marginTop: 'var(--space-xs)', fontSize: '0.75rem', width: '100%' }}
              onClick={handleRollHP}
              title={`Rola ${character.level}d${hitDie} + mod. CON por nível`}
            >
              Rolar PV
            </button>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
              <label className="label" style={{ margin: 0 }}>PV Atual:</label>
              <input
                type="number"
                className="input"
                style={{ width: 80, textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}
                value={character.currentHP}
                onChange={e => setField('currentHP', Math.max(0, Math.min(currentMax, parseInt(e.target.value) || 0)))}
              />
              <span style={{ color: 'var(--text-muted)' }}>/ {currentMax}</span>
            </div>

            <div className="hp-bar-container">
              <div className={`hp-bar ${hpBarClass}`} style={{ width: `${hpPercent}%` }}></div>
              <span className="hp-bar-text">{character.currentHP} / {currentMax}</span>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
              <button className="btn btn-small" onClick={() => setField('currentHP', Math.max(0, character.currentHP - 1))}>-1</button>
              <button className="btn btn-small" onClick={() => setField('currentHP', Math.max(0, character.currentHP - 5))}>-5</button>
              <button className="btn btn-small" onClick={() => setField('currentHP', Math.min(currentMax, character.currentHP + 1))}>+1</button>
              <button className="btn btn-small" onClick={() => setField('currentHP', Math.min(currentMax, character.currentHP + 5))}>+5</button>
              <button className="btn btn-small" onClick={() => setField('currentHP', currentMax)}>Max</button>
            </div>
          </div>
        </div>

        <div className="form-row" style={{ alignItems: 'center' }}>
          <div className="form-group">
            <label className="label">PV Temporários</label>
            <input
              type="number"
              className="input"
              style={{ width: 80 }}
              value={character.tempHP}
              onChange={e => setField('tempHP', Math.max(0, parseInt(e.target.value) || 0))}
            />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="card-header">Armadura Equipada</div>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Armadura</label>
            <select
              className="select"
              value={character.equippedArmorId || ''}
              onChange={e => setField('equippedArmorId', e.target.value || null)}
            >
              <option value="">Sem armadura</option>
              {ARMORS.filter(a => a.type !== 'shield').map(armor => (
                <option key={armor.id} value={armor.id}>{armor.name} (CA {armor.ac})</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="label">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={!!character.equippedShieldId}
                  onChange={e => setField('equippedShieldId', e.target.checked ? 'escudo' : null)}
                />
                Escudo (+2 CA)
              </label>
            </label>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="card">
          <div className="card-header">Testes Contra a Morte</div>
          <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
            <div>
              <span className="label">Sucessos</span>
              <div className="death-saves">
                {[0, 1, 2].map(i => (
                  <div
                    key={`s${i}`}
                    className={`death-save-dot ${i < character.deathSaves.successes ? 'success' : ''}`}
                    onClick={() => dispatch({
                      type: 'SET_DEATH_SAVE',
                      saveType: 'successes',
                      value: i < character.deathSaves.successes ? i : i + 1
                    })}
                  />
                ))}
              </div>
            </div>
            <div>
              <span className="label">Fracassos</span>
              <div className="death-saves">
                {[0, 1, 2].map(i => (
                  <div
                    key={`f${i}`}
                    className={`death-save-dot ${i < character.deathSaves.failures ? 'failure' : ''}`}
                    onClick={() => dispatch({
                      type: 'SET_DEATH_SAVE',
                      saveType: 'failures',
                      value: i < character.deathSaves.failures ? i : i + 1
                    })}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Bônus de Ataque</div>
          <div className="grid-2">
            <div>
              <span className="label">Corpo a Corpo</span>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--gold)' }}>
                {formatModifier(strMod + profBonus)}
              </div>
            </div>
            <div>
              <span className="label">À Distância</span>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--gold)' }}>
                {formatModifier(dexMod + profBonus)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="card-header">Condições</div>
        <div className="conditions-grid">
          {CONDITIONS.map(condition => (
            <div
              key={condition.id}
              className={`condition-tag ${character.conditions.includes(condition.id) ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'TOGGLE_CONDITION', conditionId: condition.id })}
            >
              {condition.icon} {condition.name}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center' }}>
        <button className="btn" onClick={() => { /* Short rest logic */ }}>
          Descanso Curto
        </button>
        <button className="btn btn-primary" onClick={() => dispatch({ type: 'LONG_REST' })}>
          Descanso Longo
        </button>
      </div>
    </div>
  );
}
