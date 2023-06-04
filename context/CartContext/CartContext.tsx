'use client'
import React, { createContext, useState, useContext } from 'react';

// Define the type of our product
interface ProductType {
  _id: string;
  title: string;
  description: string;
  extraImages: string[];
  mainImage: string;
  price: number;
}

// Define the type of our cart items
interface CartItemType {
  productId: ProductType;
  quantity: number;
}

// Define the shape of our context state and actions
interface CartContextType {
  cart: CartItemType[];
  addToCart: (product: ProductType, quantity: number) => void;
}

// Create our context
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItemType[]>([]);

  const addToCart = (product: ProductType, quantity: number) => {
    let newCart = [...cart];
    let existingProductIndex = newCart.findIndex(item => item.productId._id === product._id);

    if (existingProductIndex >= 0) {
      newCart[existingProductIndex].quantity += quantity;
    } else {
      newCart.push({ productId: product, quantity });
    }

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    console.log(cart);
    
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context;
}
