import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Homepage';
import AdminLayout from '../layouts/AdminLayout';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/*" element={<AdminLayout />} />
    </Routes>
  );
}