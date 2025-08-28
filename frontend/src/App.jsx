import React from 'react';
import 'remixicon/fonts/remixicon.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import AddProducts from "./Pages/AddProducts";
import Home from './Pages/Home';
import ProductDetail from './Pages/ProductDetail';
import UserHome from './Pages/usersPage/UserHome';
import UserProductDetail from './Pages/usersPage/UserProductDetail';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import { useEffect } from 'react';

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated and not on login page
  useEffect(() => {
    if (!loading && !isAuthenticated && window.location.pathname !== '/') {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/user' element={<UserHome />} />
      <Route path='/products/detail/:productId' element={<UserProductDetail />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/admin/' element={<Home />} />
      <Route path='/admin/products/add' element={<AddProducts />} />
      <Route path='/admin/products/detail/:productId' element={<ProductDetail />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <main>
          <AppContent />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App
