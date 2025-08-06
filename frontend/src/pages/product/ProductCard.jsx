// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

export default function ProductCard({ product, onWishlistToggle, isInWishlist }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wasInWishlist = isInWishlist;
    onWishlistToggle(product);
    
    // Show toast notification
    if (wasInWishlist) {
      toast.success('Removed from wishlist', {
        position: 'top-center',
        duration: 2000,
        icon: '❌',
        style: {
          background: '#fef2f2',
          color: '#b91c1c',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      });
    } else {
      toast.success('Added to wishlist!', {
        position: 'top-center',
        duration: 2000,
        icon: '❤️',
        style: {
          background: '#ecfdf5',
          color: '#065f46',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      });
    }
  };

  return (
    <div 
      className="group relative rounded-md p-4 shadow-sm hover:shadow-md transition cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-md">
        <img
          alt={product.name}
          src={product.images[0]}
          className={`aspect-square w-full rounded-md object-cover mb-4 transition-transform duration-300 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
            isHovered || isInWishlist ? 'opacity-100' : 'opacity-0'
          } ${isInWishlist ? 'bg-red-50' : 'bg-white/80 backdrop-blur-sm'} hover:bg-white`}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? (
            <HeartSolid className="w-5 h-5" />
          ) : (
            <HeartOutline className="w-5 h-5 text-gray-7" />
          )}
        </button>
        
        {/* Product badge (example: sale/new) */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
            New
          </span>
        )}
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</h3>
          <p className="text-xs text-gray-500">{product.category}</p>
        </div>
        {product.originalPrice && (
          <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-1">
        <p className="text-base font-semibold text-gray-900">₹{product.price}</p>
        {product.rating && (
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
          </div>
        )}
      </div>
    </div>
  );
}