import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app);

const LOCATIONS = [
  "loc_starter", "loc_forest", "loc_cave", "loc_mountain", "loc_ruins", "loc_swamp", "loc_desert"
];

const PROMPTS = [
  "Ворчливый старик, который не любит чужаков, но много знает.",
  "Добрая торговка, всегда предложит поесть.",
  "Уставший стражник, мечтает о конце смены.",
  "Хитрый мошенник, пытается продать фальшивые артефакты.",
  "Загадочный маг, говорит загадками.",
  "Веселый бард, всегда поет песни о героях.",
  "Суровый кузнец, уважает только силу.",
  "Наглый воришка-подросток.",
  "Сумасшедший ученый, ищет редкие ингредиенты.",
  "Благородный рыцарь, ищет тех, кому нужна помощь."
];

async function seedInSequence() {
  for (let i = 1; i <= 50; i++) {
    const loc = LOCATIONS[i % LOCATIONS.length];
    const prompt = PROMPTS[i % PROMPTS.length];
    const isHostile = Math.random() < 0.2;
    await setDoc(doc(db, "npcs", `npc_${i}`), {
       id: `npc_${i}`,
       name: `НПС ${i}`,
       prompt: prompt,
       level: Math.max(1, Math.floor(i / 2)),
       hp: 100 + i * 20,
       maxHp: 100 + i * 20,
       attack: 10 + i * 2,
       defense: 5 + i,
       locationId: loc,
       greeting: "Приветствую, путник.",
       hostile: isHostile
    });
    console.log(`Seeded npc_${i}`);
  }
}

seedInSequence().then(() => console.log("Done seeding NPCs")).catch(console.error);
