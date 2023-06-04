import Image from 'next/image'
import ProductList from '@/components/ProductList/ProductList'
import Navbar from '@/components/Navbar/Navbar'
export default function Home() {
  return (
    <>
    <Navbar/>
    <ProductList/>
    </>
  )
}
