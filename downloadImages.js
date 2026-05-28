const fs = require('fs');
const path = require('path');
const https = require('https');

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

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  for (const [demo, keyword] of Object.entries(demos)) {
    console.log(`Downloading images for ${demo}...`);
    const dir = path.join(__dirname, 'public', 'images', 'demo', demo);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    try {
      // 1 hero image (1920x1080)
      await downloadImage(`https://loremflickr.com/1920/1080/${keyword}?random=1`, path.join(dir, 'hero.jpg'));
      
      // 6 detail images (800x1000)
      for (let i = 1; i <= 6; i++) {
        await downloadImage(`https://loremflickr.com/800/1000/${keyword}?random=${i + 1}`, path.join(dir, `${i}.jpg`));
      }
      console.log(`✅ Success for ${demo}`);
    } catch (e) {
      console.error(`❌ Failed for ${demo}:`, e.message);
    }
    
    // Add a small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 500));
  }
}

run();
