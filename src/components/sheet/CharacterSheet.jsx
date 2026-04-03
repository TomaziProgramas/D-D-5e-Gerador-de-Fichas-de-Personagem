import { useCharacter } from '../../hooks/useCharacter';
import { RACES } from '../../data/races';
import { CLASSES } from '../../data/classes';
import { BACKGROUNDS } from '../../data/backgrounds';
import { SKILLS, ABILITIES } from '../../data/skills';
import { SPELLS } from '../../data/spells';
import { ARMORS } from '../../data/equipment';
import { getModifier, formatModifier, getProficiencyBonus, calculateHP } from '../../utils/dice';
import { calculateSkillBonus, calculateSpellSaveDC, calculateSpellAttackBonus, calculatePassivePerception, CONDITIONS } from '../../utils/calculations';

export default function CharacterSheet() {
  const { character, dispatch, setField } = useCharacter();

  const race = RACES.find(r => r.id === character.raceId);
  const subrace = race?.subraces.find(s => s.id === character.subraceId);
  const cls = CLASSES.find(c => c.id === character.classId);
  const bg = BACKGROUNDS.find(b => b.id === character.backgroundId);

  const getTotal = (ability) => {
    let bonus = 0;
    if (race?.abilityBonuses[ability]) bonus += race.abilityBonuses[ability];
    if (subrace?.abilityBonuses?.[ability]) bonus += subrace.abilityBonuses[ability];
    return (character.abilityScores[ability] || 10) + bonus;
  };

  const profBonus = getProficiencyBonus(character.level);
  const bgSkills = bg?.skillProficiencies || [];

  const isSkillProf = (id) => bgSkills.includes(id) || character.skillProficiencies.includes(id);

  const equippedArmor = ARMORS.find(a => a.id === character.equippedArmorId);
  const dexMod = getModifier(getTotal('dex'));
  let ac = 10 + dexMod;
  if (equippedArmor) {
    if (equippedArmor.type === 'light') ac = equippedArmor.ac + dexMod;
    else if (equippedArmor.type === 'medium') ac = equippedArmor.ac + Math.min(dexMod, 2);
    else if (equippedArmor.type === 'heavy') ac = equippedArmor.ac;
  } else if (character.classId === 'barbaro') ac = 10 + dexMod + getModifier(getTotal('con'));
  else if (character.classId === 'monge') ac = 10 + dexMod + getModifier(getTotal('wis'));
  if (character.equippedShieldId) ac += 2;

  const maxHP = character.maxHP || calculateHP(cls?.hitDie || 8, getModifier(getTotal('con')), character.level, false);
  const hpPercent = maxHP > 0 ? (character.currentHP / maxHP) * 100 : 100;

  const passivePerception = calculatePassivePerception(getTotal('wis'), isSkillProf('percepcao'), character.level);

  return (
    <div className="character-sheet animate-fadeIn" id="character-sheet">
      {/* Sidebar */}
      <div className="sheet-sidebar">
        {/* Avatar */}
        {character.avatar && (
          <div className="card" style={{ padding: 'var(--space-sm)', textAlign: 'center' }}>
            <img src={character.avatar} alt={character.name} style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
          </div>
        )}

        {/* Ability Scores */}
        <div className="card">
          {ABILITIES.map(ability => {
            const total = getTotal(ability.id);
            const mod = getModifier(total);
            return (
              <div key={ability.id} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ flex: '0 0 70px' }}>
                  <div className="stat-label" style={{ marginTop: 0 }}>{ability.abbr}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 900, flex: '0 0 40px', textAlign: 'center' }}>
                  {total}
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold)', flex: '0 0 40px', textAlign: 'center' }}>
                  {formatModifier(mod)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Saving Throws */}
        <div className="card">
          <div className="card-header" style={{ fontSize: '0.9rem' }}>Testes de Resistência</div>
          {ABILITIES.map(ability => {
            const prof = cls?.savingThrows?.includes(ability.id);
            const mod = getModifier(getTotal(ability.id));
            const bonus = prof ? mod + profBonus : mod;
            return (
              <div key={ability.id} className="skill-row" style={{ padding: '3px 0' }}>
                <input type="checkbox" checked={prof || false} readOnly style={{ accentColor: 'var(--gold)', width: 14, height: 14 }} />
                <span className="skill-bonus" style={{ fontSize: '0.85rem' }}>{formatModifier(bonus)}</span>
                <span className="skill-name" style={{ fontSize: '0.85rem' }}>{ability.name}</span>
              </div>
            );
          })}
        </div>

        {/* Skills */}
        <div className="card">
          <div className="card-header" style={{ fontSize: '0.9rem' }}>Perícias</div>
          {SKILLS.map(skill => {
            const prof = isSkillProf(skill.id);
            const expertise = character.skillExpertise.includes(skill.id);
            const bonus = calculateSkillBonus(getTotal(skill.ability), prof, expertise, character.level);
            const abilityAbbr = ABILITIES.find(a => a.id === skill.ability)?.abbr;
            return (
              <div key={skill.id} className="skill-row" style={{ padding: '2px 0' }}>
                <input type="checkbox" checked={prof} readOnly style={{ accentColor: 'var(--gold)', width: 14, height: 14 }} />
                <span className="skill-bonus" style={{ fontSize: '0.8rem' }}>{formatModifier(bonus)}</span>
                <span className="skill-name" style={{ fontSize: '0.8rem' }}>{skill.name}</span>
                <span className="skill-ability-tag" style={{ fontSize: '0.6rem' }}>({abilityAbbr})</span>
                {expertise && <span style={{ color: 'var(--gold)', fontSize: '0.6rem' }}>x2</span>}
              </div>
            );
          })}
          <div style={{ marginTop: 'var(--space-sm)', padding: 'var(--space-xs)', borderTop: '1px solid var(--border)' }}>
            <span className="label" style={{ margin: 0 }}>Sabedoria Passiva (Percepção): {passivePerception}</span>
          </div>
        </div>

        {/* Proficiencies */}
        <div className="card">
          <div className="card-header" style={{ fontSize: '0.9rem' }}>Idiomas e Proficiências</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {race && <p><strong>Idiomas:</strong> {race.languages.join(', ')}</p>}
            {cls?.armorProficiencies?.length > 0 && (
              <p><strong>Armaduras:</strong> {cls.armorProficiencies.join(', ')}</p>
            )}
            {cls?.weaponProficiencies?.length > 0 && (
              <p><strong>Armas:</strong> {cls.weaponProficiencies.join(', ')}</p>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="sheet-main">
        {/* Header */}
        <div className="sheet-header">
          <div style={{ flex: 1 }}>
            <div className="sheet-name">{character.name || 'Sem Nome'}</div>
            <div className="sheet-info">
              {cls?.name || '—'} Nv. {character.level}
              {' — '}{race?.name || '—'}{subrace ? ` (${subrace.name})` : ''}
              {' — '}{bg?.name || '—'}
            </div>
            <div className="sheet-info" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {character.alignment}{character.playerName ? ` — Jogador: ${character.playerName}` : ''}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
            <button
              className={`btn ${character.inspiration ? 'btn-primary' : ''}`}
              onClick={() => setField('inspiration', !character.inspiration)}
            >
              {character.inspiration ? '★' : '☆'} Inspiração
            </button>
          </div>
        </div>

        {/* Combat stats */}
        <div className="grid-4">
          <div className="stat-block">
            <div className="stat-label">Classe de Armadura</div>
            <div className="stat-value">{ac}</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Iniciativa</div>
            <div className="stat-value">{formatModifier(dexMod)}</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Deslocamento</div>
            <div className="stat-value">{race?.speed || 9}m</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Bônus Prof.</div>
            <div className="stat-value">+{profBonus}</div>
          </div>
        </div>

        {/* HP */}
        <div className="card">
          <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
                <span className="label" style={{ margin: 0 }}>Pontos de Vida</span>
                <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold)' }}>
                  {character.currentHP} / {maxHP}
                  {character.tempHP > 0 && <span style={{ color: 'var(--blue-light)' }}> (+{character.tempHP} temp)</span>}
                </span>
              </div>
              <div className="hp-bar-container">
                <div className={`hp-bar ${hpPercent <= 25 ? 'danger' : hpPercent <= 50 ? 'warning' : ''}`} style={{ width: `${hpPercent}%` }} />
                <span className="hp-bar-text">{character.currentHP} / {maxHP}</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-xs)', marginTop: 'var(--space-sm)', justifyContent: 'center' }}>
                <button className="btn btn-small" onClick={() => setField('currentHP', Math.max(0, character.currentHP - 1))}>-1</button>
                <button className="btn btn-small" onClick={() => setField('currentHP', Math.max(0, character.currentHP - 5))}>-5</button>
                <button className="btn btn-small" onClick={() => setField('currentHP', Math.min(maxHP, character.currentHP + 1))}>+1</button>
                <button className="btn btn-small" onClick={() => setField('currentHP', Math.min(maxHP, character.currentHP + 5))}>+5</button>
                <button className="btn btn-small" onClick={() => dispatch({ type: 'LONG_REST' })}>Descanso Longo</button>
              </div>
            </div>
            <div>
              <div className="label">Dados de Vida</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-highlight)', textAlign: 'center' }}>
                {character.level}d{cls?.hitDie || 8}
              </div>
            </div>
          </div>

          {/* Death Saves */}
          <div style={{ display: 'flex', gap: 'var(--space-lg)', marginTop: 'var(--space-md)', justifyContent: 'center' }}>
            <div>
              <span className="label" style={{ fontSize: '0.7rem' }}>Sucesso</span>
              <div className="death-saves">
                {[0, 1, 2].map(i => (
                  <div key={`s${i}`} className={`death-save-dot ${i < character.deathSaves.successes ? 'success' : ''}`}
                    onClick={() => dispatch({ type: 'SET_DEATH_SAVE', saveType: 'successes', value: i < character.deathSaves.successes ? i : i + 1 })} />
                ))}
              </div>
            </div>
            <div>
              <span className="label" style={{ fontSize: '0.7rem' }}>Fracasso</span>
              <div className="death-saves">
                {[0, 1, 2].map(i => (
                  <div key={`f${i}`} className={`death-save-dot ${i < character.deathSaves.failures ? 'failure' : ''}`}
                    onClick={() => dispatch({ type: 'SET_DEATH_SAVE', saveType: 'failures', value: i < character.deathSaves.failures ? i : i + 1 })} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Conditions */}
        {character.conditions.length > 0 && (
          <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
            {character.conditions.map(id => {
              const cond = CONDITIONS.find(c => c.id === id);
              return cond ? (
                <span key={id} className="badge badge-red" style={{ cursor: 'pointer' }} onClick={() => dispatch({ type: 'TOGGLE_CONDITION', conditionId: id })}>
                  {cond.icon} {cond.name} ✕
                </span>
              ) : null;
            })}
          </div>
        )}

        {/* Attacks */}
        {character.inventory.filter(i => i.type === 'arma').length > 0 && (
          <div className="card">
            <div className="card-header" style={{ fontSize: '0.9rem' }}>Ataques e Magias</div>
            <table className="inventory-table">
              <thead>
                <tr><th>Nome</th><th>Bônus</th><th>Dano / Tipo</th></tr>
              </thead>
              <tbody>
                {character.inventory.filter(i => i.type === 'arma').map(item => (
                  <tr key={item.id}>
                    <td style={{ color: 'var(--text-highlight)' }}>{item.name}</td>
                    <td style={{ color: 'var(--gold)' }}>{item.attackBonus}</td>
                    <td>{item.damage} {item.damageType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Spell Slots */}
        {cls?.spellcasting && (
          <div className="card">
            <div className="card-header" style={{ fontSize: '0.9rem' }}>
              <span>Magia — CD {calculateSpellSaveDC(getTotal(cls.spellcasting.ability), character.level)} | Ataque {formatModifier(calculateSpellAttackBonus(getTotal(cls.spellcasting.ability), character.level))}</span>
            </div>
            {/* Spell slots */}
            {cls.spellcasting.spellSlots?.[character.level - 1]?.some(s => s > 0) && (
              <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginBottom: 'var(--space-sm)' }}>
                {cls.spellcasting.spellSlots[character.level - 1].map((slots, i) => {
                  if (slots === 0) return null;
                  const level = i + 1;
                  const used = character.usedSlots[level] || 0;
                  return (
                    <div key={level} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Nv.{level}</div>
                      <div className="spell-slots">
                        {Array.from({ length: slots }, (_, j) => (
                          <div key={j} className={`spell-slot ${j < used ? 'used' : ''}`}
                            onClick={() => j < used ? dispatch({ type: 'RESTORE_SLOT', level }) : dispatch({ type: 'USE_SLOT', level })} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* Known spells */}
            <div style={{ fontSize: '0.85rem' }}>
              {character.knownSpells.map(id => SPELLS.find(s => s.id === id)).filter(Boolean).map(spell => (
                <span key={spell.id} className="badge" style={{ margin: 2, background: spell.level === 0 ? 'var(--blue)' : 'var(--gold-dark)' }}>
                  {spell.name} {spell.level > 0 ? `(${spell.level})` : ''}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Equipment */}
        {character.inventory.length > 0 && (
          <div className="card">
            <div className="card-header" style={{ fontSize: '0.9rem' }}>Equipamento</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {character.inventory.filter(i => i.type !== 'arma').map(item => (
                <span key={item.id} style={{ marginRight: 'var(--space-sm)' }}>
                  {item.name}{item.quantity > 1 ? ` (×${item.quantity})` : ''}
                  {item.id !== character.inventory[character.inventory.length - 1]?.id && ', '}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Personality */}
        <div className="grid-2">
          <div className="card">
            <div className="card-header" style={{ fontSize: '0.9rem' }}>Traços de Personalidade</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {character.personalityTraits.filter(Boolean).join(' | ') || '—'}
            </p>
          </div>
          <div className="card">
            <div className="card-header" style={{ fontSize: '0.9rem' }}>Ideais / Ligações / Defeitos</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>Ideais:</strong> {character.ideals || '—'}<br />
              <strong>Ligações:</strong> {character.bonds || '—'}<br />
              <strong>Defeitos:</strong> {character.flaws || '—'}
            </p>
          </div>
        </div>

        {/* Features */}
        {cls && (
          <div className="card">
            <div className="card-header" style={{ fontSize: '0.9rem' }}>Características e Habilidades</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {cls.features.filter(f => f.level <= character.level).map((f, i) => (
                <span key={i} className="badge" style={{ margin: 2 }}>{f.name}</span>
              ))}
            </div>
          </div>
        )}

        {/* Backstory */}
        {character.backstory && (
          <div className="card">
            <div className="card-header" style={{ fontSize: '0.9rem' }}>História</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{character.backstory}</p>
          </div>
        )}

        {/* Session Notes */}
        <div className="card">
          <div className="card-header" style={{ fontSize: '0.9rem' }}>Notas de Sessão</div>
          <textarea
            className="textarea"
            value={character.sessionNotes}
            onChange={e => setField('sessionNotes', e.target.value)}
            placeholder="Anotações rápidas durante a sessão..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
