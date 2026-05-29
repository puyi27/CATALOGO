const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const demos = [
  'metal', 'panaderia', 'interiorismo', 'almazara', 'clinica', 
  'restaurante', 'agencia', 'barberia', 'gaming', 'inmobiliaria', 
  'saas', 'tienda', 'tech', 'creativo', 'editorial', 
  'gastronomia', 'premium', 'sostenibilidad', 'urbano', 'zen', 
  'nightlife', 'transporte'
];

async function capture() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to something like a standard desktop aspect ratio, 
  // maybe slightly taller to fit the preview card aspect ratio (4/5)
  // 1200x1500 is a 4/5 aspect ratio.
  await page.setViewport({ width: 1200, height: 1500 });

  const previewDir = path.join(__dirname, 'public', 'previews');
  if (!fs.existsSync(previewDir)) {
    fs.mkdirSync(previewDir, { recursive: true });
  }

  for (const demo of demos) {
    console.log(`Capturing ${demo}...`);
    try {
      // Go to page
      await page.goto(`http://localhost:3000/demo/${demo}`, { waitUntil: 'networkidle0', timeout: 30000 });
      // Small delay to allow any entry animations to finish
      await new Promise(r => setTimeout(r, 2000));
      
      // Take screenshot
      await page.screenshot({ 
        path: path.join(previewDir, `${demo}.jpg`), 
        type: 'jpeg', 
        quality: 80 
      });
      console.log(`✅ Saved ${demo}.jpg`);
    } catch (e) {
      console.error(`❌ Failed ${demo}: ${e.message}`);
    }
  }

  await browser.close();
}

capture();
