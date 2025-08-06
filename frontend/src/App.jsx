import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/landingpage/Landing';
import Navbar from './components/Navbar';
import Login from './context/Login';
import Registration from './context/Registration';
import Products from './pages/product/product';
import WishlistPage from './pages/wishlist/WishlistPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/products' element={<Products/>}/>
        <Route path='/wishlist' element={<WishlistPage/>}/>
      </Routes>
    </>
  );
}

export default App;
