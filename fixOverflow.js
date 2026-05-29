const fs = require('fs');
const path = require('path');

const demoPath = path.join(__dirname, 'app', 'demo');

function fixOverflowInDemos() {
  const dirs = fs.readdirSync(demoPath);
  
  dirs.forEach(dir => {
    const pagePath = path.join(demoPath, dir, 'page.jsx');
    if (fs.existsSync(pagePath)) {
      let content = fs.readFileSync(pagePath, 'utf8');
      
      // We look for className="... overflow-hidden ..." or className="... overflow-x-hidden ..."
      // We will only replace it globally in className strings for simplicity, or we can just remove them globally.
      // Wait, there might be other valid uses of overflow-hidden inside the pages (e.g., cards, carousels).
      // We only want to remove it from the first div inside DemoLayout, OR we can replace it in the first 200 lines.
      
      // Let's find the first <div className="..."> after <DemoLayout
      const layoutMatch = content.match(/<DemoLayout[^>]*>\s*<div\s+className="([^"]+)"/);
      if (layoutMatch) {
        const originalClassName = layoutMatch[1];
        let newClassName = originalClassName.replace(/\boverflow-x-hidden\b/g, '').replace(/\boverflow-hidden\b/g, '').replace(/\s+/g, ' ').trim();
        
        content = content.replace(originalClassName, newClassName);
        fs.writeFileSync(pagePath, content, 'utf8');
        console.log(`✅ Fixed overflow bug in ${dir}`);
      }
      
      // Some files have <CustomCursor /> or <MouseTrace /> before the div
      // Let's use a regex that handles elements between DemoLayout and the main div
      const betterMatch = content.match(/<DemoLayout[^>]*>[\s\S]*?(<div\s+className="([^"]+)")/);
      if (betterMatch) {
        const fullDivTag = betterMatch[1];
        const originalClassName = betterMatch[2];
        // We only want to fix if it's the main wrapper (usually contains bg-, text-, font-, etc.)
        if (originalClassName.includes('bg-') || originalClassName.includes('text-')) {
            let newClassName = originalClassName.replace(/\boverflow-x-hidden\b/g, '').replace(/\boverflow-hidden\b/g, '').replace(/\s+/g, ' ').trim();
            if (newClassName !== originalClassName) {
                let newContent = content.replace(fullDivTag, `<div className="${newClassName}"`);
                fs.writeFileSync(pagePath, newContent, 'utf8');
                console.log(`✅ Deep fixed overflow bug in ${dir}`);
            }
        }
      }
    }
  });
}

fixOverflowInDemos();
