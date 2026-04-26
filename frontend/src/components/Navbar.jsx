import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '14px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>

        {/* LEFT — Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: '#2563eb',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(37,99,235,0.3)',
          }}>
            <span style={{ color: '#fff', fontWeight: '700', fontSize: '13px' }}>JT</span>
          </div>

          <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
            Job<span style={{ color: '#2563eb' }}>Tracker</span>
          </h1>
        </div>

        {/* RIGHT — User + Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

          {/* User Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            padding: '8px 16px',
            borderRadius: '999px',
          }}>
            <div style={{
              width: '30px',
              height: '30px',
              background: '#2563eb',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontSize: '12px', fontWeight: '600' }}>
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
              {user?.name}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              background: '#fef2f2',
              color: '#ef4444',
              border: '1px solid #fecaca',
              padding: '8px 18px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onMouseOver={e => {
              e.target.style.background = '#ef4444';
              e.target.style.color = '#ffffff';
            }}
            onMouseOut={e => {
              e.target.style.background = '#fef2f2';
              e.target.style.color = '#ef4444';
            }}>
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}