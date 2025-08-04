import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserNav.css";

const UserNav = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <nav className="user-nav">
      <div className="nav-left">
        <Link to="/user">
          <h2>Minikart</h2>
        </Link>
      </div>
      
      <div className="nav-center">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <i className="ri-search-line"></i>
          </button>
        </form>
      </div>
      
      <div className="nav-right">
        <Link to="/cart" className="cart-link">
          <i className="ri-shopping-cart-line"></i>
          <span>Cart</span>
        </Link>
        <button onClick={handleLogout} className="logout-btn">
          <i className="ri-logout-box-line"></i>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default UserNav;
