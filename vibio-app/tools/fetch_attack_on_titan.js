/*
Node script to fetch Attack on Titan seasons and episodes from TMDB
Requires environment variable TMDB_API_KEY
Usage:
  TMDB_API_KEY=your_key node tools/fetch_attack_on_titan.js

This will write JSON to src/data/attackData.json and JS export to src/data/attackData.js
*/
const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.TMDB_API_KEY;
if (!API_KEY) {
  console.error('Missing TMDB_API_KEY environment variable');
  process.exit(1);
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

(async () => {
  try {
    // 1) Find the TV show by name to get the TMDB id
    const query = encodeURIComponent('Attack on Titan');
    const searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}`;
    const search = await getJson(searchUrl);
    if (!search.results || search.results.length === 0) {
      throw new Error('No TV results found for Attack on Titan');
    }
    const show = search.results[0];
    const tvId = show.id;
    console.log('Found TV id:', tvId, show.name);

    // 2) Get TV details (to list seasons)
    const details = await getJson(`https://api.themoviedb.org/3/tv/${tvId}?api_key=${API_KEY}`);

    const out = {
      tvId,
      name: details.name,
      poster_path: details.poster_path || null,
      seasons: []
    };

    // 3) For each season, fetch season details (episodes)
    for (const s of details.seasons) {
      if (!s.season_number || s.season_number === 0) continue; // skip specials
      console.log('Fetching season', s.season_number);
      const season = await getJson(`https://api.themoviedb.org/3/tv/${tvId}/season/${s.season_number}?api_key=${API_KEY}`);
      const seasonData = {
        season_number: season.season_number,
        name: season.name || `Season ${s.season_number}`,
        poster_path: season.poster_path || s.poster_path || null,
        episodes: []
      };

      for (const ep of season.episodes || []) {
        seasonData.episodes.push({
          episode_number: ep.episode_number,
          name: ep.name,
          overview: ep.overview,
          still_path: ep.still_path || null
        });
      }

      out.seasons.push(seasonData);
    }

    const outJson = JSON.stringify(out, null, 2);
    const outPathJson = path.resolve(__dirname, '../src/data/attackData.json');
    const outPathJs = path.resolve(__dirname, '../src/data/attackData.js');

    fs.writeFileSync(outPathJson, outJson);
    fs.writeFileSync(outPathJs, `const attackData = ${outJson};\nexport default attackData;\n`);

    console.log('Wrote', outPathJson, outPathJs);
  } catch (err) {
    console.error('Error fetching data:', err);
    process.exit(1);
  }
})();
