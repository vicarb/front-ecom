// RootLayout.js
import './globals.css'
import { ReactNode } from 'react';
import { Inter } from 'next/font/google'
import { CartProvider } from '@/context/CartContext/CartContext';
import Footer from '@/components/Footer/Footer';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Book your services',
  description: 'Generated by create next app',
}

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <Footer/>
        </CartProvider>
      </body>
    </html>
  )
}
