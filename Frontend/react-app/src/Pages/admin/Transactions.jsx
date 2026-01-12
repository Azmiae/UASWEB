import { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function Transactions() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    api.get('/transaksi')
      .then(res => setTransactions(res.data.transactions || []))
      .catch(() => setTransactions([]))
  }, [])

  return (
    <div>
      <h1>Riwayat Transaksi</h1>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>Produk</th>
            <th>Jenis</th>
            <th>Jumlah</th>
            <th>User</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 && (
            <tr>
              <td colSpan="7">Belum ada transaksi</td>
            </tr>
          )}

          {transactions.map((t, i) => (
            <tr key={t.id}>
              <td>{i + 1}</td>
              <td>{new Date(t.createdAt).toLocaleDateString()}</td>
              <td>{t.Product.name}</td>
              <td>{t.type === 'masuk' ? 'Masuk' : 'Keluar'}</td>
              <td>{t.quantity}</td>
              <td>{t.User.name}</td>
              <td>
                <button onClick={() => deleteTransaksi(t.id)}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  async function deleteTransaksi(id) {
    if (!confirm('Hapus transaksi ini?')) return
    await api.delete(`/transaksi/${id}`)
    setTransactions(prev => prev.filter(t => t.id !== id))
  }
}



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