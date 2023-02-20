import React from 'react';

export default function ProductCard({product: {id, imageUrl, name, category, price}}) {
  return (
    <li className='rounded-md hover:scale-105 ease-out duration-300 shadow-lg' key={id}>
          <img 
            className='w-full h-60'
            src={imageUrl} 
            alt='상품 사진'/>
          <div className='flex justify-between p-2 '>
          <div className='flex flex-col'>
              <span>{name}</span>
              <span className='text-zinc-400 text-sm'>{category}</span>
            </div>
            <span>{`₩${price}`}</span>
          </div>
        </li>
  );
}

