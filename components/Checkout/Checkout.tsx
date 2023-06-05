'use client'
import React, { useState, useContext } from 'react'
import axios, {AxiosError} from 'axios';
import { CartItemType } from '@/interfaces/CartItemType/CartItemType';

import { useCart } from '@/context/CartContext/CartContext';

// calculate the total price of all cart items
const calculateTotal = (items: CartItemType[]) => {
  return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
};

const Checkout = () => {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zip: ''
  });
  
  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await axios.post('https://singular-marzipan-df9366.netlify.app/api/checkout', {
        total: calculateTotal(cart),
        sessionId: Math.floor(Math.random() * 1000000000).toString(),
        buyOrder: Math.floor(Math.random() * 1000000000).toString(),
        returnUrl: 'http://127.0.0.1:3000/success',
      });
      const url = response.data.url;
      const token = response.data.token;
  
      const form = document.createElement('form');
      form.method = 'post';
      form.action = url;
  
      const tokenInput = document.createElement('input');
      tokenInput.type = 'hidden';
      tokenInput.name = 'token_ws';
      tokenInput.value = token;
  
      form.appendChild(tokenInput);
  
      document.body.appendChild(form);

      form.submit();

    } catch (error: AxiosError | any) {
      console.error(error);
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      }
    }
    setLoading(false);
  };

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prevState => ({ ...prevState, [name]: value }));
}


  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // rest of the function code
  }
  return(
    <div className="container mx-auto my-24">
    <div className="flex flex-wrap mx-4">
      <div className="w-full md:w-1/2 px-4">
        <div className="border rounded-md shadow-md p-4 bg-orange-50">
          <h2 className="font-bold text-lg mb-2">Delivery Information</h2>
          <form>
            <div className="mb-4 bg-slate">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="John Doe"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="johndoe@example.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                Address
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="123 Main St"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
                City
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                type="text"
                placeholder="Anytown"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="state">
                State
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="state"
                type="text"
                placeholder="CA"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="zip">
                Zip
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="zip"
                type="text"
                placeholder="12345"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="w-full md:w-1/2 px-4 mt-12 md:mt-0">
      <div className="border rounded-md shadow-md p-4 bg-orange-50">
        <h2 className="font-bold text-lg mb-2">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.product._id} className="flex justify-between border-t pt-2 mt-2">
            <p className="text-gray-800 font-semibold">{item.product.title} x {item.quantity}</p>
            <p className="text-gray-800 font-semibold">${item.product.price}</p>
          </div>
        ))}
        <div className="flex justify-between border-t pt-2 mt-2">
          <p className="text-gray-500">Delivery</p>
          <p className="text-gray-500">$0</p>
        </div>
        <div className="flex justify-between border-t pt-2 mt-2">
          <p className="text-gray-500 font-bold">Total</p>
          <p className="text-gray-500 font-bold">${calculateTotal(cart)}</p>
        </div>

        <button
          className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white px-4 py-2 rounded-md font-semibold cursor-pointer"
          onClick={handleCheckout}
        >
          {loading ? "Loading..." : "Ir a pagar"}
        </button>
      </div>
    </div>
  </div>
</div>



  )}

export default Checkout;