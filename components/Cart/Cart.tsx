'use client'
import React from 'react';
import { useCart } from '@/context/CartContext/CartContext';
import Link from 'next/link';

const Cart = () => {
  const { cart  } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 mt-12">Cart</h2>
        {cart.length === 0 ? (
          <div className="text-xl font-bold mb-4">
            Your cart is empty!{' '}
            <Link href="/">
              <span className="underline">Go shop some products</span>
            </Link>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.product._id} className="border border-gray-300 rounded-md p-4 mb-4">
                <h3 className="text-2xl font-bold mb-2">{item.product.title}</h3>
                <p className="text-lg mb-2">{item.product.description}</p>
                <p className="text-lg font-bold mb-4">${item.product.price.toFixed(2)}</p>
                <p className="text-lg font-bold mb-2">Quantity: {item.quantity}</p>
              </div>
            ))}
            <button className="bg-white text-black px-4 py-2 rounded-md font-semibold" onClick={() => {}}>
  Clear cart
</button>
            <Link href="/checkout">
              <span className="bg-white text-black px-4 py-2 rounded-md font-semibold ml-4">Checkout</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;