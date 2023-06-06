'use client'
import React from "react";
import { useSpring, animated } from "@react-spring/web";

export default function Footer() {
  const springProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
  });

  return (
    <animated.footer
      style={springProps}
      className="bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 text-white mt-auto py-4"
    >
      <div className="container mx-auto px-6 py-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold hover:text-gray-300">My Company</h1>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:underline hover:text-gray-300"
            >
              About Us
            </a>
            <a
              href="#"
              className="hover:underline hover:text-gray-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:underline hover:text-gray-300"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-300">
            © 2023 by My Company. All rights reserved.
          </p>
        </div>
      </div>
    </animated.footer>
  );
}
