import { useState, useCallback, useRef } from 'react';
import { rollDice, rollD20WithAdvantage, rollD20WithDisadvantage, roll4d6DropLowest, rollFromNotation, addToHistory, getRollHistory, clearRollHistory } from '../../utils/dice';

const DICE_TYPES = [
  { sides: 4,   label: 'd4'   },
  { sides: 6,   label: 'd6'   },
  { sides: 8,   label: 'd8'   },
  { sides: 10,  label: 'd10'  },
  { sides: 12,  label: 'd12'  },
  { sides: 100, label: 'd100' },
];

function D20Die({ value, isRolling, isEmpty, onClick }) {
  return (
    <div
      className={`d20-wrapper ${isRolling ? 'd20-rolling' : ''} ${!isEmpty && !isRolling ? 'd20-revealed' : ''}`}
      onClick={onClick}
      title="Clique para rolar 1d20"
    >
      <svg
        className="d20-svg"
        viewBox="0 0 100 110"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Dado D20"
      >
        <defs>
          <filter id="d20glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sombra externa */}
        <polygon
          points="50,6 96,32 96,78 50,104 4,78 4,32"
          fill="rgba(0,0,0,0.35)"
          transform="translate(2,3)"
        />

        {/* Face principal do D20 (hexágono achatado) */}
        <polygon
          points="50,6 96,32 96,78 50,104 4,78 4,32"
          fill="rgba(26,20,16,0.92)"
          stroke="var(--gold, #c9a84c)"
          strokeWidth="2.5"
          filter="url(#d20glow)"
        />

        {/* Facetas internas — parecem as arestas do icosaedro */}
        <line x1="50" y1="6"  x2="4"  y2="32" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.3" />
        <line x1="50" y1="6"  x2="96" y2="32" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.3" />
        <line x1="50" y1="6"  x2="50" y2="55" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.3" />
        <line x1="4"  y1="32" x2="96" y2="32" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.3" />
        <line x1="4"  y1="78" x2="50" y2="55" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.3" />
        <line x1="96" y1="78" x2="50" y2="55" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.3" />
        <line x1="4"  y1="32" x2="50" y2="55" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.3" />
        <line x1="96" y1="32" x2="50" y2="55" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.3" />
        <line x1="4"  y1="78" x2="96" y2="78" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.3" />
        <line x1="50" y1="104" x2="50" y2="55" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.3" />

        {/* Valor exibido */}
        {isEmpty ? (
          <>
            <text
              x="50" y="52"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--gold, #c9a84c)"
              fontSize="22"
              fontWeight="bold"
              fontFamily="Cinzel, Georgia, serif"
              opacity="0.9"
            >
              D20
            </text>
            <text
              x="50" y="70"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--text-muted, #7a6e5a)"
              fontSize="8"
              fontFamily="sans-serif"
            >
              clique para rolar
            </text>
          </>
        ) : (
          <text
            x="50" y="57"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={value === 20 ? '#ffe066' : value === 1 ? '#e05050' : 'var(--gold, #c9a84c)'}
            fontSize={value >= 10 ? '34' : '38'}
            fontWeight="bold"
            fontFamily="Cinzel, Georgia, serif"
          >
            {value}
          </text>
        )}
      </svg>

      {/* Rótulo especial para crítico/falha */}
      {!isEmpty && !isRolling && value === 20 && (
        <div className="d20-label d20-crit">Crítico!</div>
      )}
      {!isEmpty && !isRolling && value === 1 && (
        <div className="d20-label d20-fail">Falha Crítica</div>
      )}
    </div>
  );
}

export default function DiceRoller({ onRoll, compact = false }) {
  const [result, setResult] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState(getRollHistory());
  const [diceCount, setDiceCount] = useState(1);
  const [customNotation, setCustomNotation] = useState('');
  const [flashValue, setFlashValue] = useState(null);
  const rollTimeoutRef = useRef(null);

  const animateRoll = useCallback((rollFn, label) => {
    setRolling(true);
    setResult(null);
    if (rollTimeoutRef.current) clearTimeout(rollTimeoutRef.current);

    let flashes = 0;
    const maxFlashes = 10;
    const flashInterval = setInterval(() => {
      setFlashValue(Math.floor(Math.random() * 20) + 1);
      flashes++;
      if (flashes >= maxFlashes) {
        clearInterval(flashInterval);
        const rollResult = rollFn();
        setFlashValue(null);
        setResult({ ...rollResult, flashing: false });
        setRolling(false);
        const newHistory = addToHistory({ ...rollResult, label });
        setHistory(newHistory);
        if (onRoll) onRoll(rollResult);
      }
    }, 75);
  }, [onRoll]);

  const handleRollD20 = useCallback(() => {
    animateRoll(() => {
      const rolls = rollDice(diceCount, 20);
      const total = rolls.reduce((s, v) => s + v, 0);
      return { rolls, total, type: `${diceCount}d20` };
    }, `${diceCount}d20`);
  }, [diceCount, animateRoll]);

  const handleRollDice = useCallback((sides) => {
    animateRoll(() => {
      const rolls = rollDice(diceCount, sides);
      const total = rolls.reduce((s, v) => s + v, 0);
      return { rolls, total, type: `${diceCount}d${sides}` };
    }, `${diceCount}d${sides}`);
  }, [diceCount, animateRoll]);

  const handleAdvantage = useCallback(() => {
    animateRoll(() => rollD20WithAdvantage(), 'Vantagem');
  }, [animateRoll]);

  const handleDisadvantage = useCallback(() => {
    animateRoll(() => rollD20WithDisadvantage(), 'Desvantagem');
  }, [animateRoll]);

  const handle4d6Drop = useCallback(() => {
    animateRoll(() => roll4d6DropLowest(), '4d6 (desc. menor)');
  }, [animateRoll]);

  const handleCustomRoll = useCallback(() => {
    if (!customNotation.trim()) return;
    animateRoll(() => {
      const r = rollFromNotation(customNotation.trim());
      if (!r) return { total: 0, rolls: [], type: customNotation };
      return r;
    }, customNotation);
  }, [customNotation, animateRoll]);

  const handleClearHistory = useCallback(() => {
    clearRollHistory();
    setHistory([]);
  }, []);

  const displayValue = rolling ? flashValue : result?.total ?? null;
  const isEmpty = displayValue === null;

  if (compact) {
    return (
      <div className="dice-tray" style={{ padding: 'var(--space-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-sm)' }}>
          <D20Die
            value={displayValue}
            isRolling={rolling}
            isEmpty={isEmpty}
            onClick={handleRollD20}
          />
        </div>
        <div className="dice-buttons">
          {DICE_TYPES.map(d => (
            <button
              key={d.sides}
              className="dice-btn"
              style={{ width: 44, height: 44, fontSize: '0.75rem' }}
              onClick={() => handleRollDice(d.sides)}
              disabled={rolling}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dice-tray">
      <div className="card-header" style={{ justifyContent: 'center', borderBottom: 'none', marginBottom: 0 }}>
        Rolar Dados
      </div>

      {/* D20 principal */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: 'var(--space-md) 0' }}>
        <D20Die
          value={displayValue}
          isRolling={rolling}
          isEmpty={isEmpty}
          onClick={handleRollD20}
        />
      </div>

      {/* Resultado de vantagem/desvantagem */}
      {result && !rolling && result.type === 'advantage' && (
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-sm)', fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}>
          d20: {result.roll1} e {result.roll2} → <strong style={{ color: 'var(--gold)' }}>{result.result}</strong> (Vantagem)
        </div>
      )}
      {result && !rolling && result.type === 'disadvantage' && (
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-sm)', fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)' }}>
          d20: {result.roll1} e {result.roll2} → <strong style={{ color: 'var(--red-light)' }}>{result.result}</strong> (Desvantagem)
        </div>
      )}

      {/* Dados individuais (quando rolar múltiplos) */}
      {result && !rolling && result.rolls && result.rolls.length > 1 && (
        <div className="dice-individual" style={{ marginBottom: 'var(--space-sm)' }}>
          {result.rolls.map((v, i) => (
            <div key={i} className="die">{v}</div>
          ))}
        </div>
      )}

      <hr className="separator" style={{ margin: 'var(--space-sm) 0' }} />

      {/* Quantidade */}
      <div style={{ marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-sm)' }}>
        <label className="label" style={{ margin: 0 }}>Quantidade:</label>
        <div className="point-buy-counter">
          <button className="point-buy-btn" onClick={() => setDiceCount(Math.max(1, diceCount - 1))}>-</button>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', minWidth: 30, textAlign: 'center' }}>{diceCount}</span>
          <button className="point-buy-btn" onClick={() => setDiceCount(Math.min(20, diceCount + 1))}>+</button>
        </div>
      </div>

      {/* Outros dados */}
      <div className="dice-buttons">
        {DICE_TYPES.map(d => (
          <button
            key={d.sides}
            className="dice-btn"
            onClick={() => handleRollDice(d.sides)}
            disabled={rolling}
          >
            {d.label}
          </button>
        ))}
      </div>

      <hr className="separator" />

      {/* Botões especiais */}
      <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn" onClick={handleAdvantage} disabled={rolling}>Vantagem</button>
        <button className="btn" onClick={handleDisadvantage} disabled={rolling}>Desvantagem</button>
        <button className="btn" onClick={handle4d6Drop} disabled={rolling}>4d6 (desc. menor)</button>
      </div>

      {/* Notação customizada */}
      <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center' }}>
        <input
          className="input"
          style={{ maxWidth: 150 }}
          placeholder="Ex: 2d6+3"
          value={customNotation}
          onChange={e => setCustomNotation(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCustomRoll()}
        />
        <button className="btn btn-primary" onClick={handleCustomRoll} disabled={rolling}>Rolar</button>
      </div>

      {/* Histórico */}
      {history.length > 0 && (
        <>
          <hr className="separator" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
            <span className="label" style={{ margin: 0 }}>Histórico</span>
            <button className="btn btn-small" onClick={handleClearHistory}>Limpar</button>
          </div>
          <div className="roll-history">
            {history.map((entry, i) => (
              <div key={entry.id || i} className="roll-entry">
                <span style={{ color: 'var(--text-muted)' }}>{entry.label || entry.type}</span>
                <span style={{ color: 'var(--gold)', fontWeight: 'bold' }}>{entry.total}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
