import { useState } from 'react'

export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin Utama', email: 'admin@test.com', role: 'admin' },
    { id: 2, name: 'Staff Gudang', email: 'staff@test.com', role: 'staff' },
    {
      id: 3,
      name: 'Staff Operasional',
      email: 'staff2@test.com',
      role: 'staff',
    },
  ])

  const deleteUser = (id) => {
    const confirm = window.confirm('Apakah yakin ingin menghapus user ini?')
    if (!confirm) return

    setUsers(users.filter((u) => u.id !== id))
  }

  return (
    <div style={styles.wrapper}>
      <h1>Manajemen User</h1>
      <p style={styles.subtitle}>Kelola akun pengguna dan perannya</p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                Tidak ada data user
              </td>
            </tr>
          )}

          {users.map((u, i) => (
            <tr key={u.id}>
              <td>{i + 1}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button style={styles.editBtn}>Edit</button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteUser(u.id)}
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
