import React, { useEffect, useState } from 'react';
import { TbBuildingStore } from 'react-icons/tb';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { login, logout, getUserState } from '../auth/firebase';

export default function Header() {
  const [user, setUser] = useState(null); 

  const handleClick = () => {
    if(!user){
      login().then((user) => setUser(user));
    } else {
      logout().then(() => setUser(null));
      console.log('로그아웃 되었음')
    }
  }

  useEffect(() => {
    getUserState((user) => {setUser(user)});
  }, []);

  console.log('user state', user);

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
        {user && 
        <div className='flex items-center'>
          <img 
            className='w-7 h-7 rounded-full' 
            src={user.photoURL}
            alt='프로필 이미지'
            referrerPolicy='no-referrer'
            />
            <span className='text-sm'>{user.displayName}</span>
        </div>
        }
        <button 
          className='bg-main text-white px-2'
          onClick={handleClick}
        >{user ? 'Logout' : 'Login'}</button>
      </div>
    </header>
  );
}

