const https = require('https');
function getIds(query) {
  return new Promise((resolve) => {
    https.get('https://unsplash.com/s/photos/' + encodeURIComponent(query), { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const regex = /href=\"\/photos\/[^\"]+-([a-zA-Z0-9_\-]{11})\"/g;
        let m;
        let ids = [];
        while ((m = regex.exec(data)) !== null) {
          if (!ids.includes(m[1])) ids.push(m[1]);
        }
        resolve(ids.slice(0, 5));
      });
    });
  });
}
async function run() {
  console.log('--- JEWELRY ---');
  console.log(await getIds('jewelry'));
  console.log('--- BREAD ---');
  console.log(await getIds('bakery'));
  console.log('--- NIGHTCLUB ---');
  console.log(await getIds('nightclub'));
  console.log('--- RESTAURANT ---');
  console.log(await getIds('fine-dining'));
  console.log('--- METAL ---');
  console.log(await getIds('welding'));
  console.log('--- OLIVE ---');
  console.log(await getIds('olive-oil'));
  console.log('--- MAGAZINE ---');
  console.log(await getIds('fashion-magazine'));
}
run();
