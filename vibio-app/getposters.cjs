const https = require('https');
const ids = [1576, 1577, 1578, 35791, 73115];
ids.forEach(id => {
  https.get('https://www.themoviedb.org/movie/' + id, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/<meta property="og:image" content="(.*?)"/);
      console.log('ID:', id, match ? match[1] : 'not found');
    });
  });
});
