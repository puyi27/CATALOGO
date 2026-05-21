const https = require('https');
function search(query) {
  return new Promise((resolve) => {
    https.get('https://unsplash.com/s/photos/' + encodeURIComponent(query), { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const regex = /photo-([a-zA-Z0-9]+-[a-zA-Z0-9]+)/g;
        let m;
        let ids = [];
        while ((m = regex.exec(data)) !== null) {
          if (!ids.includes(m[1]) && m[1].length > 10) ids.push(m[1]);
        }
        resolve(ids.slice(0, 5));
      });
    });
  });
}
async function run() {
  console.log('--- JEWELRY ---');
  console.log(await search('luxury-jewelry'));
  console.log('--- MANSION ---');
  console.log(await search('mansion'));
  console.log('--- CLINIC ---');
  console.log(await search('clinic'));
  console.log('--- BARBER ---');
  console.log(await search('barber'));
  console.log('--- INTERIOR ---');
  console.log(await search('minimalist-interior'));
}
run();
