import { Navigate, Outlet } from 'react-router-dom'

export default function RequireAuth({ allowedRoles }) {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (!token) {
    return <Navigate to="/" replace />
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />
  }
  console.log('ROLE:',role)
  console.log('ALLOWED:', allowedRoles)
  return <Outlet />
}
