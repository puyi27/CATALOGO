const https = require('https');
function getWikiImg(query) {
  return new Promise((resolve) => {
    https.get('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&generator=search&gsrsearch=' + encodeURIComponent(query) + '&pithumbsize=1000', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const urls = [];
          for (const key in pages) {
            if (pages[key].thumbnail && pages[key].thumbnail.source) {
              urls.push(pages[key].thumbnail.source);
            }
          }
          resolve(urls.slice(0, 5));
        } catch(e) { resolve([]); }
      });
    });
  });
}
async function run() {
  console.log('--- JEWELRY ---');
  console.log(await getWikiImg('diamond ring'));
  console.log('--- BREAD ---');
  console.log(await getWikiImg('sourdough bread'));
  console.log('--- NIGHTCLUB ---');
  console.log(await getWikiImg('nightclub'));
  console.log('--- FINE DINING ---');
  console.log(await getWikiImg('fine dining'));
  console.log('--- OLIVE OIL ---');
  console.log(await getWikiImg('olive oil'));
  console.log('--- WELDING ---');
  console.log(await getWikiImg('welding'));
  console.log('--- MAGAZINE ---');
  console.log(await getWikiImg('vogue cover'));
}
run();
