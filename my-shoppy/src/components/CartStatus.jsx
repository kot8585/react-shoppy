import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getCart } from '../api/database';
import { useUserContext } from '../context/UserContext';

export default function CartStatus() {
  const {user} = useUserContext();
  const [cartLength, setCartLength] = useState(0);

    // ❓캐시에 어떤게 저장되는거지? 리턴되는거?
    const {data:carts} = useQuery(['carts', user ? user.uid : ''],
    async () => {
      if(!user) return [];
      const carts = await getCart(user.uid);
      setCartLength(carts.length);
      return carts;
    });

  return (
    <div className='relative w-8'>
      <span className='absolute bg-main rounded-full z-10 text-sm right-1 -top-1 w-4 h-4 text-center leading-4 text-white inline-block'>{cartLength}</span>
      <AiOutlineShoppingCart className='text-xl relative'>
      </AiOutlineShoppingCart>
    </div>
  );
}

