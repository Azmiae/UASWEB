import { useState } from 'react'

export default function Transactions() {
  // SIMULASI DATA HASIL TRANSAKSI MASUK & KELUAR
  const [transactions] = useState([
    {
      id: 1,
      type: 'IN',
      product: 'Beras',
      qty: 20,
      date: '10/01/2026',
    },
    {
      id: 2,
      type: 'OUT',
      product: 'Gula',
      qty: 10,
      date: '11/01/2026',
    },
    {
      id: 3,
      type: 'IN',
      product: 'Minyak',
      qty: 15,
      date: '11/01/2026',
    },
  ])

  return (
    <div style={styles.wrapper}>
      <h1>Riwayat Transaksi</h1>
      <p style={styles.subtitle}>
        Daftar seluruh transaksi barang masuk dan keluar
      </p>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>No</th>
              <th style={styles.th}>Tanggal</th>
              <th style={styles.th}>Produk</th>
              <th style={styles.th}>Jenis</th>
              <th style={styles.th}>Jumlah</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" style={styles.empty}>
                  Belum ada transaksi
                </td>
              </tr>
            )}

            {transactions.map((t, i) => (
              <tr key={t.id}>
                <td style={styles.td}>{i + 1}</td>
                <td style={styles.td}>{t.date}</td>
                <td style={styles.td}>{t.product}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      background: t.type === 'IN' ? '#dcfce7' : '#fee2e2',
                      color: t.type === 'IN' ? '#166534' : '#991b1b',
                    }}
                  >
                    {t.type === 'IN' ? 'Masuk' : 'Keluar'}
                  </span>
                </td>
                <td style={styles.td}>{t.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ================= STYLE ================= */

const styles = {
  wrapper: {
    padding: '40px',
    background: '#f9fafb',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: '20px',
  },

  tableWrapper: {
    background: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },

  th: {
    padding: '12px',
    background: '#fef9c3',
    borderBottom: '2px solid #e5e7eb',
    textAlign: 'left',
  },

  td: {
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
  },

  empty: {
    textAlign: 'center',
    padding: '20px',
    color: '#6b7280',
  },

  badge: {
    padding: '4px 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
}
