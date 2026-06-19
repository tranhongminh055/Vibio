import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saoSeason1, saoSeason2, saoSeason3 } from '../data/saoData';
import { Play, Star, ChevronDown, ChevronUp } from 'lucide-react';
import attackOnTitanData from '../data/attackOnTitanData';
import './HomePage.css'; // Reusing global styles for simplicity
import './WatchPage.css';

const CategoryPage = ({ title }) => {
  const [expandedSeason, setExpandedSeason] = useState(null);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalPlaying, setModalPlaying] = useState(false);
  const [modalControlsVisible, setModalControlsVisible] = useState(false);
  const controlsTimerRef = React.useRef(null);
  const bgVideoRef = useRef(null);

  /* Auto-unmute video nền khi user tương tác */
  useEffect(() => {
    const unmute = () => {
      if (bgVideoRef.current) {
        bgVideoRef.current.muted = false;
        bgVideoRef.current.play().catch(() => {});
      }
      document.removeEventListener('click', unmute);
      document.removeEventListener('keydown', unmute);
      document.removeEventListener('touchstart', unmute);
    };
    document.addEventListener('click', unmute, { once: true });
    document.addEventListener('keydown', unmute, { once: true });
    document.addEventListener('touchstart', unmute, { once: true });
    return () => {
      document.removeEventListener('click', unmute);
      document.removeEventListener('keydown', unmute);
      document.removeEventListener('touchstart', unmute);
    };
  }, []);

  const videoBg = (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      <video
        ref={bgVideoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.25) saturate(0.7)',
        }}
      >
        <source src="/videos/Resident Evil 9 Requiem - Official Trailer  State of Play 2026 - IGN (1080p, h264).mp4" type="video/mp4" />
      </video>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 100%)'
      }} />
    </div>
  );
  let movies = [];
  if (title === 'Phim Bộ') {
    movies = [
      {
        id: 1,
        title: "Resident Evil (2002)",
        image: "https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Resident_evil_ver4.jpg/250px-Resident_evil_ver4.jpg",
        rating: "6.7",
        isNew: false
      },
      {
        id: 2,
        title: "Resident Evil: Apocalypse (2004)",
        image: "https://cdn.kinocheck.com/i/tyssb9apzs.jpg",
        rating: "6.2",
        isNew: false
      },
      {
        id: 3,
        title: "Resident Evil: Extinction (2007)",
        image: "https://m.media-amazon.com/images/M/MV5BYmJhOWZhNGEtZDg1YS00NmQ0LTljZDctYmMwYWE1Yjg5ZjdmXkEyXkFqcGc@._V1_.jpg",
        rating: "6.3",
        isNew: false
      },
      {
        id: 4,
        title: "Resident Evil: Afterlife (2010)",
        image: "https://cdn.kinocheck.com/i/18o52mu7dn.jpg",
        rating: "5.8",
        isNew: false
      },
      {
        id: 5,
        title: "Resident Evil: Retribution (2012)",
        image: "https://play-lh.googleusercontent.com/1w4jjGZGfOzMepFHSDRhQL7bsmQr-iy1kkwEmqg8DInmX4tZ5CbsqzWcJvHn4ryRscQ=w240-h480-rw",
        rating: "5.4",
        isNew: false
      },
      {
        id: 6,
        title: "Resident Evil: The Final Chapter (2016)",
        image: "https://tse4.mm.bing.net/th/id/OIP.CZrLQM7RdQORtA9AwsdSEgHaLH?pid=Api&h=220&P=0",
        rating: "5.5",
        isNew: false
      },
      {
        id: 7,
        title: "Resident Evil: Welcome to Raccoon City (2021)",
        image: "https://image.tmdb.org/t/p/original/7uRbWOXxpWDMtnsd2PF3clu65jc.jpg",
        rating: "5.2",
        isNew: true
      }
    ];
  } else if (title === 'Phim Điện Ảnh') {
    movies = [];
    const conanPosters = [
      "https://image.tmdb.org/t/p/w500/ksQ8uNgoWsVH6a0oPB6zx08pOwU.jpg",
      "https://image.tmdb.org/t/p/w500/d08RKnmdcoCwlHOezazli8hmJH6.jpg",
      "https://image.tmdb.org/t/p/w500/1wl6eAHbIDSz61tGwYTOKlSRvZb.jpg",
      "https://image.tmdb.org/t/p/w500/p1RaB4tvdPg49IlfIdI333ChtGs.jpg",
      "https://image.tmdb.org/t/p/w500/9bNsqXpPKSdcqPeBgWg9HsrwYJe.jpg",
      "https://image.tmdb.org/t/p/w500/pXYeXuomi8EpXsXO4cvt5mdfSCD.jpg",
      "https://image.tmdb.org/t/p/w500/9wUk85WRQrAxTOgxjdPwrmVQ2Se.jpg",
      "https://image.tmdb.org/t/p/w500/wowJzvF1KqEFSZoArkgngRy1r4L.jpg",
      "https://image.tmdb.org/t/p/w500/1rqrypnOq4cuwzobGW9gQgarkSr.jpg",
      "https://image.tmdb.org/t/p/w500/1X4oWU6r5IUO5e0ZgeT3GdvJbRC.jpg",
      "https://image.tmdb.org/t/p/w500/2VeFtO78EEeVvKDfDNsYoTmVL23.jpg",
      "https://image.tmdb.org/t/p/w500/phTv5vD6nLCLrtUKWRHMBJGU7Bi.jpg",
      "https://image.tmdb.org/t/p/w500/o0ta1yBaKQRjEWLhOU8jmE9TdGa.jpg",
      "https://image.tmdb.org/t/p/w500/AbgADjLIYoLAc3mayVWGBWSbjT.jpg",
      "https://image.tmdb.org/t/p/w500/4nWSBZBOP6NSGuBoGQEiIg03lJg.jpg",
      "https://image.tmdb.org/t/p/w500/42bSt7mjvbn5QvYzwsCYT3RDju4.jpg",
      "https://image.tmdb.org/t/p/w500/ctboIRYQHYJMge6M6fgcwrhREsj.jpg",
      "https://image.tmdb.org/t/p/w500/enhiUd7MOuLjKa4NkZmLaN7dDWH.jpg",
      "https://image.tmdb.org/t/p/w500/qxq2TfGy1Vfh9miCjKPo0nNxmW6.jpg",
      "https://image.tmdb.org/t/p/w500/zfsLhI6yAHH9pdhY6EConmUCumX.jpg",
      "https://image.tmdb.org/t/p/w500/yRUaLS5osgDO6AqiFVnNPK9sThZ.jpg",
      "https://image.tmdb.org/t/p/w500/q2v6JmGMVQR0UhUirXuuzXUcAnN.jpg",
      "https://image.tmdb.org/t/p/w500/qsP5o8Z5xPgjnerByjHzOq1MUI0.jpg",
      "https://image.tmdb.org/t/p/w500/y23gqg2y2ckCcqjhe4WKlIHq63B.jpg",
      "https://image.tmdb.org/t/p/w500/fPYveL8hkrymMzrUgTt9uIm652Q.jpg",
      "https://image.tmdb.org/t/p/w500/kthV4ZwXO37pfCFTbX1cHOYie4r.jpg",
      "https://image.tmdb.org/t/p/w500/hyLW346kEV7E8GgibUGeG7pNSFO.jpg",
      "https://image.tmdb.org/t/p/w500/3qiBRbIsfpw6O32TfD1FZ81MiKw.jpg",
      "https://image.tmdb.org/t/p/w500/4QtpfeGuxWbfLMgBiP3u3MVws9M.jpg",
      "https://image.tmdb.org/t/p/w500/1DHVPVYuTzNBh9dcga5wgGzpPpf.jpg",
      "https://image.tmdb.org/t/p/w500/58GjBFN6wMrArZrQ0OKdowE8cBD.jpg",
      "https://image.tmdb.org/t/p/w500/3q6Ao6VjDvDYBgLGtO302p9NS2g.jpg",
      "https://image.tmdb.org/t/p/w500/nwYRkqjrfISXN9vzpb6ws4j4k2h.jpg",
      "https://image.tmdb.org/t/p/w500/p2EGTldR2bMXGaCDjxVrZr3g1e9.jpg",
      "https://image.tmdb.org/t/p/w500/5oBVUUXDjURVTQ6x3aqiXG4GtHV.jpg",
      "https://image.tmdb.org/t/p/w500/uyiRtcWKUpAR8adqvf3j4sd0lT3.jpg",
      "https://image.tmdb.org/t/p/w500/sOsRgDExeL3MXGNAKhT7X0I8QPq.jpg",
      "https://image.tmdb.org/t/p/w500/7Vq3HGbKwCLxgAQURTUE4Ub5DdJ.jpg",
      "https://image.tmdb.org/t/p/w500/2Exgb8qGA0AoVdnA6bRZd48xxD.jpg",
      "https://image.tmdb.org/t/p/w500/d4GH7CBECElEzyaJrVZm0mOI06S.jpg"
    ];
    // Tự động tạo 100 phần phim Siêu Đạo Chích Kid
    for (let i = 1; i <= 100; i++) {
      movies.push({
        id: i + 7, // Bắt đầu từ ID 8 để không trùng với Resident Evil
        title: `Siêu Đạo Chích Kid - Phần ${i}`,
        image: conanPosters[(i - 1) % conanPosters.length].replace('media.themoviedb.org', 'image.tmdb.org'), // Dùng luân phiên các poster Conan/Kaito Kid
        rating: (Math.random() * (9.5 - 8.0) + 8.0).toFixed(1),
        isNew: i >= 95
      });
    }
  } else if (title === 'Galaxy Play') {
    movies = [
      { id: 200, title: "Mai (2024)", image: "https://image.tmdb.org/t/p/w500/z9zR8RIr5Z5erj2fI4qLK7KHRJT.jpg", rating: "8.5", isNew: true },
      { id: 201, title: "Nhà Bà Nữ (2023)", image: "https://image.tmdb.org/t/p/w500/aGFWJOyUMq2EMtisNZCM2chXf8p.jpg", rating: "8.1", isNew: false },
      { id: 202, title: "Bố Già (2021)", image: "https://image.tmdb.org/t/p/w500/ucXxqYqNLjZ3auyLTzU9NsClsms.jpg", rating: "7.9", isNew: false },
      { id: 203, title: "Đất Rừng Phương Nam (2023)", image: "https://image.tmdb.org/t/p/w500/nZ7lLEdv9PKZkO6y19Z42MbFmke.jpg", rating: "8.0", isNew: false },
      { id: 204, title: "Em Và Trịnh (2022)", image: "https://image.tmdb.org/t/p/w500/x72eRMK9GzYVVER04hEsLxhWeUb.jpg", rating: "7.5", isNew: false },
      { id: 205, title: "Tiệc Trăng Máu (2020)", image: "https://image.tmdb.org/t/p/w500/1gtr8Js6yS7gWrQylbIK4sGQGih.jpg", rating: "8.2", isNew: false },
      { id: 206, title: "Mắt Biếc (2019)", image: "https://image.tmdb.org/t/p/w500/fSDrH9rI2TgMqcYb05qw8cLtXmS.jpg", rating: "8.0", isNew: false },
      { id: 207, title: "Hai Phượng (2019)", image: "https://image.tmdb.org/t/p/w500/6LON0M5qfRb8M2XqKnUvOpCBq3Z.jpg", rating: "7.7", isNew: false },
      { id: 208, title: "Cua Lại Vợ Bầu (2019)", image: "https://image.tmdb.org/t/p/w500/mXQ3OxsoRuals78R5IWlY42Rvv9.jpg", rating: "7.4", isNew: false },
      { id: 209, title: "Gái Già Lắm Chiêu 3 (2020)", image: "https://image.tmdb.org/t/p/w500/jXgHbZ5gEnZc6izj4CjMh8caIrc.jpg", rating: "7.2", isNew: false },
      { id: 210, title: "Ròm (2019)", image: "https://image.tmdb.org/t/p/w500/a3mFE5h1THftDfa6RjzMvsyticc.jpg", rating: "7.6", isNew: false },
      { id: 211, title: "Lật Mặt 6: Tấm Vé Định Mệnh (2023)", image: "https://image.tmdb.org/t/p/w500/3ym9JhjqUu5jKCWxtKVF86Sw4gD.jpg", rating: "8.3", isNew: false },
      { id: 212, title: `Chị Chị Em Em 2`, image: "https://image.tmdb.org/t/p/w500/qMD2zbQy7fl4J8BZpdYcCWtjp1S.jpg", rating: "7.0", isNew: false },
      { id: 213, title: `Bẫy Rồng`, image: "https://image.tmdb.org/t/p/w500/LwAmk0IFyZYxfmD0TH8GKZyzGZ.jpg", rating: "5.0", isNew: false },
      { id: 214, title: `Lửa Phật`, image: "https://image.tmdb.org/t/p/w500/o4oAN2nsMnwVHbjPjKN8pcDsR2b.jpg", rating: "5.6", isNew: false },
      { id: 215, title: `Hoàng Tử Quỷ`, image: "https://image.tmdb.org/t/p/w500/pX8kCc2ZP82rAZ8IwDsdun1FCAD.jpg", rating: "8.8", isNew: false },
      { id: 216, title: `Hạnh Phúc Của Mẹ`, image: "https://image.tmdb.org/t/p/w500/bKsXUfvljPjYfytKcjw5FbRHT09.jpg", rating: "8.4", isNew: false },
      { id: 217, title: `Phim Hồng`, image: "https://image.tmdb.org/t/p/w500/7dHiq9so6XkeyMX2bESUya9T5ZB.jpg", rating: "8.6", isNew: false },
      { id: 218, title: `Em Chưa 18`, image: "https://image.tmdb.org/t/p/w500/phXbIGRmNZduZwnBjC0dBZfn8lr.jpg", rating: "6.6", isNew: false },
      { id: 219, title: `Lật Mặt 7: Một Điều Ước`, image: "https://image.tmdb.org/t/p/w500/aSPg7viRKZUp6py0VLVTv6mo3GN.jpg", rating: "7.3", isNew: true },
      { id: 222, title: `Làng Địa Ngục`, image: "https://image.tmdb.org/t/p/w500/jt31qZw5W1RFXfGyTJCpgjvq2h1.jpg", rating: "5.1", isNew: false },
      { id: 223, title: `Bi, Đừng Sợ`, image: "https://image.tmdb.org/t/p/w500/lotXs0yvfPvhFCVXjnUsxLLMC2h.jpg", rating: "5.3", isNew: false },
      { id: 224, title: `Nước, Giấy, Tóc...`, image: "https://image.tmdb.org/t/p/w500/4z2v3v2v4y54oABfqtAwmB0YCep.jpg", rating: "8.7", isNew: false },
      { id: 225, title: `Trái Tim Quái Vật`, image: "https://image.tmdb.org/t/p/w500/7wY6QzqRYIOPfOTl1CskFYHP7RE.jpg", rating: "3.0", isNew: false },
      { id: 226, title: `Nhà Bà Nữ`, image: "https://image.tmdb.org/t/p/w500/aGFWJOyUMq2EMtisNZCM2chXf8p.jpg", rating: "5.8", isNew: false },
      { id: 227, title: `Mùi Đu Đủ Xanh`, image: "https://image.tmdb.org/t/p/w500/p9lJFQ54IiNqN4fcmn5JxXdqQtR.jpg", rating: "7.0", isNew: false },
      { id: 228, title: `Xích Lô`, image: "https://image.tmdb.org/t/p/w500/mdOsnSVTLwHMEH1juOLMiwXcO5o.jpg", rating: "7.0", isNew: false },
      { id: 229, title: `Báu Vật Trời Cho`, image: "https://image.tmdb.org/t/p/w500/mnOMG35LRwN9w0W1FD2MQI9X6zx.jpg", rating: "6.0", isNew: false },
      { id: 232, title: `Quỷ Huyết`, image: "https://image.tmdb.org/t/p/w500/1c5XWuA9ETEUZcMAF1ngk0kBNEh.jpg", rating: "7.5", isNew: false },
      { id: 233, title: `Quán Trọ Kỳ Nam`, image: "https://image.tmdb.org/t/p/w500/6Av8MS7I5K251bMofglA9Qv2Xaa.jpg", rating: "7.5", isNew: false },
      { id: 234, title: `Con Ma Nhà Họ Hứa`, image: "https://image.tmdb.org/t/p/w500/nNWl7tRoHDW2PpfEDr6weAa675i.jpg", rating: "8.6", isNew: false },
      { id: 235, title: `Bến Phà Xác Sống`, image: "https://image.tmdb.org/t/p/w500/bnlYmSzp9Uh0ZPPyDj26XwAaVH2.jpg", rating: "7.0", isNew: false },
      { id: 236, title: `Mõm Đỏ`, image: "https://image.tmdb.org/t/p/w500/bm2JMrOq8cUlA287CZ1vCyRPeSH.jpg", rating: "4.7", isNew: false },
      { id: 237, title: `Gái Già Lắm Chiêu`, image: "https://image.tmdb.org/t/p/w500/5RIUCFKFXifRX2xcVPRJX2eLqM4.jpg", rating: "5.0", isNew: false },
      { id: 238, title: `Cô Ba Sài Gòn`, image: "https://image.tmdb.org/t/p/w500/9QfL4NmXxkNPevs7htzfPwAmvoa.jpg", rating: "6.1", isNew: false },
      { id: 239, title: `Để Mai Tính 2`, image: "https://image.tmdb.org/t/p/w500/lkALlAuDv5Hmsh9vyW6b4Xftsau.jpg", rating: "7.4", isNew: false },
      { id: 242, title: `Thiên Thần Hộ Mệnh`, image: "https://image.tmdb.org/t/p/w500/oLpOpsZx8DJxlwNjjdROtuzHfXp.jpg", rating: "6.5", isNew: false },
      { id: 243, title: `Chuyến Bay Bão Táp`, image: "https://image.tmdb.org/t/p/w500/y0t53XosZnJ5wjiORvZqobZPmJF.jpg", rating: "6.3", isNew: false },
      { id: 244, title: `Cô Hầu Gái`, image: "https://image.tmdb.org/t/p/w500/5sYJDnC2iN1zcVfoqIkPtufV4L4.jpg", rating: "5.9", isNew: false },
      { id: 245, title: `Thám Tử Kiên`, image: "https://image.tmdb.org/t/p/w500/sTW271wUWjbvRXPqD9xexnLAvnl.jpg", rating: "7.8", isNew: false },
      { id: 246, title: `Hoa Hồng Đen`, image: "https://image.tmdb.org/t/p/w500/r08WvIDBbosBvymZQyvQypYdbjK.jpg", rating: "5.0", isNew: false },
      { id: 247, title: `Việt Yêu Dấu`, image: "https://image.tmdb.org/t/p/w500/uX3RSsb1Wp3Su9snqMD0EEIadHJ.jpg", rating: "7.7", isNew: false },
      { id: 248, title: `578: Phát Đạn Của Kẻ Điên`, image: "https://image.tmdb.org/t/p/w500/8Nw5v7wPfa2FwbKyx61K2nIBcKa.jpg", rating: "6.0", isNew: false },
      { id: 249, title: `Việt và Nam`, image: "https://image.tmdb.org/t/p/w500/axtvB6qoORMZQ2qPZdaFcBOM8g3.jpg", rating: "7.0", isNew: true },
      { id: 252, title: `Quỷ Nhập Tràng`, image: "https://img.ophim.live/uploads/movies/quy-nhap-trang-poster.jpg", rating: "5.0", isNew: true },
      { id: 253, title: `Trái Tim Tội Lỗi`, image: "https://image.tmdb.org/t/p/w500/z8LNpP0fd5NTSFi4i1M30dzLHiQ.jpg", rating: "6.0", isNew: false },
      { id: 254, title: `Nơi Bắt Đầu`, image: "https://image.tmdb.org/t/p/w500/qxQEzKp5WI5Ra9joAt4KVv4LdM7.jpg", rating: "8.7", isNew: false },
      { id: 255, title: `Người Cộng Sự`, image: "https://image.tmdb.org/t/p/w500/fQVqjqZtvQORnOB4uR0QVXkTqFQ.jpg", rating: "8.2", isNew: false },
      { id: 256, title: `Bản Sao Nghịch Giới`, image: "https://image.tmdb.org/t/p/w500/xYDG2xUS5WRG4PURJh5bxIO6dYI.jpg", rating: "7.0", isNew: false },
      { id: 257, title: `Đoạt Hồn`, image: "https://image.tmdb.org/t/p/w500/cefUKWm7mNPodfUVkTzpLz1HQKk.jpg", rating: "7.4", isNew: false },
      { id: 258, title: `Siêu Cấp Anh Hùng`, image: "https://image.tmdb.org/t/p/w500/gDc2FCkTFfUg7MWpp7zm0D0b48h.jpg", rating: "8.0", isNew: false },
    ];
  } else if (title === 'Phim Hành Động') {
    movies = [
      { id: 'wwz', title: 'World War Z', image: 'https://upload.wikimedia.org/wikipedia/en/d/dc/World_War_Z_poster.jpg', rating: '7.0', isNew: true },
      { id: 'ttb', title: 'Train to Busan', image: 'https://upload.wikimedia.org/wikipedia/en/9/95/Train_to_Busan.jpg', rating: '7.6', isNew: true },
      { id: 'jp1', title: 'Công Viên Kỷ Jura Phần 1', image: 'https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg', rating: '8.2', isNew: false },
      { id: 'jp2', title: 'Công Viên Kỷ Jura Phần 2', image: 'https://upload.wikimedia.org/wikipedia/en/c/cc/The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg', rating: '6.5', isNew: false },
    ];
  } else if (title === 'Truyền hình') {
    movies = [
      { id: "sat-thu-john-wick", title: "Sát Thủ John Wick", image: "https://img.ophim.live/uploads/movies/sat-thu-john-wick-poster.jpg", rating: "7.4", isNew: false },
      { id: "sat-thu-john-wick-2", title: "Sát Thủ John Wick 2", image: "https://img.ophim.live/uploads/movies/sat-thu-john-wick-2-poster.jpg", rating: "7.3", isNew: false },
      { id: "sat-thu-john-wick-3-chuan-bi-chien-tranh", title: "Sát Thủ John Wick 3", image: "https://img.ophim.live/uploads/movies/sat-thu-john-wick-3-chuan-bi-chien-tranh-poster.jpg", rating: "7.4", isNew: false },
      { id: "sat-thu-john-wick-phan-4", title: "Sát Thủ John Wick 4", image: "https://img.ophim.live/uploads/movies/sat-thu-john-wick-phan-4-poster.jpg", rating: "7.8", isNew: false },
      { id: "khach-san-continental-tu-the-gioi-cua-john-wick", title: "Khách Sạn Continental", image: "https://img.ophim.live/uploads/movies/khach-san-continental-tu-the-gioi-cua-john-wick-poster.jpg", rating: "7.5", isNew: true },
      { id: "tu-vu-tru-john-wick-ballerina", title: "Ballerina", image: "https://img.ophim.live/uploads/movies/tu-vu-tru-john-wick-ballerina-poster.jpg", rating: "NR", isNew: true }
    ];
  } else if (title === 'HBO GO') {
    movies = [
      { id: "thanh-guom-diet-quy-asakusa", title: "Movie: Huyết Quỷ Asakusa", image: "https://img.ophim.live/uploads/movies/thanh-guom-diet-quy-asakusa-poster.jpg", rating: "8.5", isNew: false },
      { id: "thanh-guom-diet-quy-dinh-thu-tsuzumi", title: "Movie: Dinh Thự Tsuzumi", image: "https://img.ophim.live/uploads/movies/thanh-guom-diet-quy-dinh-thu-tsuzumi-poster.jpg", rating: "8.4", isNew: false },
      { id: "thanh-guom-diet-quy-nui-nhen-nada", title: "Movie: Núi Nhện Nada", image: "https://img.ophim.live/uploads/movies/thanh-guom-diet-quy-nui-nhen-nada-poster.jpg", rating: "8.8", isNew: false },
      { id: "thanh-guom-diet-quy-hoi-nghi-tru-cot-dinh-thu-buom-buom", title: "Movie: Hội Nghị Trụ Cột", image: "https://img.ophim.live/uploads/movies/thanh-guom-diet-quy-hoi-nghi-tru-cot-dinh-thu-buom-buom-poster.jpg", rating: "8.7", isNew: false },
      { id: "thanh-guom-diet-quy-chuyen-tau-vo-tan", title: "Movie: Chuyến Tàu Vô Tận", image: "https://img.ophim.live/uploads/movies/thanh-guom-diet-quy-chuyen-tau-vo-tan-poster.jpg", rating: "8.9", isNew: false },
      { id: "thanh-guom-diet-quy-vo-han-thanh", title: "Movie: Vô Hạn Thành", image: "https://img.ophim.live/uploads/movies/thanh-guom-diet-quy-vo-han-thanh-poster.jpg", rating: "NR", isNew: true },
    ];
  } else if (title === 'Thiếu nhi') {
    movies = [
      { id: "doraemon-doi-ban-than", title: "Doraemon: Đôi Bạn Thân", image: "https://img.ophim.live/uploads/movies/doraemon-doi-ban-than-poster.jpg", rating: "7.4", isNew: false },
      { id: "doraemon-doi-ban-than-2", title: "Doraemon: Đôi Bạn Thân 2", image: "https://img.ophim.live/uploads/movies/doraemon-doi-ban-than-2-poster.jpg", rating: "7.5", isNew: false },
      { id: "doraemon-nobita-va-nhung-hiep-si-khong-gian", title: "Nobita Và Hiệp Sĩ Không Gian", image: "https://img.ophim.live/uploads/movies/doraemon-nobita-va-nhung-hiep-si-khong-gian-poster.jpg", rating: "6.8", isNew: false },
      { id: "doraemon-nobita-va-nhung-ban-khung-long-moi", title: "Nobita Và Những Bạn Khủng Long Mới", image: "https://img.ophim.live/uploads/movies/doraemon-nobita-va-nhung-ban-khung-long-moi-poster.jpg", rating: "7.1", isNew: false },
      { id: "doraemon-nobita-va-cuoc-chien-vu-tru-ti-hon", title: "Nobita Và Cuộc Chiến Vũ Trụ Tí Hon", image: "https://img.ophim.live/uploads/movies/doraemon-nobita-va-cuoc-chien-vu-tru-ti-hon-poster.jpg", rating: "6.9", isNew: false },
      { id: "doraemon-nobita-va-vung-dat-ly-tuong-tren-bau-troi", title: "Nobita Và Vùng Đất Lý Tưởng", image: "https://img.ophim.live/uploads/movies/doraemon-nobita-va-vung-dat-ly-tuong-tren-bau-troi-poster.jpg", rating: "7.3", isNew: true },
      { id: "doraemon-nobita-va-binh-doan-nguoi-sat", title: "Nobita Và Binh Đoàn Người Sắt", image: "https://img.ophim.live/uploads/movies/doraemon-nobita-va-binh-doan-nguoi-sat-poster.jpg", rating: "8.0", isNew: false },
      { id: "doraemon-nobita-va-cuoc-dai-thuy-chien-o-xu-so-nguoi-ca", title: "Đại Thủy Chiến Người Cá", image: "https://img.ophim.live/uploads/movies/doraemon-nobita-va-cuoc-dai-thuy-chien-o-xu-so-nguoi-ca-poster.jpg", rating: "7.8", isNew: false },
    ];
  } else {
    // If it's Phim Xu Hướng, don't show the generic movies grid if we don't want to
    if (title !== 'Phim Xu Hướng') {
      movies = Array.from({ length: 12 }).map((_, i) => ({
        id: i + 15,
        title: `${title} - Phim ${i + 1}`,
        image: `https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop&sig=${i}`,
        rating: (Math.random() * (5 - 3) + 3).toFixed(1),
        isNew: i < 3
      }));
    } else {
      movies = []; // Empty for Phim Xu Hướng for now, or you can populate it later
    }
  }

  let cyberpunkMovies = [];
  if (title === 'Phim Hành Động') {
    cyberpunkMovies = [
      { id: 'cp-1', title: 'Phần 1 - Tập 1: Let You Down', image: 'https://static.tvmaze.com/uploads/images/original_untouched/421/1054910.jpg', rating: '8.5', isNew: false },
      { id: 'cp-2', title: 'Phần 1 - Tập 2: Like a Boy', image: 'https://static.tvmaze.com/uploads/images/original_untouched/421/1054911.jpg', rating: '8.6', isNew: false },
      { id: 'cp-3', title: 'Phần 1 - Tập 3: Smooth Criminal', image: 'https://static.tvmaze.com/uploads/images/original_untouched/421/1054912.jpg', rating: '8.5', isNew: false },
      { id: 'cp-4', title: 'Phần 1 - Tập 4: Lucky You', image: 'https://static.tvmaze.com/uploads/images/original_untouched/421/1054913.jpg', rating: '8.8', isNew: false },
      { id: 'cp-5', title: 'Phần 1 - Tập 5: All Eyez On Me', image: 'https://static.tvmaze.com/uploads/images/original_untouched/421/1054914.jpg', rating: '8.7', isNew: false },
      { id: 'cp-6', title: 'Phần 1 - Tập 6: Girl on Fire', image: 'https://static.tvmaze.com/uploads/images/original_untouched/421/1054915.jpg', rating: '9.2', isNew: false },
      { id: 'cp-7', title: 'Phần 1 - Tập 7: Stronger', image: 'https://static.tvmaze.com/uploads/images/original_untouched/421/1054916.jpg', rating: '8.9', isNew: false },
      { id: 'cp-8', title: 'Phần 1 - Tập 8: Stay', image: 'https://static.tvmaze.com/uploads/images/original_untouched/421/1054917.jpg', rating: '9.1', isNew: false },
      { id: 'cp-9', title: 'Phần 1 - Tập 9: Humanity', image: 'https://static.tvmaze.com/uploads/images/original_untouched/421/1054918.jpg', rating: '9.0', isNew: false },
      { id: 'cp-10', title: 'Phần 1 - Tập 10: My Moon My Man', image: 'https://static.tvmaze.com/uploads/images/original_untouched/421/1054919.jpg', rating: '9.5', isNew: false },
      { id: 'cp2-1', title: 'Phần 2 - Tập 1: Dogtown', image: 'https://static.tvmaze.com/uploads/images/original_untouched/498/1246519.jpg', rating: '9.8', isNew: true },
      { id: 'cp2-2', title: 'Phần 2 - Tập 2: Hole in the Sky', image: 'https://static.tvmaze.com/uploads/images/original_untouched/498/1246519.jpg', rating: '9.5', isNew: true },
      { id: 'cp2-3', title: 'Phần 2 - Tập 3: Spider and the Fly', image: 'https://static.tvmaze.com/uploads/images/original_untouched/498/1246519.jpg', rating: '9.6', isNew: true },
      { id: 'cp2-4', title: 'Phần 2 - Tập 4: Lucretia My Reflection', image: 'https://static.tvmaze.com/uploads/images/original_untouched/498/1246519.jpg', rating: '9.3', isNew: true },
      { id: 'cp2-5', title: 'Phần 2 - Tập 5: The Damned', image: 'https://static.tvmaze.com/uploads/images/original_untouched/498/1246519.jpg', rating: '9.4', isNew: true },
      { id: 'cp2-6', title: 'Phần 2 - Tập 6: Get It Together', image: 'https://static.tvmaze.com/uploads/images/original_untouched/498/1246519.jpg', rating: '9.7', isNew: true },
      { id: 'cp2-7', title: 'Phần 2 - Tập 7: You Know My Name', image: 'https://static.tvmaze.com/uploads/images/original_untouched/498/1246519.jpg', rating: '9.8', isNew: true },
      { id: 'cp2-8', title: 'Phần 2 - Tập 8: Birds with Broken Wings', image: 'https://static.tvmaze.com/uploads/images/original_untouched/498/1246519.jpg', rating: '9.9', isNew: true },
      { id: 'cp2-9', title: 'Phần 2 - Tập 9: I\'ve Seen That Face Before', image: 'https://static.tvmaze.com/uploads/images/original_untouched/498/1246519.jpg', rating: '9.9', isNew: true },
      { id: 'cp2-10', title: 'Phần 2 - Tập 10: Firestarter', image: 'https://static.tvmaze.com/uploads/images/original_untouched/498/1246519.jpg', rating: '10.0', isNew: true }
    ];
  }

  // If this page is 'TV Show', override the list with VTV channels
  if (title === 'TV Show') {
    // Show 30 episodes of Ông Trùm as individual tiles that link to the channel 900 with ?ep=N
    movies = Array.from({ length: 30 }).map((_, idx) => {
      const ep = idx + 1;
      return {
        id: `ongtrum-${ep}`,
        to: `/watch/900?ep=${ep}`,
        title: `Ông Trùm - Tập ${ep}`,
        image: 'https://img.youtube.com/vi/xT3qQO0jark/hqdefault.jpg',
        rating: `Tập ${ep}`,
        isNew: false
      };
    });
  }

  if (title === 'Phim Xu Hướng') {
    const data = attackOnTitanData;
    return (
      <div className="home-container" style={{ padding: '100px 3rem 2rem 3rem', minHeight: '100vh', background: 'transparent', position: 'relative', zIndex: 1 }}>
        {videoBg}

        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Top Trend</h1>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)', marginTop: '0.5rem' }}></div>
        </div>

        <div style={{ color: '#fff', marginBottom: '2rem', fontSize: '1.1rem' }}>{data.name}</div>

        {data.seasons && data.seasons.length > 0 ? (
          <div>
            {/* Season Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              {data.seasons.map(season => (
                <div
                  key={season.season_number}
                  onClick={() => setExpandedSeason(expandedSeason === season.season_number ? null : season.season_number)}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                    border: expandedSeason === season.season_number ? '2px solid #00d8ff' : '1px solid rgba(255,255,255,0.1)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ aspectRatio: '2/3', width: '100%', overflow: 'hidden', position: 'relative', background: '#111' }}>
                    <img
                      src={season.poster || (data.poster ? data.poster : 'https://via.placeholder.com/200x300')}
                      alt={season.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x300/111/FFF?text=' + encodeURIComponent(season.name); }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                      padding: '16px 8px 8px',
                      color: '#fff'
                    }}>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{season.name}</h3>
                      <div style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '4px' }}>
                        {season.episodes.length} Tập
                      </div>
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: expandedSeason === season.season_number ? 'rgba(0,216,255,0.9)' : 'rgba(0,0,0,0.5)',
                      color: '#fff',
                      borderRadius: '50%',
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.3s'
                    }}>
                      {expandedSeason === season.season_number ? (
                        <ChevronUp size={24} />
                      ) : (
                        <ChevronDown size={24} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Episodes Grid for Expanded Season */}
            {expandedSeason && (
              <div>
                {data.seasons.filter(s => s.season_number === expandedSeason).map(season => (
                  <div key={season.season_number}>
                    <h2 style={{ color: '#00d8ff', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
                      {season.name} — {season.episodes.length} Tập
                    </h2>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                      gap: '1.5rem',
                      marginBottom: '3rem'
                    }}>
                      {season.episodes.map(ep => (
                        <Link
                          to={`/watch/aot-s${season.season_number}-ep${ep.episode_number}`}
                          key={`${season.season_number}-${ep.episode_number}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <div style={{
                            borderRadius: '8px',
                            overflow: 'hidden',
                            background: '#111',
                            border: '1px solid rgba(0,216,255,0.2)',
                            transition: 'transform 0.2s, border-color 0.2s',
                            cursor: 'pointer'
                          }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.02)';
                              e.currentTarget.style.borderColor = 'rgba(0,216,255,0.6)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.borderColor = 'rgba(0,216,255,0.2)';
                            }}
                          >
                            <div style={{ aspectRatio: '16/9', width: '100%', overflow: 'hidden', position: 'relative' }}>
                              <img
                                src={ep.still_path || season.poster || (data.poster ? data.poster : 'https://via.placeholder.com/160x90')}
                                alt={`${data.name} S${season.season_number}E${ep.episode_number}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/160x90/111/FFF?text=Ep+' + ep.episode_number; }}
                              />
                              <div
                                className="movie-overlay"
                                style={{
                                  position: 'absolute',
                                  inset: 0,
                                  background: 'rgba(0,0,0,0)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  opacity: 0,
                                  transition: 'opacity 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                                onClick={(e) => {
                                  // Prevent Link navigation and open inline modal player instead
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const src = `https://vidsrc.to/embed/tv/tt2560140/${season.season_number}/${ep.episode_number}`;
                                  setModalSrc(src);
                                  setModalPlaying(false);
                                  setModalOpen(true);
                                }}
                              >
                                <button
                                  type="button"
                                  style={{
                                    background: '#00d8ff',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 'none',
                                    cursor: 'pointer'
                                  }}
                                >
                                  <Play size={20} fill="#000" color="#000" />
                                </button>
                              </div>
                            </div>
                            <div style={{ padding: '10px', color: '#fff' }}>
                              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                                Tập {ep.episode_number}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: '#aaa', lineHeight: '1.3' }}>
                                {ep.name || `Episode ${ep.episode_number}`}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Inline modal for quick play (prevents full-page provider redirect) */}
            {modalOpen && (
              <div className="embed-modal-backdrop" onClick={() => { setModalOpen(false); setModalPlaying(false); }}>
                <div
                  className="embed-modal-content"
                  onClick={(e) => e.stopPropagation()}
                  onMouseMove={() => {
                    setModalControlsVisible(true);
                    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
                    controlsTimerRef.current = setTimeout(() => setModalControlsVisible(false), 2500);
                  }}
                >
                  <button className="embed-modal-close" onClick={() => { setModalOpen(false); setModalPlaying(false); }}>✕</button>
                  <div style={{ position: 'absolute', left: 16, top: 16, zIndex: 1011, color: '#fff' }}>
                    <div style={{ fontSize: '18px', fontWeight: 800 }}>{data.name}</div>
                    <div style={{ fontSize: '14px', opacity: 0.9, marginTop: 6 }}>S{expandedSeason} • {`Episode ${modalSrc.split('/').pop()}`}</div>
                    <div style={{ marginTop: 8, maxWidth: 480, color: '#ddd', fontSize: 13 }}>
                      {(() => {
                        try {
                          const parts = modalSrc.split('/');
                          const epNum = parts[parts.length - 1] || '';
                          const seasonNum = parts[parts.length - 2] || '';
                          const season = data.seasons.find(s => String(s.season_number) === String(seasonNum));
                          const ep = season ? season.episodes.find(e => String(e.episode_number) === String(epNum)) : null;
                          return ep ? ep.name : 'Play episode in modal or open full player page for more details.';
                        } catch (err) {
                          return 'Play episode in modal or open full player page for more details.';
                        }
                      })()}
                    </div>
                    <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => {
                          // Play in modal by adding autoplay param (provider may honor it)
                          const autoplaySrc = modalSrc.includes('?') ? `${modalSrc}&autoplay=1` : `${modalSrc}?autoplay=1`;
                          setModalSrc(autoplaySrc);
                          setModalPlaying(true);
                        }}
                        style={{ background: '#00d8ff', border: 'none', color: '#000', padding: '8px 12px', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}
                      >Play in Modal</button>
                      <button
                        onClick={() => {
                          // navigate to full watch page
                          // derive season/episode from modalSrc
                          try {
                            const parts = modalSrc.split('/');
                            const epNum = parts[parts.length - 1] || '';
                            const seasonNum = parts[parts.length - 2] || '';
                            navigate(`/watch/aot-s${seasonNum}-ep${epNum}`);
                            setModalOpen(false);
                          } catch (err) {
                            navigate('/');
                          }
                        }}
                        style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '8px 12px', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}
                      >Open Full Player</button>
                    </div>
                  </div>

                  {/* Controls overlay (visual only for iframe embeds) */}
                  <div className={`embed-modal-controls ${modalControlsVisible ? 'visible' : ''}`}>
                    <button className="embed-control-play" onClick={() => {
                      if (modalPlaying) {
                        // try to stop autoplay by removing param
                        const base = modalSrc.split('?')[0];
                        setModalSrc(base);
                        setModalPlaying(false);
                      } else {
                        const autoplaySrc = modalSrc.includes('?') ? `${modalSrc}&autoplay=1` : `${modalSrc}?autoplay=1`;
                        setModalSrc(autoplaySrc);
                        setModalPlaying(true);
                      }
                    }}>{modalPlaying ? '❚❚' : '►'}</button>
                    <div className="modal-progress" onClick={(e) => {
                      // visual only: compute clicked percentage and reflect in UI
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                      const fill = e.currentTarget.querySelector('.modal-progress-fill');
                      if (fill) fill.style.width = `${pct * 100}%`;
                    }}>
                      <div className="modal-progress-fill" style={{ width: modalPlaying ? '40%' : '0%' }} />
                    </div>
                  </div>

                  <iframe
                    className="embed-modal-iframe"
                    src={modalPlaying ? modalSrc : modalSrc}
                    frameBorder="0"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                    title="Quick Player"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ color: '#fff' }}>Chưa có dữ liệu.</div>
        )}

      </div>
    );
  }

  return (
    <div className="home-container" style={{ padding: '100px 3rem 2rem 3rem', minHeight: '100vh', background: 'transparent', position: 'relative', zIndex: 1 }}>
      {videoBg}

      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>{title}</h1>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)', marginTop: '0.5rem' }}></div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1.5rem'
      }}>
        {movies.map(movie => (
          <Link to={movie.to || `/watch/${movie.id}`} key={movie.id} style={{ position: 'relative', cursor: 'pointer', transition: 'transform 0.3s', textDecoration: 'none', color: 'inherit' }} className="movie-card">
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', aspectRatio: '2/3' }}>
              <img
                src={movie.image}
                alt={movie.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'rgba(0,0,0,0.5)',
                opacity: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.2s',
                className: 'movie-overlay' // Defined inline or in CSS
              }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
              >
                <div style={{ background: '#00d23a', borderRadius: '50%', padding: '15px' }}>
                  <Play size={24} fill="#000" color="#000" />
                </div>
              </div>
              {movie.isNew && (
                <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#e50914', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  MỚI
                </div>
              )}
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{movie.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ffb400', fontSize: '0.85rem' }}>
                <Star size={14} fill="currentColor" /> {movie.rating}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {title === 'Phim Hành Động' && cyberpunkMovies.length > 0 && (
        <>
          <div style={{ marginBottom: '2rem', marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fcee0a', textShadow: '0 0 10px rgba(252,238,10,0.5)' }}>CYBERPUNK 2077</h1>
            <div style={{ flex: 1, height: '1px', background: 'rgba(252,238,10,0.3)', marginTop: '0.5rem' }}></div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {cyberpunkMovies.map(movie => (
              <Link to={movie.to || `/watch/${movie.id}`} key={movie.id} style={{ position: 'relative', cursor: 'pointer', transition: 'transform 0.3s', textDecoration: 'none', color: 'inherit' }} className="movie-card">
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', aspectRatio: '16/9', border: '1px solid rgba(252,238,10,0.2)' }}>
                  <img
                    src={movie.image}
                    alt={movie.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.6)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.2s',
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                  >
                    <div style={{ background: '#fcee0a', borderRadius: '50%', padding: '15px' }}>
                      <Play size={24} fill="#000" color="#000" />
                    </div>
                  </div>
                  {movie.isNew && (
                    <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#fcee0a', color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      MỚI
                    </div>
                  )}
                </div>
                <div style={{ marginTop: '0.75rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', color: '#fff' }}>{movie.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fcee0a', fontSize: '0.85rem' }}>
                    <Star size={14} fill="currentColor" /> {movie.rating}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* SAO Section for Phim Xu Hướng */}
      {title === 'Phim Xu Hướng' && (
        <>
          <div style={{ marginBottom: '2rem', marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#00d8ff', textShadow: '0 0 10px rgba(0,216,255,0.5)' }}>SWORD ART ONLINE</h1>
            <div style={{ flex: 1, height: '1px', background: 'rgba(0,216,255,0.3)', marginTop: '0.5rem' }}></div>
          </div>
          <h2 style={{ marginTop: '40px', color: '#00d8ff', textShadow: '0 0 10px rgba(0,216,255,0.5)', borderBottom: '2px solid rgba(0,216,255,0.2)', paddingBottom: '10px' }}>Sword Art Online - Phần 1</h2>
          <div className="movies-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '24px',
            marginTop: '20px'
          }}>
            {saoSeason1.map(movie => (
              <Link to={`/watch/${movie.id}`} key={movie.id} style={{ position: 'relative', cursor: 'pointer', transition: 'transform 0.3s', textDecoration: 'none', color: 'inherit' }} className="movie-card">
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', aspectRatio: '16/9', border: '1px solid rgba(0,216,255,0.2)' }}>
                  <img src={movie.image} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.6)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.2s',
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                  >
                    <div style={{ background: '#00d8ff', borderRadius: '50%', padding: '15px' }}>
                      <Play size={24} fill="#000" color="#000" />
                    </div>
                  </div>
                  <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)', height: '60px', pointerEvents: 'none' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', color: '#fff', fontSize: '13px', fontWeight: '500', pointerEvents: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                      <span style={{ color: '#00d8ff' }}>★</span>
                      <span>{movie.rating}</span>
                    </div>
                  </div>
                </div>
                <h3 style={{ marginTop: '10px', fontSize: '14px', fontWeight: '600', color: '#fff', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{movie.title}</h3>
              </Link>
            ))}
          </div>

          <h2 style={{ marginTop: '40px', color: '#00d8ff', textShadow: '0 0 10px rgba(0,216,255,0.5)', borderBottom: '2px solid rgba(0,216,255,0.2)', paddingBottom: '10px' }}>Sword Art Online - Phần 2</h2>
          <div className="movies-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '24px',
            marginTop: '20px'
          }}>
            {saoSeason2.map(movie => (
              <Link to={`/watch/${movie.id}`} key={movie.id} style={{ position: 'relative', cursor: 'pointer', transition: 'transform 0.3s', textDecoration: 'none', color: 'inherit' }} className="movie-card">
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', aspectRatio: '16/9', border: '1px solid rgba(0,216,255,0.2)' }}>
                  <img src={movie.image} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.6)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.2s',
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                  >
                    <div style={{ background: '#00d8ff', borderRadius: '50%', padding: '15px' }}>
                      <Play size={24} fill="#000" color="#000" />
                    </div>
                  </div>
                  <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)', height: '60px', pointerEvents: 'none' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', color: '#fff', fontSize: '13px', fontWeight: '500', pointerEvents: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                      <span style={{ color: '#00d8ff' }}>★</span>
                      <span>{movie.rating}</span>
                    </div>
                  </div>
                </div>
                <h3 style={{ marginTop: '10px', fontSize: '14px', fontWeight: '600', color: '#fff', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{movie.title}</h3>
              </Link>
            ))}
          </div>

          <h2 style={{ marginTop: '40px', color: '#00d8ff', textShadow: '0 0 10px rgba(0,216,255,0.5)', borderBottom: '2px solid rgba(0,216,255,0.2)', paddingBottom: '10px' }}>Sword Art Online - Phần 3 (Alicization)</h2>
          <div className="movies-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '24px',
            marginTop: '20px'
          }}>
            {saoSeason3.map(movie => (
              <Link to={`/watch/${movie.id}`} key={movie.id} style={{ position: 'relative', cursor: 'pointer', transition: 'transform 0.3s', textDecoration: 'none', color: 'inherit' }} className="movie-card">
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', aspectRatio: '16/9', border: '1px solid rgba(0,216,255,0.2)' }}>
                  <img src={movie.image} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.6)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.2s',
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                  >
                    <div style={{ background: '#00d8ff', borderRadius: '50%', padding: '15px' }}>
                      <Play size={24} fill="#000" color="#000" />
                    </div>
                  </div>
                  <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)', height: '60px', pointerEvents: 'none' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', color: '#fff', fontSize: '13px', fontWeight: '500', pointerEvents: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                      <span style={{ color: '#00d8ff' }}>★</span>
                      <span>{movie.rating}</span>
                    </div>
                  </div>
                </div>
                <h3 style={{ marginTop: '10px', fontSize: '14px', fontWeight: '600', color: '#fff', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{movie.title}</h3>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Quick and dirty floating back button since we reused the global Navbar */}
      <Link to="/home" style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: 'rgba(255,255,255,0.1)',
        padding: '0.8rem 1.5rem',
        borderRadius: '30px',
        color: 'white',
        fontWeight: 'bold',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        ← Trở về Trang chủ
      </Link>
    </div>
  );
};

export default CategoryPage;
