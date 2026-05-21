const https = require('https');
function getIds(query) {
  return new Promise((resolve) => {
    https.get('https://unsplash.com/s/photos/' + encodeURIComponent(query), { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const regex = /\"id\":\"([a-zA-Z0-9\-]{10,15})\",\"slug\"/g;
        let m;
        let ids = [];
        while ((m = regex.exec(data)) !== null) {
          if (!ids.includes(m[1])) ids.push(m[1]);
        }
        resolve(ids.slice(0, 6));
      });
    });
  });
}
async function run() {
  console.log('--- JEWELRY ---');
  console.log(await getIds('luxury-jewelry'));
  console.log('--- MANSION ---');
  console.log(await getIds('mansion'));
  console.log('--- INTERIOR ---');
  console.log(await getIds('minimalist-interior'));
  console.log('--- BREAD ---');
  console.log(await getIds('sourdough-bread'));
  console.log('--- CLUB ---');
  console.log(await getIds('nightclub'));
  console.log('--- WINE ---');
  console.log(await getIds('wine-cellar'));
  console.log('--- OLIVE ---');
  console.log(await getIds('olive-oil'));
  console.log('--- METAL ---');
  console.log(await getIds('welding'));
}
run();
