import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Settings, CreditCard, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './HomePage.css';

const ProfilePage = () => {
  const bgVideoRef = useRef(null);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || '');
        setUserName(user.displayName || user.email?.split('@')[0] || 'User');
      }
    });
    return () => unsubscribe();
  }, []);

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

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('vibio_authenticated');
    localStorage.removeItem('vibio_user');
    navigate('/login');
  };

  const initials = userName ? userName.substring(0, 2).toUpperCase() : 'U';

  const menuItems = [
    { icon: <User size={20} />, label: 'Thông tin cá nhân', active: true },
    { icon: <CreditCard size={20} />, label: 'Quản lý thanh toán', active: false },
    { icon: <Bell size={20} />, label: 'Cài đặt thông báo', active: false },
    { icon: <Shield size={20} />, label: 'Bảo mật tài khoản', active: false },
    { icon: <Settings size={20} />, label: 'Cài đặt chung', active: false },
    { icon: <HelpCircle size={20} />, label: 'Trợ giúp & CSKH', active: false },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
      {/* Video Background */}
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

      {/* Content Layer */}
      <div style={{ position: 'relative', zIndex: 2, padding: '100px 3rem 2rem 3rem', display: 'flex', gap: '2rem' }}>
        {/* Sidebar */}
        <div style={{ width: '280px', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', borderRadius: '12px', padding: '1.5rem', alignSelf: 'flex-start', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #e50914, #ff6b6b)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '1rem', flexShrink: 0 }}>
              {initials}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName}</h3>
              <span style={{ color: '#e50914', fontSize: '0.8rem', fontWeight: 'bold' }}>VIBIO Member</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {menuItems.map((item, idx) => (
              <div key={idx} style={{
                display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem',
                borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s',
                background: item.active ? 'rgba(229,9,20,0.15)' : 'transparent',
                color: item.active ? '#fff' : 'rgba(255,255,255,0.6)',
                fontWeight: item.active ? '600' : '400'
              }}
              onMouseEnter={(e) => { if(!item.active) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; } }}
              onMouseLeave={(e) => { if(!item.active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; } }}
              >
                {item.icon} {item.label}
              </div>
            ))}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1rem 0' }}></div>
            <div
              onClick={handleLogout}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem',
                borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s',
                color: '#ff4757', textDecoration: 'none'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,71,87,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <LogOut size={20} /> Đăng xuất
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 style={{ fontSize: '1.8rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '2rem' }}>Thông tin cá nhân</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '600px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Tên hiển thị</label>
              <input type="text" value={userName} readOnly style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: '#fff', fontSize: '1rem' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Trạng thái</label>
              <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: '#00d23a', fontSize: '1rem', fontWeight: '600' }}>
                ● Đang hoạt động
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: '1 / -1' }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Email</label>
              <input type="text" value={userEmail} readOnly style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: '#fff', fontSize: '1rem' }} />
            </div>
            
            <button style={{ 
              background: 'linear-gradient(135deg, #e50914, #b20710)', color: '#fff', fontWeight: 'bold', padding: '0.9rem', 
              borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '0.5rem', gridColumn: '1 / -1',
              fontSize: '1rem', transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 15px rgba(229, 9, 20, 0.3)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(229, 9, 20, 0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(229, 9, 20, 0.3)'; }}
            >
              Cập nhật thông tin
            </button>
          </div>
        </div>
      </div>

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
        border: '1px solid rgba(255,255,255,0.2)',
        zIndex: 10,
        textDecoration: 'none'
      }}>
        ← Trở về
      </Link>
    </div>
  );
};

export default ProfilePage;
