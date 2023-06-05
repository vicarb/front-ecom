'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { Product } from '@/interfaces/Product/Product';
import { useTransition, animated } from '@react-spring/web';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await axios.get(`https://composterasur.cl/products`);
      setProducts(response.data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const transitions = useTransition(products, {
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    trail: 200,
    config: {
      tension: 170,
      friction: 20,
      precision: 0.1,
    },
  });

  if (loading) {
    return <div>Loading...</div>; // replace with your preferred loading placeholder
  }

  return (
    <div className="min-h-fit bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center mt-12">Our Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {transitions((styles, product) => (
            <animated.div
              key={product._id}
              className="bg-white rounded-md shadow-md transition duration-300 transform hover:scale-105"
              onMouseEnter={() => setHoveredProductId(product._id)}
              onMouseLeave={() => setHoveredProductId(null)}
              style={styles}
            >
              <div className="h-64 w-full relative">
                <Link href={`/product/${product._id}`}>
                  <span>
                    <Image 
                      src={product.mainImage} 
                      alt={product.title} 
                      layout="fill" 
                      objectFit="cover" 
                      className="rounded-t-md"
                    />
                  </span>
                </Link>
                <div className="absolute bottom-0 right-0 mr-4 mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-2 py-1 rounded-md">
                  ${product.price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <Link href={`/product/${product._id}`}>
                  <span className={`absolute bottom-0 right-0 mr-4 mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-md transition-opacity duration-300 ${hoveredProductId === product._id ? 'opacity-100' : 'opacity-0'}`}>
                    Ver Producto
                  </span>
                </Link>
                <button
                  className={`absolute bottom-0 left-0 ml-4 mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-md transition-opacity duration-300 ${hoveredProductId === product._id ? 'opacity-100' : 'opacity-0'}`}
                  onClick={() => handleAddToCart(product)}
                >
                  <span className="sr-only">Agregar al Carrito</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
              <h2 className="px-4 py-2 text-gray-800 font-semibold text-lg">{product.title}</h2>
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
