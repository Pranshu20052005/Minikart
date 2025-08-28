import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./productDetail.css";
import axios from 'axios';
import Navbar from "../components/Navbar";
import API_BASE_URL from '../config/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';

const ProductDetail = () => {
   const { productId } = useParams();
   const navigate = useNavigate();
   const [productData, setProductData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');
   const [quantity, setQuantity] = useState(1);
   const [addingToCart, setAddingToCart] = useState(false);
   const { isAuthenticated } = useContext(AuthContext);
     
   useEffect(() => {
      getProductDetail();
   }, [productId]);

   const handleQuantityChange = (e) => {
      const value = parseInt(e.target.value);
      if (value > 0) {
         setQuantity(value);
      }
   };

   const handleAddToCart = async () => {
      if (!isAuthenticated) {
         toast.error('Please login to add items to cart');
         navigate('/login', { state: { from: `/product/${productId}` } });
         return;
      }

      try {
         setAddingToCart(true);
         const response = await axios.post(
            `${API_BASE_URL}/cart/add/${productId}`, 
            { quantity },
            { withCredentials: true }
         );
         
         if (response.data.success) {
            toast.success('Product added to cart successfully!');
         } else {
            toast.error(response.data.message || 'Failed to add to cart');
         }
      } catch (error) {
         console.error('Error adding to cart:', error);
         const errorMessage = error.response?.data?.error || 'Failed to add to cart';
         toast.error(errorMessage);
         
         if (error.response?.status === 401) {
            // Redirect to login if not authenticated
            navigate('/login', { state: { from: `/product/${productId}` } });
         }
      } finally {
         setAddingToCart(false);
      }
   };
   
   const getProductDetail = async () => {
      try {
         setLoading(true);
         setError('');
         const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
         
         if (response.data.success && response.data.product) {
            setProductData(response.data.product);
         } else {
            setError(response.data.message || 'Failed to load product');
         }
      } catch (err) {
         console.error('Error fetching product:', err);
         const errorMessage = err.response?.data?.message || 'An error occurred while fetching the product';
         setError(errorMessage);
         
         // Redirect to home page if product not found
         if (err.response?.status === 404) {
            setTimeout(() => {
               navigate('/');
            }, 2000);
         }
      } finally {
         setLoading(false);
      }
   };

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="product-container">
                    <div className="loading">Loading product details...</div>
                </div>
            </div>
        );
    }

    if (error || !productData) {
        return (
            <div>
                <Navbar />
                <div className="product-container">
                    <div className="error">
                        {error || 'Product not found'}
                        <button onClick={() => navigate('/')} className="back-button">
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

  return (
    <div>
        <Navbar />
        <div className='product-container'>
            <div className="main">
                <div className="left">
                    <img src={productData.image} alt={productData.title} />
                </div>
                <div className="right">
                    <h1>{productData.title}</h1>
                    <p className="description">{productData.description}</p>
                    <div className="price">
                        <h2>Price: ₹{productData.price.toLocaleString('en-IN')}</h2>
                    </div>
                    
                    <div className="quantity-selector">
                        <label htmlFor="quantity">Quantity:</label>
                        <input 
                            type="number" 
                            id="quantity"
                            min="1" 
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="quantity-input"
                        />
                    </div>
                    
                    <button 
                        onClick={handleAddToCart}
                        disabled={addingToCart}
                        className="add-to-cart-btn"
                    >
                        {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                    </button>
                    
                    <div className="product-meta">
                        <span>Category: {productData.category}</span>
                        <span>In Stock: {productData.stock || 'Available'}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetail
