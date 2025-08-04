import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserNav from './UserNav'
import './UserProductDetail.css'

const UserProductDetail = () => {
   const {productId} = useParams()
   const navigate = useNavigate()
    
    useEffect(() => {
        getProductDetail()
    }, [])
    
    const [productData, setproductData] = useState({})
    const [loading, setLoading] = useState(true)

    const getProductDetail = async()=>{
       try {
           const res = await axios.get(`https://minikart-f25z.onrender.com/products/`+productId)
           console.log(res);
           setproductData(res.data.product)
           setLoading(false)
       } catch (err) {
           console.log(err);
           setLoading(false)
       }
    }

    const addToCart = async () => {
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

    const goToCart = () => {
        navigate('/cart');
    };

    if (loading) {
        return (
            <div>
                <UserNav />
                <div className="product-container">
                    <div className="loading">Loading product details...</div>
                </div>
            </div>
        );
    }

  return (
    <div>
        <UserNav />
        <div className='product-container'>
            <div className="main">
                <div className="left">
                    <img src={productData.image} alt={productData.title} />
                </div>
                <div className="right">
                    <h1>{productData.title}</h1>
                    <p className="description">{productData.description}</p>
                    <div className="price">
                        <h2>Price: ₹{productData.price}</h2>
                    </div>

                    <div className="bottom">
                        <button onClick={addToCart} className="add-to-cart-btn">
                            Add to Cart
                        </button>
                        <button onClick={goToCart} className="view-cart-btn">
                            View Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserProductDetail
