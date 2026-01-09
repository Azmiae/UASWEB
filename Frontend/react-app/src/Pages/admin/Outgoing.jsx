import { useState } from 'react'

export default function Outgoing() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Beras', stock: 100 },
    { id: 2, name: 'Gula', stock: 80 },
    { id: 3, name: 'Minyak', stock: 60 },
  ])

  const [transactions, setTransactions] = useState([])

  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!productId || quantity <= 0) {
      setError('Data transaksi tidak valid')
      return
    }

    const product = products.find((p) => p.id === Number(productId))

    // VALIDASI STOK
    if (product.stock < Number(quantity)) {
      setError('Stok tidak mencukupi')
      return
    }

    // update stok (dikurangi)
    setProducts(
      products.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - Number(quantity) } : p
      )
    )

    // simpan transaksi
    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        product: product.name,
        qty: Number(quantity),
        date: new Date().toLocaleDateString('id-ID'),
      },
    ])

    setMessage('Transaksi barang keluar berhasil')
    setQuantity('')
    setProductId('')
  }

  const deleteTransaction = (id) => {
    if (!window.confirm('Hapus transaksi ini?')) return
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  return (
    <div style={styles.wrapper}>
      <h1>Transaksi Barang Keluar</h1>
      <p style={styles.subtitle}>Catat barang yang keluar dari gudang</p>

      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}

      {/* FORM */}
      <form onSubmit={submit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Nama Produk</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            style={styles.input}
          >
            <option value="">-- Pilih Produk --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (stok: {p.stock})
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label>Jumlah Keluar</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={styles.input}
          />
        </div>

        <button style={styles.button}>Simpan Transaksi</button>
      </form>

      {/* TABLE */}
      <h3 style={{ marginTop: 40 }}>Riwayat Transaksi Keluar</h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>No</th>
            <th style={styles.th}>Produk</th>
            <th style={styles.th}>Jumlah</th>
            <th style={styles.th}>Tanggal</th>
            <th style={styles.th}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={t.id}>
              <td style={styles.td}>{i + 1}</td>
              <td style={styles.td}>{t.product}</td>
              <td style={styles.td}>{t.qty}</td>
              <td style={styles.td}>{t.date}</td>
              <td style={styles.td}>
                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteTransaction(t.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}

          {transactions.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: 20 }}>
                Belum ada transaksi
              </td>
            </tr>
          )}
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
  success: {
    color: '#15803d',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  error: {
    color: '#b91c1c',
    fontWeight: 'bold',
    marginBottom: '12px',
  },

  form: {
    maxWidth: '400px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
  },
  button: {
    padding: '12px',
    background: '#facc15',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
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
  deleteBtn: {
    background: '#fecaca',
    border: 'none',
    padding: '6px 10px',
    cursor: 'pointer',
  },
}
