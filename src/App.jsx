import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProductCRUD from './pages/ProductCRUD';
import PrivateRoute from './components/PrivateRoute';
import UsersCRUD from './components/admin/UsersCRUD';

function App() {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/admin-login" replace />} />

      {/* Public route */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductCRUD />} />
        <Route path="/admin/users" element={<UsersCRUD />} />
      </Route>

      {/* Fallback 404 */}
      <Route path="*" element={<div className="text-center mt-10 text-red-600 text-xl">404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
