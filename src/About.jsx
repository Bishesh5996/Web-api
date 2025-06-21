import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProductCRUD from './pages/ProductCRUD';
import PrivateRoute from './components/PrivateRoute';
import UsersCRUD from './components/admin/UsersCRUD';

function App() {
  return (
    <Routes>
      {/* Automatic redirect from root */}
      <Route path="/" element={<Navigate to="/admin-login" replace />} />
      
      {/* Public routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      
      {/* Protected admin routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductCRUD />} />
        <Route path="/admin/users" element={<UsersCRUD />} />
      </Route>
      
      {/* 404 catch-all */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;