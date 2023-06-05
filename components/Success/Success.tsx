'use client'
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const Success = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token_ws = searchParams.get('token_ws');
  console.log("search params",token_ws);
  

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const response = await axios.put(`/api/confirm-payment/${token_ws}`);
        console.log(response.data);
        // do something with the response data
      } catch (error) {
        console.log(error);
      }
    };

    if (token_ws) {
      confirmPayment();
    }
  }, [token_ws]);
    

    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-24 h-24 text-green-500 stroke-current stroke-2">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Payment Successful</h2>
        <p className="text-lg text-gray-500 mb-8">Token: {token_ws}</p>
        <p className="text-gray-600 mb-8 text-center">Thank you for your purchase.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href = '/'}>Return to homepage</button>
      </div>
    );
  };
  

export default Success;