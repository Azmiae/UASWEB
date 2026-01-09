import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [openProfile, setOpenProfile] = useState(false)

  /* ===== USER DATA ===== */
  const name = localStorage.getItem('name') || 'Admin'
  const role = localStorage.getItem('role') || 'staff'

  /* ===== MENU (ADMIN) ===== */
  const menu = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Manajemen Produk', path: '/admin/products' },
    { label: 'Transaksi Masuk', path: '/admin/incoming' },
    { label: 'Transaksi Keluar', path: '/admin/outgoing' },
    { label: 'Manajemen User', path: '/admin/users' },
    { label: 'Riwayat Transaksi', path: '/admin/transactions' },
  ]

  /* ===== LOGOUT ===== */
  const logout = () => {
    localStorage.clear()
    navigate('/', { replace: true })
  }

  return (
    <div style={styles.wrapper}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        {/* TOP */}
        <div>
          <h1 style={styles.logo}>GudangApp</h1>

          <nav style={styles.menu}>
            {menu.map((m) => (
              <div
                key={m.path}
                onClick={() => navigate(m.path)}
                style={{
                  ...styles.menuItem,
                  ...(location.pathname === m.path ? styles.menuActive : {}),
                }}
              >
                {m.label}
              </div>
            ))}
          </nav>
        </div>

        {/* PROFILE */}
        <div style={styles.profileWrapper}>
          <div
            style={styles.profile}
            onClick={() => setOpenProfile(!openProfile)}
          >
            <div style={styles.avatar}>{name[0].toUpperCase()}</div>
            <div>
              <div style={styles.profileName}>{name}</div>
              <div style={styles.profileRole}>{role}</div>
            </div>
          </div>

          {openProfile && (
            <div style={styles.profileMenu}>
              <div style={styles.profileItem}>👤 {name}</div>
              <div style={styles.profileItem} onClick={logout}>
                🚪 Logout
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* CONTENT */}
      <main style={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}

/* ================= STYLE ================= */

const styles = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Inter, Arial, sans-serif',
  },

  /* SIDEBAR */
  sidebar: {
    width: '260px',
    background: '#fef9c3',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRight: '1px solid #fde68a',
  },

  logo: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#ca8a04',
    marginBottom: '36px',
  },

  menu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },

  menuItem: {
    padding: '10px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    color: '#374151',
  },

  menuActive: {
    background: '#fde68a',
    fontWeight: '600',
    color: '#92400e',
  },

  /* PROFILE */
  profileWrapper: {
    position: 'relative',
  },

  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    paddingTop: '20px',
    borderTop: '1px solid #fde68a',
  },

  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: '#facc15',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#92400e',
  },

  profileName: {
    fontWeight: '600',
    fontSize: '15px',
  },

  profileRole: {
    fontSize: '12px',
    color: '#6b7280',
  },

  profileMenu: {
    position: 'absolute',
    bottom: '70px',
    left: 0,
    width: '180px',
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },

  profileItem: {
    padding: '12px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    borderBottom: '1px solid #f3f4f6',
  },

  /* CONTENT */
  content: {
    flex: 1,
    background: '#f9fafb',
    padding: '40px',
  },
}
