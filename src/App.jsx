import { useState, useCallback, useRef } from 'react';
import { CharacterProvider, useCharacter } from './hooks/useCharacter';
import Step1Basic from './components/steps/Step1Basic';
import Step2Abilities from './components/steps/Step2Abilities';
import Step3Skills from './components/steps/Step3Skills';
import Step4Combat from './components/steps/Step4Combat';
import Step5Equipment from './components/steps/Step5Equipment';
import Step6Features from './components/steps/Step6Features';
import Step7Spells from './components/steps/Step7Spells';
import Step8Backstory from './components/steps/Step8Backstory';
import CharacterSheet from './components/sheet/CharacterSheet';
import DiceRoller from './components/dice/DiceRoller';
import './styles/theme.css';
import './styles/app.css';

const WIZARD_STEPS = [
  { label: 'Conceito', icon: '1' },
  { label: 'Atributos', icon: '2' },
  { label: 'Perícias', icon: '3' },
  { label: 'Combate', icon: '4' },
  { label: 'Equipamento', icon: '5' },
  { label: 'Habilidades', icon: '6' },
  { label: 'Magia', icon: '7' },
  { label: 'Backstory', icon: '8' },
];

const THEMES = [
  { id: 'dark', label: 'Grimório Sombrio', className: 'dark' },
  { id: 'parchment', label: 'Pergaminho', className: 'parchment' },
  { id: 'elven', label: 'Cristal Élfico', className: 'elven' },
];

function AppContent() {
  const [view, setView] = useState('create'); // 'create', 'sheet', 'dice', 'characters'
  const [currentStep, setCurrentStep] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [showDicePanel, setShowDicePanel] = useState(false);
  const { character, saveCharacter, loadCharacter, getSavedCharacters, deleteCharacter, exportJSON, importJSON, dispatch } = useCharacter();
  const [savedChars, setSavedChars] = useState([]);
  const fileInputRef = useRef(null);

  const handleThemeChange = useCallback((themeId) => {
    setTheme(themeId);
    if (themeId === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
    }
  }, []);

  const handleSave = useCallback(() => {
    saveCharacter();
    setSavedChars(getSavedCharacters());
  }, [saveCharacter, getSavedCharacters]);

  const handleViewCharacters = useCallback(() => {
    setSavedChars(getSavedCharacters());
    setView('characters');
  }, [getSavedCharacters]);

  const handleExportPDF = useCallback(async () => {
    const el = document.getElementById('character-sheet');
    if (!el) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      const canvas = await html2canvas(el, { backgroundColor: '#1a1410', scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${character.name || 'personagem'}-dnd5e.pdf`);
    } catch (err) {
      console.error('Erro ao exportar PDF:', err);
    }
  }, [character.name]);

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <Step1Basic />;
      case 1: return <Step2Abilities />;
      case 2: return <Step3Skills />;
      case 3: return <Step4Combat />;
      case 4: return <Step5Equipment />;
      case 5: return <Step6Features />;
      case 6: return <Step7Spells />;
      case 7: return <Step8Backstory />;
      default: return <Step1Basic />;
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">Dungeons &amp; Dragons</h1>
        <p className="app-subtitle">Gerador de Fichas — 5ª Edição</p>
      </header>

      {/* Theme selector */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)', alignItems: 'center' }}>
        <span className="label" style={{ margin: 0 }}>Tema:</span>
        <div className="theme-selector">
          {THEMES.map(t => (
            <div
              key={t.id}
              className={`theme-option ${t.className} ${theme === t.id ? 'active' : ''}`}
              onClick={() => handleThemeChange(t.id)}
              title={t.label}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="app-nav no-print">
        <button className={`nav-btn ${view === 'create' ? 'active' : ''}`} onClick={() => setView('create')}>
          Criar Personagem
        </button>
        <button className={`nav-btn ${view === 'sheet' ? 'active' : ''}`} onClick={() => setView('sheet')}>
          Ver Ficha
        </button>
        <button className={`nav-btn ${view === 'dice' ? 'active' : ''}`} onClick={() => setView('dice')}>
          Rolar Dados
        </button>
        <button className={`nav-btn ${view === 'characters' ? 'active' : ''}`} onClick={handleViewCharacters}>
          Meus Personagens
        </button>
        <span style={{ width: 1, background: 'var(--border)', margin: '0 var(--space-xs)' }} />
        <button className="btn btn-primary btn-small" onClick={handleSave}>
          Salvar
        </button>
        <button className="btn btn-small" onClick={exportJSON}>
          Exportar JSON
        </button>
        {view === 'sheet' && (
          <button className="btn btn-small" onClick={handleExportPDF}>
            Exportar PDF
          </button>
        )}
        <button className="btn btn-small" onClick={() => fileInputRef.current?.click()}>
          Importar
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".json"
          onChange={async e => {
            const file = e.target.files[0];
            if (file) {
              await importJSON(file);
              setView('sheet');
            }
          }}
        />
      </nav>

      {/* Floating dice toggle */}
      {view !== 'dice' && (
        <button
          className="btn btn-primary no-print"
          style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000, borderRadius: '50%', width: 56, height: 56, fontSize: '1.5rem', boxShadow: 'var(--shadow-lg)' }}
          onClick={() => setShowDicePanel(!showDicePanel)}
          title="Rolar Dados"
        >
          &#9858;
        </button>
      )}

      {/* Floating dice panel */}
      {showDicePanel && view !== 'dice' && (
        <div className="no-print" style={{ position: 'fixed', bottom: 84, right: 20, zIndex: 999, width: 340, maxHeight: '60vh', overflowY: 'auto', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
          <DiceRoller compact />
        </div>
      )}

      {/* Main content */}
      {view === 'create' && (
        <div className="wizard">
          <div className="wizard-steps no-print">
            {WIZARD_STEPS.map((step, i) => (
              <div
                key={i}
                className={`wizard-step ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}`}
                onClick={() => setCurrentStep(i)}
              >
                <div className="wizard-step-number">{step.icon}</div>
                <div className="wizard-step-label">{step.label}</div>
              </div>
            ))}
          </div>

          <div className="wizard-content">
            {renderStep()}
          </div>

          <div className="wizard-nav no-print">
            <button
              className="btn"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              &#8592; Anterior
            </button>
            <span style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-muted)' }}>
              Passo {currentStep + 1} de {WIZARD_STEPS.length}
            </span>
            {currentStep < WIZARD_STEPS.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Próximo &#8594;
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => { handleSave(); setView('sheet'); }}
              >
                Finalizar e Ver Ficha &#10003;
              </button>
            )}
          </div>
        </div>
      )}

      {view === 'sheet' && <CharacterSheet />}

      {view === 'dice' && (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <DiceRoller />
        </div>
      )}

      {view === 'characters' && (
        <div className="animate-fadeIn">
          <div className="step-title">
            <span className="step-icon">&#128220;</span>
            Meus Personagens
          </div>

          {savedChars.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                Nenhum personagem salvo ainda. Crie um novo personagem para começar!
              </p>
              <button className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }} onClick={() => { dispatch({ type: 'RESET' }); setView('create'); }}>
                Criar Novo Personagem
              </button>
            </div>
          ) : (
            <>
              <div className="character-list">
                {savedChars.map((char, i) => (
                  <div key={i} className="character-card" onClick={() => { loadCharacter(char); setView('sheet'); }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div className="char-name">{char.name || 'Sem Nome'}</div>
                        <div className="char-info">
                          {char.classId || '—'} Nv. {char.level} — {char.raceId || '—'}
                        </div>
                        {char.savedAt && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 'var(--space-xs)' }}>
                            Salvo: {new Date(char.savedAt).toLocaleString('pt-BR')}
                          </div>
                        )}
                      </div>
                      <button
                        className="btn-icon"
                        onClick={e => {
                          e.stopPropagation();
                          const newChars = deleteCharacter(i);
                          setSavedChars(newChars);
                        }}
                        title="Excluir"
                      >
                        &#10005;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
                <button className="btn btn-primary" onClick={() => { dispatch({ type: 'RESET' }); setView('create'); }}>
                  Criar Novo Personagem
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CharacterProvider>
      <AppContent />
    </CharacterProvider>
  );
}
