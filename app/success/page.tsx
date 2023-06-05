import React from 'react'
import Success from '@/components/Success/Success';
import Navbar from '@/components/Navbar/Navbar';
const SuccessPage = ({params}) => {
  console.log(params);
  
  return (
    <>
    <Navbar/>
    <Success/>
    </>
  )
}
export default SuccessPage;