// src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [wishlist, setWishlist] = useState(user?.wishlist || []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleWishlistToggle = async (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    let updatedWishlist = isInWishlist
      ? wishlist.filter(item => item.id !== product.id)
      : [...wishlist, product];

    try {
      const res = await axios.patch(`http://localhost:3001/users/${user.id}`, {
        wishlist: updatedWishlist
      });

      const updatedUser = { ...user, wishlist: updatedWishlist };
      setWishlist(updatedWishlist);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  if (loading) return <p className="p-6 text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-2xl mt-10 font-bold mb-6 text-gray-900">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onWishlistToggle={handleWishlistToggle}
            isInWishlist={wishlist.some(item => item.id === product.id)}
          />
        ))}
      </div>
    </div>
  );
}
