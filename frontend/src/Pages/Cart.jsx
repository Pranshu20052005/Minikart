import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserNav from './usersPage/UserNav';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('https://minikart-backend-rbvj.onrender.com/cart');
      setCartItems(response.data.cartItems);
      setTotalPrice(response.data.totalPrice);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      await axios.put(`https://minikart-backend-rbvj.onrender.com/cart/update/${productId}`, {
        quantity: newQuantity
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`https://minikart-backend-rbvj.onrender.com/cart/remove/${productId}`);
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`https://minikart-backend-rbvj.onrender.com/cart/clear`);
      fetchCartItems();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  if (loading) {
    return (
      <div>
        <UserNav />
        <div className="cart-container">
          <div className="loading">Loading cart...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UserNav />
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart to get started!</p>
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