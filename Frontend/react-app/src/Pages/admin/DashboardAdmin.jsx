export default function DashboardAdmin() {
  return (
    <div style={styles.wrapper}>
      <h1>Dashboard Admin</h1>
      <p style={styles.subtitle}>Ringkasan sistem manajemen gudang</p>

      {/* SUMMARY */}
      <div style={styles.cards}>
        <Card title="Total Produk" value="120" />
        <Card title="Transaksi Masuk" value="340" />
        <Card title="Transaksi Keluar" value="280" />
        <Card title="Total User" value="8" />
      </div>
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
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
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
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },

  cardTitle: {
    color: '#6b7280',
    marginBottom: '8px',
    fontSize: '14px',
  },
}
