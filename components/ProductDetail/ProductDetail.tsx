'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { animated, useSpring } from '@react-spring/web'
import { Params } from '@/interfaces/Params/Params';
import { Product } from '@/interfaces/Product/Product';
import { useCart } from '@/context/CartContext/CartContext';

const ProductDetailPage = ({ params }: { params: Params }) => {
  const { addToCart } = useCart(); 
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState('');
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  const imageFade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    reset: !hasImageLoaded, // only reset when image has not loaded yet
    onRest: () => setHasImageLoaded(true), // set hasImageLoaded to true when the animation is done
  });



  const buttonSpring = useSpring({
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(1.05)' },
    reset: true,
  });

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const response = await axios.get(`https://composterasur.cl/products/${id}`);
    const data = response.data;
    setProduct(data);
    setMainImage(data.mainImage);
    setThumbnails([data.mainImage, ...data.extraImages]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-500">
      <div className="mt-16 min-h-screen text-white z-10">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="w-full h-80 md:h-auto z-40 overflow-hidden max-w-xs mx-auto">
                <animated.div style={imageFade}>
                  <Image src={mainImage} alt={product?.title ?? ''} layout="responsive" style={{objectFit:"cover"}} width={500/3} height={500/3} />
                </animated.div>
              </div>
              <div className="mt-4 flex justify-between max-w-xs mx-auto">
                {thumbnails.map((thumbnail, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(thumbnail)}
                    className="w-16 h-16 overflow-hidden"
                  >
                    <Image src={thumbnail} alt={`Thumbnail-${index}`} width="60" height="60" style={{objectFit:"cover"}} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">{product?.title}</h1>
              <p className="text-lg mb-6">{product?.description}</p>
              <div className="flex items-center">
                <span className="text-3xl font-bold">
                  ${product?.price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <animated.button
  style={buttonSpring}
  className="px-4 py-2 ml-6 bg-white text-gray-800 text-sm font-semibold rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
  onClick={() => product && addToCart(product, 1)}
>
  Add to Cart
</animated.button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
