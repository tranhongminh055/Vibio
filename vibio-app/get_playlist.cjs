const https = require('https');
https.get('https://www.youtube.com/playlist?list=PLm0BExX6hvbQXGkupLAQmijIAWqlN06vc', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const matches = [...d.matchAll(/"videoId":"([^"]+)"/g)];
    const unique = [...new Set(matches.map(m => m[1]))];
    console.log('Total unique videos:', unique.length);
    unique.forEach((vid, i) => console.log(i + 1, vid));
  });
});
