import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import { Product } from '../../models/product';

// Import the CSS file
import './AddProduct.css';

export default function AddProduct() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  // Hardcoded Options
  const categories = ["Electronics", "Furniture", "Clothing", "Footwear", "Other"];
  const brands = ["Samsung", "Apple", "Sony", "Dell", "Nike", "HomeStyle", "TechCorp", "Generic"];

  const initialEmptyState: Product = {
    id: 0,
    name: '',
    price: 0,
    catagory: '',
    brand: '',
    stock: 0,
    description: '',
    imageUrl: '',
    isActive: true
  };

  const [product, setProduct] = useState<Product>(initialEmptyState);
  const [originalProduct, setOriginalProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && id) {
      setLoading(true);
      ProductService.fetchProductById(Number(id))
        .then((data) => {
          setProduct(data);
          setOriginalProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "Failed to load product");
          setLoading(false);
        });
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              (name === 'price' || name === 'stock') ? parseFloat(value) || 0 : value
    }));
  };

  const handleReset = () => {
    if (isEditMode && originalProduct) {
      setProduct(originalProduct);
    } else {
      setProduct(initialEmptyState);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (isEditMode) {
        await ProductService.updateProduct(product);
      } else {
        await ProductService.addProduct(product);
      }
      navigate('/product/details');
    } catch (err: any) {
      setError(err.message || "Something went wrong saving the product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="add-product-container"><p>Loading Product Data...</p></div>;

  return (
    <div className="add-product-container">
      <h1 className="form-title">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        
        {/* ROW 1: ID & NAME */}
        {isEditMode && (
          <div className="form-group">
            <label className="form-label">Product ID:</label>
            <input 
                className="form-input" 
                type="text" 
                value={product.id} 
                disabled 
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Product Name:</label>
          <input 
            className="form-input" 
            type="text" 
            name="name" 
            value={product.name} 
            onChange={handleChange} 
            required 
            placeholder="e.g. Wireless Mouse" 
          />
        </div>

        {/* ROW 2: CATAGORY & BRAND (Flex Row) */}
        <div className="form-row">
            <div className="form-col">
                <label className="form-label">Catagory:</label>
                <select 
                    className="form-select" 
                    name="catagory" 
                    value={product.catagory} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">-- Select --</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <div className="form-col">
                <label className="form-label">Brand:</label>
                <select 
                    className="form-select" 
                    name="brand" 
                    value={product.brand} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">-- Select --</option>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
            </div>
        </div>

        {/* ROW 3: PRICE & STOCK (Flex Row) */}
        <div className="form-row">
            <div className="form-col">
                <label className="form-label">Price ($):</label>
                <input 
                    className="form-input" 
                    type="number" 
                    name="price" 
                    value={product.price} 
                    onChange={handleChange} 
                    min="0" 
                    step="0.01" 
                    required 
                />
            </div>
            <div className="form-col">
                <label className="form-label">Stock Quantity:</label>
                <input 
                    className="form-input" 
                    type="number" 
                    name="stock" 
                    value={product.stock} 
                    onChange={handleChange} 
                    min="0" 
                    required 
                />
            </div>
        </div>

        {/* ROW 4: DESCRIPTION */}
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea 
            className="form-textarea"
            rows={4}
            name="description" 
            value={product.description} 
            onChange={handleChange} 
            required 
            placeholder="Enter product details..."
          />
        </div>

        {/* ROW 5: IMAGE URL */}
        <div className="form-group">
          <label className="form-label">Image URL:</label>
          <input 
            className="form-input" 
            type="text" 
            name="imageUrl" 
            value={product.imageUrl} 
            onChange={handleChange} 
            placeholder="https://..." 
          />
        </div>

        {/* ROW 6: IS AVAILABLE (Checkbox) */}
        <div className="checkbox-group">
          <input 
            className="checkbox-input"
            type="checkbox" 
            name="isActive" 
            checked={product.isActive} 
            onChange={handleChange} 
            id="isActiveCheck"
          />
          <label htmlFor="isActiveCheck" className="checkbox-label">
            Make this product visible on website?
          </label>
        </div>

        {/* BUTTONS */}
        <div className="button-group">
          <button 
            type="submit" 
            className="btn btn-submit"
            disabled={saving}
          >
            {saving ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
          </button>

          <button 
            type="button" 
            className="btn btn-reset"
            onClick={handleReset} 
            disabled={saving}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}