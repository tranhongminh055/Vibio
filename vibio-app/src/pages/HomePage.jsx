import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Tv,
  Box,
  Clock,
  Search,
  MonitorSmartphone,
  Bell,
  Play,
  Info,
  MessageCircle,
  Volume2,
  VolumeX,
  Star,
  User,
  Settings,
  LogOut,
  X,
  Check,
  Monitor,
  Smartphone,
  Laptop
} from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [showVipModal, setShowVipModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [scrolled, setScrolled] = useState(false); /* Trạng thái cuộn để thay đổi kiểu dáng navbar */
  const [showSearch, setShowSearch] = useState(false); /* Trạng thái hiển thị ô tìm kiếm */
  const [searchQuery, setSearchQuery] = useState(''); /* Giá trị của ô tìm kiếm */
  const [showNotifications, setShowNotifications] = useState(false); /* Trạng thái hiển thị menu thông báo */
  const [showProfileMenu, setShowProfileMenu] = useState(false); /* Trạng thái hiển thị menu profile */
  const heroVideoRef = useRef(null);

  /* Auto-unmute video khi user tương tác lần đầu */
  useEffect(() => {
    const unmute = () => {
      if (heroVideoRef.current) {
        heroVideoRef.current.muted = false;
        setIsMuted(false);
        heroVideoRef.current.play().catch(() => {});
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

  useEffect(() => { /* Lắng nghe sự kiện cuộn để thay đổi trạng thái scrolled */
    const handleScroll = () => { /* Khi người dùng cuộn xuống hơn 50px, sẽ kích hoạt kiểu dáng scrolled cho navbar */
      if (window.scrollY > 50) { /* kiem tra neu da cuon xuong hon 50pc */
        setScrolled(true); /* kich hoat trang thai scrolled */
      } else {
        setScrolled(false); /* nguoc lai neu cuon xuong duoi 50 pixel thi tat trang thai scrolled */
      }
    };

    window.addEventListener('scroll', handleScroll); /* dang ky su kien cuon */
    return () => window.removeEventListener('scroll', handleScroll); /* huy dang ky su kien khi component bi huy de tranh memory leak (ton bo nho, tran bo nho cho trang web) */
  }, []);

  const toggleMute = () => { /* ham chuyen doi trang thai am thanh khi nguoi dung bam nut mute/unmute */
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !heroVideoRef.current.muted;
      setIsMuted(heroVideoRef.current.muted);
    }
  };

  return (
    <div className="home-container"> {/* toan bo trang home duoc bao ve boi the div nay, de de dang ap dung cac kieu dang va layout */}
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}> {/* neu scrolled la true thi them class navbar-scrolled de thay doi kieu dang cua navbar, neu false thi chi co class navbar mac dinh */}
        <div className="navbar-main"> {/* phan chinh cua navbar chua logo, cac link chinh, va cac nut o ben phai */}
          <div className="navbar-left"> {/* phan ben trai cua navbar chua logo va cac link chinh */}
            <Link to="/home" className="logo"> {/* logo cua tranng web la mot link tro ve trang home */}
              <span className="logo-text">VIBI<span className="logo-highlight">O</span></span> {/* logo duoc chia thanh 2 lop de tao hieu ung hightlight cho chu O */}
            </Link> 
            <ul className="nav-links">
              <li className="active"><Link to="/home"><Home size={18} /> Trang chủ</Link></li>
              <li><Link to="/tv"><Tv size={18} /> Truyền hình</Link></li>
              <li><Link to="/hbo"><Box size={18} /> HBO GO</Link></li>
              <li><Link to="/kids"><Clock size={18} /> Thiếu nhi</Link></li>
            </ul>
          </div>

          <div className="navbar-right">
            <button className="vip-button" onClick={() => setShowVipModal(true)}>ĐẶC QUYỀN VIP</button>
            <a href="#" className="enter-code" onClick={(e) => { e.preventDefault(); setShowPromoModal(true); }}>Nhập mã VIBIO</a>

            <div className="search-container">
              {showSearch && (
                <input
                  type="text"
                  className="search-input"
                  placeholder="Tìm kiếm phim, diễn viên..."
                  /* gia tri sau khi o tim kiem thuc hien truy van tim kiem */
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              )}
              <button className="icon-button" onClick={() => setShowSearch(!showSearch)}>
                {showSearch ? <X size={20} /> : <Search size={20} />}
              </button>
              {/* Search dropdown mockup */}
              {showSearch && searchQuery && (
                <div className="search-results-dropdown">
                  <Link to="/watch/1" className="search-result-item">
                    <img src="https://m.media-amazon.com/images/M/MV5BZmI1ZGRhNDYtOGVjZC00MmVhLThlZGEtYjliNTUzYjE3ZDIzXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg" className="search-result-img" alt="Resident Evil" />
                    <div className="search-result-info">
                      <h4>Resident Evil (2002)</h4>
                      <p>Phim Hành Động • Zombie</p>
                    </div>
                  </Link>
                  <Link to="/watch/sat-thu-john-wick" className="search-result-item">
                    <img src="https://img.ophim.live/uploads/movies/sat-thu-john-wick-poster.jpg" className="search-result-img" alt="John Wick" />
                    <div className="search-result-info">
                      <h4>Sát Thủ John Wick</h4>
                      <p>Phim Hành Động • Sát Thủ</p>
                    </div>
                  </Link>
                  <Link to="/watch/cp-1" className="search-result-item">
                    <img src="https://m.media-amazon.com/images/M/MV5BN2E2YmVmMjItNDRlNy00NzczLTgwMGEtYzA1MWNlODIzZWQ4XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg" className="search-result-img" alt="Cyberpunk" />
                    <div className="search-result-info">
                      <h4>Cyberpunk: Edgerunners</h4>
                      <p>Phim Bộ • Anime</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <button className="icon-button" onClick={() => setShowDeviceModal(true)}><MonitorSmartphone size={20} /></button>

            <div className="dropdown-container">
              <button
                className="icon-button notification-btn"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
              >
                <Bell size={20} />
                <span className="notification-badge">1</span>
              </button>
              {showNotifications && (
                <div className="dropdown-menu notifications-menu">
                  <div className="dropdown-header">Thông báo</div>
                  <div className="dropdown-item">
                    <div className="notification-dot"></div>
                    <div className="notification-text">
                      <p>Phim <strong>Resident Evil (2002)</strong> đang hot trên VIBIO!</p>
                      <span>Vài giây trước</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="dropdown-container">
              <button
                className="profile-btn"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
              >
                <div className="profile-avatar">ON</div>
              </button>
              {showProfileMenu && (
                <div className="dropdown-menu profile-menu">
                  <Link to="/profile" className="dropdown-item">
                    <User size={16} /> Tài khoản cá nhân
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    <Settings size={16} /> Cài đặt
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/login" className="dropdown-item logout">
                    <LogOut size={16} /> Đăng xuất
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="navbar-sub">
          <ul className="sub-nav-links">
            <li><Link to="/series">Phim Bộ</Link></li>
            <li><Link to="/movies">Phim Điện Ảnh</Link></li>
            <li><Link to="/galaxy">Galaxy Play</Link></li>
            <li><Link to="/tv-shows">Phim Top Trend</Link></li>
            <li><Link to="/events">Phim Hành Động</Link></li>
            <li><Link to="/sports">Phim Xu Hướng</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background">
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="hero-video"
          >
            <source src="/videos/Resident Evil 9 Requiem - Official Trailer  State of Play 2026 - IGN (1080p, h264).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-vignette"></div>
        </div>

        <div className="hero-content">
          <div className="exclusive-badge">
            <Star size={12} fill="currentColor" />
            ĐỘC QUYỀN
          </div>

          <h1 className="hero-title">
            <span className="title-main">Resident Evil</span>
            <span className="title-sub">2002</span>
          </h1>

          <div className="hero-tags">
            <span className="tag">Phim Zombie</span>
            <span className="tag-separator">•</span>
            <span className="tag">Phim Hành Động</span>
            <div className="top-10-badge">
              <span className="top-10-text">TOP 10</span>
              <span className="top-1-text">#1 tại VIBIO hôm nay</span>
            </div>
          </div>

          <div className="hero-actions">
            <Link to="/watch/1" className="btn-primary" style={{textDecoration:'none'}}>
              <Play size={24} fill="currentColor" />
              <span>Xem ngay</span>
            </Link>
            <button className="btn-secondary">
              <Info size={24} />
              <span>Chi tiết</span>
            </button>
          </div>
        </div>

        {/* Floating elements */}
        <div className="floating-controls">
          <div className="age-rating">T13</div>
          <button className="mute-btn" onClick={toggleMute}>
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>

        <button className="chat-fab">
          <MessageCircle size={28} />
        </button>
      </div>

      {/* --- MODALS --- */}
      {showVipModal && (
        <div className="vibio-modal-overlay" onClick={() => setShowVipModal(false)}>
          <div className="vibio-modal vip-modal" onClick={e => e.stopPropagation()}>
            <button className="vibio-modal-close" onClick={() => setShowVipModal(false)}><X size={20} /></button>
            <h2 className="vibio-modal-title">Nâng cấp Đặc Quyền VIP</h2>
            <p>Trải nghiệm xem phim không giới hạn với chất lượng 4K, âm thanh vòm và không quảng cáo.</p>
            <div className="vip-plans">
              <div className="vip-plan-card">
                <div className="plan-name">Cơ Bản</div>
                <div className="plan-price">49.000đ<span>/tháng</span></div>
                <ul className="plan-features">
                  <li><Check size={16} color="#00d8ff"/> Chất lượng 1080p</li>
                  <li><Check size={16} color="#00d8ff"/> Xem trên 1 thiết bị</li>
                  <li><Check size={16} color="#00d8ff"/> Có quảng cáo</li>
                </ul>
                <button className="plan-btn" style={{background: 'rgba(255,255,255,0.1)', color: '#fff'}}>Chọn gói này</button>
              </div>
              <div className="vip-plan-card popular">
                <div className="plan-name">Cao Cấp</div>
                <div className="plan-price">99.000đ<span>/tháng</span></div>
                <ul className="plan-features">
                  <li><Check size={16} color="#d4af37"/> Chất lượng 4K HDR</li>
                  <li><Check size={16} color="#d4af37"/> Xem trên 4 thiết bị</li>
                  <li><Check size={16} color="#d4af37"/> Không quảng cáo</li>
                  <li><Check size={16} color="#d4af37"/> Tải xuống xem offline</li>
                </ul>
                <button className="plan-btn">Đăng ký ngay</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPromoModal && (
        <div className="vibio-modal-overlay" onClick={() => setShowPromoModal(false)}>
          <div className="vibio-modal" onClick={e => e.stopPropagation()}>
            <button className="vibio-modal-close" onClick={() => setShowPromoModal(false)}><X size={20} /></button>
            <h2 className="vibio-modal-title">Nhập mã VIBIO</h2>
            <p style={{marginBottom: '20px'}}>Nhập mã khuyến mãi hoặc thẻ quà tặng của bạn để nhận các ưu đãi hấp dẫn.</p>
            <div className="promo-input-wrapper">
              <input 
                type="text" 
                className="promo-input" 
                placeholder="VÍ DỤ: VIBIO2024VIP" 
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
              />
              <button className="plan-btn" onClick={() => {
                alert('Mã không hợp lệ hoặc đã hết hạn!');
                setPromoCode('');
              }}>Xác nhận mã</button>
            </div>
          </div>
        </div>
      )}

      {showDeviceModal && (
        <div className="vibio-modal-overlay" onClick={() => setShowDeviceModal(false)}>
          <div className="vibio-modal" onClick={e => e.stopPropagation()}>
            <button className="vibio-modal-close" onClick={() => setShowDeviceModal(false)}><X size={20} /></button>
            <h2 className="vibio-modal-title">Thiết bị của bạn</h2>
            <p>Quản lý các thiết bị đang đăng nhập tài khoản VIBIO của bạn.</p>
            <div className="device-list">
              <div className="device-item">
                <div className="device-info">
                  <Monitor size={24} className="device-icon" />
                  <div className="device-details">
                    <h4>Chrome - Windows</h4>
                    <p>Đang sử dụng hiện tại</p>
                  </div>
                </div>
              </div>
              <div className="device-item">
                <div className="device-info">
                  <Smartphone size={24} className="device-icon" />
                  <div className="device-details">
                    <h4>iPhone 14 Pro Max</h4>
                    <p>Hoạt động 2 giờ trước</p>
                  </div>
                </div>
                <button className="device-logout-btn">Đăng xuất</button>
              </div>
              <div className="device-item">
                <div className="device-info">
                  <Tv size={24} className="device-icon" />
                  <div className="device-details">
                    <h4>Samsung Smart TV</h4>
                    <p>Hoạt động hôm qua</p>
                  </div>
                </div>
                <button className="device-logout-btn">Đăng xuất</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
