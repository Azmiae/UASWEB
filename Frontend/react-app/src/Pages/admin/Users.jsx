import { useMemo, useState } from 'react'

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
  const [search, setSearch] = useState('')

  const filteredUsers = useMemo(() => users.filter((user) =>
    `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(search.toLowerCase())
  ), [users, search])

  const deleteUser = (id) => {
    if (!window.confirm('Apakah yakin ingin menghapus user ini?')) return
    setUsers(users.filter((u) => u.id !== id))
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div><p style={styles.eyebrow}>AKSES / PENGGUNA</p><h1 style={styles.title}>Manajemen User</h1><p style={styles.subtitle}>Kelola akun dan izin kerja tim gudang.</p></div>
        <div style={styles.headerNote}>TEAM DIRECTORY<br /><strong>2026</strong></div>
      </div>

      <div style={styles.stats}>
        <div style={styles.stat}><span>Total pengguna</span><strong>{users.length}</strong><small>akun terdaftar</small></div>
        <div style={styles.stat}><span>Administrator</span><strong>{users.filter((u) => u.role === 'admin').length}</strong><small>akses penuh</small></div>
        <div style={{ ...styles.stat, ...styles.staffStat }}><span>Staff operasional</span><strong>{users.filter((u) => u.role === 'staff').length}</strong><small>akses terbatas</small></div>
      </div>

      <div style={styles.toolbar}><div style={styles.searchWrap}><span>⌕</span><input style={styles.searchInput} placeholder="Cari nama, email, atau role" value={search} onChange={(e) => setSearch(e.target.value)} /></div><span style={styles.result}>{filteredUsers.length} pengguna</span></div>

      <div style={styles.tableWrapper}>
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
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" style={styles.empty}>
                  Tidak ada data user
                </td>
              </tr>
            )}

            {filteredUsers.map((u, i) => (
              <tr key={u.id}>
                <td style={styles.td}>{i + 1}</td>
                <td style={styles.td}>{u.name}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={{ ...styles.td, textAlign: 'center' }}>
                  <span
                    style={{
                      ...styles.roleBadge,
                      background: u.role === 'admin' ? '#d9eddf' : '#edf2f0',
                      color: u.role === 'admin' ? '#236b4a' : '#68766e',
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
    padding: '12px 0 40px',
    background: '#f5f7f6',
    minHeight: '100vh',
    color: '#17221d',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' },
  eyebrow: { margin: '0 0 8px', color: '#75847b', fontSize: '11px', fontWeight: '700', letterSpacing: '2px' },
  title: { margin: 0, fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.05, letterSpacing: '-1px' },
  headerNote: { color: '#236b4a', fontSize: '11px', letterSpacing: '1px', textAlign: 'right', lineHeight: 1.6 },
  stats: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '14px', marginBottom: '18px' },
  stat: { background: '#fff', border: '1px solid #e0e8e2', borderRadius: '8px', padding: '17px 19px', display: 'grid', gap: '3px' },
  staffStat: { background: '#f7fbf8' },
  toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  searchWrap: { display: 'flex', alignItems: 'center', gap: '9px', background: '#fff', border: '1px solid #d6e0d9', borderRadius: '5px', padding: '0 12px', color: '#75847b' },
  result: { color: '#75847b', fontSize: '13px' },
  searchInput: { border: 0, outline: 0, padding: '11px 0', width: '260px', background: 'transparent', fontFamily: 'Arial, sans-serif' },
  subtitle: {
    color: '#6b7280',
    margin: '9px 0 0',
    fontFamily: 'Arial, sans-serif',
  },

  tableWrapper: {
    background: '#ffffff',
    padding: '8px 18px 18px',
    borderRadius: '8px',
    border: '1px solid #e0e8e2',
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
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },

  td: {
    padding: '12px',
    borderBottom: '1px solid #edf1ee',
  },

  empty: { textAlign: 'center', padding: '26px', color: '#75847b' },

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
    background: '#e7f2eb',
    color: '#236b4a',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },

  deleteBtn: {
    background: '#fff0ef',
    color: '#a33a32',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
}
