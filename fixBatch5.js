const fs = require('fs');
const path = require('path');

const batch5 = ['premium', 'urbano', 'editorial'];
const basePath = path.join(__dirname, 'app', 'demo');

batch5.forEach(demo => {
  const filePath = path.join(basePath, demo, 'page.jsx');
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace images
  let imgIndex = 1;
  content = content.replace(/https:\/\/loremflickr\.com\/[^'"`]*/g, () => {
    let replacement = `/images/demo/${demo}/${imgIndex}.jpg`;
    if (imgIndex === 1) replacement = `/images/demo/${demo}/hero.jpg`;
    imgIndex++;
    if (imgIndex > 6) imgIndex = 2; // loop through 2-6 for remaining
    return replacement;
  });

  // Inject anime.js
  if (!content.includes('animejs')) {
    // find first useEffect to inject animejs import
    const useEffectMatch = content.match(/useEffect\(\(\) => \{/);
    if (useEffectMatch) {
      const injection = `useEffect(() => {
    import("animejs").then((module) => {
      const anime = module.default;
      anime({
        targets: '.anime-item',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(150, { start: 300 }),
        easing: 'easeOutExpo',
        duration: 1000
      });
    });
  }, []);

  useEffect(() => {`;
      content = content.replace(/useEffect\(\(\) => \{/, injection);
    }
  }

  // Add anime-item class to some elements based on the demo
  if (demo === 'premium' && !content.includes('anime-item')) {
    content = content.replace(/<div key=\{item\.ref\} className="flex/g, '<div key={item.ref} className="anime-item opacity-0 flex');
    content = content.replace(/<div key=\{idx\} className="flex/g, '<div key={idx} className="anime-item opacity-0 flex');
  } else if (demo === 'urbano' && !content.includes('anime-item')) {
    content = content.replace(/<div key=\{i\} className="group/g, '<div key={i} className="anime-item opacity-0 group');
  } else if (demo === 'editorial' && !content.includes('anime-item')) {
    content = content.replace(/<motion\.div key=\{idx\} className="flex/g, '<motion.div key={idx} className="anime-item opacity-0 flex');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Fixed ${demo}`);
});
