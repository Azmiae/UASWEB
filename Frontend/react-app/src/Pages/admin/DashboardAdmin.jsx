export default function DashboardAdmin() {
  return (
    <div style={styles.wrapper}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>GudangApp</h2>

        <nav style={styles.nav}>
          <a style={styles.active}>Dashboard</a>
          <a style={styles.link}>Produk</a>
          <a style={styles.link}>Transaksi</a>
          <a style={styles.link}>Manajemen User</a>
          <a style={styles.link}>Riwayat</a>
        </nav>

        <button style={styles.logout}>Logout</button>
      </aside>

      {/* CONTENT */}
      <main style={styles.main}>
        <h1>Dashboard Admin</h1>
        <p style={styles.subtitle}>
          Ringkasan aktivitas sistem manajemen gudang
        </p>

        {/* CARDS */}
        <div style={styles.cards}>
          <Card title="Total Produk" value="120" />
          <Card title="Transaksi Hari Ini" value="35" />
          <Card title="User Aktif" value="8" />
          <Card title="Stok Hampir Habis" value="5" />
        </div>

        {/* TABLE */}
        <div style={styles.tableWrapper}>
          <h3>Transaksi Terakhir</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Produk</th>
                <th>Jenis</th>
                <th>Jumlah</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#TRX001</td>
                <td>Beras</td>
                <td>Masuk</td>
                <td>50</td>
                <td>08 Jan 2026</td>
              </tr>
              <tr>
                <td>#TRX002</td>
                <td>Gula</td>
                <td>Keluar</td>
                <td>20</td>
                <td>08 Jan 2026</td>
              </tr>
              <tr>
                <td>#TRX003</td>
                <td>Minyak</td>
                <td>Masuk</td>
                <td>30</td>
                <td>07 Jan 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

/* ================= COMPONENT ================= */

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  )
}

/* ================= STYLE ================= */

const YELLOW = '#facc15'
const DARK = '#1f2937'

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    background: '#f9fafb',
  },

  /* SIDEBAR */
  sidebar: {
    width: '240px',
    background: '#fef9c3',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logo: {
    fontWeight: 'bold',
    color: DARK,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '40px',
  },
  link: {
    color: DARK,
    textDecoration: 'none',
    cursor: 'pointer',
  },
  active: {
    fontWeight: 'bold',
    color: '#ca8a04',
  },
  logout: {
    padding: '10px',
    background: YELLOW,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },

  /* MAIN */
  main: {
    flex: 1,
    padding: '40px',
  },
  subtitle: {
    marginBottom: '30px',
    color: '#6b7280',
  },

  /* CARDS */
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '40px',
  },
  card: {
    background: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },

  /* TABLE */
  tableWrapper: {
    background: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
}
