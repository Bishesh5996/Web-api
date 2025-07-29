import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Recycle, Heart, ShoppingBag, TrendingUp } from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      price: 45,
      originalPrice: 120,
      image: "https://images.unsplash.com/photo-1544966503-7e33bd0cd5a5?w=400",
      rating: 4.8,
      condition: "Excellent"
    },
    {
      id: 2,
      title: "Designer Handbag",
      price: 85,
      originalPrice: 200,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
      rating: 4.9,
      condition: "Like New"
    },
    {
      id: 3,
      title: "Classic Sneakers",
      price: 35,
      originalPrice: 90,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      rating: 4.7,
      condition: "Good"
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers", icon: Users },
    { number: "50K+", label: "Items Sold", icon: ShoppingBag },
    { number: "85%", label: "Sustainability Score", icon: Recycle },
    { number: "4.9", label: "Average Rating", icon: Star }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">
              <Recycle size={16} />
              Sustainable Fashion Marketplace
            </span>
            <h1 className="hero-title">
              Discover Unique 
              <span className="gradient-text"> Thrift Treasures</span>
            </h1>
            <p className="hero-description">
              Find amazing pre-loved fashion pieces at unbeatable prices. 
              Join thousands of conscious shoppers making sustainable choices.
            </p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn-primary">
                Start Shopping
                <ArrowRight size={20} />
              </Link>
              <Link to="/register" className="btn-secondary">
                Join Community
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.9★</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Items Sold</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-card">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" 
                alt="Thrift Shopping"
              />
              <div className="floating-card floating-card-1">
                <div className="card-icon">
                  <Heart fill="currentColor" />
                </div>
                <div>
                  <p className="card-title">Save 70%</p>
                  <p className="card-subtitle">On designer items</p>
                </div>
              </div>
              <div className="floating-card floating-card-2">
                <div className="card-icon trending">
                  <TrendingUp />
                </div>
                <div>
                  <p className="card-title">Trending</p>
                  <p className="card-subtitle">Vintage collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Finds</h2>
            <p>Handpicked treasures just for you</p>
            <Link to="/shop" className="view-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.title} />
                  <div className="product-badge">{product.condition}</div>
                  <button className="wishlist-btn">
                    <Heart size={20} />
                  </button>
                </div>
                <div className="product-info">
                  <div className="product-rating">
                    <Star size={14} fill="currentColor" />
                    <span>{product.rating}</span>
                  </div>
                  <h3 className="product-title">{product.title}</h3>
                  <div className="product-price">
                    <span className="current-price">${product.price}</span>
                    <span className="original-price">${product.originalPrice}</span>
                  </div>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  <stat.icon size={24} />
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">{stat.number}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="container">
          <div className="features-content">
            <div className="features-text">
              <h2>Why Choose Thrift Hub?</h2>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <Recycle size={24} />
                  </div>
                  <div>
                    <h4>Sustainable Shopping</h4>
                    <p>Reduce waste and carbon footprint with every purchase</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <Star size={24} />
                  </div>
                  <div>
                    <h4>Quality Guaranteed</h4>
                    <p>Every item is carefully inspected and authenticated</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4>Community Driven</h4>
                    <p>Join a community of conscious fashion enthusiasts</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="features-image">
              <img 
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500" 
                alt="Sustainable Fashion"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Thrift Journey?</h2>
            <p>Join thousands of happy customers finding amazing deals on quality pre-loved items</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary">
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <Link to="/shop" className="btn-outline">
                Browse Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
