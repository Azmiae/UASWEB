export default function DashboardAdmin() {
  return (
    <div style={styles.wrapper}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>GudangApp</h2>

        <nav style={styles.menu}>
          <div style={styles.active}>Dashboard</div>
          <div style={styles.link}>Manajemen Produk</div>
          <div style={styles.link}>Transaksi Masuk</div>
          <div style={styles.link}>Transaksi Keluar</div>
          <div style={styles.link}>Manajemen User</div>
          <div style={styles.link}>Riwayat Transaksi</div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        {/* HEADER */}
        <div style={styles.header}>
          <h1>Dashboard Admin</h1>
          <p style={styles.subtitle}>Ringkasan sistem manajemen gudang</p>
        </div>

        {/* SUMMARY */}
        <div style={styles.cards}>
          <SummaryCard title="Total Produk" value="120" />
          <SummaryCard title="Transaksi Masuk" value="340" />
          <SummaryCard title="Transaksi Keluar" value="280" />
          <SummaryCard title="Total User" value="8" />
        </div>
      </main>
    </div>
  )
}

/* ===== COMPONENT ===== */

function SummaryCard({ title, value }) {
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

  /* SIDEBAR */
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

  /* MAIN */
  main: {
    flex: 1,
    padding: '40px',
  },
  header: {
    marginBottom: '30px',
  },
  subtitle: {
    color: '#6b7280',
  },

  /* CARDS */
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
