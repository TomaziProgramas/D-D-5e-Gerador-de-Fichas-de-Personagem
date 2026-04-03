import { useCharacter } from '../../hooks/useCharacter';
import { RACES } from '../../data/races';
import { CLASSES } from '../../data/classes';
import { BACKGROUNDS } from '../../data/backgrounds';
import { ALIGNMENTS } from '../../data/skills';

export default function Step1Basic() {
  const { character, setField } = useCharacter();

  const selectedRace = RACES.find(r => r.id === character.raceId);
  const selectedClass = CLASSES.find(c => c.id === character.classId);

  return (
    <div className="animate-fadeIn">
      <div className="step-title">
        <span className="step-icon">&#9876;</span>
        Conceito Básico
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="label">Nome do Personagem</label>
          <input
            className="input"
            value={character.name}
            onChange={e => setField('name', e.target.value)}
            placeholder="Ex: Bliip Arcanolodo"
          />
        </div>
        <div className="form-group">
          <label className="label">Nome do Jogador</label>
          <input
            className="input"
            value={character.playerName}
            onChange={e => setField('playerName', e.target.value)}
            placeholder="Seu nome"
          />
        </div>
        <div className="form-group">
          <label className="label">Pronomes / Gênero</label>
          <input
            className="input"
            value={character.pronouns}
            onChange={e => setField('pronouns', e.target.value)}
            placeholder="Ex: ele/dele, ela/dela"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="label">Raça</label>
          <select
            className="select"
            value={character.raceId}
            onChange={e => {
              setField('raceId', e.target.value);
              setField('subraceId', '');
            }}
          >
            <option value="">Selecione uma raça...</option>
            {RACES.map(race => (
              <option key={race.id} value={race.id}>{race.name}</option>
            ))}
          </select>
        </div>

        {selectedRace && selectedRace.subraces.length > 0 && (
          <div className="form-group">
            <label className="label">Sub-raça</label>
            <select
              className="select"
              value={character.subraceId}
              onChange={e => setField('subraceId', e.target.value)}
            >
              <option value="">Selecione uma sub-raça...</option>
              {selectedRace.subraces.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="label">Classe</label>
          <select
            className="select"
            value={character.classId}
            onChange={e => {
              setField('classId', e.target.value);
              setField('subclassId', '');
            }}
          >
            <option value="">Selecione uma classe...</option>
            {CLASSES.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
        </div>

        {selectedClass && character.level >= selectedClass.subclassLevel && (
          <div className="form-group">
            <label className="label">Sub-classe (Nível {selectedClass.subclassLevel}+)</label>
            <select
              className="select"
              value={character.subclassId}
              onChange={e => setField('subclassId', e.target.value)}
            >
              <option value="">Selecione uma sub-classe...</option>
              {selectedClass.subclasses.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label className="label">Nível</label>
          <select
            className="select"
            value={character.level}
            onChange={e => setField('level', parseInt(e.target.value))}
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map(lvl => (
              <option key={lvl} value={lvl}>Nível {lvl}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="label">Antecedente</label>
          <select
            className="select"
            value={character.backgroundId}
            onChange={e => setField('backgroundId', e.target.value)}
          >
            <option value="">Selecione um antecedente...</option>
            {BACKGROUNDS.map(bg => (
              <option key={bg.id} value={bg.id}>{bg.name}</option>
            ))}
          </select>
        </div>
      </div>

      {character.backgroundId && (
        <div className="card" style={{ marginBottom: 'var(--space-md)' }}>
          <div className="card-header">
            {BACKGROUNDS.find(b => b.id === character.backgroundId)?.feature.name}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {BACKGROUNDS.find(b => b.id === character.backgroundId)?.feature.description}
          </p>
          <div style={{ marginTop: 'var(--space-sm)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Perícias: {BACKGROUNDS.find(b => b.id === character.backgroundId)?.skillProficiencies.join(', ')}
          </div>
        </div>
      )}

      <div className="form-group">
        <label className="label">Alinhamento</label>
        <div className="alignment-grid">
          {ALIGNMENTS.flat().map(alignment => (
            <div
              key={alignment}
              className={`alignment-cell ${character.alignment === alignment ? 'selected' : ''}`}
              onClick={() => setField('alignment', alignment)}
            >
              {alignment}
            </div>
          ))}
        </div>
      </div>

      {selectedRace && (
        <div className="card" style={{ marginTop: 'var(--space-md)' }}>
          <div className="card-header">Traços Raciais — {selectedRace.name}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
            <span className="badge">Deslocamento: {selectedRace.speed}m</span>
            <span className="badge">Tamanho: {selectedRace.size}</span>
            {selectedRace.darkvision > 0 && <span className="badge">Visão no Escuro: {selectedRace.darkvision}m</span>}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <strong>Idiomas:</strong> {selectedRace.languages.join(', ')}
          </div>
          {selectedRace.traits.map((trait, i) => (
            <div key={i} style={{ marginTop: 'var(--space-sm)' }}>
              <strong style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>{trait.name}:</strong>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginLeft: 'var(--space-xs)' }}>
                {trait.description}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
