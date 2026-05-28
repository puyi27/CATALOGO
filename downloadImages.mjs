import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const demos = {
  agencia: 'agency,branding',
  almazara: 'olive,oil,farm',
  barberia: 'barber,haircut',
  clinica: 'clinic,medical',
  creativo: 'creative,art',
  editorial: 'magazine,fashion',
  gaming: 'gaming,esports',
  gastronomia: 'finedining,food',
  inmobiliaria: 'mansion,luxury',
  interiorismo: 'interiordesign,room',
  metal: 'metal,industrial',
  nightlife: 'club,neon',
  panaderia: 'bakery,bread',
  premium: 'luxury,jewelry',
  restaurante: 'restaurant,food',
  saas: 'abstract,tech',
  sostenibilidad: 'nature,green',
  tech: 'tech,startup',
  tienda: 'ecommerce,clothes',
  transporte: 'logistics,truck',
  urbano: 'urban,street',
  zen: 'zen,meditation'
};

async function downloadImage(url, filepath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`unexpected response ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(arrayBuffer));
}

async function run() {
  for (const [demo, keyword] of Object.entries(demos)) {
    console.log(`Downloading images for ${demo}...`);
    const dir = path.join(__dirname, 'public', 'images', 'demo', demo);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    try {
      await downloadImage(`https://loremflickr.com/1920/1080/${keyword}?random=1`, path.join(dir, 'hero.jpg'));
      for (let i = 1; i <= 6; i++) {
        await downloadImage(`https://loremflickr.com/800/1000/${keyword}?random=${i + 1}`, path.join(dir, `${i}.jpg`));
      }
      console.log(`✅ Success for ${demo}`);
    } catch (e) {
      console.error(`❌ Failed for ${demo}:`, e.message);
    }
  }
}

run();
