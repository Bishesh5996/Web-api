import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminLogin from '../pages/admin/Login';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route index element={<AdminDashboard />} />
      <Route path="settings" element={<AdminSettings />} />
    </Routes>
  );
}