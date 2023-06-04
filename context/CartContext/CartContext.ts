// CartContext.tsx
import React, { createContext, useState, useContext } from 'react';

type CartItemType = {
  productId: string;
  quantity: number;
}

type CartContextType = {
  cart: CartItemType[];
  addToCart: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItemType[]>([]);

  const addToCart = (productId: string, quantity: number) => {
    let newCart = [...cart];
    let existingProductIndex = newCart.findIndex(item => item.productId === productId);

    if (existingProductIndex >= 0) {
      newCart[existingProductIndex].quantity += quantity;
    } else {
      newCart.push({ productId, quantity });
    }

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
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
