import { useState } from 'react'

export default function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Beras', stock: 100, price: 12000 },
    { id: 2, name: 'Gula', stock: 80, price: 14000 },
    { id: 3, name: 'Minyak', stock: 60, price: 18000 },
  ])

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div style={styles.wrapper}>
      <h1>Manajemen Produk</h1>
      <p style={styles.subtitle}>Kelola data produk yang tersedia di gudang</p>

      {/* ACTION BAR */}
      <div style={styles.actionBar}>
        <input type="text" placeholder="Cari produk..." style={styles.search} />
        <button style={styles.addBtn}>+ Tambah Produk</button>
      </div>

      {/* TABLE */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Produk</th>
              <th>Stok</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.name}</td>
                <td>{p.stock}</td>
                <td>Rp {p.price.toLocaleString()}</td>
                <td>
                  <button style={styles.editBtn}>Edit</button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteProduct(p.id)}
                  >
                    Hapus
                  </button>
                </td>
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
    fontFamily: 'Arial, sans-serif',
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: '30px',
  },

  /* ACTION */
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  search: {
    padding: '10px',
    width: '250px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
  },
  addBtn: {
    background: '#facc15',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  /* TABLE */
  tableWrapper: {
    background: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  editBtn: {
    marginRight: '10px',
    padding: '6px 10px',
    background: '#fde68a',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '6px 10px',
    background: '#fecaca',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}
