import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import warehouseImg from '../assets/d-industries.png'

const ADMIN_CODE = 'ADMIN123' // kode admin (simulasi)

export default function Signup() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('staff')
  const [adminCode, setAdminCode] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password) {
      setError('Semua field wajib diisi')
      return
    }

    if (role === 'admin' && adminCode !== ADMIN_CODE) {
      setError('Kode admin tidak valid')
      return
    }

    // SIMULASI REGISTER BERHASIL
    alert('Registrasi berhasil, silakan login')
    navigate('/')
  }

  return (
    <div style={styles.wrapper}>
      {/* LEFT - FORM */}
      <div style={styles.left}>
        <h1 style={styles.title}>Sign Up</h1>
        <p style={styles.subtitle}>
          Buat akun untuk mengakses sistem manajemen gudang
        </p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={submit}>
          <div style={styles.formGroup}>
            <label>Nama Lengkap</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Kata Sandi</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.input}
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {role === 'admin' && (
            <div style={styles.formGroup}>
              <label>Kode Admin</label>
              <input
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                style={styles.input}
              />
            </div>
          )}

          <button style={styles.button}>Daftar</button>
        </form>

        <p style={styles.register}>
          Sudah punya akun?{' '}
          <span style={styles.link} onClick={() => navigate('/')}>
            Login disini
          </span>
        </p>
      </div>

      {/* RIGHT - HERO */}
      <div style={styles.right}>
        <img
          src={warehouseImg}
          alt="Warehouse Illustration"
          style={styles.image}
        />

        <h2 style={styles.heroTitle}>Sistem Manajemen Gudang</h2>

        <p style={styles.heroText}>
          Kelola produk, transaksi masuk dan keluar barang secara efisien
        </p>
      </div>
    </div>
  )
}

/* ================= STYLE (SAMA DENGAN LOGIN) ================= */

const DARK = '#1f2937'

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },

  /* LEFT */
  left: {
    flex: 1,
    padding: '90px',
    background: '#ffffff',
  },
  title: {
    fontSize: '40px',
    color: DARK,
    marginBottom: '10px',
  },
  subtitle: {
    marginBottom: '30px',
    color: '#6b7280',
  },
  error: {
    color: '#b91c1c',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: '18px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '2px solid #facc15',
    outline: 'none',
    marginTop: '6px',
  },
  link: {
    color: '#ca8a04',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: '14px',
    background: '#facc15',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  register: {
    marginTop: '30px',
    fontSize: '14px',
  },

  /* RIGHT */
  right: {
    flex: 1,
    background: '#fef9c3',
    padding: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  image: {
    width: '300px',
    maxWidth: '100%',
    marginBottom: '24px',
  },
  heroTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: DARK,
    marginBottom: '12px',
  },
  heroText: {
    maxWidth: '420px',
    color: '#374151',
    lineHeight: '1.6',
  },
}
