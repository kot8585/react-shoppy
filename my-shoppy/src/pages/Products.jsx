import React, { useEffect, useState } from 'react';
import { getData } from '../api/database';

export default function Products() {
  //❗️useState에 getData넣어주기,,,?
  const [products, setProducts] = useState();

  useEffect(() => {
    getData(setProducts);
  }, []) 

  return (
    <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 p-5'>
      {products && Object.values(products).map((product) => {
        return <li className='rounded-md hover:scale-105 ease-out duration-300 shadow-lg' key={product.id}>
        <img 
          className='w-full h-44'
          src={product.imageUrl} 
          alt='상품 사진'/>
        <div className='flex justify-between p-2'>
        <div className='flex flex-col'>
            <span>예쁜 드레스</span>
            <span className='text-zinc-400 text-sm'>여성</span>
          </div>
          <span>₩10000</span>
        </div>
      </li>
      })}
      
    </ul>
  );
}

