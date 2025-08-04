import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/`);
      console.log(res.data.products);
      setProductData(res.data.products);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="loading">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="products-grid">
          {productData.map((elem, index) => (
            <div className="card" key={index}>
              <div className="top">
                <img src={elem.image} alt={elem.title} />
              </div>
              <div className="bottom">
                <Link to={`/admin/products/detail/${elem._id}`}>{elem.title}</Link>
                <p>{elem.description}</p>
                <h2>Price: ₹{elem.price}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
