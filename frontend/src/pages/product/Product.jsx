import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SubNav from '../../components/Subnav';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (e) {
      return null;
    }
  });
  
  const [wishlist, setWishlist] = useState(user?.wishlist || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products and categories in parallel
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('http://localhost:3001/products'),
          axios.get('http://localhost:3001/category')
        ]);
        
        setProducts(productsRes.data);
        setFilteredProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data. Please try again later.');
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products based on active category
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => 
        product.category === activeCategory
      ));
    }
  }, [activeCategory, products]);

  const handleWishlistToggle = async (product) => {
    if (!user) {
      toast('Please login to manage your wishlist', {
        icon: '🔒',
        style: {
          background: '#ffebee',
          color: '#d32f2f',
        }
      });
      return;
    }

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
      
      toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist!');
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      toast.error('Failed to update wishlist');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center py-12 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <>
      <SubNav 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        categories={categories}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-2xl mt-10 font-bold mb-6 text-gray-900">
          {activeCategory === 'all' ? 'All Products' : activeCategory}
        </h1>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No {activeCategory === 'all' ? 'products' : activeCategory.toLowerCase()} found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onWishlistToggle={handleWishlistToggle}
                isInWishlist={wishlist.some(item => item.id === product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}