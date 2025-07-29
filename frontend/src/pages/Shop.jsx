import React, { useState, useEffect } from 'react';
import productService from '../services/products';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    size: '',
    condition: ''
  });

  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '')
      );
      const response = await productService.getAllProducts(cleanFilters);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await productService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      size: '',
      condition: ''
    });
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="shop">
      <div className="container">
        <div className="shop-header">
          <h1>Discover Unique Thrift Items</h1>
          <p>Find amazing pre-loved fashion pieces at unbeatable prices</p>
        </div>
        
        {/* Enhanced Filters */}
        <div className="filters-section">
          <div className="filters-card">
            <h3>Filter Products</h3>
            
            <div className="filter-row">
              <div className="search-group">
                <input
                  type="text"
                  name="search"
                  placeholder="Search by brand, title, or description..."
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="search-input"
                />
              </div>
            </div>
            
            <div className="filter-row">
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                name="condition"
                value={filters.condition}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">All Conditions</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>

              <select
                name="size"
                value={filters.size}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">All Sizes</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="One Size">One Size</option>
              </select>
            </div>

            <div className="filter-row price-row">
              <div className="price-inputs">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min $"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="price-input"
                />
                <span className="price-separator">to</span>
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max $"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="price-input"
                />
              </div>
              
              <button onClick={clearFilters} className="btn btn-secondary clear-btn">
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="loading-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="product-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text short"></div>
                  <div className="skeleton-text"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="products-section">
            <div className="products-header">
              <h2>
                {products.length} {products.length === 1 ? 'Item' : 'Items'} Found
              </h2>
            </div>
            
            <div className="products-grid">
              {products.length > 0 ? (
                products.map(product => (
                  <div key={product._id} className="product-card">
                    <div className="product-image">
                      <img src={product.images[0]} alt={product.title} loading="lazy" />
                      
                      {/* Badges */}
                      <div className="product-badges">
                        <div className={`condition-badge condition-${product.condition}`}>
                          {product.condition}
                        </div>
                        {product.originalPrice > product.price && (
                          <div className="discount-badge">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </div>
                        )}
                      </div>

                      {/* Overlay Actions */}
                      <div className="product-overlay">
                        <button className="overlay-btn">
                          <Eye size={18} />
                        </button>
                        <button className="overlay-btn">
                          <Heart size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="product-info">
                      <div className="product-category">
                        {product.category?.name}
                      </div>
                      
                      <h3 className="product-title">{product.title}</h3>
                      
                      <div className="product-meta">
                        <span className="brand">{product.brand}</span>
                        <span className="size">Size: {product.size}</span>
                      </div>
                      
                      <div className="price-section">
                        <div className="prices">
                          <span className="current-price">${product.price}</span>
                          {product.originalPrice > product.price && (
                            <span className="original-price">${product.originalPrice}</span>
                          )}
                        </div>
                        
                        {product.originalPrice > product.price && (
                          <div className="savings">
                            Save ${(product.originalPrice - product.price).toFixed(2)}
                          </div>
                        )}
                      </div>
                      
                      <div className="seller-info">
                        <span>by {product.seller?.name}</span>
                      </div>
                      
                      <div className="product-actions">
                        <button 
                          className={`btn ${isInCart(product._id) ? 'btn-secondary' : 'btn-primary'} add-to-cart-btn`}
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={product.status !== 'available'}
                        >
                          <ShoppingCart size={18} />
                          {isInCart(product._id) ? 'In Cart' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-products">
                  <div className="no-products-icon">🔍</div>
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search terms</p>
                  <button onClick={clearFilters} className="btn btn-primary">
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
