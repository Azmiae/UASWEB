import { Outlet, useNavigate, useLocation } from 'react-router-dom'

export default function LayoutStaff() {
  const navigate = useNavigate()
  const location = useLocation()

  const menu = [
    { label: 'Dashboard', path: '/staff' },
    { label: 'Produk', path: '/staff/products' },
  ]

  const logout = () => {
    localStorage.clear()
    navigate('/', { replace: true })
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 240, background: '#fef9c3', padding: 24 }}>
        <h2>Gudang</h2>

        {menu.map((m) => (
          <div
            key={m.path}
            onClick={() => navigate(m.path)}
            style={{
              padding: 10,
              cursor: 'pointer',
              fontWeight: location.pathname === m.path ? 'bold' : 'normal',
            }}
          >
            {m.label}
          </div>
        ))}

        <button onClick={logout}>Logout</button>
      </aside>

      <main style={{ flex: 1, padding: 40 }}>
        <Outlet />
      </main>
    </div>
  )
}
