import { useState, useEffect } from 'react'
import api from '../../api/axios'

export default function Users() {
  const [users, setUsers] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchUsers = async (query = '') => {
    try {
      setLoading(true)
      const res = await api.get('/users', { params: { q: query } })
      setUsers(res.data.users || [])
    } catch (err) {
      console.error('Gagal mengambil users', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const deleteUser = (id) => {
    if (!window.confirm('Apakah yakin ingin menghapus user ini?')) return
    setUsers(users.filter((u) => u.id !== id))
  }

  return (
    <div style={styles.wrapper}>
      <h1>Manajemen User</h1>
      <p style={styles.subtitle}>Kelola akun pengguna dan perannya</p>

      <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
        <input
          placeholder="Cari email..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', flex: 1 }}
        />
        <button
          onClick={() => fetchUsers(q)}
          style={{ padding: '8px 12px', borderRadius: 6, background: '#60a5fa', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Cari
        </button>
      </div>

      <div style={styles.tableWrapper}>
        {loading && <div style={{ padding: 12 }}>Memuat...</div>}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>No</th>
              <th style={styles.th}>Nama</th>
              <th style={styles.th}>Email</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>Role</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && !loading && (
              <tr>
                <td colSpan="5" style={styles.empty}>
                  Tidak ada data user
                </td>
              </tr>
            )}

            {users.map((u, i) => (
              <tr key={u.id}>
                <td style={styles.td}>{i + 1}</td>
                <td style={styles.td}>{u.name}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={{ ...styles.td, textAlign: 'center' }}>
                  <span
                    style={{
                      ...styles.roleBadge,
                      background: u.role === 'admin' ? '#fde68a' : '#e0f2fe',
                    }}
                  >
                    {u.role}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={styles.actionCell}>
                    <button style={styles.editBtn}>Edit</button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => deleteUser(u.id)}
                    >
                      Hapus
                    </button>
                  </div>
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

  roleBadge: {
    padding: '4px 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  actionCell: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
  },

  editBtn: {
    background: '#fde68a',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },

  deleteBtn: {
    background: '#fecaca',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
}
