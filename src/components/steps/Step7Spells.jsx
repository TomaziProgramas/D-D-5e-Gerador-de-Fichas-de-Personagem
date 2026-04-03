import { useState, useMemo } from 'react';
import { useCharacter } from '../../hooks/useCharacter';
import { CLASSES } from '../../data/classes';
import { SPELLS } from '../../data/spells';
import { RACES } from '../../data/races';
import { getModifier, formatModifier, getProficiencyBonus } from '../../utils/dice';
import { calculateSpellSaveDC, calculateSpellAttackBonus } from '../../utils/calculations';

const SPELL_SCHOOLS = ['Abjuração', 'Conjuração', 'Adivinhação', 'Encantamento', 'Evocação', 'Ilusão', 'Necromancia', 'Transmutação'];

export default function Step7Spells() {
  const { character, dispatch } = useCharacter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterSchool, setFilterSchool] = useState('all');
  const [showSpellList, setShowSpellList] = useState(false);

  const selectedClass = CLASSES.find(c => c.id === character.classId);
  const spellcasting = selectedClass?.spellcasting;

  const race = RACES.find(r => r.id === character.raceId);
  const subrace = race?.subraces.find(s => s.id === character.subraceId);
  const getTotal = (ability) => {
    let racialBonus = 0;
    if (race?.abilityBonuses[ability]) racialBonus += race.abilityBonuses[ability];
    if (subrace?.abilityBonuses?.[ability]) racialBonus += subrace.abilityBonuses[ability];
    return (character.abilityScores[ability] || 10) + racialBonus;
  };

  if (!spellcasting) {
    return (
      <div className="animate-fadeIn">
        <div className="step-title">
          <span className="step-icon">&#10024;</span>
          Magia
        </div>
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            {selectedClass ? `${selectedClass.name} não possui conjuração.` : 'Selecione uma classe para ver as magias.'}
          </p>
        </div>
      </div>
    );
  }

  const spellAbility = spellcasting.ability;
  const spellAbilityScore = getTotal(spellAbility);
  const spellSaveDC = calculateSpellSaveDC(spellAbilityScore, character.level);
  const spellAttackBonus = calculateSpellAttackBonus(spellAbilityScore, character.level);

  const levelIndex = character.level - 1;
  const cantripsKnown = spellcasting.cantripsKnown?.[levelIndex] || 0;
  const spellSlots = spellcasting.spellSlots?.[levelIndex] || [];

  const availableSpells = useMemo(() => {
    return SPELLS.filter(spell => {
      if (!spell.classes?.includes(character.classId)) return false;
      if (searchTerm && !spell.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (filterLevel !== 'all' && spell.level !== parseInt(filterLevel)) return false;
      if (filterSchool !== 'all' && spell.school !== filterSchool) return false;
      return true;
    }).sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
  }, [character.classId, searchTerm, filterLevel, filterSchool]);

  const knownSpellObjects = character.knownSpells
    .map(id => SPELLS.find(s => s.id === id))
    .filter(Boolean);

  const cantrips = knownSpellObjects.filter(s => s.level === 0);
  const spellsByLevel = {};
  knownSpellObjects.filter(s => s.level > 0).forEach(spell => {
    if (!spellsByLevel[spell.level]) spellsByLevel[spell.level] = [];
    spellsByLevel[spell.level].push(spell);
  });

  return (
    <div className="animate-fadeIn">
      <div className="step-title">
        <span className="step-icon">&#10024;</span>
        Magia
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="stat-block">
          <div className="stat-label">Habilidade Chave</div>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>
            {{ int: 'INT', wis: 'SAB', cha: 'CAR' }[spellAbility]}
          </div>
        </div>
        <div className="stat-block">
          <div className="stat-label">CD do Teste de Resistência</div>
          <div className="stat-value">{spellSaveDC}</div>
        </div>
        <div className="stat-block">
          <div className="stat-label">Bônus de Ataque</div>
          <div className="stat-value">{formatModifier(spellAttackBonus)}</div>
        </div>
      </div>

      {spellSlots.length > 0 && (
        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="card-header">Espaços de Magia</div>
          <div className="grid-3" style={{ gap: 'var(--space-lg)' }}>
            {spellSlots.map((slots, i) => {
              if (slots === 0) return null;
              const level = i + 1;
              const used = character.usedSlots[level] || 0;
              return (
                <div key={level} style={{ textAlign: 'center' }}>
                  <div className="label">Nível {level}</div>
                  <div className="spell-slots">
                    {Array.from({ length: slots }, (_, j) => (
                      <div
                        key={j}
                        className={`spell-slot ${j < used ? 'used' : ''}`}
                        onClick={() => {
                          if (j < used) {
                            dispatch({ type: 'RESTORE_SLOT', level });
                          } else {
                            dispatch({ type: 'USE_SLOT', level });
                          }
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {used}/{slots}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-md)' }}>
            <button className="btn btn-small" onClick={() => dispatch({ type: 'RESTORE_ALL_SLOTS' })}>
              Restaurar Todos os Espaços
            </button>
          </div>
        </div>
      )}

      {cantrips.length > 0 && (
        <div className="card" style={{ marginBottom: 'var(--space-md)' }}>
          <div className="card-header">Truques ({cantrips.length}/{cantripsKnown})</div>
          {cantrips.map(spell => (
            <SpellEntry key={spell.id} spell={spell} character={character} dispatch={dispatch} />
          ))}
        </div>
      )}

      {Object.entries(spellsByLevel).map(([level, spells]) => (
        <div key={level} className="card" style={{ marginBottom: 'var(--space-md)' }}>
          <div className="card-header">Magias de Nível {level}</div>
          {spells.map(spell => (
            <SpellEntry
              key={spell.id}
              spell={spell}
              character={character}
              dispatch={dispatch}
              isPrepared={character.preparedSpells.includes(spell.id)}
            />
          ))}
        </div>
      ))}

      <hr className="separator" />

      <div className="card">
        <div className="card-header">
          <span>Adicionar Magias</span>
          <button className="btn btn-small" onClick={() => setShowSpellList(!showSpellList)}>
            {showSpellList ? 'Ocultar' : 'Mostrar Lista'}
          </button>
        </div>

        {showSpellList && (
          <>
            <div className="form-row" style={{ marginBottom: 'var(--space-md)' }}>
              <input
                className="input"
                placeholder="Buscar magia..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <select className="select" style={{ flex: '0 0 120px' }} value={filterLevel} onChange={e => setFilterLevel(e.target.value)}>
                <option value="all">Todos os Níveis</option>
                <option value="0">Truques</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(l => (
                  <option key={l} value={l}>Nível {l}</option>
                ))}
              </select>
              <select className="select" style={{ flex: '0 0 150px' }} value={filterSchool} onChange={e => setFilterSchool(e.target.value)}>
                <option value="all">Todas as Escolas</option>
                {SPELL_SCHOOLS.map(school => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </div>

            <div style={{ maxHeight: 400, overflowY: 'auto' }}>
              {availableSpells.map(spell => {
                const isKnown = character.knownSpells.includes(spell.id);
                return (
                  <div
                    key={spell.id}
                    className="spell-card"
                    style={{ opacity: isKnown ? 0.5 : 1 }}
                    onClick={() => {
                      if (isKnown) {
                        dispatch({ type: 'REMOVE_SPELL', spellId: spell.id });
                      } else {
                        dispatch({ type: 'ADD_SPELL', spellId: spell.id });
                      }
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span className="spell-name">{spell.name}</span>
                        {isKnown && <span className="badge badge-green" style={{ marginLeft: 'var(--space-sm)' }}>Conhecido</span>}
                      </div>
                      <div className="spell-meta">
                        {spell.level === 0 ? 'Truque' : `Nível ${spell.level}`} — {spell.school}
                        {spell.concentration && ' — Concentração'}
                        {spell.ritual && ' — Ritual'}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      {spell.castingTime} | {spell.range} | {spell.duration}
                    </div>
                  </div>
                );
              })}
              {availableSpells.length === 0 && (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--space-lg)' }}>
                  Nenhuma magia encontrada.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SpellEntry({ spell, character, dispatch, isPrepared }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="spell-card" onClick={() => setExpanded(!expanded)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          {spell.level > 0 && (
            <input
              type="checkbox"
              checked={isPrepared || false}
              onChange={e => { e.stopPropagation(); dispatch({ type: 'TOGGLE_PREPARED', spellId: spell.id }); }}
              title="Preparada"
              style={{ accentColor: 'var(--gold)' }}
            />
          )}
          <span className="spell-name">{spell.name}</span>
          {spell.concentration && <span className="badge badge-blue" style={{ fontSize: '0.6rem' }}>C</span>}
          {spell.ritual && <span className="badge" style={{ fontSize: '0.6rem' }}>R</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <span className="spell-meta">{spell.school}</span>
          <button
            className="btn-icon"
            onClick={e => { e.stopPropagation(); dispatch({ type: 'REMOVE_SPELL', spellId: spell.id }); }}
            title="Remover"
          >
            &#10005;
          </button>
        </div>
      </div>
      {expanded && (
        <div style={{ marginTop: 'var(--space-sm)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <div><strong>Tempo:</strong> {spell.castingTime} | <strong>Alcance:</strong> {spell.range}</div>
          <div><strong>Componentes:</strong> {spell.components} | <strong>Duração:</strong> {spell.duration}</div>
          <p style={{ marginTop: 'var(--space-xs)' }}>{spell.description}</p>
        </div>
      )}
    </div>
  );
}
