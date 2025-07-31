import React from 'react'
import Navbar from './components/Navbar'
import 'remixicon/fonts/remixicon.css'
import AddProducts from "./Pages/AddProducts"
import { Routes , Route } from 'react-router-dom'
import Home from './Pages/Home'
import ProductDetail from './Pages/ProductDetail'
import UserHome from './Pages/usersPage/UserHome'
import UserProductDetail from './Pages/usersPage/UserProductDetail'
import Cart from './Pages/usersPage/Cart'
import { CartProvider } from './Pages/usersPage/CartContext'

const App = () => {
  return (
    <CartProvider>
      <div>
        <Routes>
          <Route path='/' element={<UserHome/>}/>
          <Route path='/products/detail/:productId' element={<UserProductDetail/>}/>
          <Route path='/cart' element={<Cart/>}/>
   
          <Route  path='/admin/' element={<Home/>}/>
          <Route  path='/admin/products/add' element={<AddProducts/>}/>
          <Route  path='/admin/products/detail/:productId'  element={<ProductDetail/>}/>
        </Routes> 
      </div>
    </CartProvider>
  )
}

export default App
