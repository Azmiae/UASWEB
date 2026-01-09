import { useNavigate } from 'react-router-dom'

export default function DashboardAdmin() {
  const navigate = useNavigate()

  return (
    <div style={styles.wrapper}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>GudangApp</h2>

        <nav style={styles.menu}>
          <div style={styles.active}>Dashboard</div>

          <div style={styles.link} onClick={() => navigate('/admin/products')}>
            Manajemen Produk
          </div>

          <div style={styles.link} onClick={() => navigate('/admin/incoming')}>
            Transaksi Masuk
          </div>

          <div style={styles.link} onClick={() => navigate('/admin/outgoing')}>
            Transaksi Keluar
          </div>

          <div style={styles.link} onClick={() => navigate('/admin/users')}>
            Manajemen User
          </div>

          <div
            style={styles.link}
            onClick={() => navigate('/admin/transactions')}
          >
            Riwayat Transaksi
          </div>
        </nav>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        <h1>Dashboard Admin</h1>
        <p style={styles.subtitle}>Ringkasan sistem manajemen gudang</p>

        {/* SUMMARY */}
        <div style={styles.cards}>
          <Card title="Total Produk" value="120" />
          <Card title="Transaksi Masuk" value="340" />
          <Card title="Transaksi Keluar" value="280" />
          <Card title="Total User" value="8" />
        </div>
      </main>
    </div>
  )
}

/* ===== COMPONENT ===== */
function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.cardTitle}>{title}</p>
      <h2>{value}</h2>
    </div>
  )
}

/* ===== STYLE ===== */
const styles = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    background: '#f9fafb',
  },

  sidebar: {
    width: '240px',
    background: '#fef9c3',
    padding: '30px',
  },
  logo: {
    marginBottom: '40px',
    color: '#ca8a04',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  link: {
    cursor: 'pointer',
    color: '#374151',
  },
  active: {
    fontWeight: 'bold',
    color: '#92400e',
  },

  main: {
    flex: 1,
    padding: '40px',
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: '30px',
  },

  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },
  card: {
    background: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  cardTitle: {
    color: '#6b7280',
    marginBottom: '8px',
  },
}
