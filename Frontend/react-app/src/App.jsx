import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import DashboardAdmin from './Pages/admin/DashboardAdmin'
import DashboardStaff from './Pages/staff/DashboardStaff'
import Products from './Pages/admin/Products'
import Incoming from './Pages/admin/Incoming'
import Outgoing from './Pages/admin/Outgoing'
import Transactions from './Pages/admin/Transactions'
import Users from './Pages/admin/Users'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* ADMIN */}
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path="/admin/products" element={<Products />} />
      <Route path="/admin/incoming" element={<Incoming />} />
      <Route path="/admin/outgoing" element={<Outgoing />} />
      <Route path="/admin/transactions" element={<Transactions />} />
      <Route path="/admin/users" element={<Users />} />

      {/* STAFF */}
      <Route path="/staff" element={<DashboardStaff />} />
    </Routes>
  )
}
