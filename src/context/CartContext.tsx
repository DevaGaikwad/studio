"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { useToast } from "@/hooks/use-toast"

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  cartItemId: string; // Unique identifier for each cart item instance
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, selectedSize: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  updateSize: (cartItemId: string, newSize: string) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, selectedSize: string) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id && item.selectedSize === selectedSize);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const cartItemId = `${product.id}-${selectedSize}-${Date.now()}`;
        return [...prevItems, { ...product, quantity: 1, selectedSize, cartItemId }];
      }
    });
     toast({
      title: "Added to cart!",
      description: `${product.name} (Size: ${selectedSize}) has been added to your cart.`,
    })
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
     if (newQuantity < 1) {
      removeItem(cartItemId);
    } else {
       setCartItems(prevItems =>
         prevItems.map(item =>
           item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
         )
       );
    }
  };

  const updateSize = (cartItemId: string, newSize: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartItemId === cartItemId ? { ...item, selectedSize: newSize } : item
      )
    );
  };

  const removeItem = (cartItemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
  };
  
  const clearCart = () => {
    setCartItems([]);
  }

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, updateSize, removeItem, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
