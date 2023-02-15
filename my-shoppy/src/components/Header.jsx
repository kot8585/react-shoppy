import React from 'react';
import { TbBuildingStore } from 'react-icons/tb';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='flex justify-between items-center text-lg'>
      <Link to="/" className='flex items-center text-main gap-2'>
        <TbBuildingStore/>
        <span>Shoppy</span>
      </Link>
      <div className='flex items-center gap-2'>
        <Link to="products">products</Link>
        {/* TODO: 로그인 되어있지 않을경우 redirect 하기 */}
        <AiOutlineShoppingCart /> 
        <button className='bg-main text-white px-2'>Login</button>
      </div>
    </header>
  );
}

