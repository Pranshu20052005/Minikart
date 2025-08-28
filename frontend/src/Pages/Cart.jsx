import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserNav from './usersPage/UserNav';
import './Cart.css';
import API_BASE_URL from '../config/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/cart`, {
        withCredentials: true
      });
      
      if (response.data.success) {
        setCartItems(response.data.cartItems || []);
        setTotalPrice(response.data.totalPrice || 0);
      } else {
        toast.error(response.data.message || 'Failed to load cart');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      const errorMessage = error.response?.data?.error || 'Failed to load cart. Please try again.';
      
      if (error.response?.status === 401) {
        // Redirect to login if not authenticated
        navigate('/login', { state: { from: '/cart' } });
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (!isAuthenticated) {
      toast.error('Please login to update cart');
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    try {
      if (newQuantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      setUpdating(true);
      const response = await axios.put(
        `${API_BASE_URL}/cart/update/${productId}`, 
        { quantity: newQuantity },
        { withCredentials: true }
      );
      
      if (response.data.success) {
        await fetchCartItems();
        toast.success('Cart updated successfully');
      } else {
        toast.error(response.data.message || 'Failed to update cart');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      const errorMessage = error.response?.data?.error || 'Failed to update cart. Please try again.';
      toast.error(errorMessage);
      
      if (error.response?.status === 401) {
        navigate('/login', { state: { from: '/cart' } });
      }
    } finally {
      setUpdating(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!window.confirm('Are you sure you want to remove this item from your cart?')) {
      return;
    }
    
    try {
      setUpdating(true);
      const response = await axios.delete(
        `${API_BASE_URL}/cart/remove/${productId}`,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        await fetchCartItems();
        toast.success('Item removed from cart');
      } else {
        toast.error(response.data.message || 'Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      const errorMessage = error.response?.data?.error || 'Failed to remove item. Please try again.';
      toast.error(errorMessage);
      
      if (error.response?.status === 401) {
        navigate('/login', { state: { from: '/cart' } });
      }
    } finally {
      setUpdating(false);
    }
  };

  const clearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart? This action cannot be undone.')) {
      return;
    }
    
    try {
      setUpdating(true);
      const response = await axios.delete(
        `${API_BASE_URL}/cart/clear`,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setCartItems([]);
        setTotalPrice(0);
        toast.success('Cart cleared successfully');
      } else {
        toast.error(response.data.message || 'Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      const errorMessage = error.response?.data?.error || 'Failed to clear cart. Please try again.';
      toast.error(errorMessage);
      
      if (error.response?.status === 401) {
        navigate('/login', { state: { from: '/cart' } });
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div>
        <UserNav />
        <div className="cart-container">
          <h1>Shopping Cart</h1>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div>
        <UserNav />
        <div className="cart-container">
          <h1>Shopping Cart</h1>
          <div className="auth-required">
            <h2>Please sign in to view your cart</h2>
            <p>You need to be logged in to view and manage your shopping cart.</p>
            <div className="auth-actions">
              <button 
                onClick={() => navigate('/login', { state: { from: '/cart' } })}
                className="login-button"
              >
                Sign In
              </button>
              <Link to="/register" className="register-link">
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UserNav />
      <div className="cart-container">
        <h1>Shopping Cart {cartItems.length > 0 && `(${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'})`}</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/user" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="item-image">
                    <img src={item.productId.image} alt={item.productId.title} />
                  </div>
                  <div className="item-details">
                    <h3>{item.productId.title}</h3>
                    <p className="item-description">{item.productId.description}</p>
                    <p className="item-price">₹{item.productId.price}</p>
                  </div>
                  <div className="item-quantity">
                    <button 
                      onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    <p>₹{(item.productId.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.productId._id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-item">
                <span>Total Items:</span>
                <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
              </div>
              <div className="summary-item total">
                <span>Total Price:</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="cart-actions">
                <button onClick={clearCart} className="clear-cart-btn">
                  Clear Cart
                </button>
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 
