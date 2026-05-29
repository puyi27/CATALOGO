const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function capture() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 1500 });

  const previewDir = path.join(__dirname, 'public', 'previews');
  const demo = 'tienda';
  
  console.log(`Capturing ${demo}...`);
  try {
    await page.goto(`http://localhost:3000/demo/${demo}`, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ 
      path: path.join(previewDir, `${demo}.jpg`), 
      type: 'jpeg', 
      quality: 80 
    });
    console.log(`✅ Saved ${demo}.jpg`);
  } catch (e) {
    console.error(`❌ Failed ${demo}: ${e.message}`);
  }

  await browser.close();
}

capture();
