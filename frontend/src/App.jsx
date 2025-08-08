import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/landingpage/Landing';
import Navbar from './components/Navbar';
import Login from './context/Login';
import Registration from './context/Registration';
import Products from './pages/product/product';
import WishlistPage from './pages/wishlist/WishlistPage';
import { Toaster } from 'react-hot-toast';
import './app.css';
import Profile from './pages/Profile/profile';
import ProductDetails from './pages/product/ProductDetails';
import CartPage from './pages/Cart/CartPage';
import AboutPage from './pages/About';
import CategoryCards from './pages/landingpage/CategoriesCards';
import CallPay from './pages/payment/CallPay';
import OrderConfirmation from './pages/Orders/OrderConfirmation';
import OrderList from './pages/Orders/OrderList';


function App() {
   const location=useLocation();
   const hideNav=['/order-list','/login','/order-confirmation','/registration',"/payment"]
  return (
    <>
      {!hideNav.includes(location.pathname) && <Navbar /> }
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#fff',
            color: '#333',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            padding: '16px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            zIndex: 9999,
          },
        }}
      />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/products' element={<Products />} />
        <Route path='/wishlist' element={<WishlistPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={< CallPay />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/about" element={<CategoryCards/>} />
        <Route path="/order-confirmation" element={<OrderConfirmation/>} />
        <Route path="/order-list" element={<OrderList/>} />

      </Routes>
    </>
  );
}

export default App;
