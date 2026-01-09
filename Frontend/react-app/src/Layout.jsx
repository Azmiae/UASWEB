import { Outlet, useNavigate, useLocation } from 'react-router-dom'

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()

  const menu = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Manajemen Produk', path: '/admin/products' },
    { label: 'Transaksi Masuk', path: '/admin/incoming' },
    { label: 'Transaksi Keluar', path: '/admin/outgoing' },
    { label: 'Manajemen User', path: '/admin/users' },
    { label: 'Riwayat Transaksi', path: '/admin/transactions' },
  ]

  return (
    <div style={styles.wrapper}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        {/* LOGO */}
        <div>
          <h1 style={styles.logo}>GudangApp</h1>

          {/* MENU */}
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
        <div style={styles.profile}>
          <div style={styles.avatar}>A</div>
          <div>
            <div style={styles.profileName}>Admin</div>
            <div
              style={styles.profileLink}
              onClick={() => navigate('/profile')}
            >
              Lihat Profile
            </div>
          </div>
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
    fontSize: '16px',
    color: '#374151',
  },

  menuActive: {
    background: '#fde68a',
    fontWeight: '600',
    color: '#92400e',
  },

  /* PROFILE */
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
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

  profileLink: {
    fontSize: '13px',
    color: '#92400e',
    cursor: 'pointer',
  },

  /* CONTENT */
  content: {
    flex: 1,
    background: '#f9fafb',
    padding: '40px',
  },
}
