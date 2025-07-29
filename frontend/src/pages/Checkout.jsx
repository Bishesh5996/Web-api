import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import orderService from '../services/orders';
import { CreditCard, Truck, Shield, ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Address
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nepal',
    
    // Payment Info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    paymentMethod: 'credit_card'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (formData.paymentMethod === 'credit_card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setLoading(true);
    
    try {
      // Create orders for each item (since each item might have different sellers)
      const orderPromises = items.map(item => 
        orderService.createOrder({
          product: item._id,
          quantity: item.quantity,
          shippingAddress: {
            fullName: formData.fullName,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
            phone: formData.phone
          },
          paymentMethod: formData.paymentMethod
        })
      );
      
      await Promise.all(orderPromises);
      
      // Clear cart and redirect
      clearCart();
      navigate('/orders?success=true');
      
    } catch (error) {
      console.error('Checkout error:', error);
      setErrors({ submit: 'Failed to complete order. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container">
      <div className="checkout-page">
        <div className="checkout-header">
          <button onClick={() => navigate('/cart')} className="back-btn">
            <ArrowLeft size={20} />
            Back to Cart
          </button>
          <h1>Checkout</h1>
        </div>

        <div className="checkout-content">
          <div className="checkout-form">
            <div className="step-indicator">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <span>1</span>
                <label>Shipping</label>
              </div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <span>2</span>
                <label>Payment</label>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="form-step">
                  <div className="step-header">
                    <Truck className="step-icon" />
                    <h3>Shipping Information</h3>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name*</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={errors.fullName ? 'error' : ''}
                      />
                      {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email*</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number*</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="street">Street Address*</label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className={errors.street ? 'error' : ''}
                      placeholder="123 Main Street"
                    />
                    {errors.street && <span className="error-text">{errors.street}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City*</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? 'error' : ''}
                      />
                      {errors.city && <span className="error-text">{errors.city}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="state">State*</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={errors.state ? 'error' : ''}
                      />
                      {errors.state && <span className="error-text">{errors.state}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP Code*</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={errors.zipCode ? 'error' : ''}
                      />
                      {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                    </div>
                  </div>

                  <button type="button" onClick={handleNextStep} className="btn btn-primary next-btn">
                    Continue to Payment
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="form-step">
                  <div className="step-header">
                    <CreditCard className="step-icon" />
                    <h3>Payment Information</h3>
                  </div>

                  <div className="payment-methods">
                    <div className="payment-method">
                      <input
                        type="radio"
                        id="credit_card"
                        name="paymentMethod"
                        value="credit_card"
                        checked={formData.paymentMethod === 'credit_card'}
                        onChange={handleChange}
                      />
                      <label htmlFor="credit_card">
                        <CreditCard size={20} />
                        Credit/Debit Card
                      </label>
                    </div>

                    <div className="payment-method">
                      <input
                        type="radio"
                        id="cash_on_delivery"
                        name="paymentMethod"
                        value="cash_on_delivery"
                        checked={formData.paymentMethod === 'cash_on_delivery'}
                        onChange={handleChange}
                      />
                      <label htmlFor="cash_on_delivery">
                        💰 Cash on Delivery
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === 'credit_card' && (
                    <div className="card-details">
                      <div className="form-group">
                        <label htmlFor="cardNumber">Card Number*</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className={errors.cardNumber ? 'error' : ''}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                        />
                        {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="expiryDate">Expiry Date*</label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className={errors.expiryDate ? 'error' : ''}
                            placeholder="MM/YY"
                            maxLength="5"
                          />
                          {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="cvv">CVV*</label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            className={errors.cvv ? 'error' : ''}
                            placeholder="123"
                            maxLength="4"
                          />
                          {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="cardName">Cardholder Name*</label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className={errors.cardName ? 'error' : ''}
                          placeholder="John Doe"
                        />
                        {errors.cardName && <span className="error-text">{errors.cardName}</span>}
                      </div>
                    </div>
                  )}

                  <div className="security-notice">
                    <Shield size={20} />
                    <span>Your payment information is secure and encrypted</span>
                  </div>

                  {errors.submit && <div className="error-message">{errors.submit}</div>}

                  <div className="form-actions">
                    <button type="button" onClick={handlePrevStep} className="btn btn-secondary">
                      Back to Shipping
                    </button>
                    <button type="submit" disabled={loading} className="btn btn-primary">
                      {loading ? 'Processing...' : `Complete Order ($${total.toFixed(2)})`}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="order-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="order-items">
                {items.map(item => (
                  <div key={item._id} className="summary-item">
                    <img src={item.images[0]} alt={item.title} />
                    <div className="item-info">
                      <h4>{item.title}</h4>
                      <p>Size: {item.size} | Qty: {item.quantity}</p>
                      <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-line">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-line">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
