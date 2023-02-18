import React, { useEffect, useState } from 'react';
import { getData } from '../firebase/database';

export default function Products() {
  const [products, setProducts] = useState();

  useEffect(() => {
    getData(setProducts);
  }, []) 

  console.log(products); 
  return (
    <ul className='grid grid-cols-4 gap-5'>
      {products && Object.values(products).map((product) => {
        return <li key={product.id}>
        <img 
          className='w-full h-44'
          src={product.imageUrl} 
          alt='상품 사진'/>
        <p>
          <div>
            <h1>예쁜 드레스</h1>
            <span>여성</span>
          </div>
          <span>₩10000</span>
        </p>
      </li>
      })}
      
    </ul>
  );
}

