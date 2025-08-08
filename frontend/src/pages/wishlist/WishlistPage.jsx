import React, { useEffect, useState } from 'react';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const updateWishlist = async (updatedWishlist) => {
    try {
      if (user?.id) {
        await axios.patch(`http://localhost:3001/users/${user.id}`, {
          wishlist: updatedWishlist
        });
      }
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlist(updatedWishlist);
      return true;
    } catch (err) {
      console.error('Failed to update wishlist:', err);
      toast.error('Failed to update wishlist');
      return false;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        if (user?.id) {
          const response = await axios.get(`http://localhost:3001/users/${user.id}`);
          const userWishlist = response.data.wishlist || [];
          
          const mergedWishlist = [...new Map(
            [...localWishlist, ...userWishlist].map(item => [item.id, item])
          ).values()];
          
          setWishlist(Array.from(mergedWishlist));
          localStorage.setItem('wishlist', JSON.stringify(mergedWishlist));
          
          if (localWishlist.length > 0) {
            await updateWishlist(mergedWishlist);
          }
        } else {
          setWishlist(localWishlist);
        }
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch wishlist:', err);
        const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(localWishlist);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleWishlistToggle = async (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    const updatedWishlist = isInWishlist
      ? wishlist.filter(item => item.id !== product.id)
      : [...wishlist, product];
    
    const success = await updateWishlist(updatedWishlist);
    if (success) {
      toast.success(
        isInWishlist ? 'Removed from wishlist' : 'Added to wishlist!',
        { position: 'top-center', duration: 2000 }
      );
    }
  };

  const handleClearAll = async () => {
    const confirm = window.confirm('Are you sure you want to clear your entire wishlist?');
    if (!confirm) return;
    
    try {
      if (user?.id) {
        await axios.patch(`http://localhost:3001/users/${user.id}`, {
          wishlist: []
        });
      }
      
      localStorage.removeItem('wishlist');
      
      setWishlist([]);
      
      toast.success('Wishlist cleared successfully', { 
        position: 'top-center',
        duration: 2000
      });
    } catch (err) {
      console.error('Failed to clear wishlist:', err);
      toast.error('Failed to clear wishlist');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 pt-25 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 pt-25 text-center">
        <p className="text-red-500 mb-4">Error loading wishlist: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-25">
      {/* <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        {wishlist.length > 0 && (
          <button 
            onClick={handleClearAll}
            className="ml-auto text-sm text-red-500 hover:text-red-700"
          >
            Clear All
          </button>
        )}
      </div> */}
      
      {wishlist.length === 0 ? (
        <div className="text-center py-16 max-w-md mx-auto">
  <HeartSolid className="w-16 h-16 mx-auto text-gray-400 mb-6" />
  <h2 className="text-2xl font-light text-gray-800 mb-3 tracking-wide">YOUR WISHLIST IS EMPTY</h2>
  <p className="text-gray-600 mb-8 text-sm font-light tracking-wider">Save your favorite items here for later</p>
  <Link
    to="/products"
    className="inline-block px-8 py-3 bg-black text-white 
               border border-black hover:bg-white hover:text-black 
               transition-all duration-300 uppercase text-xs 
               tracking-widest font-medium focus:outline-none"
  >
    DISCOVER OUR COLLECTION
  </Link>
</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isInWishlist={true}
              onWishlistToggle={handleWishlistToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;

