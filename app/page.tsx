import Image from 'next/image'
import ProductList from '@/components/ProductList/ProductList'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
export default function Home() {
  return (
    <>
    <Navbar/>
    <ProductList/>

    </>
  )
}
