const fs = require('fs');

let generated = fs.readFileSync('galaxy_output.txt', 'utf8');

const catSplit = generated.split('const galaxyPlayMovies = {');
const catNew = catSplit[0].match(/\{ id: 2[1-5][2-9].*\n/g) || [];
const catNewFiltered = catNew.filter(x => parseInt(x.match(/id: (\d+)/)[1]) >= 212);
const catNew2 = catSplit[0].match(/\{ id: 2[1-5].*\n/g) || [];
const catNewFiltered2 = catNew2.filter(x => parseInt(x.match(/id: (\d+)/)[1]) >= 212);

const watchNew = catSplit[1].match(/2[1-5][2-9]: \{ tmdbId: .*\n/g) || [];
const watchNewFiltered = watchNew.filter(x => parseInt(x.match(/^ *(\d+):/)[1]) >= 212);
const watchNew2 = catSplit[1].match(/2[1-5].*: \{ tmdbId: .*\n/g) || [];
const watchNewFiltered2 = watchNew2.filter(x => parseInt(x.match(/^ *(\d+):/)[1]) >= 212);

const finalCatNew = catNewFiltered.length > 0 ? catNewFiltered : catNewFiltered2;
const finalWatchNew = watchNewFiltered.length > 0 ? watchNewFiltered : watchNewFiltered2;

let cat = fs.readFileSync('src/pages/CategoryPage.jsx', 'utf8');
let watch = fs.readFileSync('src/pages/WatchPage.jsx', 'utf8');

cat = cat.replace(
  `      { id: 211, title: "Lật Mặt 6: Tấm Vé Định Mệnh (2023)", image: "https://media.themoviedb.org/t/p/w500/3ym9JhjqUu5jKCWxtKVF86Sw4gD.jpg", rating: "8.3", isNew: false }\n    ];`,
  `      { id: 211, title: "Lật Mặt 6: Tấm Vé Định Mệnh (2023)", image: "https://media.themoviedb.org/t/p/w500/3ym9JhjqUu5jKCWxtKVF86Sw4gD.jpg", rating: "8.3", isNew: false },\n${finalCatNew.join('')}    ];`
);

watch = watch.replace(
  `    211: { tmdbId: 405886, title: "Lật Mặt 6: Tấm Vé Định Mệnh", year: "2023", duration: "2h 12m", desc: "Một nhóm bạn thân mua chung một tấm vé số trúng giải đặc biệt, nhưng mọi chuyện trở nên phức tạp khi người giữ vé qua đời." }\n  };`,
  `    211: { tmdbId: 405886, title: "Lật Mặt 6: Tấm Vé Định Mệnh", year: "2023", duration: "2h 12m", desc: "Một nhóm bạn thân mua chung một tấm vé số trúng giải đặc biệt, nhưng mọi chuyện trở nên phức tạp khi người giữ vé qua đời." },\n${finalWatchNew.join('')}  };`
);

fs.writeFileSync('src/pages/CategoryPage.jsx', cat);
fs.writeFileSync('src/pages/WatchPage.jsx', watch);
console.log('Appended perfectly!');
