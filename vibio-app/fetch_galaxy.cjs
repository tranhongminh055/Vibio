const https = require('https');

let allMovies = [];
let pagesFetched = 0;
const totalPages = 3;

for(let i=1; i<=totalPages; i++) {
  https.get('https://api.themoviedb.org/3/discover/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&with_original_language=vi&sort_by=popularity.desc&page=' + i, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.results) {
          allMovies = allMovies.concat(parsed.results);
        }
      } catch(e) {}
      
      pagesFetched++;
      if(pagesFetched === totalPages) {
        processMovies();
      }
    });
  });
}

function processMovies() {
  const valid = allMovies.filter(m => m.poster_path && m.overview && m.title);
  
  let categoryStr = '    movies = [\n';
  let watchStr = '  const galaxyPlayMovies = {\n';
  
  valid.slice(0, 60).forEach((m, idx) => {
    const id = 200 + idx;
    const rating = m.vote_average ? m.vote_average.toFixed(1) : (Math.random() * 3 + 6).toFixed(1);
    const isNew = m.release_date && m.release_date.startsWith('2024');
    
    categoryStr += `      { id: ${id}, title: \`${m.title} (\${m.release_date ? m.release_date.substring(0,4) : '2023'})\`, image: "https://media.themoviedb.org/t/p/w500${m.poster_path}", rating: "${rating}", isNew: ${isNew} },\n`;
    
    const safeDesc = m.overview.replace(/\`/g, "'").replace(/\n/g, ' ');
    watchStr += `    ${id}: { tmdbId: ${m.id}, title: \`${m.title}\`, year: "${m.release_date ? m.release_date.substring(0,4) : '2023'}", duration: "1h 45m", desc: \`${safeDesc}\` },\n`;
  });
  
  categoryStr += '    ];';
  watchStr += '  };';
  
  const fs = require('fs');
  fs.writeFileSync('galaxy_output.txt', categoryStr + '\n\n' + watchStr);
  console.log('Done');
}
