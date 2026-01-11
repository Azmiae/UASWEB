import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/signup'
import RequireAuth from './auth/RequireAuth'
import AdminRoute from './auth/RequireAdmin'

// ADMIN
import LayoutAdmin from './Layoutadmin'
import DashboardAdmin from './Pages/admin/DashboardAdmin'
import Products from './Pages/admin/Products'
import Incoming from './Pages/admin/Incoming'
import Outgoing from './Pages/admin/Outgoing'
import Transactions from './Pages/admin/Transactions'
import Users from './Pages/admin/Users'

// STAFF
import DashboardStaff from './Pages/staff/DashboardStaff'
import LayoutStaff from './LayoutStaff'

export default function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ADMIN */}
      <Route element={<RequireAuth allowedRoles={['admin']} />}>
        <Route element={<LayoutAdmin />}>
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/incoming" element={<Incoming />} />
          <Route path="/admin/outgoing" element={<Outgoing />} />
          <Route path="/admin/transactions" element={<Transactions />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>
      </Route>

      {/* STAFF */}
      <Route element={<RequireAuth allowedRoles={['staff']} />}>
        <Route element={<LayoutStaff />}>
          <Route path="/staff" element={<DashboardStaff />} />
          <Route path = "/staff/products" element={<Products />}/>
        </Route>
      </Route>
    </Routes>
  )
}
