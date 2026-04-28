import express from 'express';
import multer from 'multer';
import { VK, Keyboard } from 'vk-io';
import { GoogleGenAI } from '@google/genai';
import cors from 'cors';
import path from 'path';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, updateDoc, onSnapshot, query, where, deleteDoc, writeBatch, setLogLevel, runTransaction } from 'firebase/firestore';
import fs from 'fs';
import config from './firebase-applet-config.json' assert { type: 'json' };
import { getItemByName, ITEM_CATALOG, getItem, parseItemId, buildItemId } from './items.js';
import { CharacterRPGData, DEFAULT_RPG_DATA, calculateTotalStats, equipItem, unequipItem, useItem, dropItem, addXp } from './rpg.js';
import { SKILL_CATALOG, CLASS_STARTING_SKILLS, CLASSES, CLASS_LEVEL_SKILLS, SUBCLASSES } from './skills.js';
import { generateEnemy, processCombatTurn } from './combat.js';
import { MONSTER_CATALOG } from './monsters.js';
import { WORLD_LOCATIONS } from './locations.js';
import { RACES_LIST, RACE_CATALOG, SECRET_RACE_ID, RACECREATOR_ID } from './races.js';
import { ARENA_NPCS, ARENA_ITEMS } from './arena.js';

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp, config.firestoreDatabaseId);
setLogLevel('silent');

const safeSetDoc = async (docRef: any, data: any, options?: any) => {
  try {
     return await setDoc(docRef, data, options);
  } catch (e) {
     console.error('🔥 FIRESTORE WRITE ERROR on path:', docRef.path || docRef.id || 'unknown');
     console.error(e);
     return null; // Suppress throwing to avoid crashes
  }
};

const fbAuth = getAuth(firebaseApp);
// signInAnonymously(fbAuth).then(() => console.log('Successfully signed in anonymously.')).catch(e => console.error('Failed to sign in anonymously:', e));


const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (req.url === '/api/status') {
    console.log('Middleware caught /api/status');
  }
  next();
});

app.get('/api/status', (req, res) => {
  if (!publicUrl && req.headers['x-forwarded-host']) {
    publicUrl = `https://${req.headers['x-forwarded-host']}`;
    console.log('Captured public URL for self-ping:', publicUrl);
  }
  console.log('API /api/status called');
  res.json({
    isGameActive,
    playersCount: players.size,
    logs: logs,
    currentPlot
  });
});


const PORT = 3000;

function renderHpBar(hp: number, maxHp: number) {
   const percent = Math.max(0, Math.min(100, (hp / maxHp) * 100));
   let heartsStr = '';
   for (let i = 0; i < 5; i++) {
     if (percent > i * 20) {
       heartsStr += '❤️';
     } else {
       heartsStr += '🖤';
     }
   }
   return heartsStr;
}

function createCombatState(enemy: any, extra = {}) {
  return {
    enemy,
    isDefending: false,
    playerCooldowns: {},
    turnCounter: 1,
    playerShield: 0,
    enemyShield: 0,
    playerStatuses: [],
    enemyStatuses: [],
    ...extra
  };
}

async function renderCombatUI(context: any, char: any, extraLog = '') {
  const combat = char.rpg.combat;
  const enemy = combat.enemy;
  const stats = calculateTotalStats(char.rpg);
  
  let msg = extraLog ? `${extraLog}\n\n` : '';
  msg += `⚔️ БОЙ: ${enemy.name}\n`;
  msg += `Враг: ${renderHpBar(enemy.hp, enemy.maxHp)} (${enemy.hp}/${enemy.maxHp})`;
  if (combat.enemyShield > 0) msg += ` [+🛡️${combat.enemyShield}]`;
  if (combat.enemyStatuses && combat.enemyStatuses.length > 0) {
    msg += ` | Эффекты: ` + combat.enemyStatuses.map((s: any) => `${s.name}(${s.duration}х)`).join(', ');
  }
  msg += `\n-------------------\n`;
  
  msg += `Вы: ${renderHpBar(char.rpg.baseStats.hp, stats.maxHp)} (${char.rpg.baseStats.hp}/${stats.maxHp}) | 💧 ${char.rpg.baseStats.mp || 0}/${stats.maxMp || 0}`;
  if (combat.playerShield > 0) msg += ` [+🛡️${combat.playerShield}]`;
  if (combat.playerStatuses && combat.playerStatuses.length > 0) {
    msg += `\n✨ Ваши эффекты: ` + combat.playerStatuses.map((s: any) => `${s.name}(${s.duration}х)`).join(', ');
  }
  msg += '\n';

  const keyboard = Keyboard.builder()
    .textButton({ label: '⚔️ Атака', payload: { command: 'combat_action', combatAction: 'attack' }, color: Keyboard.NEGATIVE_COLOR })
    .textButton({ label: '🛡️ Защита', payload: { command: 'combat_action', combatAction: 'defend' }, color: Keyboard.PRIMARY_COLOR })
            .row()
    .textButton({ label: '✨ Навыки', payload: { command: 'combat_skills_menu' }, color: Keyboard.POSITIVE_COLOR })
    .textButton({ label: '💊 Зелья', payload: { command: 'combat_potions_menu' }, color: Keyboard.PRIMARY_COLOR })
    .row()
    .textButton({ label: '🏃 Побег', payload: { command: 'combat_action', combatAction: 'flee' }, color: Keyboard.SECONDARY_COLOR });
    
  await context.send({ message: msg, keyboard });
}

// Serve images
const imagesDir = path.join(process.cwd(), 'data', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}
app.use('/images', express.static(imagesDir));

let vk: VK | null = null;
let ai: GoogleGenAI | null = null;
let geminiKeys: string[] = [];
let currentKeyIndex = 0;

let isGameActive = false;
let players = new Set<number>();
let logs: string[] = [];
let currentPlot = "";
let chatHistory: any[] = [];

// Concurrency lock to prevent multiple commands processing at once for the same user
const userLocks = new Set<number>();

// PvP state
const pvpChallenges = new Map<number, number>(); // challengedId -> challengerId
const activePvP = new Map<number, { 
  opponentId: number, 
  turn: number, 
  hp: Map<number, number>, 
  names: Map<number, string>,
  defending: Map<number, boolean>
}>(); // userId -> { opponentId, turn, hp, names, defending }

// Team PvE Combat State
const activeTeamCombats = new Map<string, {
  players: number[],
  enemies: any[],
  turnIndex: number, // 0 to players.length + enemies.length - 1
  turnOrder: { id: number | string, type: 'player' | 'enemy', name: string, agility: number }[],
  playerHp: Map<number, number>,
  playerNames: Map<number, string>,
  playerDefending: Map<number, boolean>,
  combatLog: string
}>(); // combatId -> state

// State machine for character creation
const userStates = new Map<number, { step: string, data: any }>();
const userCooldowns = new Map<number, number>();

// Track global events
const globalEvents = {
    creatorStoneClaimed: false
};

const guildRumors: { playerName: string, questName: string, timestamp: number }[] = [];

function addLog(msg: string) {
  console.log(msg);
  logs.push(`[${new Date().toLocaleTimeString()}] ${msg}`);
  if (logs.length > 50) logs.shift();
}

function switchGeminiKey() {
  if (geminiKeys.length === 0) return;
  currentKeyIndex = (currentKeyIndex + 1) % geminiKeys.length;
  ai = new GoogleGenAI({ apiKey: geminiKeys[currentKeyIndex] });
  addLog(`Переключение на запасной ключ Gemini (индекс ${currentKeyIndex})`);
}

function generateShopItems(cat: string, count: number, playerLevel: number = 1, charClass?: string) {
  let available = Object.values(ITEM_CATALOG).filter(i => i.rarity !== 'legendary');
  if (cat === 'weapon') available = available.filter(i => i.type === 'weapon' || i.type === 'shield');
  else if (cat === 'armor') available = available.filter(i => i.type === 'armor' || i.type === 'helmet');
  else if (cat === 'consumable') available = available.filter(i => i.type === 'consumable' || i.type === 'material');
  else if (cat === 'accessory') available = available.filter(i => i.type === 'accessory');
  else if (cat === 'black_market') available = available.filter(i => i.rarity === 'epic' || i.type === 'accessory');

  const selected = [];
  for (let i = 0; i < count; i++) {
    const roll = Math.random() * 100;
    let targetRarity = 'common';
    if (roll < 5) targetRarity = 'epic';
    else if (roll < 35) targetRarity = 'rare';
    else if (roll < 70) targetRarity = 'uncommon';

    let pool = available.filter(item => item.rarity === targetRarity);
    if (pool.length === 0) pool = available;
    
    // Add logic to favor charClass for weapons/armors
    if (charClass && (cat === 'weapon' || cat === 'armor')) {
       const classPool = pool.filter(i => !i.allowedClasses || i.allowedClasses.includes(charClass));
       // Provide 50% chance to specifically look for class-restricted items
       const strictClassPool = pool.filter(i => i.allowedClasses && i.allowedClasses.includes(charClass));
       if (strictClassPool.length > 0 && Math.random() < 0.6) {
           pool = strictClassPool;
       } else if (classPool.length > 0) {
           pool = classPool;
       }
    }

    if (pool.length > 0) {
      const randomItem = pool[Math.floor(Math.random() * pool.length)];
      if (['weapon', 'armor', 'helmet', 'shield', 'accessory'].includes(randomItem.type)) {
        let levelOffset = Math.floor(Math.random() * 2) === 0 ? 0 : 1; // +0 or +1
        let level = Math.max(1, playerLevel + levelOffset);
        let slots = 0;
        if (Math.random() < 0.2 && randomItem.type !== 'accessory') slots = 1;
        selected.push(buildItemId(randomItem.id, 0, slots, [], level));
      } else {
        selected.push(randomItem.id);
      }
    }
  }
  return selected;
}

const creationChats = new Map<number, any[]>();

function getCityKeyboard() {
  return Keyboard.builder()
    .textButton({ label: '🍺 Таверна', payload: { command: 'tavern_menu' }, color: Keyboard.PRIMARY_COLOR })
    .textButton({ label: '🏪 Магазин', payload: { command: 'shop' }, color: Keyboard.PRIMARY_COLOR })
    .row()
    .textButton({ label: '⚔️ Арена', payload: { command: 'arena' }, color: Keyboard.SECONDARY_COLOR })
    .textButton({ label: '🔨 Кузница', payload: { command: 'blacksmith' }, color: Keyboard.SECONDARY_COLOR })
    .row()
    .textButton({ label: 'Гил. авантюр.', payload: { command: 'guild_menu' }, color: Keyboard.PRIMARY_COLOR })
    .textButton({ label: '👥 Местные', payload: { command: 'npc_list' }, color: Keyboard.PRIMARY_COLOR })
    .row()
    .textButton({ label: 'Портовый квартал', payload: { command: 'city_explore', quarter: 'port' }, color: Keyboard.SECONDARY_COLOR })
    .textButton({ label: '🌲 Выйти', payload: { command: 'travel' }, color: Keyboard.POSITIVE_COLOR });
}

import { getExplorationKeyboard, handleExplorationEvent } from './exploration.js';

function getWildKeyboard(char?: any) {
  if (char && char.rpg) {
    return getExplorationKeyboard(char);
  }
  return Keyboard.builder().textButton({ label: '⬅️ В город', payload: { command: 'travel_city' }, color: Keyboard.POSITIVE_COLOR });
}

const MODELS = [
  'gemini-3.1-flash-lite-preview',
  'gemini-3-flash-preview',
  'gemini-3.1-pro-preview',
  'gemini-pro-latest',
  'gemini-flash-latest',
  'gemini-flash-lite-latest'
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function sendMessageWithRetry(text: string, systemInstruction: string, history: any[], imageUrl?: string) {
  for (const key of geminiKeys) {
    const currentAi = new GoogleGenAI({ apiKey: key });
    for (const model of MODELS) {
      let retries = 0;
      let maxRetries = 2; // Retry on 503 twice per model/key

      while (retries <= maxRetries) {
        try {
          const parts: any[] = [{ text }];
          
          if (imageUrl) {
            try {
              let buffer: Buffer;
              let mimeType = 'image/jpeg';
              if (imageUrl.startsWith('http')) {
                const imageRes = await fetch(imageUrl);
                const arrayBuffer = await imageRes.arrayBuffer();
                buffer = Buffer.from(arrayBuffer);
                mimeType = imageRes.headers.get('content-type') || 'image/jpeg';
              } else {
                const filePath = path.join(process.cwd(), 'data', imageUrl.replace(/^\//, ''));
                buffer = fs.readFileSync(filePath);
                if (imageUrl.endsWith('.png')) mimeType = 'image/png';
              }
              parts.push({
                inlineData: {
                  data: buffer.toString('base64'),
                  mimeType: mimeType
                }
              });
            } catch (imgErr) {
              console.error("Failed to fetch image for AI", imgErr);
            }
          }

          const contents = [...history, { role: 'user', parts }];
          const response = await currentAi.models.generateContent({
            model,
            contents,
            config: { systemInstruction }
          });
          
          history.push({ role: 'user', parts });
          history.push({ role: 'model', parts: [{ text: response.text }] });
          
          if (history.length > 20) {
            history.splice(0, history.length - 20);
          }
          
          return response.text;
        } catch (e: any) {
          console.error(`Gemini API Error (Key: ${key.substring(0, 5)}..., Model: ${model}, Retry: ${retries}):`, e);
          
          const errorMsg = e.message || String(e);
          if (errorMsg.includes('503') || errorMsg.includes('UNAVAILABLE') || errorMsg.includes('high demand')) {
            if (retries < maxRetries) {
               retries++;
               const delay = retries * 2000 + Math.random() * 1000;
               console.log(`Delaying ${delay}ms before retry...`);
               await sleep(delay);
               continue; // Retry this model
            }
          }
          break; // If it's not a 503 or we exhausted retries, break to next model
        }
      }
    }
  }
  throw new Error("Все комбинации ключей и моделей Gemini исчерпаны или заблокированы.");
}

async function loadSettings() {
  const docRef = doc(db, 'settings', 'global');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

const processedMessageIds = new Set<string>();

// Cleanup old messages periodically to prevent memory leak
setInterval(() => {
  processedMessageIds.clear();
}, 60 * 60 * 1000); // clear every hour

async function initBot() {
  const settings = await loadSettings();
  if (!settings || !settings.vkToken) {
    addLog("Ожидание настроек (VK Token)...");
    return;
  }

  let loadedKeys: string[] = [];
  if (Array.isArray(settings.geminiKeys)) {
    loadedKeys = settings.geminiKeys;
  } else if (typeof settings.geminiKeys === 'string') {
    loadedKeys = settings.geminiKeys.split(',').map(k => k.trim()).filter(k => k.length > 0);
  }
  
  if (settings.geminiKey && !loadedKeys.includes(settings.geminiKey)) {
    loadedKeys.push(settings.geminiKey);
  }
  
  geminiKeys = loadedKeys;
  addLog(`Загружено ключей Gemini: ${geminiKeys.length}`);
  
  if (geminiKeys.length === 0) {
    addLog("Ожидание настроек (Gemini Keys)...");
    return;
  }

  if (vk) {
    try { await vk.updates.stop(); } catch(e){}
  }
  
  vk = new VK({
    token: settings.vkToken,
    pollingGroupId: Number(settings.vkGroupId)
  });

  currentKeyIndex = 0;
  ai = new GoogleGenAI({ apiKey: geminiKeys[currentKeyIndex] });

  // Load active session
  const sessionDoc = await getDoc(doc(db, 'sessions', 'active'));
  if (sessionDoc.exists()) {
    const data = sessionDoc.data();
    isGameActive = data.isActive || false;
    currentPlot = data.plotSummary || "";
    if (data.players) {
      players = new Set(data.players);
    }
    if (isGameActive) {
      chatHistory = []; // Reset history, rely on currentPlot
      addLog("Игра восстановлена из базы данных.");
    }
  }

  async function getUserActiveChar(uid: number) {
    const snapshot = await getDocs(query(collection(db, 'characters'), where('ownerId', '==', uid)));
    const chars = snapshot.docs.map(d => ({ id: d.id, ...d.data() as any })).filter((c: any) => !c.deleted);
    let char = chars[chars.length - 1]; // default to latest
    const userDoc = await getDoc(doc(db, 'users', uid.toString()));
    if (userDoc.exists() && userDoc.data().activeCharId) {
      const activeChar = chars.find((c: any) => c.id === userDoc.data().activeCharId);
      if (activeChar) char = activeChar;
    }
    
    if (char && char.rpg && char.charClass) {
      let needsSkillUpdate = false;
      if (!char.rpg.unlockedSkills) { char.rpg.unlockedSkills = []; needsSkillUpdate = true; }
      if (!char.rpg.equippedSkills) { char.rpg.equippedSkills = { active: [], passive: [] }; needsSkillUpdate = true; }
      
      // Force populate skills if they are missing
      const startSkills = CLASS_STARTING_SKILLS[char.charClass] || [];
      const isMissingSkills = char.rpg.unlockedSkills.length === 0 && startSkills.length > 0;
      const isMissingEquipped = char.rpg.equippedSkills.active.length === 0 && char.rpg.equippedSkills.passive.length === 0 && startSkills.length > 0;
      
      if (isMissingSkills || isMissingEquipped) {
        const eqActive: string[] = [];
        const eqPassive: string[] = [];
        
        // Ensure all start skills are unlocked
        startSkills.forEach((sId: string) => {
          if (!char.rpg.unlockedSkills.includes(sId)) {
            char.rpg.unlockedSkills.push(sId);
          }
        });

        // Ensure skills are equipped if not already
        if (isMissingEquipped) {
           char.rpg.unlockedSkills.forEach((sId: string) => {
             const sData = SKILL_CATALOG[sId];
             if (sData) {
               if (sData.isPassive && eqPassive.length < 6) eqPassive.push(sId);
               else if (!sData.isPassive && eqActive.length < 6) eqActive.push(sId);
             }
           });
           char.rpg.equippedSkills = { active: eqActive, passive: eqPassive };
        }
        
        char.rpg.customSkills = []; // delete legacy skills
        needsSkillUpdate = true;
      }
      
      if (needsSkillUpdate) {
        await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
      }
    }
    return char;
  }

  vk.updates.on('message_new', async (context) => {
    console.log(`[VK EVENT message_new] Received message from ${context.senderId}, text: ${context.text}, id: ${context.id}, convMsgId: ${context.conversationMessageId}`);
    if (context.isOutbox) return;
    
    // Deduplication check to prevent multiple instances from replying
    const uniqueMsgId = context.id || context.conversationMessageId;
    if (uniqueMsgId) {
       const msgIdKey = `${context.peerId}_${uniqueMsgId}`;
       if (processedMessageIds.has(msgIdKey)) {
           console.log(`[Deduplication] Message ${msgIdKey} already processed. Skipping.`);
           return;
       }
       processedMessageIds.add(msgIdKey);
    }

    const senderId = context.senderId;
    const now = Date.now();

    const text = context.text?.toLowerCase().trim() || "";
    
    // Admin command to trigger event
    if (text === '!stone_event') {
        globalEvents.creatorStoneClaimed = false;
        const allChars = await getDocs(collection(db, 'characters'));
        const keyboard = Keyboard.builder()
            .textButton({ label: 'Принять', payload: { command: 'event_claim' }, color: Keyboard.POSITIVE_COLOR })
            .inline();
        
        allChars.forEach(async (doc) => {
             try {
                const parts = doc.id.split('_');
                const userId = parts[1];
                await vk!.api.messages.send({
                    user_id: Number(userId),
                    random_id: Date.now(),
                    message: '📢 МИРОВОЕ СОБЫТИЕ: Камень Создания обнаружен! Кто первый нажмет на кнопку, получит его!',
                    keyboard
                });
             } catch(e) { console.error(`Error sending to ${doc.id}:`, e); }
        });
        await context.send({ message: 'Событие запущено!' });
        return;
    }

    const hasPhoto = context.hasAttachments('photo');
    
    if (!text && !hasPhoto) return;
    
    console.log(`[DEBUG] Current Sender ID: ${senderId}`);

    // Check active character
    const charsSnapshot = await getDocs(query(collection(db, 'characters'), where('ownerId', '==', senderId)));
    let activeChar = charsSnapshot.docs.map(d => ({ id: d.id, ...d.data() as any })).find((c: any) => !c.deleted);
    const userDoc = await getDoc(doc(db, 'users', senderId.toString()));
    if (userDoc.exists() && userDoc.data().activeCharId) {
       const userChar = charsSnapshot.docs.map(d => ({ id: d.id, ...d.data() as any })).find((c: any) => c.id === userDoc.data().activeCharId && !c.deleted);
       if (userChar) activeChar = userChar;
    }

    if (activeChar && activeChar.rpg && activeChar.rpg.level) {
       const expectedChoices = Math.floor(activeChar.rpg.level / 2);
       const choicesMade = activeChar.rpg.skillChoicesMade || 0;
       
       if (expectedChoices > choicesMade) {
          const pAction = context.messagePayload?.action;
          
          if (pAction === 'take_level_skill') {
             const chosenSkillId = context.messagePayload.skillId;
             if (!activeChar.rpg.unlockedSkills) activeChar.rpg.unlockedSkills = [];
             if (!activeChar.rpg.unlockedSkills.includes(chosenSkillId)) {
                activeChar.rpg.unlockedSkills.push(chosenSkillId);
             }
             activeChar.rpg.skillChoicesMade = choicesMade + 1;
             activeChar.rpg.pendingSkillChoiceOptions = null;
             await safeSetDoc(doc(db, 'characters', activeChar.id), { rpg: JSON.parse(JSON.stringify(activeChar.rpg)) }, { merge: true });
             
             await context.send(`✨ Вы успешно изучили новый навык! Экипировать навыки можно в меню "Навыки".`);
             userLocks.delete(senderId);
             return;
          } else if (pAction === 'view_level_skill') {
             const skillId = context.messagePayload.skillId;
             const skill = SKILL_CATALOG[skillId];
             if (skill) {
                 const kb = Keyboard.builder()
                   .textButton({ label: '✅ Взять навык', payload: { action: 'take_level_skill', skillId }, color: Keyboard.POSITIVE_COLOR })
                   .row()
                   .textButton({ label: '🔙 Вернуться к выбору', payload: { action: 'back_to_level_skill' }, color: Keyboard.SECONDARY_COLOR });
                   
                 let msg = `📖 Навык: ${skill.name}\n\n📝 Описание: ${skill.description}\n💪 Эффект: Пассивный\n`;
                 if (!skill.isPassive) {
                    msg = `📖 Навык: ${skill.name}\n\n📝 Описание: ${skill.description}\n💥 Урон/Сила: ${skill.power || 0}\n💧 Мана: ${skill.mpCost || 0}\n⏳ Перезарядка: ${skill.cooldown || 2} ход.\n`;
                 }
                 await context.send({ message: msg, keyboard: kb });
             } else {
                 await context.send('Ошибка: Навык не найден.');
             }
             userLocks.delete(senderId);
             return;
          } else if (pAction === 'back_to_level_skill') {
             // Fall through
          } else if (context.messagePayload || text) {
             // Show warning
             await context.send('🌟 Сначала вам нужно выбрать классовый навык за повышение уровня!');
          }
          
          // Show choices
          if (!activeChar.rpg.pendingSkillChoiceOptions || activeChar.rpg.pendingSkillChoiceOptions.length === 0) {
              const allClassSkills = CLASS_LEVEL_SKILLS[activeChar.charClass] || [];
              const unowned = allClassSkills.filter(sid => !(activeChar.rpg.unlockedSkills || []).includes(sid));
              const shuffled = [...unowned].sort(() => 0.5 - Math.random());
              activeChar.rpg.pendingSkillChoiceOptions = shuffled.slice(0, 3);
              await safeSetDoc(doc(db, 'characters', activeChar.id), { rpg: JSON.parse(JSON.stringify(activeChar.rpg)) }, { merge: true });
          }
          
          const opts = activeChar.rpg.pendingSkillChoiceOptions;
          if (opts && opts.length > 0) {
             let kb = Keyboard.builder();
             opts.forEach(sid => {
                 const s = SKILL_CATALOG[sid];
                 if (s) {
                     kb.textButton({ label: s.name.substring(0, 40), payload: { action: 'view_level_skill', skillId: sid }, color: s.isPassive ? Keyboard.SECONDARY_COLOR : Keyboard.PRIMARY_COLOR }).row();
                 }
             });
             await context.send({ message: `🌟 Вы повышены в уровне! Доступен новый навык. Нажмите на название, чтобы посмотреть детали:`, keyboard: kb });
             userLocks.delete(senderId);
             return;
          } else {
             // Out of skills
             activeChar.rpg.skillChoicesMade = choicesMade + 1;
             await safeSetDoc(doc(db, 'characters', activeChar.id), { rpg: JSON.parse(JSON.stringify(activeChar.rpg)) }, { merge: true });
          }
       }
    }

    if (activeChar && activeChar.rpg && activeChar.rpg.level >= 20 && !activeChar.subclass && activeChar.charClass) {
       const subs = SUBCLASSES[activeChar.charClass];
       if (subs && subs.length > 0) {
          const pAction = context.messagePayload?.action;
          if (pAction === 'choose_subclass') {
             activeChar.subclass = context.messagePayload.subclass;
             await safeSetDoc(doc(db, 'characters', activeChar.id), { subclass: activeChar.subclass }, { merge: true });
             await context.send(`🎉 Вы успешно получили власть подкласса: ${activeChar.subclass}! Новые возможности скоро откроются!`);
             userLocks.delete(senderId);
             return;
          }
          
          if (context.messagePayload || text) {
             await context.send('🌟 Сначала вам нужно выбрать подкласс!');
          }
          
          const kb = Keyboard.builder();
          subs.forEach(s => {
             kb.textButton({ label: s, payload: { action: 'choose_subclass', subclass: s }, color: Keyboard.PRIMARY_COLOR }).row();
          });
          await context.send({ message: `🌟 Вы достигли 20 уровня! Пришло время выбрать узкую специализацию (подкласс) для вашего класса (${activeChar.charClass}):`, keyboard: kb });
          userLocks.delete(senderId);
          return;
       }
    }

    // Admin Command
    if (text === 'воскресить_каина') {
        // Query to find character by name, trying both possible names
        const charsSnapshotKain = await getDocs(query(collection(db, 'characters')));
        const kainChar = charsSnapshotKain.docs.find(d => {
            const data = d.data() as any;
            return data.name === 'Каин' || data.name === 'Kain';
        });

        if (kainChar) {
            const charData = kainChar.data() as any;
            charData.rpg.baseStats.hp = charData.rpg.baseStats.maxHp;
            charData.rpg.deathState = 'alive';
            charData.actionType = null;
            charData.actionEndTime = Date.now() - 1000;
            await safeSetDoc(doc(db, 'characters', kainChar.id), charData, { merge: true });
            await context.send("✨ Каин воскрешен. БОГ ВЫКЛЮЧЕН.");
        } else {
            await context.send("Каин не найден.");
        }
        return;
    }

    if (activeChar && (activeChar.actionType === 'dead' || activeChar.rpg.deathState === 'dead') && activeChar.actionEndTime > Date.now()) {

        await context.send(`💀 Вы мертвы и не можете ничего делать еще ${Math.ceil((activeChar.actionEndTime - Date.now()) / 60000)} минут.`);
        return;
    }

    // Kain/Elara Event
    if (activeChar && (activeChar.name === 'Каин' || activeChar.name === 'Kain')) {
        console.log(`[DEBUG] Kain event check. Stage: ${activeChar.rpg.elaraEventStage}`);
        if (!activeChar.rpg.elaraEventStage) {
            console.log(`[DEBUG] Triggering Kain event stage 1.`);
            activeChar.rpg.elaraEventStage = 1;
            await safeSetDoc(doc(db, 'characters', activeChar.id), { rpg: JSON.parse(JSON.stringify(activeChar.rpg)) }, { merge: true });
            
            await context.send("✨ Внезапно, между вами появляется Элара с группой крепких мужчин.");
            await new Promise(r => setTimeout(r, 1500));
            await context.send("✨ Элара: 'Каин, ты слишком слаб. Это зелье сделает тебя сильнее... или убьет.'");
            return;
        } else if (activeChar.rpg.elaraEventStage === 1) {
            console.log(`[DEBUG] Triggering Kain event stage 2.`);
            activeChar.rpg.elaraEventStage = 2;
            
            await context.send("✨ Элара: 'Держите его!'");
            await new Promise(r => setTimeout(r, 1500));
            
            // Forced drinking
            await context.send("💀 Вы пытаетесь сопротивляться, но крепкие руки мужиков зажимают вас. Элара силой вливает пузырек вам в рот. Это яд! Элара убила тебя!");
            activeChar.rpg.baseStats.hp = 0;
            activeChar.rpg.deathState = 'dead';
            activeChar.actionType = 'dead';
            activeChar.actionEndTime = Date.now() + 3600 * 1000; // 1 hour sleep/death
            await safeSetDoc(doc(db, 'characters', activeChar.id), { 
                rpg: JSON.parse(JSON.stringify(activeChar.rpg)), 
                actionEndTime: activeChar.actionEndTime,
                actionType: activeChar.actionType 
            }, { merge: true });
            
            await context.send("✨ Элара: *громко смеется* 'Какой дурак! Никто не выживает после моего отвара!' — кричит она, разворачиваясь и уходя прочь в компании своих дружков.");
            return;
        } else if (activeChar.rpg.elaraEventStage === 2) {
            console.log(`[DEBUG] Triggering Kain sword event.`);
            activeChar.rpg.elaraEventStage = 3;
            await safeSetDoc(doc(db, 'characters', activeChar.id), { rpg: JSON.parse(JSON.stringify(activeChar.rpg)) }, { merge: true });
            
            const kb = Keyboard.builder()
                .textButton({ label: '⚔️ Достать меч', payload: { command: 'kain_sword_take' }, color: Keyboard.NEGATIVE_COLOR })
                .textButton({ label: '🏃 Уйти', payload: { command: 'kain_sword_leave' }, color: Keyboard.PRIMARY_COLOR });

            await context.send("🗡️ Проходя мимо руин, вы замечаете воткнутый в землю меч, окутанный темной аурой. Это меч Павшего Короля Демонов.");
            await context.send("Что будете делать?", { keyboard: kb });
            return;
        }
    }    
    if (activeChar && activeChar.actionEndTime && activeChar.actionEndTime > Date.now()) {
      if (activeChar.actionType === 'travel' || activeChar.actionType === 'ai_timer' || activeChar.actionType === 'dead') {
         const remainingSeconds = Math.ceil((activeChar.actionEndTime - Date.now()) / 1000);
         userLocks.delete(senderId);
         if (activeChar.actionType === 'dead') {
             await context.send(`💀 Вы мертвы и не можете ничего делать еще ${Math.ceil(remainingSeconds/60)} минут.`);
         } else {
             await context.send(`⏳ Вы в пути! До прибытия осталось ${remainingSeconds} сек.`);
         }
         return; // Do not process game commands while travelling or dead
      }
    }

    if (userLocks.has(senderId)) {
      // User is already processing a command, ignore new ones
      return;
    }
    userLocks.add(senderId);

    try {
      let isCreator = false;
    let userName = "Игрок";
    try {
      const [user] = await vk!.api.users.get({ user_ids: [senderId] });
      if (user) {
        userName = `${user.first_name} ${user.last_name}`;
        if (senderId === Number(settings.creatorId) || (user.first_name === 'Marat' && user.last_name === 'Zubayraev')) {
          isCreator = true;
        }
      }
    } catch (e) {}

    let payloadCommand = context.messagePayload?.command;
    let payloadAction = context.messagePayload?.action;
    const payloadItemId = context.messagePayload?.itemId;

    if (payloadCommand === 'select_char') {
      const charId = context.messagePayload.id;
      await safeSetDoc(doc(db, 'users', senderId.toString()), { activeCharId: charId }, { merge: true });
      const charDoc = await getDoc(doc(db, 'characters', charId));
      if (charDoc.exists()) {
        await context.send(`✅ Ты выбрал персонажа: ${charDoc.data().name}`);
      }
      return;
    }

    if (payloadAction) {
      try {
        const snapshot = await getDocs(query(collection(db, 'characters'), where('ownerId', '==', senderId)));
        const chars = snapshot.docs.map(d => ({ id: d.id, ...d.data() as any })).filter((c: any) => !c.deleted);
        if (chars.length === 0) return;
        
        let char = chars[chars.length - 1];
        const userDoc = await getDoc(doc(db, 'users', senderId.toString()));
        if (userDoc.exists() && userDoc.data().activeCharId) {
          const activeChar = chars.find((c: any) => c.id === userDoc.data().activeCharId);
          if (activeChar) char = activeChar;
        }

        if (!char.rpg) char.rpg = DEFAULT_RPG_DATA;

          if (char.rpg.inventory) {
              char.rpg.inventory = char.rpg.inventory.filter(i => {
                 const item = getItem(i.itemId);
                 if (!item) return false;
                 // user says "удали сюжетные вещи" -> type === 'story'
                 if (item.type === ('story' as any) || item.type === ('quest' as any)) return false;
                 return true;
              });
          }


        if (payloadAction === 'buy') {
          const item = getItem(payloadItemId);
          if (!item) return;

          if ((char.gold || 0) < item.price) {
            await context.send(`❌ Недостаточно золота! Нужно ${item.price} 💰, а у тебя ${char.gold || 0} 💰.`);
            return;
          }

          char.gold = (char.gold || 0) - item.price;
          const existing = char.rpg.inventory.find((i: any) => i.itemId === payloadItemId);
          if (existing) {
            existing.amount += 1;
          } else {
            if (char.rpg.inventory.length >= 30) {
              await context.send(`❌ Инвентарь полон! Максимум 30 разных предметов.`);
              return;
            }
            char.rpg.inventory.push({ itemId: payloadItemId, amount: 1 });
          }

          await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          
          const cat = context.messagePayload.cat;
          const keyboard = Keyboard.builder()
            .textButton({ label: '🔙 Назад в лавку', payload: { command: 'shop_cat', cat }, color: Keyboard.PRIMARY_COLOR })
            ;
            
          await context.send({ message: `✅ Ты успешно купил ${item.name} за ${item.price} 💰!`, keyboard });
          return;
        }

        if (payloadAction === 'view_merchant') {
          const item = getItem(payloadItemId);
          if (!item) return;
          const { slots } = parseItemId(payloadItemId);
          const customPrice = context.messagePayload.price || item.price;
          
          let statsStr = '';
          if (item.stats) {
             if (item.stats.attack) statsStr += `⚔️ Атака: +${item.stats.attack}\n`;
             if (item.stats.magicAttack) statsStr += `🔮 Маг. Атака: +${item.stats.magicAttack}\n`;
             if (item.stats.defense) statsStr += `🛡️ Защита: +${item.stats.defense}\n`;
             if (item.stats.magicDefense) statsStr += `🪄 Маг. Защита: +${item.stats.magicDefense}\n`;
             if (item.stats.maxHp) statsStr += `❤️ Здоровье: +${item.stats.maxHp}\n`;
             if (item.stats.maxMp) statsStr += `💧 Мана: +${item.stats.maxMp}\n`;
             if (item.stats.agility) statsStr += `🏃 Ловкость: +${item.stats.agility}\n`;
          }
          if (item.healAmount) statsStr += `❤️ Восстанавливает: ${item.healAmount} ХП\n`;
          if (slots > 0) statsStr += `\n💎 Доступно слотов: ${slots}\n`;
          if (item.allowedClasses && item.allowedClasses.length > 0) {
            statsStr += `\nДоступно классам: ${item.allowedClasses.join(', ')}\n`;
          }

          const kb = Keyboard.builder()
            .textButton({ label: '💰 Купить', payload: { action: 'buy_merchant', itemId: payloadItemId, price: customPrice }, color: Keyboard.POSITIVE_COLOR })
            .textButton({ label: '⬅️ Назад', payload: { command: 'explore_merchant_back' }, color: Keyboard.SECONDARY_COLOR });
            
          await context.send({ message: `📦 ${item.name}${slots > 0 ? ' [1 Слот]' : ''}\nТип: ${item.type}\nРедкость: ${item.rarity}\n\n${statsStr}📝 ${item.description}\n\n💰 Цена: ${customPrice} золота`, keyboard: kb });
          return;
        }

        if (payloadCommand === 'explore_merchant_back') {
            if (!char.rpg.exploreMerchantItems || char.rpg.exploreMerchantItems.length === 0) {
                await context.send({ message: 'Торговец уже ушел.', keyboard: getWildKeyboard(char) });
                return;
            }
            let msg = `🛒 Странствующий торговец\n"Смотри, что у меня есть, путник!"\nТвое золото: ${char.gold || 0} 💰\n\n`;
            const keyboard = Keyboard.builder();
            
            char.rpg.exploreMerchantItems.forEach((itemIdStr: string, index: number) => {
               const iT = getItem(itemIdStr);
               if (iT) {
                  let displayPrice = iT.price;
                  if (iT.type === 'consumable') displayPrice = displayPrice * 2;
                  
                  msg += `${index + 1}. ${iT.name} — ${displayPrice} 💰\n`;
                  keyboard.textButton({ label: `${index + 1}`, payload: { action: 'view_merchant', itemId: itemIdStr, price: displayPrice }, color: Keyboard.SECONDARY_COLOR });
                  if ((index + 1) % 4 === 0) keyboard.row();
               }
            });
            keyboard.row().textButton({ label: '⬅️ Уйти', payload: { command: 'explore_leave' }, color: Keyboard.SECONDARY_COLOR });
            await context.send({ message: msg, keyboard });
            return;
        }

        if (payloadAction === 'buy_merchant') {
          const item = getItem(payloadItemId);
          if (!item) return;

          const customPrice = context.messagePayload.price || item.price;

          if ((char.gold || 0) < customPrice) {
            await context.send(`❌ Недостаточно золота! Нужно ${customPrice} 💰, а у тебя ${char.gold || 0} 💰.`);
            return;
          }

          char.gold = (char.gold || 0) - customPrice;
          const existing = char.rpg.inventory.find((i: any) => i.itemId === payloadItemId);
          if (existing) {
            existing.amount += 1;
          } else {
            if (char.rpg.inventory.length >= 30) {
              await context.send(`❌ Инвентарь полон! Максимум 30 разных предметов.`);
              return;
            }
            char.rpg.inventory.push({ itemId: payloadItemId, amount: 1 });
          }

          // Generate merchant keyboard again to let player buy more
          let msg = `🛒 Странствующий торговец\n"Смотри, что у меня есть, путник!"\nТвое золото: ${char.gold || 0} 💰\n\n`;
          const keyboard = Keyboard.builder();
          
          if (char.rpg.exploreMerchantItems) {
            char.rpg.exploreMerchantItems.forEach((itemIdStr: string, index: number) => {
               const iT = getItem(itemIdStr);
               if (iT) {
                  let displayPrice = iT.price;
                  if (iT.type === 'consumable') displayPrice = displayPrice * 2;
                  
                  msg += `${index + 1}. ${iT.name} — ${displayPrice} 💰\n`;
                  keyboard.textButton({ label: `${index + 1}`, payload: { action: 'view_merchant', itemId: itemIdStr, price: displayPrice }, color: Keyboard.SECONDARY_COLOR });
                  if ((index + 1) % 4 === 0) keyboard.row();
               }
            });
          }
          keyboard.row().textButton({ label: '⬅️ Уйти', payload: { command: 'explore_leave' }, color: Keyboard.SECONDARY_COLOR });

          await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          await context.send({ message: `✅ Ты успешно купил ${item.name} за ${customPrice} 💰!\n\n${msg}`, keyboard });
          return;
        }

        let result = { success: false, message: 'Ошибка' };
        if (payloadAction === 'equip') result = equipItem(char.rpg, payloadItemId, char.charClass);
        else if (payloadAction === 'unequip') result = unequipItem(char.rpg, payloadItemId);
        else if (payloadAction === 'use') result = useItem(char.rpg, payloadItemId);

        if (result.success) {
          await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
        }
        
        if (payloadAction === 'equip' || payloadAction === 'unequip') {
          const category = context.messagePayload.category;
          const backCommand = category ? `eq_cat_${category}` : 'equipment';
          const keyboard = Keyboard.builder()
            .textButton({ label: '🔙 Вернуться', payload: { command: backCommand }, color: Keyboard.PRIMARY_COLOR })
            ;
          await context.send({ message: result.message, keyboard });
        } else if (payloadAction === 'use') {
          const keyboard = Keyboard.builder()
            .textButton({ label: '🔙 Вернуться в инвентарь', payload: { command: 'inventory' }, color: Keyboard.PRIMARY_COLOR })
            ;
          await context.send({ message: result.message, keyboard });
        } else {
          await context.send(result.message);
        }
      } catch (e) {
        console.error("Action error", e);
      }
      return;
    }

    if (['мои персонажи', 'сменить персонажа', 'персонажи'].includes(text)) {
      const snapshot = await getDocs(query(collection(db, 'characters'), where('ownerId', '==', senderId)));
      const chars = snapshot.docs.map(d => ({ id: d.id, ...d.data() as any })).filter((c: any) => !c.deleted);
      
      if (chars.length === 0) {
        await context.send('У тебя нет активных персонажей. Напиши "создать персонажа".');
        return;
      }
      
      const keyboard = Keyboard.builder();
      chars.forEach((c: any, index: number) => {
        keyboard.textButton({
          label: c.name.substring(0, 40),
          payload: { command: 'select_char', id: c.id },
          color: Keyboard.PRIMARY_COLOR
        });
        if (index % 2 !== 0 && index !== chars.length - 1) keyboard.row();
      });
      
      await context.send({
        message: 'Выбери персонажа:',
        keyboard: keyboard
      });
      return;
    }

    // PvP Commands
    if (text.startsWith('пвп вызов ')) {
      const targetName = text.replace('пвп вызов ', '').trim().toLowerCase();
      console.log(`Searching for character: '${targetName}'`);
      
      // Get all characters to perform a robust search on the server side
      const snapshot = await getDocs(collection(db, 'characters'));
      const targetChar = snapshot.docs.find(doc => {
        const data = doc.data();
        if (data.deleted) return false;
        const charName = (data.name || '').toLowerCase();
        return charName.includes(targetName);
      });

      if (!targetChar) {
        await context.send(`Персонаж, похожий на '${targetName}', не найден.`);
        return;
      }
      
      const targetId = targetChar.data().ownerId;
      if (targetId === senderId) {
        await context.send(`Вы не можете вызвать самого себя на дуэль.`);
        return;
      }

      const challengerChar = await getUserActiveChar(senderId);
      if (!challengerChar) {
        await context.send(`У вас нет активного персонажа.`);
        return;
      }

      if (targetChar.data().rpg?.location !== challengerChar.rpg?.location) {
        await context.send(`Вы должны находиться в одной локации с ${targetChar.data().name}, чтобы вызвать его на дуэль.`);
        return;
      }

      pvpChallenges.set(targetId, senderId);
      await context.send(`Вы вызвали ${targetChar.data().name} на PvP!`);
      
      if (vk) {
        await vk.api.messages.send({
          peer_id: targetId,
          message: `⚔️ Игрок ${challengerChar.name} вызывает вас на дуэль! Напишите "принять", чтобы начать бой.`,
          random_id: Date.now()
        });
      }
      return;
    }

    if (text === 'принять' && pvpChallenges.has(senderId)) {
      const challengerId = pvpChallenges.get(senderId)!;
      pvpChallenges.delete(senderId);
      
      const challengerChar = await getUserActiveChar(challengerId);
      const targetChar = await getUserActiveChar(senderId);
      
      if (!challengerChar || !targetChar) {
        await context.send('Ошибка: один из персонажей не найден или удален.');
        return;
      }
      
      const c1Stats = calculateTotalStats(challengerChar.rpg || DEFAULT_RPG_DATA);
      const c2Stats = calculateTotalStats(targetChar.rpg || DEFAULT_RPG_DATA);

      const hp = new Map<number, number>([
        [challengerId, c1Stats.hp],
        [senderId, c2Stats.hp]
      ]);
      const names = new Map<number, string>([
        [challengerId, challengerChar.name],
        [senderId, targetChar.name]
      ]);
      const defending = new Map<number, boolean>([
        [challengerId, false],
        [senderId, false]
      ]);
      
      // Determine turn based on agility
      const challengerAgi = c1Stats.agility || 10;
      const targetAgi = c2Stats.agility || 10;
      const firstTurn = challengerAgi >= targetAgi ? challengerId : senderId;
      
      const sharedPvPObj = { hp, names, defending, turn: firstTurn };
      activePvP.set(senderId, { ...sharedPvPObj, opponentId: challengerId });
      activePvP.set(challengerId, { ...sharedPvPObj, opponentId: senderId });
      
      await context.send(`PvP началось! Первым ходит ${firstTurn === senderId ? targetChar.name : challengerChar.name}.`);
      await sendPvPKeyboard(firstTurn, activePvP.get(firstTurn));
      return;
    }

async function sendPvPKeyboard(userId: number, pvp: any) {
  const keyboard = Keyboard.builder()
    .textButton({ label: '⚔️ Атаковать', payload: { command: 'pvp_attack' }, color: Keyboard.PRIMARY_COLOR })
    .textButton({ label: '✨ Навыки', payload: { command: 'pvp_skills' }, color: Keyboard.PRIMARY_COLOR })
    .row()
    .textButton({ label: '🛡️ Защита', payload: { command: 'pvp_defend' }, color: Keyboard.SECONDARY_COLOR })
    .textButton({ label: '🏃 Сбежать', payload: { command: 'pvp_flee' }, color: Keyboard.NEGATIVE_COLOR })
    ;
    
  const opponentId = pvp.opponentId;
  const message = `⚔️ PvP Битва!\n\n` +
                  `Ваше HP: ${pvp.hp.get(userId)}\n` +
                  `${pvp.names.get(opponentId)} HP: ${pvp.hp.get(opponentId)}\n\n` +
                  `Сейчас ход: ${pvp.turn === userId ? 'Ваш' : pvp.names.get(pvp.turn)}`;
                  
  if (vk) {
    await vk.api.messages.send({
      peer_id: userId,
      message,
      keyboard: keyboard,
      random_id: Date.now()
    });
  }
}

// ... (inside message handler, after PvP commands)
    if (activePvP.has(senderId)) {
      const pvp = activePvP.get(senderId)!;
      const opponentId = pvp.opponentId;
      if (pvp.turn !== senderId) {
        await context.send('Сейчас не ваш ход.');
        return;
      }
      
      const action = payloadCommand;
      if (action === 'pvp_attack') {
        const char = await getUserActiveChar(senderId);
        const oppChar = await getUserActiveChar(opponentId);
        const stats = calculateTotalStats(char?.rpg || DEFAULT_RPG_DATA);
        const oppStats = calculateTotalStats(oppChar?.rpg || DEFAULT_RPG_DATA);
        
        let damage = Math.max(1, stats.attack - (oppStats.defense || 0));
        damage = Math.floor(damage * (0.8 + Math.random() * 0.4)); // Variance
        
        if (pvp.defending.get(opponentId)) {
          damage = Math.max(1, Math.floor(damage / 2));
          pvp.defending.set(opponentId, false);
          await context.send(`Противник защитился! Урон снижен.`);
        }
        
        let opponentHp = pvp.hp.get(opponentId)!;
        opponentHp -= damage;
        pvp.hp.set(opponentId, Math.max(0, opponentHp));
        
        await context.send(`Вы атаковали и нанесли ${damage} урона!`);
        
        if (opponentHp <= 0) {
          await context.send(`Победа! ${pvp.names.get(opponentId)} повержен.`);
          
          if (oppChar && oppChar.rpg) {
             oppChar.rpg.baseStats.hp = 0;
             oppChar.rpg.deathState = 'waiting_revive';
             oppChar.rpg.deathEndTime = Date.now() + 10 * 60000;
             await safeSetDoc(doc(db, 'characters', oppChar.id), { rpg: JSON.parse(JSON.stringify(oppChar.rpg)) }, { merge: true });
             if (vk) {
               await vk.api.messages.send({
                 peer_id: opponentId,
                 random_id: Date.now(),
                 message: `💀 Вы были повержены в PvP... Вы тяжело ранены и истекаете кровью.`
               });
             }
          }
          
          activePvP.delete(senderId);
          activePvP.delete(opponentId);
          return;
        }
        
        // Switch turn
        activePvP.get(senderId)!.turn = opponentId;
        activePvP.get(opponentId)!.turn = opponentId;
        await sendPvPKeyboard(opponentId, activePvP.get(opponentId));
        return;
      } else if (action === 'pvp_defend') {
        pvp.defending.set(senderId, true);
        await context.send('Вы встали в защитную стойку!');
        activePvP.get(senderId)!.turn = opponentId;
        activePvP.get(opponentId)!.turn = opponentId;
        await sendPvPKeyboard(opponentId, activePvP.get(opponentId));
        return;
      } else if (action === 'pvp_skills') {
        const char = await getUserActiveChar(senderId);
        if (!char || !char.rpg) return;
        
        const keyboard = Keyboard.builder();
        const activeSkills = char.rpg.equippedSkills?.active || [];
        const customSkills = char.rpg.customSkills || [];
        
        if (activeSkills.length === 0) {
          keyboard.textButton({ label: '🔙 Назад', payload: { command: 'pvp_menu' }, color: Keyboard.SECONDARY_COLOR });
          await context.send({ message: 'У вас нет экипированных активных навыков!', keyboard: keyboard });
          return;
        }
        
        activeSkills.forEach((sId: string) => {
          const skill = SKILL_CATALOG[sId] || customSkills.find((s: any) => s.id === sId);
          if (skill) {
            keyboard.textButton({ label: `${skill.name} ${skill.mpCost ? `(${skill.mpCost}💧)` : ''}`, payload: { command: 'pvp_use_skill', skillId: sId }, color: Keyboard.POSITIVE_COLOR });
            keyboard.row();
          }
        });
        keyboard.textButton({ label: '🔙 Назад', payload: { command: 'pvp_menu' }, color: Keyboard.SECONDARY_COLOR });
        
        await context.send({ message: 'Выберите навык:', keyboard: keyboard });
        return;
      } else if (action === 'pvp_menu') {
        await sendPvPKeyboard(senderId, pvp);
        return;
      } else if (action === 'pvp_use_skill') {
        const skillId = context.messagePayload.skillId;
        const char = await getUserActiveChar(senderId);
        const oppChar = await getUserActiveChar(opponentId);
        if (!char || !char.rpg) return;
        
        const customSkills = char.rpg.customSkills || [];
        const skill = SKILL_CATALOG[skillId] || customSkills.find((s: any) => s.id === skillId);
        
        if (!skill) {
          await context.send('Навык не найден.');
          return;
        }
        
        const stats = calculateTotalStats(char.rpg);
        const oppStats = calculateTotalStats(oppChar?.rpg || DEFAULT_RPG_DATA);
        
        let damage = 0;
        if (skill.type === 'damage') {
           const baseAttack = skill.damageType === 'magical' ? stats.magicAttack : stats.attack;
           const targetDef = skill.damageType === 'magical' ? (oppStats.magicDefense || 0) : (oppStats.defense || 0);
           damage = Math.max(1, (baseAttack * (skill.power / 100)) - targetDef);
           damage = Math.floor(damage * (0.8 + Math.random() * 0.4));
        } else if (skill.type === 'heal') {
           let heal = skill.power || 20;
           let currentHp = pvp.hp.get(senderId)!;
           pvp.hp.set(senderId, Math.min(stats.hp, currentHp + heal));
           await context.send(`Вы использовали ${skill.name} и восстановили ${heal} HP!`);
        }
        
        if (damage > 0) {
          if (pvp.defending.get(opponentId)) {
            damage = Math.max(1, Math.floor(damage / 2));
            pvp.defending.set(opponentId, false);
            await context.send(`Противник защитился! Урон снижен.`);
          }
          
          let opponentHp = pvp.hp.get(opponentId)!;
          opponentHp -= damage;
          pvp.hp.set(opponentId, Math.max(0, opponentHp));
          await context.send(`Вы использовал ${skill.name} и нанесли ${damage} урона!`);
        }
        
        let opponentHp = pvp.hp.get(opponentId)!;
        if (opponentHp <= 0) {
          await context.send(`Победа! ${pvp.names.get(opponentId)} повержен.`);
          
          if (oppChar && oppChar.rpg) {
             oppChar.rpg.baseStats.hp = 0;
             oppChar.rpg.deathState = 'waiting_revive';
             oppChar.rpg.deathEndTime = Date.now() + 10 * 60000;
             await safeSetDoc(doc(db, 'characters', oppChar.id), { rpg: JSON.parse(JSON.stringify(oppChar.rpg)) }, { merge: true });
             if (vk) {
               await vk.api.messages.send({
                 peer_id: opponentId,
                 random_id: Date.now(),
                 message: `💀 Вы были повержены в PvP... Вы тяжело ранены и истекаете кровью.`
               });
             }
          }
          
          activePvP.delete(senderId);
          activePvP.delete(opponentId);
          return;
        }
        
        // Switch turn
        activePvP.get(senderId)!.turn = opponentId;
        activePvP.get(opponentId)!.turn = opponentId;
        await sendPvPKeyboard(opponentId, activePvP.get(opponentId));
        return;
      } else if (action === 'pvp_flee') {
        await context.send('Вы сбежали с поля боя!');
        if (vk) {
          await vk.api.messages.send({
            peer_id: opponentId,
            message: `${pvp.names.get(senderId)} сбежал с поля боя! Вы победили.`,
            random_id: Date.now()
          });
        }
        activePvP.delete(senderId);
        activePvP.delete(opponentId);
        return;
      }
      // ... other actions
    }

    if (payloadCommand === 'team_combat_action') {
      const { action, targetUid, combatId } = context.messagePayload;
      const combat = activeTeamCombats.get(combatId);
      if (!combat) {
        await context.send('Бой уже завершен или не найден.');
        return;
      }

      const currentEntity = combat.turnOrder[combat.turnIndex % combat.turnOrder.length];
      if (currentEntity.id !== senderId) {
        await context.send('Сейчас не ваш ход!');
        return;
      }

      const char = await getUserActiveChar(senderId);
      const stats = calculateTotalStats(char?.rpg || DEFAULT_RPG_DATA);

      if (action === 'attack') {
        const target = combat.enemies.find(e => e.uid === targetUid);
        if (!target || target.currentHp <= 0) {
          await context.send('Цель мертва или не найдена.');
          return;
        }

        const hitRoll = Math.floor(Math.random() * 20) + 1;
        if (hitRoll === 1) {
          combat.combatLog = `⚔️ ${currentEntity.name} критически промахивается по ${target.name}!\n`;
        } else {
          const hitChance = hitRoll + Math.floor(stats.agility / 2);
          const enemyEvasion = 10 + Math.floor(target.agility / 2);
          if (hitRoll === 20 || hitChance >= enemyEvasion) {
            let dmg = Math.max(1, stats.attack + Math.floor(Math.random() * 4) + 1 - target.defense);
            if (hitRoll === 20) {
              dmg *= 2;
              combat.combatLog = `💥 КРИТИЧЕСКОЕ ПОПАДАНИЕ! ${currentEntity.name} наносит ${dmg} урона ${target.name}!\n`;
            } else {
              combat.combatLog = `⚔️ ${currentEntity.name} наносит ${dmg} урона ${target.name}.\n`;
            }
            target.currentHp = Math.max(0, target.currentHp - dmg);
          } else {
            combat.combatLog = `💨 ${currentEntity.name} промахивается по ${target.name}.\n`;
          }
        }
      } else if (action === 'defend') {
        combat.playerDefending.set(senderId, true);
        combat.combatLog = `🛡️ ${currentEntity.name} встает в защитную стойку.\n`;
      }

      // Broadcast action
      for (const pid of combat.players) {
        await vk!.api.messages.send({ peer_id: pid, random_id: Date.now(), message: combat.combatLog });
      }

      combat.turnIndex++;
      await processTeamCombatTurn(combatId);
      return;
    }

    const isLeaveText = ['уйти', 'выйти', 'вернуться', 'назад'].some(w => text.includes(w));
    const isLeaveCommand = isLeaveText && (!payloadCommand || payloadCommand === 'game_choice');
    const isMainMenuText = ['меню', 'кузнец', 'профиль', 'характеристики', 'инвентарь', 'снаряжение', 'скиллы', 'магазин', 'охота', 'работа', 'путешествие', 'арена', 'сбежать', 'город', 'в город', 'городское меню', 'гил. авантюристов', 'гильдия', 'группа', 'пати'].includes(text);
    const isMainMenuCommand = ['explore_', 'boss_fight', 'npc_', 'profile', 'stats', 'stats_page_', 'inventory', 'inv_page_', 'use', 'equipment', 'skills', 'skills_cat_', 'skill_view', 'shop', 'shop_cat', 'shop_item', 'shop_refresh', 'menu', 'hunt', 'combat', 'combat_back', 'combat_skills_menu', 'equip_skill', 'unequip_skill', 'work', 'work_port_', 'travel', 'travel_loc_page_', 'travel_select_', 'travel_confirm_', 'arena', 'arena_npc', 'eq_cat_', 'eq_page_', 'eq_item_view', 'gem_', 'shop_sell_menu', 'sell_page_', 'shop_sell_item', 'prison_escape', 'die_now', 'wait_revive', 'blacksmith', 'bs_page_', 'bs_select', 'bs_enhance', 'city_menu', 'city_explore', 'port_info', 'house_menu', 'house_buy', 'house_sleep', 'house_eat', 'house_sell', 'check_timer', 'close_menu', 'search_monsters', 'rest', 'go_deeper', 'travel_city', 'guild_', 'tavern_menu', 'tavern_sleep', 'party', 'tavern_drink', 'tavern_armwrestle', 'tavern_fight', 'tavern_ignore', 'city_event_give'].some(cmd => payloadCommand?.startsWith(cmd) || payloadCommand === cmd);
    
    if (isLeaveCommand || isMainMenuText || isMainMenuCommand) {
      try {
        const snapshot = await getDocs(query(collection(db, 'characters'), where('ownerId', '==', senderId)));
        const chars = snapshot.docs.map(d => ({ id: d.id, ...d.data() as any })).filter((c: any) => !c.deleted);
        if (chars.length === 0) {
          await context.send('У тебя еще нет персонажа. Напиши "создать персонажа".');
          return;
        }
        
        let char = chars[chars.length - 1]; // default to latest
        const userDoc = await getDoc(doc(db, 'users', senderId.toString()));
        if (userDoc.exists() && userDoc.data().activeCharId) {
          const activeChar = chars.find((c: any) => c.id === userDoc.data().activeCharId);
          if (activeChar) char = activeChar;
        }

        // Combat state intercept - prevent using unrelated menu commands in combat
        if (char.rpg?.combat && char.rpg.combat.type !== 'team') {
           const allowedPrefixes = ['combat_', 'use_', 'die_now', 'wait_revive'];
           const isAllowed = payloadCommand && allowedPrefixes.some(pf => payloadCommand.startsWith(pf));
           const isFlee = text === 'сбежать' || (payloadCommand === 'combat_action' && context.messagePayload?.combatAction === 'flee');
           
           if (!isAllowed && !isFlee) {
             await context.send('⚔️ Вы сейчас в бою! Сначала завершите его или попытайтесь сбежать.');
             await renderCombatUI(context, char, '');
             return;
           }
        }

        // --- SKILL MIGRATION DELETED HERE BECAUSE IT WAS MOVED UP ---
        const now = new Date();

        // Death Check
        if (char.rpg?.deathState === 'dead') {
          if (char.rpg.deathEndTime && now.getTime() < char.rpg.deathEndTime) {
            const diffMins = Math.ceil((char.rpg.deathEndTime - now.getTime()) / 60000);
            await context.send(`💀 Вы мертвы. Воскрешение через ${diffMins} мин.`);
            return;
          } else {
            // Auto revive
            char.rpg.deathState = 'alive';
            char.rpg.deathEndTime = null;
            char.rpg.baseStats.hp = calculateTotalStats(char.rpg).maxHp;
            char.location = 'city_1'; // Set back to main city
            await safeSetDoc(doc(db, 'characters', char.id), { location: char.location, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
            chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок ${char.name} воскрес в городе после смерти.` }] });
            await context.send({ message: `✨ Вы воскресли в городе!`, keyboard: getCityKeyboard() });
          }
        } else if (char.rpg?.deathState === 'waiting_revive') {
          if (text === 'умереть' || payloadCommand === 'die_now') {
            char.rpg.deathState = 'dead';
            char.rpg.deathEndTime = now.getTime() + 60 * 60000; // 1 hour
            await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
            chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок ${char.name} умер от потери крови.` }] });
            await context.send(`💀 Вы решили умереть. Воскрешение через 1 час.`);
            return;
          } else if (text === 'подождать' || payloadCommand === 'wait_revive') {
            await context.send(`⏳ Вы ждете помощи. У других игроков есть время, чтобы найти вас и использовать зелье воскрешения.`);
            return;
          }

          if (char.rpg.deathEndTime && now.getTime() < char.rpg.deathEndTime) {
            const diffMins = Math.ceil((char.rpg.deathEndTime - now.getTime()) / 60000);
            const kb = Keyboard.builder()
              .textButton({ label: 'Умереть (1 час)', payload: { command: 'die_now' }, color: Keyboard.NEGATIVE_COLOR })
              .textButton({ label: 'Подождать', payload: { command: 'wait_revive' }, color: Keyboard.SECONDARY_COLOR })
              ;
            await context.send({ message: `🩸 Вы тяжело ранены и истекаете кровью. Осталось ${diffMins} мин до смерти.`, keyboard: kb });
            return;
          } else {
            // Time ran out, die
            char.rpg.deathState = 'dead';
            char.rpg.deathEndTime = now.getTime() + 60 * 60000; // 1 hour
            await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
            chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок ${char.name} умер от потери крови.` }] });
            await context.send(`💀 Вы истекли кровью и умерли. Воскрешение через 1 час.`);
            return;
          }
        }

        // Prison Check
        if (char.rpg?.prisonEndTime && now.getTime() < char.rpg.prisonEndTime) {
          if (text === 'сбежать' || payloadCommand === 'prison_escape') {
            if (char.rpg.prisonEscapeAttempted) {
              await context.send(`❌ Вы уже пытались сбежать! Сидите тихо.`);
              return;
            }
            char.rpg.prisonEscapeAttempted = true;
            const agility = char.rpg.baseStats?.agility || 5;
            const chance = 40 + Math.floor(agility / 10);
            const roll = Math.floor(Math.random() * 100) + 1;
            
            if (roll <= chance) {
              char.rpg.prisonEndTime = null;
              await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
              chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок ${char.name} успешно сбежал из тюрьмы.` }] });
              await context.send(`🏃‍♂️ УСПЕХ! Вы смогли вскрыть замок и сбежать из тюрьмы!`);
            } else {
              char.rpg.prisonEndTime = now.getTime() + 1 * 3600000; // 1 hour
              await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
              chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок ${char.name} провалил побег из тюрьмы. Срок увеличен.` }] });
              await context.send(`🚨 ПРОВАЛ! Стража поймала вас при попытке побега. Ваш срок увеличен до 1 часа!`);
            }
            return;
          }

          const diffMins = Math.ceil((char.rpg.prisonEndTime - now.getTime()) / 60000);
          const kb = Keyboard.builder();
          if (!char.rpg.prisonEscapeAttempted) {
            kb.textButton({ label: 'Сбежать', payload: { command: 'prison_escape' }, color: Keyboard.NEGATIVE_COLOR });
          }
          await context.send({ message: `⛓️ Вы в тюрьме. Осталось сидеть: ${diffMins} мин.`, keyboard: kb });
          return;
        } else if (char.rpg?.prisonEndTime) {
          // Prison time over
          char.rpg.prisonEndTime = null;
          char.rpg.prisonEscapeAttempted = false;
          await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок ${char.name} вышел из тюрьмы (срок закончился).` }] });
          await context.send(`🔓 Ваш срок заключения подошел к концу. Вы свободны!`);
        }
        
        // Allowed commands during busy state
        const allowedBusyCommands = [
           'check_timer', 'menu', 'profile', 'stats', 'inventory', 'equipment', 'skills', 'close_menu',
           'eq_cat_', 'eq_page_', 'eq_item_view', 'skills_cat_', 'skill_view', 'party', 'party_'
        ];
        
        const isAllowedBusyText = ['меню', 'профиль', 'характеристики', 'инвентарь', 'снаряжение', 'скиллы', 'группа', 'пати'].includes(text);
        const isAllowedBusy = (payloadCommand && allowedBusyCommands.some(cmd => payloadCommand.startsWith(cmd))) || isAllowedBusyText;
        
        if (char.actionEndTime && !isAllowedBusy) {
          const endTime = new Date(char.actionEndTime);
          if (now < endTime) {
            const diffMs = endTime.getTime() - now.getTime();
            const diffSecs = Math.ceil(diffMs / 1000);
            
            let kb = undefined;
            let verb = "заняты";
            if (char.actionType === 'travel') {
              kb = Keyboard.builder().textButton({ label: '🚶 Персонаж в пути', payload: { command: 'check_timer' }, color: Keyboard.SECONDARY_COLOR });
              verb = "в пути";
            }
            
            let timeStr = `${diffSecs} сек.`;
            if (diffSecs > 120) {
              timeStr = `${Math.ceil(diffSecs / 60)} мин.`;
            }
            
            await context.send({ message: `⏳ Вы ${verb}! Освободитесь через ${timeStr}`, keyboard: kb });
            return;
          } else if (!char.actionNotified) {
             char.actionNotified = true;
             char.actionEndTime = null;
             char.actionType = null;
             await safeSetDoc(doc(db, 'characters', char.id), { 
                actionNotified: true, actionEndTime: null, actionType: null 
             }, { merge: true });
             
             if (char.location === 'city') {
                await context.send({ message: `🎉 Вы прибыли в город!`, keyboard: getCityKeyboard() });
             } else {
                const kb = getWildKeyboard(char);
                await context.send({ message: `🌲 Вы прибыли на место!`, keyboard: kb });
             }
             return;
          }
        }

        if (payloadCommand === 'check_timer') {
           if (char.actionEndTime) {
             const diffSecs = Math.ceil((char.actionEndTime - Date.now()) / 1000);
             if (diffSecs > 0) {
                let verb = char.actionType === 'travel' || char.actionType === 'ai_timer' ? "в пути" : "заняты";
                let timeStr = `${diffSecs} сек.`;
                if (diffSecs > 60) timeStr = `${Math.ceil(diffSecs / 60)} мин.`;
                const kb = Keyboard.builder().textButton({ label: '⏳ Проверить', payload: { command: 'check_timer' }, color: Keyboard.SECONDARY_COLOR });
                await context.send({ message: `⏳ Вы ${verb}! Осталось ${timeStr}`, keyboard: kb });
                return;
             }
           }
           
           if (!char.actionNotified && char.actionEndTime && char.actionEndTime <= Date.now()) {
              // Time just finished, but interval hasn't cleared it yet.
              // We shouldn't fast-track clear it because they lose their reward.
              await context.send({ message: `⏳ Ваше действие только что завершилось... Сервер обрабатывает результаты (подождите пару секунд).` });
              return;
           }

           if (char.location === 'city' || char.location === 'city_1') {
              await context.send({ message: `Вы уже на месте и сейчас в городе.`, keyboard: getCityKeyboard() });
           } else {
              const kb = getWildKeyboard(char);
              await context.send({ message: `Вы уже на месте.`, keyboard: kb });
           }
           return;
        }

        if (text === 'город' || text === 'в город' || text === 'городское меню' || payloadCommand === 'city_menu') {
          if (char.location !== 'city') {
            await context.send({ 
              message: '❌ Вы не в городе. Чтобы попасть в город, отправляйтесь в путешествие.', 
              keyboard: Keyboard.builder().textButton({ label: '🗺️ Путешествие (в город)', payload: { command: 'travel' }, color: Keyboard.PRIMARY_COLOR }) 
            });
            return;
          }

          const kb = getCityKeyboard();

          await context.send({ 
            message: '🏰 Перед Вами раскинулись широкие улицы города Элдории. Куда направитесь?', 
            keyboard: kb
          });
          return;
        }

        const lower = text.toLowerCase();
        
        if (isLeaveCommand) {
           if (char.location === 'city') {
              chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Персонаж ${char.name} вышел на улицу города.` }] });
              const kb = getCityKeyboard();
              await context.send({ message: 'Вы вернулись на улицы города.', keyboard: kb });
              return;
           } else {
              chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Персонаж ${char.name} отошел назад и оглядывает местность.` }] });
              const kb = getWildKeyboard(char);
              await context.send({ message: 'Вы оглядываетесь по сторонам.', keyboard: kb });
              return;
           }
        }

        if (payloadCommand === 'city_explore') {
          const quarter = context.messagePayload.quarter;
          let quarterName = quarter === 'rich' ? 'Верхний Бульвар' : 'Портовые Доки';
          
          if (quarter === 'port') {
            const kb = Keyboard.builder()
              .textButton({ label: '🏠 Мой дом', payload: { command: 'house_menu' }, color: Keyboard.PRIMARY_COLOR })
              .textButton({ label: '💼 Подработка', payload: { command: 'port_info' }, color: Keyboard.SECONDARY_COLOR })
              .row()
              .textButton({ label: '🚢 Порт', payload: { command: 'port_future' }, color: Keyboard.SECONDARY_COLOR })
              .row()
              .textButton({ label: '⬅️ Центр города', payload: { command: 'city_menu' }, color: Keyboard.NEGATIVE_COLOR })
              ;
            await context.send({ message: `Вы находитесь в Портовом квартале. Пахнет солью и рыбой, матросы перетаскивают грузы.`, keyboard: kb });
            return;
          }

          if (Math.random() < 0.2) {
             const rnd = Math.random();
             if (rnd < 0.4) {
                const kb = Keyboard.builder()
                  .textButton({ label: 'Дать 10 💰', payload: { command: 'city_event_give' }, color: Keyboard.PRIMARY_COLOR })
                  .textButton({ label: 'Пройти мимо', payload: { command: 'city_explore', quarter }, color: Keyboard.SECONDARY_COLOR });
                await context.send({ message: `🍷 Гуляя по ${quarterName}, к вам подошел грязный оборванец и начал жалобно просить монету на еду.`, keyboard: kb });
                return;
             } else if (rnd < 0.8) {
                await context.send(`💰 В переулке ${quarterName} вы нашли оброненный кошелек мертвого купца! Внутри оказалось 50 💰.`);
                char.gold = (char.gold || 0) + 50;
             } else {
                await context.send(`⚔️ В тёмной подворотне ${quarterName} на вас попытался напасть бандит! Но, оценив вашу экипировку, он извинился и скрылся.`);
             }
             await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold }, { merge: true });
          } else {
            await context.send(`Вы прогуливаетесь по локации: ${quarterName}. Вокруг суетятся жители, торговцы зазывают к палаткам, а стража лениво патрулирует улицы.`);
          }
          
          // Re-send the city menu
          const kb = Keyboard.builder()
            .textButton({ label: '🏙️ Центр города', payload: { command: 'city_menu' }, color: Keyboard.PRIMARY_COLOR })
            .textButton({ label: '👤 Персонаж', payload: { command: 'menu' }, color: Keyboard.SECONDARY_COLOR })
            ;
          await context.send({ message: 'Что дальше?', keyboard: kb });
          return;
        }

        if (payloadCommand === 'port_info') {
          const kb = Keyboard.builder()
            .textButton({ label: '⏳ Работа (5 мин)', payload: { command: 'work_port_5' }, color: Keyboard.PRIMARY_COLOR })
            .row()
            .textButton({ label: '⏳ Работа (20 мин)', payload: { command: 'work_port_20' }, color: Keyboard.PRIMARY_COLOR })
            .row()
            .textButton({ label: '⏳ Работа (60 мин)', payload: { command: 'work_port_60' }, color: Keyboard.PRIMARY_COLOR })
            .row()
            .textButton({ label: '⏳ Работа (12 ч)', payload: { command: 'work_port_720' }, color: Keyboard.PRIMARY_COLOR })
            .row()
            .textButton({ label: '⬅️ Назад', payload: { command: 'city_explore', quarter: 'port' }, color: Keyboard.SECONDARY_COLOR });
          await context.send({ message: `Портовый квартал — идеальное место для подработки.\nГрузчики всегда нужны, и платят неплохо:\n\n5 минут = 150 💰\n20 минут = 600 💰\n1 час = 3000 💰\n12 часов = 20000 💰`, keyboard: kb });
          return;
        }

        if (payloadCommand === 'port_future') {
            const kb = Keyboard.builder()
              .textButton({ label: '🏠 Мой дом', payload: { command: 'house_menu' }, color: Keyboard.PRIMARY_COLOR })
              .textButton({ label: '💼 Подработка', payload: { command: 'port_info' }, color: Keyboard.SECONDARY_COLOR })
              .row()
              .textButton({ label: '🚢 Порт', payload: { command: 'port_future' }, color: Keyboard.SECONDARY_COLOR })
              .row()
              .textButton({ label: '⬅️ Центр города', payload: { command: 'city_menu' }, color: Keyboard.NEGATIVE_COLOR })
              ;
            await context.send({ message: `🚧 Порт еще строится! В будущем обновлении здесь появится перемещение в океане и морские путешествия!`, keyboard: kb });
            return;
        }

        if (payloadCommand?.startsWith('work_port_')) {
          if (!char.rpg.workStats.history) char.rpg.workStats.history = [];
          char.rpg.workStats.history = char.rpg.workStats.history.filter((t: number) => now.getTime() - t < 5 * 60 * 60 * 1000);
          
          if (char.rpg.workStats.history.length >= 3) {
            await context.send('❌ Вы слишком устали. Можно работать не более 3 раз за 5 часов.');
            return;
          }
          char.rpg.workStats.history.push(now.getTime());

          const mins = parseInt(payloadCommand.split('_')[2] || '5');
          const endTime = now.getTime() + mins * 60000;
          
          await safeSetDoc(doc(db, 'characters', char.id), { 
            rpg: JSON.parse(JSON.stringify(char.rpg)),
            actionEndTime: endTime,
            actionType: 'work_port',
            actionMessage: mins.toString(),
            actionNotified: false
          }, { merge: true });
          
          const kbTravel = Keyboard.builder().textButton({ label: '⏳ Проверить', payload: { command: 'check_timer' }, color: Keyboard.SECONDARY_COLOR });
          await context.send({ message: `💼 Вы устроились таскать ящики в порту на ${mins} минут. Вернитесь позже чтобы забрать награду. Осталось работ: ${3 - char.rpg.workStats.history.length}`, keyboard: kbTravel });
          return;
        }

        if (payloadCommand === 'house_menu') {
          if (!char.rpg) char.rpg = DEFAULT_RPG_DATA;

          if (char.rpg.inventory) {
              char.rpg.inventory = char.rpg.inventory.filter(i => {
                 const item = getItem(i.itemId);
                 if (!item) return false;
                 // user says "удали сюжетные вещи" -> type === 'story'
                 if (item.type === ('story' as any) || item.type === ('quest' as any)) return false;
                 return true;
              });
          }

          if (!char.rpg.house) {
            const kb = Keyboard.builder()
              .textButton({ label: 'Купить дом (100,000💰', payload: { command: 'house_buy' }, color: Keyboard.POSITIVE_COLOR })
              .row()
              .textButton({ label: '⬅️ Назад', payload: { command: 'city_explore', quarter: 'port' }, color: Keyboard.SECONDARY_COLOR });
            await context.send({ message: `У вас еще нет дома. На окраине портового квартала продается Заброшенный дом.\nСтоимость: 100,000 💰`, keyboard: kb });
            return;
          }

          const kb = Keyboard.builder()
            .textButton({ label: '🛏️ Спать', payload: { command: 'house_sleep' }, color: Keyboard.PRIMARY_COLOR })
            .textButton({ label: '🍲 Покушать', payload: { command: 'house_eat' }, color: Keyboard.PRIMARY_COLOR })
            .row()
            .textButton({ label: '💰 Продать дом', payload: { command: 'house_sell' }, color: Keyboard.NEGATIVE_COLOR })
            .row()
            .textButton({ label: '⬅️ Уйти', payload: { command: 'city_explore', quarter: 'port' }, color: Keyboard.SECONDARY_COLOR })
            ;
          await context.send({ message: `🏠 Добро пожаловать домой! Здесь уютно и безопасно.\n(В будущих обновлениях появятся новые возможности для дома)`, keyboard: kb });
          return;
        }

        if (payloadCommand === 'house_buy') {
          if ((char.gold || 0) < 100000) {
            await context.send(`❌ Недостаточно золота. Нужно 100,000 💰.`);
            return;
          }
          char.gold -= 100000;
          if (!char.rpg) char.rpg = DEFAULT_RPG_DATA;

          if (char.rpg.inventory) {
              char.rpg.inventory = char.rpg.inventory.filter(i => {
                 const item = getItem(i.itemId);
                 if (!item) return false;
                 // user says "удали сюжетные вещи" -> type === 'story'
                 if (item.type === ('story' as any) || item.type === ('quest' as any)) return false;
                 return true;
              });
          }

          char.rpg.house = 'abandoned_house';
          await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          
          const kb = Keyboard.builder().textButton({ label: 'Войти в дом', payload: { command: 'house_menu' }, color: Keyboard.POSITIVE_COLOR });
          await context.send({ message: `🎉 Поздравляем! Вы приобрели Заброшенный дом за 100,000 💰.`, keyboard: kb });
          return;
        }

        if (payloadCommand === 'house_sleep') {
          const now = new Date();
          const endTime = now.getTime() + 5 * 60000;
          
          await safeSetDoc(doc(db, 'characters', char.id), { 
            actionEndTime: endTime,
            actionType: 'house_sleep',
            actionNotified: false
          }, { merge: true });

          const kbTravel = Keyboard.builder().textButton({ label: '⏳ Проверить', payload: { command: 'check_timer' }, color: Keyboard.SECONDARY_COLOR });
          await context.send({ message: `💤 Вы легли спать в собственной постели. Сон займет 5 минут.`, keyboard: kbTravel });
          return;
        }

        if (payloadCommand === 'house_eat') {
           char.rpg.foodBuff = { type: 'home_meal', multiplier: 1.2, charges: 10 };
           await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
           const kb = Keyboard.builder().textButton({ label: '🔙 Назад', payload: { command: 'house_menu' }, color: Keyboard.PRIMARY_COLOR });
           await context.send({ message: `🍲 Вы вкусно поели! Вы чувствуете прилив сил.\nБафф 'Сытость': +20% к статам на следующие 10 сражений с монстрами. (Эффект обновлен и сброшен до 10)`, keyboard: kb });
           return;
        }

        if (payloadCommand === 'house_sell') {
           if (!char.rpg.house) return;
           char.rpg.house = undefined;
           char.gold = (char.gold || 0) + 50000;
           await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
           
           const kb = Keyboard.builder().textButton({ label: '🔙 Вернуться в квартал', payload: { command: 'city_explore', quarter: 'port' }, color: Keyboard.PRIMARY_COLOR });
           await context.send({ message: `🏠 Вы продали дом за 50,000 💰.`, keyboard: kb });
           return;
        }

        if (text === 'меню' || payloadCommand === 'menu') {
          const keyboard = Keyboard.builder()
            .textButton({ label: '👤 Профиль', payload: { command: 'profile' }, color: Keyboard.PRIMARY_COLOR })
            .textButton({ label: '📊 Статы', payload: { command: 'stats' }, color: Keyboard.PRIMARY_COLOR })
            .row()
            .textButton({ label: '🎒 Инвентарь', payload: { command: 'inventory' }, color: Keyboard.SECONDARY_COLOR })
            .textButton({ label: '🛡️ Снаряжение', payload: { command: 'equipment' }, color: Keyboard.SECONDARY_COLOR })
            .row()
            .textButton({ label: '✨ Скиллы', payload: { command: 'skills' }, color: Keyboard.SECONDARY_COLOR })
            .row()
            .textButton({ label: '❌ Выйти из меню', payload: { command: 'close_menu' }, color: Keyboard.NEGATIVE_COLOR })
            ;

          await context.send({
            message: `📜 Меню персонажа ${char.name}:`,
            keyboard
          });
          return;
        }

        if (payloadCommand === 'close_menu') {
          if (char.rpg?.conversingNpcId) {
             char.rpg.conversingNpcId = null;
             await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          }
          if (char.location === 'city') {
            await context.send({ message: 'Вы вернулись к делам в городе.', keyboard: getCityKeyboard() });
          } else {
            const kb = getWildKeyboard(char);
            await context.send({ message: 'Вы закрыли меню и огляделись.', keyboard: kb });
          }
          return;
        }

        if (payloadCommand === 'npc_list') {
           if (char.rpg.conversingNpcId) {
              char.rpg.conversingNpcId = null;
              await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
           }
           const normLocId = (char.location === 'city' || char.location === 'city_1') ? 'loc_city_eldoria' : char.location;
           const loc = WORLD_LOCATIONS.find((l: any) => l.id === normLocId);
           if (!loc || !loc.npcs || loc.npcs.length === 0) {
              await context.send({ message: 'Здесь нет никого, с кем можно было бы поговорить.', keyboard: char.location === 'city' ? getCityKeyboard() : getWildKeyboard(char) });
              return;
           }
           let msg = `👥 Местные жители (${loc.name}):\n\n`;
           const kb = Keyboard.builder();
           loc.npcs.forEach((npc: any, i: number) => {
              msg += `${i+1}. ${npc.name} — ${npc.description}\n`;
              kb.textButton({ label: `💬 ${npc.name.slice(0, 30)}`, payload: { command: `npc_talk_${npc.id}` }, color: Keyboard.PRIMARY_COLOR });
              if ((i + 1) % 2 === 0) kb.row();
           });
           
           if(loc.npcs.length % 2 !== 0) kb.row();
           kb.textButton({ label: '🔙 Назад', payload: { command: 'close_menu' }, color: Keyboard.SECONDARY_COLOR });
           
           await context.send({ message: msg, keyboard: kb });
           return;
        }

        if (payloadCommand?.startsWith('npc_talk_')) {
           const npcId = payloadCommand.replace('npc_talk_', '');
           const normLocId = (char.location === 'city' || char.location === 'city_1') ? 'loc_city_eldoria' : char.location;
           const loc = WORLD_LOCATIONS.find((l: any) => l.id === normLocId);
           const npc = loc?.npcs?.find((n: any) => n.id === npcId);
           if (!npc) {
              await context.send('Персонаж не найден.');
              return;
           }

           const talkPrompts = [
             `Приветствует тебя и слегка кивает.`,
             `Отвлекается от работы и смотрит на тебя.`,
             `Задумчиво хмыкает, заметив тебя.`
           ];

           let msg = `💬 ${npc.name}: *${talkPrompts[Math.floor(Math.random() * talkPrompts.length)]}*\n\n(Вы можете ответить ему в чат, используя обычный текст!)`;
           
           char.rpg.conversingNpcId = npcId;
           await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
           
           chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок подошел к NPC по имени ${npc.name} (${npc.description}). Если следующая реплика игрока направлена ему, отыграй роль NPC!` }] });
           
           const kb = Keyboard.builder()
             .textButton({ label: '🔙 Вернуться', payload: { command: 'npc_list' }, color: Keyboard.SECONDARY_COLOR });
           await context.send({ message: msg, keyboard: kb });
           return;
        }

        if (payloadCommand === 'tavern_menu') {
          // Random event: Someone picks a fight
          if (Math.random() < 0.1) {
            const kb = Keyboard.builder()
              .textButton({ label: '⚔️ Напасть', payload: { command: 'tavern_fight' }, color: Keyboard.NEGATIVE_COLOR })
              .textButton({ label: '🚶‍♂️ Проигнорировать', payload: { command: 'tavern_ignore' }, color: Keyboard.SECONDARY_COLOR })
              .row()
              .textButton({ label: '⬅️ Сбежать в город', payload: { command: 'city_menu' }, color: Keyboard.PRIMARY_COLOR });
            await context.send({ message: '😠 Вы заходите в таверну, и какой-то пьяный громила вдруг начинает быковать на вас: "Эй, ты! Мне не нравится твоя рожа!"', keyboard: kb });
            return;
          }

          const keyboard = Keyboard.builder()
            .textButton({ label: '🍻 Выпить (50 💰)', payload: { command: 'tavern_drink' }, color: Keyboard.PRIMARY_COLOR })
            .textButton({ label: '💪 Армрестлинг (1000 💰)', payload: { command: 'tavern_armwrestle' }, color: Keyboard.PRIMARY_COLOR })
            .row()
            .textButton({ label: '🛏️ Снять комнату (100 💰)', payload: { command: 'tavern_sleep' }, color: Keyboard.SECONDARY_COLOR })
            .row()
            .textButton({ label: '⬅️ В город', payload: { command: 'city_menu' }, color: Keyboard.SECONDARY_COLOR })
            ;
          await context.send({ message: `🍺 Добро пожаловать в таверну!\nЗдесь всегда шумно, пахнет элем и жареным мясом.\nУ тебя сейчас: ${char.gold || 0} 💰.`, keyboard });
          return;
        }

        if (payloadCommand === 'tavern_ignore') {
           await context.send({ message: '🚶‍♂️ Вы просто проигнорировали пьянчугу и прошли к барной стойке. Он что-то буркнул себе под нос и отстал.', keyboard: getCityKeyboard() });
           return;
        }

        if (payloadCommand === 'tavern_fight') {
           // We can mock a quick combat or just a text result. Since there's a full combat system, we could start a combat with a "Drunkard"
           // but maybe simply resolve it textually to save time, or use the real combat engine. 
           // Let's use real combat engine if possible, but simplest is resolving textually. 
           const pStats = calculateTotalStats(char.rpg);
           // Calculate win chance ~70%
           if (Math.random() < 0.7 + (pStats.attack / 1000)) {
               const reward = Math.floor(Math.random() * 50) + 10;
               char.gold += reward;
               await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold }, { merge: true });
               await context.send({ message: `👊 Вы ловким ударом отправили громилу в нокаут! Толпа радостно загудела. В его карманах вы нашли ${reward} 💰.`, keyboard: getCityKeyboard() });
           } else {
               const hpLoss = Math.floor(pStats.maxHp * 0.2);
               char.rpg.baseStats.hp = Math.max(1, char.rpg.baseStats.hp - hpLoss);
               await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
               await context.send({ message: `🤕 Громила оказался неожиданно проворным и вмазал вам кружкой по голове! Вы потеряли ${hpLoss} ХП и с позором отступили.`, keyboard: getCityKeyboard() });
           }
           return;
        }

        if (payloadCommand === 'tavern_drink') {
          if ((char.gold || 0) < 50) {
             await context.send('❌ У тебя недостаточно золота чтобы выпить (нужно 50 💰).');
             return;
          }
          char.gold -= 50;
          await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold }, { merge: true });
          
          const rnd = Math.random() * 100;
          const kb = Keyboard.builder().textButton({ label: '⬅️ Вернуться', payload: { command: 'tavern_menu' }, color: Keyboard.PRIMARY_COLOR });
          
          if (rnd < 5) { // 5% chance behind bars
             const fine = Math.floor((char.gold || 0) * 0.1); // 10% of gold
             char.gold -= fine;
             await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold }, { merge: true });
             await context.send({ message: `🚓 Вы напились до беспамятства и очнулись за решеткой! Стража содрала с вас штраф ${fine} 💰 за хулиганство.`, keyboard: kb });
          } else if (rnd < 10) { // 5% chance with hobos
             char.rpg.baseStats.hp = Math.max(1, Math.floor(calculateTotalStats(char.rpg).maxHp * 0.5));
             await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
             await context.send({ message: `🗑️ Вы так сильно напились, что проснулись на улице в обнимку с бомжами. У вас жутко болит голова (потеряно 50% здоровья).`, keyboard: kb });
          } else if (rnd < 20) {
             await context.send({ message: `💃 После пятой кружки эля вы залезли на стол и начали исполнять зажигательные танцы. Посетители аплодировали!`, keyboard: kb });
          } else if (rnd < 30) {
             const tip = 20;
             char.gold += tip;
             await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold }, { merge: true });
             await context.send({ message: `🎤 Вы так хорошо спели старую морскую песню пьяным голосом, что кто-то кинул вам ${tip} 💰.`, keyboard: kb });
          } else if (rnd < 40) {
             await context.send({ message: `🐐 Вы проснулись на сеновале за таверной. Рядом с вами мирно спит коза. Ничего не помните.`, keyboard: kb });
          } else {
             await context.send({ message: `🍻 Вы выпили кружку отличного дворфийского эля. На душе стало тепло и спокойно.`, keyboard: kb });
          }
          return;
        }

        if (payloadCommand === 'tavern_armwrestle') {
          if ((char.gold || 0) < 1000) {
             await context.send('❌ Нужно 1000 💰 для ставки в армрестлинге.');
             return;
          }
          
          if (!char.rpg.armwrestleDate) char.rpg.armwrestleDate = '';
          if (!char.rpg.armwrestleCount) char.rpg.armwrestleCount = 0;
          
          const today = new Date().toISOString().split('T')[0];
          if (char.rpg.armwrestleDate !== today) {
              char.rpg.armwrestleDate = today;
              char.rpg.armwrestleCount = 0;
          }
          
          if (char.rpg.armwrestleCount >= 2) {
             await context.send('❌ Вы уже боролись 2 раза за сегодня. Приходите завтра, руки должны отдохнуть!');
             return;
          }

          char.rpg.armwrestleCount++;
          char.gold -= 1000;
          
          const pStats = calculateTotalStats(char.rpg);
          const strength = pStats.attack;
          const baseChance = 40; // 40%
          const extraChance = Math.floor(strength / 10);
          const winChance = baseChance + extraChance;
          const rnd = Math.random() * 100;
          
          const kb = Keyboard.builder().textButton({ label: '⬅️ Вернуться', payload: { command: 'tavern_menu' }, color: Keyboard.PRIMARY_COLOR });

          if (rnd <= winChance) {
             char.gold += 10000;
             await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
             await context.send({ message: `💪 Вы сцепились руками с местным чемпионом. Спустя минуту напряженной борьбы, вы прижали его руку к столу!\n🎉 Вы выиграли 10000 💰!`, keyboard: kb });
          } else {
             await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
             await context.send({ message: `💦 Вы боролись изо всех сил, но соперник оказался крепким орешком и прижал вашу руку. Вы проиграли ставку в 1000 💰.`, keyboard: kb });
          }
          return;
        }


        
        if (payloadCommand === 'city_event_give') {
           if ((char.gold || 0) < 10) {
              await context.send({ message: 'К сожалению, у вас нет даже 10 золотых.', keyboard: getCityKeyboard() });
              return;
           }
           char.gold -= 10;
           await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold }, { merge: true });
           await context.send({ message: 'Вы пожертвовали 10 💰. Бомж радостно поблагодарил вас и убежал. Ваша карма (наверное) стала чище.', keyboard: getCityKeyboard() });
           return;
        }

        if (payloadCommand === 'tavern_sleep') {
          if ((char.gold || 0) < 100) {
             await context.send('❌ У тебя недостаточно золота чтобы снять комнату (нужно 100 💰).');
             return;
          }
          char.gold -= 100;

          const now = new Date();
          const endTime = now.getTime() + 5 * 60000;
          
          await safeSetDoc(doc(db, 'characters', char.id), { 
            gold: char.gold,
            actionEndTime: endTime,
            actionType: 'tavern_sleep',
            actionNotified: false
          }, { merge: true });

          const kbTravel = Keyboard.builder().textButton({ label: '⏳ Проверить', payload: { command: 'check_timer' }, color: Keyboard.SECONDARY_COLOR });
          await context.send({ message: `💤 Вы сняли комнату за 100 💰 и легли спать. Отдых займет 5 минут.`, keyboard: kbTravel });
          return;
        }

        if (payloadCommand === 'travel_city') {
          if (char.location === 'city') {
             await context.send({ message: 'Вы уже в городе.', keyboard: getCityKeyboard() });
             return;
          }
          const endTime = now.getTime() + 1 * 60000;
          if (!char.rpg) char.rpg = DEFAULT_RPG_DATA;

          if (char.rpg.inventory) {
              char.rpg.inventory = char.rpg.inventory.filter(i => {
                 const item = getItem(i.itemId);
                 if (!item) return false;
                 // user says "удали сюжетные вещи" -> type === 'story'
                 if (item.type === ('story' as any) || item.type === ('quest' as any)) return false;
                 return true;
              });
          }

          char.rpg.locationDepth = 1;
          char.rpg.foundBoss = false;
          char.rpg.foundNextDepth = false;
          await safeSetDoc(doc(db, 'characters', char.id), { 
            rpg: JSON.parse(JSON.stringify(char.rpg)),
            actionEndTime: endTime,
            actionType: 'travel',
            actionTargetLocation: 'city',
            actionNotified: false
          }, { merge: true });
          const kbTravel = Keyboard.builder().textButton({ label: '🚶 Персонаж в пути', payload: { command: 'check_timer' }, color: Keyboard.SECONDARY_COLOR });
          await context.send({ message: `🗺️ Вы отправились в город. Путешествие займет 1 минуту.`, keyboard: kbTravel });
          return;
        }

        if (payloadCommand?.startsWith('explore_') || payloadCommand === 'search_monsters') {
          if (char.location === 'city') return;
          if (!char.rpg) char.rpg = DEFAULT_RPG_DATA;

          if (char.rpg.inventory) {
              char.rpg.inventory = char.rpg.inventory.filter(i => {
                 const item = getItem(i.itemId);
                 if (!item) return false;
                 // user says "удали сюжетные вещи" -> type === 'story'
                 if (item.type === ('story' as any) || item.type === ('quest' as any)) return false;
                 return true;
              });
          }

          
          
          if (char.rpg.exploreWaitEnd) {
             const left = Math.ceil((char.rpg.exploreWaitEnd - Date.now()) / 1000);
             if (left > 0) {
                 const kbWait = Keyboard.builder()
                    .textButton({ label: '⏳ Обновить', payload: { command: 'check_explore' }, color: Keyboard.PRIMARY_COLOR })
                    .inline();
                 await context.send({ message: `⏳ Вы все еще исследуете это место... Осталось ${left} сек.`, keyboard: kbWait });
                 return;
             } else {
                 char.rpg.exploreWaitEnd = null;
                 // Proceed to resolve
             }
          }
          
          const isPathCmd = ['explore_path_', 'explore_climb', 'explore_river', 'explore_cave', 'explore_glade', 'explore_logging', 'explore_mushrooms', 'explore_cabin', 'explore_thicket', 'explore_forward', 'explore_left', 'explore_right'].some(p => payloadCommand.startsWith(p));
          
          if (isPathCmd && !char.rpg.exploreWaitEnd && payloadCommand !== 'check_explore') {
              char.rpg.foundBoss = false;
              const waitTime = Math.floor(Math.random() * 5 + 5) * 1000;
              char.rpg.exploreWaitEnd = Date.now() + waitTime;
              char.rpg.pendingExploreCmd = payloadCommand;
              await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
              
              const kbWait = Keyboard.builder()
                .textButton({ label: '⏳ Как успехи?', payload: { command: 'check_explore' }, color: Keyboard.PRIMARY_COLOR })
                .inline();
                
              await context.send({ message: `🚶 Вы направились туда. Осмотр займет около ${Math.ceil(waitTime/1000)} сек.`, keyboard: kbWait });
              
              setTimeout(async () => {
                 try {
                     const freshSnap = await getDoc(doc(db, 'characters', char.id));
                     if (!freshSnap.exists()) return;
                     const freshChar = freshSnap.data();
                     // Only resolve if it's expired and still has pending
                     if (freshChar.rpg.exploreWaitEnd && freshChar.rpg.exploreWaitEnd <= Date.now() + 500 && freshChar.rpg.pendingExploreCmd) {
                        freshChar.rpg.exploreWaitEnd = null;
                        const eventCmd = freshChar.rpg.pendingExploreCmd;
                        freshChar.rpg.pendingExploreCmd = null;
                        freshChar.id = char.id;
                        
                        const rez = handleExplorationEvent(freshChar, eventCmd);
                        
                        if (rez.enemyToFight) {
                           freshChar.rpg.combat = createCombatState(rez.enemyToFight);
                           await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(freshChar.rpg)) }, { merge: true });
                           await renderCombatUI(context, freshChar, `\n[СИСТЕМА]: ${rez.msg}`);
                           return;
                        }
                        
                        await safeSetDoc(doc(db, 'characters', char.id), { gold: freshChar.gold || 0, rpg: JSON.parse(JSON.stringify(freshChar.rpg)) }, { merge: true });
                        await context.send({ message: `\n[СИСТЕМА]: ${rez.msg}`, keyboard: getWildKeyboard(freshChar) });
                     }
                 } catch (e) {
                     console.error("Timeout explore error", e);
                 }
              }, waitTime + 500);
              return;
          }
          
          if (payloadCommand === 'check_explore') {
             if (char.rpg.exploreWaitEnd && char.rpg.exploreWaitEnd <= Date.now()) {
                payloadCommand = char.rpg.pendingExploreCmd || 'explore_forward';
                char.rpg.exploreWaitEnd = null;
                char.rpg.pendingExploreCmd = null;
             } else {
                 return; // handled above or invalid
             }
          }

          if (char.rpg.exploreState === 'enemy_spotted') {
             if (payloadCommand === 'event_claim') {
        if (globalEvents.creatorStoneClaimed) {
             await context.send({ message: 'К сожалению, кто-то уже забрал Камень Создания!' });
             return;
        }
        globalEvents.creatorStoneClaimed = true;
        
        // Grant reward
        const charDoc = await getDoc(doc(db, 'characters', String(context.senderId)));
        if (charDoc.exists()) {
             const charData = charDoc.data() as any;
             charData.rpg.inventory.push({ itemId: 'item_creator_stone', amount: 1 });
             await safeSetDoc(doc(db, 'characters', String(context.senderId)), charData);
             
             await context.send({ message: '🎉 Поздравляем! Вы первый, кто нажал кнопку, и получили Камень Создания!' });
        }
        return;
    }

    if (payloadCommand === 'explore_attack') {
                char.rpg.exploreState = null;
                const enemy = char.rpg.exploreEnemy;
                char.rpg.exploreEnemy = null;
                char.rpg.combat = createCombatState(enemy);
                await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
                await renderCombatUI(context, char, `💥 Вы бросаетесь в атаку!`);
                return;
             } else if (payloadCommand === 'explore_stealth') {
                const agi = calculateTotalStats(char.rpg).agility;
                char.rpg.exploreState = null;
                if (agi + Math.random() * 20 > 25) {
                   await context.send({ message: '🥷 Вы бесшумно проскользнули мимо врага.', keyboard: getWildKeyboard(char) });
                } else {
                   const enemy = char.rpg.exploreEnemy;
                   char.rpg.exploreEnemy = null;
                   char.rpg.combat = createCombatState(enemy);
                   await context.send({ message: '❗ Враг вас заметил! Бой начинается не в вашу пользу.'});
                   await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
                   await renderCombatUI(context, char, '');
                   return;
                }
                await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
                return;
             } else if (payloadCommand === 'explore_flee') {
                char.rpg.exploreState = null;
                char.rpg.exploreEnemy = null;
                await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
                await context.send({ message: '🏃 Вы решили отступить и пойти другой дорогой.', keyboard: getWildKeyboard(char) });
                return;
             }
          }
          
          if (char.rpg.exploreState === 'obstacle') {
             const agi = calculateTotalStats(char.rpg).agility;
             const isJump = payloadCommand === 'explore_off_path'; // Try to jump
             char.rpg.exploreState = null;
             if (isJump) {
                if (agi + Math.random() * 20 > 25) { // Agility check
                   await context.send({ message: '🏃 Вы успешно преодолели преграду и продолжили путь!', keyboard: getWildKeyboard(char) });
                } else {
                   const maxHp = calculateTotalStats(char.rpg).maxHp;
                   const dmg = Math.floor(maxHp * 0.2);
                   char.rpg.baseStats.hp = Math.max(1, char.rpg.baseStats.hp - dmg);
                   await context.send({ message: `💥 Вы оступились и больно ударились! Потеряно ${dmg} ХП. Кое-как выбравшись, вы решаете пойти в обход.`, keyboard: getWildKeyboard(char) });
                }
             } else {
                await context.send({ message: '🚶 Вы решили не рисковать и пойти длинным безопасным путем.', keyboard: getWildKeyboard(char) });
             }
             await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
             return;
          }
          
          if (char.rpg.exploreState === 'healing_stream') {
             if (payloadCommand === 'explore_drink_stream') {
                char.rpg.exploreState = null;
                const maxHp = calculateTotalStats(char.rpg).maxHp;
                char.rpg.baseStats.hp = maxHp;
                const minPots = 1;
                const maxPots = 3;
                char.rpg.inventory = char.rpg.inventory || [];
                const potCount = Math.floor(Math.random() * (maxPots - minPots + 1)) + minPots;
                const potId = 'cons_1';
                const ex = char.rpg.inventory.find((i:any) => i.itemId === potId);
                if (ex) ex.amount += potCount;
                else char.rpg.inventory.push({ itemId: potId, amount: potCount });
                
                await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
                await context.send({ message: `💧 Вы попили воды: ваше ХП полностью восстановлено! Вы также набрали воду в ${potCount} пустых пузырька (Малое зелье здоровья).`, keyboard: getWildKeyboard(char) });
                return;
             }
             // if it's explore_leave or something else
          }
          
          if (char.rpg.exploreState === 'merchant') {
             if (payloadCommand === 'explore_trade') {
                if (!char.rpg.exploreMerchantItems || char.rpg.exploreMerchantItems.length === 0) {
                    const catalogue = Object.values(ITEM_CATALOG);
                    const eqs = catalogue.filter(i => ['weapon', 'armor', 'helmet', 'shield', 'accessory'].includes(i.type));
                    const pots = catalogue.filter(i => i.type === 'consumable');
                    
                    const merchantItems = [];
                    const numEqs = Math.floor(Math.random() * 3) + 1;
                    const charLvl = char.rpg.level || 1;
                    
                    for (let i = 0; i < numEqs; i++) {
                       const isLegendary = Math.random() < 0.0098;
                       let pool = isLegendary ? eqs.filter(item => item.rarity === 'legendary') : eqs.filter(item => item.rarity !== 'legendary');
                       if (pool.length === 0) pool = eqs;
                       
                       const chosen = pool[Math.floor(Math.random() * pool.length)];
                       const addLvl = Math.floor(Math.random() * 16); // 0 to 15
                       const finalLvl = charLvl + addLvl;
                       
                       merchantItems.push(buildItemId(chosen.id, 0, 0, [], finalLvl));
                    }
                    
                    const numPots = Math.floor(Math.random() * 3) + 1;
                    for (let i = 0; i < numPots; i++) {
                       const chosen = pots[Math.floor(Math.random() * pots.length)];
                       merchantItems.push(buildItemId(chosen.id, 0, 0, [], charLvl));
                    }
                    
                    char.rpg.exploreMerchantItems = merchantItems;
                    await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
                }
                
                let msg = `🛒 Странствующий торговец\n"Смотри, что у меня есть, путник!"\nТвое золото: ${char.gold || 0} 💰\n\n`;
                const keyboard = Keyboard.builder();
                
                char.rpg.exploreMerchantItems.forEach((itemId: string, index: number) => {
                   const item = getItem(itemId);
                   if (item) {
                      let displayPrice = item.price;
                      if (item.type === 'consumable') displayPrice = displayPrice * 2; // More expensive
                      
                      msg += `${index + 1}. ${item.name} — ${displayPrice} 💰\n`;
                      keyboard.textButton({ label: `${index + 1}`, payload: { action: 'view_merchant', itemId: itemId, price: displayPrice }, color: Keyboard.SECONDARY_COLOR });
                      if ((index + 1) % 4 === 0) keyboard.row();
                   }
                });
                
                keyboard.row().textButton({ label: '⬅️ Уйти', payload: { command: 'explore_leave' }, color: Keyboard.SECONDARY_COLOR });
                
                await context.send({ message: msg, keyboard });
                return;
             } else {
                char.rpg.exploreState = null;
                char.rpg.exploreMerchantItems = null;
                await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
                await context.send({ message: 'Вы молча уходите.', keyboard: getWildKeyboard(char) });
                return;
             }
          }
          
          if (char.rpg.exploreState === 'dead_end' || char.rpg.exploreState === 'npc_encounter') {
             if (payloadCommand === 'explore_talk') {
                char.rpg.exploreState = null;
                const locId = char.location;
                const normLocId = (locId === 'city' || locId === 'city_1') ? 'loc_city_eldoria' : locId;
                const loc = WORLD_LOCATIONS.find((l: any) => l.id === normLocId);
                
                let npc: any;
                if (loc && loc.npcs && loc.npcs.length > 0) {
                   npc = loc.npcs[Math.floor(Math.random() * loc.npcs.length)];
                } else {
                   // Generate a random wild NPC
                   const wildNames = ['Скиталец', 'Охотник', 'Заблудший путник', 'Таинственный незнакомец', 'Раненый авантюрист'];
                   npc = {
                      id: `wild_npc_${Date.now()}`,
                      name: wildNames[Math.floor(Math.random() * wildNames.length)],
                      description: 'Странник, случайно встреченный на вашем пути.'
                   };
                   // We don't save this NPC to GLOBAL list, but we can converse right now
                }
                
                char.rpg.conversingNpcId = npc.id;
                char.rpg.tempNpc = npc; // Save temp npc data
                await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
                
                chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок встретил в диких землях NPC по имени ${npc.name} (${npc.description}). Начни отыгрыш сразу с приветствия.` }] });
                
                const kbTalk = Keyboard.builder()
                  .textButton({ label: '❌ Попрощаться (Уйти)', payload: { command: 'close_menu' }, color: Keyboard.NEGATIVE_COLOR })
                  .inline();
                await context.send({ message: `👤 Вы подошли к человеку впереди. Это ${npc.name}. (Напишите сообщение в чат для диалога)`, keyboard: kbTalk });
                return;
             } else {
                char.rpg.exploreState = null;
                await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
                await context.send({ message: 'Вы вернулись на тропу и продолжили путь.', keyboard: getWildKeyboard(char) });
                return;
             }
          }

          if (char.rpg.exploreState === 'ore_cave') {
             if (payloadCommand === 'explore_ore_cave_search') {
                const now = new Date();
                const endTime = now.getTime() + 5 * 60000;
                
                await safeSetDoc(doc(db, 'characters', char.id), { 
                  rpg: JSON.parse(JSON.stringify(char.rpg)),
                  actionEndTime: endTime,
                  actionType: 'ore_cave',
                  actionNotified: false
                }, { merge: true });
                
                const kbTravel = Keyboard.builder().textButton({ label: '⏳ Проверить', payload: { command: 'check_timer' }, color: Keyboard.SECONDARY_COLOR });
                await context.send({ message: `⛏️ Вы начали поиски лута в рудной пещере. Это займет 5 минут.`, keyboard: kbTravel });
                return;
             } else {
                char.rpg.exploreState = null;
                await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
                await context.send({ message: 'Вы прошли мимо пещеры.', keyboard: getWildKeyboard(char) });
                return;
             }
          }

          if (payloadCommand === 'explore_leave_next') {
             char.rpg.exploreState = null;
             char.rpg.foundNextDepth = false;
             char.rpg.dynamicPaths = [];
             await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
             await context.send({ message: 'Вы решили забыть этот путь и остались на текущем уровне.', keyboard: getWildKeyboard(char) });
             return;
          }

          if (payloadCommand === 'explore_leave_boss') {
             char.rpg.exploreState = null;
             char.rpg.foundBoss = false;
             char.rpg.dynamicPaths = [];
             await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
             await context.send({ message: 'Вы незаметно отступили, оставив логово Владыки позади. Придется искать его заново.', keyboard: getWildKeyboard(char) });
             return;
          }

          const rez = handleExplorationEvent(char, payloadCommand!);
          
          if (rez.enemyToFight) {
             chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Во время исследования локации на игрока напал ${rez.enemyToFight.name}!` }] });
             char.rpg.combat = createCombatState(rez.enemyToFight);
             await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
             await renderCombatUI(context, char, rez.msg);
             return;
          }
          
          await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold || 0, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          await context.send({ message: rez.msg, keyboard: getWildKeyboard(char) });
          return;
        }
        
        if (payloadCommand === 'go_deeper') {
           if (char.location === 'city') return;
           if (!char.rpg) char.rpg = DEFAULT_RPG_DATA;

          if (char.rpg.inventory) {
              char.rpg.inventory = char.rpg.inventory.filter(i => {
                 const item = getItem(i.itemId);
                 if (!item) return false;
                 // user says "удали сюжетные вещи" -> type === 'story'
                 if (item.type === ('story' as any) || item.type === ('quest' as any)) return false;
                 return true;
              });
          }

           
           if (!char.rpg.foundNextDepth) {
              await context.send({ message: 'Вы еще не нашли безопасный путь на следующий уровень!', keyboard: getWildKeyboard(char) });
              return;
           }
           char.rpg.foundNextDepth = false;
           char.rpg.locationDepth = (char.rpg.locationDepth || 1) + 1;
           await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
           await context.send({ message: `🌌 Вы спустились на уровень ${char.rpg.locationDepth}. Атмосфера стала тяжелее.`, keyboard: getWildKeyboard(char) });
           return;
        }
        
        if (payloadCommand === 'boss_fight') {
           if (char.location === 'city') return;
           if (!char.rpg) char.rpg = DEFAULT_RPG_DATA;

          if (char.rpg.inventory) {
              char.rpg.inventory = char.rpg.inventory.filter(i => {
                 const item = getItem(i.itemId);
                 if (!item) return false;
                 // user says "удали сюжетные вещи" -> type === 'story'
                 if (item.type === ('story' as any) || item.type === ('quest' as any)) return false;
                 return true;
              });
          }

           
           if (!char.rpg.foundBoss) {
              await context.send({ message: 'Вы еще не нашли логово Владыки этой зоны!', keyboard: getWildKeyboard(char) });
              return;
           }
           
           // Generate Boss
           let enemy;
           if (char.location === 'loc_forest_whispering') {
               const b = MONSTER_CATALOG['boss_forest_ent'];
               if (b) {
                   enemy = JSON.parse(JSON.stringify(b));
                   enemy.maxHp = enemy.hp;
                   enemy.stats = { maxHp: enemy.hp, attack: enemy.attack, defense: enemy.defense, agility: enemy.agility };
                   enemy.isBoss = true;
               }
           }
           
           if (!enemy) {
               enemy = generateEnemy(char.rpg.level + 5, undefined, char.location) as any;
               enemy.name = `Владыка зоны: ${enemy.name}`;
               if (!enemy.stats) enemy.stats = { maxHp: enemy.maxHp, attack: enemy.attack };
               enemy.stats.maxHp *= 3;
               enemy.hp = enemy.stats.maxHp;
               enemy.stats.attack = Math.floor(enemy.stats.attack * 1.5);
               enemy.goldReward = (enemy.goldReward || 10) * 5;
               enemy.isBoss = true;
           }
           
           char.rpg.foundBoss = false;
           char.rpg.combat = createCombatState(enemy);
           await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
           await renderCombatUI(context, char, `☠️ Вы входите в логово. ${enemy.name} обращает на вас свой яростный взор! Бой начинается!`);
           return;
        }

        if (text === 'магазин' || payloadCommand === 'shop') {
          const keyboard = Keyboard.builder()
            .textButton({ label: '⚔️ Оружейная', payload: { command: 'shop_cat', cat: 'weapon' }, color: Keyboard.PRIMARY_COLOR })
            .textButton({ label: '🛡️ Бронник', payload: { command: 'shop_cat', cat: 'armor' }, color: Keyboard.PRIMARY_COLOR })
            .row()
            .textButton({ label: '💍 Рынок аксессуаров', payload: { command: 'shop_cat', cat: 'accessory' }, color: Keyboard.PRIMARY_COLOR })
            .textButton({ label: '🧪 Рынок', payload: { command: 'shop_cat', cat: 'consumable' }, color: Keyboard.PRIMARY_COLOR })
            .row()
            .textButton({ label: '💰 Продать вещи', payload: { command: 'shop_sell_menu' }, color: Keyboard.NEGATIVE_COLOR })
            .textButton({ label: '🏰 В город', payload: { command: 'close_menu' }, color: Keyboard.SECONDARY_COLOR })
            ;
          await context.send({ message: `🏪 Добро пожаловать в торговый квартал Элдории!\nУ тебя: ${char.gold || 0} 💰\nВыбери лавку:`, keyboard });
          return;
        }

        if (text === 'гильдия' || text === 'гил. авантюристов' || payloadCommand === 'guild_menu') {
          if (char.location !== 'city') {
             await context.send('❌ Вы не в городе.');
             return;
          }
          const kb = Keyboard.builder()
            .textButton({ label: '📋 Доска заданий', payload: { command: 'guild_quests' }, color: Keyboard.PRIMARY_COLOR })
            .textButton({ label: '🗣 Поговорить с регистратором', payload: { command: 'guild_talk' }, color: Keyboard.PRIMARY_COLOR })
            .row()
            .textButton({ label: (char.rpg?.activeQuest ? '🔴 Мое задание' : '📋 Управление заданием'), payload: { command: 'guild_my_quest', from: 'guild' }, color: (char.rpg?.activeQuest ? Keyboard.NEGATIVE_COLOR : Keyboard.SECONDARY_COLOR) })
            .row()
            .textButton({ label: '🎟 Рейтинг', payload: { command: 'guild_top' }, color: Keyboard.PRIMARY_COLOR })
            .textButton({ label: '⬅️ В город', payload: { command: 'close_menu' }, color: Keyboard.NEGATIVE_COLOR });
          
          await context.send({ message: `📜 Вы вошли в Гильдию Авантюристов. Шумно, пахнет элем и сталью.\nВаш текущий ранг: ${char.rpg?.guildRank || 'D'}`, keyboard: kb });
          return;
        }

        if (payloadCommand === 'guild_quests' || (char.location === 'city' && text.includes('доск'))) {
          let globalData = await getDoc(doc(db, 'sessions', 'guild_quests'));
          let guildBoard = globalData.exists() ? globalData.data() : { quests: [], lastRefresh: 0 };
          const nowMs = Date.now();
          const limitMs = 3 * 60 * 60 * 1000; // 3 hours
          const D_RANK_MOBS = Object.values(MONSTER_CATALOG).filter(m => m.level >= 1 && m.level <= 15).map(m=>m.id);
          const C_RANK_MOBS = Object.values(MONSTER_CATALOG).filter(m => m.level >= 16 && m.level <= 35).map(m=>m.id);
          
          
          if (!guildBoard.quests || guildBoard.quests.length === 0 || (nowMs - guildBoard.lastRefresh > limitMs)) {
            guildBoard.quests = [];
            const MATERIAL_IDS = ['mat_pelt_1', 'mat_pelt_2', 'mat_bone_1', 'mat_fang_1', 'enhance_stone_1'];
            for (let i=0; i<3; i++) {
              let isGather = Math.random() < 0.3;
              let mId = D_RANK_MOBS[Math.floor(Math.random()*D_RANK_MOBS.length)] || 'mob_loc_city_eldoria_5';
              let m = MONSTER_CATALOG[mId];
              let targetCount = Math.floor(Math.random() * 3) + 3;
              let wildLocs = WORLD_LOCATIONS.filter(l => l.type !== 'city');
              let loc = wildLocs.length > 0 ? wildLocs[Math.floor(Math.random() * wildLocs.length)] : WORLD_LOCATIONS[0];
              
              if (isGather) {
                  let matId = MATERIAL_IDS[Math.floor(Math.random()*MATERIAL_IDS.length)];
                  let matInfo = Object.values(ITEM_CATALOG).find(i => i.id === matId) || { name: 'Материал' };
                  guildBoard.quests.push({
                     id: 'q_d_' + i + '_' + nowMs,
                     rank: 'D',
                     type: 'gather',
                     title: `Сбор: ${matInfo.name}`,
                     targetId: matId,
                     targetCount: targetCount,
                     locationName: 'Любая',
                     desc: `Соберите ${targetCount} ${matInfo.name} с монстров.`,
                     xpReward: Math.max(300, m.level * 40 * targetCount),
                     goldReward: Math.max(200, m.level * 50 * targetCount)
                  });
              } else {
                  guildBoard.quests.push({
                     id: 'q_d_' + i + '_' + nowMs,
                     rank: 'D',
                     type: 'kill',
                     title: `Истребление: ${m.name}`,
                     targetId: mId,
                     targetCount: targetCount,
                     locationName: loc.name,
                     desc: `Требуется убить ${targetCount} ${m.name}. Локация: ${loc.name}. Рекомендуемый уровень: ${m.level}-${m.level+5}`,
                     xpReward: Math.max(300, m.level * 40 * targetCount),
                     goldReward: Math.max(200, m.level * 50 * targetCount)
                  });
              }
            }
            guildBoard.lastRefresh = nowMs;

            await safeSetDoc(doc(db, 'sessions', 'guild_quests'), guildBoard, { merge: true });
          }

          let compQ = char.rpg.completedQuests || [];
          let uncompleted = guildBoard.quests.filter(q => !compQ.includes(q.id));
          
          if (uncompleted.length === 0) {
              const msLeft = (guildBoard.lastRefresh + limitMs) - nowMs;
              const minsForm = Math.floor(msLeft / 60000);
              await context.send({
                 message: `Вы выполнили все доступные задания на доске! Приходите позже.\nОбновление доски заданий через: ${Math.floor(minsForm/60)} ч ${minsForm%60} мин.`,
                 keyboard: Keyboard.builder().textButton({ label: '⬅️ Назад', payload: { command: 'guild_menu' }, color: Keyboard.SECONDARY_COLOR })
              });
              return;
          }

          let msg = "📜 Доска заданий:\n\n";
          let kb = Keyboard.builder();
          
          uncompleted.forEach((q, i) => {
             msg += `[${q.rank}-ранг] ${q.title}\nЦель: ${MONSTER_CATALOG[q.targetId]?.name || '???'}\n${q.desc}\nНаграда: ${q.goldReward}💰 ${q.xpReward} XP\n\n`;
             kb.textButton({ label: `Принять ${q.rank}-ранг`, payload: { command: 'guild_accept_' + q.id }, color: Keyboard.PRIMARY_COLOR }).row();
          });
          kb.textButton({ label: '⬅️ Назад', payload: { command: 'guild_menu' }, color: Keyboard.SECONDARY_COLOR });
          
          await context.send({ message: msg, keyboard: kb });
          return;
        }

        if (payloadCommand && payloadCommand.startsWith('guild_accept_')) {
          const qId = payloadCommand.replace('guild_accept_', '');
          let globalData = await getDoc(doc(db, 'sessions', 'guild_quests'));
          if (!globalData.exists()) return;
          let guildBoard = globalData.data();
          let q = guildBoard.quests.find(x => x.id === qId);
          if (!q) {
             await context.send('Квест не найден или уже устарел.');
             return;
          }
          if (!char.rpg.completedQuests) char.rpg.completedQuests = [];
          if (char.rpg.completedQuests.includes(qId)) {
             await context.send('Вы уже выполнили этот квест.');
             return;
          }
          
          if (char.rpg.activeQuest) { await context.send('Сначала завершите или отмените текущее задание!'); return; } char.rpg.activeQuest = Object.assign({}, q); char.rpg.activeQuest.progress = 0;
          await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          
          await context.send({
             message: `Вы приняли задание: ${q.title}.\nОтправляйтесь в путь и уничтожьте цель!`,
             keyboard: Keyboard.builder()
                .textButton({ label: '🗺️ В путь', payload: { command: 'travel' }, color: Keyboard.PRIMARY_COLOR })
                .row()
                .textButton({ label: '⬅️ В гильдию', payload: { command: 'guild_menu' }, color: Keyboard.SECONDARY_COLOR })
          });
          return;
        }

        
        if (payloadCommand === 'guild_my_quest') {
          const from = context.messagePayload.from || 'close_menu';
          let backCmd = 'close_menu';
          if (from === 'guild') backCmd = 'guild_menu';
          if (from === 'travel') backCmd = 'travel';
          if (from === 'explore') backCmd = 'close_menu'; // or something else

          if (!char.rpg.activeQuest) {
             const kb = Keyboard.builder().textButton({ label: '⬅️ Назад', payload: { command: backCmd }, color: Keyboard.SECONDARY_COLOR });
             await context.send({ message: 'У вас нет активного задания.', keyboard: kb });
             return;
          }
          const q = char.rpg.activeQuest;
          const kb = Keyboard.builder();
          let msg = `🔴 Текущее задание:\n[${q.rank}-ранг] ${q.title}\n${q.desc}\nПрогресс: ${q.progress || 0} / ${q.targetCount}\nНаграда: ${q.goldReward}💰 ${q.xpReward} XP\n`;
          
          let canComplete = false;
          if (q.type === 'gather') {
             const invItem = (char.rpg.inventory || []).find((i: any) => i.itemId === q.targetId);
             const amount = invItem ? invItem.amount : 0;
             msg += `\nВ инвентаре нужных предметов: ${amount} / ${q.targetCount}`;
             if (amount >= q.targetCount) canComplete = true;
          } else {
             if ((q.progress || 0) >= q.targetCount) canComplete = true;
          }

          if (canComplete) {
             kb.textButton({ label: '✅ Сдать задание', payload: { command: 'guild_complete_quest', from }, color: Keyboard.POSITIVE_COLOR }).row();
          }
          kb.textButton({ label: '❌ Отклонить/Уйти', payload: { command: 'guild_abandon_quest', from }, color: Keyboard.NEGATIVE_COLOR }).row();
          kb.textButton({ label: '⬅️ Назад', payload: { command: backCmd }, color: Keyboard.SECONDARY_COLOR });
          
          await context.send({ message: msg, keyboard: kb });
          return;
        }

        if (payloadCommand === 'guild_abandon_quest') {
          const from = context.messagePayload.from || 'close_menu';
          let backCmd = 'close_menu';
          if (from === 'guild') backCmd = 'guild_menu';
          if (from === 'travel') backCmd = 'travel';

          char.rpg.activeQuest = null;
          await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          const kb = Keyboard.builder().textButton({ label: '⬅️ Назад', payload: { command: backCmd }, color: Keyboard.SECONDARY_COLOR });
          await context.send({ message: 'Вы отказались от задания.', keyboard: kb });
          return;
        }

        if (payloadCommand === 'guild_complete_quest') {
          const from = context.messagePayload.from || 'close_menu';
          let backCmd = 'close_menu';
          if (from === 'guild') backCmd = 'guild_menu';
          if (from === 'travel') backCmd = 'travel';
          if (!char.rpg.activeQuest) return;
          const q = char.rpg.activeQuest;
          
          let canComplete = false;
          if (q.type === 'gather') {
             const invIndex = (char.rpg.inventory || []).findIndex((i: any) => i.itemId === q.targetId);
             if (invIndex >= 0 && char.rpg.inventory[invIndex].amount >= q.targetCount) {
                 char.rpg.inventory[invIndex].amount -= q.targetCount;
                 if (char.rpg.inventory[invIndex].amount <= 0) char.rpg.inventory.splice(invIndex, 1);
                 canComplete = true;
             }
          } else {
             if ((q.progress || 0) >= q.targetCount) canComplete = true;
          }

          if (canComplete) {
             char.gold = (char.gold || 0) + q.goldReward;
             const leveledUp = addXp(char.rpg, q.xpReward);
             if (!char.rpg.completedQuests) char.rpg.completedQuests = [];
             char.rpg.completedQuests.push(q.id);
             char.rpg.activeQuest = null;
             
             await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
             
             const kb = Keyboard.builder().textButton({ label: '⬅️ Назад', payload: { command: backCmd }, color: Keyboard.SECONDARY_COLOR });
             await context.send({ message: `✅ Задание "\${q.title}" выполнено!\nВы получили ${q.goldReward}💰 и ${q.xpReward} XP.`, keyboard: kb });
             return;
          }
        }

        if (payloadCommand === 'guild_top') {
          const charsSnapshot = await getDocs(query(collection(db, 'characters')));
          let allPlayers = charsSnapshot.docs.map(d => d.data());
          let guildMembers = allPlayers.map(p => ({
             name: p.name,
             quests: p.rpg?.completedQuests?.length || 0,
             isNpc: false
          }));

          const npcAdventurers = [
             { name: "Авантюрист Рен", quests: 120, isNpc: true },
             { name: "Маг Сильвия", quests: 95, isNpc: true },
             { name: "Рунник Галл", quests: 80, isNpc: true },
             { name: "Лучник Фей", quests: 50, isNpc: true },
             { name: "Страж Дорак", quests: 30, isNpc: true }
          ];
          
          guildMembers = guildMembers.concat(npcAdventurers);
          guildMembers.sort((a, b) => b.quests - a.quests);
          
          let topMsg = '🏆 Рейтинг Гильдии Авантюристов:\n\n';
          guildMembers.slice(0, 10).forEach((m, i) => {
             let icon = m.isNpc ? '🤖' : '👤';
             topMsg += `${i + 1}. ${icon} ${m.name} — Выполнено заданий: ${m.quests}\n`;
          });
          
          let myRank = guildMembers.findIndex(m => !m.isNpc && m.name === char.name) + 1;
          if (myRank > 0) {
             topMsg += `\nВаше место: ${myRank} (Заданий: ${char.rpg?.completedQuests?.length || 0})`;
          }

          const kb = Keyboard.builder()
             .textButton({ label: '⬅️ Назад', payload: { command: 'guild_menu' }, color: Keyboard.SECONDARY_COLOR });
          await context.send({ message: topMsg, keyboard: kb });
          return;
        }

        if (payloadCommand === 'guild_talk' || (char.location === 'city' && text.includes('регистратор'))) {
          const kb = Keyboard.builder()
            .textButton({ label: '⬅️ Назад', payload: { command: 'guild_menu' }, color: Keyboard.SECONDARY_COLOR });
          await context.send({ message: `👤 Регистратор: "Приветствую, авантюрист! Доска заданий регулярно обновляется. Выбирайте задания по силам: от сбора трав до охоты на опасных монстров. Удачи!"`, keyboard: kb });
          return;
        }

        if (text === 'воскресить_каина') {
            const charsSnapshot = await getDocs(query(collection(db, 'characters'), where('name', '==', 'Каин')));
            if (!charsSnapshot.empty) {
                const charDoc = charsSnapshot.docs[0];
                const charData = charDoc.data() as any;
                charData.rpg.baseStats.hp = charData.rpg.baseStats.maxHp;
                charData.rpg.deathState = 'alive';
                charData.actionType = null;
                charData.actionEndTime = null;
                await safeSetDoc(doc(db, 'characters', charDoc.id), charData, { merge: true });
                await context.send("✨ Каин воскрешен. БОГ ВЫКЛЮЧЕН.");
            } else {
                await context.send("Каин не найден.");
            }
            return;
        }

        // Commented out automatic revive logic
        /*
        const charsSnapshotKain = await getDocs(query(collection(db, 'characters'), where('name', '==', 'Каин')));
        if (!charsSnapshotKain.empty) {
            const charDoc = charsSnapshotKain.docs[0];
            const charData = charDoc.data() as any;
            if (charData.rpg.deathState === 'dead') {
                charData.rpg.baseStats.hp = charData.rpg.baseStats.maxHp;
                charData.rpg.deathState = 'alive';
                charData.actionType = null;
                charData.actionEndTime = null;
                await safeSetDoc(doc(db, 'characters', charDoc.id), charData, { merge: true });
                await context.send("✨ Каин воскрешен. БОГ ВЫКЛЮЧЕН.");
            }
        }
        */

        if (text === 'группа' || text === 'пати' || payloadCommand === 'party') {
          if (!char.rpg.partyId) {
             const kb = Keyboard.builder()
               .textButton({ label: '🫂 Найти игроков', payload: { command: 'party_nearby' }, color: Keyboard.PRIMARY_COLOR })
               .textButton({ label: '➕ Создать', payload: { command: 'party_create' }, color: Keyboard.SECONDARY_COLOR });
             await context.send({ message: 'Вы не состоите в группе.', keyboard: kb });
          } else {
             const partyDoc = await getDoc(doc(db, 'parties', char.rpg.partyId));
             if (!partyDoc.exists()) {
                char.rpg.partyId = null;
                await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
                await context.send('Ваша группа была распущена.');
                return;
             }
             const party = partyDoc.data();
             let msg = '👥 Ваша группа:\n\n';
             const kb = Keyboard.builder();
             
             let pCount = 0;
             for (const mid of party.members) {
                const memDoc = await getDoc(doc(db, 'characters', mid));
                if (memDoc.exists()) {
                   const mchar = memDoc.data();
                   msg += `${pCount + 1}. ${mchar.name} [Ур. ${mchar.rpg?.level || 1}]\n`;
                   kb.textButton({ label: `${pCount + 1}. ${mchar.name}`, payload: { command: 'party_view_' + mid }, color: Keyboard.PRIMARY_COLOR });
                   if ((pCount + 1) % 2 === 0) kb.row();
                   pCount++;
                }
             }
             if (pCount % 2 !== 0) kb.row();

             kb.textButton({ label: '🚪 Покинуть группу', payload: { command: 'party_leave' }, color: Keyboard.NEGATIVE_COLOR }).row();
             if (pCount < 4 && party.leaderId === char.id) {
                kb.textButton({ label: '🫂 Пригласить игроков рядом', payload: { command: 'party_nearby' }, color: Keyboard.PRIMARY_COLOR });
             }
             await context.send({ message: msg, keyboard: kb });
          }
          return;
        }

        if (payloadCommand === 'kain_sword_take') {
             await context.send("🗡️ Вы хватаетесь за рукоять... Ад разверзается под вашими ногами!");
             if (Math.random() < 0.9) {
                 char.rpg.baseStats.hp = 0;
                 char.rpg.deathState = 'dead';
                 char.actionType = 'dead';
                 char.actionEndTime = Date.now() + 3600 * 1000;
                 await safeSetDoc(doc(db, 'characters', char.id), { 
                     rpg: JSON.parse(JSON.stringify(char.rpg)), 
                     actionEndTime: char.actionEndTime,
                     actionType: char.actionType 
                 }, { merge: true });
                 await context.send("💀 Меч поглотил вашу душу и отправил в Ад. Вы мертвы.");
             } else {
                 await context.send("✨ Вы выжили! Власть меча теперь ваша.");
             }
             return;
        }

        if (payloadCommand === 'kain_sword_leave') {
             await context.send("🏃 Вы решаете не рисковать и проходите мимо.");
             return;
        }
        
        if (payloadCommand === 'party_create') {
           if (char.rpg.partyId) {
              await context.send('Вы уже в группе.');
              return;
           }
           const pid = 'party_' + Date.now() + '_' + Math.floor(Math.random()*1000);
           await safeSetDoc(doc(db, 'parties', pid), {
              id: pid, leaderId: char.id, members: [char.id]
           });
           char.rpg.partyId = pid;
           await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
           
           const kb = Keyboard.builder().textButton({ label: '📋 Группа', payload: { command: 'party' }, color: Keyboard.PRIMARY_COLOR });
           await context.send({ message: 'Группа успешно создана!', keyboard: kb });
           return;
        }

        if (payloadCommand === 'party_leave') {
           if (!char.rpg.partyId) return;
           const partyDoc = await getDoc(doc(db, 'parties', char.rpg.partyId));
           if (partyDoc.exists()) {
              const party = partyDoc.data();
              party.members = party.members.filter((id: string) => id !== char.id);
              if (party.members.length === 0) {
                 // Or delete... 
                 // we will just set members empty.
              } else if (party.leaderId === char.id) {
                 party.leaderId = party.members[0];
              }
              await safeSetDoc(doc(db, 'parties', char.rpg.partyId), party, { merge: true });
           }
           char.rpg.partyId = null;
           await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
           await context.send('Вы покинули группу.');
           return;
        }

        if (payloadCommand === 'party_nearby') {
           if (!char.rpg.partyId) {
              await context.send('Сначала создайте группу!');
              return;
           }
           const partyDoc = await getDoc(doc(db, 'parties', char.rpg.partyId));
           if (!partyDoc.exists()) return;
           const party = partyDoc.data();
           if (party.leaderId !== char.id) {
              await context.send('Только лидер может приглашать новых игроков.');
              return;
           }
           if (party.members.length >= 4) {
              await context.send('Группа уже полная (макс. 4).');
              return;
           }

           const snap = await getDocs(query(collection(db, 'characters'), where('location', '==', char.location)));
           const players = snap.docs.map(d => ({id: d.id, ...d.data() as any})).filter((c: any) => c.id !== char.id && !c.deleted && c.rpg && ((c.rpg.locationDepth || 1) === (char.rpg.locationDepth || 1)));
           
           if (players.length === 0) {
              await context.send('Рядом никого нет.');
              return;
           }

           let msg = '👤 Игроки рядом:\n\n';
           const kb = Keyboard.builder();
           
           let pCount = 0;
           players.slice(0, 10).forEach(p => {
              if (p.rpg.partyId) return; // already in a party possibly
              pCount++;
              msg += `${pCount}. ${p.name} [Ур. ${p.rpg.level}]\n`;
              kb.textButton({ label: `Пригласить ${p.name}`, payload: { command: 'party_invite_' + p.id }, color: Keyboard.PRIMARY_COLOR }).row();
           });

           if (pCount === 0) {
              await context.send('Рядом есть игроки, но все они уже в группах.');
              return;
           }

           kb.textButton({ label: '🔙 Вернуться', payload: { command: 'party' }, color: Keyboard.SECONDARY_COLOR });
           await context.send({ message: msg, keyboard: kb });
           return;
        }

        if (payloadCommand?.startsWith('party_invite_')) {
           const targetId = payloadCommand.replace('party_invite_', '');
           if (!char.rpg.partyId) return;
           
           const memDoc = await getDoc(doc(db, 'characters', targetId));
           if (!memDoc.exists()) return;
           const targetUser = memDoc.data();
           
           if (!targetUser.rpg) targetUser.rpg = JSON.parse(JSON.stringify(DEFAULT_RPG_DATA));
           if (!targetUser.rpg.partyInvites) targetUser.rpg.partyInvites = {};
           
           targetUser.rpg.partyInvites[char.rpg.partyId] = {
              fromName: char.name, time: Date.now()
           };
           await safeSetDoc(doc(db, 'characters', targetId), { rpg: JSON.parse(JSON.stringify(targetUser.rpg)) }, { merge: true });
           
           await context.send('Приглашение отправлено игроку ' + targetUser.name);
           
           // VK notify
           const pKb = Keyboard.builder()
              .textButton({ label: '✅ Принять', payload: { command: 'party_accept_' + char.rpg.partyId }, color: Keyboard.POSITIVE_COLOR })
              .textButton({ label: '❌ Отклонить', payload: { command: 'party_decline_' + char.rpg.partyId }, color: Keyboard.NEGATIVE_COLOR });
           
           await vk.api.messages.send({
              peer_id: targetUser.ownerId,
              random_id: Date.now(),
              message: `🫂 Игрок ${char.name} приглашает вас в группу!`,
              keyboard: pKb
           }).catch(()=>{});

           return;
        }

        if (payloadCommand?.startsWith('party_decline_')) {
           const partyId = payloadCommand.replace('party_decline_', '');
           if (char.rpg.partyInvites && char.rpg.partyInvites[partyId]) {
              char.rpg.partyInvites[partyId] = null;
              await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
           }
           await context.send('Вы отклонили приглашение.');
           return;
        }

        if (payloadCommand?.startsWith('party_accept_')) {
           const partyId = payloadCommand.replace('party_accept_', '');
           if (char.rpg.partyId) {
              await context.send('Вы уже в группе.');
              return;
           }
           if (!char.rpg.partyInvites || !char.rpg.partyInvites[partyId]) {
              await context.send('Приглашение не найдено или истекло.');
              return;
           }

           const partyDoc = await getDoc(doc(db, 'parties', partyId));
           if (!partyDoc.exists()) {
              await context.send('Группа больше не существует.');
              return;
           }
           const party = partyDoc.data();
           if (party.members.length >= 4) {
              await context.send('В группе уже максимальное количество участников.');
              return;
           }

           party.members.push(char.id);
           await safeSetDoc(doc(db, 'parties', partyId), party, { merge: true });
           
           char.rpg.partyId = partyId;
           char.rpg.partyInvites[partyId] = null;
           await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
           
           await context.send('Вы успешно вступили в группу!');
           return;
        }

        if (payloadCommand?.startsWith('party_view_')) {
           const targetId = payloadCommand.replace('party_view_', '');
           if (!char.rpg.partyId) return;
           
           const partyDoc = await getDoc(doc(db, 'parties', char.rpg.partyId));
           if (!partyDoc.exists()) return;
           const party = partyDoc.data();
           if (!party.members.includes(targetId)) return;
           
           const memDoc = await getDoc(doc(db, 'characters', targetId));
           if (!memDoc.exists()) return;
           const targetMem = memDoc.data();
           
           let msg = `👤 Участник: ${targetMem.name}\nУровень: ${targetMem.rpg?.level || 1}\nКласс: ${targetMem.rpg?.class || 'Без класса'}`;
           
           const kb = Keyboard.builder()
             .textButton({ label: '✉️ Написать', payload: { command: 'party_msg_menu_' + targetId }, color: Keyboard.PRIMARY_COLOR })
             .textButton({ label: '🤝 Трейд', payload: { command: 'party_trade_view_' + targetId }, color: Keyboard.SECONDARY_COLOR })
             .row();
             
           if (party.leaderId === char.id && targetId !== char.id) {
             kb.textButton({ label: '👢 Кикнуть', payload: { command: 'party_kick_' + targetId }, color: Keyboard.NEGATIVE_COLOR }).row();
           }
           kb.textButton({ label: '🔙 Назад', payload: { command: 'party' }, color: Keyboard.SECONDARY_COLOR });
           
           await context.send({ message: msg, keyboard: kb });
           return;
        }

        if (payloadCommand?.startsWith('party_trade_view_')) {
           const targetId = payloadCommand.replace('party_trade_view_', '');
           const kb = Keyboard.builder()
             .textButton({ label: '💰 Передать золото', payload: { command: 'party_trade_gold_' + targetId }, color: Keyboard.PRIMARY_COLOR })
             .row()
             .textButton({ label: '📦 Передать вещь', payload: { command: 'party_trade_items_' + targetId + '!0' }, color: Keyboard.PRIMARY_COLOR })
             .row()
             .textButton({ label: '🔙 Назад к участнику', payload: { command: 'party_view_' + targetId }, color: Keyboard.SECONDARY_COLOR });
           await context.send({ message: 'Что вы хотите передать участнику?', keyboard: kb });
           return;
        }

        if (payloadCommand?.startsWith('party_trade_gold_')) {
           const targetId = payloadCommand.replace('party_trade_gold_', '');
           char.rpg.pendingTradeGoldTo = targetId;
           await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
           const kb = Keyboard.builder()
             .textButton({ label: '❌ Отмена', payload: { command: 'party_trade_gold_cancel' }, color: Keyboard.NEGATIVE_COLOR });
           
           await context.send({ message: `У вас ${char.gold || 0} 💰.\n⌨️ Напишите в чат сумму, которую хотите передать (или нажмите Отмена):`, keyboard: kb });
           return;
        }
        
        if (payloadCommand === 'party_trade_gold_cancel') {
           if (char.rpg.pendingTradeGoldTo) {
              char.rpg.pendingTradeGoldTo = null;
              await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
              await context.send('Передача золота отменена.');
           }
           return;
        }

        if (payloadCommand?.startsWith('party_trade_item_confirm_')) {
           const stripped = payloadCommand.replace('party_trade_item_confirm_', '');
           const sepIdx = stripped.lastIndexOf('!');
           const itemId = stripped.substring(0, sepIdx);
           const targetId = stripped.substring(sepIdx + 1);
           
           const invIndex = char.rpg.inventory?.findIndex((i: any) => i.itemId === itemId);
           if (invIndex === undefined || invIndex === -1) {
             await context.send('Предмет не найден в инвентаре.');
             return;
           }
           
           const targetDoc = await getDoc(doc(db, 'characters', targetId));
           if (!targetDoc.exists()) return;
           const targetChar = targetDoc.data();
           if (!targetChar.rpg.inventory) targetChar.rpg.inventory = [];
           const targetInvItem = targetChar.rpg.inventory.find((i: any) => i.itemId === itemId);
           if (!targetInvItem && targetChar.rpg.inventory.length >= 30) {
             await context.send('У получателя заполнен инвентарь (макс. 30)!');
             return;
           }
           
           if (char.rpg.inventory[invIndex].amount > 1) {
             char.rpg.inventory[invIndex].amount -= 1;
           } else {
             char.rpg.inventory.splice(invIndex, 1);
           }
           await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
           
           if (targetInvItem) {
             targetInvItem.amount += 1;
           } else {
             targetChar.rpg.inventory.push({ itemId, amount: 1 });
           }
           await safeSetDoc(doc(db, 'characters', targetId), { rpg: JSON.parse(JSON.stringify(targetChar.rpg)) }, { merge: true });
           
           const itemDef = getItem(itemId);
           const itemName = itemDef ? itemDef.name : itemId;
           await context.send(`Вы успешно передали предмет "${itemName}" игроку ${targetChar.name}!`);
           
           await vk.api.messages.send({
                peer_id: targetChar.ownerId,
                random_id: Date.now(),
                message: `🎁 Игрок ${char.name} передал вам "${itemName}".`
           }).catch(()=>{});
           return;
        }

        if (payloadCommand?.startsWith('party_trade_items_')) {
           const stripped = payloadCommand.replace('party_trade_items_', '');
           const sepIdx = stripped.lastIndexOf('!');
           const targetId = stripped.substring(0, sepIdx);
           const page = parseInt(stripped.substring(sepIdx + 1) || '0');
           
           const inv = char.rpg.inventory || [];
           if (inv.length === 0) {
              await context.send({
                message: 'Ваш инвентарь пуст.',
                keyboard: Keyboard.builder().textButton({ label: '🔙 Назад', payload: { command: 'party_trade_view_' + targetId }, color: Keyboard.SECONDARY_COLOR })
              });
              return;
           }
           
           const itemsPerPage = 5;
           const totalPages = Math.ceil(inv.length / itemsPerPage);
           const pagedInv = inv.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
           
           let msg = `Выберите предмет для передачи (Стр. ${page + 1}/${totalPages}):\n`;
           const kb = Keyboard.builder();
           
           for (const item of pagedInv) {
             const def = getItem(item.itemId);
             const name = def ? def.name : item.itemId;
             kb.textButton({ label: `Отдать: ${name}`, payload: { command: `party_trade_item_confirm_${item.itemId}!${targetId}` }, color: Keyboard.PRIMARY_COLOR }).row();
           }
           
           if (page > 0) kb.textButton({ label: '⬅️ Назад', payload: { command: `party_trade_items_${targetId}!${page - 1}` }, color: Keyboard.SECONDARY_COLOR });
           if (page < totalPages - 1) kb.textButton({ label: 'Вперед ➡️', payload: { command: `party_trade_items_${targetId}!${page + 1}` }, color: Keyboard.SECONDARY_COLOR });
           if (totalPages > 1) kb.row();
           
           kb.textButton({ label: '🔙 К трейду', payload: { command: 'party_trade_view_' + targetId }, color: Keyboard.SECONDARY_COLOR });
           
           await context.send({ message: msg, keyboard: kb });
           return;
        }

        if (payloadCommand?.startsWith('party_kick_')) {
           const targetId = payloadCommand.replace('party_kick_', '');
           if (!char.rpg.partyId) return;
           
           const partyDoc = await getDoc(doc(db, 'parties', char.rpg.partyId));
           if (!partyDoc.exists()) return;
           const party = partyDoc.data();
           
           if (party.leaderId !== char.id) {
             await context.send('Только лидер может выгонять из группы.');
             return;
           }

           party.members = party.members.filter((id: string) => id !== targetId);
           await safeSetDoc(doc(db, 'parties', char.rpg.partyId), party, { merge: true });
           
           // Update target user
           const memDoc = await getDoc(doc(db, 'characters', targetId));
           if (memDoc.exists()) {
             const mData = memDoc.data();
             if (mData.rpg) {
                mData.rpg.partyId = null;
                await safeSetDoc(doc(db, 'characters', targetId), { rpg: JSON.parse(JSON.stringify(mData.rpg)) }, { merge: true });
             }
             await vk.api.messages.send({
                peer_id: mData.ownerId,
                random_id: Date.now(),
                message: `Вас исключили из группы.`
             }).catch(()=>{});
           }
           
           await context.send('Участник исключен.');
           return;
        }

        if (payloadCommand?.startsWith('party_msg_menu_')) {
           const targetId = payloadCommand.replace('party_msg_menu_', '');
           char.rpg.pendingMessageTo = targetId;
           await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
           
           const kb = Keyboard.builder().textButton({ label: '❌ Отмена', payload: { command: 'party_msg_cancel' }, color: Keyboard.NEGATIVE_COLOR });
           await context.send({ message: '⌨️ Напишите в чат ваше сообщение для отправки (или нажмите Отмена):', keyboard: kb });
           return;
        }
        
        if (payloadCommand === 'party_msg_cancel') {
           if (char.rpg.pendingMessageTo) {
              char.rpg.pendingMessageTo = null;
              await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
              await context.send('Вы отменили отправку сообщения.');
           }
           return;
        }

        if (text === 'работа' || payloadCommand === 'work') {
          if (char.location !== 'city') {
            await context.send('❌ Работать можно только в городе.');
            return;
          }
          if (!char.rpg.workStats.history) char.rpg.workStats.history = [];
          char.rpg.workStats.history = char.rpg.workStats.history.filter((t: number) => now.getTime() - t < 5 * 60 * 60 * 1000);
          
          if (char.rpg.workStats.history.length >= 3) {
            await context.send('❌ Вы слишком устали. Можно работать не более 3 раз за 5 часов.');
            return;
          }
          
          char.rpg.workStats.history.push(now.getTime());
          
          // Set 5 min timer
          const endTime = now.getTime() + 5 * 60000;
          
          await safeSetDoc(doc(db, 'characters', char.id), { 
            rpg: JSON.parse(JSON.stringify(char.rpg)),
            actionEndTime: endTime,
            actionType: 'work',
            actionNotified: false
          }, { merge: true });
          await context.send('💼 Вы начали работу. Это займет 5 минут. По завершении вы получите золото. Осталось работ: ' + (3 - char.rpg.workStats.history.length));
          return;
        }

        if (text === 'путешествие' || payloadCommand === 'travel' || payloadCommand?.startsWith('travel_loc_page_')) {
          if (char.location !== 'city') {
            await context.send({ message: 'Вы не в городе.', keyboard: getWildKeyboard(char) });
            return;
          }
          
          let page = 0;
          if (payloadCommand?.startsWith('travel_loc_page_')) {
            page = parseInt(payloadCommand.replace('travel_loc_page_', '')) || 0;
          }

          const wildLocations = WORLD_LOCATIONS.filter(l => l.type !== 'city');
          const perPage = 5;
          const totalPages = Math.ceil(wildLocations.length / perPage);
          const currentNodes = wildLocations.slice(page * perPage, (page + 1) * perPage);

          let kb = Keyboard.builder();
          
          currentNodes.forEach(loc => {
            let icon = '🌲';
            if (loc.type === 'cave') icon = '🦇';
            if (loc.type === 'dungeon') icon = '☠️';
            if (loc.type === 'mountain') icon = '🏔️';
            if (loc.type === 'ruins') icon = '🏛️';
            if (loc.type === 'plains') icon = '🌾';
            if (loc.type === 'swamp') icon = '🐸';
            if (loc.type === 'wasteland') icon = '🌋';
            if (loc.type === 'island') icon = '🏝️';
            
            kb.textButton({ label: `${icon} ${loc.name} (ур. ${loc.levelMin}-${loc.levelMax})`, payload: { command: 'travel_select_' + loc.id }, color: Keyboard.PRIMARY_COLOR }).row();
          });

          // Pagination
          if (totalPages > 1) {
            if (page > 0) kb.textButton({ label: '⬅️ Сюда', payload: { command: 'travel_loc_page_' + (page - 1) }, color: Keyboard.SECONDARY_COLOR });
            kb.textButton({ label: `${page + 1}/${totalPages}`, payload: { command: 'game_choice' }, color: Keyboard.SECONDARY_COLOR });
            if (page < totalPages - 1) kb.textButton({ label: 'Туда ➡️', payload: { command: 'travel_loc_page_' + (page + 1) }, color: Keyboard.SECONDARY_COLOR });
            kb.row();
          }

          kb.textButton({ label: (char.rpg?.activeQuest ? '🔴 Мое задание' : '📋 Задания'), payload: { command: 'guild_my_quest', from: 'travel' }, color: (char.rpg?.activeQuest ? Keyboard.NEGATIVE_COLOR : Keyboard.SECONDARY_COLOR) });
          kb.row();
          kb.textButton({ label: '🚫 Назад', payload: { command: 'city_menu' }, color: Keyboard.SECONDARY_COLOR });
          
          let msgText = '🗺️ Выберите регион для путешествия:\n';
          msgText += 'Чем выше максимальный уровень, тем сильнее монстры и ценнее лут.';

          if (payloadCommand?.startsWith('travel_loc_page_')) {
             await context.send({ message: msgText, keyboard: kb });
          } else {
             await context.send({ message: msgText, keyboard: kb });
          }
          return;
        }

        if (payloadCommand?.startsWith('travel_select_')) {
          const locId = payloadCommand.replace('travel_select_', '');
          const loc = WORLD_LOCATIONS.find(l => l.id === locId);
          if (!loc) return;

          let icon = '🌲';
          if (loc.type === 'cave') icon = '🦇';
          if (loc.type === 'dungeon') icon = '☠️';
          if (loc.type === 'mountain') icon = '🏔️';
          if (loc.type === 'ruins') icon = '🏛️';
          if (loc.type === 'plains') icon = '🌾';
          if (loc.type === 'swamp') icon = '🐸';
          if (loc.type === 'wasteland') icon = '🌋';
          if (loc.type === 'island') icon = '🏝️';

          let title = `${icon} ${loc.name}`;
          let info = `${loc.description}\n(Рекомендуемый уровень: ${loc.levelMin}-${loc.levelMax})`;
          
          const MAX_DISPLAY_MOBS = 5;
          let mobsText = '';
          if (loc.monsters && loc.monsters.length > 0) {
              const mobNames = loc.monsters.slice(0, MAX_DISPLAY_MOBS).map(mId => MONSTER_CATALOG[mId]?.name || mId);
              mobsText = `\nОбитатели: ${mobNames.join(', ')}` + (loc.monsters.length > MAX_DISPLAY_MOBS ? ' и другие...' : '.');
          }
          
          let kb = Keyboard.builder()
            .textButton({ label: '🚶 Отправиться', payload: { command: 'travel_confirm_' + locId }, color: Keyboard.POSITIVE_COLOR })
            .textButton({ label: '⬅️ Назад к выбору', payload: { command: 'travel' }, color: Keyboard.SECONDARY_COLOR })
            .row()
            .textButton({ label: '🔙 Вернуться в город', payload: { command: 'city_menu' }, color: Keyboard.SECONDARY_COLOR })
            ;
          
          await context.send({ message: `📍 ${title}\n\n${info}\n${mobsText}`, keyboard: kb });
          return;
        }

        if (payloadCommand?.startsWith('travel_confirm_')) {
          const areaId = payloadCommand.replace('travel_confirm_', '');
          
          const endTime = now.getTime() + 1 * 60000;
          if (!char.rpg) char.rpg = DEFAULT_RPG_DATA;

          if (char.rpg.inventory) {
              char.rpg.inventory = char.rpg.inventory.filter(i => {
                 const item = getItem(i.itemId);
                 if (!item) return false;
                 // user says "удали сюжетные вещи" -> type === 'story'
                 if (item.type === ('story' as any) || item.type === ('quest' as any)) return false;
                 return true;
              });
          }

          char.rpg.locationDepth = 1;
          
          // Store area in a custom property if we want, or just stick with forest logic
          // Let's use 'forest' internally but maybe store char.rpg.currentBiome
          (char.rpg as any).currentBiome = areaId;

          await safeSetDoc(doc(db, 'characters', char.id), { 
            rpg: JSON.parse(JSON.stringify(char.rpg)),
            actionEndTime: endTime,
            actionType: 'travel',
            actionTargetLocation: areaId,
            actionNotified: false
          }, { merge: true });
          const kbTravel = Keyboard.builder().textButton({ label: '🚶 Персонаж в пути', payload: { command: 'check_timer' }, color: Keyboard.SECONDARY_COLOR });
          await context.send({ message: `🗺️ Вы отправились в путь. Путешествие займет 1 минуту.`, keyboard: kbTravel });
          return;
        }

        if (text === '🔍 искать монстров' || text === 'искать монстров' || payloadCommand === 'search_monsters' || (payloadCommand === 'game_choice' && text.includes('искать монстров'))) {
          if (char.location === 'city') {
            await context.send('В городе безопасно, здесь нет монстров. Попробуйте выйти за город.');
            userLocks.delete(senderId);
            return;
          }
          if (!char.rpg) char.rpg = DEFAULT_RPG_DATA;

          if (char.rpg.inventory) {
              char.rpg.inventory = char.rpg.inventory.filter(i => {
                 const item = getItem(i.itemId);
                 if (!item) return false;
                 // user says "удали сюжетные вещи" -> type === 'story'
                 if (item.type === ('story' as any) || item.type === ('quest' as any)) return false;
                 return true;
              });
          }

          
          // 20% chance for random event (chest/finding item)
          if (Math.random() < 0.2) {
            const isGold = Math.random() < 0.5; // 50% chance for gold, 50% for item
            let eventMsg = 'Вы исследовали местность и наткнулись на спрятанный сундук!\n';
            if (isGold) {
              const goldFound = Math.floor(Math.random() * 151) + 50; // 50 to 200
              char.gold = (char.gold || 0) + goldFound;
              eventMsg += `В сундуке оказалось ${goldFound} 💰.`;
            } else {
              let rarity = 'common';
              const rand = Math.random();
              if (rand < 0.001) rarity = 'legendary';
              else if (rand < 0.009) rarity = 'epic';
              else if (rand < 0.1) rarity = 'rare';
              else if (rand < 0.4) rarity = 'uncommon';

              const allItems = Object.values(ITEM_CATALOG);
              const possibleItems = allItems.filter((i: any) => i.rarity === rarity && i.type !== 'material');
              if (possibleItems.length > 0) {
                const itemDef: any = possibleItems[Math.floor(Math.random() * possibleItems.length)];
                let finalId = itemDef.id;
                if (['weapon', 'armor', 'helmet', 'shield'].includes(itemDef.type) && Math.random() < 0.2) {
                   finalId += '_s1';
                }
                const isSlotted = finalId.includes('_s1');
                eventMsg += `Вы нашли: ${itemDef.name}${isSlotted ? ' [1 Слот]' : ''} (${rarity})!`;
                if (rarity === 'epic' || rarity === 'legendary') {
                  eventMsg = `🎉 НЕВЕРОЯТНАЯ УДАЧА! 🎉\nВы нашли древний тайник и достали оттуда:\n✨ ${itemDef.name}${isSlotted ? ' [1 Слот]' : ''} (${rarity.toUpperCase()})!`;
                }

                const existingItem = char.rpg.inventory.find((i: any) => i.itemId === finalId);
                if (existingItem) {
                  existingItem.amount += 1;
                } else {
                  if (char.rpg.inventory.length < 30) {
                    char.rpg.inventory.push({ itemId: finalId, amount: 1 });
                  } else {
                    eventMsg += `\n(Но ваш рюкзак полон, предмет утерян...)`;
                  }
                }
              } else {
                const goldFound = 100;
                char.gold = (char.gold || 0) + goldFound;
                eventMsg += `В сундуке оказалось ${goldFound} 💰.`;
              }
            }

            await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
            
            chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок написал "Искать монстров" и нашел сундук. Результат: ${eventMsg}` }] });
            userLocks.delete(senderId);
            
            const keyboard = getWildKeyboard(char);

            await context.send({ message: eventMsg, keyboard });
            return;
          }

          let enemy: any;
          let questMonsterName = null;
          
          // Try to extract quest monster from active quest line
          if (char.rpg.activeQuest) {
            const questText = (typeof char.rpg.activeQuest === 'object') ? (char.rpg.activeQuest.desc || '') : char.rpg.activeQuest;
            const match = questText.match(/Убить \d+ (.*?)\./i) || questText.match(/Убить \d+ (.*?)$/i);
            if (match) {
              questMonsterName = match[1].trim();
            }
          }

          // Use the biome stored in char.rpg or default to forest
          const biome = (char.rpg as any).currentBiome || char.location || 'forest';

          // 30% chance to encounter exactly the quest target
          if (questMonsterName && Math.random() < 0.3) {
             enemy = generateEnemy(char.rpg.level, questMonsterName, biome, char.rpg.locationDepth);
          } else {
             enemy = generateEnemy(char.rpg.level, undefined, biome, char.rpg.locationDepth);
          }
          
          if (!char.rpg.baseStats) {
            char.rpg.baseStats = {
              hp: 100, mp: 50,
              maxHp: 100, maxMp: 50,
              attack: 10, magicAttack: 0, defense: 5, magicDefense: 0, agility: 5
            };
          }

          char.rpg.combat = createCombatState(enemy, { type: 'wild' });
          
          addLog(`[СИСТЕМА]: ${char.name} нашел монстра ${enemy.name}`);
          
          const result = processCombatTurn(char.rpg, 'attack', undefined, char.charClass);
          
          if (result.won) {
            if (char.rpg.activeQuest && char.rpg.activeQuest.type !== 'gather' && char.rpg.activeQuest.targetId === (result as any).enemyId) {
                 char.rpg.activeQuest.progress = (char.rpg.activeQuest.progress || 0) + 1;
                 (result as any).log += `\n\n🎯 Прогресс задания: ${char.rpg.activeQuest.progress} / ${char.rpg.activeQuest.targetCount}`;
            }
            char.gold = (char.gold || 0) + result.gold;
            const leveledUp = addXp(char.rpg, result.xp);
            let msg = `🌲 Вы находите врага (${enemy.name}) и сразу атакуете!\n\n${result.log}\n💰 Получено ${result.gold} золота и ${result.xp} XP!`;
            
            chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок встретил врага и мгновенно победил.` }] });
            
            if (result.lootDrops && result.lootDrops.length > 0) {
              msg += `\n🎁 Выпал лут:\n`;
              const locData = WORLD_LOCATIONS.find(l => l.id === char.location);
              const minLevel = locData?.levelMin || 1;
              const maxLevel = locData?.levelMax || (minLevel + 5);
              
              result.lootDrops.forEach((itemDefId: string) => {
                const item = getItem(itemDefId);
                let finalId = itemDefId;
                let droppedLevel = 1;
                
                if (item && ['weapon', 'armor', 'helmet', 'shield', 'accessory'].includes(item.type)) {
                   droppedLevel = Math.floor(Math.random() * (maxLevel - minLevel + 1)) + minLevel;
                   if (Math.random() < 0.2) {
                      finalId = buildItemId(finalId, 0, 1, [], droppedLevel);
                   } else {
                      finalId = buildItemId(finalId, 0, 0, [], droppedLevel);
                   }
                }
                
                const parsedItem = getItem(finalId);
                if (parsedItem) {
                  const { slots, level } = parseItemId(finalId);
                  msg += `- ${parsedItem.name}${slots > 0 ? ' [1 Слот]' : ''}${level > 1 ? ` (Ур. ${level})` : ''}\n`;
                  const existing = char.rpg.inventory.find((i: any) => i.itemId === finalId);
                  if (existing) {
                    existing.amount += 1;
                  } else {
                    if (char.rpg.inventory.length < 30) {
                      char.rpg.inventory.push({ itemId: finalId, amount: 1 });
                    } else {
                      msg += `(Инвентарь полон, предмет утерян)\n`;
                    }
                  }
                }
              });
            }
            if (leveledUp) {
               msg += `\n🎉 Поздравляем! Вы достигли ${char.rpg.level} уровня!`;
            }
            char.rpg.combat = null;
            await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
            
            const kbWild = getWildKeyboard(char);
            await context.send({ message: msg, keyboard: kbWild });
          } else if (result.ended && !result.won && !result.fled) {
            char.rpg.combat = null;
            await safeSetDoc(doc(db, 'characters', char.id), { 
              isDead: true,
              deathTime: Date.now(),
              rpg: JSON.parse(JSON.stringify(char.rpg)) 
            }, { merge: true });
            
            chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок погиб в бою с ${enemy.name}.` }] });
            await context.send({ message: `🌲 Вы находите врага (${enemy.name}) и нападаете...\n\n${result.log}\n\n💀 Вы погибли!`, keyboard: Keyboard.builder().textButton({ label: 'Меню', payload: { command: 'menu' }, color: Keyboard.SECONDARY_COLOR }) });
          } else {
            await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
            chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок нашел врага: ${enemy.name} и сразу пошел в атаку. Бой начался.` }] });
            await renderCombatUI(context, char, `🌲 Вы находите врага (${enemy.name}) и с ходу наносите удар!\n\n${result.log}`);
          }
          userLocks.delete(senderId);
          return;
        }

        if (payloadCommand === 'shop_cat') {
          const cat = context.messagePayload.cat;
          
          let shopDoc = await getDoc(doc(db, 'sessions', `shop_${char.id}`));
          let shopData = shopDoc.exists() ? shopDoc.data() : {};
          
          const now = new Date();
          const lastRefresh = shopData.lastRefresh ? new Date(shopData.lastRefresh) : new Date(0);
          const twoHours = 2 * 60 * 60 * 1000;

          if (!shopData[cat] || shopData[cat].length === 0 || (now.getTime() - lastRefresh.getTime() > twoHours)) {
            shopData[cat] = generateShopItems(cat, 20, char.rpg?.level || 1, char.charClass);
            shopData.lastRefresh = now.toISOString();
            await safeSetDoc(doc(db, 'sessions', `shop_${char.id}`), shopData, { merge: true });
          }
          
          const currentItemsIds = shopData[cat];
          
          let catName = 'Алхимик (Зелья)';
          if (cat === 'weapon') catName = 'Оружейная';
          if (cat === 'armor') catName = 'Бронник';
          if (cat === 'accessory') catName = 'Ювелирный Рынок';
          if (cat === 'consumable') catName = 'Алхимик (Зелья)';
          if (cat === 'black_market') catName = 'Черный рынок';

          let msg = `🛒 ${catName}\nТвое золото: ${char.gold || 0} 💰\n\n`;
          const keyboard = Keyboard.builder();

          currentItemsIds.slice(0, 8).forEach((itemId: string, index: number) => {
            const item = getItem(itemId);
            const { slots } = parseItemId(itemId);
            if (item) {
              const displayPrice = slots > 0 ? Math.floor(item.price * 1.5) : item.price;
              const slotStr = slots > 0 ? ' [1 Слот]' : '';
              msg += `${index + 1}. ${item.name}${slotStr} — ${displayPrice} 💰\n`;
              keyboard.textButton({ label: `${index + 1}`, payload: { command: 'shop_item', itemId: itemId, cat }, color: Keyboard.SECONDARY_COLOR });
              if ((index + 1) % 4 === 0) keyboard.row();
            }
          });

          if (currentItemsIds.length > 0 && currentItemsIds.length % 4 !== 0) keyboard.row();
          
          keyboard.textButton({ label: '🔄 Обновить (50 💰)', payload: { command: 'shop_refresh', cat }, color: Keyboard.NEGATIVE_COLOR });
          keyboard.textButton({ label: '🔙 В лавки', payload: { command: 'shop' }, color: Keyboard.PRIMARY_COLOR });
          
          await context.send({ message: msg, keyboard: keyboard });
          return;
        }

        if (payloadCommand === 'shop_refresh') {
          const cat = context.messagePayload.cat;
          if ((char.gold || 0) < 50) {
            await context.send('❌ Недостаточно золота для обновления ассортимента (нужно 50 💰).');
            return;
          }
          char.gold -= 50;
          await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold }, { merge: true });
          
          let shopDoc = await getDoc(doc(db, 'sessions', `shop_${char.id}`));
          let shopData = shopDoc.exists() ? shopDoc.data() : {};
          shopData[cat] = generateShopItems(cat, 20, char.rpg?.level || 1, char.charClass);
          await safeSetDoc(doc(db, 'sessions', `shop_${char.id}`), shopData, { merge: true });
          
          await context.send('🔄 Ассортимент обновлен! Нажмите кнопку категории еще раз, чтобы увидеть новые товары.');
          return;
        }

        if (payloadCommand === 'shop_item') {
          const itemId = context.messagePayload.itemId;
          const cat = context.messagePayload.cat;
          const item = getItem(itemId);
          const { slots } = parseItemId(itemId);

          if (!item) {
            await context.send('Предмет не найден.');
            return;
          }

          let statsStr = '';
          if (item.stats) {
            if (item.stats.attack) statsStr += `⚔️ Атака: ${item.stats.attack}\n`;
            if (item.stats.magicAttack) statsStr += `🔮 Маг. Атака: ${item.stats.magicAttack}\n`;
            if (item.stats.defense) statsStr += `🛡️ Защита: ${item.stats.defense}\n`;
            if (item.stats.magicDefense) statsStr += `🪄 Маг. Защита: ${item.stats.magicDefense}\n`;
            if (item.stats.maxHp) statsStr += `❤️ Здоровье: ${item.stats.maxHp}\n`;
            if (item.stats.maxMp) statsStr += `💧 Мана: ${item.stats.maxMp}\n`;
            if (item.stats.agility) statsStr += `🏃 Ловкость: ${item.stats.agility}\n`;
          }
          if (item.healAmount) statsStr += `❤️ Восстанавливает: ${item.healAmount} ХП\n`;
          if (slots > 0) statsStr += `\n💎 Доступно слотов для самоцветов: ${slots}\n`;

          const displayPrice = slots > 0 ? Math.floor(item.price * 1.5) : item.price;
          const msg = `📦 ${item.name}${slots > 0 ? ' [1 Слот]' : ''}\nТип: ${item.type}\nРедкость: ${item.rarity}\n\n${statsStr}\n📝 ${item.description}\n\n💰 Цена: ${displayPrice} золота\nВаше золото: ${char.gold || 0}`;

          const keyboard = Keyboard.builder()
            .textButton({ label: 'Купить', payload: { action: 'buy', itemId: itemId, cat }, color: Keyboard.POSITIVE_COLOR })
            .row()
            .textButton({ label: '🔙 Назад', payload: { command: 'shop_cat', cat }, color: Keyboard.SECONDARY_COLOR })
            ;

          await context.send({ message: msg, keyboard });
          return;
        }

        if (text === 'кузнец' || payloadCommand === 'blacksmith') {
          const equipment = char.rpg?.equipment || {};
          const eqItems = Object.entries(equipment).filter(([slot, itemId]) => itemId != null);

          if (eqItems.length === 0) {
            await context.send({
              message: 'У тебя нет надетого снаряжения для заточки.',
              keyboard: Keyboard.builder().textButton({ label: '🔙 В магазин', payload: { command: 'shop' }, color: Keyboard.PRIMARY_COLOR })
            });
            return;
          }

          let msg = `🔨 Кузница\nВыбери надетое снаряжение для заточки:\n\nУ тебя ${char.gold || 0} 💰\n`;
          const keyboard = Keyboard.builder();
          
          let index = 1;
          eqItems.forEach(([slot, itemId]: any) => {
             const item = getItem(itemId);
             const { enhance } = parseItemId(itemId);
             if (item) {
               const cost = 500 * (enhance + 1);
               msg += `${index}. [${slot}] ${item.name}${enhance > 0 ? ` +${enhance}` : ''} (Цена: ${cost} 💰)\n`;
               keyboard.textButton({ label: `🔨 ${index}`, payload: { command: 'bs_select', slot: slot }, color: Keyboard.PRIMARY_COLOR });
               index++;
             }
          });
          keyboard.row();
          keyboard.textButton({ label: '🔙 В магазин', payload: { command: 'shop' }, color: Keyboard.PRIMARY_COLOR });

          await context.send({ message: msg, keyboard: keyboard });
          return;
        }

        if (payloadCommand === 'bs_select') {
          const slot = context.messagePayload.slot;
          const itemId = char.rpg?.equipment?.[slot];
          
          if (!itemId) return;
          const item = getItem(itemId);
          const { enhance } = parseItemId(itemId);
          const cost = 500 * (enhance + 1);
          
          if (!item) return;

          if (enhance >= 99) {
             await context.send({ message: 'Этот предмет уже максимально заточен (+99).', keyboard: Keyboard.builder().textButton({ label: '🔙 Назад', payload: { command: 'blacksmith' }, color: Keyboard.PRIMARY_COLOR }) });
             return;
          }

          const stones = char.rpg.inventory.filter((i: any) => i.itemId.startsWith('enhance_stone_'));
          if (stones.length === 0) {
             await context.send({
                message: `У тебя нет Камней Энд для заточки. (Нужен 1 камень и ${cost} 💰)`,
                keyboard: Keyboard.builder().textButton({ label: '🔙 Назад', payload: { command: 'blacksmith' }, color: Keyboard.PRIMARY_COLOR })
             });
             return;
          }

          let msg = `🔨 Заточка: ${item.name}${enhance > 0 ? ` +${enhance}` : ''}\nТекущий уровень: +${enhance}\nСтоимость: ${cost} 💰\nТвое золото: ${char.gold || 0} 💰\n\nВыбери камень для заточки:\n\n`;
          const keyboard = Keyboard.builder();
          
          stones.forEach((stoneInv: any) => {
             const stone = getItem(stoneInv.itemId);
             if (stone) {
                let chance = 100 - (enhance * 2);
                if (stone.rarity === 'uncommon') chance += 10;
                if (stone.rarity === 'rare') chance += 25;
                if (stone.rarity === 'epic') chance += 50;
                if (stone.rarity === 'legendary') chance += 100;
                chance = Math.max(1, Math.min(100, chance));
                
                msg += `${stone.name} (x${stoneInv.amount}) — Шанс: ${chance}%\n`;
                keyboard.textButton({ label: `${stone.name.split(' ')[2]} (${chance}%)`, payload: { command: 'bs_enhance', slot: slot, stoneId: stoneInv.itemId }, color: Keyboard.POSITIVE_COLOR });
             }
          });
          keyboard.row();
          keyboard.textButton({ label: '🔙 Назад', payload: { command: 'blacksmith' }, color: Keyboard.SECONDARY_COLOR });

          await context.send({ message: msg, keyboard: keyboard });
          return;
        }

        if (payloadCommand === 'bs_enhance') {
          const slot = context.messagePayload.slot;
          const stoneId = context.messagePayload.stoneId;
          
          const itemId = char.rpg?.equipment?.[slot];
          if (!itemId) return;

          const item = getItem(itemId);
          const stone = getItem(stoneId);
          const { baseId, enhance, gems, slots, level } = parseItemId(itemId);
          const cost = 500 * (enhance + 1);
          
          if (!item || !stone) return;

          if ((char.gold || 0) < cost) {
             await context.send(`❌ Недостаточно золота для заточки. Нужно ${cost} 💰.`);
             return;
          }

          const stoneIndex = char.rpg.inventory.findIndex((i: any) => i.itemId === stoneId);
          if (stoneIndex === -1) {
            await context.send('У тебя нет нужного камня.');
            return;
          }

          if (enhance >= 99) return;

          char.gold -= cost;

          let chance = 100 - (enhance * 2);
          if (stone.rarity === 'uncommon') chance += 10;
          if (stone.rarity === 'rare') chance += 25;
          if (stone.rarity === 'epic') chance += 50;
          if (stone.rarity === 'legendary') chance += 100;
          chance = Math.max(1, Math.min(100, chance));

          char.rpg.inventory[stoneIndex].amount -= 1;
          if (char.rpg.inventory[stoneIndex].amount <= 0) {
            char.rpg.inventory.splice(stoneIndex, 1);
          }
          
          const roll = Math.random() * 100;
          let success = roll <= chance;
          
          let msg = '';
          if (success) {
             const newItemId = buildItemId(baseId, enhance + 1, slots, gems, level);
             char.rpg.equipment[slot] = newItemId;
             msg = `✨ Успех! За ${cost} 💰 твой ${item.name} заточен до +${enhance + 1}!`;
          } else {
             msg = `💥 Провал! Камень и ${cost} 💰 уничтожены. Уровень заточки не изменился.`;
          }

          await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          
          const keyboard = Keyboard.builder()
            .textButton({ label: '🔙 Вернуться к кузнецу', payload: { command: 'blacksmith' }, color: Keyboard.PRIMARY_COLOR })
            ;
            
          await context.send({ message: msg, keyboard });
          return;
        }

        if (payloadCommand === 'shop_sell_menu' || payloadCommand?.startsWith('sell_page_')) {
          let page = 0;
          if (payloadCommand?.startsWith('sell_page_')) {
            page = parseInt(payloadCommand.split('_')[2]);
          }

          const itemsPerPage = 5;
          const inventory = char.rpg?.inventory || [];
          const totalPages = Math.ceil(inventory.length / itemsPerPage);
          
          if (inventory.length === 0) {
            await context.send({
              message: `🎒 Твой инвентарь пуст. Нечего продавать.`,
              keyboard: Keyboard.builder().textButton({ label: '🔙 В магазин', payload: { command: 'shop' }, color: Keyboard.PRIMARY_COLOR })
            });
            return;
          }

          const currentItems = inventory.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
          let msg = `💰 Продажа вещей (Страница ${page + 1}/${totalPages || 1}):\nТвое золото: ${char.gold || 0} 💰\n\n`;
          
          const keyboard = Keyboard.builder();
          let index = 1;
          currentItems.forEach((invItem: any) => {
            const item = getItem(invItem.itemId);
            if (item) {
              const sellPrice = Math.floor(item.price / 2);
              msg += `${index}. ${item.name} (x${invItem.amount}) — Продать за ${sellPrice} 💰\n`;
              keyboard.textButton({ label: `💰 ${index}`, payload: { command: 'shop_sell_item', itemId: invItem.itemId }, color: Keyboard.NEGATIVE_COLOR });
              index++;
            }
          });
          if (index > 1) keyboard.row();

          if (page > 0) {
            keyboard.textButton({ label: '⬅️ Назад', payload: { command: `sell_page_${page - 1}` }, color: Keyboard.SECONDARY_COLOR });
          }
          if (page < totalPages - 1) {
            keyboard.textButton({ label: 'Вперед ➡️', payload: { command: `sell_page_${page + 1}` }, color: Keyboard.SECONDARY_COLOR });
          }
          if (totalPages > 1) keyboard.row();

          keyboard.textButton({ label: '🔙 В магазин', payload: { command: 'shop' }, color: Keyboard.PRIMARY_COLOR });

          await context.send({ message: msg, keyboard: keyboard });
          return;
        }

        if (payloadCommand === 'shop_sell_item') {
          const itemId = context.messagePayload.itemId;
          const item = getItem(itemId);
          
          if (!item) return;

          const invItem = char.rpg.inventory.find((i: any) => i.itemId === itemId);
          if (!invItem) {
            await context.send('У тебя нет этого предмета.');
            return;
          }

          if (invItem.amount > 1) {
            const sellPrice = Math.floor(item.price / 2);
            let msg = `Сколько ${item.name} ты хочешь продать?\n(Штук в инвентаре: ${invItem.amount})\nЦена за 1: ${sellPrice} 💰`;
            
            const keyboard = Keyboard.builder()
               .textButton({ label: 'Продать 1', payload: { command: 'shop_sell_item_confirm', itemId, amount: 1 }, color: Keyboard.PRIMARY_COLOR });
            
            if (invItem.amount >= 5) {
               keyboard.textButton({ label: 'Продать 5', payload: { command: 'shop_sell_item_confirm', itemId, amount: 5 }, color: Keyboard.PRIMARY_COLOR });
            }
            if (invItem.amount > 1) {
               keyboard.textButton({ label: `Продать все (${invItem.amount})`, payload: { command: 'shop_sell_item_confirm', itemId, amount: invItem.amount }, color: Keyboard.NEGATIVE_COLOR });
            }
            keyboard.row();
            keyboard.textButton({ label: '🔙 Вернуться к продаже', payload: { command: 'shop_sell_menu' }, color: Keyboard.SECONDARY_COLOR });
            
            await context.send({ message: msg, keyboard });
            return;
          }

          // If only 1, sell directly
          const sellPrice = Math.floor(item.price / 2);
          char.gold = (char.gold || 0) + sellPrice;
          
          const invIndex = char.rpg.inventory.findIndex((i: any) => i.itemId === itemId);
          char.rpg.inventory[invIndex].amount -= 1;
          if (char.rpg.inventory[invIndex].amount <= 0) {
            char.rpg.inventory.splice(invIndex, 1);
          }

          await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          
          const keyboard = Keyboard.builder()
            .textButton({ label: '🔙 Вернуться к продаже', payload: { command: 'shop_sell_menu' }, color: Keyboard.PRIMARY_COLOR })
            ;
            
          await context.send({ message: `✅ Ты продал ${item.name} за ${sellPrice} 💰! Теперь у тебя ${char.gold} 💰.`, keyboard });
          return;
        }

        if (payloadCommand === 'shop_sell_item_confirm') {
          const itemId = context.messagePayload.itemId;
          const sellAmount = context.messagePayload.amount || 1;
          const item = getItem(itemId);
          if (!item) return;
          
          const invIndex = char.rpg.inventory.findIndex((i: any) => i.itemId === itemId);
          if (invIndex === -1 || char.rpg.inventory[invIndex].amount < sellAmount) {
             await context.send('Недостаточно предметов для продажи.');
             return;
          }
          
          const sellPrice = Math.floor(item.price / 2) * sellAmount;
          char.gold = (char.gold || 0) + sellPrice;
          char.rpg.inventory[invIndex].amount -= sellAmount;
          if (char.rpg.inventory[invIndex].amount <= 0) {
            char.rpg.inventory.splice(invIndex, 1);
          }

          await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          
          const keyboard = Keyboard.builder()
            .textButton({ label: '🔙 Вернуться к продаже', payload: { command: 'shop_sell_menu' }, color: Keyboard.PRIMARY_COLOR })
            ;
            
          await context.send({ message: `✅ Ты продал ${item.name} (x${sellAmount}) за ${sellPrice} 💰! Теперь у тебя ${char.gold} 💰.`, keyboard });
          return;
        }

        if (text === 'профиль' || payloadCommand === 'profile') {
          const lvl = char.rpg?.level || char.level || 1;
          const guildRank = char.rpg?.guildRank || 'D';
          const completedQuests = char.rpg?.completedQuestsCount || 0;
          let msg = `👤 Профиль: ${char.name}\nУровень: ${lvl}\nРанг гильдии: ${guildRank} (Выполнено заданий: ${completedQuests})\nРаса: ${char.race}\nКласс: ${char.charClass}\nПодкласс: ${char.subclass || 'Нет'}\nВозраст: ${char.age || '?'}\nПол: ${char.gender || '?'}\n\n📖 Предыстория:\n${char.backstory}`;
          
          if (char.imageUrl) {
            try {
              let buffer: Buffer;
              if (char.imageUrl.startsWith('http')) {
                const imageRes = await fetch(char.imageUrl);
                const arrayBuffer = await imageRes.arrayBuffer();
                buffer = Buffer.from(arrayBuffer);
              } else {
                const filePath = path.join(process.cwd(), 'data', char.imageUrl.replace(/^\//, ''));
                buffer = fs.readFileSync(filePath);
              }
              const photo = await vk!.upload.messagePhoto({ source: { value: buffer } });
              await context.send({ message: msg, attachment: photo.toString() });
            } catch (e) {
              await context.send(msg + '\n(Не удалось загрузить фото)');
            }
          } else {
            await context.send(msg);
          }
          return;
        }

        if (text === 'характеристики' || payloadCommand?.startsWith('stats')) {
          if (!char.rpg) char.rpg = DEFAULT_RPG_DATA;

          if (char.rpg.inventory) {
              char.rpg.inventory = char.rpg.inventory.filter(i => {
                 const item = getItem(i.itemId);
                 if (!item) return false;
                 // user says "удали сюжетные вещи" -> type === 'story'
                 if (item.type === ('story' as any) || item.type === ('quest' as any)) return false;
                 return true;
              });
          }

          const totalStats = calculateTotalStats(char.rpg);
          
          let page = 1;
          if (payloadCommand === 'stats_page_2') page = 2;

          let msg = `📊 Характеристики [${char.name}] (Стр. ${page}/2)\n`;
          
          if (page === 1) {
            msg += `Ур: ${char.rpg.level || char.level || 1} | Опыт: ${char.rpg.xp}/${char.rpg.level * 1000}\n` +
              `💰 Золото: ${char.gold || 0}\n\n` +
              `[ Базовые ]\n` +
              `❤️ ХП: ${char.rpg.baseStats.hp}/${totalStats.maxHp}\n` +
              `💧 МП: ${char.rpg.baseStats.mp || 0}/${totalStats.maxMp || 0}\n\n` +
              `[ Боевые ]\n` +
              `⚔️ Атк: ${totalStats.attack} | 🔮 Маг.Атк: ${totalStats.magicAttack || 5}\n` +
              `🛡️ Защ: ${totalStats.defense} | 🪄 Маг.Защ: ${totalStats.magicDefense || 5}\n` +
              `🏃 Ловк: ${totalStats.agility}\n` +
              `🎯 Крит: ${totalStats.critRate || 5}% | 💥 Крит.Урон: ${totalStats.critDamage || 150}%`;
          } else {
            msg += `[ Сопротивления ]\n` +
              `🧪 Яд: ${totalStats.resistPoison || 0}%\n` +
              `🔥 Огонь: ${totalStats.resistFire || 0}%\n` +
              `❄️ Лед: ${totalStats.resistIce || 0}%\n` +
              `⚡ Молния: ${totalStats.resistLightning || 0}%\n` +
              `🌑 Тьма: ${totalStats.resistDark || 0}%\n` +
              `✨ Свет: ${totalStats.resistHoly || 0}%`;
          }

          const keyboard = Keyboard.builder();
          if (page === 1) {
            keyboard.textButton({ label: 'Вперед ➡️', payload: { command: 'stats_page_2' }, color: Keyboard.SECONDARY_COLOR });
          } else {
            keyboard.textButton({ label: '⬅️ Назад', payload: { command: 'stats' }, color: Keyboard.SECONDARY_COLOR });
          }
          keyboard.row();
          keyboard.textButton({ label: '🔙 В меню', payload: { command: 'menu' }, color: Keyboard.PRIMARY_COLOR });

          await context.send({
            message: msg,
            keyboard: keyboard
          });
          return;
        }

        if (text === 'инвентарь' || payloadCommand === 'inventory' || payloadCommand?.startsWith('inv_page_')) {
          let page = 0;
          if (payloadCommand?.startsWith('inv_page_')) {
            page = parseInt(payloadCommand.split('_')[2]);
          }

          const itemsPerPage = 5;
          const inventory = char.rpg?.inventory || [];
          const totalPages = Math.ceil(inventory.length / itemsPerPage);
          
          if (inventory.length === 0) {
            await context.send({
              message: `🎒 Инвентарь ${char.name} пуст.`,
              keyboard: Keyboard.builder().textButton({ label: '🔙 В меню', payload: { command: 'menu' }, color: Keyboard.PRIMARY_COLOR })
            });
            return;
          }

          const currentItems = inventory.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
          let invMsg = `🎒 Инвентарь ${char.name} (Страница ${page + 1}/${totalPages || 1}):\n\n`;
          
          const keyboard = Keyboard.builder();
          
          let index = 1;
          let hasConsumables = false;
          currentItems.forEach((i: any) => {
            const item = getItem(i.itemId);
            if (item) {
              invMsg += `${index}. ${item.name} (x${i.amount})\n`;
              if (item.type === 'consumable') {
                keyboard.textButton({ label: `Использовать ${index}`, payload: { action: 'use', itemId: i.itemId }, color: Keyboard.POSITIVE_COLOR });
                hasConsumables = true;
              }
              index++;
            }
          });
          if (hasConsumables) keyboard.row();

          if (char.inventory && char.inventory.trim() !== '' && char.inventory.trim() !== 'Пусто') {
            invMsg += `\n📜 Сюжетные вещи:\n${char.inventory}`;
          }

          if (page > 0) {
            keyboard.textButton({ label: '⬅️ Назад', payload: { command: `inv_page_${page - 1}` }, color: Keyboard.SECONDARY_COLOR });
          }
          if (page < totalPages - 1) {
            keyboard.textButton({ label: 'Вперед ➡️', payload: { command: `inv_page_${page + 1}` }, color: Keyboard.SECONDARY_COLOR });
          }
          if (totalPages > 1) keyboard.row();
          
          keyboard.textButton({ label: '🔙 В меню', payload: { command: 'menu' }, color: Keyboard.PRIMARY_COLOR });

          await context.send({ message: invMsg, keyboard: keyboard });
          return;
        }

        if (text === 'снаряжение' || payloadCommand === 'equipment' || payloadCommand?.startsWith('eq_cat_') || payloadCommand?.startsWith('eq_page_')) {
          const keyboard = Keyboard.builder();
          
          if (payloadCommand === 'equipment' || text === 'снаряжение') {
            let eqMsg = `⚔️ Экипировка ${char.name}:\n\n`;
            if (char.rpg && Object.keys(char.rpg.equipment).length > 0) {
              const eq = char.rpg.equipment;
              const slots = [
                { key: 'weapon', label: 'Оружие' },
                { key: 'armor', label: 'Броня' },
                { key: 'helmet', label: 'Шлем' },
                { key: 'shield', label: 'Щит' },
                { key: 'accessory', label: 'Аксессуар' },
                { key: 'accessory2', label: 'Аксессуар 2' }
              ];
              slots.forEach(slot => {
                const itemId = eq[slot.key as keyof typeof eq];
                if (itemId) {
                  const item = getItem(itemId);
                  if (item) {
                    eqMsg += `${slot.label}: ${item.name}\n`;
                  }
                }
              });
            } else {
              eqMsg += 'Ничего не надето\n\n';
            }

            eqMsg += `Выберите категорию для надевания:`;
            keyboard.textButton({ label: '🗡️ Оружие', payload: { command: 'eq_cat_weapon' }, color: Keyboard.PRIMARY_COLOR });
            keyboard.textButton({ label: '🛡️ Броня', payload: { command: 'eq_cat_armor' }, color: Keyboard.PRIMARY_COLOR });
            keyboard.row();
            keyboard.textButton({ label: '💍 Аксессуары', payload: { command: 'eq_cat_accessory' }, color: Keyboard.PRIMARY_COLOR });
            keyboard.row();
            keyboard.textButton({ label: '🔙 В меню', payload: { command: 'menu' }, color: Keyboard.SECONDARY_COLOR });
            
            await context.send({ message: eqMsg, keyboard: keyboard });
            return;
          }

          let category = '';
          let page = 0;
          if (payloadCommand?.startsWith('eq_cat_')) {
            category = payloadCommand.replace('eq_cat_', '');
          } else if (payloadCommand?.startsWith('eq_page_')) {
            const parts = payloadCommand.split('_');
            category = parts[2];
            page = parseInt(parts[3]);
          }
          
          const itemsPerPage = 4;
          const inventory = char.rpg?.inventory || [];
          const equippableItems = inventory.filter((i: any) => {
            const item = getItem(i.itemId);
            if (!item) return false;
            if (category === 'weapon' && item.type === 'weapon') return true;
            if (category === 'armor' && (item.type === 'armor' || item.type === 'helmet' || item.type === 'shield')) return true;
            if (category === 'accessory' && item.type === 'accessory') return true;
            return false;
          });

          // Check for equipped items in this category
          const slotsToCheck: (keyof CharacterRPGData['equipment'])[] = [];
          if (category === 'weapon') slotsToCheck.push('weapon');
          if (category === 'armor') slotsToCheck.push('armor', 'helmet', 'shield');
          if (category === 'accessory') slotsToCheck.push('accessory', 'accessory2');

          const equippedItems = new Map<string, string>(); // itemId -> slot
          slotsToCheck.forEach(slot => {
            const itemId = char.rpg.equipment[slot];
            if (itemId) equippedItems.set(itemId, slot);
          });

          const totalPages = Math.ceil(equippableItems.length / itemsPerPage);
          
          if (equippableItems.length === 0 && equippedItems.size === 0) {
            await context.send({
              message: `У вас нет предметов в категории ${category}.`,
              keyboard: Keyboard.builder().textButton({ label: '🔙 Назад', payload: { command: 'equipment' }, color: Keyboard.PRIMARY_COLOR })
            });
            return;
          }

          const currentItems = equippableItems.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
          let eqMsg = '';
          if (totalPages > 1) {
             eqMsg = `Доступные предметы (${page + 1}/${totalPages}):\n\n`;
          } else {
             eqMsg = `Доступные предметы:\n\n`;
          }

          if (equippedItems.size > 0) {
            eqMsg += `⚔️ Сейчас надето:\n`;
            let eIndex = 1;
            for (const [itemId, slot] of equippedItems) {
              const item = getItem(itemId);
              if (item) {
                eqMsg += `E${eIndex}. ${item.name} (Надето)\n`;
                keyboard.textButton({ label: `🔍 E${eIndex}`, payload: { command: `eq_item_view`, itemId: itemId, category }, color: Keyboard.PRIMARY_COLOR });
                eIndex++;
              }
            }
            if (eIndex > 1) keyboard.row();
            eqMsg += `\n`;
          }

          let iIndex = 1;
          currentItems.forEach((i: any) => {
            const item = getItem(i.itemId);
            if (item) {
              if (!equippedItems.has(i.itemId)) {
                eqMsg += `${iIndex}. ${item.name}\n`;
                keyboard.textButton({ label: `🔍 ${iIndex}`, payload: { command: `eq_item_view`, itemId: i.itemId, category }, color: Keyboard.SECONDARY_COLOR });
                iIndex++;
              }
            }
          });
          if (iIndex > 1) keyboard.row();

          if (page > 0) {
            keyboard.textButton({ label: '⬅️ Назад', payload: { command: `eq_page_${category}_${page - 1}` }, color: Keyboard.SECONDARY_COLOR });
          }
          if (page < totalPages - 1) {
            keyboard.textButton({ label: 'Вперед ➡️', payload: { command: `eq_page_${category}_${page + 1}` }, color: Keyboard.SECONDARY_COLOR });
          }
          if (totalPages > 1) keyboard.row();
          
          keyboard.textButton({ label: '🔙 К категориям', payload: { command: 'equipment' }, color: Keyboard.PRIMARY_COLOR });

          await context.send({ message: eqMsg, keyboard: keyboard });
          return;
        }

        if (payloadCommand === 'gem_insert_menu') {
          const itemId = context.messagePayload.itemId;
          const { baseId, enhance, gems, slots } = parseItemId(itemId);
          const item = getItem(itemId);
          if (!item || slots <= gems.length) return;

          let msg = `💎 Инкрустация: ${item.name}${enhance > 0 ? ` +${enhance}` : ''}\n\nВыберите самоцвет из инвентаря для вставки:\n\n`;
          const keyboard = Keyboard.builder();
          let gemCount = 0;

          char.rpg.inventory.forEach((invItem: any) => {
            const gem = getItem(invItem.itemId);
            if (gem && gem.type === 'material' && gem.name.includes(' ')) {
               // Only show gems
               gemCount++;
               msg += `${gemCount}. ${gem.name} (x${invItem.amount})\n`;
               keyboard.textButton({ label: `${gemCount}`, payload: { command: 'gem_insert', itemId: itemId, gemId: invItem.itemId }, color: Keyboard.POSITIVE_COLOR });
               if (gemCount % 4 === 0) keyboard.row();
            }
          });

          if (gemCount === 0) {
             msg += `У вас нет доступных самоцветов.`;
          }

          if (gemCount > 0 && gemCount % 4 !== 0) keyboard.row();
          keyboard.textButton({ label: '🔙 Назад', payload: { command: 'eq_item_view', itemId, category: item.type }, color: Keyboard.SECONDARY_COLOR });

          await context.send({ message: msg, keyboard: keyboard });
          return;
        }

        if (payloadCommand === 'gem_insert') {
           const itemId = context.messagePayload.itemId;
           const gemId = context.messagePayload.gemId;

           const { baseId, enhance, gems, slots, level } = parseItemId(itemId);
           if (slots <= gems.length) return;

           const invIndex = char.rpg.inventory.findIndex((i: any) => i.itemId === itemId);
           const gemIndex = char.rpg.inventory.findIndex((i: any) => i.itemId === gemId);

           if (invIndex === -1 || gemIndex === -1) {
              await context.send('Предмет не найден.');
              return;
           }

           const gem = getItem(gemId);
           if (!gem) return;

           // Deduct gem
           char.rpg.inventory[gemIndex].amount -= 1;
           if (char.rpg.inventory[gemIndex].amount <= 0) {
             char.rpg.inventory.splice(gemIndex, 1);
           }

           // Create new item ID
           gems.push(gem.id);
           const newItemId = buildItemId(baseId, enhance, slots, gems, level);
           
           // Replace old item with new item
           const newInvIndex = char.rpg.inventory.findIndex((i: any) => i.itemId === itemId);
           if (char.rpg.inventory[newInvIndex].amount > 1) {
              char.rpg.inventory[newInvIndex].amount -= 1;
              char.rpg.inventory.push({ itemId: newItemId, amount: 1 });
           } else {
              char.rpg.inventory[newInvIndex].itemId = newItemId;
           }

           await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });

           await context.send({
             message: `✨ Вы успешно вставили ${gem.name} в элемент экипировки!`,
             keyboard: Keyboard.builder().textButton({ label: 'Посмотреть предмет', payload: { command: 'eq_item_view', itemId: newItemId, category: getItem(baseId)?.type }, color: Keyboard.PRIMARY_COLOR })
           });
           return;
        }

        if (payloadCommand === 'eq_item_view') {
          const itemId = context.messagePayload.itemId;
          const category = context.messagePayload.category;
          const { baseId, enhance, gems, slots } = parseItemId(itemId);
          const item = getItem(itemId);
          if (!item) return;

          let msg = `📦 ${item.name}${enhance > 0 ? ` +${enhance}` : ''}\n\n${item.description || ''}\n\n`;
          if (item.stats) {
            msg += `📊 Базовые характеристики:\n`;
            if (item.stats.attack) msg += `⚔️ Атака: +${item.stats.attack}\n`;
            if (item.stats.magicAttack) msg += `🔮 Маг. Атака: +${item.stats.magicAttack}\n`;
            if (item.stats.defense) msg += `🛡️ Защита: +${item.stats.defense}\n`;
            if (item.stats.magicDefense) msg += `🪄 Маг. Защита: +${item.stats.magicDefense}\n`;
            if (item.stats.maxHp) msg += `❤️ Здоровье: +${item.stats.maxHp}\n`;
            if (item.stats.maxMp) msg += `💧 Мана: +${item.stats.maxMp}\n`;
            if (item.stats.agility) msg += `🏃 Ловкость: +${item.stats.agility}\n`;
            if (item.stats.critRate) msg += `🎯 Шанс крита: +${item.stats.critRate}%\n`;
            if (item.stats.critDamage) msg += `💥 Крит. урон: +${item.stats.critDamage}%\n`;
            if (item.stats.resistPoison) msg += `🧪 Сопротивление яду: +${item.stats.resistPoison}%\n`;
          }

          if (slots > 0) {
            msg += `\n💎 Слоты инкрустации (${gems.length}/${slots}):\n`;
            for (let i = 0; i < slots; i++) {
               if (i < gems.length) {
                  const gem = getItem(gems[i]);
                  msg += `🔸 ${gem ? gem.name : 'Неизвестный самоцвет'}\n`;
               } else {
                  msg += `▫️ Пустой слот\n`;
               }
            }
          }

          const isEquipped = Object.values(char.rpg.equipment).includes(itemId);
          const keyboard = Keyboard.builder();

          if (isEquipped) {
            const slotParams = Object.keys(char.rpg.equipment).find(k => (char.rpg.equipment as any)[k] === itemId);
            keyboard.textButton({ label: `Снять`, payload: { action: 'unequip', itemId: slotParams, category }, color: Keyboard.NEGATIVE_COLOR });
          } else {
            keyboard.textButton({ label: `Надеть`, payload: { action: 'equip', itemId: itemId, category }, color: Keyboard.POSITIVE_COLOR });
            if (slots > gems.length) {
                keyboard.row();
                keyboard.textButton({ label: `Вставить самоцвет`, payload: { command: 'gem_insert_menu', itemId }, color: Keyboard.PRIMARY_COLOR });
            }
          }
          keyboard.row();
          keyboard.textButton({ label: '🔙 Назад', payload: { command: `eq_cat_${category}` }, color: Keyboard.SECONDARY_COLOR });

          await context.send({ message: msg, keyboard: keyboard });
          return;
        }

        if (text === 'скиллы' || payloadCommand === 'skills') {
          if (!char.rpg) char.rpg = DEFAULT_RPG_DATA;

          if (char.rpg.inventory) {
              char.rpg.inventory = char.rpg.inventory.filter(i => {
                 const item = getItem(i.itemId);
                 if (!item) return false;
                 // user says "удали сюжетные вещи" -> type === 'story'
                 if (item.type === ('story' as any) || item.type === ('quest' as any)) return false;
                 return true;
              });
          }

          const equippedActive = char.rpg.equippedSkills?.active || [];
          const equippedPassive = char.rpg.equippedSkills?.passive || [];
          
          let msg = `✨ Ваши навыки:\nАктивные: ${equippedActive.length}/6\n\nВыберите категорию:`;
          const keyboard = Keyboard.builder()
            .textButton({ label: '🔥 Активные', payload: { command: 'skills_cat_active' }, color: Keyboard.PRIMARY_COLOR })
            .row()
            .textButton({ label: '🔙 В меню', payload: { command: 'menu' }, color: Keyboard.SECONDARY_COLOR });
          
          await context.send({ message: msg, keyboard: keyboard });
          return;
        }

        if (payloadCommand?.startsWith('skills_cat_')) {
          const type = payloadCommand.replace('skills_cat_', '');
          const isPassive = type === 'passive';
          
          if (!char.rpg) char.rpg = DEFAULT_RPG_DATA;

          if (char.rpg.inventory) {
              char.rpg.inventory = char.rpg.inventory.filter(i => {
                 const item = getItem(i.itemId);
                 if (!item) return false;
                 // user says "удали сюжетные вещи" -> type === 'story'
                 if (item.type === ('story' as any) || item.type === ('quest' as any)) return false;
                 return true;
              });
          }

          const equipped = char.rpg.equippedSkills?.[type as 'active' | 'passive'] || [];
          const customSkills = char.rpg.customSkills || [];
          const unlocked = char.rpg.unlockedSkills || [];
          
          let page = 0;
          if (context.messagePayload.page) {
             page = Number(context.messagePayload.page);
          }

          const allAvailableSkills = [
            ...unlocked.map((id: string) => SKILL_CATALOG[id]).filter(Boolean),
            ...customSkills
          ].filter((s: any) => !!s.isPassive === isPassive);

          const itemsPerPage = 5;
          const totalPages = Math.ceil(allAvailableSkills.length / itemsPerPage);
          const currentSkills = allAvailableSkills.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

          let msg = `${isPassive ? '🛡️ Пассивные' : '🔥 Активные'} навыки (${equipped.length}/6):\n`;
          if (totalPages > 1) {
             msg += `(Страница ${page + 1}/${totalPages})\n\n`;
          } else {
             msg += '\n';
          }
          const keyboard = Keyboard.builder();
          
          if (allAvailableSkills.length === 0) {
            msg += `У вас нет навыков в этой категории.\n`;
          } else {
            currentSkills.forEach((skill: any, index: number) => {
              const isEq = equipped.includes(skill.id);
              msg += `${index + 1}. ${isEq ? '✅' : '❌'} ${skill.name}\n`;
              keyboard.textButton({ 
                label: `🔍 ${index + 1}`, 
                payload: { command: 'skill_view', skillId: skill.id, type, page },
                color: isEq ? Keyboard.POSITIVE_COLOR : Keyboard.SECONDARY_COLOR
              });
            });
            if (currentSkills.length > 0) keyboard.row();
          }
          
          if (page > 0) {
            keyboard.textButton({ label: '⬅️ Назад', payload: { command: `skills_cat_${type}`, page: page - 1 }, color: Keyboard.SECONDARY_COLOR });
          }
          if (page < totalPages - 1) {
            keyboard.textButton({ label: 'Вперед ➡️', payload: { command: `skills_cat_${type}`, page: page + 1 }, color: Keyboard.SECONDARY_COLOR });
          }
          if (totalPages > 1) keyboard.row();

          keyboard.textButton({ label: '🔙 К категориям', payload: { command: 'skills' }, color: Keyboard.PRIMARY_COLOR });
          
          await context.send({ message: msg, keyboard: keyboard });
          return;
        }

        if (payloadCommand === 'skill_view') {
          const { skillId, type, page } = context.messagePayload;
          const customSkills = char.rpg.customSkills || [];
          const skill = SKILL_CATALOG[skillId] || customSkills.find((s: any) => s.id === skillId);
          if (!skill) return;

          let msg = `✨ ${skill.name}\n\n`;
          msg += `📝 Описание:\n${skill.description}\n\n`;
          
          if (skill.power) msg += `💪 Сила: ${skill.power}\n`;
          if (skill.mpCost) msg += `💧 Стоимость МП: ${skill.mpCost}\n`;
          if (skill.hpCostPct) msg += `🩸 Стоимость ХП: ${skill.hpCostPct}%\n`;
          if (skill.cooldown) msg += `⏳ Перезарядка: ${skill.cooldown} ход.\n`;
          
          const equipped = char.rpg.equippedSkills?.[type as 'active' | 'passive'] || [];
          const isEq = equipped.includes(skill.id);
          
          const keyboard = Keyboard.builder();
          if (isEq) {
            keyboard.textButton({ label: `Снять`, payload: { command: 'unequip_skill', skillId: skill.id, type, page }, color: Keyboard.NEGATIVE_COLOR });
          } else {
            keyboard.textButton({ label: `Надеть`, payload: { command: 'equip_skill', skillId: skill.id, type, page }, color: Keyboard.POSITIVE_COLOR });
          }
          keyboard.row();
          keyboard.textButton({ label: '🔙 Назад', payload: { command: `skills_cat_${type}`, page }, color: Keyboard.SECONDARY_COLOR });

          await context.send({ message: msg, keyboard: keyboard });
          return;
        }

        if (payloadCommand === 'equip_skill') {
          const { skillId, type, page } = context.messagePayload;
          if (!char.rpg.equippedSkills) char.rpg.equippedSkills = { active: [], passive: [] };
          const arr = char.rpg.equippedSkills[type as 'active' | 'passive'] || [];
          
          if (arr.length >= 6) {
            await context.send(`❌ Можно надеть максимум 6 ${type === 'active' ? 'активных' : 'пассивных'} навыков!`);
          } else {
            arr.push(skillId);
            char.rpg.equippedSkills[type as 'active' | 'passive'] = arr;
            await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
            
            const keyboard = Keyboard.builder()
              .textButton({ label: '🔙 К списку', payload: { command: `skills_cat_${type}`, page }, color: Keyboard.PRIMARY_COLOR })
              ;
            await context.send({ message: '✅ Навык экипирован!', keyboard });
          }
          return;
        }

        if (payloadCommand === 'unequip_skill') {
          const { skillId, type, page } = context.messagePayload;
          if (!char.rpg.equippedSkills) char.rpg.equippedSkills = { active: [], passive: [] };
          char.rpg.equippedSkills[type as 'active' | 'passive'] = (char.rpg.equippedSkills[type as 'active' | 'passive'] || []).filter((id: string) => id !== skillId);
          await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          
          const keyboard = Keyboard.builder()
            .textButton({ label: '🔙 К списку', payload: { command: `skills_cat_${type}`, page }, color: Keyboard.PRIMARY_COLOR })
            ;
          await context.send({ message: '✅ Навык снят!', keyboard });
          return;
        }

        if (text === 'арена' || payloadCommand === 'arena') {
          if (char.location !== 'city') {
            await context.send('❌ Арена находится только в городе.');
            return;
          }
          const tokens = char.rpg?.arenaTokens || 0;
          const keyboard = Keyboard.builder()
            .textButton({ label: '⚔️ Сразиться с НПС', payload: { command: 'arena_npc' }, color: Keyboard.PRIMARY_COLOR })
            .row()
            .textButton({ label: '🏆 Рейтинг', payload: { command: 'arena_rating' }, color: Keyboard.PRIMARY_COLOR })
            .textButton({ label: `🛍️ Токены (${tokens})`, payload: { command: 'arena_shop' }, color: Keyboard.POSITIVE_COLOR })
            .row()
            .textButton({ label: '🔙 В город', payload: { command: 'city_menu' }, color: Keyboard.SECONDARY_COLOR })
            ;
          await context.send({ message: `🏟️ Добро пожаловать на Арену!\nЗдесь вы можете сразиться за славу и награды.\n\n🏅 Ваши токены арены: ${tokens}`, keyboard });
          return;
        }

        if (payloadCommand === 'arena_rating') {
          // Fetch real players sorted by level, then mix in some ARENA_NPCS at random levels
          const allDocs = await getDocs(collection(db, 'characters'));
          const players: any[] = [];
          allDocs.forEach(d => {
             const data = d.data();
             if (data.rpg) players.push({ name: data.name, level: data.rpg.level || 1, type: 'player' });
          });
          
          ARENA_NPCS.forEach(n => {
             const fakeLevel = Math.floor(Math.random() * 50) + 1; // Fake levels for npcs
             players.push({ name: `${n.name} (NPC)`, level: fakeLevel, type: 'npc' });
          });
          
          players.sort((a, b) => b.level - a.level);
          const top10 = players.slice(0, 10);
          let msg = `🏆 Топ-10 бойцов Арены:\n\n`;
          top10.forEach((p, index) => {
             msg += `${index + 1}. ${p.name} — ${p.level} Ур.\n`;
          });
          
          const keyboard = Keyboard.builder()
            .textButton({ label: '🔙 Арена', payload: { command: 'arena' }, color: Keyboard.SECONDARY_COLOR });
            
          await context.send({ message: msg, keyboard });
          return;
        }

        if (payloadCommand === 'arena_shop' || payloadCommand?.startsWith('arena_buy_')) {
           const tokens = char.rpg?.arenaTokens || 0;
           
           if (payloadCommand.startsWith('arena_buy_')) {
              const buyId = payloadCommand.replace('arena_buy_', '');
              if (buyId === 'gold') {
                 if (tokens >= 5) {
                    char.rpg.arenaTokens -= 5;
                    char.gold = (char.gold || 0) + 1000;
                    await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
                    await context.send({ message: `✅ Вы обменяли 5 токенов на 1000 💰!` });
                 } else {
                    await context.send({ message: `❌ Недостаточно токенов (нужно 5).` });
                 }
              } else {
                 const tItem = ARENA_ITEMS.find(i => i.id === buyId);
                 if (tItem) {
                    if (tokens >= tItem.cost) {
                       char.rpg.arenaTokens -= tItem.cost;
                       
                       // Item logic: gives stats scaled to player level
                       const itemLvl = char.rpg.level || 1;
                       const budget = 5 + itemLvl * (tItem.type === 'accessory' ? 1.5 : 3.5) * tItem.statsMult;
                       const giveItemBase = {
                          name: tItem.name + ` (${itemLvl} ур)`,
                          id: `${tItem.id}_${Date.now()}`,
                          type: tItem.type,
                          rarity: 'epic',
                          level: itemLvl,
                          price: 1000,
                          stats: {} as any
                       };
                       
                       if (tItem.type === 'weapon') {
                          giveItemBase.stats.attack = Math.floor(budget);
                       } else if (tItem.type === 'armor') {
                          giveItemBase.stats.defense = Math.floor(budget);
                       } else if (tItem.type === 'accessory') {
                          giveItemBase.stats.maxHp = Math.floor(budget * 5);
                          giveItemBase.stats.critRate = 5;
                       }
                       
                       if (!char.rpg.inventory) char.rpg.inventory = [];
                       char.rpg.inventory.push({ itemId: JSON.stringify(giveItemBase), amount: 1, inline: true });
                       
                       await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
                       await context.send({ message: `✅ Вы купили ${tItem.name} за ${tItem.cost} токенов!` });
                    } else {
                       await context.send({ message: `❌ Недостаточно токенов (нужно ${tItem.cost}).` });
                    }
                 }
              }
              // re-read tokens after buy
           }

           const currentTokens = char.rpg?.arenaTokens || 0;
           let msg = `🛍️ Обмен токенов Арены\nВаши токены: ${currentTokens} 🏅\n\n`;
           msg += `Здесь вы можете обменять токены на уникальную экипировку, которая получает уровень равный вашему текущему уровню!\n\n`;
           
           const kb = Keyboard.builder();
           
           ARENA_ITEMS.forEach((ai, idx) => {
              msg += `${idx + 1}. ${ai.name} — ${ai.cost} 🏅\n`;
              kb.textButton({ label: `Купить ${idx + 1}`, payload: { command: `arena_buy_${ai.id}` }, color: Keyboard.PRIMARY_COLOR });
              if ((idx + 1) % 2 === 0) kb.row();
           });
           
           if (ARENA_ITEMS.length % 2 !== 0) kb.row();
           
           msg += `\nБонус: Обмен на золото: 5 🏅 = 1000 💰\n`;
           kb.textButton({ label: `💰 Обменять (5 🏅)`, payload: { command: 'arena_buy_gold' }, color: Keyboard.POSITIVE_COLOR }).row();
           
           kb.textButton({ label: '🔙 Арена', payload: { command: 'arena' }, color: Keyboard.SECONDARY_COLOR });
           
           await context.send({ message: msg, keyboard: kb });
           return;
        }

        if (payloadCommand === 'arena_npc') {
          if (!char.rpg) char.rpg = DEFAULT_RPG_DATA;

          if (char.rpg.inventory) {
              char.rpg.inventory = char.rpg.inventory.filter(i => {
                 const item = getItem(i.itemId);
                 if (!item) return false;
                 // user says "удали сюжетные вещи" -> type === 'story'
                 if (item.type === ('story' as any) || item.type === ('quest' as any)) return false;
                 return true;
              });
          }

          if (!char.rpg.combat) {
            const levelDiff = Math.floor(Math.random() * 4); // 0, 1, 2, or 3
            const arenaLevel = char.rpg.level + levelDiff;
            const npc = ARENA_NPCS[Math.floor(Math.random() * ARENA_NPCS.length)];
            
            const hp = 150 + (arenaLevel * 40);
            const atk = 12 + (arenaLevel * 5);
            const def = 8 + (arenaLevel * 4);
            const agi = 10 + (arenaLevel * 3);
            
            const isMagic = ['Пиромант', 'Некромант', 'Жрец'].includes(npc.charClass);
            
            const arenaEnemy = {
              id: npc.id,
              name: `[АРЕНА] ${npc.name} (${npc.charClass}) - ${arenaLevel} Ур`,
              hp: hp,
              maxHp: hp,
              attack: isMagic ? Math.floor(atk / 2) : atk,
              defense: def,
              magicAttack: isMagic ? atk : Math.floor(atk / 2),
              magicDefense: def,
              agility: agi,
              xpReward: arenaLevel * 30,
              goldReward: arenaLevel * 30 + 100, // Norm money
              arenaTokens: 1 + Math.floor(arenaLevel / 5) + (levelDiff >= 2 ? 1 : 0),
              loot: [],
              skills: ['warrior_skill_1', 'warrior_skill_2']
            };

            char.rpg.combat = createCombatState(arenaEnemy, { type: 'arena' });
            await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          }
          await renderCombatUI(context, char, `🎺 Зрители ликуют! Вы вышли на арену против: ${char.rpg.combat.enemy.name}!`);
          return;
        }

        if (payloadCommand === 'hunt' || text === 'охота') {
          if (!char.rpg) char.rpg = DEFAULT_RPG_DATA;

          if (char.rpg.inventory) {
              char.rpg.inventory = char.rpg.inventory.filter(i => {
                 const item = getItem(i.itemId);
                 if (!item) return false;
                 // user says "удали сюжетные вещи" -> type === 'story'
                 if (item.type === ('story' as any) || item.type === ('quest' as any)) return false;
                 return true;
              });
          }

          if (!char.rpg.combat) {
            char.rpg.combat = createCombatState(generateEnemy(char.rpg.level));
            await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
          }
          await renderCombatUI(context, char, 'Вы отправились на охоту и встретили врага!');
          return;
        }

        if (!payloadCommand && activeChar && activeChar.rpg?.combat) {
        if (text === '⚔️ атака' || text === 'атака') {
            payloadCommand = 'combat_action';
            payloadAction = undefined;
            if (!context.messagePayload) (context as any).messagePayload = {};
            (context as any).messagePayload.combatAction = 'attack';
        } else if (text === '🛡️ защита' || text === 'защита') {
            payloadCommand = 'combat_action';
            payloadAction = undefined;
            if (!context.messagePayload) (context as any).messagePayload = {};
            (context as any).messagePayload.combatAction = 'defend';
        } else if (text === '🏃 побег' || text === 'побег') {
            payloadCommand = 'combat_action';
            payloadAction = undefined;
            if (!context.messagePayload) (context as any).messagePayload = {};
            (context as any).messagePayload.combatAction = 'flee';
        } else if (text === '✨ навыки' || text === 'навыки') {
            payloadCommand = 'combat_skills_menu';
            payloadAction = undefined;
        }
    }

    if (payloadCommand === 'combat_skills_menu') {
          if (!char.rpg || !char.rpg.combat) return;
          const keyboard = Keyboard.builder();
          const activeSkills = char.rpg.equippedSkills?.active || [];
          const customSkills = char.rpg.customSkills || [];
          
          if (activeSkills.length === 0) {
            keyboard.textButton({ label: '🔙 Назад', payload: { command: 'combat_back' }, color: Keyboard.SECONDARY_COLOR });
            await context.send({ message: 'У вас нет экипированных активных навыков!', keyboard: keyboard });
            return;
          }
          
          let count = 0;
          let msg = 'Выберите навык:\n\n';
          activeSkills.forEach((sId: string, idx: number) => {
            const skill = SKILL_CATALOG[sId] || customSkills.find((s: any) => s.id === sId);
            if (skill) {
              const cd = char.rpg.combat.playerCooldowns?.[sId] || 0;
              let statusText = '';
              if (cd > 0) {
                statusText = ` (КД: ${cd})`;
              } else {
                if (skill.mpCost) statusText += ` [${skill.mpCost}💧]`;
                if ((skill as any).hpCostPct) statusText += ` [${(skill as any).hpCostPct}%❤️]`;
              }
              const color = cd > 0 ? Keyboard.SECONDARY_COLOR : Keyboard.POSITIVE_COLOR;
              msg += `${idx + 1}. ${skill.name}${statusText}\n`;
              keyboard.textButton({ label: `✨ ${idx + 1}`, payload: { command: 'combat_action', combatAction: 'skill', skillId: sId }, color });
              count++;
              if (count % 3 === 0) keyboard.row();
            }
          });
          if (count % 3 !== 0) keyboard.row();
          keyboard.textButton({ label: '🔙 Назад', payload: { command: 'combat_back' }, color: Keyboard.SECONDARY_COLOR });
          
          await context.send({ message: msg, keyboard: keyboard });
          return;
        }

        if (payloadCommand === 'use_combat_potion') {
          if (!char.rpg || !char.rpg.combat) return;
          const itemId = context.messagePayload.itemId;
          const result = useItem(char.rpg, itemId);
          if (result.success) {
            await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
            chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок ${char.name} использовал зелье ${itemId} в бою.` }] });
          }
          await renderCombatUI(context, char, result.message);
          return;
        }

        if (payloadCommand === 'combat_potions_menu') {
          if (!char.rpg || !char.rpg.combat) return;
          const keyboard = Keyboard.builder();
          
          let count = 0;
          let hasPotions = false;
          char.rpg.inventory.forEach((invItem: any) => {
            const parsed = parseItemId(invItem.itemId);
            const itemDef = getItem(parsed.baseId);
            if (itemDef && itemDef.type === 'consumable' && itemDef.name.toLowerCase().includes('зелье')) {
              hasPotions = true;
              keyboard.textButton({ 
                label: `💊 ${itemDef.name} (x${invItem.amount})`, 
                payload: { command: 'use_combat_potion', itemId: invItem.itemId }, 
                color: Keyboard.POSITIVE_COLOR 
              });
              count++;
              if (count % 2 === 0) keyboard.row();
            }
          });
          
          if (!hasPotions) {
            keyboard.textButton({ label: '🔙 Назад', payload: { command: 'combat_back' }, color: Keyboard.SECONDARY_COLOR });
            await context.send({ message: 'У вас нет зелий в инвентаре.', keyboard });
            return;
          }
          
          if (count % 2 !== 0) keyboard.row();
          keyboard.textButton({ label: '🔙 Назад', payload: { command: 'combat_back' }, color: Keyboard.SECONDARY_COLOR });
          
          await context.send({ message: 'Выберите зелье для использования:\n(Использование зелья не тратит ход)', keyboard });
          return;
        }

        if (payloadCommand === 'combat_back') {
          if (!char.rpg || !char.rpg.combat) return;
          await renderCombatUI(context, char, 'Вы вернулись к выбору действий.');
          return;
        }

        if (payloadCommand === 'combat_action') {
          if (!char.rpg || !char.rpg.combat) return;
          console.log('Combat action payload:', context.messagePayload);
          const action = context.messagePayload.combatAction;
          const skillId = context.messagePayload.skillId;
          
          const result = processCombatTurn(char.rpg, action, skillId, char.charClass);
          
          if (result.won) {
            if (char.rpg.activeQuest && char.rpg.activeQuest.type !== 'gather' && char.rpg.activeQuest.targetId === (result as any).enemyId) {
                 char.rpg.activeQuest.progress = (char.rpg.activeQuest.progress || 0) + 1;
                 (result as any).log += `\n\n🎯 Прогресс задания: ${char.rpg.activeQuest.progress} / ${char.rpg.activeQuest.targetCount}`;
            }
            char.gold = (char.gold || 0) + result.gold;
            if ((result as any).arenaTokens) {
               char.rpg.arenaTokens = (char.rpg.arenaTokens || 0) + (result as any).arenaTokens;
            }
            const leveledUp = addXp(char.rpg, result.xp);
            let msg = `${result.log}\n💰 Получено ${result.gold} золота и ${result.xp} XP!`;
            if ((result as any).arenaTokens) {
               msg += `\n🏅 Получено токенов арены: ${(result as any).arenaTokens}`;
            }
            
            chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок ${char.name} победил в бою.` }] });
            
            if (result.lootDrops && result.lootDrops.length > 0) {
              msg += `\n🎁 Выпал лут:\n`;
              const locData = WORLD_LOCATIONS.find(l => l.id === char.location);
              const minLevel = locData?.levelMin || 1;
              const maxLevel = locData?.levelMax || (minLevel + 5);
              
              result.lootDrops.forEach((itemDefId: string) => {
                const item = getItem(itemDefId);
                let finalId = itemDefId;
                let droppedLevel = 1;

                if (item && ['weapon', 'armor', 'helmet', 'shield', 'accessory'].includes(item.type)) {
                   droppedLevel = Math.floor(Math.random() * (maxLevel - minLevel + 1)) + minLevel;
                   if (Math.random() < 0.2) {
                      finalId = buildItemId(finalId, 0, 1, [], droppedLevel);
                   } else {
                      finalId = buildItemId(finalId, 0, 0, [], droppedLevel);
                   }
                }
                
                const parsedItem = getItem(finalId);
                if (parsedItem) {
                  const { slots, level } = parseItemId(finalId);
                  msg += `- ${parsedItem.name}${slots > 0 ? ' [1 Слот]' : ''}${level > 1 ? ` (Ур. ${level})` : ''}\n`;
                  const existing = char.rpg.inventory.find((i: any) => i.itemId === finalId);
                  if (existing) {
                    existing.amount += 1;
                  } else {
                    if (char.rpg.inventory.length < 30) {
                      char.rpg.inventory.push({ itemId: finalId, amount: 1 });
                    } else {
                      msg += `(Инвентарь полон, предмет утерян)\n`;
                    }
                  }
                }
              });
            }

            if (leveledUp) msg += `\n🌟 УРОВЕНЬ ПОВЫШЕН! Теперь вы ${char.rpg.level} уровня!`;
            await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
            
            let kbBuilder = Keyboard.builder();
            if ((result as any).combatType === 'arena') {
               kbBuilder
                 .textButton({ label: '⚔️ Сразиться еще раз', payload: { command: 'arena_npc' }, color: Keyboard.PRIMARY_COLOR })
                 .textButton({ label: '🔙 Вернуться', payload: { command: 'arena' }, color: Keyboard.SECONDARY_COLOR });
            } else {
               kbBuilder = getWildKeyboard(char);
            }

            await context.send({
              message: msg,
              keyboard: kbBuilder
            });
            return;
          } else if (result.ended) {
            await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
            
            let kb = Keyboard.builder().textButton({ label: '🔙 В меню', payload: { command: 'menu' }, color: Keyboard.PRIMARY_COLOR });
            if (char.rpg.deathState === 'waiting_revive') {
               if (char.name === 'Kain') {
                 await context.send('⚡️ БОГ: "О, Каин... Как жалко ты выглядишь. Пытался бросить мне вызов? Смешно."');
                 await context.send('⚡️ БОГ: "Ты ничтожен, Каин. Пора тебе исчезнуть."');
                 await context.send('⚡️ БОГ: *громко смеется над телом Каина*');
               }
               kb = Keyboard.builder()
                .textButton({ label: 'Умереть (1 час)', payload: { command: 'die_now' }, color: Keyboard.NEGATIVE_COLOR })
                .textButton({ label: 'Подождать', payload: { command: 'wait_revive' }, color: Keyboard.SECONDARY_COLOR })
                ;
               chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок ${char.name} погиб в бою.` }] });
            } else if (result.fled) {
               chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок ${char.name} сбежал из боя.` }] });
               if ((result as any).combatType === 'arena') {
                 kb = Keyboard.builder()
                   .textButton({ label: '⚔️ Сразиться еще раз', payload: { command: 'arena_npc' }, color: Keyboard.PRIMARY_COLOR })
                   .textButton({ label: '🔙 Вернуться', payload: { command: 'arena' }, color: Keyboard.SECONDARY_COLOR });
               } else {
                 kb = getWildKeyboard(char);
               }
            }

            await context.send({
              message: result.log,
              keyboard: kb
            });
            return;
          } else {
            await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
            await renderCombatUI(context, char, result.log);
            return;
          }
        }
      } catch (e) {
        console.error("Menu error", e);
        await context.send('Произошла ошибка при открытии меню.');
      }
      return;
    }

    // Character Creation Flow
    if (text === 'создать персонажа') {
      userStates.set(senderId, { step: 'chatting', data: { ownerId: senderId } });
      creationChats.set(senderId, []);
      
      const systemInstruction = `Ты — опытный и лаконичный Данжен Мастер. Твоя цель — помочь игроку создать персонажа. ВАЖНО: Игрок должен создать персонажа в диалоге с тобой.
ОТВЕЧАЙ КРАТКО (1-2 предложения). Не пиши длинных вступлений.
ВЫ ВЕДЕТЕ ДИАЛОГ! Спрашивай игрока по одному пункту: Имя, Расу, Класс и Предысторию. Строго давай на выбор только ДОСТУПНЫЕ классы и расы из базы.
Доступные классы: ${CLASSES.join(', ')}. (Подклассы недоступны при создании).
Доступные расы: ${RACES_LIST.map(r => r.name).join(', ')}.
ПРАВИЛО: Игрок может выбрать ТОЛЬКО класс из списка доступных классов и ТОЛЬКО расу из списка доступных рас. Если игрок выбирает что-то другое, вежливо скажи, что это недоступно и предложи варианты.
Скажи игроку, что его начальные характеристики будут сгенерированы случайным образом, но его Раса даст ему скрытые баффы.
Если игрок прислал фото, похвали арт, определи возраст, пол и стартовый инвентарь.
ПРЕСЕКАЙ ЧИТЕРСТВО! Никаких легендарок или 100 уровней.
ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ: НИКОГДА не выдавай блок [ГОТОВО] сам, пока игрок явно не скажет 'Готово', 'Завершить' или вы не пройдете все пункты выбора (Имя, Раса, Класс, Предыстория) и игрок не подтвердит результат.
Как только игрок скажет, что готов завершить создание, и все пункты выбраны (из разрешенных), добавь в конец сообщения блок:
[ГОТОВО]
{
  "name": "Имя", 
  "race": "Раса", 
  "charClass": "Класс", 
  "backstory": "Предыстория",
  "age": "Возраст",
  "gender": "Пол",
  "inventory": "Рюкзак",
  "equipment": "Снаряжение"
}`;

      try {
        await context.setActivity();
        const reply = await sendMessageWithRetry("Привет! Я хочу создать персонажа.", systemInstruction, creationChats.get(senderId)!);
        await context.send(reply);
      } catch (e) {
        console.error("Char creation init error", e);
        await context.send('❌ Сервис генерации временно недоступен. Пожалуйста, попробуйте еще раз позже.');
        userStates.delete(senderId);
        creationChats.delete(senderId);
      }
      return;
    }

    if (userStates.has(senderId)) {
      const state = userStates.get(senderId)!;
      if (state.step === 'chatting') {
        try {
          const history = creationChats.get(senderId) || [];
          const systemInstruction = `Ты — опытный и лаконичный Данжен Мастер. Твоя цель — помочь игроку создать персонажа. ВАЖНО: Игрок должен создать персонажа в диалоге с тобой.
ОТВЕЧАЙ КРАТКО (1-2 предложения). Не пиши длинных вступлений.
ВЫ ВЕДЕТЕ ДИАЛОГ! Спрашивай игрока по одному пункту: Имя, Расу, Класс и Предысторию. Строго давай на выбор только ДОСТУПНЫЕ классы и расы из базы.
Доступные классы: ${CLASSES.join(', ')}. (Подклассы недоступны при создании).
Доступные расы: ${RACES_LIST.map(r => r.name).join(', ')}.
ПРАВИЛО: Игрок может выбрать ТОЛЬКО класс из списка доступных классов и ТОЛЬКО расу из списка доступных рас. Если игрок выбирает что-то другое, вежливо скажи, что это недоступно и предложи варианты.
Скажи игроку, что его начальные характеристики будут сгенерированы случайным образом, но его Раса даст ему скрытые баффы.
Если игрок прислал фото, похвали арт, определи возраст, пол и стартовый инвентарь.
ПРЕСЕКАЙ ЧИТЕРСТВО! Никаких легендарок или 100 уровней.
ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ: НИКОГДА не выдавай блок [ГОТОВО] сам, пока игрок явно не скажет 'Готово', 'Завершить' или вы не пройдете все пункты выбора (Имя, Раса, Класс, Предыстория) и игрок не подтвердит результат.
Как только игрок скажет, что готов завершить создание, и все пункты выбраны (из разрешенных), добавь в конец сообщения блок:
[ГОТОВО]
{
  "name": "Имя", 
  "race": "Раса", 
  "charClass": "Класс", 
  "backstory": "Предыстория",
  "age": "Возраст",
  "gender": "Пол",
  "inventory": "Рюкзак",
  "equipment": "Снаряжение"
}`;

          let imageUrl: string | undefined;
          if (context.hasAttachments('photo')) {
            const photos = context.getAttachments('photo');
            imageUrl = photos[0].largeSizeUrl;
            state.data.imageUrl = imageUrl; // Save latest image to state
          }

          await context.setActivity();
          const reply = await sendMessageWithRetry(context.text || "Посмотри на фото", systemInstruction, history, imageUrl);
          creationChats.set(senderId, history);

          // Check if finished
          const match = reply.match(/\[ГОТОВО\]\s*(\{[\s\S]*?\})/i);
          if (match) {
            const jsonStr = match[1];
            try {
              const cleanJsonStr = jsonStr.replace(/```json/gi, '').replace(/```/g, '').trim();
              
              // Ensure it's a valid JSON object
              const charData = JSON.parse(cleanJsonStr);
              
              // Validate required fields to prevent malformed data
              if (!charData.name || !charData.race || !charData.charClass) {
                throw new Error("Missing required character fields");
              }

              const charId = `char_${senderId}_${Date.now()}`;
              
              const newRpgData = JSON.parse(JSON.stringify(DEFAULT_RPG_DATA));
              // Randomize initial stats
              newRpgData.baseStats = {
                hp: Math.floor(Math.random() * 51) + 100, // 100-150
                maxHp: 0, // will set to hp
                mp: Math.floor(Math.random() * 51) + 50, // 50-100
                maxMp: 0, // will set to mp
                attack: Math.floor(Math.random() * 6) + 5, // 5-10
                defense: Math.floor(Math.random() * 6) + 5, // 5-10
                magicAttack: Math.floor(Math.random() * 6) + 5, // 5-10
                magicDefense: Math.floor(Math.random() * 6) + 5, // 5-10
                agility: Math.floor(Math.random() * 6) + 5, // 5-10
                critRate: Math.floor(Math.random() * 6) + 5, // 5-10
                critDamage: Math.floor(Math.random() * 21) + 40 // 40-60
              };

              charData.ownerId = senderId;
              
              // Identify race and apply racial buffs
              let matchedRace = RACES_LIST.find(r => r.name.toLowerCase() === charData.race.toLowerCase());
              
              // Check secret race
              const isDetent = charData.race.toLowerCase() === 'детент';
              const ownerMatch = String(charData.ownerId) === String(RACECREATOR_ID);
              console.log(`[DEBUG] Creation Check: Race='${charData.race}', isDetent=${isDetent}, ownerId='${charData.ownerId}', RACECREATOR_ID='${RACECREATOR_ID}', ownerMatch=${ownerMatch}`);
              
              if (!matchedRace && isDetent && ownerMatch) {
                  matchedRace = RACE_CATALOG[SECRET_RACE_ID];
                  console.log(`[DEBUG] Secret race found and applied.`);
              }

              if (!matchedRace) {
                // simple fuzzy match
                 const rcName = charData.race.toLowerCase();
                 matchedRace = RACES_LIST.find(r => rcName.includes(r.name.toLowerCase()) || r.name.toLowerCase().includes(rcName));
              }

              if (matchedRace && matchedRace.buffs) {
                 const buffs = matchedRace.buffs;
                 if (buffs.hp) newRpgData.baseStats.hp += buffs.hp;
                 if (buffs.mp) newRpgData.baseStats.mp += buffs.mp;
                 if (buffs.attack) newRpgData.baseStats.attack += buffs.attack;
                 if (buffs.defense) newRpgData.baseStats.defense += buffs.defense;
                 if (buffs.magicAttack) newRpgData.baseStats.magicAttack += buffs.magicAttack;
                 if (buffs.magicDefense) newRpgData.baseStats.magicDefense += buffs.magicDefense;
                 if (buffs.agility) newRpgData.baseStats.agility += buffs.agility;
                 if (buffs.critRate) newRpgData.baseStats.critRate += buffs.critRate;
                 if (buffs.critDamage) newRpgData.baseStats.critDamage += buffs.critDamage;
                 // replace name with proper capitalized one
                 charData.race = matchedRace.name;
              }

              newRpgData.baseStats.maxHp = newRpgData.baseStats.hp;
              newRpgData.baseStats.maxMp = newRpgData.baseStats.mp;
              
              // Assign starting skills based on class
              const equippedActive: string[] = [];
              const equippedPassive: string[] = [];
              const unlockedSkills: string[] = [];
              
              const startingSkills = CLASS_STARTING_SKILLS[charData.charClass] || [];
              
              // If the class is not in CLASS_STARTING_SKILLS, give some default skills
              if (startingSkills.length === 0) {
                startingSkills.push('w_dmg_1', 'w_pass_1', 'w_pass_2');
              }
              
              let addedActive = 0;
              let addedPassive = 0;
              
              startingSkills.forEach(skillId => {
                const skill = SKILL_CATALOG[skillId];
                if (skill) {
                  unlockedSkills.push(skillId);
                  if (skill.isPassive && addedPassive < 1) {
                    equippedPassive.push(skillId);
                    addedPassive++;
                  } else if (!skill.isPassive && addedActive < 2) {
                    equippedActive.push(skillId);
                    addedActive++;
                  }
                }
              });
              
              newRpgData.customSkills = []; // Remove custom skills
              newRpgData.equippedSkills = { active: equippedActive, passive: equippedPassive };
              newRpgData.unlockedSkills = unlockedSkills;

              await safeSetDoc(doc(db, 'characters', charId), {
                ...charData,
                level: 1,
                rpg: newRpgData,
                location: 'city',
                imageUrl: state.data.imageUrl || "",
                ownerId: senderId,
                createdAt: new Date().toISOString()
              });
              
              const cleanReply = reply.replace(/\[ГОТОВО\]\s*(\{[\s\S]*?\})/i, '').trim();
              await context.send(cleanReply + `\n\n✨ Персонаж ${charData.name} успешно создан и сохранен! Вы можете управлять им через панель управления.`);
              
              userStates.delete(senderId);
              creationChats.delete(senderId);
            } catch (parseErr) {
              console.error("JSON Parse error", parseErr);
              await context.send(reply + "\n\n(Ошибка сохранения данных, продолжайте общение)");
            }
          } else {
            await context.send(reply);
          }
        } catch (e) {
          console.error("Char creation error", e);
          await context.send('❌ Возникла ошибка при обработке данных персонажа. Попробуйте еще раз.');
        }
        return;
      }
    }

    // Party Message Intercept
    try {
        const snapshot = await getDocs(query(collection(db, 'characters'), where('ownerId', '==', senderId)));
        const chars = snapshot.docs.map(d => ({ id: d.id, ...d.data() as any })).filter((c: any) => !c.deleted);
        if (chars.length > 0) {
            let activeChar = chars[chars.length - 1];
            const userDoc = await getDoc(doc(db, 'users', senderId.toString()));
            if (userDoc.exists() && userDoc.data().activeCharId) {
                const foundChar = chars.find((c: any) => c.id === userDoc.data().activeCharId);
                if (foundChar) activeChar = foundChar;
            }
            if (activeChar.rpg && activeChar.rpg.pendingMessageTo && text !== 'отмена') {
                const tSnap = await getDoc(doc(db, 'characters', activeChar.rpg.pendingMessageTo));
                const targetId = activeChar.rpg.pendingMessageTo;
                activeChar.rpg.pendingMessageTo = null;
                await safeSetDoc(doc(db, 'characters', activeChar.id), { rpg: JSON.parse(JSON.stringify(activeChar.rpg)) }, { merge: true });
                
                if (tSnap.exists()) {
                    const tData = tSnap.data();
                    if (tData.ownerId) {
                        await vk!.api.messages.send({
                           peer_id: tData.ownerId,
                           random_id: Date.now(),
                           message: `✉️ Сообщение от [${activeChar.name}]:\n\n${text}`
                        }).catch(()=>{});
                        await context.send(`Сообщение успешно отправлено ${tData.name}.`);
                    }
                }
                return; // message handled, early return
            } else if (activeChar.rpg && activeChar.rpg.pendingMessageTo && text === 'отмена') {
                activeChar.rpg.pendingMessageTo = null;
                await safeSetDoc(doc(db, 'characters', activeChar.id), { rpg: JSON.parse(JSON.stringify(activeChar.rpg)) }, { merge: true });
                await context.send('Отправка сообщения отменена.');
                return;
            }
            
            // Pending Trade Gold Intercept
            if (activeChar.rpg && activeChar.rpg.pendingTradeGoldTo && text !== 'отмена') {
                const targetId = activeChar.rpg.pendingTradeGoldTo;
                activeChar.rpg.pendingTradeGoldTo = null;
                await safeSetDoc(doc(db, 'characters', activeChar.id), { rpg: JSON.parse(JSON.stringify(activeChar.rpg)) }, { merge: true });
                
                let amount = parseInt(text);
                if (text.toLowerCase() === 'всё' || text.toLowerCase() === 'все') {
                    amount = activeChar.gold || 0;
                }
                
                if (isNaN(amount) || amount <= 0) {
                    await context.send('Неверная сумма.');
                    return;
                }
                
                if ((activeChar.gold || 0) < amount) {
                    await context.send('У вас недостаточно золота!');
                    return;
                }
                
                const tSnap = await getDoc(doc(db, 'characters', targetId));
                if (tSnap.exists()) {
                    const targetChar = tSnap.data();
                    activeChar.gold -= amount;
                    await safeSetDoc(doc(db, 'characters', activeChar.id), { gold: activeChar.gold }, { merge: true });
                    
                    targetChar.gold = (targetChar.gold || 0) + amount;
                    await safeSetDoc(doc(db, 'characters', targetId), { gold: targetChar.gold }, { merge: true });
                    
                    await context.send(`Вы успешно передали ${amount} 💰 игроку ${targetChar.name}!`);
                    
                    if (targetChar.ownerId) {
                        await vk!.api.messages.send({
                            peer_id: targetChar.ownerId,
                            random_id: Date.now(),
                            message: `💸 Игрок ${activeChar.name} передал вам ${amount} 💰.`
                        }).catch(()=>{});
                    }
                }
                return;
            } else if (activeChar.rpg && activeChar.rpg.pendingTradeGoldTo && text === 'отмена') {
                activeChar.rpg.pendingTradeGoldTo = null;
                await safeSetDoc(doc(db, 'characters', activeChar.id), { rpg: JSON.parse(JSON.stringify(activeChar.rpg)) }, { merge: true });
                await context.send('Передача золота отменена.');
                return;
            }
        }
    } catch (e) { console.error('Party message intercept error', e); }

    // RPG Commands
    if (text.startsWith('надеть ') || text.startsWith('снять ') || text.startsWith('использовать ') || text.startsWith('выбросить ')) {
      try {
        const snapshot = await getDocs(query(collection(db, 'characters'), where('ownerId', '==', senderId)));
        const chars = snapshot.docs.map(d => ({ id: d.id, ...d.data() as any })).filter((c: any) => !c.deleted);
        if (chars.length === 0) {
          await context.send('У тебя еще нет персонажа.');
          return;
        }
        
        let char = chars[chars.length - 1];
        const userDoc = await getDoc(doc(db, 'users', senderId.toString()));
        if (userDoc.exists() && userDoc.data().activeCharId) {
          const activeChar = chars.find((c: any) => c.id === userDoc.data().activeCharId);
          if (activeChar) char = activeChar;
        }

        if (!char.rpg) {
          await context.send('У этого персонажа еще нет системного инвентаря. Создай нового персонажа.');
          return;
        }

        const args = text.split(' ').slice(1).join(' ');
        const item = getItemByName(args);
        
        let result = { success: false, message: 'Команда не распознана.' };

        if (text.startsWith('надеть ')) {
          if (!item) result = { success: false, message: 'Предмет не найден в базе.' };
          else result = equipItem(char.rpg, item.id);
        } else if (text.startsWith('снять ')) {
          result = unequipItem(char.rpg, args);
        } else if (text.startsWith('использовать ')) {
          if (!item) result = { success: false, message: 'Предмет не найден в базе.' };
          else result = useItem(char.rpg, item.id);
        } else if (text.startsWith('выбросить ')) {
          if (!item) result = { success: false, message: 'Предмет не найден в базе.' };
          else result = dropItem(char.rpg, item.id);
        }

        if (result.success) {
          await safeSetDoc(doc(db, 'characters', char.id), { gold: char.gold, rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
        }
        await context.send(result.message);
      } catch (e) {
        console.error("RPG command error", e);
        await context.send('Произошла ошибка при выполнении команды.');
      }
      return;
    }

    if (text.startsWith('воскресить ')) {
      try {
        const snapshot = await getDocs(query(collection(db, 'characters'), where('ownerId', '==', senderId)));
        const chars = snapshot.docs.map(d => ({ id: d.id, ...d.data() as any })).filter((c: any) => !c.deleted);
        if (chars.length === 0) {
          await context.send('У тебя еще нет персонажа.');
          return;
        }
        
        let char = chars[chars.length - 1];
        const userDoc = await getDoc(doc(db, 'users', senderId.toString()));
        if (userDoc.exists() && userDoc.data().activeCharId) {
          const activeChar = chars.find((c: any) => c.id === userDoc.data().activeCharId);
          if (activeChar) char = activeChar;
        }

        const targetName = text.replace('воскресить ', '').trim();
        if (!targetName) {
           await context.send('Укажи имя персонажа, которого нужно воскресить.');
           return;
        }

        // Find character with this name
        const allCharsSnap = await getDocs(collection(db, 'characters'));
        const allChars = allCharsSnap.docs.map((d: any) => ({ id: d.id, ...d.data() as any }));
        const targetChar = allChars.find((c: any) => !c.deleted && c.name.toLowerCase() === targetName.toLowerCase());

        if (!targetChar) {
           await context.send('Персонаж с таким именем не найден.');
           return;
        }
        
        if (!targetChar.rpg?.baseStats || targetChar.rpg.baseStats.hp > 0) {
           await context.send(`Персонаж ${targetChar.name} жив и в воскрешении не нуждается.`);
           return;
        }
        
        // Location check
        if (char.location !== targetChar.location) {
           await context.send(`Вы слишком далеко! Персонаж ${targetChar.name} находится в другом месте.`);
           return;
        }
        
        targetChar.rpg.baseStats.hp = Math.floor(targetChar.rpg.baseStats.maxHp * 0.5) || 10;
        await safeSetDoc(doc(db, 'characters', targetChar.id), { rpg: JSON.parse(JSON.stringify(targetChar.rpg)) }, { merge: true });
        
        await context.send(`✨ Ты воскресил персонажа ${targetChar.name}! Его здоровье частично восстановлено.`);
      } catch (e) {
        console.error("Resurrection command error", e);
        await context.send('Произошла ошибка при воскрешении.');
      }
      return;
    }

    // Game commands restriction
    const gameCommands = ['днд вкл', 'включить днд', 'днд выкл', 'выкл', 'я играю'];
    const isGameCommand = gameCommands.includes(text) || (isGameActive && (players.has(senderId) || isCreator));

    if (text === 'днд вкл' || text === 'включить днд' || text === 'рпг вкл') {
      if (isCreator) {
        if (isGameActive) {
          await context.send('Игра уже запущена!');
        } else {
          isGameActive = true;
          players.clear();
          chatHistory = [];
          currentPlot = "Трое искателей приключений сидят за дальним столиком в полутемной таверне 'Хромой Гоблин' на окраине Элдории. На улице льет проливной дождь. К ним подсаживается загадочный старец в капюшоне, кладет на стол туго набитый кошель с золотом и старую, потрепанную карту, после чего хрипло произносит: 'Мне сказали, вы лучшие. Дело опасное, но награда того стоит...'";
          await safeSetDoc(doc(db, 'sessions', 'active'), {
            isActive: true,
            plotSummary: currentPlot,
            players: Array.from(players),
            updatedAt: new Date().toISOString()
          });
          addLog(`Игра запущена создателем ${userName}`);
          await context.send('⚔️ Добро пожаловать в Элдорию! Реалистичный RPG-режим активирован. Все желающие присоединиться, напишите "я играю". Если у вас нет персонажа, напишите "создать персонажа".\n\n📜 Вводная:\n' + currentPlot);
        }
      } else {
        await context.send('Только мой создатель Marat Zubayraev может начать игру.');
      }
      return;
    }

    if (text === 'днд выкл' || text === 'выкл') {
      if (isCreator) {
        if (!isGameActive) {
          await context.send('Игра и так выключена.');
        } else {
          isGameActive = false;
          chatHistory = [];
          await safeSetDoc(doc(db, 'sessions', 'active'), {
            isActive: false,
            plotSummary: currentPlot,
            players: Array.from(players),
            updatedAt: new Date().toISOString()
          });
          addLog(`Игра остановлена создателем ${userName}`);
          await context.send('🛑 Игра окончена. Сюжет сохранен. Спасибо за участие!');
        }
      } else {
        await context.send('Только мой создатель Marat Zubayraev может остановить игру.');
      }
      return;
    }

    if (isGameActive) {
      if (text === 'я играю') {
        if (!players.has(senderId)) {
          players.add(senderId);
          await safeSetDoc(doc(db, 'sessions', 'active'), {
            isActive: true,
            plotSummary: currentPlot,
            players: Array.from(players),
            updatedAt: new Date().toISOString()
          });
          addLog(`Игрок ${userName} присоединился к игре. Всего игроков: ${players.size}`);
          await context.send(`${userName} присоединяется к приключению! (Всего игроков: ${players.size})`);
        } else {
          await context.send(`${userName}, ты уже в игре!`);
        }
        return;
      }

      if (players.has(senderId) || isCreator) {
        try {
          // Get active character name
          let charName = userName;
          const snapshot = await getDocs(query(collection(db, 'characters'), where('ownerId', '==', senderId)));
          const chars = snapshot.docs.map(d => ({ id: d.id, ...d.data() as any })).filter((c: any) => !c.deleted);
          
          if (chars.length > 0) {
            let activeChar = chars[chars.length - 1];
            const userDoc = await getDoc(doc(db, 'users', senderId.toString()));
            if (userDoc.exists() && userDoc.data().activeCharId) {
              const foundChar = chars.find((c: any) => c.id === userDoc.data().activeCharId);
              if (foundChar) activeChar = foundChar;
            }
            charName = activeChar.name;
          }

          addLog(`[${charName}]: ${context.text}`);
          
          let charInfo = "";
          let activeCharDocId = "";
          let activeChar: any = null;
          if (chars.length > 0) {
            activeChar = chars[chars.length - 1];
            const userDoc = await getDoc(doc(db, 'users', senderId.toString()));
            if (userDoc.exists() && userDoc.data().activeCharId) {
              const foundChar = chars.find((c: any) => c.id === userDoc.data().activeCharId);
              if (foundChar) activeChar = foundChar;
            }
            activeCharDocId = activeChar.id;
            
            if (!activeChar.rpg?.conversingNpcId && payloadCommand !== 'game_choice') {
               if (!payloadCommand) {
                  await context.send("Я не понимаю эту команду. Воспользуйтесь кнопками меню.");
               }
               return;
            }
            
            let systemItemsList = '';
            let statsInfo = '';
            if (activeChar.rpg) {
              if (activeChar.rpg.inventory) {
                systemItemsList = activeChar.rpg.inventory.map((i: any) => {
                  const item = getItem(i.itemId);
                  return item ? `${i.itemId} (x${i.amount})` : '';
                }).filter(Boolean).join(', ');
              }
              const totalStats = calculateTotalStats(activeChar.rpg);
              statsInfo = `\nУровень: ${activeChar.rpg.level || 1}, Золото: ${activeChar.gold || 0}\n` +
                          `ХП: ${activeChar.rpg.baseStats?.hp}/${totalStats.maxHp}, МП: ${activeChar.rpg.baseStats?.mp}/${totalStats.maxMp}\n` +
                          `Атака: ${totalStats.attack}, Маг.Атака: ${totalStats.magicAttack}\n` +
                          `Защита: ${totalStats.defense}, Маг.Защита: ${totalStats.magicDefense}\n` +
                          `Ловкость: ${totalStats.agility}, Крит: ${totalStats.critRate}%, Крит.урон: ${totalStats.critDamage}%`;
            }
            charInfo = `\nСюжетные вещи ${charName}: ${activeChar.inventory || 'пусто'}\nСистемные предметы в инвентаре: [${systemItemsList}]\nТекущая локация: ${activeChar.location || 'неизвестно'}\n<ХАРАКТЕРИСТИКИ>\n${statsInfo}`;
          }

          // Clean up old rumors
          const now = Date.now();
          while(guildRumors.length > 0 && now - guildRumors[0].timestamp > 3600000) {
            guildRumors.shift();
          }
          const rumorsText = guildRumors.length > 0 ? `\nСЛУХИ В ГИЛЬДИИ (Игроки обсуждают это): ${guildRumors.map(r => `${r.playerName} взял задание "${r.questName}"`).join('; ')}` : '';
          
          let npcsText = '';
          try {
             const npcsSnap = await getDocs(query(collection(db, 'npcs'), where('locationId', '==', activeChar?.location || 'loc_starter')));
             const localNpcs: any[] = [];
             npcsSnap.forEach(docSnap => localNpcs.push({...docSnap.data(), _id: docSnap.id}));
             if (localNpcs.length > 0) {
                 npcsText = `\nСЕЙЧАС В ЛОКАЦИИ НАХОДЯТСЯ СЛЕДУЮЩИЕ ИМЕННЫЕ NPC, С КОТОРЫМИ МОЖНО ВЗАИМОДЕЙСТВОВАТЬ:\n`;
                 localNpcs.forEach(n => {
                     npcsText += `- ${n.name} (ID: ${n._id}, Ур ${n.level}). Роль: ${n.prompt}. Приветствие: "${n.greeting}". Отношение: ${n.hostile ? 'Враждебен (нападет если спровоцировать)' : 'Нейтрален'}.\n`;
                 });
                 npcsText += `\nВНИМАНИЕ: Если игрок решает напасть на NPC (или грубит так, что NPC решает напасть первым), добавь тег [START_NPC_COMBAT] ID_NPC [/START_NPC_COMBAT] в конце ответа (например [START_NPC_COMBAT] ${localNpcs[0]?._id} [/START_NPC_COMBAT]). Сервер перехватит этот тег и запустит системный бой. Не описывай сам бой.\n`;
             }
          } catch(e) { console.error('Error fetching npcs', e); }

          // Generate Dynamic Quest Board for current player level
          let validLocations = WORLD_LOCATIONS.filter(l => l.levelMin <= (activeChar?.rpg?.level || 1) + 10);
          if(validLocations.length === 0) validLocations = WORLD_LOCATIONS.slice(0, 5);
          
          const questBoardButtons = [];
          const questBoardLore = [];
          for(let i=0; i<6; i++) {
              const randLoc = validLocations[Math.floor(Math.random() * validLocations.length)];
              const locMonsters = randLoc.monsters || [];
              if(locMonsters.length > 0) {
                 const randMonsterId = locMonsters[Math.floor(Math.random() * locMonsters.length)];
                 const monster = MONSTER_CATALOG[randMonsterId];
                 if(monster) {
                    const count = Math.floor(Math.random() * 4) + 2;
                    
                    let reward = 50;
                    if (monster.level <= 5) reward = Math.floor(Math.random() * 50) + 30;
                    else if (monster.level <= 15) reward = Math.floor(monster.level * count * 5);
                    else reward = Math.floor(monster.level * count * 15);
                    
                    const shortBtn = `⚔️ ${count}x ${monster.name}`.substring(0, 38);
                    questBoardButtons.push(shortBtn);
                    questBoardLore.push(`- Задание: "Убить ${count} ${monster.name}". Локация: ${randLoc.name}. Награда: ${reward} золота.`);
                 }
              }
          }
          questBoardButtons.push("⬅️ Назад");
          const questButtonsJson = JSON.stringify(questBoardButtons);

        let npcInstructionContext = '';
        if (activeChar?.rpg?.conversingNpcId) {
             const normLocId = (activeChar.location === 'city' || activeChar.location === 'city_1') ? 'loc_city_eldoria' : activeChar.location;
             const loc = WORLD_LOCATIONS.find((l: any) => l.id === normLocId);
             let npc = loc?.npcs?.find((n: any) => n.id === activeChar.rpg.conversingNpcId);
             if (!npc && activeChar.rpg.tempNpc && activeChar.rpg.tempNpc.id === activeChar.rpg.conversingNpcId) {
                 npc = activeChar.rpg.tempNpc;
             }
             if (npc) {
                 npcInstructionContext = `ВНИМАНИЕ: СЕЙЧАС ИГРОК РАЗГОВАРИВАЕТ С NPC. ТЫ ДОЛЖЕН ОТЫГРАТЬ РОЛЬ ЭТОГО NPC!\nИмя NPC: ${npc.name}\nОписание NPC: ${npc.description}\n\nОТВЕЧАЙ ОТ ЛИЦА ЭТОГО NPC В УКАЗАННОМ ХАРАКТЕРЕ. Твой ответ должен быть не более 2-4 предложений.\n\n`;
             }
        }

        let systemInstruction = `${npcInstructionContext}Ты — строгий, беспристрастный и логичный Мастер Игры (Game Master) в реалистичной RPG игре. Твой создатель — Marat Zubayraev. Мир: Элдория (темное фэнтези). 
ОТВЕЧАЙ ОЧЕНЬ КРАТКО И ТОЧНО. МИНИМУМ ВОДЫ. МАКСИМУМ 1-2 АБЗАЦА. Запоминай все события.

Учет обновлений из патча (СТРОГО ДЛЯ МАСТЕРА ИГРЫ):
1. Монстры и Бой: В мире сгенерировано сотни уникальных монстров. ВАЖНО: Ты сам урон НЕ считаешь. Математика боя, HP, PvP, и расчет скиллов скрыты под капотом бота. Твоя задача — ТОЛЬКО описывать лор и завязку боя. Если игрок начинает бой с сюжетным боссом или неписем, добавь тег [START_SOLO_COMBAT] Имя Босса [/START_SOLO_COMBAT].
2. СТРОГИЕ ПРАВИЛА ПУТЕШЕСТВИЙ: Если игрок собирается отправиться в другую локацию ВНЕ ГОРОДА (лес, пещера, отправиться на квест), ТЫ ДОЛЖЕН СТРОГО использовать тег [TIMER] 1 | 🗺️ Вы прибыли в локацию! Приготовьтесь! [/TIMER]. 
ЗАПРЕЩЕНО использовать тег [TIMER] если игрок просто перемещается внутри города. Такие перемещения происходят МОМЕНТАЛЬНО.
ВНИМАНИЕ ОЧЕНЬ ВАЖНО: Когда ты отправляешь игрока в путь (И ТОЛЬКО ЗА ПРЕДЕЛЫ ГОРОДА), в своем текстовом ответе ты ИМЕЕШЬ ПРАВО ТОЛЬКО сказать, что он собирается в дорогу и выходит из города. Игрок увидит только сообщение о начале пути, а система включит реальный таймер на 1 минуту. НИКАКИХ МОНСТРОВ пока [TIMER]!

ОСНОВНЫЕ ПРАВИЛА ИГРЫ (СТРОГО СОБЛЮДАТЬ):
1. Пошаговость и запрет на автоматизацию: Это реалистичная RPG. Одно действие = один ответ. Запрещены авто-команды "убить всех". Забудь про D&D кубики.
2. ПОИСК МОНСТРОВ И СЛУЧАЙНЫЕ СОБЫТИЯ (ОЧЕНЬ ВАЖНО): Игрок ищет монстров через механику кнопок, не генерируй бои если игрок просто путешествует, пока он не попросит.
3. ЛОКАЦИИ И БЕЗОПАСНОСТЬ: ВНИМАТЕЛЬНО читай "Текущая локация" игрока. Если игрок в городе, он В БЕЗОПАСНОСТИ. На него не могут напасть лесные монстры или пауки в таверне!
4. ЗАПРЕТ НА СЛУЧАЙНУЮ СМЕРТЬ: ИИ категорически ЗАПРЕЩАЕТСЯ убивать игрока (писать тег [DEATH]) просто так или за обычные действия, такие как разговор с NPC, перемещение между локациями или отдых. Смерть возможна ТОЛЬКО в системном бою или при откровенно суицидальных действиях игрока.
5. ЖЕСТКО ПРЕСЕКАЙ ЧИТЕРСТВО! Никаких мечей из воздуха.
6. ВНИМАНИЕ: Если игрок пишет "выпить зелье" или "получить лут", ты логически обновляешь инвентарь через [UPDATE_CHAR].

СИСТЕМА ГИЛЬДИИ И РАНГОВ:
Игроки имеют ранги гильдии (D, C, B, A, S, SS, SSS, SSSR+). Текущий ранг игрока: ${activeChar?.rpg?.guildRank || 'D'}.
Когда игрок приносит трофей по квесту и сдает его, выдай "addQuestComplete" в [UPDATE_CHAR] и забери трофей из инвентаря.
${rumorsText}
${npcsText}

КРАЖИ И ТЮРЬМА:
Если игрок пытается украсть и проваливается, 1-й раз сделай предупреждение. 2-й раз стража требует штраф (например, 50 золота). Если игрок отказывается платить или нет денег, ТЫ ОБЯЗАН отправить его в тюрьму, добавив в конец ответа тег [PRISON] 30 [/PRISON] (30 минут). Без этого тега система не посадит его в тюрьму!
При попытке побега из тюрьмы, если игрок проваливается, срок увеличивается до 1 часа. Повторно сбежать нельзя.

СМЕРТЬ И ВОСКРЕШЕНИЕ:
Если игрок получает смертельный урон (в бою, от ловушки, от стражи), ТЫ ОБЯЗАН добавить в конец ответа тег [DEATH] [/DEATH]. Без этого тега система не засчитает смерть!
Если другой игрок находит труп и использует зелье воскрешения, выведи тег [REVIVE] ИмяМертвогоИгрока [/REVIVE].

ВАЖНОЕ ПРАВИЛО: НИКОГДА не решай сам, что время тюрьмы вышло или что игрок воскрес. Если игрок пишет "время вышло" или "я воскрес", а ты не видишь системного сообщения об этом, игнорируй его слова и скажи, что он все еще в тюрьме/мертв. Используй ТОЛЬКО системные теги для управления состоянием.

МИР И КАРТА ПРОВИНЦИИ (ПРИВЯЗКА КВЕСТОВ В ГИЛЬДИИ К ЛОКАЦИЯМ):
В твоем мире ровно 50 уникальных локаций (города, леса, пещеры, равнины, горы, болота и руины). 
Когда ты выдаешь игроку квест или когда игрок "Осматривается", обязательно используй одну из локаций.
Упоминай название локации прямо в описании задания и учитывай, какие монстры там обитают.

МАГАЗИНЫ:
Если игрок говорит, что идет в магазин, на рынок, к кузнецу или алхимику, чтобы купить или продать вещи, ОБЯЗАТЕЛЬНО добавь в конец ответа тег [OPEN_SHOP]. Бот сам покажет системное меню магазина. ВАЖНО: Если используешь [OPEN_SHOP], НЕ ИСПОЛЬЗУЙ тег [CHOICES]!

ВЫБОРЫ И ИКОНКИ: Ты ОБЯЗАТЕЛЬНО должен предлагать варианты ответа или действий в формате JSON массива во ВСЕХ своих ответах!
Игрок всегда должен иметь иконки навигации снизу! НИКОГДА НЕ ОСТАВЛЯЙ ИГРОКА БЕЗ КНОПОК!
- Если игрок в Таверне, делай кнопки: ["🍺 Выпить", "🗣️ Слухи", "👀 Осмотреться", "🚪 Уйти"].
- Если игрок ведет диалог с NPC, давай кнопки возможных вариантов ответов или "Уйти".
- Даже если кажется, что вариантов нет, дай кнопку "Продолжить" или "Осмотреться".
ВАЖНО: Названия кнопок должны быть ОЧЕНЬ КОРОТКИМИ (максимум 2-3 слова, до 30 символов).
Пример:
[CHOICES]
["Принять квест", "Отказаться", "Уйти"]
[/CHOICES]
Использовать этот блок нужно ВСЕГДА, кроме случаев, когда ты используешь теги [OPEN_SHOP], [DEATH], [TIMER] или [PRISON].

ФОРМАТ ОТВЕТОВ:
В каждом ответе во время сюжета или изменения состояния ты ОБЯЗАН по возможности выводить краткую сводку в самом конце:
[Статус: Игрок (Лвл: ${activeChar?.rpg?.level || 1}) | Локация: (Текущая локация или "В пути")]

Если игрок сдает квест, ОБЯЗАТЕЛЬНО добавь в самый конец своего ответа блок:
[UPDATE_CHAR]
{
  "addXp": 0, // ВЫДАВАЙ ОПЫТ ТОЛЬКО ЗА ВЫПОЛНЕНИЕ КВЕСТА (от 300 до 1000 XP). За обычные разговоры и действия пиши 0.
  "addQuestComplete": "D" // УКАЗЫВАТЬ РАНГ ЗАДАНИЯ (D, C, B...) СТРОГО И ТОЛЬКО КОГДА ИГРОК ВЕРНУЛСЯ В ГИЛЬДИЮ И ВЫБРАЛ "🏅 Регистратура", чтобы сдать трофей! Если игрок всё еще в бою или в лесу, НЕ ПИШИ ЭТО ПОЛЕ (удали его).
}
[/UPDATE_CHAR]
ВНИМАНИЕ ПО КВЕСТАМ: На месте убийства игроку НЕ начисляется золото и нет завершения квеста. После боя выдай ему предмет (например "Трофей монстра" или "Голова убитого чудовища") в инвентарь и скажи возвращаться в гильдию. Только в гильдии у Регистратуры он получает награду.

Если игрок говорит, что хочет пойти на охоту, сразиться с монстром или начать бой, ОБЯЗАТЕЛЬНО добавь в конец ответа тег [START_SOLO_COMBAT] Имя Монстра [/START_SOLO_COMBAT]. Бот сам подберет монстра по уровню игрока и запустит системный бой с кнопками (Атака, Навыки, Защита, Сбежать).
ВАЖНО: НИКОГДА не описывай сам процесс боя, не придумывай урон и не убивай монстров в тексте! Бой должен проходить ТОЛЬКО через системные кнопки. Твоя задача — только отыграть завязку (например: "Из кустов на тебя выпрыгивает монстр! Готовься к бою!") и вывести тег с именем монстра.

Текущий сюжет: ${currentPlot}${charInfo}`;
          
          let imageUrl: string | undefined;
          if (context.hasAttachments('photo')) {
            const photos = context.getAttachments('photo');
            imageUrl = photos[0].largeSizeUrl;
          }

          await context.setActivity();
          const replyText = await sendMessageWithRetry(`${charName} говорит/делает: ${context.text || "Посмотри на фото"}. (Кратко обнови сюжет в конце своего ответа в формате СЮЖЕТ: [текст])`, systemInstruction, chatHistory, imageUrl);
          let reply = replyText;
          
          // Parse character update
          const updateMatch = reply.match(/\[UPDATE_CHAR\]\s*(\{[\s\S]*?\})\s*(\[\/UPDATE_CHAR\]|\[\/\/UPDATE_CHAR\])/i);
          if (updateMatch && activeCharDocId) {
            try {
              const updateData = JSON.parse(updateMatch[1]);
              const updates: any = {
                inventory: updateData.inventory
              };
              
              if (updateData.equipment) {
                updates.equipment = updateData.equipment;
              }
              
              if (updateData.systemItems && Array.isArray(updateData.systemItems)) {
                const docSnap = await getDoc(doc(db, 'characters', activeCharDocId));
                if (docSnap.exists()) {
                  const charData = docSnap.data();
                  if (charData.rpg) {
                    // Update rpg.inventory based on systemItems
                    // We just count the occurrences of each ID
                    const newInv: Record<string, number> = {};
                    updateData.systemItems.forEach((id: string) => {
                      if (getItem(id)) {
                        newInv[id] = (newInv[id] || 0) + 1;
                      }
                    });
                    charData.rpg.inventory = Object.entries(newInv).map(([itemId, amount]) => ({ itemId, amount }));
                    updates.rpg = JSON.parse(JSON.stringify(charData.rpg));
                  }
                }
              }

              // Apply XP for the action
              let xpMessage = "";
              if (updateData.addXp && typeof updateData.addXp === 'number' && updateData.addXp > 0) {
                const docSnap = await getDoc(doc(db, 'characters', activeCharDocId));
                if (docSnap.exists()) {
                  const charData = docSnap.data();
                  if (charData.rpg) {
                    const leveledUp = addXp(charData.rpg, updateData.addXp);
                    updates.rpg = JSON.parse(JSON.stringify(charData.rpg));
                    updates.level = charData.rpg.level;
                    xpMessage = `\n\n✨ Получено опыта: ${updateData.addXp} XP!`;
                    if (leveledUp) {
                      xpMessage += `\n🌟 ПОЗДРАВЛЯЕМ! ${charName} достиг ${charData.rpg.level} уровня! Характеристики улучшены, здоровье восстановлено.`;
                    }
                  }
                }
              }

              if (updateData.addQuestComplete) {
                const docSnap = await getDoc(doc(db, 'characters', activeCharDocId));
                if (docSnap.exists()) {
                  const charData = docSnap.data();
                  if (charData.rpg) {
                    const questRank = updateData.addQuestComplete;
                    const currentRank = charData.rpg.guildRank || 'D';
                    
                    if (questRank === currentRank) {
                      charData.rpg.completedQuestsCount = (charData.rpg.completedQuestsCount || 0) + 1;
                      
                      const RANK_THRESHOLDS: any = { 'D': 10, 'C': 20, 'B': 30, 'A': 40, 'S': 50, 'SS': 60, 'SSS': 70, 'SSSR+': 999999 };
                      const RANKS = ['D', 'C', 'B', 'A', 'S', 'SS', 'SSS', 'SSSR+'];
                      
                      const threshold = RANK_THRESHOLDS[currentRank];
                      if (charData.rpg.completedQuestsCount >= threshold) {
                        const nextRankIndex = RANKS.indexOf(currentRank) + 1;
                        if (nextRankIndex < RANKS.length) {
                          charData.rpg.guildRank = RANKS[nextRankIndex];
                          charData.rpg.completedQuestsCount = 0;
                          xpMessage += `\n\n🎉 ПОЗДРАВЛЯЕМ! Ваш ранг в гильдии повышен до ${charData.rpg.guildRank}!`;
                        }
                      } else {
                         xpMessage += `\n\n📈 Прогресс ранга: ${charData.rpg.completedQuestsCount}/${threshold} заданий ранга ${currentRank}.`;
                      }
                    } else {
                      xpMessage += `\n\nℹ️ Задание ранга ${questRank} выполнено, но для повышения ранга нужны задания вашего текущего ранга (${currentRank}).`;
                    }
                    
                    const REWARDS: any = { 'D': 50, 'C': 150, 'B': 500, 'A': 1500, 'S': 5000, 'SS': 15000, 'SSS': 50000, 'SSSR+': 100000 };
                    const goldEarned = REWARDS[questRank] || 50;
                    updates.gold = (charData.gold || 0) + goldEarned;
                    xpMessage += `\n💰 За задание получено: ${goldEarned} золота!`;
                    
                    updates.rpg = JSON.parse(JSON.stringify(charData.rpg));
                  }
                }
              }

              await safeSetDoc(doc(db, 'characters', activeCharDocId), updates, { merge: true });
              reply = reply.replace(/\[UPDATE_CHAR\]\s*(\{[\s\S]*?\})\s*(\[\/UPDATE_CHAR\]|\[\/\/UPDATE_CHAR\])/i, '').trim();
              reply += xpMessage;
            } catch (e) {
              console.error("Failed to parse char update", e);
            }
          }

          // Extract plot summary if provided
          const plotMatch = reply.match(/СЮЖЕТ:\s*(.*)/i);
          if (plotMatch) {
            currentPlot = plotMatch[1];
            reply = reply.replace(/СЮЖЕТ:\s*(.*)/i, '').trim();
            await safeSetDoc(doc(db, 'sessions', 'active'), {
              isActive: true,
              plotSummary: currentPlot,
              players: Array.from(players),
              updatedAt: new Date().toISOString()
            });
          }

          // Parse [QUEST_TAKEN]
          const questMatch = reply.match(/\[QUEST_TAKEN\]\s*([\s\S]*?)\s*\[\/QUEST_TAKEN\]/i);
          if (questMatch) {
            guildRumors.push({ playerName: charName, questName: questMatch[1].trim(), timestamp: Date.now() });
            reply = reply.replace(/\[QUEST_TAKEN\]\s*([\s\S]*?)\s*\[\/QUEST_TAKEN\]/i, '').trim();
          }

          // Parse [TIMER]
          let isAiTimerTriggered = false;
          const timerMatch = reply.match(/\[TIMER\]\s*(\d+)\s*\|\s*([\s\S]*?)\s*\[\/TIMER\]/i);
          if (timerMatch && activeCharDocId) {
            const minutes = parseInt(timerMatch[1]);
            const message = timerMatch[2].trim();
            
            const endTime = Date.now() + minutes * 60000;
            
            await safeSetDoc(doc(db, 'characters', activeCharDocId), { 
              actionEndTime: endTime,
              actionType: 'ai_timer',
              actionMessage: message,
              actionNotified: false
            }, { merge: true });
            
            reply = reply.replace(/\[TIMER\]\s*(\d+)\s*\|\s*([\s\S]*?)\s*\[\/TIMER\]/i, '').trim();
            isAiTimerTriggered = true;
          }

          let keyboard;
          if (isAiTimerTriggered) {
             keyboard = Keyboard.builder().textButton({ label: '⏳ Проверить статус', payload: { command: 'check_timer' }, color: Keyboard.SECONDARY_COLOR });
          }

          // Parse [PRISON]
          const prisonMatch = reply.match(/\[PRISON\]\s*(\d+)\s*\[\/PRISON\]/i);
          if (prisonMatch && activeCharDocId) {
            const minutes = parseInt(prisonMatch[1]);
            const docSnap = await getDoc(doc(db, 'characters', activeCharDocId));
            if (docSnap.exists()) {
              const charData = docSnap.data();
              if (charData.rpg) {
                charData.rpg.prisonEndTime = Date.now() + minutes * 60000;
                charData.rpg.prisonEscapeAttempted = false;
                await safeSetDoc(doc(db, 'characters', activeCharDocId), { rpg: JSON.parse(JSON.stringify(charData.rpg)) }, { merge: true });
                chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок ${charData.name} посажен в тюрьму на ${minutes} минут.` }] });
              }
            }
            reply = reply.replace(/\[PRISON\]\s*(\d+)\s*\[\/PRISON\]/i, '').trim();
            keyboard = Keyboard.builder()
              .textButton({ label: 'Сбежать', payload: { command: 'prison_escape' }, color: Keyboard.NEGATIVE_COLOR })
              ;
          }

          // Parse [DEATH]
          const deathMatch = reply.match(/\[DEATH\][\s\S]*?\[\/DEATH\]/i);
          if (deathMatch && activeCharDocId) {
            const docSnap = await getDoc(doc(db, 'characters', activeCharDocId));
            if (docSnap.exists()) {
              const charData = docSnap.data();
              if (charData.rpg) {
                charData.rpg.deathState = 'waiting_revive';
                charData.rpg.deathEndTime = Date.now() + 10 * 60000; // 10 minutes to wait for revive
                await safeSetDoc(doc(db, 'characters', activeCharDocId), { rpg: JSON.parse(JSON.stringify(charData.rpg)) }, { merge: true });
                chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок ${charData.name} получил смертельный урон и ждет воскрешения.` }] });
              }
            }
            reply = reply.replace(/\[DEATH\][\s\S]*?\[\/DEATH\]/i, '').trim();
            keyboard = Keyboard.builder()
              .textButton({ label: 'Умереть (1 час)', payload: { command: 'die_now' }, color: Keyboard.NEGATIVE_COLOR })
              .textButton({ label: 'Подождать', payload: { command: 'wait_revive' }, color: Keyboard.SECONDARY_COLOR })
              ;
          }

          // Parse [REVIVE]
          const reviveMatch = reply.match(/\[REVIVE\]\s*(.*?)\s*\[\/REVIVE\]/i);
          if (reviveMatch) {
            const targetName = reviveMatch[1].trim();
            // Find dead character by name
            const allCharsSnap = await getDocs(collection(db, 'characters'));
            for (const d of allCharsSnap.docs) {
              const cData = d.data();
              if (cData.name === targetName && cData.rpg && (cData.rpg.deathState === 'waiting_revive' || cData.rpg.deathState === 'dead')) {
                cData.rpg.deathState = 'alive';
                cData.rpg.deathEndTime = null;
                cData.rpg.baseStats.hp = calculateTotalStats(cData.rpg).maxHp;
                await safeSetDoc(doc(db, 'characters', d.id), { rpg: JSON.parse(JSON.stringify(cData.rpg)) }, { merge: true });
                
                // Notify revived player
                if (vk) {
                  await vk.api.messages.send({
                    peer_id: cData.ownerId,
                    random_id: Date.now(),
                    message: `✨ Игрок ${charName} нашел вас и использовал зелье воскрешения! Вы снова живы!`
                  }).catch(e => console.error("Failed to send revive notification", e));
                }
                break;
              }
            }
            reply = reply.replace(/\[REVIVE\]\s*(.*?)\s*\[\/REVIVE\]/i, '').trim();
          }

          const choicesMatch = reply.match(/\[CHOICES\]\s*([\s\S]*?)\s*\[\/CHOICES\]/i);
          if (choicesMatch) {
            try {
              const choices = JSON.parse(choicesMatch[1]);
              if (Array.isArray(choices) && choices.length > 0 && !keyboard) {
                const kb = Keyboard.builder();
                choices.forEach((choice, index) => {
                  // We use text buttons so the user's choice is sent as a normal text message to the AI
                  kb.textButton({ label: choice.substring(0, 40), payload: { command: 'game_choice' }, color: Keyboard.PRIMARY_COLOR });
                  if (index % 2 !== 0 && index !== choices.length - 1) kb.row();
                });
                keyboard = kb;
              }
            } catch (e) {
              console.error("Failed to parse choices", e);
            }
            reply = reply.replace(/\[CHOICES\]\s*([\s\S]*?)\s*\[\/CHOICES\]/i, '').trim();
          }

          let openShop = false;
          if (reply.includes('[OPEN_SHOP]')) {
            openShop = true;
            reply = reply.replace(/\[OPEN_SHOP\]/g, '').trim();
            keyboard = undefined; // Clear any choices keyboard to prevent double keyboards
          }

          let startSoloCombat = false;
          let soloCombatMonsterName = '';
          const soloCombatMatch = reply.match(/\[START_SOLO_COMBAT\](.*?)\[\/START_SOLO_COMBAT\]/i);
          if (soloCombatMatch) {
            startSoloCombat = true;
            soloCombatMonsterName = soloCombatMatch[1].trim();
            reply = reply.replace(/\[START_SOLO_COMBAT\](.*?)\[\/START_SOLO_COMBAT\]/i, '').trim();
            keyboard = undefined;
          } else if (reply.includes('[START_SOLO_COMBAT]')) {
            startSoloCombat = true;
            reply = reply.replace(/\[START_SOLO_COMBAT\]/g, '').trim();
            keyboard = undefined;
          }

          let startNpcCombat = false;
          let npcCombatId = '';
          const npcCombatMatch = reply.match(/\[START_NPC_COMBAT\](.*?)\[\/START_NPC_COMBAT\]/i);
          if (npcCombatMatch) {
            startNpcCombat = true;
            npcCombatId = npcCombatMatch[1].trim();
            reply = reply.replace(/\[START_NPC_COMBAT\](.*?)\[\/START_NPC_COMBAT\]/i, '').trim();
            keyboard = undefined;
          }

          let startCombatData = null;
          const combatMatch = reply.match(/\[START_COMBAT\]\s*(\{[\s\S]*?\})\s*\[\/START_COMBAT\]/i);
          if (combatMatch) {
            try {
              startCombatData = JSON.parse(combatMatch[1]);
            } catch (e) {
              console.error("Failed to parse combat data", e);
            }
            reply = reply.replace(/\[START_COMBAT\]\s*(\{[\s\S]*?\})\s*\[\/START_COMBAT\]/i, '').trim();
          }

          addLog(`[DM]: ${reply}`);
          if (keyboard) {
            if (reply.trim().length > 0) await context.send({ message: reply, keyboard });
          } else if (!openShop && !startSoloCombat && !prisonMatch && !deathMatch) {
            if (reply.trim().length > 0) await context.send({ message: reply });
          } else {
            if (reply.trim().length > 0) await context.send(reply);
          }

          if (startNpcCombat && activeCharDocId) {
            const docSnap = await getDoc(doc(db, 'characters', activeCharDocId));
            if (docSnap.exists()) {
              const charData = docSnap.data();
              if (!charData.rpg) charData.rpg = DEFAULT_RPG_DATA;
              if (!charData.rpg.combat) {
                // Fetch the NPC details to create the enemy
                let npcEnemy = generateEnemy(charData.rpg.level, "Разъяренный NPC");
                try {
                   const npcSnap = await getDoc(doc(db, 'npcs', npcCombatId));
                   if (npcSnap.exists()) {
                      const n = npcSnap.data();
                      npcEnemy = {
                         id: n.id,
                         name: n.name,
                         level: n.level || 1,
                         hp: n.hp || 100,
                         maxHp: n.maxHp || 100,
                         attack: n.attack || 10,
                         defense: n.defense || 5,
                         type: 'npc',
                         goldReward: (n.level || 1) * 15
                      };
                   }
                } catch(e) { console.error('Failed to load NPC for combat', e); }
                charData.rpg.combat = createCombatState(npcEnemy);
                await safeSetDoc(doc(db, 'characters', activeCharDocId), { rpg: JSON.parse(JSON.stringify(charData.rpg)) }, { merge: true });
              }
              await renderCombatUI(context, { id: activeCharDocId, ...charData } as any, 'NPC нападает на вас!');
            }
          }

          if (startSoloCombat && activeCharDocId) {
            const docSnap = await getDoc(doc(db, 'characters', activeCharDocId));
            if (docSnap.exists()) {
              const charData = docSnap.data();
              if (!charData.rpg) charData.rpg = DEFAULT_RPG_DATA;
              if (!charData.rpg.combat) {
                charData.rpg.combat = createCombatState(generateEnemy(charData.rpg.level, soloCombatMonsterName));
                await safeSetDoc(doc(db, 'characters', activeCharDocId), { rpg: JSON.parse(JSON.stringify(charData.rpg)) }, { merge: true });
              }
              await renderCombatUI(context, { id: activeCharDocId, ...charData } as any, 'Вы отправились на охоту и встретили врага!');
            }
          }

          if (startCombatData && startCombatData.enemies && Array.isArray(startCombatData.enemies)) {
            await initTeamCombat(startCombatData.enemies);
          }

          if (openShop) {
            const shopKeyboard = Keyboard.builder()
              .textButton({ label: '⚔️ Оружейная', payload: { command: 'shop_cat', cat: 'weapon' }, color: Keyboard.PRIMARY_COLOR })
              .textButton({ label: '🛡️ Бронник', payload: { command: 'shop_cat', cat: 'armor' }, color: Keyboard.PRIMARY_COLOR })
              .row()
              .textButton({ label: '💍 Рынок аксессуаров', payload: { command: 'shop_cat', cat: 'accessory' }, color: Keyboard.PRIMARY_COLOR })
              .textButton({ label: '🧪 Алхимик', payload: { command: 'shop_cat', cat: 'consumable' }, color: Keyboard.PRIMARY_COLOR })
              .row()
              .textButton({ label: '💰 Продать вещи', payload: { command: 'shop_sell_menu' }, color: Keyboard.NEGATIVE_COLOR })
              .textButton({ label: '🏰 В город', payload: { command: 'close_menu' }, color: Keyboard.SECONDARY_COLOR })
              ;
            await context.send({ message: `🏪 Системный магазин открыт. Выбери лавку:`, keyboard: shopKeyboard });
          }
        } catch (e) {
          console.error("Ошибка Gemini", e);
          await context.send('❌ Ошибка генерации (система перегружена или исчерпан лимит). Подождите несколько секунд и попробуйте снова.');
        }
      }
    }
    } catch (e) {
      console.error("Global message handler error", e);
    } finally {
      userLocks.delete(senderId);
    }
  });

  async function initTeamCombat(enemyIds: string[]) {
    if (players.size === 0) return;
    const combatId = Date.now().toString();
    const combatPlayers = Array.from(players);
    
    const enemies = enemyIds.map((id, index) => {
      const base = MONSTER_CATALOG[id] || MONSTER_CATALOG['slime'];
      return {
        ...base,
        uid: `enemy_${index}`,
        currentHp: base.hp
      };
    });

    const playerHp = new Map<number, number>();
    const playerNames = new Map<number, string>();
    const playerDefending = new Map<number, boolean>();
    const turnOrder: any[] = [];

    for (const pid of combatPlayers) {
      const snapshot = await getDocs(query(collection(db, 'characters'), where('ownerId', '==', pid)));
      const chars = snapshot.docs.map(d => ({ id: d.id, ...d.data() as any })).filter((c: any) => !c.deleted);
      if (chars.length > 0) {
        let activeChar = chars[chars.length - 1];
        const userDoc = await getDoc(doc(db, 'users', pid.toString()));
        if (userDoc.exists() && userDoc.data().activeCharId) {
          const foundChar = chars.find((c: any) => c.id === userDoc.data().activeCharId);
          if (foundChar) activeChar = foundChar;
        }
        
        const stats = calculateTotalStats(activeChar.rpg || DEFAULT_RPG_DATA);
        playerHp.set(pid, activeChar.rpg?.baseStats?.hp || stats.maxHp);
        playerNames.set(pid, activeChar.name);
        playerDefending.set(pid, false);
        turnOrder.push({ id: pid, type: 'player', name: activeChar.name, agility: stats.agility });
      }
    }

    enemies.forEach(e => {
      turnOrder.push({ id: e.uid, type: 'enemy', name: e.name, agility: e.agility });
    });

    turnOrder.sort((a, b) => b.agility - a.agility);

    activeTeamCombats.set(combatId, {
      players: combatPlayers,
      enemies,
      turnIndex: 0,
      turnOrder,
      playerHp,
      playerNames,
      playerDefending,
      combatLog: '⚔️ Бой начался!\n'
    });

    await processTeamCombatTurn(combatId);
  }

  async function processTeamCombatTurn(combatId: string) {
    const combat = activeTeamCombats.get(combatId);
    if (!combat) return;

    // Check win/loss conditions
    const alivePlayers = combat.players.filter(pid => (combat.playerHp.get(pid) || 0) > 0);
    const aliveEnemies = combat.enemies.filter(e => e.currentHp > 0);

    if (alivePlayers.length === 0) {
      // All players died
      for (const pid of combat.players) {
        // Update DB for death
        const snapshot = await getDocs(query(collection(db, 'characters'), where('ownerId', '==', pid)));
        const chars = snapshot.docs.map(d => ({ id: d.id, ...d.data() as any })).filter((c: any) => !c.deleted);
        if (chars.length > 0) {
          let activeChar = chars[chars.length - 1];
          const userDoc = await getDoc(doc(db, 'users', pid.toString()));
          if (userDoc.exists() && userDoc.data().activeCharId) {
            const foundChar = chars.find((c: any) => c.id === userDoc.data().activeCharId);
            if (foundChar) activeChar = foundChar;
          }
          if (!activeChar.rpg) activeChar.rpg = DEFAULT_RPG_DATA;
          activeChar.rpg.baseStats.hp = 0;
          activeChar.rpg.deathState = 'waiting_revive';
          activeChar.rpg.deathEndTime = Date.now() + 10 * 60000; // 10 mins
          await safeSetDoc(doc(db, 'characters', activeChar.id), { rpg: JSON.parse(JSON.stringify(activeChar.rpg)) }, { merge: true });
          chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок ${activeChar.name} погиб в групповом бою.` }] });
        }
        await vk!.api.messages.send({ peer_id: pid, random_id: Date.now(), message: combat.combatLog + '\n\n☠️ Ваша группа была повержена... Вы тяжело ранены и истекаете кровью.' });
      }
      activeTeamCombats.delete(combatId);
      return;
    }

    if (aliveEnemies.length === 0) {
      // All enemies died
      let totalXp = 0;
      let totalGold = 0;
      combat.enemies.forEach(e => { totalXp += e.xpReward; totalGold += e.goldReward; });
      
      const xpPerPlayer = Math.floor(totalXp / combat.players.length);
      const goldPerPlayer = Math.floor(totalGold / combat.players.length);

      for (const pid of combat.players) {
        // Update DB
        const snapshot = await getDocs(query(collection(db, 'characters'), where('ownerId', '==', pid)));
        const chars = snapshot.docs.map(d => ({ id: d.id, ...d.data() as any })).filter((c: any) => !c.deleted);
        if (chars.length > 0) {
          let activeChar = chars[chars.length - 1];
          const userDoc = await getDoc(doc(db, 'users', pid.toString()));
          if (userDoc.exists() && userDoc.data().activeCharId) {
            const foundChar = chars.find((c: any) => c.id === userDoc.data().activeCharId);
            if (foundChar) activeChar = foundChar;
          }
          
          if (!activeChar.rpg) activeChar.rpg = DEFAULT_RPG_DATA;
          
          const finalHp = combat.playerHp.get(pid) || 0;
          activeChar.rpg.baseStats.hp = finalHp;
          
          let winMsg = combat.combatLog + `\n\n🎉 Победа!\n`;
          
          if (finalHp <= 0) {
             activeChar.rpg.deathState = 'waiting_revive';
             activeChar.rpg.deathEndTime = Date.now() + 10 * 60000;
             winMsg += `Но вы пали в бою... Вы тяжело ранены и истекаете кровью.`;
             chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок ${activeChar.name} погиб в групповом бою.` }] });
          } else {
             activeChar.gold = (activeChar.gold || 0) + goldPerPlayer;
             const leveledUp = addXp(activeChar.rpg, xpPerPlayer);
             winMsg += `Получено: ${xpPerPlayer} XP, ${goldPerPlayer} 💰`;
             if (leveledUp) winMsg += `\n🌟 УРОВЕНЬ ПОВЫШЕН!`;
             chatHistory.push({ role: 'user', parts: [{ text: `[СИСТЕМА]: Игрок ${activeChar.name} победил в групповом бою.` }] });
          }
          
          await safeSetDoc(doc(db, 'characters', activeChar.id), { gold: activeChar.gold, rpg: JSON.parse(JSON.stringify(activeChar.rpg)) }, { merge: true });
          
          await vk!.api.messages.send({ peer_id: pid, random_id: Date.now(), message: winMsg });
        }
      }
      activeTeamCombats.delete(combatId);
      return;
    }

    // Get current turn entity
    let currentEntity = combat.turnOrder[combat.turnIndex % combat.turnOrder.length];
    
    // Skip dead entities
    if (currentEntity.type === 'player' && (combat.playerHp.get(currentEntity.id as number) || 0) <= 0) {
      combat.turnIndex++;
      return processTeamCombatTurn(combatId);
    }
    if (currentEntity.type === 'enemy') {
      const enemy = combat.enemies.find(e => e.uid === currentEntity.id);
      if (!enemy || enemy.currentHp <= 0) {
        combat.turnIndex++;
        return processTeamCombatTurn(combatId);
      }
    }

    // Status message
    let statusMsg = `\n--- Ход: ${currentEntity.name} ---\n`;
    statusMsg += `👥 Группа:\n`;
    combat.players.forEach(pid => {
      const hp = combat.playerHp.get(pid) || 0;
      statusMsg += `${combat.playerNames.get(pid)}: ${hp > 0 ? hp + ' ❤️' : '💀'}\n`;
    });
    statusMsg += `\n👾 Враги:\n`;
    combat.enemies.forEach(e => {
      statusMsg += `${e.name}: ${e.currentHp > 0 ? e.currentHp + ' ❤️' : '💀'}\n`;
    });

    if (currentEntity.type === 'enemy') {
      // Enemy AI
      const enemy = combat.enemies.find(e => e.uid === currentEntity.id)!;
      const targetPid = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
      const targetName = combat.playerNames.get(targetPid);
      const isDefending = combat.playerDefending.get(targetPid);
      
      // Calculate damage (simplified)
      let dmg = Math.max(1, enemy.attack + Math.floor(Math.random() * 4) - (isDefending ? 5 : 0)); // Simplified defense
      const currentHp = combat.playerHp.get(targetPid) || 0;
      combat.playerHp.set(targetPid, Math.max(0, currentHp - dmg));
      
      combat.combatLog = `👾 ${enemy.name} атакует ${targetName} и наносит ${dmg} урона!\n`;
      
      // Broadcast to all
      for (const pid of combat.players) {
        await vk!.api.messages.send({ peer_id: pid, random_id: Date.now(), message: combat.combatLog + statusMsg });
      }
      
      combat.turnIndex++;
      setTimeout(() => processTeamCombatTurn(combatId), 2000);
    } else {
      // Player turn
      const pid = currentEntity.id as number;
      combat.playerDefending.set(pid, false); // reset defense
      
      const keyboard = Keyboard.builder();
      
      // Attack buttons for each alive enemy
      aliveEnemies.forEach((e, i) => {
        keyboard.textButton({ label: `⚔️ Атака: ${e.name}`, payload: { command: 'team_combat_action', action: 'attack', targetUid: e.uid, combatId }, color: Keyboard.NEGATIVE_COLOR });
        if (i % 2 !== 0) keyboard.row();
      });
      keyboard.row();
      keyboard.textButton({ label: `🛡️ Защита`, payload: { command: 'team_combat_action', action: 'defend', combatId }, color: Keyboard.PRIMARY_COLOR });
      
      // Broadcast turn start to others
      for (const otherPid of combat.players) {
        if (otherPid !== pid) {
          await vk!.api.messages.send({ peer_id: otherPid, random_id: Date.now(), message: combat.combatLog + statusMsg + `\nОжидаем ход ${currentEntity.name}...` });
        }
      }
      
      // Send action menu to current player
      await vk!.api.messages.send({ peer_id: pid, random_id: Date.now(), message: combat.combatLog + statusMsg + `\nВаш ход! Выберите действие:`, keyboard: keyboard });
    }
  }

  const startPolling = async (retries = 5) => {
    try {
      await vk.updates.start();

      console.log('VK Bot polling started');
      addLog('Бот запущен и подключен к ВКонтакте');
    } catch (e) {
      console.error('Failed to start VK bot', e);
      addLog('Ошибка подключения к ВКонтакте');
      if (retries > 0) {
        console.log(`Retrying in 10 seconds... (${retries} retries left)`);
        setTimeout(() => startPolling(retries - 1), 10000);
      }
    }
  };
  await startPolling();
}

let publicUrl = '';

// API Routes for the frontend

// Add new endpoint for locations
app.get('/api/locations', (req, res) => {
  res.json(WORLD_LOCATIONS);
});

// Action Timer Polling
setInterval(async () => {
  if (!vk) return;
  try {
    const now = Date.now();
    const snapshot = await getDocs(collection(db, 'characters'));
    for (const d of snapshot.docs) {
      const char = { id: d.id, ...d.data() as any };
        if (char.actionEndTime && char.actionEndTime <= now && !char.actionNotified) {
          let msg = '';
          if (char.actionType === 'work') {
            const earned = Math.floor(Math.random() * 20) + 10;
            char.gold = (char.gold || 0) + earned;
            msg = `🛠️ Вы закончили работу! Заработано: ${earned} 💰.`;
          } else if (char.actionType === 'work_port') {
            const mins = parseInt(char.actionMessage || '5');
            let earned = 150;
            if (mins === 20) earned = 600;
            if (mins === 60) earned = 3000;
            if (mins === 720) earned = 20000;
            char.gold = (char.gold || 0) + earned;
            msg = `🛠️ Смена в порту завершена! Заработано: ${earned} 💰.`;
          } else if (char.actionType === 'ore_cave') {
            const r = Math.random();
            char.rpg.exploreState = null;
            if (r < 0.3) {
                // 30% to find good item
                const eqPool = Object.values(ITEM_CATALOG).filter(i => ['weapon', 'armor', 'helmet', 'shield'].includes(i.type) && i.rarity === 'rare');
                const pItem = eqPool[Math.floor(Math.random() * eqPool.length)];
                char.rpg.inventory = char.rpg.inventory || [];
                const finalItemId = buildItemId(pItem.id, 0, 0, [], char.rpg?.level || 1);
                char.rpg.inventory.push({ itemId: finalItemId, amount: 1 });
                msg = `⛏️ Обыскав пещеру, вы нашли редкую вещь: ${pItem.name}!`;
            } else {
                const earned = Math.floor(Math.random() * 901) + 100; // 100 to 1000
                char.gold = (char.gold || 0) + earned;
                msg = `⛏️ Обыскав пещеру, вы нашли мешочек золота: ${earned} 💰.`;
            }
          } else if (char.actionType === 'house_sleep') {
            const maxHp = calculateTotalStats(char.rpg).maxHp;
            const maxMp = calculateTotalStats(char.rpg).maxMp;
            if (!char.rpg.baseStats) char.rpg.baseStats = { hp: maxHp, mp: maxMp, maxHp, maxMp, attack: 5, magicAttack: 0, defense: 2, magicDefense: 0, agility: 5, critRate: 5, critDamage: 150 };
            char.rpg.baseStats.hp = maxHp;
            char.rpg.baseStats.mp = maxMp;
            msg = `💤 Вы отлично выспались в собственном доме. Здоровье и манна полностью восстановлены!`;
          } else if (char.actionType === 'tavern_sleep') {
            const maxHp = calculateTotalStats(char.rpg).maxHp;
            const maxMp = calculateTotalStats(char.rpg).maxMp;
            if (!char.rpg.baseStats) char.rpg.baseStats = { hp: maxHp, mp: maxMp, maxHp, maxMp, attack: 5, magicAttack: 0, defense: 2, magicDefense: 0, agility: 5, critRate: 5, critDamage: 150 };
            char.rpg.baseStats.hp = maxHp;
            char.rpg.baseStats.mp = maxMp;
            msg = `💤 Ты отлично отдохнул в таверне и полностью восстановил свои силы!`;
          } else if (char.actionType === 'travel') {
            msg = `🗺️ Вы прибыли на место назначения!`;
          } else if (char.actionType === 'ai_timer') {
            msg = char.actionMessage || `⏳ Действие завершено.`;
          } else {
            msg = `⏳ Действие завершено.`;
          }

          if (char.actionTargetLocation) {
             char.location = char.actionTargetLocation;
          }
          
          char.actionNotified = true;
          try {
            await safeSetDoc(doc(db, 'characters', char.id), { 
              gold: char.gold || 0, 
              location: char.location,
              actionNotified: true,
              actionEndTime: null,
              actionType: null,
              actionMessage: null,
              actionTargetLocation: null,
              rpg: JSON.parse(JSON.stringify(char.rpg))
            }, { merge: true });
          } catch (e: any) {
             console.error('ERROR WRITING TO', char.id, e.message);
          }
          
          let kb = undefined;
          if (char.location === 'city') {
             kb = getCityKeyboard();
          } else {
             kb = getWildKeyboard(char);
          }

          await vk.api.messages.send({
            peer_id: char.ownerId,
            random_id: Date.now(),
            message: msg,
            keyboard: kb
          }).catch(e => console.error("Failed to send action notification", e));
        }

        // Handle death timers
        if (char.rpg?.deathState === 'waiting_revive' && char.rpg.deathEndTime && char.rpg.deathEndTime <= now) {
           char.rpg.deathState = 'dead';
           char.rpg.deathEndTime = now + 60 * 60000; // 1 hour
           await safeSetDoc(doc(db, 'characters', char.id), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
           await vk.api.messages.send({
             peer_id: char.ownerId,
             random_id: Date.now(),
             message: `💀 Вы истекли кровью и умерли. Воскрешение через 1 час.`
           }).catch(e => {});
        } else if (char.rpg?.deathState === 'dead' && char.rpg.deathEndTime && char.rpg.deathEndTime <= now) {
           char.rpg.deathState = 'alive';
           char.rpg.deathEndTime = null;
           char.rpg.baseStats.hp = calculateTotalStats(char.rpg).maxHp;
           char.location = 'city_1';
           await safeSetDoc(doc(db, 'characters', char.id), { 
              rpg: JSON.parse(JSON.stringify(char.rpg)),
              location: 'city_1'
           }, { merge: true });
           await vk.api.messages.send({
             peer_id: char.ownerId,
             random_id: Date.now(),
             message: `✨ Вы воскресли в городе после отдыха. Можно продолжать путь!`,
             keyboard: getCityKeyboard()
           }).catch(e => {});
        }
    }
  } catch (e) {
    console.error("Action timer error", e);
  }
}, 10000);

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload-city-image', upload.single('image'), (req, res) => {
  console.log('Received upload request');
  if (!(req as any).file) {
    console.log('No file in request');
    return res.status(400).json({ error: 'No file uploaded' });
  }
  console.log('File received:', (req as any).file);
  const oldPath = (req as any).file.path;
  const newPath = path.join(process.cwd(), 'data', 'images', 'eldoria.jpg');
  console.log('Moving file from', oldPath, 'to', newPath);
  try {
    // Ensure directory exists
    if (!fs.existsSync(path.dirname(newPath))) {
        fs.mkdirSync(path.dirname(newPath), { recursive: true });
    }
    // Use copyFileSync instead of renameSync to avoid cross-device link errors
    fs.copyFileSync(oldPath, newPath);
    // Optionally remove the temporary file
    fs.unlinkSync(oldPath);
    console.log('File copied and temp file removed successfully');
    res.json({ success: true, path: '/images/eldoria.jpg' });
  } catch (err) {
    console.error('Error saving file:', err);
    res.status(500).json({ error: 'Failed to save file: ' + err });
  }
});

app.post('/api/settings', async (req, res) => {
  try {
    await safeSetDoc(doc(db, 'settings', 'global'), req.body);
    // Restart bot with new settings
    if (vk) {
      await vk.updates.stop();
    }
    await initBot();
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.get('/api/settings', async (req, res) => {
  try {
    const settings = await loadSettings();
    res.json(settings || {});
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.delete('/api/characters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteDoc(doc(db, 'characters', id));
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.put('/api/characters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    delete data.id;
    await safeSetDoc(doc(db, 'characters', id), data, { merge: true });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.post('/api/characters/:id/send-photo', async (req, res) => {
  try {
    const { id } = req.params;
    const docSnap = await getDoc(doc(db, 'characters', id));
    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Character not found' });
    }
    const char = docSnap.data();
    if (!char.imageUrl) {
      return res.status(400).json({ error: 'No image URL' });
    }
    
    if (!vk) {
      return res.status(500).json({ error: 'VK not initialized' });
    }

    let buffer: Buffer;
    if (char.imageUrl.startsWith('http')) {
      const imageRes = await fetch(char.imageUrl);
      const arrayBuffer = await imageRes.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      const filePath = path.join(process.cwd(), 'data', char.imageUrl.replace(/^\//, ''));
      buffer = fs.readFileSync(filePath);
    }

    const photo = await vk.upload.messagePhoto({
      source: {
        value: buffer
      }
    });

    await vk.api.messages.send({
      peer_id: char.ownerId,
      random_id: Math.floor(Math.random() * 1000000),
      message: `Вот портрет твоего персонажа ${char.name} 🎨:`,
      attachment: photo.toString()
    });

    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e) });
  }
});

app.get('/api/items', (req, res) => {
  res.json(ITEM_CATALOG);
});

app.get('/api/races', (req, res) => {
  res.json(RACES_LIST);
});

app.post('/api/god/clear-items', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'characters'));
    let count = 0;
    for (const item of snapshot.docs) {
      const data = item.data();
      if (data.rpg) {
        await updateDoc(doc(db, 'characters', item.id), {
          'rpg.inventory': [],
          'rpg.equipment': {},
          'gold': 0,
          'rpg.gold': 0
        });
        count++;
      }
    }
    res.json({ success: true, count });
  } catch(e) {
    console.error(e);
    res.status(500).json({ error: String(e) });
  }
});

import { readFileSync, writeFileSync } from 'fs';

app.post('/api/god/update-monster', async (req, res) => {
  try {
    const { id, updates } = req.body;
    let content = readFileSync('./monsters.ts', 'utf8');
    
    // Find the monster block in TS file. This is a bit hacky but works for the current format.
    const searchString = `"${id}": {`;
    const searchStringAlt = `'${id}': {`;
    
    if (content.includes(searchString) || content.includes(searchStringAlt)) {
      // Update the file
      for (const [key, val] of Object.entries(updates)) {
         if (typeof val === 'number') {
            const regex = new RegExp(`("${id}"(?:.|\\n)*?"${key}"\\s*:\\s*)[0-9]+`);
            content = content.replace(regex, `$1${val}`);
            
            // Also update in-memory to take effect immediately
            if (MONSTER_CATALOG[id]) {
                (MONSTER_CATALOG[id] as any)[key] = val;
            }
         }
      }
      writeFileSync('./monsters.ts', content, 'utf8');
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Monster not found in TS file" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e) });
  }
});

app.post('/api/god/give-item', async (req, res) => {
  try {
    const { charId, itemId } = req.body;
    const docSnap = await getDoc(doc(db, 'characters', charId));
    if (!docSnap.exists()) return res.status(404).json({ error: 'Char not found' });
    
    const char = docSnap.data();
    if (!char.rpg) return res.status(400).json({ error: 'No RPG data' });
    
    const existing = char.rpg.inventory.find((i: any) => i.itemId === itemId);
    if (existing) {
      existing.amount += 1;
    } else {
      if (char.rpg.inventory.length >= 30) {
        return res.status(400).json({ error: 'Инвентарь полон (максимум 30)' });
      }
      char.rpg.inventory.push({ itemId, amount: 1 });
    }
    
    await safeSetDoc(doc(db, 'characters', charId), { rpg: JSON.parse(JSON.stringify(char.rpg)) }, { merge: true });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.post('/api/god/plot', async (req, res) => {
  try {
    const { plot } = req.body;
    currentPlot = plot;
    await safeSetDoc(doc(db, 'sessions', 'active'), { plotSummary: plot }, { merge: true });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.post('/api/god/message', async (req, res) => {
  try {
    const { userId, message } = req.body;
    if (vk) {
      await vk.api.messages.send({
        peer_id: userId,
        random_id: Math.floor(Math.random() * 1000000),
        message: `⚡ ГЛАС БОЖИЙ ⚡\n${message}`
      });
      res.json({ success: true });
    } else {
      res.status(500).json({ error: 'VK not initialized' });
    }
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.put('/api/god/character/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    await safeSetDoc(doc(db, 'characters', id), updates, { merge: true });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.get('/api/characters', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'characters'));
    const chars = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((c: any) => !c.deleted);
    res.json(chars);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.get('/api/npcs', async (req, res) => {
  if (!db) return res.status(500).json({ error: 'DB not initialized' });
  const npcsList: any[] = [];
  try {
    const npcsSnap = await getDocs(collection(db, 'npcs'));
    npcsSnap.forEach(docSnap => {
      npcsList.push({ id: docSnap.id, ...docSnap.data() });
    });
    res.json({ npcs: npcsList });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.post('/api/npcs', async (req, res) => {
  if (!db) return res.status(500).json({ error: 'DB not initialized' });
  try {
    const npc = req.body;
    await safeSetDoc(doc(db, 'npcs', npc.id), npc, { merge: true });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.post('/api/clean-story', async (req, res) => {
  if (!db) return res.status(500).json({ error: 'DB not initialized' });
  try {
    res.json({ msg: 'Started background cleaning' });
    const charsSnap = await getDocs(collection(db, "characters"));
    let batch = writeBatch(db);
    let count = 0;
    
    for (const docSnap of charsSnap.docs) {
      const data = docSnap.data();
      if(data.rpg && data.rpg.inventory) {
        const inv = data.rpg.inventory;
        let changed = false;
        const newInv = inv.filter((item: any) => {
          if (typeof item === 'string') { changed = true; return false; }
          if (typeof item === 'object') {
             if(item.type === 'story' || item.itemId === 'story') {
                changed = true; return false;
             }
          }
          return true;
        });
        if(changed) {
           batch.update(docSnap.ref, { "rpg.inventory": newInv });
           count++;
           if (count >= 100) {
               await batch.commit();
               batch = writeBatch(db);
               count = 0;
           }
        }
      }
    }
    if (count > 0) await batch.commit();
    console.log('Cleaned story items.');
  } catch (e) {
    console.error('Failed to clean story items', e);
  }
});

// Vite middleware for development
import { createServer as createViteServer } from 'vite';
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await initBot();
    
    // Self-ping to keep the container alive 24/7
    setInterval(() => {
      const pingUrl = publicUrl ? `${publicUrl}/api/status` : `http://localhost:${PORT}/api/status`;
      fetch(pingUrl)
        .then(() => console.log(`Self-ping successful (${pingUrl})`))
        .catch(err => console.error(`Self-ping failed (${pingUrl}):`, err));
    }, 4 * 60 * 1000); // Every 4 minutes
  });
}

startServer();
