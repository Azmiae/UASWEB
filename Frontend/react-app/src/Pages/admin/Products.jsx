import { useState } from 'react'

const PAGE_SIZE = 10

export default function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Beras', stock: 100, price: 12000 },
    { id: 2, name: 'Gula', stock: 80, price: 14000 },
    { id: 3, name: 'Minyak', stock: 60, price: 18000 },
    { id: 4, name: 'Tepung', stock: 40, price: 11000 },
    { id: 5, name: 'Telur', stock: 200, price: 25000 },
    { id: 6, name: 'Kopi', stock: 30, price: 30000 },
    { id: 7, name: 'Susu', stock: 70, price: 16000 },
    { id: 8, name: 'Garam', stock: 90, price: 6000 },
    { id: 9, name: 'Mentega', stock: 25, price: 22000 },
    { id: 10, name: 'Keju', stock: 15, price: 35000 },
    { id: 11, name: 'Teh', stock: 55, price: 9000 },
  ])

  const [search, setSearch] = useState('')
  const [filterStock, setFilterStock] = useState('all')
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  /* SEARCH + FILTER */
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

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  /* CRUD */
  const deleteProduct = (id) => {
    if (!window.confirm('Hapus produk ini?')) return
    setProducts(products.filter((p) => p.id !== id))
  }

  const saveProduct = (product) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)))
    } else {
      setProducts([...products, { ...product, id: Date.now() }])
    }
    setShowForm(false)
    setEditingProduct(null)
  }

  return (
    <div style={styles.wrapper}>
      <h1>Manajemen Produk</h1>
      <p style={styles.subtitle}>Kelola data produk gudang</p>

      {/* ACTION */}
      <div style={styles.actionBar}>
        <input
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          style={styles.search}
        />

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

        <button
          style={styles.addBtn}
          onClick={() => {
            setEditingProduct(null)
            setShowForm(true)
          }}
        >
          + Tambah Produk
        </button>
      </div>

      {/* TABLE */}
      <div style={styles.tableWrapper}>
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
            {paginatedProducts.map((p, i) => (
              <tr key={p.id}>
                <td style={styles.td}>{(page - 1) * PAGE_SIZE + i + 1}</td>

                <td style={styles.td}>{p.name}</td>

                <td style={{ ...styles.td, ...styles.center }}>{p.stock}</td>

                <td style={{ ...styles.td, ...styles.right }}>
                  Rp {p.price.toLocaleString('id-ID')}
                </td>

                <td style={styles.td}>
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
                  </div>
                </td>
              </tr>
            ))}

            {paginatedProducts.length === 0 && (
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

      {showForm && (
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
      id: product?.id,
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
    padding: '40px',
    background: '#f9fafb',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: '20px',
  },
  actionBar: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
  },
  search: { padding: '10px', width: '220px' },
  filter: { padding: '10px' },
  addBtn: {
    background: '#facc15',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
  },
  tableWrapper: {
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
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
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  actionCell: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
  },
  editBtn: {
    background: '#fde68a',
    border: 'none',
    padding: '6px 10px',
  },
  deleteBtn: {
    background: '#fecaca',
    border: 'none',
    padding: '6px 10px',
  },
  pagination: {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'space-between',
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
