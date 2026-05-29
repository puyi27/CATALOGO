const fs = require('fs');
const path = require('path');

const filesToFix = [
  { name: 'tienda', missing: 'Twitter' },
  { name: 'tienda', missing: 'Facebook' }
];

const basePath = path.join(__dirname, 'app', 'demo');

filesToFix.forEach(({ name, missing }) => {
  const filePath = path.join(basePath, name, 'page.jsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Find the lucide-react import
  const lucideImportRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/;
  const match = content.match(lucideImportRegex);

  if (match) {
    const currentImports = match[1];
    if (!currentImports.includes(missing)) {
      const newImports = currentImports + `, ${missing}`;
      content = content.replace(lucideImportRegex, `import {${newImports}} from 'lucide-react'`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed missing import ${missing} in ${name}`);
    }
  } else {
    // If there is no lucide-react import, add one at the top
    content = `import { ${missing} } from 'lucide-react';\n` + content;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Added import ${missing} in ${name}`);
  }
});
