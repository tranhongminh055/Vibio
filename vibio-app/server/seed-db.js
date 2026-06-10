const mysql = require('mysql2/promise');
const sql = require('mssql');
const { connectMySQL, connectSQLServer } = require('./db');

// ==========================================
// DATA: Categories
// ==========================================
const categories = [
  { name: 'Phim Bộ', description: 'Phim bộ nhiều phần' },
  { name: 'Phim Điện Ảnh', description: 'Phim điện ảnh chiếu rạp' },
  { name: 'Galaxy Play', description: 'Phim Việt Nam trên Galaxy Play' }
];

// ==========================================
// DATA: Movies
// ==========================================
const phimBo = [
  { title: "Resident Evil (2002)", image: "https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Resident_evil_ver4.jpg/250px-Resident_evil_ver4.jpg", rating: 6.7 },
  { title: "Resident Evil: Apocalypse (2004)", image: "https://cdn.kinocheck.com/i/tyssb9apzs.jpg", rating: 6.2 },
  { title: "Resident Evil: Extinction (2007)", image: "https://m.media-amazon.com/images/M/MV5BYmJhOWZhNGEtZDg1YS00NmQ0LTljZDctYmMwYWE1Yjg5ZjdmXkEyXkFqcGc@._V1_.jpg", rating: 6.3 },
  { title: "Resident Evil: Afterlife (2010)", image: "https://cdn.kinocheck.com/i/18o52mu7dn.jpg", rating: 5.8 },
  { title: "Resident Evil: Retribution (2012)", image: "https://play-lh.googleusercontent.com/1w4jjGZGfOzMepFHSDRhQL7bsmQr-iy1kkwEmqg8DInmX4tZ5CbsqzWcJvHn4ryRscQ=w240-h480-rw", rating: 5.4 },
  { title: "Resident Evil: The Final Chapter (2016)", image: "https://image.tmdb.org/t/p/original/4s2d3xdyqotiVNHTlTlJjrr3q0H.jpg", rating: 5.5 },
  { title: "Resident Evil: Welcome to Raccoon City (2021)", image: "https://image.tmdb.org/t/p/original/7uRbWOXxpWDMtnsd2PF3clu65jc.jpg", rating: 5.2 }
];

const conanPosters = [
  "https://media.themoviedb.org/t/p/w500/ksQ8uNgoWsVH6a0oPB6zx08pOwU.jpg",
  "https://media.themoviedb.org/t/p/w500/d08RKnmdcoCwlHOezazli8hmJH6.jpg",
  "https://media.themoviedb.org/t/p/w500/1wl6eAHbIDSz61tGwYTOKlSRvZb.jpg",
  "https://media.themoviedb.org/t/p/w500/p1RaB4tvdPg49IlfIdI333ChtGs.jpg",
  "https://media.themoviedb.org/t/p/w500/9bNsqXpPKSdcqPeBgWg9HsrwYJe.jpg",
  "https://media.themoviedb.org/t/p/w500/pXYeXuomi8EpXsXO4cvt5mdfSCD.jpg",
  "https://media.themoviedb.org/t/p/w500/9wUk85WRQrAxTOgxjdPwrmVQ2Se.jpg",
  "https://media.themoviedb.org/t/p/w500/wowJzvF1KqEFSZoArkgngRy1r4L.jpg",
  "https://media.themoviedb.org/t/p/w500/1rqrypnOq4cuwzobGW9gQgarkSr.jpg",
  "https://media.themoviedb.org/t/p/w500/1X4oWU6r5IUO5e0ZgeT3GdvJbRC.jpg"
];

const phimDienAnh = [];
for (let i = 1; i <= 100; i++) {
  phimDienAnh.push({
    title: `Siêu Đạo Chích Kid - Phần ${i}`,
    image: conanPosters[(i - 1) % conanPosters.length],
    rating: parseFloat((Math.random() * (9.5 - 8.0) + 8.0).toFixed(1))
  });
}

const galaxyPlay = [
  { title: "Mai (2024)", image: "https://media.themoviedb.org/t/p/w500/z9zR8RIr5Z5erj2fI4qLK7KHRJT.jpg", rating: 8.5 },
  { title: "Nhà Bà Nữ (2023)", image: "https://media.themoviedb.org/t/p/w500/aGFWJOyUMq2EMtisNZCM2chXf8p.jpg", rating: 8.1 },
  { title: "Bố Già (2021)", image: "https://media.themoviedb.org/t/p/w500/ucXxqYqNLjZ3auyLTzU9NsClsms.jpg", rating: 7.9 },
  { title: "Đất Rừng Phương Nam (2023)", image: "https://media.themoviedb.org/t/p/w500/nZ7lLEdv9PKZkO6y19Z42MbFmke.jpg", rating: 8.0 },
  { title: "Em Và Trịnh (2022)", image: "https://media.themoviedb.org/t/p/w500/x72eRMK9GzYVVER04hEsLxhWeUb.jpg", rating: 7.5 },
  { title: "Tiệc Trăng Máu (2020)", image: "https://media.themoviedb.org/t/p/w500/1gtr8Js6yS7gWrQylbIK4sGQGih.jpg", rating: 8.2 },
  { title: "Mắt Biếc (2019)", image: "https://media.themoviedb.org/t/p/w500/fSDrH9rI2TgMqcYb05qw8cLtXmS.jpg", rating: 8.0 },
  { title: "Hai Phượng (2019)", image: "https://media.themoviedb.org/t/p/w500/6LON0M5qfRb8M2XqKnUvOpCBq3Z.jpg", rating: 7.7 },
  { title: "Cua Lại Vợ Bầu (2019)", image: "https://media.themoviedb.org/t/p/w500/mXQ3OxsoRuals78R5IWlY42Rvv9.jpg", rating: 7.4 },
  { title: "Gái Già Lắm Chiêu 3 (2020)", image: "https://media.themoviedb.org/t/p/w500/jXgHbZ5gEnZc6izj4CjMh8caIrc.jpg", rating: 7.2 },
  { title: "Ròm (2019)", image: "https://media.themoviedb.org/t/p/w500/a3mFE5h1THftDfa6RjzMvsyticc.jpg", rating: 7.6 },
  { title: "Lật Mặt 6: Tấm Vé Định Mệnh (2023)", image: "https://media.themoviedb.org/t/p/w500/3ym9JhjqUu5jKCWxtKVF86Sw4gD.jpg", rating: 8.3 },
  { title: "Sister Sister 2", image: "https://media.themoviedb.org/t/p/w500/qMD2zbQy7fl4J8BZpdYcCWtjp1S.jpg", rating: 7.0 },
  { title: "Clash", image: "https://media.themoviedb.org/t/p/w500/LwAmk0IFyZYxfmD0TH8GKZyzGZ.jpg", rating: 5.0 },
  { title: "Once Upon a Time in Vietnam", image: "https://media.themoviedb.org/t/p/w500/o4oAN2nsMnwVHbjPjKN8pcDsR2b.jpg", rating: 5.6 },
  { title: "The Demon Prince", image: "https://media.themoviedb.org/t/p/w500/pX8kCc2ZP82rAZ8IwDsdun1FCAD.jpg", rating: 8.8 },
  { title: "The Happiness of a Mother", image: "https://media.themoviedb.org/t/p/w500/bKsXUfvljPjYfytKcjw5FbRHT09.jpg", rating: 8.4 },
  { title: "PINK MOVIE", image: "https://media.themoviedb.org/t/p/w500/7dHiq9so6XkeyMX2bESUya9T5ZB.jpg", rating: 8.6 },
  { title: "Jailbait", image: "https://media.themoviedb.org/t/p/w500/phXbIGRmNZduZwnBjC0dBZfn8lr.jpg", rating: 6.6 },
  { title: "Face Off 7: One Wish", image: "https://media.themoviedb.org/t/p/w500/aSPg7viRKZUp6py0VLVTv6mo3GN.jpg", rating: 7.3 },
  { title: "Ko Ga Loak Village", image: "https://media.themoviedb.org/t/p/w500/jt31qZw5W1RFXfGyTJCpgjvq2h1.jpg", rating: 5.1 },
  { title: "Bi, Don't Be Afraid", image: "https://media.themoviedb.org/t/p/w500/lotXs0yvfPvhFCVXjnUsxLLMC2h.jpg", rating: 5.3 },
  { title: "Hair, Paper, Water...", image: "https://media.themoviedb.org/t/p/w500/4z2v3v2v4y54oABfqtAwmB0YCep.jpg", rating: 8.7 },
  { title: "Never Trust a Stranger", image: "https://media.themoviedb.org/t/p/w500/7wY6QzqRYIOPfOTl1CskFYHP7RE.jpg", rating: 3.0 },
  { title: "The House of No Man", image: "https://media.themoviedb.org/t/p/w500/aGFWJOyUMq2EMtisNZCM2chXf8p.jpg", rating: 5.8 },
  { title: "The Scent of Green Papaya", image: "https://media.themoviedb.org/t/p/w500/p9lJFQ54IiNqN4fcmn5JxXdqQtR.jpg", rating: 7.0 },
  { title: "Cyclo", image: "https://media.themoviedb.org/t/p/w500/mdOsnSVTLwHMEH1juOLMiwXcO5o.jpg", rating: 7.0 },
  { title: "A Gift From Heaven", image: "https://media.themoviedb.org/t/p/w500/mnOMG35LRwN9w0W1FD2MQI9X6zx.jpg", rating: 6.0 },
  { title: "The Blood Demon", image: "https://media.themoviedb.org/t/p/w500/1c5XWuA9ETEUZcMAF1ngk0kBNEh.jpg", rating: 7.5 },
  { title: "Ky Nam Inn", image: "https://media.themoviedb.org/t/p/w500/6Av8MS7I5K251bMofglA9Qv2Xaa.jpg", rating: 7.5 },
  { title: "The Ghost of Hứa Family", image: "https://media.themoviedb.org/t/p/w500/nNWl7tRoHDW2PpfEDr6weAa675i.jpg", rating: 8.6 },
  { title: "Zombie Ferry Station", image: "https://media.themoviedb.org/t/p/w500/bnlYmSzp9Uh0ZPPyDj26XwAaVH2.jpg", rating: 7.0 },
  { title: "Crimson Snout", image: "https://media.themoviedb.org/t/p/w500/bm2JMrOq8cUlA287CZ1vCyRPeSH.jpg", rating: 4.7 },
  { title: "The Cougar Queen", image: "https://media.themoviedb.org/t/p/w500/5RIUCFKFXifRX2xcVPRJX2eLqM4.jpg", rating: 5.0 },
  { title: "The Tailor", image: "https://media.themoviedb.org/t/p/w500/9QfL4NmXxkNPevs7htzfPwAmvoa.jpg", rating: 6.1 },
  { title: "Let Hoi Decide", image: "https://media.themoviedb.org/t/p/w500/lkALlAuDv5Hmsh9vyW6b4Xftsau.jpg", rating: 7.4 },
  { title: "The Guardian Demon", image: "https://media.themoviedb.org/t/p/w500/oLpOpsZx8DJxlwNjjdROtuzHfXp.jpg", rating: 6.5 },
  { title: "Hijacked", image: "https://media.themoviedb.org/t/p/w500/y0t53XosZnJ5wjiORvZqobZPmJF.jpg", rating: 6.3 },
  { title: "The Housemaid", image: "https://media.themoviedb.org/t/p/w500/5sYJDnC2iN1zcVfoqIkPtufV4L4.jpg", rating: 5.9 },
  { title: "Detective Kien: The Headless Horror", image: "https://media.themoviedb.org/t/p/w500/sTW271wUWjbvRXPqD9xexnLAvnl.jpg", rating: 7.8 },
  { title: "Black Rose", image: "https://media.themoviedb.org/t/p/w500/r08WvIDBbosBvymZQyvQypYdbjK.jpg", rating: 5.0 },
  { title: "Dearest Viet", image: "https://media.themoviedb.org/t/p/w500/uX3RSsb1Wp3Su9snqMD0EEIadHJ.jpg", rating: 7.7 },
  { title: "578: Magnum", image: "https://media.themoviedb.org/t/p/w500/8Nw5v7wPfa2FwbKyx61K2nIBcKa.jpg", rating: 6.0 },
  { title: "Việt and Nam", image: "https://media.themoviedb.org/t/p/w500/axtvB6qoORMZQ2qPZdaFcBOM8g3.jpg", rating: 7.0 },
  { title: "Maxo: Forbidden Ritual", image: "https://media.themoviedb.org/t/p/w500/hnXG4O2J4ODwRkP9vtDqO1xiH0t.jpg", rating: 6.1 },
  { title: "Crooked Heart", image: "https://media.themoviedb.org/t/p/w500/z8LNpP0fd5NTSFi4i1M30dzLHiQ.jpg", rating: 6.0 },
  { title: "Where It Began", image: "https://media.themoviedb.org/t/p/w500/qxQEzKp5WI5Ra9joAt4KVv4LdM7.jpg", rating: 8.7 },
  { title: "The Partner", image: "https://media.themoviedb.org/t/p/w500/fQVqjqZtvQORnOB4uR0QVXkTqFQ.jpg", rating: 8.2 },
  { title: "Antithesis of Gemini", image: "https://media.themoviedb.org/t/p/w500/xYDG2xUS5WRG4PURJh5bxIO6dYI.jpg", rating: 7.0 },
  { title: "Hollow", image: "https://media.themoviedb.org/t/p/w500/cefUKWm7mNPodfUVkTzpLz1HQKk.jpg", rating: 7.4 },
];

const movieDescriptions = {
  "Resident Evil (2002)": "A special military unit fights a powerful, out-of-control supercomputer and hundreds of scientists who have mutated into flesh-eating creatures after a laboratory accident.",
  "Resident Evil: Apocalypse (2004)": "Alice awakens in Raccoon City, only to find it has become infested with zombies and monsters. With the help of Jill Valentine and Carlos Olivera, Alice must find a way out of the city before it is destroyed by a nuclear missile.",
  "Resident Evil: Extinction (2007)": "Survivors of the Raccoon City catastrophe travel across the Nevada desert, hoping to make it to Alaska. Alice joins the caravan and their fight against the evil Umbrella Corp.",
  "Resident Evil: Afterlife (2010)": "While still out to destroy the evil Umbrella Corporation, Alice joins a group of survivors living in a prison surrounded by the infected who also want to relocate to the mysterious but supposedly unharmed safe haven known only as Arcadia.",
  "Resident Evil: Retribution (2012)": "Alice fights alongside a resistance movement to regain her freedom from an Umbrella Corporation testing facility.",
  "Resident Evil: The Final Chapter (2016)": "Picking up immediately after the events in Resident Evil: Retribution, Alice is the only survivor of what was meant to be humanity's final stand against the undead. Now, she must return to where the nightmare began.",
  "Resident Evil: Welcome to Raccoon City (2021)": "Once the booming home of pharmaceutical giant Umbrella Corporation, Raccoon City is now a dying Midwestern town. The company's exodus left the city a wasteland...with great evil brewing below the surface. When that evil is unleashed, the townspeople are forever...changed...and a small group of survivors must work together to uncover the truth behind Umbrella and make it through the night.",
  "Mai (2024)": "Câu chuyện về Mai, một người phụ nữ với quá khứ nhiều tổn thương, gặp gỡ và yêu Dương - chàng trai trẻ đào hoa.",
  "Nhà Bà Nữ (2023)": "Phim kể về những góc khuất trong gia đình bà Nữ - người phụ nữ bán bánh canh cua nghiêm khắc và áp đặt.",
  "Bố Già (2021)": "Câu chuyện gia đình cảm động về ông Ba Sang, một người cha nghèo gà trống nuôi con nhưng giàu tình thương.",
  "Đất Rừng Phương Nam (2023)": "Hành trình tìm cha của bé An trên vùng đất Nam Bộ hào hùng trong thời kỳ loạn lạc.",
  "Em Và Trịnh (2022)": "Câu chuyện về cuộc đời của cố nhạc sĩ Trịnh Công Sơn và những nàng thơ đã đi qua đời ông.",
  "Tiệc Trăng Máu (2020)": "Một nhóm bạn thân chơi trò chơi công khai mọi tin nhắn, cuộc gọi trong điện thoại, từ đó những bí mật dần được hé lộ.",
  "Mắt Biếc (2019)": "Chuyện tình đơn phương đẫm nước mắt của Ngạn dành cho Hà Lan - cô gái có đôi mắt biếc.",
  "Hai Phượng (2019)": "Hành trình nghẹt thở của Hai Phượng - một người mẹ từng làm giang hồ, đi tìm lại đứa con gái bị bắt cóc.",
  "Cua Lại Vợ Bầu (2019)": "Chuyện tình của Trọng Thoại và Nhã Linh đứng trước bờ vực tan vỡ khi Nhã Linh mang thai nhưng không rõ của ai.",
  "Gái Già Lắm Chiêu 3 (2020)": "Cuộc chiến mẹ chồng nàng dâu đầy hài hước và kịch tính trong gia đình thượng lưu xứ Huế.",
  "Ròm (2019)": "Câu chuyện về Ròm - một cậu bé đường phố làm nghề cò đề, luôn hy vọng trúng số để tìm lại ba mẹ.",
  "Lật Mặt 6: Tấm Vé Định Mệnh (2023)": "Một nhóm bạn thân mua chung một tấm vé số trúng giải đặc biệt, nhưng mọi chuyện trở nên phức tạp khi người giữ vé qua đời.",
  "Sister Sister 2": "A prostitute seeks to escape her life by becoming the protege of a lady of status and class.",
  "Clash": "Trinh, a mercenary, must complete a series of organized crime jobs for her boss in order to win the release of her kidnapped daughter. She hires several mercenaries to help, including Quan, who she becomes attracted to. Trinh and Quan's relationship becomes complicated as it becomes evident that their motivations are not the same.",
  "Once Upon a Time in Vietnam": "Assigned to protect a small town in Vietnam, Dao arrives to fight against the crime boss; but soon his past catches up with him, threatening to destroy the cherished village.",
  "The Demon Prince": "The movie The Demon Prince (Hoàng Tử Quỷ) marks the first collaboration between CJ HK Entertainment and the duo Producer Hoang Quan – Director Tran Huu Tan from ProductionQ. The film is inspired by the famous horror novel Lý Triều Dị Truyện by author Phan Cuong. This fictional collection, steeped in mystique and set during Vietnam's Ly Dynasty, builds on folklore about ghosts, dark magic, courtly secrets, and popular fears. The work opens up a world where forgotten legends come to life, reflecting the greed, ambition, and obsessions within every human being. The film The Demon Prince (Hoàng Tử Quỷ) is expected to premiere in cinemas nationwide starting from December 5, 2025.",
  "The Happiness of a Mother": "A mother who is diagnosed with terminal cancer, prepares to leave her family and her little son who is diagnosed with Autism.",
  "PINK MOVIE": "A teen is locked in a room with a monitor lizard",
  "Jailbait": "A playboy's life changes after he meets and sleeps with a girl who hasn't turned 18 yet.",
  "Face Off 7: One Wish": "When a 73-year-old widow is forced to depend on the care of her 5 busy adult children after an injury, she begins to question the meaning of family love.",
  "Ko Ga Loak Village": "A wave of chilling serial murders emerges, marked by the gruesome decay of male victims' secret part. As the police investigate, they confront eerie local myths and dark secrets.",
  "Bi, Don't Be Afraid": "In an old house in Hanoi, Bi, a 6-year-old child lives with his parents, his aunt and their cook. His favorite playgrounds are an ice factory and the wild grass along the river. After being absent for years, his grandfather, seriously ill, reappears and settles at their house. While Bi gets closer to his grandfather, his father tries to avoid any contact with his family. Every night, he gets drunk and goes and see his masseuse, for whom he feels a quiet strong desire. Bi's mother turns a blind eye on it. The aunt, still single, meets a 16-year-old young boy in the bus. Her attraction to him moves her deeply.",
  "Hair, Paper, Water...": "She was born in a cave, more than 60 years ago. Now she lives in a village, with many children and grandchildren to look after. Sometimes, she dreams of her dead mother calling her home – to the cave.",
  "Never Trust a Stranger": "Nam, 22, fled to Saigon for a murder. In one accident, Nam reached the sights of Huy, 25, a mysterious character completely unknown. Knowing Nam need money to survive, so Huy promised Nam that he will pay 200 million in exchange for he can own Nam for 20 hours. And Nam has to do everything except things that are illegal. Nam were secretly sent back to the mysterious mansion of Huy, and from here Nam has to face the dangerous game and this guy's craziness. In this house, Nam is not alone like Huy told him before, but also with one young girl was stabbed to death and 1 grave. And when Nam want to escape the ghost house, only to discover Huy also stabbed to death. The killer is somewhere in the house? Who is she? Huy's relationship with the girl like? Can Nam safely escape with 200 million or not?",
  "The House of No Man": "The story revolves around Mrs. Nu's family consisting of three generations living together in the same house. The one-handed Mrs. Nu is known for her crab cakes and is also notorious for controlling the lives of everyone, from her daughter to her son-in-law. Everything was going normally until the youngest daughter fell in love with a handsome guy from a rich family. The story depicts the complex, multi-dimensional relationships that occur with family members. The main tagline (message) \"Everyone is at fault, but everyone thinks they are... the victim\" contains many hidden meanings about the content the film wants to convey.",
  "The Scent of Green Papaya": "1950s Saigon through the eyes of Mui, a Vietnamese servant girl. At 10 years-old, Mui leaves her village to work for an affluent, troubled family. As she comes of age, Mui finds work in the household of a pianist she has admired since childhood, and finds their relationship growing in complexity.",
  "Cyclo": "Follows a young cyclo driver on his poverty-driven descent into criminality in modern-day Ho Chi Minh City. The boy's struggles to scratch out a living for his two sisters and grandfather in the mean streets of the city lead to petty crime on behalf of a mysterious Madame from whom he rents his cyclo.",
  "A Gift From Heaven": "BÁU VẬT TRỜI CHO is an emotionally rich, heartwarming film that celebrates family bonds for Tết 2026. Ngọc (Phương Anh Đào), a single mother who conceived her child through donor insemination, takes a seaside getaway to escape her past. There, she and her son Tô unexpectedly encounter Hồng (Tuấn Trần), a free-spirited fisherman who happens to be the donor behind Tô’s birth. This awkward reunion draws three strangers into a series of humorous yet tense situations as everything spirals beyond control. Is this “heaven-sent” father a destined gift, or merely life’s cruel twist of fate?",
  "The Blood Demon": "Phí Phông—a bloodthirsty demon from the mountain folk legends that has haunted generations. The film follows Còn (Kiều Minh Tuấn) and Dương (Minh Anh), two apprentice shamans who journey into the mountains to save their mother, who has fallen under the Phí Phông curse. At the same time, a series of gruesome deaths begin to plague a remote village, casting suspicion on Mon (Diệp Bảo Ngọc) and her daughter Lua (Nina Nutthacha), who exhibit traits eerily similar to the demon. Yet, buried deep within the cursed forest lie shocking secrets, drawing Còn and Dương into an endless hunt for the true face of Phí Phông.",
  "Ky Nam Inn": "Set in 1985 post-war Vietnam, Khang moves to Saigon after securing a position to translate \"The Little Prince.\" Due to his family connections, Khang's life under the new regime is secure. But everything changes when he meets Ky Nam, a reserved older widow who lives in Khang's new community.",
  "The Ghost of Hứa Family": "A butler of a wealthy family in Saigon is tasked with bringing food and clothes to the eldest daughter who contracted leprosy and is locked in a room for years, but he soon suspects there is more to the story.",
  "Zombie Ferry Station": "The content of \"The Living Corpse Ferry\" revolves around the escape of Cong's (Huynh Dong) group from the outbreak of the epidemic and trying to reach the last ferry in the lower Mekong River region. However, in the process of escaping, they were once lost when Diem's (Oc Thanh Van) degeneration and disruption appeared, causing the group to be forced to separate. And the Zombie attack lands on the island, facing life and death, the characters realize that it is not the disease, it is the existence of selfishness and resentment that pushes them into life-or-death challenges.",
  "Crimson Snout": "The return of Nam and his girlfriend Xuan brings countless troubles to the family. He gradually discovers the broken relationships of the family members.",
  "The Cougar Queen": "The life of fame is suddenly a series of bad luck that makes Ms Q face many challenges if she wants to regain her position. At the same time, Jack - a young apprentice appeared and Ms Q was \"drunk\". Will Ms Q save his career? What is Jack's real identity?",
  "The Tailor": "The re-enactment of the long dress (ao dai) era in 1960s, Saogon, thought to be the heyday of traditional Vietnamese costumes. Interwoven into that transformation in fashion and style of the ao dai in modern times told through the story of the character of Ba. Audiences will also see somewhere the image of the 60s, 70s full of honest women. An image of Saigon in the past, gentle and steeped in contrast to the rush of a dynamic city will be described by fashion, namely long dress - traditional costumes in Vietnam. All of them are cleverly nested in the story between two families, between mothers and their children, between a tailor and a fabric shop filled with dramatic rage.",
  "Let Hoi Decide": "A transgender Vietnamese businessman who becomes poor every time he falls in love with someone.",
  "The Guardian Demon": "After her father's death, Lan (Phương Thanh) moves to a rural village and becomes a housemaid for Mr. Danh (Mạc Văn Khoa) — a widower with no children. But the moment she steps into the house, Lan is confronted with eerie phenomena and a string of mysterious deaths. With the help of Sơn (Quốc Trường), a horror novelist, she begins to uncover terrifying secrets and the dark history buried within the house.",
  "Hijacked": "When a group of ruthless hijackers take control of a flight and try to force their way into the cockpit, an aviation security officer must find a way to fight back while still safely protect the passengers.",
  "The Housemaid": "When an orphaned Vietnamese girl is hired to be a housemaid at a haunted rubber plantation in 1953 French Indochina, she unexpectedly falls in love with the French landowner and awakens the vengeful ghost of his dead wife... who is out for blood.",
  "Detective Kien: The Headless Horror": "Detective Kien investigates a headless body found in a rural Vietnamese village during the Nguyen Dynasty. As supernatural elements emerge, he faces chilling twists in this 19th-century mystery.",
  "Black Rose": "The story revolves around a babysitter named 'My' coming to work for a rich young family. As bonds start to form, and trusts built, 'My' begins to face everyone’s deep dark secrets.",
  "Dearest Viet": "Born a conjoined twin due to the effects of Agent Orange used during the Vietnam War, Duc Nguyen, now a father and husband, seeks the truth about his past and contemplates the future.",
  "578: Magnum": "A container truck driver, Hùng, lives an idyllic life with his little daughter, An. The father and daughter become the closest companions in every journey with their orange container truck. Life goes on like that until An has to leave her father to go to school. One day, Hùng is informed that An is suffering from severe depression. Relying on his old skills in the past and finding out the truth, Hùng becomes enraged and painful to know that his little girl was kidnapped by a male stranger. Starting his lone and intense journey looking for and chasing after the unknown abuser, Hùng realizes that to hunt down that psychopath he has to counter the massive underground forces behind him.",
  "Việt and Nam": "In the depths of the underground coal mines, where danger awaits and darkness prevails, Nam and Việt, both young miners, cherish fleeting moments, knowing that one of them will soon leave for a new life across the sea.",
  "Maxo: Forbidden Ritual": "Crushed by extreme poverty and haunted by the fear of losing another child after a miscarriage, the lives of Phú and his pregnant wife Thảo spiral further into darkness when Phú’s mother, Mrs. Thuận, dies because the family cannot afford her medical treatment. In desperation, Thảo follows the advice of Mrs. Tánh—a neighbor who performs spiritual rituals—and summons a wandering spirit to become a household ghost, believing it will protect their home and unborn child. But when the entity hidden within the corner of the house begins to demand its debt, Thảo realizes in horror that the thing she invited in to save her family is, in fact, a nightmare with no escape.",
  "Crooked Heart": "A brutal murder shocks a quiet town. When the mutilated body of a woman is discovered, all suspicion turns toward Sơn — who may have been her lover. Triết, a renowned sculptor, is torn between doubt and brotherly love as he and his wife struggle to prove Sơn’s innocence. In the end, the question remains: is Sơn a killer, a victim of cruel fate, or a lost soul consumed by a love so destructive it leads to his own ruin?",
  "Where It Began": "When Mr. Quang’s extended family returns to their hometown to perform a long-delayed reburial ritual, they find themselves not only confronting ancient spiritual traditions but also awakening a generational cycle of karmic retribution.",
  "The Partner": "The Partner is a 2013 Japanese-Vietnamese historical telefilm based on the true story of the Vietnamese independence fighter Phan Bội Châu and his Japanese friend Asaba Sakitaro. The film aired on September 29, 2013 on Vietnam Television in Vietnam and Tokyo Broadcasting System Television in Japan.",
  "Antithesis of Gemini": "Nhơn, a successful businessman who rose to power through deceit and manipulation, turns to a dark ritual known as “Thai Chiêu Tài” to preserve his fortune — only to awaken haunting memories from the past and the weight of generational trauma.",
  "Hollow": "A young girl falls into a river and drowns. When her body is found in a remote village along the river, her uncle arrives to claim her body, only to find that she is very much alive. But when she returns to her family, unexplainable occurrences lead them to believe she is possessed.",
  "Mr. Hero": "While scrambling to provide for his ill daughter, a taxi driver becomes embroiled in a major charity scam."
};


// ==========================================
// SEED FUNCTIONS
// ==========================================
async function seedMySQL() {
  console.log('🌱 Seeding MySQL...');
  const conn = await connectMySQL();
  if (!conn) return;

  try {
    // Clear old data
    await conn.query('DELETE FROM movies');
    await conn.query('DELETE FROM categories');
    await conn.query('ALTER TABLE categories AUTO_INCREMENT = 1');
    await conn.query('ALTER TABLE movies AUTO_INCREMENT = 1');

    // Insert categories
    for (const cat of categories) {
      await conn.query('INSERT INTO categories (name, description) VALUES (?, ?)', [cat.name, cat.description]);
    }
    const [cats] = await conn.query('SELECT * FROM categories');
    console.log(`  ✅ ${cats.length} categories inserted.`);

    const catMap = {};
    cats.forEach(c => catMap[c.name] = c.id);

    // Insert movies
    const allMovies = [
      ...phimBo.map(m => ({ ...m, category_id: catMap['Phim Bộ'] })),
      ...phimDienAnh.map(m => ({ ...m, category_id: catMap['Phim Điện Ảnh'] })),
      ...galaxyPlay.map(m => ({ ...m, category_id: catMap['Galaxy Play'] }))
    ];



    allMovies.forEach(m => {
      if (movieDescriptions[m.title]) {
        m.description = movieDescriptions[m.title];
      } else if (m.title.includes('Siêu Đạo Chích Kid')) {
        const epMatch = m.title.match(/Phần (\d+)/);
        if (epMatch) m.description = `Đây là tập ${epMatch[1]} trong chuỗi phim về Siêu Đạo Chích Kaito Kid (1412) với những màn ảo thuật trộm cắp đỉnh cao và những cuộc đấu trí nghẹt thở.`;
      } else {
        m.description = 'Chưa có mô tả cho phim này.';
      }
      m.video_url = m.title.includes('Siêu Đạo Chích Kid')
        ? 'https://www.youtube.com/embed/9G3Xg_v1GGE'
        : 'https://www.youtube.com/embed/j_sJ8mY3Lqk';
    });

    for (const m of allMovies) {
      await conn.query(
        'INSERT INTO movies (category_id, title, description, poster_url, video_url, rating) VALUES (?, ?, ?, ?, ?, ?)',
        [m.category_id, m.title, m.description || '', m.image, m.video_url || '', m.rating]
      );
    }
    console.log(`  ✅ ${allMovies.length} movies inserted.`);
  } catch (err) {
    console.error('❌ MySQL Seed Error:', err.message);
  } finally {
    await conn.end();
  }
}

async function seedSQLServer() {
  console.log('\n🌱 Seeding SQL Server...');
  const pool = await connectSQLServer();
  if (!pool) return;

  try {
    // Clear old data
    await pool.request().query('DELETE FROM movies');
    await pool.request().query('DELETE FROM categories');
    await pool.request().query("DBCC CHECKIDENT ('categories', RESEED, 0)");
    await pool.request().query("DBCC CHECKIDENT ('movies', RESEED, 0)");

    // Insert categories
    for (const cat of categories) {
      await pool.request()
        .input('name', sql.NVarChar, cat.name)
        .input('desc', sql.NVarChar, cat.description)
        .query('INSERT INTO categories (name, description) VALUES (@name, @desc)');
    }
    const catResult = await pool.request().query('SELECT * FROM categories');
    console.log(`  ✅ ${catResult.recordset.length} categories inserted.`);

    const catMap = {};
    catResult.recordset.forEach(c => catMap[c.name] = c.id);

    // Insert movies
    const allMovies = [
      ...phimBo.map(m => ({ ...m, category_id: catMap['Phim Bộ'] })),
      ...phimDienAnh.map(m => ({ ...m, category_id: catMap['Phim Điện Ảnh'] })),
      ...galaxyPlay.map(m => ({ ...m, category_id: catMap['Galaxy Play'] }))
    ];

    allMovies.forEach(m => {
      if (movieDescriptions[m.title]) {
        m.description = movieDescriptions[m.title];
      } else if (m.title.includes('Siêu Đạo Chích Kid')) {
        const epMatch = m.title.match(/Phần (\d+)/);
        if (epMatch) m.description = `Đây là tập ${epMatch[1]} trong chuỗi phim về Siêu Đạo Chích Kaito Kid (1412) với những màn ảo thuật trộm cắp đỉnh cao và những cuộc đấu trí nghẹt thở.`;
      } else {
        m.description = 'Chưa có mô tả cho phim này.';
      }
      m.video_url = m.title.includes('Siêu Đạo Chích Kid')
        ? 'https://www.youtube.com/embed/9G3Xg_v1GGE'
        : 'https://www.youtube.com/embed/j_sJ8mY3Lqk';
    });

    for (const m of allMovies) {
      await pool.request()
        .input('cat_id', sql.Int, m.category_id)
        .input('title', sql.NVarChar, m.title)
        .input('desc', sql.NVarChar, m.description || '')
        .input('poster', sql.NVarChar, m.image)
        .input('video', sql.NVarChar, m.video_url || '')
        .input('rating', sql.Decimal(3, 1), m.rating)
        .query('INSERT INTO movies (category_id, title, description, poster_url, video_url, rating) VALUES (@cat_id, @title, @desc, @poster, @video, @rating)');
    }
    console.log(`  ✅ ${allMovies.length} movies inserted.`);
  } catch (err) {
    console.error('❌ SQL Server Seed Error:', err.message);
  } finally {
    await pool.close();
  }
}

async function run() {
  await seedMySQL();
  await seedSQLServer();
  console.log('\n🎉 Database Seeding Complete!');
  process.exit(0);
}

run();
