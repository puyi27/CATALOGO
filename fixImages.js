const fs = require('fs');
const path = require('path');

const themes = {
  agencia: 'branding,design',
  almazara: 'olive,farm',
  barberia: 'barber,vintage',
  clinica: 'surgery,doctor',
  creativo: 'art,creative',
  editorial: 'fashion,editorial',
  gaming: 'esports,gaming',
  gastronomia: 'finedining,plating',
  inmobiliaria: 'mansion,villa',
  interiorismo: 'minimalist,interior',
  metal: 'welding,steel',
  nightlife: 'nightclub,dj',
  panaderia: 'bread,bakery',
  premium: 'luxury,watch',
  restaurante: 'restaurant,food',
  saas: 'code,server',
  sostenibilidad: 'nature,green',
  tech: 'technology,circuit',
  tienda: 'jewelry,luxury',
  urbano: 'streetwear,urban',
  zen: 'zen,meditation'
};

const demoDir = path.join(process.cwd(), 'app', 'demo');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      processDir(full);
    } else if (full.endsWith('.jsx')) {
      const folderName = path.basename(path.dirname(full));
      const theme = themes[folderName] || 'abstract';
      
      let content = fs.readFileSync(full, 'utf8');
      let counter = 1;
      
      const newContent = content.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-_]+(\?[a-zA-Z0-9\-_=&]+)?/g, () => {
        const url = `https://loremflickr.com/1000/1000/${theme}/all?lock=${counter}`;
        counter++;
        return url;
      });
      
      if (content !== newContent) {
        fs.writeFileSync(full, newContent);
        console.log('Updated', full);
      }
    }
  }
}

processDir(demoDir);
console.log('All files updated!');
