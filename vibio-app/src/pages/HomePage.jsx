import React, { useState, useEffect } from 'react';
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
  X
} from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const [isMuted, setIsMuted] = useState(true); /* Mặc định video sẽ tắt tiếng */
  const [scrolled, setScrolled] = useState(false); /* Trạng thái cuộn để thay đổi kiểu dáng navbar */
  const [showSearch, setShowSearch] = useState(false); /* Trạng thái hiển thị ô tìm kiếm */
  const [searchQuery, setSearchQuery] = useState(''); /* Giá trị của ô tìm kiếm */
  const [showNotifications, setShowNotifications] = useState(false); /* Trạng thái hiển thị menu thông báo */
  const [showProfileMenu, setShowProfileMenu] = useState(false); /* Trạng thái hiển thị menu profile */

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
    setIsMuted(!isMuted); /* thiet lap lai gia trij nguoc lai cua isMuted (neu dang mute thi se unmute, neu dang unmute thi se mute) */
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
            <button className="vip-button">ĐẶC QUYỀN VIP</button>
            <Link to="/enter-code" className="enter-code">Nhập mã VIBIO</Link>

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
            </div>

            <button className="icon-button"><MonitorSmartphone size={20} /></button>

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
                      <p>Tập mới của <strong>Resident Evil 9 Requieem</strong> đã có mặt!</p>
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
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="hero-video"
            poster="https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=2787&auto=format&fit=crop"
          >
            {/* Using your local anime video */}
            <source src="/videoplayback.mp4" type="video/mp4" />
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
            <span className="title-main">Resident Evil 9</span>
            <span className="title-sub">Requieem</span>
          </h1>

          <div className="hero-tags">
            <span className="tag">Phim Zoombie</span>
            <span className="tag-separator">•</span>
            <span className="tag">Phim Hanh Dong</span>
            <div className="top-10-badge">
              <span className="top-10-text">TOP 10</span>
              <span className="top-1-text">#1 tại VIBIO hôm nay</span>
            </div>
          </div>

          <div className="hero-actions">
            <button className="btn-primary">
              <Play size={24} fill="currentColor" />
              <span>Xem ngay</span>
            </button>
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
    </div>
  );
};

export default HomePage;
