import { useState,useEffect } from 'react'
import api from '../../api/axios'

export default function Incoming() {
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [message, setMessages] = useState ('')
  
  useEffect(() => {
    api.get('/product')
      .then(res => setProducts(res.data.products))
  }, [])

  const submit = async (e) => {
    e.preventDefault()

  if (!productId || Number(quantity) <= 0) {
    alert('Data transaksi tidak valid')
    return
  }

  try {
    await api.post('/transaksi/masuk', {
      productId,
      quantity: Number(quantity),
    })

    alert('Transaksi berhasil')

    // refresh produk biar stok update dari backend
    const res = await api.get('/product')
    setProducts(res.data.products)

    setProductId('')
    setQuantity('')
  } catch (err) {
    console.error(err)
    alert('Gagal menyimpan transaksi')
  }
}

  return (
    <div style={styles.wrapper}>
      <h1>Transaksi Barang Masuk</h1>
      <p style={styles.subtitle}>Catat barang yang masuk ke gudang</p>

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
                {p.name} (stok: {p.stock})
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label>Jumlah</label>
          <input
            type="number"
            min="1"
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
    background: '#f9fafb',
    borderRadius: '16px',
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

  form: {
    maxWidth: '420px',
    marginBottom: '40px',
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

  tableWrapper: {
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  th: {
    padding: '12px',
    borderBottom: '2px solid #e5e7eb',
    background: '#fef9c3',
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
  empty: {
    textAlign: 'center',
    padding: '20px',
    color: '#6b7280',
  },
}
