import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./productDetail.css"
import axios from 'axios'
import Navbar from "../components/Navbar";

const ProductDetail = () => {
   const {productId} = useParams()
   const [productData, setProductData] = useState({})
   const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        getProductDetail()
    }, [])
    

    const getProductDetail = async()=>{
       try {
           const res = await axios.get(`https://minikart-backend-rbvj.onrender.com/products/`+productId)
           console.log(res);
           setProductData(res.data.product)
           setLoading(false)
       } catch (err) {
           console.log(err);
           setLoading(false)
       }
    }

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="product-container">
                    <div className="loading">Loading product details...</div>
                </div>
            </div>
        );
    }

  return (
    <div>
        <Navbar />
        <div className='product-container'>
            <div className="main">
                <div className="left">
                    <img src={productData.image} alt={productData.title} />
                </div>
                <div className="right">
                    <h1>{productData.title}</h1>
                    <p>{productData.description}</p>
                    <div className="price">
                        <h2>Price: ₹{productData.price}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetail
