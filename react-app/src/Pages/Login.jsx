import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = (e) => {
    e.preventDefault()

    // SIMULASI LOGIN (AMAN DULU)
    if (email === 'admin@test.com') {
      window.location.href = '/admin'
    } else {
      window.location.href = '/staff'
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={submit} style={styles.form}>
        <h2>Login Sistem Gudang</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button}>Login</button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: 300,
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 8,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 8,
  },
  button: {
    width: '100%',
    padding: 8,
  },
}
