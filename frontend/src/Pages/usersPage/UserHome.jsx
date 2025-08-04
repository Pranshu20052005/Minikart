import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserNav from "./UserNav";
import "./UserHome.css";

const UserHome = () => {
  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`https://minikart-f25z.onrender.com/`);
      console.log(res.data.products);
      setProductData(res.data.products);
      setFilteredProducts(res.data.products);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post(`https://minikart-f25z.onrender.com/cart/add/${productId}`, {
        quantity: 1
      });
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart");
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = productData.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div>
        <UserNav onSearch={handleSearch} />
        <div className="container">
          <div className="loading">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UserNav onSearch={handleSearch} />
      <div className="container">
        <div className="products-grid">
          {filteredProducts.map((elem, index) => (
            <div className="card" key={index}>
              <div className="top">
                <img src={elem.image} alt={elem.title} />
              </div>
              <div className="bottom">
                <Link to={`/products/detail/${elem._id}`}>{elem.title}</Link>
                <p>{elem.description}</p>
                <h2>Price: ₹{elem.price}</h2>
                <button 
                  onClick={() => addToCart(elem._id)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <p>No products found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
