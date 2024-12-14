// src/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, eventName) => {
    console.log("Adding item to cart:", item);
    setCart((prevCart) => {
      console.log("Current cart before addition:", prevCart);
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id && cartItem.eventName === eventName);
      if (existingItem) {
        console.log("Item already exists, increasing quantity");
        return prevCart.map(cartItem =>
          cartItem.id === item.id && cartItem.eventName === eventName
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      console.log("Item does not exist, adding to cart");
      return [...prevCart, { ...item, quantity: 1, eventName }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(cartItem => cartItem.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
