import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'


const Navbar = () => {
  return ( 
    <nav>
        <h2>Minikart</h2>
        <div className='search'>
            <input type="text" placeholder='Search products' />
            <i class="ri-search-line"></i>
        </div>
        <div className="right">
          <Link to="/admin/products/add">Add new Product</Link>
        </div>
    </nav>
  )
}

export default Navbar
