async function test() {
    const detailUrl = `https://phim.nguonc.com/api/film/nha-ba-nu`;
    const detailRes = await fetch(detailUrl);
    const detailData = await detailRes.json();
    console.log(detailData.movie.episodes[0].items[0].embed);
}
test();
