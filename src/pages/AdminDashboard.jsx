import ProductCRUD from "./ProductCRUD";
import UsersCRUD from "../components/admin/UsersCRUD";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminDashboard() {
  const { logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-5xl font-extrabold text-indigo-900 drop-shadow-md">
          Admin Dashboard
        </h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
        >
          Logout
        </button>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-xl p-8 border border-indigo-300 flex flex-col items-center">
          <h3 className="text-indigo-700 font-semibold text-2xl mb-4 tracking-wide">
            Total Users
          </h3>
          <p className="text-5xl font-extrabold text-indigo-900">1,024</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 border border-green-300 flex flex-col items-center">
          <h3 className="text-green-700 font-semibold text-2xl mb-4 tracking-wide">
            Total Products
          </h3>
          <p className="text-5xl font-extrabold text-green-900">256</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 border border-yellow-300 flex flex-col items-center">
          <h3 className="text-yellow-700 font-semibold text-2xl mb-4 tracking-wide">
            Active Sessions
          </h3>
          <p className="text-5xl font-extrabold text-yellow-900">128</p>
        </div>
      </section>

      {/* CRUD Sections */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-xl shadow-xl p-8 border border-indigo-300 overflow-auto">
          <h2 className="text-3xl font-bold mb-6 text-indigo-900">Product Management</h2>
          <ProductCRUD />
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 border border-indigo-300 overflow-auto">
          <h2 className="text-3xl font-bold mb-6 text-indigo-900">User Management</h2>
          <UsersCRUD />
        </div>
      </section>
    </div>
  );
}
