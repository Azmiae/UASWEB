import { useState, useEffect } from 'react'
import api from '../../api/axios'

export default function Outgoing() {
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/product').then(res => {
      setProducts(res.data.products)
    })
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      if (!productId || quantity <= 0) {
      setError('Data transaksi tidak valid')
      return
}

      await api.post('/transaksi/keluar', {
        productId: Number(productId),
        quantity: Number(quantity),
      })

      setMessage('Transaksi keluar berhasil')
      setProductId('')
      setQuantity('')

      const res = await api.get('/product')
      setProducts(res.data.products)
    } catch (err) {
      if (err.response?.status === 403) {
        setError('Stok tidak mencukupi')
      } else {
        setError('Gagal menyimpan transaksi')
      }
    }
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
