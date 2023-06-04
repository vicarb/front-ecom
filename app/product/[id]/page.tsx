// ./app/product/[id]/page.tsx

import React from "react";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { Params } from "@/interfaces/Params/Params";
import Navbar from "@/components/Navbar/Navbar";

  const ProductDetailPage = ({ params }: { params: Params }) => {
  console.log("params", params);
  
  // Your component logic...
  return (
<>
    <Navbar/>
    <ProductDetail params={params}/>
</>
  );
};

export default ProductDetailPage;
