export default function DashboardStaff() {
  return (
    <div style={styles.wrapper}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>GudangApp</h2>

        <nav style={styles.nav}>
          <span style={styles.active}>Overview</span>
          <span style={styles.link}>Produk</span>
          <span style={styles.link}>Transaksi Masuk</span>
          <span style={styles.link}>Transaksi Keluar</span>
          <span style={styles.link}>Manajemen User</span>
          <span style={styles.link}>Riwayat</span>
        </nav>

        <span style={styles.setting}>Settings</span>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <p style={styles.breadcrumb}>Pages / Overview</p>
            <h1>Sistem Manajemen Gudang</h1>
            <p style={styles.subtitle}>
              Kelola produk dan transaksi gudang secara efisien
            </p>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div style={styles.cards}>
          <SummaryCard title="Total Produk" value="120" />
          <SummaryCard title="Transaksi Masuk" value="340" />
          <SummaryCard title="Transaksi Keluar" value="280" />
          <SummaryCard title="Total User" value="8" />
        </div>

        {/* CONTENT GRID */}
        <div style={styles.grid}>
          {/* GRAFIK DUMMY */}
          <div style={styles.panel}>
            <h3>Tren Transaksi</h3>
            <div style={styles.chartDummy}>
              <p>(Grafik transaksi masuk & keluar)</p>
            </div>
          </div>

          {/* BREAKDOWN */}
          <div style={styles.panel}>
            <h3>Komposisi Stok</h3>
            <ul style={styles.list}>
              <li>Produk Makanan – 40%</li>
              <li>Minuman – 25%</li>
              <li>Bahan Pokok – 20%</li>
              <li>Lainnya – 15%</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

/* ================= COMPONENT ================= */

function SummaryCard({ title, value }) {
  return (
    <div style={styles.card}>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  )
}

/* ================= STYLE ================= */

const YELLOW = '#fef9c3'
const DARK = '#1f2937'

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
    background: '#fff',
    borderRight: '1px solid #e5e7eb',
    padding: '30px',
  },
  logo: {
    marginBottom: '40px',
    color: '#ca8a04',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  link: {
    cursor: 'pointer',
    color: '#6b7280',
  },
  active: {
    fontWeight: 'bold',
    color: DARK,
  },
  setting: {
    marginTop: '60px',
    color: '#6b7280',
    fontSize: '14px',
  },

  /* MAIN */
  main: {
    flex: 1,
    padding: '40px',
  },
  header: {
    marginBottom: '30px',
  },
  breadcrumb: {
    fontSize: '14px',
    color: '#9ca3af',
  },
  subtitle: {
    color: '#6b7280',
    marginTop: '8px',
  },

  /* CARDS */
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '40px',
  },
  card: {
    background: YELLOW,
    padding: '20px',
    borderRadius: '12px',
  },

  /* GRID */
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
  },
  panel: {
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
  },
  chartDummy: {
    height: '200px',
    background: '#f3f4f6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
    marginTop: '16px',
  },
  list: {
    marginTop: '16px',
    lineHeight: '1.8',
  },
}
