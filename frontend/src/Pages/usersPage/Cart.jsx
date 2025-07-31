import React from 'react';
import {useCart} from './CartContext';
import UserNav from './UserNav';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();

    return (
        <div>
            <UserNav />
            <div className="head">
                <h1>Your Cart</h1>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div className="cart-items">
                        {cart.map((item, index) => (
                                                         <div key={index} className="cart-item">
                                 <img src={item.image} alt={item.title} />
                                 <div className="item-details">
                                     <h3>{item.title}</h3>
                                     <p>{item.description}</p>
                                     <p className="price">Price: ₹{item.price}</p>
                                     <div className="quantity-controls">
                                         <button 
                                             className="quantity-btn" 
                                             onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
                                         >
                                             -
                                         </button>
                                         <span className="quantity">{item.quantity || 1}</span>
                                         <button 
                                             className="quantity-btn" 
                                             onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                                         >
                                             +
                                         </button>
                                     </div>
                                 </div>
                                 <button 
                                     className="remove-btn" 
                                     onClick={() => removeFromCart(index)}
                                     title="Remove from cart"
                                 >
                                     <i className="ri-delete-bin-line"></i>
                                 </button>
                             </div>
                        ))}
                        <div className="cart-total">
                                                         <h3>Total: ₹{cart.reduce((sum, item) => sum + (parseFloat(item.price) * (item.quantity || 1)), 0).toFixed(2)}</h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Cart;


