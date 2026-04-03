import { useCharacter } from '../../hooks/useCharacter';
import { BACKGROUNDS } from '../../data/backgrounds';

export default function Step8Backstory() {
  const { character, dispatch, setField } = useCharacter();

  const selectedBackground = BACKGROUNDS.find(b => b.id === character.backgroundId);

  return (
    <div className="animate-fadeIn">
      <div className="step-title">
        <span className="step-icon">&#128214;</span>
        Traços e Backstory
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="card">
          <div className="card-header">Traços de Personalidade</div>
          <div className="form-group">
            <label className="label">Traço 1</label>
            <textarea
              className="textarea"
              value={character.personalityTraits[0]}
              onChange={e => dispatch({ type: 'SET_PERSONALITY_TRAIT', index: 0, value: e.target.value })}
              placeholder="Primeiro traço de personalidade..."
              rows={2}
            />
          </div>
          <div className="form-group">
            <label className="label">Traço 2</label>
            <textarea
              className="textarea"
              value={character.personalityTraits[1]}
              onChange={e => dispatch({ type: 'SET_PERSONALITY_TRAIT', index: 1, value: e.target.value })}
              placeholder="Segundo traço de personalidade..."
              rows={2}
            />
          </div>

          {selectedBackground && selectedBackground.personalityTraits.length > 0 && (
            <div style={{ marginTop: 'var(--space-sm)' }}>
              <span className="label">Sugestões ({selectedBackground.name})</span>
              <div style={{ maxHeight: 150, overflowY: 'auto' }}>
                {selectedBackground.personalityTraits.map((trait, i) => (
                  <div
                    key={i}
                    className="spell-card"
                    style={{ fontSize: '0.8rem', cursor: 'pointer' }}
                    onClick={() => {
                      const idx = character.personalityTraits[0] ? 1 : 0;
                      dispatch({ type: 'SET_PERSONALITY_TRAIT', index: idx, value: trait });
                    }}
                  >
                    {trait}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <div className="form-group">
            <label className="label">Ideais</label>
            <textarea
              className="textarea"
              value={character.ideals}
              onChange={e => setField('ideals', e.target.value)}
              placeholder="O que guia suas ações..."
              rows={2}
            />
            {selectedBackground?.ideals && (
              <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap', marginTop: 'var(--space-xs)' }}>
                {selectedBackground.ideals.map((ideal, i) => (
                  <span key={i} className="badge" style={{ cursor: 'pointer' }} onClick={() => setField('ideals', ideal)}>{ideal}</span>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="label">Ligações</label>
            <textarea
              className="textarea"
              value={character.bonds}
              onChange={e => setField('bonds', e.target.value)}
              placeholder="Conexões com o mundo..."
              rows={2}
            />
          </div>

          <div className="form-group">
            <label className="label">Defeitos</label>
            <textarea
              className="textarea"
              value={character.flaws}
              onChange={e => setField('flaws', e.target.value)}
              placeholder="Fraquezas e vícios..."
              rows={2}
            />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="card-header">Aparência Física</div>
        <div className="grid-3">
          {[
            { key: 'age', label: 'Idade' },
            { key: 'height', label: 'Altura' },
            { key: 'weight', label: 'Peso' },
            { key: 'eyes', label: 'Cor dos Olhos' },
            { key: 'skin', label: 'Pele' },
            { key: 'hair', label: 'Cabelos' },
          ].map(field => (
            <div key={field.key} className="form-group">
              <label className="label">{field.label}</label>
              <input
                className="input"
                value={character.appearance[field.key]}
                onChange={e => dispatch({ type: 'SET_APPEARANCE', key: field.key, value: e.target.value })}
                placeholder={field.label}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="card-header">Avatar / Imagem</div>
        <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center' }}>
          {character.avatar && (
            <img
              src={character.avatar}
              alt="Avatar"
              style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '2px solid var(--border)' }}
            />
          )}
          <div>
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              style={{ display: 'none' }}
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => setField('avatar', ev.target.result);
                  reader.readAsDataURL(file);
                }
              }}
            />
            <label htmlFor="avatar-upload" className="btn btn-primary" style={{ cursor: 'pointer' }}>
              {character.avatar ? 'Trocar Imagem' : 'Enviar Imagem'}
            </label>
            {character.avatar && (
              <button className="btn btn-small" style={{ marginLeft: 'var(--space-sm)' }} onClick={() => setField('avatar', null)}>
                Remover
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="card-header">História do Personagem</div>
        <textarea
          className="textarea"
          value={character.backstory}
          onChange={e => setField('backstory', e.target.value)}
          placeholder="Conte a história do seu personagem... De onde ele vem? O que o motiva? Quais eventos marcaram sua vida?"
          rows={8}
        />
      </div>

      <div className="card">
        <div className="card-header">Notas de Sessão</div>
        <textarea
          className="textarea"
          value={character.sessionNotes}
          onChange={e => setField('sessionNotes', e.target.value)}
          placeholder="Anotações durante a sessão..."
          rows={5}
        />
      </div>
    </div>
  );
}
