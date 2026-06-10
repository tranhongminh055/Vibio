import React, { useEffect, useState, useRef } from 'react'; // import cac thu vien can thiet
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'; // import hook cua react-native router-dom
import { ArrowLeft, ThumbsUp, Plus, Share2 } from 'lucide-react'; // import cac icon cua lucide-react 
import attackOnTitanData from '../data/attackOnTitanData'; // import du lieu attack on titan tu file attackontitan.js
import './WatchPage.css'; // import file css cua trang xem phim

const getAotPoster = (seasonNum, episodeNum) => {
  {/* lay poster cho acctack on titan dua tren so mua va tap, neu co thi lay khong thi thoi */ }
  const season = attackOnTitanData.seasons.find(s => s.season_number === seasonNum); {/* tim va lay phan theo mua cua phim */ }
  const episode = season?.episodes.find(ep => ep.episode_number === episodeNum); {/* neu tim duoc mua thi lay phim khong thi tra tap null */ }
  return episode?.still_path || season?.poster || attackOnTitanData.poster; {/* neu tim duoc tap thi lay poster cua tap, neu khong thi lay poster cua mua */ }
};

// Trang xem phim
const WatchPage = () => {
  {/* component chinh cua trang xem phim, duoc bao ve boi /route /watch/: id trong app.jsx, nhan id tu url de xac dinh phim nao se duoc chieu */ }
  const { id } = useParams(); {/* lay id tu url, id nay se duoc su dung de xac dinh phim nao se duoc chieu */ }
  const navigate = useNavigate(); {/* hook de dieu huong nguoi dung den trang khac, duoc su dung de tro ve trang truoc khi bam nut back */ }
  const location = useLocation(); {/* hook de lay thong tin ve url hien tai, duoc su dung de lay thong tin ve phim nao se duoc chieu dua tren id tu url */ }

  // Dữ liệu phim từ local tích hợp embed để phát video
  const movieDetails = {
    1: { tmdbId: 1576, title: "Resident Evil (2002)", year: "2002", duration: "1h 40m", desc: "A special military unit fights a powerful, out-of-control supercomputer and hundreds of scientists who have mutated into flesh-eating creatures after a laboratory accident." }, // them id: 1, title: "Resident Evil (2002)", year: "2002", duration: "1h 40m", desc: "A special military unit fights a powerful, out-of-control supercomputer and hundreds of scientists who have mutated into flesh-eating creatures after a laboratory accident." de them vao du lieu phim cua trang xem phim Resident Evil
    2: { tmdbId: 1577, title: "Resident Evil: Apocalypse (2004)", year: "2004", duration: "1h 34m", desc: "Alice awakens in Raccoon City, only to find it has become infested with zombies and monsters. With the help of Jill Valentine and Carlos Olivera, Alice must find a way out of the city before it is destroyed by a nuclear missile." }, // them id: 2, title: "Resident Evil: Apocalypse (2004)", year: "2004", duration: "1h 34m", desc: "Alice awakens in Raccoon City, only to find it has become infested with zombies and monsters. With the help of Jill Valentine and Carlos Olivera, Alice must find a way out of the city before it is destroyed by a nuclear missile." de them vao du lieu phim cua trang xem phim Resident Evil
    3: { tmdbId: 7737, title: "Resident Evil: Extinction (2007)", year: "2007", duration: "1h 34m", desc: "Survivors of the Raccoon City catastrophe travel across the Nevada desert, hoping to make it to Alaska. Alice joins the caravan and their fight against the evil Umbrella Corp." },
    4: { tmdbId: 35791, title: "Resident Evil: Afterlife (2010)", year: "2010", duration: "1h 37m", desc: "While still out to destroy the evil Umbrella Corporation, Alice joins a group of survivors living in a prison surrounded by the infected who also want to relocate to the mysterious but supposedly unharmed safe haven known only as Arcadia." },
    5: { tmdbId: 71679, title: "Resident Evil: Retribution (2012)", year: "2012", duration: "1h 35m", desc: "Alice fights alongside a resistance movement to regain her freedom from an Umbrella Corporation testing facility." },
    6: { tmdbId: 173897, title: "Resident Evil: The Final Chapter (2016)", year: "2016", duration: "1h 47m", desc: "Picking up immediately after the events in Resident Evil: Retribution, Alice is the only survivor of what was meant to be humanity's final stand against the undead. Now, she must return to where the nightmare began." },
    7: { tmdbId: 460458, title: "Resident Evil: Welcome to Raccoon City (2021)", year: "2021", duration: "1h 47m", desc: "Once the booming home of pharmaceutical giant Umbrella Corporation, Raccoon City is now a dying Midwestern town. The company's exodus left the city a wasteland...with great evil brewing below the surface. When that evil is unleashed, the townspeople are forever...changed...and a small group of survivors must work together to uncover the truth behind Umbrella and make it through the night." },
  };

  // Tự động tạo 100 phần Siêu Đạo Chích Kid
  for (let i = 1; i <= 100; i++) { // tao 100 tap phim sieu dao chich kid
    const id = i + 7; // id phim sieu dao chich kid se bat dau tu tap 8 (7 + 1 = 8)
    movieDetails[id] = { // thong tin phim sieu dao chich kid
      tmdbId: 28808, // Detective Conan: The Last Wizard of the Century làm chuẩn
      title: `Siêu Đạo Chích Kid - Phần ${i}`, // tiem phim
      year: "2024", // nam san xuat
      duration: "45m", // thoi luong
      desc: `Đây là tập ${i} trong chuỗi phim về Siêu Đạo Chích Kaito Kid (1412) với những màn ảo thuật trộm cắp đỉnh cao và những cuộc đấu trí nghẹt thở.`
    };
  }

  // Phim Galaxy Play (id: 200 - 211)
  const galaxyPlayMovies = { // day la danh sach cac phim galaxy play
    200: { tmdbId: 1571676, title: "Mai", year: "2024", duration: "2h 11m", desc: "Câu chuyện về Mai, một người phụ nữ với quá khứ nhiều tổn thương, gặp gỡ và yêu Dương - chàng trai trẻ đào hoa." },
    201: { tmdbId: 1056126, title: "Nhà Bà Nữ", year: "2023", duration: "1h 42m", desc: "Phim kể về những góc khuất trong gia đình bà Nữ - người phụ nữ bán bánh canh cua nghiêm khắc và áp đặt." },
    202: { tmdbId: 787459, title: "Bố Già", year: "2021", duration: "2h 8m", desc: "Câu chuyện gia đình cảm động về ông Ba Sang, một người cha nghèo gà trống nuôi con nhưng giàu tình thương." },
    203: { tmdbId: 1124863, title: "Đất Rừng Phương Nam", year: "2023", duration: "2h 20m", desc: "Hành trình tìm cha của bé An trên vùng đất Nam Bộ hào hùng trong thời kỳ loạn lạc." },
    204: { tmdbId: 959326, title: "Em Và Trịnh", year: "2022", duration: "2h 16m", desc: "Câu chuyện về cuộc đời của cố nhạc sĩ Trịnh Công Sơn và những nàng thơ đã đi qua đời ông." },
    205: { tmdbId: 699361, title: "Tiệc Trăng Máu", year: "2020", duration: "1h 58m", desc: "Một nhóm bạn thân chơi trò chơi công khai mọi tin nhắn, cuộc gọi trong điện thoại, từ đó những bí mật dần được hé lộ." },
    206: { tmdbId: 618010, title: "Mắt Biếc", year: "2019", duration: "1h 57m", desc: "Chuyện tình đơn phương đẫm nước mắt của Ngạn dành cho Hà Lan - cô gái có đôi mắt biếc." },
    207: { tmdbId: 567973, title: "Hai Phượng", year: "2019", duration: "1h 38m", desc: "Hành trình nghẹt thở của Hai Phượng - một người mẹ từng làm giang hồ, đi tìm lại đứa con gái bị bắt cóc." },
    208: { tmdbId: 597515, title: "Cua Lại Vợ Bầu", year: "2019", duration: "1h 40m", desc: "Chuyện tình của Trọng Thoại và Nhã Linh đứng trước bờ vực tan vỡ khi Nhã Linh mang thai nhưng không rõ của ai." },
    209: { tmdbId: 663745, title: "Gái Già Lắm Chiêu 3", year: "2020", duration: "1h 55m", desc: "Cuộc chiến mẹ chồng nàng dâu đầy hài hước và kịch tính trong gia đình thượng lưu xứ Huế." },
    210: { tmdbId: 637997, title: "Ròm", year: "2019", duration: "1h 19m", desc: "Câu chuyện về Ròm - một cậu bé đường phố làm nghề cò đề, luôn hy vọng trúng số để tìm lại ba mẹ." },
    211: { tmdbId: 405886, title: "Lật Mặt 6: Tấm Vé Định Mệnh", year: "2023", duration: "2h 12m", desc: "Một nhóm bạn thân mua chung một tấm vé số trúng giải đặc biệt, nhưng mọi chuyện trở nên phức tạp khi người giữ vé qua đời." },
    212: { tmdbId: 1057856, title: `Chị Chị Em Em 2`, year: "2023", duration: "1h 45m", desc: `Một cô gái giang hồ tìm cách thay đổi cuộc đời bằng cách tiếp cận và trở thành đệ tử của một đệ nhất mỹ nữ Sài Thành.` },
    213: { tmdbId: 55208, title: `Bẫy Rồng`, year: "2009", duration: "1h 45m", desc: `Trinh, một nữ sát thủ phải hoàn thành hàng loạt nhiệm vụ để cứu con gái bị bắt cóc. Cô thuê những người khác giúp đỡ, trong đó có Quân.` },
    214: { tmdbId: 175447, title: `Lửa Phật`, year: "2013", duration: "1h 45m", desc: `Một vị cao tăng hoàn tục trở về ngôi làng cũ để đối mặt với những ân oán và bảo vệ người dân khỏi cái ác.` },
    215: { tmdbId: 1526531, title: `Hoàng Tử Quỷ`, year: "2025", duration: "1h 45m", desc: `Bộ phim lấy cảm hứng từ tiểu thuyết kinh dị Lý Triều Dị Truyện, kể về những truyền thuyết ma quái thời nhà Lý.` },
    216: { tmdbId: 587001, title: `Hạnh Phúc Của Mẹ`, year: "2019", duration: "1h 45m", desc: `Một người mẹ mắc bệnh hiểm nghèo chuẩn bị hành trang cho đứa con trai mắc chứng tự kỷ trước khi cô qua đời.` },
    217: { tmdbId: 1456587, title: `Phim Hồng`, year: "2025", duration: "1h 45m", desc: `Một thiếu niên bị nhốt trong phòng kín cùng một con kỳ đà đầy bí ẩn.` },
    218: { tmdbId: 464003, title: `Em Chưa 18`, year: "2017", duration: "1h 45m", desc: `Cuộc sống của một tay chơi thay đổi chóng mặt sau khi trải qua tình một đêm với một cô gái chưa đủ 18 tuổi.` },
    219: { tmdbId: 1258626, title: `Lật Mặt 7: Một Điều Ước`, year: "2024", duration: "1h 45m", desc: `Câu chuyện cảm động về một người mẹ già góa bụa và 5 đứa con trưởng thành bận rộn khi bà gặp tai nạn.` },
    222: { tmdbId: 1215106, title: `Làng Địa Ngục`, year: "2025", duration: "1h 45m", desc: `Hàng loạt vụ án mạng rùng rợn xảy ra trong một ngôi làng hẻo lánh, liên quan đến những bí mật đen tối của quá khứ.` },
    223: { tmdbId: 52255, title: `Bi, Đừng Sợ`, year: "2011", duration: "1h 45m", desc: `Câu chuyện về gia đình nhỏ của Bi (6 tuổi) trong một căn nhà cũ ở Hà Nội, với những góc khuất tình cảm phức tạp.` },
    224: { tmdbId: 1510333, title: `Nước, Giấy, Tóc...`, year: "2026", duration: "1h 45m", desc: `Bà sinh ra trong một hang động hơn 60 năm trước. Đôi khi bà mơ thấy mẹ gọi mình về lại nơi hang tối đó.` },
    225: { tmdbId: 414284, title: `Trái Tim Quái Vật`, year: "2015", duration: "1h 45m", desc: `Nam, một kẻ trốn chạy tội giết người, bị cuốn vào trò chơi tử thần trong một căn biệt thự bí ẩn cùng với Huy.` },
    226: { tmdbId: 1056126, title: `Nhà Bà Nữ`, year: "2023", duration: "1h 45m", desc: `Câu chuyện về gia đình bà Nữ bán bánh canh cua, với những mâu thuẫn thế hệ và sự kìm kẹp áp đặt lên con cái.` },
    227: { tmdbId: 19552, title: `Mùi Đu Đủ Xanh`, year: "1993", duration: "1h 45m", desc: `Sài Gòn những năm 50 qua góc nhìn của Mùi, một cô hầu gái nhỏ nhút nhát nhưng tinh tế.` },
    228: { tmdbId: 36266, title: `Xích Lô`, year: "1995", duration: "1h 45m", desc: `Một chàng trai đạp xích lô nghèo khó ở TP.HCM bị cuốn vào vòng xoáy tội lỗi để mưu sinh.` },
    229: { tmdbId: 1618321, title: `Báu Vật Trời Cho`, year: "2026", duration: "1h 45m", desc: `Ngọc, một người mẹ đơn thân, tình cờ gặp lại Hồng - người đã hiến tinh trùng để cô sinh ra đứa con của mình.` },
    232: { tmdbId: 1667685, title: `Quỷ Huyết`, year: "2026", duration: "1h 45m", desc: `Còn và Dương, hai đồ đệ pháp sư lên núi tìm cách cứu mẹ khỏi lời nguyền của Phí Phông - loài ác quỷ khát máu.` },
    233: { tmdbId: 1516884, title: `Quán Trọ Kỳ Nam`, year: "2025", duration: "1h 45m", desc: `Sài Gòn năm 1985, Khang dọn đến nơi ở mới và gặp gỡ Kỳ Nam, một góa phụ bí ẩn mang nhiều tâm sự.` },
    234: { tmdbId: 1218719, title: `Con Ma Nhà Họ Hứa`, year: "1973", duration: "1h 45m", desc: `Một quản gia phát hiện những bí ẩn kinh hoàng đằng sau việc cô con gái lớn của một gia đình giàu có bị nhốt kín trong phòng.` },
    235: { tmdbId: 1163576, title: `Bến Phà Xác Sống`, year: "2023", duration: "1h 45m", desc: `Nhóm người sống sót chạy trốn khỏi đại dịch zombie ở miền Tây Nam Bộ, cố gắng vươn tới chuyến phà cuối cùng.` },
    236: { tmdbId: 1222274, title: `Mõm Đỏ`, year: "2023", duration: "1h 45m", desc: `Sự trở về của Nam và bạn gái Xuân mang đến vô số rắc rối và làm bộc lộ những góc khuất trong gia đình.` },
    237: { tmdbId: 578949, title: `Gái Già Lắm Chiêu`, year: "2018", duration: "1h 45m", desc: `Ms Q, một nữ MC nổi tiếng, vô tình có tình một đêm với chàng trai trẻ tên Jack và bị cuốn vào những rắc rối dở khóc dở cười.` },
    238: { tmdbId: 486912, title: `Cô Ba Sài Gòn`, year: "2017", duration: "1h 45m", desc: `Hành trình xuyên không của Như Ý - một tiểu thư kiêu kỳ ở thập niên 60 đến tương lai để học cách yêu quý tà áo dài truyền thống.` },
    239: { tmdbId: 329851, title: `Để Mai Tính 2`, year: "2014", duration: "1h 45m", desc: `Chị Hội, một doanh nhân chuyển giới, liên tục gặp vận xui mỗi khi đem lòng yêu một chàng trai thẳng.` },
    242: { tmdbId: 1466131, title: `Thiên Thần Hộ Mệnh`, year: "2025", duration: "1h 45m", desc: `Lan chuyển đến một ngôi nhà u ám làm giúp việc và phát hiện ra hàng loạt hiện tượng siêu nhiên kinh hoàng.` },
    243: { tmdbId: 1479953, title: `Chuyến Bay Bão Táp`, year: "2025", duration: "1h 45m", desc: `Một sĩ quan an ninh hàng không phải chiến đấu với nhóm không tặc tàn nhẫn để bảo vệ hành khách trên chuyến bay.` },
    244: { tmdbId: 413416, title: `Cô Hầu Gái`, year: "2016", duration: "1h 45m", desc: `Một cô gái mồ côi làm hầu gái tại một đồn điền cao su ma ám năm 1953 và đánh thức linh hồn người vợ đã khuất.` },
    245: { tmdbId: 1448353, title: `Thám Tử Kiên`, year: "2025", duration: "1h 45m", desc: `Thám tử Kiên điều tra một thi thể không đầu tại một vùng quê dưới triều Nguyễn, với nhiều tình tiết tâm linh bí ẩn.` },
    246: { tmdbId: 1118343, title: `Hoa Hồng Đen`, year: "2023", duration: "1h 45m", desc: `Câu chuyện về một nữ bảo mẫu tên My làm việc cho một gia đình giàu có và dần phát hiện ra bí mật đen tối của họ.` },
    247: { tmdbId: 1437163, title: `Việt Yêu Dấu`, year: "2025", duration: "1h 45m", desc: `Cuộc sống của Đức, người anh em sinh đôi dính liền do hậu quả của chất độc màu da cam, nay đã là một người cha.` },
    248: { tmdbId: 821937, title: `578: Phát Đạn Của Kẻ Điên`, year: "2022", duration: "1h 45m", desc: `Người cha lái xe tải tên Hùng truy lùng những kẻ đã bắt cóc và làm tổn thương con gái nhỏ của mình.` },
    249: { tmdbId: 846586, title: `Việt và Nam`, year: "2024", duration: "1h 45m", desc: `Nam và Việt, hai công nhân mỏ than trẻ tuổi, sống trong tình yêu bí mật trước khi một người lên đường rời quê hương.` },
    252: { tmdbId: 1433321, title: `Quỷ Nhập Tràng`, year: "2025", duration: "1h 30m", desc: `Câu chuyện kinh hoàng về hiện tượng quỷ nhập tràng - khi người chết bất ngờ sống dậy và gieo rắc nỗi sợ hãi cho cả ngôi làng.` },
    253: { tmdbId: 1569904, title: `Trái Tim Tội Lỗi`, year: "2025", duration: "1h 45m", desc: `Một vụ giết người dã man chấn động thị trấn, và mọi nghi ngờ đổ dồn về Sơn - nhân tình của nạn nhân.` },
    254: { tmdbId: 1559846, title: `Nơi Bắt Đầu`, year: "2025", duration: "1h 45m", desc: `Khi đại gia đình ông Quang về quê cải táng, họ vô tình đánh thức những oan nghiệp từ nhiều đời trước.` },
    255: { tmdbId: 387590, title: `Người Cộng Sự`, year: "2013", duration: "1h 45m", desc: `Bộ phim lịch sử dựa trên câu chuyện có thật về tình bạn giữa nhà cách mạng Phan Bội Châu và bác sĩ người Nhật Asaba Sakitaro.` },
    256: { tmdbId: 1566694, title: `Bản Sao Nghịch Giới`, year: "2025", duration: "1h 45m", desc: `Doanh nhân Nhơn tìm đến tà thuật 'Thai Chiêu Tài' để giữ gìn tài sản, nhưng vô tình đánh thức quá khứ kinh hoàng.` },
    257: { tmdbId: 334693, title: `Đoạt Hồn`, year: "2014", duration: "1h 45m", desc: `Một cô bé bị chết đuối dưới sông đột nhiên sống lại, nhưng từ đó những hiện tượng kỳ lạ liên tục xảy ra với gia đình cô.` },
    258: { tmdbId: 1641479, title: `Siêu Cấp Anh Hùng`, year: "2026", duration: "1h 45m", desc: `Một tài xế taxi chật vật kiếm tiền chữa bệnh cho con gái vô tình bị cuốn vào một vụ lừa đảo từ thiện lớn.` },
    'wwz': { tmdbId: 72190, title: "World War Z", year: "2013", duration: "1h 56m", desc: "Cựu nhân viên Liên Hợp Quốc Gerry Lane phải đi khắp thế giới trong cuộc chạy đua với thời gian để ngăn chặn đại dịch zombie đang lật đổ quân đội, chính phủ và đe dọa tiêu diệt nhân loại.", ophimEmbed: 'https://vip.opstream90.com/share/bc42a91889ffc14111c4eae0557c5259' },
    'ttb': { tmdbId: 396535, title: "Train to Busan", year: "2016", duration: "1h 58m", desc: "Thiết quân luật được ban bố khi một đợt bùng phát virus bí ẩn đẩy Hàn Quốc vào tình trạng khẩn cấp. Những người trên chuyến tàu tốc hành đến Busan phải chiến đấu để sinh tồn...", ophimEmbed: 'https://vip.opstream12.com/share/84d9ee44e457ddef7f2c4f25dc8fa865' },
    'jp1': { tmdbId: 329, title: "Công Viên Kỷ Jura Phần 1", year: "1993", duration: "2h 7m", desc: "Một doanh nhân giàu có bí mật tạo ra một công viên giải trí với những con khủng long sống được tái tạo từ ADN tiền sử. Tuy nhiên, khi hệ thống an ninh bị vô hiệu hóa, những con khủng long thoát ra ngoài...", ophimEmbed: 'https://vip.opstream12.com/share/74d3b2328adadbd5c9740b050d0a333c' },
    'jp2': { tmdbId: 330, title: "Công Viên Kỷ Jura Phần 2", year: "1997", duration: "2h 9m", desc: "Bốn năm sau thảm họa Công Viên Kỷ Jura, tỷ phú John Hammond tiết lộ rằng ông đã nhân giống thêm khủng long tại một địa điểm bí mật. Ian Malcolm cùng nhóm thám hiểm lên đường ghi lại hành vi tự nhiên của chúng...", ophimEmbed: 'https://vip.opstream16.com/share/4c56ff4ce4aaf9573aa5dff913df997a' },
  };

  // Add Cyberpunk 10 episodes
  for (let i = 1; i <= 10; i++) { // them id: cp1 -> cp10
    movieDetails[`cp-${i}`] = {
      tmdbId: 105248,
      title: `Cyberpunk: Edgerunners - Phần 1 - Tập ${i}`,
      year: "2022",
      duration: "25m",
      desc: `Theo chân một cậu bé đường phố cố gắng sống sót trong một thành phố ám ảnh bởi công nghệ và sự thay đổi cơ thể. Với việc đánh mất mọi thứ, cậu đã chọn cách sống sót bằng cách trở thành một 'edgerunner' - lính đánh thuê.`
    };
    movieDetails[`cp2-${i}`] = {
      tmdbId: 105248,
      title: `Cyberpunk: Edgerunners - Phần 2 - Tập ${i}`,
      year: "2024",
      duration: "25m",
      desc: `Phần 2 tiếp tục câu chuyện đẫm máu tại Night City với những cuộc chiến không khoan nhượng của thế giới ngầm Cyberpunk. (Phantom Liberty)`
    };
  }

  Object.assign(movieDetails, galaxyPlayMovies);

  // Channel definitions for VTV1..VTV9 (ids 900..908)
  // Each channel can have a programs list. For demo we reuse /videoplayback.mp4
  // For demo/testing each channel has an array of programs. In production, replace src with real HLS/MP4 URLs.
  // mk: create program entry with a primary static file under /videos/ and a fallback to the shared playback file
  const mk = (show, n) => {
    const filePrimary = `/videos/${show}_${n}.mp4`;
    const fallback = `/videoplayback.mp4?show=${show}&ep=${n}`;
    return {
      id: `${show}-${n}`,
      title: `${show === 'shin' ? `Shin - Tập ${n}` : `Gameshow - Tập ${n}`}`,
      filePrimary,
      fallback,
      poster: `/${show}_${n}.svg`
    };
  };
  const channelMap = {
    // VTV1: embed YouTube playlist for Ông Trùm (uses provided playlist)
    900: {
      title: 'VTV1', stream: '/videoplayback.mp4', programs: [
        {
          id: 'ongtrum-1', title: 'Ông Trùm - Tập 1', embed: 'https://www.youtube.com/embed/xT3qQO0jark?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/xT3qQO0jark/hqdefault.jpg'
        },
        { id: 'ongtrum-2', title: 'Ông Trùm - Tập 2', embed: 'https://www.youtube.com/embed/V-pKm_-5lkI?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/V-pKm_-5lkI/hqdefault.jpg' },
        { id: 'ongtrum-3', title: 'Ông Trùm - Tập 3', embed: 'https://www.youtube.com/embed/_J5TtH_N4mQ?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/_J5TtH_N4mQ/hqdefault.jpg' },
        { id: 'ongtrum-4', title: 'Ông Trùm - Tập 4', embed: 'https://www.youtube.com/embed/vyCVKHnq2Yw?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/vyCVKHnq2Yw/hqdefault.jpg' },
        { id: 'ongtrum-5', title: 'Ông Trùm - Tập 5', embed: 'https://www.youtube.com/embed/Wf6-5-5eoP0?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/Wf6-5-5eoP0/hqdefault.jpg' },
        { id: 'ongtrum-6', title: 'Ông Trùm - Tập 6', embed: 'https://www.youtube.com/embed/_LFaQkxpp9Q?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/_LFaQkxpp9Q/hqdefault.jpg' },
        { id: 'ongtrum-7', title: 'Ông Trùm - Tập 7', embed: 'https://www.youtube.com/embed/bJCNxzstrg0?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/bJCNxzstrg0/hqdefault.jpg' },
        { id: 'ongtrum-8', title: 'Ông Trùm - Tập 8', embed: 'https://www.youtube.com/embed/ysQWsX6XGgI?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/ysQWsX6XGgI/hqdefault.jpg' },
        { id: 'ongtrum-9', title: 'Ông Trùm - Tập 9', embed: 'https://www.youtube.com/embed/vPmZ8Ezs1Dg?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/vPmZ8Ezs1Dg/hqdefault.jpg' },
        { id: 'ongtrum-10', title: 'Ông Trùm - Tập 10', embed: 'https://www.youtube.com/embed/ts7wHkCt1TY?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/ts7wHkCt1TY/hqdefault.jpg' },
        { id: 'ongtrum-11', title: 'Ông Trùm - Tập 11', embed: 'https://www.youtube.com/embed/8CMAt5Twohc?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/8CMAt5Twohc/hqdefault.jpg' },
        { id: 'ongtrum-12', title: 'Ông Trùm - Tập 12', embed: 'https://www.youtube.com/embed/fSUPiCr-SVs?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/fSUPiCr-SVs/hqdefault.jpg' },
        { id: 'ongtrum-13', title: 'Ông Trùm - Tập 13', embed: 'https://www.youtube.com/embed/IIhsUhrEK8E?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/IIhsUhrEK8E/hqdefault.jpg' },
        { id: 'ongtrum-14', title: 'Ông Trùm - Tập 14', embed: 'https://www.youtube.com/embed/kdUCaqXiHGE?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/kdUCaqXiHGE/hqdefault.jpg' },
        { id: 'ongtrum-15', title: 'Ông Trùm - Tập 15', embed: 'https://www.youtube.com/embed/hFaCQ8AWlXQ?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/hFaCQ8AWlXQ/hqdefault.jpg' },
        { id: 'ongtrum-16', title: 'Ông Trùm - Tập 16', embed: 'https://www.youtube.com/embed/rKYDoziZvAc?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/rKYDoziZvAc/hqdefault.jpg' },
        { id: 'ongtrum-17', title: 'Ông Trùm - Tập 17', embed: 'https://www.youtube.com/embed/V_NEsSMOY_M?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/V_NEsSMOY_M/hqdefault.jpg' },
        { id: 'ongtrum-18', title: 'Ông Trùm - Tập 18', embed: 'https://www.youtube.com/embed/llqmCoRHaME?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/llqmCoRHaME/hqdefault.jpg' },
        { id: 'ongtrum-19', title: 'Ông Trùm - Tập 19', embed: 'https://www.youtube.com/embed/1h8aV6epSLg?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/1h8aV6epSLg/hqdefault.jpg' },
        { id: 'ongtrum-20', title: 'Ông Trùm - Tập 20', embed: 'https://www.youtube.com/embed/6jzE-9GdKp4?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/6jzE-9GdKp4/hqdefault.jpg' },
        { id: 'ongtrum-21', title: 'Ông Trùm - Tập 21', embed: 'https://www.youtube.com/embed/7jv8Zlcgyuw?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/7jv8Zlcgyuw/hqdefault.jpg' },
        { id: 'ongtrum-22', title: 'Ông Trùm - Tập 22', embed: 'https://www.youtube.com/embed/VI7j0eOdoI4?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/VI7j0eOdoI4/hqdefault.jpg' },
        { id: 'ongtrum-23', title: 'Ông Trùm - Tập 23', embed: 'https://www.youtube.com/embed/mEfOjVuybig?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/mEfOjVuybig/hqdefault.jpg' },
        { id: 'ongtrum-24', title: 'Ông Trùm - Tập 24', embed: 'https://www.youtube.com/embed/zOn559_jsLc?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/zOn559_jsLc/hqdefault.jpg' },
        { id: 'ongtrum-25', title: 'Ông Trùm - Tập 25', embed: 'https://www.youtube.com/embed/yK6IPeqrTMY?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/yK6IPeqrTMY/hqdefault.jpg' },
        { id: 'ongtrum-26', title: 'Ông Trùm - Tập 26', embed: 'https://www.youtube.com/embed/z-zXZXv5Fuc?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/z-zXZXv5Fuc/hqdefault.jpg' },
        { id: 'ongtrum-27', title: 'Ông Trùm - Tập 27', embed: 'https://www.youtube.com/embed/GtuTNKagbZk?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/GtuTNKagbZk/hqdefault.jpg' },
        { id: 'ongtrum-28', title: 'Ông Trùm - Tập 28', embed: 'https://www.youtube.com/embed/SIkNHrfcuP4?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/SIkNHrfcuP4/hqdefault.jpg' },
        { id: 'ongtrum-29', title: 'Ông Trùm - Tập 29', embed: 'https://www.youtube.com/embed/qkvvag0UvCs?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/qkvvag0UvCs/hqdefault.jpg' },
        { id: 'ongtrum-30', title: 'Ông Trùm - Tập 30', embed: 'https://www.youtube.com/embed/9ojVYUZ71yc?autoplay=1&rel=0', poster: 'https://img.youtube.com/vi/9ojVYUZ71yc/hqdefault.jpg' }
      ]
    },
    901: { title: 'VTV2', stream: '/videoplayback.mp4', programs: [mk('gamelive', 1), mk('gamelive', 3), mk('shin', 3)] },
    902: { title: 'VTV3', stream: '/videoplayback.mp4', programs: [mk('shin', 4), mk('shin', 5), mk('gamelive', 4)] },
    903: { title: 'VTV4', stream: '/videoplayback.mp4', programs: [mk('gamelive', 2), mk('shin', 6)] },
    904: { title: 'VTV5', stream: '/videoplayback.mp4', programs: [mk('shin', 7), mk('gamelive', 5)] },
    905: { title: 'VTV6', stream: '/videoplayback.mp4', programs: [mk('gamelive', 6), mk('shin', 8), mk('shin', 9)] },
    906: { title: 'VTV7', stream: '/videoplayback.mp4', programs: [mk('shin', 10), mk('gamelive', 7)] },
    907: { title: 'VTV8', stream: '/videoplayback.mp4', programs: [mk('gamelive', 8), mk('shin', 11)] },
    908: { title: 'VTV9', stream: '/videoplayback.mp4', programs: [mk('shin', 12), mk('gamelive', 9)] }
  };

  // Lấy dữ liệu phim
  let movie = movieDetails[id] || movieDetails[1];

  if (id && id.toString().startsWith('sao-')) {
    const parts = id.toString().split('-');
    const season = parts[1];
    const episode = parts[2];
    movie = {
      tmdbId: 'tt2250192',
      title: `Sword Art Online - Phần ${season} Tập ${episode}`,
      year: season === '1' ? '2012' : (season === '2' ? '2014' : '2018'),
      duration: '24m',
      desc: 'Câu chuyện về những người chơi bị mắc kẹt trong thế giới game thực tế ảo, nơi cái chết trong game đồng nghĩa với cái chết ngoài đời thực.'
    };
  }

  if (id && id.toString().startsWith('aot-')) {
    const parts = id.toString().split('-');
    const season = parseInt(parts[1].substring(1), 10); // Remove 's' prefix: s1 -> 1
    const episode = parseInt(parts[2].substring(2), 10); // Remove 'ep' prefix: ep5 -> 5
    movie = {
      tmdbId: 1425,
      title: `Attack on Titan - Phần ${season} Tập ${episode}`,
      year: season === 1 ? '2013' : (season === 2 ? '2017' : (season === 3 ? '2018' : '2020')),
      duration: '24m',
      desc: 'Một thế hệ con người sống bên trong những bức tường khổng lồ vì sợ quái vật Titan ăn thịt người. Cuộc đấu tranh tuyệt vọng này sẽ mở ra những bí mật không tưởng.',
      poster: getAotPoster(season, episode)
    };
  }

  // neu id channel (900..908) thi override movie thanh object channel de hien thi thong tin va stream channel thay vi phim
  if (channelMap[parseInt(id)]) {
    movie = { title: channelMap[parseInt(id)].title, year: 'Live', duration: 'Live', desc: `${channelMap[parseInt(id)].title} - Phát sóng trực tiếp` };
  }

  const [embedUrl, setEmbedUrl] = React.useState("");
  const [embedBaseUrl, setEmbedBaseUrl] = React.useState("");
  const [isChannel, setIsChannel] = React.useState(false);
  const [channelStream, setChannelStream] = React.useState("");
  const [channelPrograms, setChannelPrograms] = React.useState([]);
  const [selectedProgram, setSelectedProgram] = React.useState(null);
  const [channelEmbedUrl, setChannelEmbedUrl] = React.useState("");
  const [channelPlayRequested, setChannelPlayRequested] = React.useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const ytPlayerRef = useRef(null);
  const ytPlayerInstanceRef = useRef(null);
  const videoRef = useRef(null);
  const [resolution, setResolution] = React.useState(localStorage.getItem('vibio_resolution') || 'Auto');
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const RESOLUTIONS = ['Auto', '144p', '240p', '360p', '480p', '720p', '1080p', '4K'];

  useEffect(() => {
    // Cuộn lên đầu khi tải xong
    window.scrollTo(0, 0);

    const fetchEmbed = async () => {
      // If this id belongs to a channel, use video element stream instead of embed lookup
      if (channelMap[parseInt(id)]) {
        setIsChannel(true);
        const ch = channelMap[parseInt(id)];
        const programs = ch.programs || [];
        setChannelPrograms(programs);
        // Check for ?ep=N query param to open a specific episode
        const searchParams = new URLSearchParams(location.search || window.location.search);
        const epParam = searchParams.get('ep');
        // neu o day stream video se bi autoplay, de stream trong channel programs de tranh autoplay o day
        setSelectedProgram(null);
        setChannelEmbedUrl('');
        let stream = ch.stream;
        if (programs.length > 0) {
          let firstIndex = 0;
          if (epParam) {
            const found = programs.findIndex(p => String(p.id).endsWith(`-${epParam}`) || String(p.id) === `ongtrum-${epParam}` || String(p.id).includes(`ep=${epParam}`));
            if (found >= 0) firstIndex = found;
          }
          const first = programs[firstIndex];
          setSelectedProgram(first);
          if (first.embed) {
            // Special handling for Ông Trùm (channel 900) — use Ophim API directly
            if (first.id && first.id.startsWith('ongtrum-')) {
              const idx = epParam ? Math.max(0, parseInt(epParam, 10) - 1 || 0) : parseInt(first.id.split('-')[1]) - 1;
              fetch('https://ophim1.com/v1/api/phim/ong-trum')
                .then(res => res.json())
                .then(data => {
                  const embedLink = data?.data?.item?.episodes?.[0]?.server_data?.[idx]?.link_embed;
                  if (embedLink) {
                    setChannelEmbedUrl(embedLink);
                    setChannelPlayRequested(true);
                    setChannelStream('');
                  }
                })
                .catch(err => console.error('Ophim fetch error:', err));
              stream = '';
            } else if (String(first.embed).includes('videoseries')) {
              // YouTube playlist (non-Ông Trùm)
              if (epParam) {
                try {
                  const fu = new URL(first.embed);
                  const listId = fu.searchParams.get('list');
                  const nue = new URL('https://www.youtube.com/embed/videoseries');
                  nue.searchParams.set('list', listId);
                  nue.searchParams.set('autoplay', '1');
                  nue.searchParams.set('rel', '0');
                  nue.searchParams.set('origin', window.location.origin);
                  const idx = Math.max(0, parseInt(epParam, 10) - 1 || 0);
                  nue.searchParams.set('index', String(idx));
                  const embedStart = nue.toString();
                  setChannelEmbedUrl(embedStart);
                  setChannelPlayRequested(true);
                  stream = '';
                } catch (e) {
                  stream = '';
                }
              } else {
                // do not auto-set channelEmbedUrl to avoid autoplay/black-screen issues
                stream = '';
              }
            } else {
              // Ensure origin param is present for YouTube embeds (helps on localhost)
              try {
                const u = new URL(first.embed);
                if (!u.searchParams.has('origin')) u.searchParams.set('origin', window.location.origin);
                u.searchParams.set('rel', '0');
                setChannelEmbedUrl(u.toString());
              } catch (e) {
                setChannelEmbedUrl(first.embed);
              }
              stream = '';
            }

            if (!stream) stream = first.filePrimary || '';
          } else if (first.fallback) {
            stream = first.fallback;
          } else if (first.src) {
            stream = first.src;
          }
        }
        // If no stream or embed was successfully resolved, fall back to the channel's default stream
        if (!stream) stream = ch.stream || '/videoplayback.mp4';
        setChannelStream(stream ? stream + (resolution && resolution !== 'Auto' ? `&quality=${resolution}` : '') : '');
        return;
      }
      setIsChannel(false);
      setChannelPrograms([]);
      setSelectedProgram(null);
      // Mặc định dùng vidsrc.to cho phim quốc tế
      let defaultUrl = `https://vidsrc.to/embed/movie/${movie.tmdbId}`;

      if (parseInt(id) >= 200) {
        // Xử lý riêng cho phim Việt Nam (Galaxy Play)
        const cleanTitle = movie.title.replace(/\s\(\d{4}\)$/, '').trim();
        const movieYear = parseInt(movie.year);
        const movieTmdbId = String(movie.tmdbId);

        try {
          // 1. Thử tìm trên Ophim API (ưu tiên vì có TMDB ID để so khớp chính xác)
          const ophimSearchRes = await fetch(`https://ophim1.com/v1/api/tim-kiem?keyword=${encodeURIComponent(cleanTitle)}`);
          const ophimSearchData = await ophimSearchRes.json();
          if (ophimSearchData?.data?.items?.length > 0) {
            // Tìm phim khớp TMDB ID trước, rồi mới so khớp năm + tên
            const exactMatch = ophimSearchData.data.items.find(item =>
              item.tmdb?.id && String(item.tmdb.id) === movieTmdbId
            );
            const yearMatch = ophimSearchData.data.items.find(item =>
              item.year === movieYear && item.name?.toLowerCase().includes(cleanTitle.toLowerCase())
            );
            const nameMatch = ophimSearchData.data.items.find(item =>
              item.name === cleanTitle
            );
            const bestMatch = exactMatch || yearMatch || nameMatch;

            if (bestMatch) {
              const ophimDetailRes = await fetch(`https://ophim1.com/v1/api/phim/${bestMatch.slug}`);
              const ophimDetailData = await ophimDetailRes.json();
              if (ophimDetailData?.data?.item?.episodes?.[0]?.server_data?.[0]?.link_embed) {
                setEmbedBaseUrl(ophimDetailData.data.item.episodes[0].server_data[0].link_embed);
                setEmbedUrl(applyResolutionToUrl(ophimDetailData.data.item.episodes[0].server_data[0].link_embed, resolution));
                return;
              }
            }
          }

          // 2. Thử tìm trên NguonC API nếu Ophim không có
          const nguoncSearchRes = await fetch(`https://phim.nguonc.com/api/films/search?keyword=${encodeURIComponent(cleanTitle)}`);
          const nguoncSearchData = await nguoncSearchRes.json();
          if (nguoncSearchData?.items?.length > 0) {
            // So khớp theo tên chính xác hoặc năm sản xuất
            const bestNguonc = nguoncSearchData.items.find(item =>
              item.name === cleanTitle && (!item.year || item.year === movieYear)
            ) || nguoncSearchData.items.find(item =>
              item.name?.includes(cleanTitle) && item.year === movieYear
            );

            if (bestNguonc) {
              const nguoncDetailRes = await fetch(`https://phim.nguonc.com/api/film/${bestNguonc.slug}`);
              const nguoncDetailData = await nguoncDetailRes.json();
              if (nguoncDetailData?.movie?.episodes?.[0]?.items?.[0]?.embed) {
                setEmbedBaseUrl(nguoncDetailData.movie.episodes[0].items[0].embed);
                setEmbedUrl(applyResolutionToUrl(nguoncDetailData.movie.episodes[0].items[0].embed, resolution));
                return;
              }
            }
          }
        } catch (error) {
          console.error("Lỗi khi fetch API phim Việt:", error);
        }

        // 3. Nếu không tìm thấy trên API phim Việt, thử dùng embed service với TMDB ID
        // vidsrc.to hỗ trợ nhiều phim qua TMDB ID
        const base = `https://vidsrc.to/embed/movie/${movie.tmdbId}`;
        setEmbedBaseUrl(base);
        setEmbedUrl(applyResolutionToUrl(base, resolution));

      } else if (parseInt(id) >= 8 && parseInt(id) <= 107) {
        // Phim Siêu Đạo Chích Kid (Conan)
        const base = `https://www.youtube.com/embed/9G3Xg_v1GGE?autoplay=1`;
        setEmbedBaseUrl(base);
        setEmbedUrl(applyResolutionToUrl(base, resolution));
      } else {
        // Phim quốc tế
        let finalUrl = '';

        // Nếu phim có link Ophim embed sẵn, dùng luôn (nhanh nhất)
        if (movie.ophimEmbed) {
          finalUrl = movie.ophimEmbed;
        }
        // Handle TV Shows specifically (Cyberpunk)
        else if (id && id.toString().startsWith('cp-')) {
          const ep = id.replace('cp-', '');
          finalUrl = `https://vidsrc.to/embed/tv/105248/1/${ep}`;
        } else if (id && id.toString().startsWith('cp2-')) {
          const ep = id.replace('cp2-', '');
          finalUrl = `https://vidsrc.to/embed/tv/105248/1/${ep}`;
        } else if (id && id.toString().startsWith('sao-')) {
          const parts = id.toString().split('-');
          const season = parseInt(parts[1]);
          const epIndex = parseInt(parts[2]) - 1;

          let slug = 'sword-art-online';
          if (season === 2) slug = 'sword-art-online-ii';
          if (season === 3) slug = 'dao-kiem-than-vuc-alicization';

          try {
            const ophimDetailRes = await fetch(`https://ophim1.com/v1/api/phim/${slug}`);
            const ophimDetailData = await ophimDetailRes.json();
            const embedLink = ophimDetailData?.data?.item?.episodes?.[0]?.server_data?.[epIndex]?.link_embed;
            if (embedLink) {
              setEmbedBaseUrl(embedLink);
              setEmbedUrl(applyResolutionToUrl(embedLink, resolution));
              return; // Exit early since we set the URL
            }
          } catch (e) {
            console.error("Lỗi khi lấy link SAO từ Ophim:", e);
          }

          // Fallback to vidsrc.to if Ophim fails
          finalUrl = `https://vidsrc.to/embed/tv/tt2250192/${parts[1]}/${parts[2]}`;
        } else if (id && id.toString().replace(/ /g, '-').startsWith('aot-')) {
          const normalizedId = id.toString().replace(/ /g, '-');
          const parts = normalizedId.split('-');
          const season = parseInt(parts[1].substring(1), 10);
          const episode = parseInt(parts[2].substring(2), 10);

          let slug = '';
          if (season === 1) slug = 'dai-chien-titan-phan-1-2013';
          else if (season === 2) slug = 'dai-chien-titan-phan-2-2017';
          else if (season === 3) slug = 'dai-chien-titan-phan-3';
          else if (season === 4) slug = 'dai-chien-titan-phan-4';
          else if (season === 5) slug = 'dai-chien-titan-phan-5';
          else if (season === 6) slug = 'dai-chien-titan-phan-6';

          if (slug) {
            try {
              const ophimDetailRes = await fetch(`https://ophim1.com/v1/api/phim/${slug}`);
              const ophimDetailData = await ophimDetailRes.json();
              const embedLink = ophimDetailData?.data?.item?.episodes?.[0]?.server_data?.[episode - 1]?.link_embed;
              if (embedLink) {
                setEmbedBaseUrl(embedLink);
                setEmbedUrl(applyResolutionToUrl(embedLink, resolution));
                return;
              }
            } catch (e) {
              console.error("Lỗi khi lấy link AOT từ Ophim:", e);
            }
          }

          finalUrl = `https://vidsrc.to/embed/tv/tt2560140/${season}/${episode}`;
        } else {
          // Fallback dùng vidsrc.to
          finalUrl = `https://vidsrc.to/embed/movie/${movie.tmdbId}`;
        }

        setEmbedBaseUrl(finalUrl);
        setEmbedUrl(applyResolutionToUrl(finalUrl, resolution));
      }
    };

    fetchEmbed();
  }, [id, movie.title, movie.tmdbId, location.search]);

  // Apply resolution to a given embed URL using provider-specific params when possible
  const applyResolutionToUrl = (url, res) => {
    if (!res || res === 'Auto') return url;
    try {
      const u = new URL(url);
      const paramMap = {
        '144p': '144',
        '240p': '240',
        '360p': '360',
        '480p': '480',
        '720p': '720',
        '1080p': '1080',
        '4K': '2160'
      };
      const q = paramMap[res] || '';

      // YouTube uses `vq` values like 'hd1080', 'hd720', 'large', etc.
      if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
        const vqMap = { '144p': 'tiny', '240p': 'small', '360p': 'medium', '480p': 'large', '720p': 'hd720', '1080p': 'hd1080', '4K': 'hd2160' };
        u.searchParams.set('vq', vqMap[res] || 'hd720');
        return u.toString();
      }

      // Common embed providers often accept `quality` or `q` parameter — try both
      if (q) {
        u.searchParams.set('quality', q);
        u.searchParams.set('q', q);
      }
      return u.toString();
    } catch (err) {
      // If URL parsing fails, fall back to appending a query string
      if (url.includes('?')) return `${url}&quality=${res}`;
      return `${url}?quality=${res}`;
    }
  };

  // When user changes resolution, persist preference and update embedUrl
  useEffect(() => {
    if (!embedBaseUrl) return;
    localStorage.setItem('vibio_resolution', resolution);
    setEmbedUrl(applyResolutionToUrl(embedBaseUrl, resolution));
  }, [resolution, embedBaseUrl]);

  // Load YouTube IFrame API once
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.YT && window.YT.Player) return;
    const scriptId = 'youtube-iframe-api';
    if (document.getElementById(scriptId)) return;
    const s = document.createElement('script');
    s.id = scriptId;
    s.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(s);
  }, []);

  // Initialize or update YT player when modal opens with a playlist modalUrl
  useEffect(() => {
    const isYouTubePlaylist = modalUrl && modalUrl.includes('youtube') && modalUrl.includes('list=');
    if (!showEmbedModal || !isYouTubePlaylist) return;

    const initPlayer = () => {
      try {
        const urlObj = new URL(modalUrl);
        const listId = urlObj.searchParams.get('list');
        const indexParam = urlObj.searchParams.get('index');
        const startIndex = indexParam ? Math.max(0, parseInt(indexParam, 10)) : 0;

        // Ensure container exists
        if (!ytPlayerRef.current) return;

        // Destroy existing player
        if (ytPlayerInstanceRef.current && ytPlayerInstanceRef.current.destroy) {
          ytPlayerInstanceRef.current.destroy();
          ytPlayerInstanceRef.current = null;
        }

        ytPlayerInstanceRef.current = new window.YT.Player(ytPlayerRef.current, {
          height: '480',
          width: '854',
          playerVars: {
            listType: 'playlist',
            list: listId,
            autoplay: 1,
            rel: 0,
            origin: window.location.origin
          },
          events: {
            onReady: (e) => {
              try { e.target.playVideo(); } catch (err) { }
              try { e.target.playVideoAt(startIndex); } catch (err) { }
            }
          }
        });
      } catch (err) {
        console.error('YT init error', err);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // If API not ready yet, poll until available
      const t = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(t);
          initPlayer();
        }
      }, 200);
      return () => clearInterval(t);
    }

    return () => {
      if (ytPlayerInstanceRef.current && ytPlayerInstanceRef.current.destroy) {
        ytPlayerInstanceRef.current.destroy();
        ytPlayerInstanceRef.current = null;
      }
    };
  }, [showEmbedModal, modalUrl]);

  // Helper to format seconds into mm:ss or hh:mm:ss
  const formatTime = (secs) => {
    if (!secs || isNaN(secs) || secs === Infinity) return '00:00';
    const s = Math.floor(secs);
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    if (hrs > 0) return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return `${String(mins).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="watch-page-container">
      {/* Nút quay lại */}
      <div className="watch-header-overlay">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={28} />
        </button>

        <div className="server-switcher">
          <div className="resolution-selector">
            <label htmlFor="resolution-select">Độ phân giải:</label>
            <select
              id="resolution-select"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              aria-label="Chọn độ phân giải video"
            >
              {RESOLUTIONS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Video Phim */}
      <div className="video-player-wrapper">
        {isChannel ? (
          <div style={{ position: 'relative' }}>
            {selectedProgram && selectedProgram.embed && String(selectedProgram.embed).includes('videoseries') && !channelEmbedUrl && !channelPlayRequested ? (
              // Show poster + play overlay for playlist embeds (require user action)
              <div className="playlist-poster" style={{ width: '100%', height: '100%', background: '#000', position: 'relative' }}>
                <img src={selectedProgram.poster || ''} alt={selectedProgram.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
                  className="playlist-play-btn"
                  onClick={async () => {
                    // If it's Ông Trùm, we fetch directly from Ophim to bypass YouTube issues
                    if (selectedProgram.id && selectedProgram.id.startsWith('ongtrum-')) {
                      const epNum = parseInt(selectedProgram.id.split('-')[1]);
                      const epIndex = epNum - 1;
                      try {
                        const ophimRes = await fetch('https://ophim1.com/v1/api/phim/ong-trum');
                        const ophimData = await ophimRes.json();
                        const embedLink = ophimData?.data?.item?.episodes?.[0]?.server_data?.[epIndex]?.link_embed;
                        if (embedLink) {
                          setChannelEmbedUrl(embedLink);
                          setChannelPlayRequested(true);
                          setChannelStream('');
                          return; // Exit here, use Ophim
                        }
                      } catch (err) {
                        console.error("Lỗi lấy link Ông Trùm từ Ophim:", err);
                      }
                    }

                    try {
                      const u = new URL(selectedProgram.embed);
                      const listId = u.searchParams.get('list');
                      let embedUrl = selectedProgram.embed;
                      if (listId) {
                        const nue = new URL('https://www.youtube.com/embed/videoseries');
                        nue.searchParams.set('list', listId);
                        nue.searchParams.set('autoplay', '1');
                        nue.searchParams.set('rel', '0');
                        nue.searchParams.set('origin', window.location.origin);

                        // Set playlist index based on episode number
                        if (selectedProgram.id && selectedProgram.id.startsWith('ongtrum-')) {
                          const epNum = parseInt(selectedProgram.id.split('-')[1]);
                          if (!isNaN(epNum)) {
                            nue.searchParams.set('index', epNum);
                          }
                        }

                        embedUrl = nue.toString();
                      } else {
                        if (!u.searchParams.has('origin')) u.searchParams.set('origin', window.location.origin);
                        u.searchParams.set('rel', '0');
                        u.searchParams.set('autoplay', '1');
                        embedUrl = u.toString();
                      }
                      setChannelEmbedUrl(embedUrl);
                      setChannelPlayRequested(true);
                      setChannelStream('');
                      // Do NOT show modal to prevent double audio playback
                      // setModalUrl(embedUrl);
                      // setShowEmbedModal(true);
                    } catch (e) {
                      const fallback = selectedProgram.embed + (selectedProgram.embed.includes('?') ? '&' : '?') + `origin=${encodeURIComponent(window.location.origin)}&rel=0&autoplay=1`;
                      setChannelEmbedUrl(fallback);
                      setChannelPlayRequested(true);
                      setChannelStream('');
                    }
                  }}
                  style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 3, border: 'none', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '12px 18px', borderRadius: 8, cursor: 'pointer' }}
                >
                  ▶ Phát
                </button>
              </div>
            ) : channelEmbedUrl ? (
              <iframe
                className="main-video-player"
                src={channelEmbedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture; clipboard-write; web-share"
                sandbox="allow-scripts allow-same-origin allow-presentation"
                title={selectedProgram?.title || movie.title}
                style={{ border: 'none' }}
              />
            ) : channelStream ? (
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <video
                  ref={videoRef}
                  key={channelStream}
                  className="main-video-player"
                  src={channelStream}
                  poster={selectedProgram?.poster || ''}
                  controls
                  autoPlay
                  playsInline
                  onTimeUpdate={(e) => setVideoTime(e.target.currentTime || 0)}
                  onLoadedMetadata={(e) => setVideoDuration(e.target.duration || 0)}
                  onPlay={() => setVideoPlaying(true)}
                  onPause={() => setVideoPlaying(false)}
                  style={{ width: '100%', height: '100%', background: '#181515' }}
                />

                {/* Progress bar overlay for HTML5 video */}
                <div className="video-progress" onClick={(e) => {
                  try {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const pct = Math.max(0, Math.min(1, x / rect.width));
                    if (videoRef.current && typeof videoRef.current.currentTime === 'number') {
                      videoRef.current.currentTime = pct * (videoDuration || 0);
                      setVideoTime(pct * (videoDuration || 0));
                    }
                  } catch (err) { }
                }}>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(videoDuration ? (videoTime / videoDuration) * 100 : 0)}%` }} />
                  </div>
                  <div className="progress-time">{formatTime(videoTime)} / {formatTime(videoDuration)}</div>
                </div>
              </div>
            ) : (
              <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
                <div style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>
                  <div style={{ marginBottom: 12, fontSize: 32, animation: 'spin 1s linear infinite' }}>⏳</div>
                  Đang tải video...
                </div>
              </div>
            )}
            {/* Debug / fallback UI: show current iframe src and open in new tab */}
            {channelEmbedUrl && (
              null
            )}
            {selectedProgram && (
              <div style={{ position: 'absolute', left: 24, bottom: 24, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '8px 12px', borderRadius: 6 }}>
                {selectedProgram.title}
              </div>
            )}
            {/* Embed modal (fallback) */}
            {showEmbedModal && (
              <div className="embed-modal-backdrop" onClick={() => setShowEmbedModal(false)}>
                <div className="embed-modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="embed-modal-close" onClick={() => setShowEmbedModal(false)}>✕</button>
                  {modalUrl && modalUrl.includes('youtube') && modalUrl.includes('list=') ? (
                    <div style={{ width: '100%', height: '100%' }}>
                      <div ref={ytPlayerRef} style={{ width: '100%', height: '100%' }} />
                    </div>
                  ) : (
                    <iframe
                      className="embed-modal-iframe"
                      src={modalUrl}
                      frameBorder="0"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture; clipboard-write; web-share"
                      allowFullScreen
                      title="Embed Player"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <iframe
            className="main-video-player"
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            allow="autoplay *; encrypted-media *; fullscreen *; picture-in-picture *; web-share *; clipboard-write *"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-presentation"
            referrerPolicy="no-referrer"
            title={movie.title}
            style={{ border: 'none' }}
          />
        )}
      </div>

      {/* debug removed */}

      {/* Nếu đang xem kênh, hiển thị danh sách chương trình để chọn */}
      {isChannel && channelPrograms && channelPrograms.length > 0 && (
        <div className="channel-program-list">
          <h3>Chương trình phát sóng</h3>
          <div className="program-meta">
            <div className="program-current">
              <strong>{selectedProgram?.title}</strong>
            </div>
          </div>
          <div className="program-buttons">
            {channelPrograms.map(p => (
              <button
                key={p.id}
                className={`program-btn ${selectedProgram?.id === p.id ? 'active' : ''}`}
                onClick={async () => {
                  setSelectedProgram(p);
                  const q = (resolution && resolution !== 'Auto') ? `&quality=${resolution}` : '';
                  // Try to HEAD the primary file; if exists use it, otherwise fallback
                  try {
                    // If program provides an embed URL, prefer that
                    if (p.embed) {
                      // If this is a YouTube playlist, select it but require user to click Play
                      if (String(p.embed).includes('videoseries')) {
                        // Build a nocookie embed that starts at this episode index and open modal
                        try {
                          const fu = new URL(p.embed);
                          const listId = fu.searchParams.get('list');
                          const nue = new URL('https://www.youtube-nocookie.com/embed/videoseries');
                          nue.searchParams.set('list', listId);
                          nue.searchParams.set('autoplay', '1');
                          nue.searchParams.set('rel', '0');
                          nue.searchParams.set('origin', window.location.origin);
                          const epMatch = String(p.id).match(/(\d+)$/);
                          const idx = epMatch ? Math.max(0, parseInt(epMatch[1], 10) - 1) : 0;
                          nue.searchParams.set('index', String(idx));
                          const embedStart = nue.toString();
                          setSelectedProgram(p);
                          setChannelEmbedUrl(embedStart);
                          setChannelStream('');
                          setChannelPlayRequested(true);
                          setModalUrl(embedStart);
                          setShowEmbedModal(true);
                          return;
                        } catch (e) {
                          setSelectedProgram(p);
                          setChannelEmbedUrl('');
                          setChannelStream('');
                          setChannelPlayRequested(false);
                          return;
                        }
                      }
                      try {
                        const ue = new URL(p.embed);
                        if (!ue.searchParams.has('origin')) ue.searchParams.set('origin', window.location.origin);
                        ue.searchParams.set('rel', '0');
                        setChannelEmbedUrl(ue.toString());
                      } catch (e) {
                        setChannelEmbedUrl(p.embed);
                      }
                      setChannelStream('');
                      return;
                    }
                    const headRes = await fetch(p.filePrimary, { method: 'HEAD' });
                    if (headRes.ok) {
                      setChannelStream(p.filePrimary + q);
                      setChannelEmbedUrl('');
                    } else {
                      setChannelStream(p.fallback + q);
                      setChannelEmbedUrl('');
                    }
                  } catch (err) {
                    setChannelStream(p.fallback + q);
                    setChannelEmbedUrl('');
                  }
                }}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Thông tin phim */}
      <div className="watch-movie-info">
        {movie.poster && (
          <img className="watch-poster" src={movie.poster} alt={`${movie.title} poster`} />
        )}
        <div className="watch-movie-details">
          {/* Tên phim */}
          <h1 className="watch-title">{movie.title}</h1>

          {/* Thông tin thêm của phim */}
          <div className="watch-meta">
            <span className="match-score">98% Độ phù hợp</span>
            <span className="year">{movie.year}</span>
            <span className="age-rating">T18</span>
            <span className="duration">{movie.duration}</span>
            <span className="quality-badge">HD</span>
          </div>
          <div className="resolution-note">Lưu ý: một số nguồn embed có thể không hỗ trợ thay đổi độ phân giải.</div>

          {/* Nút chức năng của trang web (tùy chỉnh sau này) */}
          <div className="watch-actions-row">
            <button className="action-btn"><Plus size={24} /><span>Danh sách của tôi</span></button>
            <button className="action-btn"><ThumbsUp size={24} /><span>Đánh giá</span></button>
            <button className="action-btn"><Share2 size={24} /><span>Chia sẻ</span></button>
          </div>

          {/* Mô tả phim */}
          <p className="watch-description">{movie.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
