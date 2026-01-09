import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import DashboardAdmin from './Pages/admin/DashboardAdmin'
import DashboardStaff from './Pages/staff/DashboardStaff'
import Products from './Pages/staff/Products'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path="/staff" element={<DashboardStaff />} />
      <Route path="/admin/products" element={<Products />} />
    </Routes>
  )
}
