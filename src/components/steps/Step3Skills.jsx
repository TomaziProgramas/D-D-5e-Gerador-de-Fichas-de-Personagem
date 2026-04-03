import { useCharacter } from '../../hooks/useCharacter';
import { SKILLS, ABILITIES } from '../../data/skills';
import { CLASSES } from '../../data/classes';
import { BACKGROUNDS } from '../../data/backgrounds';
import { RACES } from '../../data/races';
import { getModifier, formatModifier, getProficiencyBonus } from '../../utils/dice';
import { calculateSkillBonus } from '../../utils/calculations';

export default function Step3Skills() {
  const { character, toggleSkill, toggleExpertise } = useCharacter();

  const selectedClass = CLASSES.find(c => c.id === character.classId);
  const selectedBackground = BACKGROUNDS.find(b => b.id === character.backgroundId);

  const backgroundSkills = selectedBackground?.skillProficiencies || [];
  const classSkillChoices = selectedClass?.skillChoices || { choose: 0, from: [] };

  const canHaveExpertise = ['ladino', 'bardo'].includes(character.classId);
  const expertiseCount = character.classId === 'ladino' ? (character.level >= 6 ? 4 : 2) : (character.classId === 'bardo' ? (character.level >= 10 ? 4 : character.level >= 3 ? 2 : 0) : 0);

  const playerChosenSkills = character.skillProficiencies.filter(s => !backgroundSkills.includes(s));
  const maxPlayerSkills = classSkillChoices.choose;
  const canChooseMore = playerChosenSkills.length < maxPlayerSkills;

  const isSkillProficient = (skillId) => {
    return backgroundSkills.includes(skillId) || character.skillProficiencies.includes(skillId);
  };

  const isFromBackground = (skillId) => backgroundSkills.includes(skillId);
  const isFromClass = (skillId) => character.skillProficiencies.includes(skillId) && !backgroundSkills.includes(skillId);

  const getAbilityForSkill = (skillId) => {
    const skill = SKILLS.find(s => s.id === skillId);
    return skill ? skill.ability : 'str';
  };

  const getSkillBonus = (skillId) => {
    const ability = getAbilityForSkill(skillId);
    const abilityScore = character.abilityScores[ability] || 10;
    const race = RACES.find(r => r.id === character.raceId);
    const subrace = race?.subraces.find(s => s.id === character.subraceId);
    let racialBonus = 0;
    if (race?.abilityBonuses[ability]) racialBonus += race.abilityBonuses[ability];
    if (subrace?.abilityBonuses?.[ability]) racialBonus += subrace.abilityBonuses[ability];
    const totalAbility = abilityScore + racialBonus;

    const proficient = isSkillProficient(skillId);
    const expertise = character.skillExpertise.includes(skillId);

    return calculateSkillBonus(totalAbility, proficient, expertise, character.level);
  };

  const handleToggleSkill = (skillId) => {
    if (isFromBackground(skillId)) return;
    if (!character.skillProficiencies.includes(skillId) && !canChooseMore) return;
    if (!classSkillChoices.from.includes(skillId) && !character.skillProficiencies.includes(skillId)) return;
    toggleSkill(skillId);
  };

  return (
    <div className="animate-fadeIn">
      <div className="step-title">
        <span className="step-icon">&#10003;</span>
        Perícias e Proficiências
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
          {selectedBackground && (
            <div>
              <span className="label">Perícias do Antecedente ({selectedBackground.name})</span>
              <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
                {backgroundSkills.map(s => (
                  <span key={s} className="badge badge-green">{SKILLS.find(sk => sk.id === s)?.name || s}</span>
                ))}
              </div>
            </div>
          )}
          {selectedClass && (
            <div>
              <span className="label">Escolhas da Classe ({selectedClass.name})</span>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Escolha {classSkillChoices.choose} perícias — {playerChosenSkills.length}/{maxPlayerSkills} selecionadas
              </div>
            </div>
          )}
          {canHaveExpertise && (
            <div>
              <span className="label">Especialidade (Expertise)</span>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {character.skillExpertise.length}/{expertiseCount} selecionadas
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="skills-list">
        {SKILLS.map(skill => {
          const proficient = isSkillProficient(skill.id);
          const fromBg = isFromBackground(skill.id);
          const expertise = character.skillExpertise.includes(skill.id);
          const bonus = getSkillBonus(skill.id);
          const abilityAbbr = ABILITIES.find(a => a.id === skill.ability)?.abbr || '';
          const canToggle = !fromBg && (character.skillProficiencies.includes(skill.id) || (canChooseMore && classSkillChoices.from.includes(skill.id)));

          return (
            <div key={skill.id} className="skill-row" style={{ opacity: canToggle || proficient ? 1 : 0.6 }}>
              <label className="checkbox-wrapper" style={{ flex: 1 }}>
                <input
                  type="checkbox"
                  checked={proficient}
                  onChange={() => handleToggleSkill(skill.id)}
                  disabled={fromBg || (!character.skillProficiencies.includes(skill.id) && !canToggle)}
                />
                <span className="skill-bonus">{formatModifier(bonus)}</span>
                <span className="skill-name">{skill.name}</span>
                <span className="skill-ability-tag">({abilityAbbr})</span>
                {fromBg && <span className="badge" style={{ fontSize: '0.65rem' }}>BG</span>}
              </label>
              {canHaveExpertise && proficient && (
                <button
                  className={`btn btn-small ${expertise ? 'btn-primary' : ''}`}
                  onClick={() => {
                    if (!expertise && character.skillExpertise.length >= expertiseCount) return;
                    toggleExpertise(skill.id);
                  }}
                  disabled={!expertise && character.skillExpertise.length >= expertiseCount}
                  style={{ fontSize: '0.7rem', padding: '2px 6px' }}
                >
                  {expertise ? '×2' : 'Esp.'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <hr className="separator" />

      <div className="card">
        <div className="card-header">Testes de Resistência (Salvaguardas)</div>
        <div className="grid-3">
          {ABILITIES.map(ability => {
            const proficient = selectedClass?.savingThrows?.includes(ability.id);
            const race = RACES.find(r => r.id === character.raceId);
            const subrace = race?.subraces.find(s => s.id === character.subraceId);
            let racialBonus = 0;
            if (race?.abilityBonuses[ability.id]) racialBonus += race.abilityBonuses[ability.id];
            if (subrace?.abilityBonuses?.[ability.id]) racialBonus += subrace.abilityBonuses[ability.id];
            const totalScore = (character.abilityScores[ability.id] || 10) + racialBonus;
            const mod = getModifier(totalScore);
            const bonus = proficient ? mod + getProficiencyBonus(character.level) : mod;

            return (
              <div key={ability.id} className="skill-row">
                <input type="checkbox" checked={proficient || false} readOnly style={{ accentColor: 'var(--gold)' }} />
                <span className="skill-bonus">{formatModifier(bonus)}</span>
                <span className="skill-name">{ability.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
