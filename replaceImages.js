const fs = require('fs');
const path = require('path');

const demos = [
  'agencia', 'almazara', 'barberia', 'clinica', 'creativo', 'editorial', 'gaming', 
  'gastronomia', 'inmobiliaria', 'interiorismo', 'metal', 'nightlife', 'panaderia', 
  'premium', 'restaurante', 'saas', 'sostenibilidad', 'tech', 'tienda', 'transporte', 
  'urbano', 'zen'
];

const basePath = path.join(__dirname, 'app', 'demo');

function processFile(demo) {
  const filePath = path.join(basePath, demo, 'page.jsx');
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace gradient properties in arrays (e.g. products, menuItems)
  // Usually looks like: gradient: "from-zinc-800 to-black" or gradient: "bg-gradient-to-br..."
  // We'll replace it with img: "/images/demo/barberia/1.jpg"
  let imgIndex = 1;
  content = content.replace(/gradient:\s*(['"`]).*?\1/g, (match) => {
    const replacement = `img: "/images/demo/${demo}/${imgIndex}.jpg"`;
    imgIndex = imgIndex > 5 ? 1 : imgIndex + 1;
    return replacement;
  });

  // Replace <div className="... bg-gradient-to-br ..."> with <img src="..." className="..." />
  // We need to match <div className="[anything] bg-gradient-to-br [from/to/via stuff] [anything]" />
  
  // 1. Find hero background
  const heroRegex = /<div\s+className=(['"`])([^'"`]*bg-gradient-to-br[^'"`]*)\1\s*\/>/g;
  let heroUsed = false;
  
  content = content.replace(heroRegex, (match, quote, classes) => {
    // If it's a small div inside a map, it might be a product image
    if (classes.includes('${')) {
      // It's dynamic, meaning it uses the array data
      return `<img src={${classes.match(/\$\{(.+?\.gradient|.+?\.img)\}/) ? classes.match(/\$\{(.+?\.gradient|.+?\.img)\}/)[1].replace('.gradient', '.img') : '""'}} alt="Image" className=${quote}${classes.replace(/bg-gradient-to-br.*?\}/, '').replace('w-full h-full', 'w-full h-full object-cover')}${quote} />`;
    }
    
    // Otherwise it's likely a static hero or banner image
    const src = heroUsed ? `/images/demo/${demo}/6.jpg` : `/images/demo/${demo}/hero.jpg`;
    heroUsed = true;
    
    // clean up the gradient classes
    const cleanedClasses = classes.replace(/bg-gradient-to-br\s+from-[^\s]+\s+(via-[^\s]+\s+)?to-[^\s]+/g, 'object-cover');
    
    return `<img src="${src}" alt="Background" className=${quote}${cleanedClasses}${quote} />`;
  });
  
  // Replace dynamic template literals: className={`w-full h-full bg-gradient-to-br ${item.gradient}`}
  // with <img src={item.img} className="w-full h-full object-cover" />
  const dynamicRegex = /<div\s+className=\{(['"`])([^'"`]*bg-gradient-to-br[^'"`]*)\1\}\s*\/>/g;
  content = content.replace(dynamicRegex, (match, quote, classes) => {
    // extract the variable, e.g. ${product.gradient}
    let variable = '""';
    const varMatch = classes.match(/\$\{([^}]+)\}/);
    if (varMatch) {
      variable = varMatch[1].replace('.gradient', '.img');
    }
    const cleaned = classes.replace(/bg-gradient-to-br/g, 'object-cover').replace(/\$\{([^}]+)\}/g, '');
    return `<img src={${variable}} alt="Item" className={${quote}${cleaned}${quote}} />`;
  });
  
  // also handle <div className={...} style={{ background: linear-gradient(...) }} />
  const styleRegex = /<div[^>]*className=(['"`])([^'"`]*)\1[^>]*style=\{\{\s*background:\s*`linear-gradient[^`]*`\s*\}\}[^>]*\/>/g;
  content = content.replace(styleRegex, (match, quote, classes) => {
    // replace with image
    let replacementImg = `img: "/images/demo/${demo}/${imgIndex}.jpg"`;
    // this is tricky if it's inside a loop, we can just use a generic local image or let it use the array if available
    return `<img src="/images/demo/${demo}/2.jpg" alt="Item" className=${quote}${classes} object-cover${quote} />`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${demo}`);
}

demos.forEach(processFile);
