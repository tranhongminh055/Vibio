import React from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, CreditCard, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import './HomePage.css';

const ProfilePage = () => {
  const menuItems = [
    { icon: <User size={20} />, label: 'Thông tin cá nhân', active: true },
    { icon: <CreditCard size={20} />, label: 'Quản lý thanh toán', active: false },
    { icon: <Bell size={20} />, label: 'Cài đặt thông báo', active: false },
    { icon: <Shield size={20} />, label: 'Bảo mật tài khoản', active: false },
    { icon: <Settings size={20} />, label: 'Cài đặt chung', active: false },
    { icon: <HelpCircle size={20} />, label: 'Trợ giúp & CSKH', active: false },
  ];

  return (
    <div className="home-container" style={{ padding: '100px 3rem 2rem 3rem', minHeight: '100vh', background: '#000', display: 'flex', gap: '2rem' }}>
      
      {/* Sidebar */}
      <div style={{ width: '280px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.5rem', alignSelf: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ width: '50px', height: '50px', background: '#00d23a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '1.2rem' }}>
            ON
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Nguyễn Văn A</h3>
            <span style={{ color: '#00d23a', fontSize: '0.85rem', fontWeight: 'bold' }}>VIP Member</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map((item, idx) => (
            <div key={idx} style={{
              display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem',
              borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s',
              background: item.active ? 'rgba(255,255,255,0.1)' : 'transparent',
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
          <Link to="/login" style={{
            display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem',
            borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s',
            color: '#ff4757', textDecoration: 'none'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,71,87,0.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <LogOut size={20} /> Đăng xuất
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '2rem' }}>Thông tin cá nhân</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '600px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Họ và tên</label>
            <input type="text" value="Nguyễn Văn A" disabled style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0.8rem', borderRadius: '4px', color: '#fff', fontSize: '1rem' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Số điện thoại</label>
            <input type="text" value="0987***321" disabled style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0.8rem', borderRadius: '4px', color: '#fff', fontSize: '1rem' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: '1 / -1' }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Email</label>
            <input type="text" value="nguyen.vana@example.com" disabled style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0.8rem', borderRadius: '4px', color: '#fff', fontSize: '1rem' }} />
          </div>
          
          <button style={{ 
            background: '#00d23a', color: '#000', fontWeight: 'bold', padding: '0.8rem', 
            borderRadius: '4px', border: 'none', cursor: 'pointer', marginTop: '1rem', gridColumn: '1 / -1'
          }}>
            Cập nhật thông tin
          </button>
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
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        ← Trở về
      </Link>
    </div>
  );
};

export default ProfilePage;
