import { useState } from 'react';

export default function ProductsCRUD() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 10, stock: 100 },
    { id: 2, name: 'Product 2', price: 20, stock: 50 }
  ]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingId ? { ...p, ...formData } : p
      ));
    } else {
      // Add new product
      setProducts([...products, { 
        id: Date.now(), 
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      }]);
    }
    setFormData({ name: '', price: '', stock: '' });
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock
    });
    setEditingId(product.id);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Manage Products</h2>
      
      {/* Product Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="p-2 border rounded"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="p-2 border rounded"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className="p-2 border rounded"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${editingId ? 'bg-yellow-600' : 'bg-green-600'}`}
        >
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Stock</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b">
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">${product.price}</td>
                <td className="py-2 px-4">{product.stock}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}