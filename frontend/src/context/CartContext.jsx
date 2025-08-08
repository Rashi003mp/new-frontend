// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useAuth } from './AuthContext';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const { user } = useAuth();
//     const [cart, setCart] = useState([]);

//     // Load cart from user data
//     useEffect(() => {
//         if (user && user.cart) {
//             setCart(user.cart);
//         } else {
//             setCart([]);
//         }
//     }, [user]);

//     const addToCart = async (product, quantity = 1) => {
//         // Implementation for adding to cart
//     };

//     const removeFromCart = async (productId) => {
//         // Implementation for removing from cart
//     };

//     const updateQuantity = async (productId, newQuantity) => {
//         // Implementation for updating quantity
//     };

//     const clearCart = async () => {
//         if (user) {
//             try {
//                 await fetch(`http://localhost:3001/users/${user.id}`, {
//                     method: 'PATCH',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ cart: [] })
//                 });
//                 setCart([]);
//             } catch (error) {
//                 console.error('Error clearing cart:', error);
//             }
//         } else {
//             setCart([]);
//         }
//     };

//     return (
//         <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => useContext(CartContext);