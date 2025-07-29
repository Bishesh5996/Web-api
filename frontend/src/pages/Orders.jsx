import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import orderService from '../services/orders';
import { Package, Truck, CheckCircle, Clock, X } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getOrders();
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="status-icon pending" />;
      case 'confirmed': return <Package className="status-icon confirmed" />;
      case 'shipped': return <Truck className="status-icon shipped" />;
      case 'delivered': return <CheckCircle className="status-icon delivered" />;
      case 'cancelled': return <X className="status-icon cancelled" />;
      default: return <Clock className="status-icon" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="orders-page">
        <div className="page-header">
          <h1>My Orders</h1>
          {success && (
            <div className="success-message">
              🎉 Order placed successfully! Thank you for your purchase.
            </div>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <Package size={64} className="empty-icon" />
            <h2>No orders yet</h2>
            <p>Start shopping to see your orders here!</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.orderNumber}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <div className={`order-status ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </div>
                </div>

                <div className="order-content">
                  <div className="order-product">
                    <img 
                      src={order.product?.images?.[0] || '/placeholder-image.jpg'} 
                      alt={order.product?.title || 'Product'} 
                    />
                    <div className="product-details">
                      <h4>{order.product?.title}</h4>
                      <p>Brand: {order.product?.brand}</p>
                      <p>Size: {order.product?.size}</p>
                      <p>Quantity: {order.quantity}</p>
                      <p className="seller">Sold by {order.seller?.name}</p>
                    </div>
                  </div>

                  <div className="order-summary">
                    <div className="price-info">
                      <span className="total-amount">${order.totalAmount}</span>
                      <span className="payment-method">
                        {order.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'Card Payment'}
                      </span>
                    </div>

                    {order.trackingNumber && (
                      <div className="tracking-info">
                        <strong>Tracking: {order.trackingNumber}</strong>
                      </div>
                    )}

                    <div className="shipping-address">
                      <strong>Shipping to:</strong>
                      <p>
                        {order.shippingAddress?.fullName}<br />
                        {order.shippingAddress?.street}<br />
                        {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
