import React, { useContext, useEffect, useState } from 'react';
import { TbBuildingStore } from 'react-icons/tb';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { login, logout, getUserState } from '../firebase/auth';
import User from './User';
import { UserContext } from '../context/UserContext';

export default function Header() {
  const {user, setUser} = useContext(UserContext); 

  useEffect(() => {
    getUserState(setUser);
  }, []);

  return (
    <header className='flex justify-between items-center border-b border-gray p-3 mb-2'>
      <Link to="/" className='flex items-center text-main gap-2 text-2xl'>
        <TbBuildingStore/>
        <span>Shoppy</span>
      </Link>
      <div className='flex items-center gap-3'>
        <Link to="products">Products</Link>
        {<Link to="/cart"><AiOutlineShoppingCart className='text-xl'/></Link>}
        {user && <User user={user}/>}
        {!user && <button 
          className='bg-main text-white text-lg px-2 py-1'
          onClick={login}>Login</button>}
        {user && <button 
        className='bg-main text-white text-lg px-2 py-1'
        onClick={logout}>Logout</button>}
      </div>
    </header>
  );
}

