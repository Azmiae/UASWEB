import { useState } from 'react'

export default function Transactions() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'Masuk',
      product: 'Beras',
      quantity: 50,
      date: '2026-01-10',
    },
    {
      id: 2,
      type: 'Keluar',
      product: 'Gula',
      quantity: 20,
      date: '2026-01-10',
    },
    {
      id: 3,
      type: 'Masuk',
      product: 'Minyak',
      quantity: 30,
      date: '2026-01-09',
    },
  ])

  const deleteTransaction = (id) => {
    const confirm = window.confirm(
      'Apakah yakin ingin menghapus transaksi ini?'
    )
    if (!confirm) return

    setTransactions(transactions.filter((t) => t.id !== id))
  }

  return (
    <div style={styles.wrapper}>
      <h1>Riwayat Transaksi</h1>
      <p style={styles.subtitle}>
        Daftar seluruh transaksi barang masuk dan keluar
      </p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>No</th>
            <th>Jenis</th>
            <th>Produk</th>
            <th>Jumlah</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                Tidak ada data transaksi
              </td>
            </tr>
          )}

          {transactions.map((t, i) => (
            <tr key={t.id}>
              <td>{i + 1}</td>
              <td>{t.type}</td>
              <td>{t.product}</td>
              <td>{t.quantity}</td>
              <td>{t.date}</td>
              <td>
                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteTransaction(t.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ================= STYLE ================= */

const styles = {
  wrapper: {
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  deleteBtn: {
    padding: '6px 10px',
    background: '#fecaca',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}
