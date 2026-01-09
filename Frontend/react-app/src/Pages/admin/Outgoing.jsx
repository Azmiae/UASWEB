import { useState } from 'react'

export default function Outgoing() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Beras', stock: 100 },
    { id: 2, name: 'Gula', stock: 80 },
    { id: 3, name: 'Minyak', stock: 60 },
  ])

  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!productId || !quantity || quantity <= 0) {
      setError('Data transaksi tidak valid')
      return
    }

    const selectedProduct = products.find((p) => p.id === Number(productId))

    if (!selectedProduct) {
      setError('Produk tidak ditemukan')
      return
    }

    if (Number(quantity) > selectedProduct.stock) {
      setError('Stok tidak mencukupi')
      return
    }

    // update stok (simulasi backend)
    const updatedProducts = products.map((p) =>
      p.id === selectedProduct.id
        ? { ...p, stock: p.stock - Number(quantity) }
        : p
    )

    setProducts(updatedProducts)
    setMessage('Transaksi barang keluar berhasil')
    setProductId('')
    setQuantity('')
  }

  return (
    <div style={styles.wrapper}>
      <h1>Transaksi Barang Keluar</h1>
      <p style={styles.subtitle}>Catat barang yang keluar dari gudang</p>

      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.message}>{message}</p>}

      {/* FORM */}
      <form onSubmit={submit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Produk</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            style={styles.input}
          >
            <option value="">-- Pilih Produk --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (Stok: {p.stock})
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label>Jumlah</label>
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
      <h3 style={{ marginTop: 40 }}>Stok Produk</h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Produk</th>
            <th>Stok Saat Ini</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.stock}</td>
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
  message: {
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#15803d',
  },
  error: {
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#b91c1c',
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
    width: '400px',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
}
