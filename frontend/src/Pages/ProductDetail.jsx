import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "./productDetail.css"
import axios from 'axios'
const ProductDetail = () => {

   const {productId} = useParams()
    
    useEffect(() => {
        getProductDetail()

    }, [])
    

    const getProductDetail = async()=>{

       await axios.get("https://minikart-5t9h.onrender.com/products/"+productId)
        .then((res)=>{
            console.log(res);
            
        })
        .catch((err)=>{
            console.log(err);
        })

    }

  return (
    <div className='product-container'>
     
      <div className="main">
        <div className="left">
            {/* {<img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /> } */}
        </div>
        {/* <div className="right">
            <h1>Title</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, perspiciatis quas nostrum est non quia dolor odio dolore? Error, distinctio.</p>
        </div> */}
      </div>
    </div>
  )
}

export default ProductDetail
