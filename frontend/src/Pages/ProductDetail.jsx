import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./productDetail.css";
import axios from 'axios';
import Navbar from "../components/Navbar";
import API_BASE_URL from '../config/api';

const ProductDetail = () => {
   const { productId } = useParams();
   const navigate = useNavigate();
   const [productData, setProductData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');
    
   useEffect(() => {
      getProductDetail();
   }, [productId]);
   
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
                    <p>{productData.description}</p>
                    <div className="price">
                        <h2>Price: ₹{productData.price}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetail
