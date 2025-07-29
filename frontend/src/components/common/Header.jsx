import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Package, User, LogOut } from 'lucide-react';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <div className="logo-icon">🛍️</div>
          <h1>Thrift Hub</h1>
        </Link>
        
        <nav className="nav">
          <Link to="/shop" className="nav-link">
            <span>Shop</span>
          </Link>
          
          <Link to="/cart" className="nav-link cart-link">
            <ShoppingCart size={20} />
            <span>Cart</span>
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <div className="user-menu">
              <Link to="/orders" className="nav-link">
                <Package size={20} />
                <span>Orders</span>
              </Link>
              
              <Link to="/dashboard" className="nav-link">
                <User size={20} />
                <span>Dashboard</span>
              </Link>
              
              {user?.role === 'seller' && (
                <Link to="/sell" className="nav-link sell-link">
                  <span>+ Sell Item</span>
                </Link>
              )}
              
              <div className="user-info">
                <span className="user-name">Hi, {user?.name}!</span>
                <button onClick={logout} className="logout-btn">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
