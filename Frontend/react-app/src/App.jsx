import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/signup'
import Layout from './Layout'

// ADMIN
import DashboardAdmin from './Pages/admin/DashboardAdmin'
import Products from './Pages/admin/Products'
import Incoming from './Pages/admin/Incoming'
import Outgoing from './Pages/admin/Outgoing'
import Transactions from './Pages/admin/Transactions'
import Users from './Pages/admin/Users'

// STAFF
import DashboardStaff from './Pages/staff/DashboardStaff'

export default function App() {
  return (
    <Routes>
      {/* ================= AUTH (TANPA SIDEBAR) ================= */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ================= ADMIN & STAFF */}
      <Route element={<Layout />}>
        {/* ADMIN */}
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/incoming" element={<Incoming />} />
        <Route path="/admin/outgoing" element={<Outgoing />} />
        <Route path="/admin/transactions" element={<Transactions />} />
        <Route path="/admin/users" element={<Users />} />

        {/* STAFF */}
        <Route path="/staff" element={<DashboardStaff />} />
      </Route>
    </Routes>
  )
}
