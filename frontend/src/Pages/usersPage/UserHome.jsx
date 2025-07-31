import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import UserNav from "./UserNav";
import { useCart } from "./CartContext";
import "./UserHome.css"; 

const UserHome = () => {
  const [productData, setProductData] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("https://minikart-5t9h.onrender.com/")
      .then((res) => {
        console.log(res.data.products);
        setProductData(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.title} added to cart!`);
  };

  return (
   <div>
        <UserNav/>
     <div className="container">

      {productData.map((elem, index) => {
        return <div className="card" key={index}>
          <div className="top">
            <img
              src={elem.image}
              alt=""
            />
          </div>
          <div className="bottom">
            <Link to={`/products/detail/${elem._id}`}>{elem.title}</Link>
            <p>
              {elem.description}
            </p>
            <h2>Price : ₹{elem.price}</h2>
            <button 
              className="add-to-cart-btn" 
              onClick={() => handleAddToCart(elem)}
            >
              Add to Cart
            </button>
          </div>
        </div>;
      })}
    </div>
   </div>
  );
};

export default UserHome;
