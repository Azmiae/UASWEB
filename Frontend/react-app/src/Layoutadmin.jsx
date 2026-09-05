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
    { label: 'Dashboard', short: 'DS', path: '/admin' },
    { label: 'Manajemen Produk', short: 'PR', path: '/admin/products' },
    { label: 'Transaksi Masuk', short: 'IN', path: '/admin/incoming' },
    { label: 'Transaksi Keluar', short: 'OUT', path: '/admin/outgoing' },
    { label: 'Manajemen User', short: 'US', path: '/admin/users' },
    { label: 'Riwayat Transaksi', short: 'TR', path: '/admin/transactions' },
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
          <div style={styles.brand}><div style={styles.brandMark}>G</div><div><h1 style={styles.logo}>Gudang</h1><span style={styles.brandSub}>OPERATIONS</span></div></div>

          <nav style={styles.menu}>
            {menu.map((m) => (
              <button
                key={m.path}
                onClick={() => navigate(m.path)}
                style={{
                  ...styles.menuItem,
                  ...(location.pathname === m.path ? styles.menuActive : {}),
                }}
              >
                <span style={styles.menuCode}>{m.short}</span><span>{m.label}</span>
              </button>
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
    fontFamily: 'Arial, sans-serif',
  },

  /* SIDEBAR */
  sidebar: {
    width: '248px',
    background: '#17352a',
    padding: '28px 18px 22px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRight: '1px solid #25523f',
  },

  brand: { display: 'flex', alignItems: 'center', gap: '11px', marginBottom: '42px' },
  brandMark: { width: '36px', height: '36px', borderRadius: '7px', background: '#d9eddf', color: '#17352a', display: 'grid', placeItems: 'center', fontFamily: 'Georgia, serif', fontSize: '23px', fontWeight: '700' },
  logo: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#f2f7f3',
    margin: 0,
  },
  brandSub: { color: '#91b19e', fontSize: '8px', letterSpacing: '2px', fontWeight: '700' },

  menu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },

  menuItem: {
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '11px 12px',
    borderRadius: '6px',
    border: '0',
    background: 'transparent',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '15px',
    color: '#b5cabc',
  },

  menuActive: {
    background: '#d9eddf',
    fontWeight: '600',
    color: '#17352a',
  },
  menuCode: { width: '25px', fontSize: '10px', fontWeight: '700', letterSpacing: '0.5px', opacity: 0.7 },

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
    borderTop: '1px solid #25523f',
  },

  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: '#d9eddf',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#17352a',
  },

  profileName: {
    fontWeight: '600',
    fontSize: '15px',
    color: '#f2f7f3',
  },

  profileRole: {
    fontSize: '12px',
    color: '#91b19e',
  },

  profileMenu: {
    position: 'absolute',
    bottom: '70px',
    left: 0,
    width: '180px',
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
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
    background: '#f5f7f6',
    padding: '32px 38px',
  },
}
