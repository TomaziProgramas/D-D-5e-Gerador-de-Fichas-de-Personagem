import { useState } from 'react';
import { useCharacter } from '../../hooks/useCharacter';
import { WEAPONS, ARMORS, ADVENTURING_GEAR } from '../../data/equipment';
import { RACES } from '../../data/races';
import { getModifier, formatModifier, getProficiencyBonus } from '../../utils/dice';
import { calculateCarryingCapacity } from '../../utils/calculations';

export default function Step5Equipment() {
  const { character, dispatch, setField } = useCharacter();
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, weight: 0, type: 'item' });
  const [addMode, setAddMode] = useState('manual'); // 'manual', 'weapon', 'armor', 'gear'

  const race = RACES.find(r => r.id === character.raceId);
  const subrace = race?.subraces.find(s => s.id === character.subraceId);
  let strBonus = 0;
  if (race?.abilityBonuses.str) strBonus += race.abilityBonuses.str;
  if (subrace?.abilityBonuses?.str) strBonus += subrace.abilityBonuses.str;
  const strTotal = (character.abilityScores.str || 10) + strBonus;
  const carryCapacity = calculateCarryingCapacity(strTotal);

  const totalWeight = character.inventory.reduce((sum, item) => sum + (item.weight * item.quantity), 0);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', item });
  };

  const addWeapon = (weapon) => {
    const dexMod = getModifier((character.abilityScores.dex || 10));
    const strMod = getModifier(strTotal);
    const profBonus = getProficiencyBonus(character.level);
    const isFinesse = weapon.properties?.includes('Acuidade');
    const isRanged = weapon.type?.includes('ranged');
    const attackMod = isRanged || isFinesse ? Math.max(strMod, dexMod) : strMod;

    addItem({
      name: weapon.name,
      quantity: 1,
      weight: weapon.weight,
      type: 'arma',
      damage: weapon.damage,
      damageType: weapon.damageType,
      attackBonus: formatModifier(attackMod + profBonus),
      properties: weapon.properties?.join(', ') || ''
    });
  };

  const addArmor = (armor) => {
    addItem({
      name: armor.name,
      quantity: 1,
      weight: armor.weight,
      type: 'armadura',
      ac: armor.ac,
      armorType: armor.type
    });
  };

  return (
    <div className="animate-fadeIn">
      <div className="step-title">
        <span className="step-icon">&#127981;</span>
        Equipamento e Inventário
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="card-header">
          <span>Moedas</span>
        </div>
        <div className="grid-4" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {[
            { key: 'pp', label: 'PP', color: '#c0c0c0' },
            { key: 'gp', label: 'PO', color: '#c9a84c' },
            { key: 'ep', label: 'PE', color: '#a0a0a0' },
            { key: 'sp', label: 'PP', color: '#b8b8b8' },
            { key: 'cp', label: 'PC', color: '#b87333' }
          ].map(coin => (
            <div key={coin.key} style={{ textAlign: 'center' }}>
              <label className="label">{coin.label}</label>
              <input
                type="number"
                className="input"
                style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', color: coin.color }}
                value={character.currency[coin.key]}
                onChange={e => dispatch({
                  type: 'SET_NESTED',
                  field: 'currency',
                  key: coin.key,
                  value: Math.max(0, parseInt(e.target.value) || 0)
                })}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="card-header">
          <span>Capacidade de Carga</span>
          <span style={{ color: totalWeight > carryCapacity ? 'var(--red-light)' : 'var(--text-secondary)' }}>
            {totalWeight.toFixed(1)} / {carryCapacity} kg
          </span>
        </div>
        <div className="hp-bar-container" style={{ marginBottom: 'var(--space-sm)' }}>
          <div
            className={`hp-bar ${totalWeight > carryCapacity ? 'danger' : totalWeight > carryCapacity * 0.75 ? 'warning' : ''}`}
            style={{ width: `${Math.min(100, (totalWeight / carryCapacity) * 100)}%` }}
          />
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="card-header">
          <span>Adicionar Item</span>
          <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
            {['manual', 'weapon', 'armor', 'gear'].map(mode => (
              <button
                key={mode}
                className={`btn btn-small ${addMode === mode ? 'btn-primary' : ''}`}
                onClick={() => setAddMode(mode)}
              >
                {{ manual: 'Manual', weapon: 'Armas', armor: 'Armaduras', gear: 'Itens' }[mode]}
              </button>
            ))}
          </div>
        </div>

        {addMode === 'manual' && (
          <div className="form-row" style={{ alignItems: 'flex-end' }}>
            <div className="form-group">
              <label className="label">Nome</label>
              <input className="input" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} placeholder="Nome do item" />
            </div>
            <div className="form-group" style={{ flex: '0 0 80px' }}>
              <label className="label">Qtd</label>
              <input type="number" className="input" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })} />
            </div>
            <div className="form-group" style={{ flex: '0 0 80px' }}>
              <label className="label">Peso</label>
              <input type="number" className="input" value={newItem.weight} onChange={e => setNewItem({ ...newItem, weight: parseFloat(e.target.value) || 0 })} />
            </div>
            <div className="form-group" style={{ flex: '0 0 100px' }}>
              <label className="label">Tipo</label>
              <select className="select" value={newItem.type} onChange={e => setNewItem({ ...newItem, type: e.target.value })}>
                <option value="item">Item</option>
                <option value="arma">Arma</option>
                <option value="armadura">Armadura</option>
                <option value="magia">Mágico</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={() => { if (newItem.name) { addItem(newItem); setNewItem({ name: '', quantity: 1, weight: 0, type: 'item' }); } }}>
              Adicionar
            </button>
          </div>
        )}

        {addMode === 'weapon' && (
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {WEAPONS.map(weapon => (
              <div key={weapon.id} className="spell-card" onClick={() => addWeapon(weapon)}>
                <div className="spell-name">{weapon.name}</div>
                <div className="spell-meta">{weapon.damage} {weapon.damageType} — {weapon.properties?.join(', ')}</div>
              </div>
            ))}
          </div>
        )}

        {addMode === 'armor' && (
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {ARMORS.map(armor => (
              <div key={armor.id} className="spell-card" onClick={() => addArmor(armor)}>
                <div className="spell-name">{armor.name}</div>
                <div className="spell-meta">CA {armor.ac} — {armor.type}</div>
              </div>
            ))}
          </div>
        )}

        {addMode === 'gear' && (
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {ADVENTURING_GEAR.map(item => (
              <div key={item.id} className="spell-card" onClick={() => addItem({ name: item.name, quantity: 1, weight: item.weight, type: 'item', description: item.description })}>
                <div className="spell-name">{item.name}</div>
                <div className="spell-meta">{item.cost} — {item.weight}kg</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {character.inventory.length > 0 && (
        <div className="card">
          <div className="card-header">Inventário ({character.inventory.length} itens)</div>
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Tipo</th>
                <th>Qtd</th>
                <th>Peso</th>
                <th>Detalhes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {character.inventory.map(item => (
                <tr key={item.id}>
                  <td style={{ color: 'var(--text-highlight)' }}>{item.name}</td>
                  <td><span className="badge">{item.type}</span></td>
                  <td>
                    <input
                      type="number"
                      className="input"
                      style={{ width: 50, padding: '2px 4px', textAlign: 'center' }}
                      value={item.quantity}
                      onChange={e => dispatch({ type: 'UPDATE_ITEM', itemId: item.id, updates: { quantity: parseInt(e.target.value) || 1 } })}
                    />
                  </td>
                  <td>{(item.weight * item.quantity).toFixed(1)}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {item.damage && `${item.damage} ${item.damageType}`}
                    {item.attackBonus && ` (${item.attackBonus})`}
                    {item.ac && `CA ${item.ac}`}
                    {item.properties && ` — ${item.properties}`}
                  </td>
                  <td>
                    <button className="btn-icon" onClick={() => dispatch({ type: 'REMOVE_ITEM', itemId: item.id })} title="Remover">
                      &#10005;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
