/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import React, { useState, memo } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';


interface CartPopupProps {
  onClose: () => void;
}

export const CartPopup: React.FC<CartPopupProps> = memo(({ onClose }) => {
  console.log("CartPopup is being rendered");
  const cartItems  = ["product", "prod1"]
  console.log("logss", cartItems);

  console.log("Cart items in CartPopup:", cartItems);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-black opacity-25" onClick={onClose}></div>
    <div className="relative bg-white w-full max-w-lg mx-auto p-6 rounded shadow-lg z-60">
      <h2 className="text-2xl font-bold mb-4 text-black">Your Cart</h2>
      {/* Display cart items */}
      {cartItems.length === 0 ? (
        <p className='my-6'>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="mb-4 text-black">
            <span className="font-semibold ">{item.name}</span>
            <span className="ml-4">Quantity: {item.quantity}</span>
          </div>
        ))
      )}
      {/* Button to go to the cart */}
      <Link href="/cart">
        <span onClick={onClose} className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
          Go to Cart
        </span>
      </Link>
    </div>
  </div>
  );
});