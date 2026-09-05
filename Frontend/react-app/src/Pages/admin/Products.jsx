import { useState, useEffect } from 'react'
import api from '../../api/axios'

const PAGE_SIZE = 10


export default function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [filterStock, setFilterStock] = useState('all')
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const role = localStorage.getItem('role')
  const isAdmin = role === 'admin'


  

const fetchProducts = async () => {
  try {
    setLoading(true)
    setError('')
    const res = await api.get('/product')
    setProducts(res.data.products || [])
  } catch {
    setError('Produk belum bisa dimuat. Coba lagi.')
  } finally {
    setLoading(false)
  }
}
useEffect(() => {
  fetchProducts()
}, [])

/* FILTER */
const filteredProducts = products.filter((p) => {
  const matchName = p.name.toLowerCase().includes(search.toLowerCase())

  const matchStock =
    filterStock === 'all'
      ? true
      : filterStock === 'low'
      ? p.stock < 50
      : p.stock >= 50

  return matchName && matchStock
})

/* PAGINATION */
const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE)

useEffect(() => {
  if (totalPages > 0 && page > totalPages) setPage(totalPages)
}, [page, totalPages])

const paginatedProducts = filteredProducts.slice(
  (page - 1) * PAGE_SIZE,
  page * PAGE_SIZE
)

const deleteProduct = async (id) => {
  if (!window.confirm('Hapus produk ini?')) return
  await api.delete(`/product/${id}`)
  fetchProducts()
}

const saveProduct = async (product) => {
  try {
    if (editingProduct) {
      await api.put(`/product/${editingProduct.id}`, {
        name: product.name,
        stock: product.stock,
        price: product.price,
      })
    } else {
      await api.post('/product', product)
    }

    await fetchProducts()
    setShowForm(false)
    setEditingProduct(null)
  } catch (err) {
    console.error('SAVE PRODUCT FAILED', err.response?.data || err)
    alert('Gagal menyimpan produk')
  }
}

  // ====== JSX RETURN DI SINI ======
  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div>
          <p style={styles.eyebrow}>INVENTORI / PRODUK</p>
          <h1 style={styles.title}>Manajemen Produk</h1>
          <p style={styles.subtitle}>Pantau ketersediaan dan harga barang gudang.</p>
        </div>
        <strong style={styles.headerMark}>GUDANG <span>01</span></strong>
      </div>

      <div style={styles.stats}>
        <div style={styles.statCard}><span>Total produk</span><strong>{products.length}</strong><small>item terdaftar</small></div>
        <div style={styles.statCard}><span>Total stok</span><strong>{products.reduce((sum, p) => sum + Number(p.stock || 0), 0).toLocaleString('id-ID')}</strong><small>unit tersedia</small></div>
        <div style={{ ...styles.statCard, ...styles.warningCard }}><span>Stok rendah</span><strong>{products.filter((p) => p.stock < 50).length}</strong><small>perlu diperhatikan</small></div>
      </div>

      {/* ACTION */}
      <div style={styles.actionBar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>⌕</span>
          <input
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            style={styles.search}
          />
        </div>

        <select
          value={filterStock}
          onChange={(e) => {
            setFilterStock(e.target.value)
            setPage(1)
          }}
          style={styles.filter}
        >
          <option value="all">Semua Stok</option>
          <option value="low">Stok Rendah</option>
          <option value="high">Stok Aman</option>
        </select>
        {isAdmin &&(
        <button
          style={styles.addBtn}
          onClick={() => {
            setEditingProduct(null)
            setShowForm(true)
          }}
        >
          + Tambah Produk
        </button>
        )}
      </div>

      {/* TABLE */}
      <div style={styles.tableWrapper}>
        {error && <div style={styles.error}>{error} <button onClick={fetchProducts}>Coba lagi</button></div>}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>No</th>
              <th style={styles.th}>Nama Produk</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>Stok</th>
              <th style={{ ...styles.th, textAlign: 'right' }}>Harga</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading && <tr><td colSpan="5" style={styles.empty}>Memuat data produk...</td></tr>}
            {!loading && paginatedProducts.map((p, i) => (
              <tr key={p.id}>
                <td style={styles.td}>{(page - 1) * PAGE_SIZE + i + 1}</td>

                <td style={styles.td}>{p.name}</td>

                <td style={{ ...styles.td, ...styles.center }}>{p.stock}</td>

                <td style={{ ...styles.td, ...styles.right }}>
                  Rp {(p.price?? 0).toLocaleString('id-ID')}
                </td>

                <td style={styles.td}>
                  {isAdmin?(
                  <div style={styles.actionCell}>
                    <button
                      style={styles.editBtn}
                      onClick={() => {
                        setEditingProduct(p)
                        setShowForm(true)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => deleteProduct(p.id)}
                    >
                      Hapus
                    </button>
                  </div>):(
                    <span style ={{ color: '#9ca3af' }}>Read Only</span>)}
                </td>
              </tr>
            ))}

            {!loading && paginatedProducts.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: 'center', padding: '20px' }}
                >
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div style={styles.pagination}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            ← Prev
          </button>
          <span>
            Halaman {page} dari {totalPages || 1}
          </span>
          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
          >
            Next →
          </button>
        </div>
      </div>

      {showForm && isAdmin &&(
        <ProductForm
          product={editingProduct}
          onClose={() => setShowForm(false)}
          onSave={saveProduct}
        />
      )}
    </div>
  )
}

/* FORM */
function ProductForm({ product, onClose, onSave }) {
  const [name, setName] = useState(product?.name || '')
  const [stock, setStock] = useState(product?.stock || '')
  const [price, setPrice] = useState(product?.price || '')

  const submit = (e) => {
    e.preventDefault()
    if (!name || stock <= 0 || price <= 0) return

    onSave({
      name,
      stock: Number(stock),
      price: Number(price),
    })
  }

  return (
    <div style={styles.modal}>
      <form onSubmit={submit} style={styles.form}>
        <h3>{product ? 'Edit Produk' : 'Tambah Produk'}</h3>

        <input
          placeholder="nama produk"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="stok"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          placeholder="harga"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div style={styles.formAction}>
          <button type="button" onClick={onClose}>
            Batal
          </button>
          <button type="submit">Simpan</button>
        </div>
      </form>
    </div>
  )
}

/* STYLE */
const styles = {
  wrapper: {
    padding: '12px 28px 40px',
    background: '#f5f7f6',
    minHeight: '100vh',
    color: '#17221d',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' },
  eyebrow: { margin: '0 0 8px', color: '#75847b', fontFamily: 'Arial, sans-serif', fontSize: '11px', fontWeight: '700', letterSpacing: '2px' },
  title: { margin: 0, fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.05, letterSpacing: '-1px' },
  headerMark: { color: '#236b4a', fontFamily: 'Arial, sans-serif', fontSize: '13px', letterSpacing: '1px' },
  stats: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '14px', marginBottom: '22px' },
  statCard: { background: '#fff', border: '1px solid #e0e8e2', borderRadius: '8px', padding: '18px 20px', display: 'grid', gap: '4px', fontFamily: 'Arial, sans-serif' },
  warningCard: { background: '#fffaf0', borderColor: '#f0d9a5' },
  empty: { textAlign: 'center', padding: '36px', color: '#75847b', fontFamily: 'Arial, sans-serif' },
  error: { background: '#fff1f0', color: '#a33a32', padding: '12px 14px', marginBottom: '14px', borderRadius: '6px', fontFamily: 'Arial, sans-serif', fontSize: '13px' },
  searchWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  searchIcon: { position: 'absolute', left: '12px', color: '#75847b', fontSize: '21px', zIndex: 1 },
  search: { padding: '12px 12px 12px 38px', width: '220px', border: '1px solid #d6e0d9', borderRadius: '5px', fontSize: '14px', outlineColor: '#236b4a' },
  filter: { padding: '12px', border: '1px solid #d6e0d9', borderRadius: '5px', background: '#fff', color: '#34443a' },
  tableWrapper: {
    background: '#fff',
    padding: '8px 18px 18px',
    borderRadius: '8px',
    border: '1px solid #e0e8e2',
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  actionBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '20px',
  },
  addBtn: {
    background: '#236b4a',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '12px',
    background: '#f3f7f4',
    color: '#68766e',
    borderBottom: '1px solid #dce6df',
    textAlign: 'left',
    fontFamily: 'Arial, sans-serif',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #edf1ee',
    fontFamily: 'Arial, sans-serif',
  },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  actionCell: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
  },
  editBtn: {
    background: '#e7f2eb',
    color: '#236b4a',
    border: 'none',
    padding: '6px 10px',
  },
  deleteBtn: {
    background: '#fff0ef',
    color: '#a33a32',
    border: 'none',
    padding: '6px 10px',
  },
  pagination: {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#68766e',
    fontFamily: 'Arial, sans-serif',
    fontSize: '13px',
  },
  modal: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  formAction: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}
