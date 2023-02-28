import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getCart } from '../api/database';
import { useUserContext } from '../context/UserContext';

export default function CartStatus() {
  const {user} = useUserContext();

    // ❓캐시에 어떤게 저장되는거지? 리턴되는거?
    const {data:carts} = useQuery(['carts', user ? user.uid : ''],
    async () => {
      if(!user) return [];
      return getCart(user.uid);
    });

  return (
    <div className='relative w-8'>
      <span className='absolute bg-main rounded-full z-10 text-sm right-1 -top-1 w-4 h-4 text-center leading-4 text-white inline-block'>{carts ? carts.length : 0}</span>
      <AiOutlineShoppingCart className='text-xl relative' />
    </div>
  );
}

