const https = require('https');
const urls = ['https://www.themoviedb.org/movie/72190', 'https://www.themoviedb.org/movie/60584', 'https://www.themoviedb.org/movie/329', 'https://www.themoviedb.org/movie/330', 'https://www.themoviedb.org/tv/105248'];
urls.forEach(url => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/<meta property="og:image" content="(.*?)"/);
      console.log(url, match ? match[1] : 'not found');
    });
  });
});
