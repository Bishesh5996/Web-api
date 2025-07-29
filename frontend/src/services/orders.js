import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const orderService = {
  createOrder: async (orderData) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Please log in to place an order');
      }

      console.log('🛒 Creating order...');
      console.log('Token exists:', !!token);
      console.log('Order data:', orderData);

      const response = await axios.post(`${API_URL}/orders`, orderData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ Order created successfully:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('❌ Order creation failed:', error.response?.data || error.message);
      throw error;
    }
  },

  getOrders: async (params = {}) => {
    const token = localStorage.getItem('token');
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${API_URL}/orders?${queryString}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getOrderById: async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default orderService;
