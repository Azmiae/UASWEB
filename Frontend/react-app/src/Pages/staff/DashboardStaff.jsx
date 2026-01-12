export default function DashboardStaff() {
  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1>Dashboard Staff</h1>
          <p style={styles.subtitle}>Ringkasan aktivitas dan kondisi gudang</p>
        </div>

        <div style={styles.dateBox}>
          <span>📅</span>
          <span>{new Date().toLocaleDateString('id-ID')}</span>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div style={styles.cards}>
        <Card title="Total Produk" value="120" icon="📦" />
        <Card title="Transaksi Masuk" value="340" icon="⬇️" />
        <Card title="Transaksi Keluar" value="280" icon="⬆️" />
        <Card title="Total User" value="8" icon="👤" />
      </div>

      {/* INFO SECTION */}
      <div style={styles.infoGrid}>
        <div style={styles.infoBox}>
          <h3>📊 Informasi Sistem</h3>
          <ul style={styles.list}>
            <li>✔ Sistem berjalan normal</li>
            <li>✔ Stok terpantau otomatis</li>
            <li>✔ Hak akses berdasarkan role</li>
          </ul>
        </div>

        <div style={styles.infoBox}>
          <h3>⚠️ Catatan Admin</h3>
          <p style={styles.note}>
            Pastikan stok selalu diperbarui melalui transaksi masuk dan keluar
            untuk menjaga keakuratan data gudang.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ===== COMPONENT ===== */
function Card({ title, value, icon }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardIcon}>{icon}</div>
      <div>
        <p style={styles.cardTitle}>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  )
}

/* ===== STYLE ===== */
const styles = {
  wrapper: {
    padding: '40px',
    background: '#f9fafb',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },

  /* HEADER */
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },

  subtitle: {
    color: '#6b7280',
    marginTop: '6px',
  },

  dateBox: {
    background: '#fef9c3',
    padding: '10px 14px',
    borderRadius: '8px',
    fontWeight: 'bold',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
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
    padding: '24px',
    borderRadius: '14px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },

  cardIcon: {
    fontSize: '28px',
    background: '#fef9c3',
    padding: '14px',
    borderRadius: '12px',
  },

  cardTitle: {
    color: '#6b7280',
    marginBottom: '6px',
    fontSize: '14px',
  },

  /* INFO SECTION */
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
  },

  infoBox: {
    background: '#ffffff',
    padding: '24px',
    borderRadius: '14px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },

  list: {
    marginTop: '12px',
    paddingLeft: '20px',
    color: '#374151',
    lineHeight: '1.8',
  },

  note: {
    marginTop: '12px',
    color: '#374151',
    lineHeight: '1.6',
  },
}
