import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const loginAdmin = () => {
    navigate('/admin')
  }

  const loginStaff = () => {
    navigate('/staff')
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login Page</h1>
      <p>Pilih role untuk demo</p>

      <button onClick={loginAdmin}>Login sebagai Admin</button>

      <br />
      <br />

      <button onClick={loginStaff}>Login sebagai Staf</button>
    </div>
  )
}
