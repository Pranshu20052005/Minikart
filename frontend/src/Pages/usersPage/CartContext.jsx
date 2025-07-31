import { createContext, useState , useContext } from "react";
import React from 'react';
import './Cart.css';
 const CartContext = createContext();
 export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            // Check if product already exists in cart
            const existingIndex = prevCart.findIndex(item => item._id === product._id);
            
            if (existingIndex >= 0) {
                // If product exists, increase quantity
                return prevCart.map((item, index) => 
                    index === existingIndex 
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                // If product doesn't exist, add with quantity 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(index);
        } else {
            setCart((prevCart) => 
                prevCart.map((item, i) => 
                    i === index ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };
    
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () =>  useContext(CartContext);
    
