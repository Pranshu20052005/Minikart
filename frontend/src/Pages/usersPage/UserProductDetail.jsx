import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useCart } from './CartContext'
import UserNav from './UserNav'
const UserProductDetail = () => {
   const {productId} = useParams()
   const { addToCart } = useCart()
    
    useEffect(() => {
        getProductDetail()

    }, [])
    
    const [productData, setproductData] = useState({})

    const handleAddToCart = () => {
        addToCart(productData);
        alert(`${productData.title} added to cart!`);
    };

    const getProductDetail = async()=>{

       await axios.get("http://localhost:3000/products/"+productId)
        .then((res)=>{
            console.log(res);
            setproductData(res.data.product)
        })
        .catch((err)=>{
            console.log(err);
        })

    }

  return (
    <div>
      <UserNav />
      <div className='product-container'>
        <div className="main">
          <div className="left">
              <img src={productData.image} alt="" />
          </div>
          <div className="right">
              <h1>{productData.title}</h1>
              <p>{productData.description}</p>
                             <h2>Price: ₹{productData.price}</h2>

              <div className="bottom">
                  <button>Buy now</button>
                  <button onClick={handleAddToCart}>Add to Cart</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProductDetail
