import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error fetching product:', err));
  }, [id]);

  const handleQuantityChange = (value) => {
    const newValue = quantity + value;
    if (newValue >= 1 && newValue <= 10) {
      setQuantity(newValue);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add to cart.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3001/users/${user.id}`);
      const userData = res.data;

      const isAlreadyInCart = userData.cart?.some(item => item.id === product.id);
      const updatedCart = isAlreadyInCart
        ? userData.cart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...(userData.cart || []), { ...product, quantity }];

      await axios.patch(`http://localhost:3001/users/${user.id}`, { cart: updatedCart });
      toast.success("Added to cart!");
    } catch (err) {
      console.error("Cart update failed:", err);
      toast.error("Failed to add to cart.");
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mt-25 mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Product Images */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg overflow-hidden mb-4">
            <img 
              src={product.images?.[selectedImage]} 
              alt={product.name} 
              className="w-full max-h-[500px] object-contain p-2"
            />
          </div>
         
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          <div className="mb-6">
            <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
            {product.discount && (
              <span className="ml-2 text-sm font-medium bg-red-100 text-red-800 px-2 py-1 rounded">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900">Details</h3>
            <ul className="mt-2 text-gray-600 list-disc pl-5">
              <li>Category: {product.category}</li>
              {product.material && <li>Material: {product.material}</li>}
              {product.color && <li>Color: {product.color}</li>}
              {product.size && <li>Size: {product.size}</li>}
            </ul>
          </div>

          <div className="flex items-center mb-8">
            <span className="mr-3 text-sm font-medium text-gray-900">Quantity</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 text-center border-x border-gray-300">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
            <button className="flex-1 bg-white border border-black text-black py-3 px-6 rounded-md font-medium hover:bg-gray-50 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
