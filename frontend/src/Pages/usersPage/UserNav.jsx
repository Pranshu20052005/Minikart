import React from "react";
// import "./UserHome.css";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

const UserNav = () => {
  const { cart } = useCart();
  
  return (
    <nav>
      <Link to="/">
        <h2>Minikart</h2>
      </Link>
      <Link to="/">
        <div className="search">
          <input type="text" placeholder="Search products" />
          <button id="button">Search </button>
        </div>
      </Link>
      <Link to="/cart" className="cart-link">
        <i className="ri-shopping-cart-line"></i>
        {cart.length > 0 && (
          <span className="cart-count">{cart.length}</span>
        )}
      </Link>
    </nav>
  );
};

export default UserNav;
