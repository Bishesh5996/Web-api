import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import productService from '../services/products';

const SellItem = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    size: '',
    condition: '',
    category: '',
    brand: '',
    color: '',
    images: ['']
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user?.role !== 'seller') {
      navigate('/dashboard');
      return;
    }
    fetchCategories();
  }, [user, navigate]);

  const fetchCategories = async () => {
    try {
      const response = await productService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

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

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        images: newImages
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.originalPrice || formData.originalPrice <= 0) newErrors.originalPrice = 'Valid original price is required';
    if (formData.price >= formData.originalPrice) newErrors.price = 'Price must be less than original price';
    if (!formData.size) newErrors.size = 'Size is required';
    if (!formData.condition) newErrors.condition = 'Condition is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.color.trim()) newErrors.color = 'Color is required';
    
    const validImages = formData.images.filter(img => img.trim());
    if (validImages.length === 0) newErrors.images = 'At least one image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccess('');
    
    try {
      const submissionData = {
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        images: formData.images.filter(img => img.trim())
      };
      
      await productService.createProduct(submissionData);
      setSuccess('Product listed successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        originalPrice: '',
        size: '',
        condition: '',
        category: '',
        brand: '',
        color: '',
        images: ['']
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating product:', error);
      setErrors({ submit: 'Failed to create product. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'seller') {
    return (
      <div className="container">
        <div className="error-message">
          Only sellers can list items. Please register as a seller.
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="sell-item">
        <h1>List Your Item</h1>
        
        {success && <div className="success-message">{success}</div>}
        {errors.submit && <div className="error-message">{errors.submit}</div>}
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="title">Product Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? 'error' : ''}
                placeholder="e.g., Vintage Levi's Denim Jacket"
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? 'error' : ''}
                placeholder="Describe the item's condition, style, and any unique features..."
                rows="4"
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="brand">Brand*</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className={errors.brand ? 'error' : ''}
                  placeholder="e.g., Levi's, Nike, Zara"
                />
                {errors.brand && <span className="error-text">{errors.brand}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="color">Color*</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className={errors.color ? 'error' : ''}
                  placeholder="e.g., Blue, Black, Multi-color"
                />
                {errors.color && <span className="error-text">{errors.color}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Product Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category*</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={errors.category ? 'error' : ''}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && <span className="error-text">{errors.category}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="size">Size*</label>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className={errors.size ? 'error' : ''}
                >
                  <option value="">Select Size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="One Size">One Size</option>
                </select>
                {errors.size && <span className="error-text">{errors.size}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="condition">Condition*</label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className={errors.condition ? 'error' : ''}
                >
                  <option value="">Select Condition</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
                {errors.condition && <span className="error-text">{errors.condition}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Pricing</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="originalPrice">Original Price*</label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className={errors.originalPrice ? 'error' : ''}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
                {errors.originalPrice && <span className="error-text">{errors.originalPrice}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="price">Selling Price*</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={errors.price ? 'error' : ''}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
                {errors.price && <span className="error-text">{errors.price}</span>}
              </div>
            </div>
            
            {formData.price && formData.originalPrice && formData.price < formData.originalPrice && (
              <div className="savings-display">
                <p>Savings: ${(formData.originalPrice - formData.price).toFixed(2)} 
                   ({Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)}% off)
                </p>
              </div>
            )}
          </div>

          <div className="form-section">
            <h3>Images*</h3>
            
            {formData.images.map((image, index) => (
              <div key={index} className="image-input-group">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="Enter image URL"
                  className="image-input"
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="btn btn-secondary"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addImageField}
              className="btn btn-secondary"
            >
              Add Another Image
            </button>
            
            {errors.images && <span className="error-text">{errors.images}</span>}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Listing...' : 'List Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellItem;
