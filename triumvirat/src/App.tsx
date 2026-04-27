/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Activity, Users, ScrollText, Power, PowerOff, Settings, UserCircle, Save, Brain, X, Zap, MessageSquareWarning, BookOpen } from 'lucide-react';
import { ITEM_CATALOG } from '@/items';
import { MONSTER_CATALOG } from '@/monsters';
import { ARENA_NPCS, ARENA_ITEMS } from '@/arena';
import { CLASSES, SUBCLASSES, SKILL_CATALOG } from '@/skills';

interface Status {
  isGameActive: boolean;
  playersCount: number;
  logs: string[];
  currentPlot: string;
}

interface BotSettings {
  vkToken: string;
  geminiKeys: string[];
  vkGroupId: string;
  creatorId: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings' | 'characters' | 'god' | 'world' | 'database' | 'npcs'>('dashboard');
  const [status, setStatus] = useState<Status | null>(null);
  const [settings, setSettings] = useState<BotSettings>({ vkToken: '', geminiKeys: [], vkGroupId: '', creatorId: '' });
  const [characters, setCharacters] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [items, setItems] = useState<Record<string, any>>({});
  const [npcs, setNpcs] = useState<any[]>([]);
  const [races, setRaces] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedChar, setSelectedChar] = useState<any | null>(null);
  const [selectedDbItem, setSelectedDbItem] = useState<any | null>(null);
  const [viewItemLevel, setViewItemLevel] = useState(0);
  const [modalMessage, setModalMessage] = useState('');
  const [dbCategory, setDbCategory] = useState<'monsters' | 'weapon' | 'armor' | 'accessory' | 'consumable' | 'classes' | 'subclasses' | 'skills' | 'races' | 'arena'>('monsters');
  const [dbSearch, setDbSearch] = useState('');

  const renderDatabaseContent = () => {
    const computeItemPreview = (item: any, level: number) => {
      const cloned = JSON.parse(JSON.stringify(item));
      if (!cloned.stats || !['weapon', 'armor', 'helmet', 'shield', 'accessory'].includes(cloned.type)) return cloned;
      
      cloned.level = level;
      
      const rarityMult: any = { 'common': 1, 'uncommon': 1.4, 'rare': 2.0, 'epic': 3.5, 'legendary': 6 };
      const mult = rarityMult[cloned.rarity] || 1;
      const budgetMult = cloned.type === 'accessory' ? 3 : 6;
      const baseBudget = cloned.type === 'accessory' ? 2 : 5;
      const budget = baseBudget + level * budgetMult * mult;
      
      const PERCENTAGE_STATS = ['critRate', 'critDamage', 'resistPoison', 'resistFire', 'resistIce', 'resistLightning', 'resistDark', 'resistHoly'];
      let sumLinear = 0;
      for (let k in cloned.stats) {
          if (!PERCENTAGE_STATS.includes(k) && typeof cloned.stats[k] === 'number') {
              sumLinear += cloned.stats[k];
          }
      }

      if (sumLinear > 0) {
        for (let k in cloned.stats) {
            if (!PERCENTAGE_STATS.includes(k) && typeof cloned.stats[k] === 'number') {
                let newVal = Math.floor(budget * (cloned.stats[k] / sumLinear));
                cloned.stats[k] = Math.max(1, newVal);
            }
        }
      }
      
      const basePrices: any = { 'common': 1000, 'uncommon': 2500, 'rare': 6000, 'epic': 15000, 'legendary': 50000 };
      let basePriceTemp = basePrices[cloned.rarity] || 1000;
      cloned.price = Math.floor(basePriceTemp + basePriceTemp * (level - 1) * 0.4);
      cloned.price = Math.max(1000, cloned.price);
      return cloned;
    };

    if (dbCategory === 'classes') {
      const filteredClasses = CLASSES.filter(c => c.toLowerCase().includes(dbSearch.toLowerCase()));
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClasses.map(c => (
            <div key={c} className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
              <h3 className="text-white font-bold text-lg">{c}</h3>
              <p className="text-sm text-neutral-400 mt-2">Базовый класс</p>
            </div>
          ))}
        </div>
      );
    } else if (dbCategory === 'subclasses') {
      const allSubclasses = Object.entries(SUBCLASSES).flatMap(([cls, subs]) => subs.map(sub => ({ cls, sub })));
      const filtered = allSubclasses.filter(item => item.sub.toLowerCase().includes(dbSearch.toLowerCase()) || item.cls.toLowerCase().includes(dbSearch.toLowerCase()));
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.slice(0, 50).map(item => (
            <div key={item.sub} className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
              <h3 className="text-white font-bold text-lg">{item.sub}</h3>
              <p className="text-sm text-neutral-400 mt-2">Подкласс для: <span className="text-amber-500">{item.cls}</span></p>
            </div>
          ))}
          {filtered.length > 50 && <div className="col-span-full text-center text-neutral-500 mt-4">Показано 50 из {filtered.length}. Используйте поиск.</div>}
        </div>
      );
    } else if (dbCategory === 'skills') {
      const skills = Object.values(SKILL_CATALOG).filter(s => s.name.toLowerCase().includes(dbSearch.toLowerCase()) || s.description.toLowerCase().includes(dbSearch.toLowerCase()));
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.slice(0, 50).map(s => (
            <div key={s.id} className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
              <div className="flex justify-between items-start">
                <h3 className="text-white font-bold">{s.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${s.isPassive ? 'bg-purple-900/50 text-purple-400' : 'bg-blue-900/50 text-blue-400'}`}>
                  {s.isPassive ? 'Пассивный' : 'Активный'}
                </span>
              </div>
              <p className="text-sm text-neutral-300 mt-2">{s.description}</p>
              <div className="text-xs text-neutral-500 mt-3 flex gap-3">
                {s.power > 0 && <span>Мощь: {s.power}</span>}
                {s.mpCost > 0 && <span>Мана: {s.mpCost}</span>}
              </div>
            </div>
          ))}
          {skills.length > 50 && <div className="col-span-full text-center text-neutral-500 mt-4">Показано 50 из {skills.length}. Используйте поиск.</div>}
        </div>
      );
    } else if (dbCategory === 'monsters') {
      const monsters = Object.values(MONSTER_CATALOG).filter(m => m.name.toLowerCase().includes(dbSearch.toLowerCase()));
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {monsters.slice(0, 50).map(m => (
            <div key={m.id} className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
              <h3 className="text-white font-bold">{m.name}</h3>
              <div className="text-sm text-neutral-400 mt-1">
                <p>Уровень: {m.level} | Редкость: {m.rarity}</p>
                <p>HP: {m.hp} | Атака: {m.attack}</p>
                <p>Защита: {m.defense} | Ловкость: {m.agility}</p>
              </div>
            </div>
          ))}
          {monsters.length > 50 && <div className="col-span-full text-center text-neutral-500 mt-4">Показано 50 из {monsters.length}. Используйте поиск.</div>}
        </div>
      );
    } else if (dbCategory === 'arena') {
      const npcs = ARENA_NPCS.filter(m => m.name.toLowerCase().includes(dbSearch.toLowerCase()) || m.charClass.toLowerCase().includes(dbSearch.toLowerCase()));
      const items = ARENA_ITEMS.filter(m => m.name.toLowerCase().includes(dbSearch.toLowerCase()));
      return (
        <div className="space-y-6">
          <h3 className="text-white font-bold text-xl border-b border-neutral-800 pb-2">NPC Арены</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {npcs.map(m => (
              <div key={m.id} className="bg-neutral-800 p-4 rounded-lg border border-rose-900/50 shadow-sm shadow-rose-900/10">
                <h3 className="text-rose-400 font-bold">{m.name}</h3>
                <p className="text-sm text-neutral-300 mt-1">Класс: {m.charClass}</p>
                <p className="text-xs text-neutral-500 mt-2 italic">{m.description}</p>
              </div>
            ))}
          </div>

          <h3 className="text-white font-bold text-xl border-b border-neutral-800 pb-2 mt-8">Награды за Токены</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(m => (
              <div key={m.id} className="bg-neutral-800 p-4 rounded-lg border border-amber-900/50 shadow-sm shadow-amber-900/10">
                <h3 className="text-amber-400 font-bold">{m.name}</h3>
                <p className="text-sm text-neutral-300 mt-1">Тип: {m.type}</p>
                <p className="text-sm font-bold text-amber-500 mt-1">Стоимость: {m.cost} 🏅</p>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (dbCategory === 'races') {
      const filteredRaces = races.filter(r => r.name.toLowerCase().includes(dbSearch.toLowerCase()) || r.description.toLowerCase().includes(dbSearch.toLowerCase()));
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRaces.slice(0, 50).map(r => (
            <div key={r.id} className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
              <h3 className="text-white font-bold">{r.name}</h3>
              <p className="text-sm text-neutral-400 mt-2">{r.description}</p>
              {r.buffs && (
                <div className="mt-2 text-xs text-amber-400">
                  <p>
                    {r.buffs.hp ? `+${r.buffs.hp} HP ` : ''}
                    {r.buffs.mp ? `+${r.buffs.mp} MP ` : ''}
                    {r.buffs.attack ? `+${r.buffs.attack} Атака ` : ''}
                    {r.buffs.defense ? `+${r.buffs.defense} Защита ` : ''}
                    {r.buffs.magicAttack ? `+${r.buffs.magicAttack} Маг.Атака ` : ''}
                    {r.buffs.magicDefense ? `+${r.buffs.magicDefense} Маг.Защ ` : ''}
                    {r.buffs.agility ? `+${r.buffs.agility} Ловкость ` : ''}
                    {r.buffs.critRate ? `+${r.buffs.critRate}% Крит.Шанс ` : ''}
                    {r.buffs.critDamage ? `+${r.buffs.critDamage}% Крит.Урон ` : ''}
                  </p>
                </div>
              )}
            </div>
          ))}
          {filteredRaces.length > 50 && <div className="col-span-full text-center text-neutral-500 mt-4">Показано 50 из {filteredRaces.length}. Используйте поиск.</div>}
        </div>
      );
    } else {
      const items = Object.values(ITEM_CATALOG).filter(i => i.type === dbCategory && i.name.toLowerCase().includes(dbSearch.toLowerCase()));
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.slice(0, 50).map(rawItem => {
            const i = computeItemPreview(rawItem, viewItemLevel || 1);
            return (
            <div 
              key={i.id} 
              className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 cursor-pointer hover:border-cyan-500/50 transition-colors"
              onClick={() => { setSelectedDbItem(i); }}
            >
              <h3 className="text-white font-bold">{i.name} {viewItemLevel > 1 ? `(${viewItemLevel} ур)` : ''}</h3>
              <div className="text-sm text-neutral-400 mt-1">
                <p>Редкость: {i.rarity} | Цена: {i.price}💰</p>
                {i.stats && (
                  <p>
                    {i.stats.attack ? `Атака: ${i.stats.attack} ` : ''}
                    {i.stats.magicAttack ? `Маг.Атака: ${i.stats.magicAttack} ` : ''}
                    {i.stats.defense ? `Защита: ${i.stats.defense} ` : ''}
                    {i.stats.magicDefense ? `Маг.Защ: ${i.stats.magicDefense} ` : ''}
                    {i.stats.hp ? `HP: ${i.stats.hp} ` : ''}
                    {i.stats.maxHp ? `МаксHP: ${i.stats.maxHp} ` : ''}
                    {i.stats.maxMp ? `МаксMP: ${i.stats.maxMp} ` : ''}
                    {i.stats.agility ? `Ловкость: ${i.stats.agility} ` : ''}
                    <br />
                    {i.stats.critRate ? `КритШанс: ${i.stats.critRate}% ` : ''}
                    {i.stats.critDamage ? `КритУрон: ${i.stats.critDamage}% ` : ''}
                  </p>
                )}
                {i.healAmount && <p>Лечение: {i.healAmount} HP</p>}
                <p className="mt-2 text-xs italic">{i.description}</p>
              </div>
            </div>
            );
          })}
          {items.length > 50 && <div className="col-span-full text-center text-neutral-500 mt-4">Показано 50 из {items.length}. Используйте поиск.</div>}
        </div>
      );
    }
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/status');
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        setStatus(data);
      } catch (e) {
        console.error('Failed to fetch status', e);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab === 'settings') {
      fetch('/api/settings').then(r => r.json()).then(setSettings);
    } else if (activeTab === 'characters' || activeTab === 'god') {
      fetch('/api/characters').then(r => r.json()).then(setCharacters);
      fetch('/api/items').then(r => r.json()).then(setItems);
    } else if (activeTab === 'world') {
      fetch('/api/locations').then(r => r.json()).then(setLocations);
    } else if (activeTab === 'npcs') {
      fetch('/api/npcs').then(r => r.json()).then(res => setNpcs(res.npcs || []));
    } else if (activeTab === 'database') {
      fetch('/api/items').then(r => r.json()).then(setItems);
      fetch('/api/races').then(r => r.json()).then(setRaces);
    }
  }, [activeTab]);

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      console.log('Настройки сохранены! Бот перезапускается...');
    } catch (e) {
      console.error('Ошибка сохранения', e);
    }
    setIsSaving(false);
  };

  const deleteCharacter = async (id: string) => {
    try {
      await fetch(`/api/characters/${id}`, { method: 'DELETE' });
      setCharacters(characters.filter(c => c.id !== id));
    } catch (e) {
      console.error('Ошибка удаления', e);
    }
  };

  const saveCharacter = async (char: any) => {
    try {
      setModalMessage('Сохранение...');
      await fetch(`/api/characters/${char.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(char)
      });
      setCharacters(characters.map(c => c.id === char.id ? char : c));
      setModalMessage('Сохранено!');
      setTimeout(() => setModalMessage(''), 3000);
    } catch (e) {
      console.error(e);
      setModalMessage('Ошибка сохранения');
    }
  };

  const sendPhotoToVk = async (char: any) => {
    if (!char.imageUrl) {
      setModalMessage('Сначала добавьте URL изображения');
      return;
    }
    try {
      setModalMessage('Отправка...');
      const res = await fetch(`/api/characters/${char.id}/send-photo`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setModalMessage('Фото отправлено в ВК!');
      } else {
        setModalMessage('Ошибка: ' + data.error);
      }
      setTimeout(() => setModalMessage(''), 3000);
    } catch (e) {
      console.error(e);
      setModalMessage('Ошибка отправки');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">D&D VK Bot Dashboard</h1>
            <p className="text-neutral-400 mt-1">Управление и мониторинг бота ВКонтакте</p>
          </div>
          <div className="flex items-center gap-3 bg-neutral-900 px-4 py-2 rounded-full border border-neutral-800">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-emerald-400">Bot Online</span>
          </div>
        </header>

        <div className="flex gap-4 border-b border-neutral-800 pb-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-neutral-900 text-neutral-400'}`}
          >
            <Activity className="w-4 h-4" /> Статус игры
          </button>
          <button 
            onClick={() => setActiveTab('characters')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'characters' ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-neutral-900 text-neutral-400'}`}
          >
            <UserCircle className="w-4 h-4" /> Персонажи
          </button>
          <button 
            onClick={() => setActiveTab('world')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'world' ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-neutral-900 text-neutral-400'}`}
          >
            <Activity className="w-4 h-4" /> Мир
          </button>
          <button 
            onClick={() => setActiveTab('npcs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'npcs' ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-neutral-900 text-neutral-400'}`}
          >
            <UserCircle className="w-4 h-4" /> NPC
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-neutral-900 text-neutral-400'}`}
          >
            <Settings className="w-4 h-4" /> Настройки
          </button>
          <button 
            onClick={() => setActiveTab('god')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'god' ? 'bg-amber-500/20 text-amber-400' : 'hover:bg-neutral-900 text-neutral-400'}`}
          >
            <Zap className="w-4 h-4" /> Режим Бога
          </button>
          <button 
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'database' ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-neutral-900 text-neutral-400'}`}
          >
            <BookOpen className="w-4 h-4" /> База знаний
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-lg font-semibold text-white">Статус игры</h2>
                </div>
                <div className="flex items-center gap-4">
                  {status?.isGameActive ? (
                    <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-lg">
                      <Power className="w-5 h-5" />
                      <span className="font-medium">Игра запущена</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-rose-400 bg-rose-400/10 px-4 py-2 rounded-lg">
                      <PowerOff className="w-5 h-5" />
                      <span className="font-medium">Игра остановлена</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-semibold text-white">Игроки</h2>
                </div>
                <div className="text-3xl font-bold text-white">
                  {status?.playersCount ?? 0}
                </div>
                <p className="text-neutral-400 text-sm mt-1">Активных игроков в сессии</p>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white">Текущий сюжет (Память)</h2>
              </div>
              <div className="bg-neutral-950 rounded-lg p-4 text-neutral-300 border border-neutral-800 min-h-[100px]">
                {status?.currentPlot || <span className="text-neutral-500 italic">Сюжет пока пуст...</span>}
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <ScrollText className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-semibold text-white">Логи событий</h2>
              </div>
              <div className="bg-neutral-950 rounded-lg p-4 font-mono text-sm h-96 overflow-y-auto border border-neutral-800">
                {status?.logs && status.logs.length > 0 ? (
                  <div className="space-y-2">
                    {status.logs.map((log, i) => (
                      <div key={i} className="text-neutral-300 break-words">
                        {log}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-neutral-500 italic">Ожидание событий...</div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm max-w-2xl">
            <h2 className="text-xl font-semibold text-white mb-6">Настройки бота</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">VK Token</label>
                <input 
                  type="password" 
                  value={settings.vkToken || ''}
                  onChange={e => setSettings({...settings, vkToken: e.target.value})}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="vk1.a..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Gemini API Keys</label>
                {(settings.geminiKeys || []).map((key, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input 
                      type="text" 
                      value={key}
                      onChange={e => {
                        const newKeys = [...(settings.geminiKeys || [])];
                        newKeys[index] = e.target.value;
                        setSettings({...settings, geminiKeys: newKeys});
                      }}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                      placeholder="AIzaSy..."
                    />
                    <button 
                      onClick={() => {
                        const newKeys = (settings.geminiKeys || []).filter((_, i) => i !== index);
                        setSettings({...settings, geminiKeys: newKeys});
                      }} 
                      className="px-3 py-2 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500/20 transition-colors"
                    >
                      Удалить
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setSettings({...settings, geminiKeys: [...(settings.geminiKeys || []), '']})} 
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors mt-1"
                >
                  + Добавить ключ
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">VK Group ID (только цифры)</label>
                <input 
                  type="text" 
                  value={settings.vkGroupId || ''}
                  onChange={e => setSettings({...settings, vkGroupId: e.target.value})}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="236412280"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Creator ID (Твой ID ВКонтакте)</label>
                <input 
                  type="text" 
                  value={settings.creatorId || ''}
                  onChange={e => setSettings({...settings, creatorId: e.target.value})}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="123456789"
                />
              </div>
              <button 
                onClick={saveSettings}
                disabled={isSaving}
                className="mt-6 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Сохранение...' : 'Сохранить настройки'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'characters' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.length === 0 ? (
              <div className="col-span-full text-center text-neutral-500 py-12">
                Нет созданных персонажей. Напишите боту "создать персонажа".
              </div>
            ) : (
              characters.map(char => (
                <div key={char.id} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-sm">
                  {char.imageUrl ? (
                    <img src={char.imageUrl} alt={char.name} className="w-full h-64 object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-64 bg-neutral-800 flex items-center justify-center text-neutral-500">
                      Нет изображения
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white">{char.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-300">{char.race}</span>
                      <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-xs">{char.charClass}</span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">{char.subclass}</span>
                    </div>
                    <p className="text-sm text-neutral-400 mt-4 line-clamp-3">{char.backstory}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-neutral-500">
                        Владелец: {char.ownerId}
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setSelectedChar(char)}
                          className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          Подробнее
                        </button>
                        <button 
                          onClick={() => deleteCharacter(char.id)}
                          className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'god' && (
          <div className="space-y-8">
            <div className="bg-neutral-900 border border-amber-900/50 rounded-xl p-6 shadow-sm shadow-amber-900/20">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-semibold text-white">Управление сюжетом (Память мира)</h2>
              </div>
              <textarea 
                value={status?.currentPlot || ''}
                onChange={(e) => {
                  const newPlot = e.target.value;
                  setStatus(prev => prev ? {...prev, currentPlot: newPlot} : null);
                }}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-300 text-sm focus:outline-none focus:border-amber-500 transition-colors h-32 resize-none mb-4"
                placeholder="Глобальный сюжет..."
              />
              <button 
                onClick={async () => {
                  setModalMessage('Сохранение сюжета...');
                  await fetch('/api/god/plot', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ plot: status?.currentPlot || '' })
                  });
                  setModalMessage('Сюжет сохранен!');
                  setTimeout(() => setModalMessage(''), 3000);
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Сохранить сюжет
              </button>
              {modalMessage && <span className="ml-4 text-amber-400 text-sm">{modalMessage}</span>}
            </div>

            <div className="bg-neutral-900 border border-amber-900/50 rounded-xl p-6 shadow-sm shadow-amber-900/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg font-semibold text-white">Управление сущностями</h2>
                </div>
                <button 
                  onClick={async () => {
                    if (confirm('Вы уверены, что хотите УДАЛИТЬ ВСЕ ВЕЩИ у всех персонажей?')) {
                      await fetch('/api/god/clear-items', { method: 'POST' });
                      alert('Инвентари очищены от мусора!');
                    }
                  }}
                  className="bg-red-600/20 text-red-500 hover:bg-red-600/30 px-4 py-2 rounded text-sm transition-colors border border-red-900/50"
                >
                  Очистить инвентари всем
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {characters.map(char => (
                  <div key={char.id} className="bg-neutral-950 border border-neutral-800 rounded-lg p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-amber-500">{char.name}</h3>
                        <p className="text-sm text-neutral-400">Уровень {char.level || 1} • {char.charClass}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            const msg = prompt('Введите божественное послание для ' + char.name + ':');
                            if (msg) {
                              fetch('/api/god/message', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ userId: char.ownerId, message: msg })
                              }).then(() => alert('Отправлено!'));
                            }
                          }}
                          className="flex items-center gap-1 bg-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded hover:bg-indigo-500/30 transition-colors text-sm"
                        >
                          <MessageSquareWarning className="w-4 h-4" /> Глас Божий
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-neutral-500 mb-1">HP</label>
                        <input type="number" value={char.rpg?.baseStats?.hp || 0} onChange={(e) => {
                          const newChar = {...char, rpg: {...char.rpg, baseStats: {...char.rpg?.baseStats, hp: parseInt(e.target.value)}}};
                          setCharacters(characters.map(c => c.id === char.id ? newChar : c));
                        }} className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-white" />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-500 mb-1">Max HP</label>
                        <input type="number" value={char.rpg?.baseStats?.maxHp || 0} onChange={(e) => {
                          const newChar = {...char, rpg: {...char.rpg, baseStats: {...char.rpg?.baseStats, maxHp: parseInt(e.target.value)}}};
                          setCharacters(characters.map(c => c.id === char.id ? newChar : c));
                        }} className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-white" />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-500 mb-1">Уровень</label>
                        <input type="number" value={char.rpg?.level || char.level || 1} onChange={(e) => {
                          const newChar = {...char, level: parseInt(e.target.value), rpg: {...char.rpg, level: parseInt(e.target.value)}};
                          setCharacters(characters.map(c => c.id === char.id ? newChar : c));
                        }} className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-white" />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-500 mb-1">Опыт (XP)</label>
                        <input type="number" value={char.rpg?.xp || 0} onChange={(e) => {
                          const newChar = {...char, rpg: {...char.rpg, xp: parseInt(e.target.value)}};
                          setCharacters(characters.map(c => c.id === char.id ? newChar : c));
                        }} className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-white" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-neutral-500 mb-1">Атака (База)</label>
                        <input type="number" value={char.rpg?.baseStats?.attack || 0} onChange={(e) => {
                          const newChar = {...char, rpg: {...char.rpg, baseStats: {...char.rpg?.baseStats, attack: parseInt(e.target.value)}}};
                          setCharacters(characters.map(c => c.id === char.id ? newChar : c));
                        }} className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-white" />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-500 mb-1">Защита (База)</label>
                        <input type="number" value={char.rpg?.baseStats?.defense || 0} onChange={(e) => {
                          const newChar = {...char, rpg: {...char.rpg, baseStats: {...char.rpg?.baseStats, defense: parseInt(e.target.value)}}};
                          setCharacters(characters.map(c => c.id === char.id ? newChar : c));
                        }} className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-white" />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-500 mb-1">Ловкость (База)</label>
                        <input type="number" value={char.rpg?.baseStats?.agility || 0} onChange={(e) => {
                          const newChar = {...char, rpg: {...char.rpg, baseStats: {...char.rpg?.baseStats, agility: parseInt(e.target.value)}}};
                          setCharacters(characters.map(c => c.id === char.id ? newChar : c));
                        }} className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-white" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-800">
                      <div className="flex items-center gap-2">
                        <select id={`item-select-${char.id}`} className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-white text-sm">
                          {Object.values(items).map((item: any) => (
                            <option key={item.id} value={item.id}>{item.name} ({item.type})</option>
                          ))}
                        </select>
                        <button 
                          onClick={async () => {
                            const select = document.getElementById(`item-select-${char.id}`) as HTMLSelectElement;
                            if (select && select.value) {
                              await fetch('/api/god/give-item', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ charId: char.id, itemId: select.value })
                              });
                              alert('Предмет выдан!');
                            }
                          }}
                          className="bg-emerald-600/20 text-emerald-500 hover:bg-emerald-600/30 px-3 py-1 rounded text-sm transition-colors"
                        >
                          Выдать предмет
                        </button>
                      </div>
                      <button 
                        onClick={async () => {
                          await fetch(`/api/god/character/${char.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(char)
                          });
                          alert('Сущность обновлена!');
                        }}
                        className="bg-amber-600/20 text-amber-500 hover:bg-amber-600/30 px-4 py-2 rounded text-sm transition-colors"
                      >
                        Применить изменения
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'world' && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-white mb-6">Мир игры</h2>
            
            <h3 className="text-lg font-medium text-white mb-4">Главный Арт</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
                <h3 className="text-lg font-medium text-white mb-2">Элдория</h3>
                <img 
                  src={`/images/eldoria.jpg?${Date.now()}`} 
                  alt="Элдория" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  referrerPolicy="no-referrer"
                />
                <p className="text-neutral-400 text-sm mb-4">Столица королевства, центр торговли и ремесел.</p>
                <input 
                  type="file" 
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const formData = new FormData();
                      formData.append('image', e.target.files[0]);
                      const res = await fetch('/api/upload-city-image', { method: 'POST', body: formData });
                      if (res.ok) {
                        alert('Изображение обновлено!');
                        window.location.reload();
                      } else {
                        alert('Ошибка при загрузке');
                      }
                    }
                  }}
                  className="text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 mt-8">
              <h3 className="text-lg font-medium text-white">Все локации мира ({locations.length})</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {locations.map((loc: any) => (
                <div key={loc.id} className="bg-neutral-800 border border-neutral-700 p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-md font-bold text-white">{loc.name}</h4>
                    <span className="text-xs px-2 py-1 bg-neutral-700 text-neutral-300 rounded uppercase">{loc.type}</span>
                  </div>
                  <p className="text-xs text-indigo-400 mb-2">Рек. Уровень: {loc.levelMin}-{loc.levelMax}</p>
                  <p className="text-sm text-neutral-400 mb-2">{loc.description}</p>
                  {loc.monsters && loc.monsters.length > 0 && (
                    <div className="mt-2 text-xs text-neutral-500">
                      <span className="font-semibold text-neutral-400">Монстры: </span>
                      {loc.monsters.length} видов
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'npcs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold text-white flex items-center gap-2">
                 <UserCircle className="w-6 h-6 text-blue-400" />
                 Управление NPC
               </h2>
               <button onClick={async () => {
                   setModalMessage('Создание NPC...');
                   const newId = `npc_${Date.now()}`;
                   const newNpc = { id: newId, name: 'Новый NPC', prompt: '', level: 1, hp: 100, maxHp: 100, attack: 10, defense: 5, locationId: 'loc_starter', greeting: 'Привет.', hostile: false };
                   await fetch('/api/npcs', {
                       method: 'POST',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify(newNpc)
                   });
                   const res = await fetch('/api/npcs').then(r => r.json());
                   setNpcs(res.npcs || []);
                   setModalMessage('');
               }} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium text-sm">
                 + Добавить NPC
               </button>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
               {npcs.map(npc => (
                   <div key={npc.id} className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-sm flex flex-col gap-4">
                       <div className="flex justify-between items-start">
                         <div className="space-y-1">
                           <input type="text" value={npc.name} onChange={(e) => {
                               const arr = [...npcs];
                               const idx = arr.findIndex(n => n.id === npc.id);
                               arr[idx].name = e.target.value;
                               setNpcs(arr);
                           }} className="bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-blue-500 outline-none text-lg font-bold text-white px-1 py-0.5 transition-colors" />
                           <div className="text-xs text-neutral-500 font-mono pl-1 px-1">ID: {npc.id}</div>
                         </div>
                         <button onClick={async () => {
                             setModalMessage('Сохранение...');
                             await fetch('/api/npcs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(npc) });
                             setModalMessage('Сохранено!');
                             setTimeout(() => setModalMessage(''), 1000);
                         }} className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm rounded transition-colors">Сохранить</button>
                       </div>
                       
                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-950 p-3 rounded-lg border border-neutral-900/50">
                         <div>
                            <label className="block text-[10px] text-neutral-500 uppercase tracking-wider mb-1">Уровень</label>
                            <input type="number" value={npc.level || 1} onChange={e => {
                               const arr = [...npcs]; arr.find(n => n.id === npc.id)!.level = Number(e.target.value); setNpcs(arr);
                            }} className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-sm text-neutral-300 outline-none focus:border-blue-500" />
                         </div>
                         <div>
                            <label className="block text-[10px] text-neutral-500 uppercase tracking-wider mb-1">Max HP</label>
                            <input type="number" value={npc.maxHp || 100} onChange={e => {
                               const val = Number(e.target.value);
                               const arr = [...npcs]; const n = arr.find(nx => nx.id === npc.id)!; n.maxHp = val; n.hp = val; setNpcs(arr);
                            }} className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-sm text-neutral-300 outline-none focus:border-blue-500" />
                         </div>
                         <div>
                            <label className="block text-[10px] text-neutral-500 uppercase tracking-wider mb-1">Атака</label>
                            <input type="number" value={npc.attack || 10} onChange={e => {
                               const arr = [...npcs]; arr.find(n => n.id === npc.id)!.attack = Number(e.target.value); setNpcs(arr);
                            }} className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-sm text-neutral-300 outline-none focus:border-blue-500" />
                         </div>
                         <div>
                            <label className="block text-[10px] text-neutral-500 uppercase tracking-wider mb-1">Защита</label>
                            <input type="number" value={npc.defense || 5} onChange={e => {
                               const arr = [...npcs]; arr.find(n => n.id === npc.id)!.defense = Number(e.target.value); setNpcs(arr);
                            }} className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-sm text-neutral-300 outline-none focus:border-blue-500" />
                         </div>
                       </div>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div className="space-y-1">
                            <label className="block text-xs font-semibold text-neutral-400">ID Локации <span className="font-normal text-neutral-500">(где обитает)</span></label>
                            <input type="text" value={npc.locationId || ''} onChange={e => {
                               const arr = [...npcs]; arr.find(n => n.id === npc.id)!.locationId = e.target.value; setNpcs(arr);
                            }} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-300 outline-none focus:border-blue-500 focus:bg-neutral-900 transition-colors" placeholder="loc_starter" />
                         </div>
                         <div className="flex items-center pt-5">
                            <label className="flex items-center gap-2 cursor-pointer group">
                               <input type="checkbox" checked={npc.hostile || false} onChange={e => {
                                   const arr = [...npcs]; arr.find(n => n.id === npc.id)!.hostile = e.target.checked; setNpcs(arr);
                               }} className="w-4 h-4 rounded border-neutral-700 text-red-500 focus:ring-red-500/20 bg-neutral-900" />
                               <span className="text-sm font-medium text-neutral-300 group-hover:text-red-400 transition-colors">Враждебный по умолчанию</span>
                            </label>
                         </div>
                       </div>
                       
                       <div className="space-y-3 pt-2">
                           <div>
                             <label className="block text-xs font-semibold text-neutral-400 mb-1.5">Приветствие <span className="font-normal text-neutral-500">(первая фраза)</span></label>
                             <textarea value={npc.greeting || ''} onChange={e => {
                                const arr = [...npcs]; arr.find(n => n.id === npc.id)!.greeting = e.target.value; setNpcs(arr);
                             }} className="w-full h-16 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-300 outline-none focus:border-blue-500 focus:bg-neutral-900 transition-colors resize-none" placeholder="Что ты забыл здесь, путник?" />
                           </div>
                           <div>
                             <label className="block text-xs font-semibold text-neutral-400 mb-1.5 flex justify-between items-end">
                               Промпт <span className="text-[10px] font-normal text-neutral-500 bg-neutral-800 px-1.5 py-0.5 rounded">Как ИИ должен отыгрывать</span>
                             </label>
                             <textarea value={npc.prompt || ''} onChange={e => {
                                const arr = [...npcs]; arr.find(n => n.id === npc.id)!.prompt = e.target.value; setNpcs(arr);
                             }} className="w-full h-24 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-300 outline-none focus:border-blue-500 focus:bg-neutral-900 transition-colors resize-none font-mono" placeholder="Ворчливый старик, который не любит чужаков, но знает секрет руин..." />
                           </div>
                       </div>
                   </div>
               ))}
               {npcs.length === 0 && (
                   <div className="col-span-full py-12 text-center border-2 border-dashed border-neutral-800 rounded-xl">
                       <p className="text-neutral-500 font-medium">Пока нет созданных NPC.</p>
                       <p className="text-neutral-600 space-x-2 mt-2 text-sm">Добавьте нового NPC или запустите скрипт генерации.</p>
                       <button onClick={async () => {
                           setModalMessage('Генерация 50 NPC...');
                           const LOCATIONS = ["loc_starter", "loc_forest", "loc_cave", "loc_mountain", "loc_ruins", "loc_swamp", "loc_desert"];
                           const PROMPTS = ["Ворчливый старик, который не любит чужаков, но много знает.", "Добрая торговка, всегда предложит поесть.", "Уставший стражник, мечтает о конце смены.", "Хитрый мошенник, пытается продать фальшивые артефакты.", "Загадочный маг, говорит загадками.", "Веселый бард, всегда поет песни о героях.", "Суровый кузнец, уважает только силу.", "Наглый воришка-подросток.", "Сумасшедший ученый, ищет редкие ингредиенты.", "Благородный рыцарь, ищет тех, кому нужна помощь."];
                           for(let i=1; i<=50; i++) {
                              const loc = LOCATIONS[i % LOCATIONS.length];
                              const prompt = PROMPTS[i % PROMPTS.length];
                              const isHostile = Math.random() < 0.2;
                              await fetch('/api/npcs', {
                                  method: 'POST',
                                  headers: {'Content-Type': 'application/json'},
                                  body: JSON.stringify({ id: `npc_${i}`, name: `НПС ${i}`, prompt: prompt, level: Math.max(1, Math.floor(i / 2)), hp: 100 + i * 20, maxHp: 100 + i * 20, attack: 10 + i * 2, defense: 5 + i, locationId: loc, greeting: "Приветствую, путник.", hostile: isHostile })
                              });
                           }
                           const res = await fetch('/api/npcs').then(r => r.json());
                           setNpcs(res.npcs || []);
                           setModalMessage('');
                       }} className="mt-4 px-4 py-2 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 rounded-lg text-sm transition-colors font-medium border border-indigo-500/20">
                           Сгенерировать базовых 50 NPC
                       </button>
                   </div>
               )}
            </div>
          </div>
        )}

        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-semibold text-white">База знаний</h2>
              </div>
              
              <div className="flex flex-wrap gap-4 border-b border-neutral-800 pb-4 mb-6">
                <button onClick={() => setDbCategory('monsters')} className={`transition-colors ${dbCategory === 'monsters' ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}>Монстры</button>
                <button onClick={() => setDbCategory('weapon')} className={`transition-colors ${dbCategory === 'weapon' ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}>Оружие</button>
                <button onClick={() => setDbCategory('armor')} className={`transition-colors ${dbCategory === 'armor' ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}>Броня</button>
                <button onClick={() => setDbCategory('accessory')} className={`transition-colors ${dbCategory === 'accessory' ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}>Аксессуары</button>
                <button onClick={() => setDbCategory('consumable')} className={`transition-colors ${dbCategory === 'consumable' ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}>Расходники</button>
                <div className="w-px h-6 bg-neutral-800 mx-2 hidden md:block"></div>
                <button onClick={() => setDbCategory('classes')} className={`transition-colors ${dbCategory === 'classes' ? 'text-amber-400 font-bold' : 'text-amber-400/60 hover:text-amber-400'}`}>Классы</button>
                <button onClick={() => setDbCategory('subclasses')} className={`transition-colors ${dbCategory === 'subclasses' ? 'text-amber-400 font-bold' : 'text-amber-400/60 hover:text-amber-400'}`}>Подклассы</button>
                <button onClick={() => setDbCategory('races')} className={`transition-colors ${dbCategory === 'races' ? 'text-amber-400 font-bold' : 'text-amber-400/60 hover:text-amber-400'}`}>Расы</button>
                <button onClick={() => setDbCategory('skills')} className={`transition-colors ${dbCategory === 'skills' ? 'text-purple-400 font-bold' : 'text-purple-400/60 hover:text-purple-400'}`}>Скиллы</button>
                <div className="w-px h-6 bg-neutral-800 mx-2 hidden md:block"></div>
                <button onClick={() => setDbCategory('arena')} className={`transition-colors ${dbCategory === 'arena' ? 'text-rose-400 font-bold' : 'text-rose-400/60 hover:text-rose-400'}`}>Арена</button>
              </div>

              <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
                <input 
                  type="text" 
                  placeholder="Поиск..." 
                  value={dbSearch}
                  onChange={(e) => setDbSearch(e.target.value)}
                  className="w-full md:flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
                
                {['weapon', 'armor', 'accessory'].includes(dbCategory) && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0">
                    <span className="text-sm font-medium text-neutral-400">Уровень:</span>
                    <input 
                      type="number" 
                      min="1" 
                      max="100" 
                      value={viewItemLevel || 1} 
                      onChange={(e) => setViewItemLevel(parseInt(e.target.value) || 1)} 
                      className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-white w-16 focus:outline-none focus:border-cyan-500 text-sm"
                    />
                  </div>
                )}
              </div>

              {renderDatabaseContent()}
            </div>
          </div>
        )}
      </div>

      {selectedChar && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-stone-900 border-2 border-amber-900/50 rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-amber-900/20">
            <div className="flex justify-between items-center mb-6 border-b border-amber-900/30 pb-4">
              <h2 className="text-3xl font-serif font-bold text-amber-500 tracking-wide">{selectedChar.name}</h2>
              <button onClick={() => setSelectedChar(null)} className="text-stone-500 hover:text-amber-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-amber-700/70 uppercase tracking-wider mb-1">URL портрета</label>
                  <input 
                    type="text" 
                    value={selectedChar.imageUrl || ''}
                    onChange={e => setSelectedChar({...selectedChar, imageUrl: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-300 text-sm focus:outline-none focus:border-amber-700 transition-colors"
                    placeholder="https://..."
                  />
                  {selectedChar.imageUrl ? (
                    <img src={selectedChar.imageUrl} alt="Preview" className="mt-3 w-full aspect-square object-cover rounded border-2 border-stone-800 shadow-lg" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="mt-3 w-full aspect-square bg-stone-950 border-2 border-dashed border-stone-800 rounded flex items-center justify-center text-stone-600 text-sm">
                      Нет портрета
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-amber-700/70 uppercase tracking-wider mb-1">Возраст</label>
                    <input 
                      type="text" 
                      value={selectedChar.age || ''}
                      onChange={e => setSelectedChar({...selectedChar, age: e.target.value})}
                      className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-300 text-sm focus:outline-none focus:border-amber-700 transition-colors"
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-amber-700/70 uppercase tracking-wider mb-1">Пол</label>
                    <input 
                      type="text" 
                      value={selectedChar.gender || ''}
                      onChange={e => setSelectedChar({...selectedChar, gender: e.target.value})}
                      className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-300 text-sm focus:outline-none focus:border-amber-700 transition-colors"
                      placeholder="Мужской"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <label className="block text-xs font-bold text-amber-700/70 uppercase tracking-wider mb-1">HP</label>
                    <input type="number" value={selectedChar.rpg?.baseStats?.hp || 0} onChange={(e) => {
                      setSelectedChar({...selectedChar, rpg: {...selectedChar.rpg, baseStats: {...selectedChar.rpg?.baseStats, hp: parseInt(e.target.value)}}});
                    }} className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-300 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-amber-700/70 uppercase tracking-wider mb-1">Max HP</label>
                    <input type="number" value={selectedChar.rpg?.baseStats?.maxHp || 0} onChange={(e) => {
                      setSelectedChar({...selectedChar, rpg: {...selectedChar.rpg, baseStats: {...selectedChar.rpg?.baseStats, maxHp: parseInt(e.target.value)}}});
                    }} className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-300 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-amber-700/70 uppercase tracking-wider mb-1">Атака</label>
                    <input type="number" value={selectedChar.rpg?.baseStats?.attack || 0} onChange={(e) => {
                      setSelectedChar({...selectedChar, rpg: {...selectedChar.rpg, baseStats: {...selectedChar.rpg?.baseStats, attack: parseInt(e.target.value)}}});
                    }} className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-300 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-amber-700/70 uppercase tracking-wider mb-1">Защита</label>
                    <input type="number" value={selectedChar.rpg?.baseStats?.defense || 0} onChange={(e) => {
                      setSelectedChar({...selectedChar, rpg: {...selectedChar.rpg, baseStats: {...selectedChar.rpg?.baseStats, defense: parseInt(e.target.value)}}});
                    }} className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-300 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-amber-700/70 uppercase tracking-wider mb-1">Ловкость</label>
                    <input type="number" value={selectedChar.rpg?.baseStats?.agility || 0} onChange={(e) => {
                      setSelectedChar({...selectedChar, rpg: {...selectedChar.rpg, baseStats: {...selectedChar.rpg?.baseStats, agility: parseInt(e.target.value)}}});
                    }} className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-300 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-amber-700/70 uppercase tracking-wider mb-1">Уровень</label>
                    <input type="number" value={selectedChar.rpg?.level || 1} onChange={(e) => {
                      setSelectedChar({...selectedChar, rpg: {...selectedChar.rpg, level: parseInt(e.target.value)}});
                    }} className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-300 text-sm" />
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-amber-700/70 uppercase tracking-wider mb-1">Инвентарь (JSON)</label>
                  <textarea 
                    value={typeof selectedChar.rpg?.inventory === 'string' ? selectedChar.rpg.inventory : JSON.stringify(selectedChar.rpg?.inventory || [], null, 2)}
                    onChange={e => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        setSelectedChar({...selectedChar, rpg: {...selectedChar.rpg, inventory: parsed}});
                      } catch (err) {
                        // Allow typing invalid JSON temporarily
                        setSelectedChar({...selectedChar, rpg: {...selectedChar.rpg, inventory: e.target.value as any}});
                      }
                    }}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-4 py-3 text-stone-300 font-mono text-xs focus:outline-none focus:border-amber-700 transition-colors h-32 resize-none"
                    placeholder='[{"itemId": "item_common_1", "amount": 1}]'
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-700/70 uppercase tracking-wider mb-1">Снаряжение (JSON)</label>
                  <textarea 
                    value={typeof selectedChar.rpg?.equipment === 'string' ? selectedChar.rpg.equipment : JSON.stringify(selectedChar.rpg?.equipment || {}, null, 2)}
                    onChange={e => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        setSelectedChar({...selectedChar, rpg: {...selectedChar.rpg, equipment: parsed}});
                      } catch (err) {
                        setSelectedChar({...selectedChar, rpg: {...selectedChar.rpg, equipment: e.target.value as any}});
                      }
                    }}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-4 py-3 text-stone-300 font-mono text-xs focus:outline-none focus:border-amber-700 transition-colors h-32 resize-none"
                    placeholder='{"weapon": "item_epic_1"}'
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-700/70 uppercase tracking-wider mb-1">Навыки (JSON)</label>
                  <textarea 
                    value={typeof selectedChar.rpg?.customSkills === 'string' ? selectedChar.rpg.customSkills : JSON.stringify(selectedChar.rpg?.customSkills || [], null, 2)}
                    onChange={e => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        setSelectedChar({...selectedChar, rpg: {...selectedChar.rpg, customSkills: parsed}});
                      } catch (err) {
                        setSelectedChar({...selectedChar, rpg: {...selectedChar.rpg, customSkills: e.target.value as any}});
                      }
                    }}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-4 py-3 text-stone-300 font-mono text-xs focus:outline-none focus:border-amber-700 transition-colors h-32 resize-none"
                    placeholder='[{"id": "skill_1", "name": "Fireball", "type": "active"}]'
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-700/70 uppercase tracking-wider mb-1">План развития (Совет ДМа)</label>
                  <textarea 
                    value={selectedChar.progression || ''}
                    onChange={e => setSelectedChar({...selectedChar, progression: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-4 py-3 text-indigo-200/80 italic text-sm focus:outline-none focus:border-amber-700 transition-colors h-28 resize-none"
                    placeholder="Советы по прокачке от ИИ появятся здесь..."
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-amber-900/30">
              <button 
                onClick={() => saveCharacter(selectedChar)} 
                className="bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 px-5 py-2 rounded font-medium transition-colors text-sm"
              >
                Сохранить вручную
              </button>
              <div className="flex-grow"></div>
              <button 
                onClick={() => sendPhotoToVk(selectedChar)} 
                className="bg-indigo-900/40 hover:bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 px-5 py-2 rounded font-medium transition-colors text-sm"
              >
                Отправить в ВК
              </button>
              {modalMessage && (
                <span className="text-sm text-amber-500/80 ml-2 animate-pulse">{modalMessage}</span>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedDbItem && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-cyan-900/50 rounded-xl p-6 max-w-md w-full shadow-2xl shadow-cyan-900/20">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-neutral-800">
              <h2 className="text-xl font-bold text-cyan-400">{selectedDbItem.name}</h2>
              <button onClick={() => setSelectedDbItem(null)} className="text-neutral-500 hover:text-cyan-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-neutral-400 italic mb-4">{selectedDbItem.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-neutral-300">
                <div>Тип: <span className="text-white">{selectedDbItem.type}</span></div>
                <div>Редкость: <span className="text-white">{selectedDbItem.rarity}</span></div>
                <div>Цена: <span className="text-amber-400">{selectedDbItem.price}💰</span></div>
              </div>
            </div>

            {dbCategory === 'monsters' && (
              <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 mb-4 space-y-3">
                <h4 className="text-white font-medium mb-3 border-b border-neutral-800 pb-2">Статы Монстра</h4>
                {['level', 'hp', 'attack', 'defense', 'agility'].map((stat) => (
                  <div key={stat} className="flex justify-between items-center text-sm">
                    <span className="text-neutral-400 capitalize">{stat}</span>
                    <input 
                      type="number"
                      value={selectedDbItem[stat] || 0}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setSelectedDbItem({...selectedDbItem, [stat]: val});
                      }}
                      className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-white w-20 text-right focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                ))}
                <button
                  onClick={async () => {
                    try {
                       const updates = {
                         level: selectedDbItem.level,
                         hp: selectedDbItem.hp,
                         attack: selectedDbItem.attack,
                         defense: selectedDbItem.defense,
                         agility: selectedDbItem.agility
                       };
                       await fetch('/api/god/update-monster', {
                         method: 'POST',
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify({ id: selectedDbItem.id, updates })
                       });
                       alert('Успешно сохранено! (Изменения применятся после рестарта или сразу, если без кэша)');
                    } catch (e) {
                       alert('Ошибка сохранения');
                    }
                  }}
                  className="w-full mt-4 bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50 py-2 rounded transition-colors border border-cyan-900/50"
                >
                  Сохранить характеристики
                </button>
              </div>
            )}

            {selectedDbItem.type === 'weapon' || selectedDbItem.type === 'armor' || selectedDbItem.type === 'accessory' || selectedDbItem.type === 'helmet' || selectedDbItem.type === 'shield' ? (
              <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 mb-4">
                <div className="space-y-1 text-sm">
                  {selectedDbItem.stats?.attack ? <div className="flex justify-between text-rose-400"><span>Атака</span><span>{selectedDbItem.stats.attack}</span></div> : null}
                  {selectedDbItem.stats?.magicAttack ? <div className="flex justify-between text-purple-400"><span>Маг. Атака</span><span>{selectedDbItem.stats.magicAttack}</span></div> : null}
                  {selectedDbItem.stats?.defense ? <div className="flex justify-between text-sky-400"><span>Защита</span><span>{selectedDbItem.stats.defense}</span></div> : null}
                  {selectedDbItem.stats?.magicDefense ? <div className="flex justify-between text-indigo-400"><span>Маг. Защита</span><span>{selectedDbItem.stats.magicDefense}</span></div> : null}
                  {selectedDbItem.stats?.agility ? <div className="flex justify-between text-emerald-400"><span>Ловкость</span><span>{selectedDbItem.stats.agility}</span></div> : null}
                  {selectedDbItem.stats?.hp ? <div className="flex justify-between text-green-500"><span>HP</span><span>{selectedDbItem.stats.hp}</span></div> : null}
                  {selectedDbItem.stats?.maxHp ? <div className="flex justify-between text-green-500"><span>Max HP</span><span>{selectedDbItem.stats.maxHp}</span></div> : null}
                  {selectedDbItem.stats?.critRate ? <div className="flex justify-between text-orange-400"><span>Крит. Шанс</span><span>{selectedDbItem.stats.critRate}%</span></div> : null}
                  {selectedDbItem.stats?.critDamage ? <div className="flex justify-between text-orange-400"><span>Крит. Урон</span><span>{selectedDbItem.stats.critDamage}%</span></div> : null}
                </div>
              </div>
            ) : null}
            
          </div>
        </div>
      )}
    </div>
  );
}
