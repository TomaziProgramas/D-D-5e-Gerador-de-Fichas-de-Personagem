import { useCharacter } from '../../hooks/useCharacter';
import { CLASSES } from '../../data/classes';
import { RACES } from '../../data/races';

export default function Step6Features() {
  const { character } = useCharacter();

  const selectedClass = CLASSES.find(c => c.id === character.classId);
  const race = RACES.find(r => r.id === character.raceId);
  const subrace = race?.subraces.find(s => s.id === character.subraceId);

  const classFeatures = selectedClass?.features || [];
  const activeFeatures = classFeatures.filter(f => f.level <= character.level);
  const lockedFeatures = classFeatures.filter(f => f.level > character.level);

  return (
    <div className="animate-fadeIn">
      <div className="step-title">
        <span className="step-icon">&#9733;</span>
        Habilidades de Classe e Raça
      </div>

      {race && (
        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="card-header">Traços Raciais — {race.name}{subrace ? ` (${subrace.name})` : ''}</div>
          {race.traits.map((trait, i) => (
            <div key={i} className="feature-card">
              <div className="feature-name">{trait.name}</div>
              <div className="feature-desc">{trait.description}</div>
            </div>
          ))}
          {subrace?.traits?.map((trait, i) => (
            <div key={`sub-${i}`} className="feature-card">
              <div className="feature-name">{trait.name} <span className="badge" style={{ fontSize: '0.65rem' }}>{subrace.name}</span></div>
              <div className="feature-desc">{trait.description}</div>
            </div>
          ))}
        </div>
      )}

      {selectedClass && (
        <>
          <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
            <div className="card-header">
              Habilidades de Classe — {selectedClass.name}
              <span className="badge">Nível {character.level}</span>
            </div>
            {activeFeatures.map((feature, i) => (
              <div key={i} className="feature-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="feature-name">{feature.name}</div>
                  <span className="feature-level">Nv. {feature.level}</span>
                </div>
                <div className="feature-desc">{feature.description}</div>
              </div>
            ))}
          </div>

          {lockedFeatures.length > 0 && (
            <div className="card">
              <div className="card-header" style={{ color: 'var(--text-muted)' }}>
                Habilidades Futuras
              </div>
              {lockedFeatures.slice(0, 10).map((feature, i) => (
                <div key={i} className="feature-card locked">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="feature-name" style={{ color: 'var(--text-muted)' }}>{feature.name}</div>
                    <span className="feature-level">Nv. {feature.level}</span>
                  </div>
                  <div className="feature-desc">{feature.description}</div>
                </div>
              ))}
              {lockedFeatures.length > 10 && (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--space-sm)', fontSize: '0.85rem' }}>
                  ... e mais {lockedFeatures.length - 10} habilidades
                </p>
              )}
            </div>
          )}
        </>
      )}

      {!selectedClass && !race && (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
          <p style={{ color: 'var(--text-muted)' }}>Selecione uma raça e classe no Passo 1 para ver as habilidades.</p>
        </div>
      )}
    </div>
  );
}
