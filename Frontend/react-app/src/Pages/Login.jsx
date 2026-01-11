import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '../api/auth'
import api from '../api/axios'
import warehouseImg from '../assets/d-industries.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

 const submit = async (e) => {
  e.preventDefault()

  try {
    const res = await api.post('/auth/login', {
      email,
      password
    })

    const token = res.data.token
    if (!token) throw new Error('Token tidak ada')

    const payload = JSON.parse(atob(token.split('.')[1]))

    localStorage.setItem('token', token)
    localStorage.setItem('role', payload.role)

    if (payload.role === 'admin') {
      navigate('/admin', { replace: true })
    } else {
      navigate('/staff', { replace: true })
    }
  } catch (err) {
    console.error(err)
    alert('Login gagal')
  }
}


  return (
    <div style={styles.wrapper}>
      {/* LEFT - FORM */}
      <div style={styles.left}>
        <h1 style={styles.title}>Login</h1>
        <p style={styles.subtitle}>
          Silahkan input username dan password untuk login
        </p>

        <form onSubmit={submit}>
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

          <div style={styles.option}>
            <label>
              <input type="checkbox" /> Ingat saya
            </label>
            <span style={styles.link}>Lupa Kata Sandi?</span>
          </div>

          <button style={styles.button}>Login</button>
        </form>

        <p style={styles.register}>
          Belum punya akun?{' '}
          <span style={styles.link} onClick={() => navigate('/signup')}>
            Register disini
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

/* ================= STYLE ================= */

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
    marginBottom: '40px',
    color: '#6b7280',
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '2px solid #facc15',
    outline: 'none',
    marginTop: '6px',
  },
  option: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
    fontSize: '14px',
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
