const ids = [30147, 30146, 39213, 30145, 381335, 922556, 1058694];
async function fetchImages() {
  for (const id of ids) {
    try {
      const response = await fetch('https://www.themoviedb.org/movie/' + id);
      const data = await response.text();
      const match = data.match(/<meta property="og:image" content="(.*?)"/);
      if (match) {
        console.log(`${id}: ${match[1]}`);
      } else {
        console.log(`${id}: NO IMAGE FOUND`);
      }
    } catch(e) {
      console.error(e);
    }
  }
}
fetchImages();
