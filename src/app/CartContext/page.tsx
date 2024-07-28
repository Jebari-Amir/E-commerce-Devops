"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext({ pannier: [], addToCart: () => {} });

export const CartProvider = ({ children }) => {
  const [pannier, setCart] = useState([]);

  // Charger le panier du localStorage au montage du composant
  useEffect(() => {
    const savedCart = localStorage.getItem('pannier');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Sauvegarder le panier dans le localStorage chaque fois qu'il change
  useEffect(() => {
    localStorage.setItem('pannier', JSON.stringify(pannier));
  }, [pannier]);

  const addToCart = (product) => {
    setCart(prev => {
      const existingProduct = prev.find(item => item.name === product.name);
      const newCart = existingProduct ?
        prev.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        ) : [...prev, product];
      
      console.log('New cart:', newCart);
      return newCart;
    });
  };
  
  

  return (
    <CartContext.Provider value={{ pannier, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
