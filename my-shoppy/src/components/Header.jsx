import React, { useEffect, useState } from 'react';
import { TbBuildingStore } from 'react-icons/tb';
import { BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { login, logout, getUserState } from '../auth/firebase';

export default function Header() {
  const [user, setUser] = useState(null); 
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    //엥??? 너 처음 뜰때만 실행되는거 아냐???????
    console.log('언제 실행되니?');
    getUserState(setUser);
  }, []);

  console.log('user state', user);

  return (
    <header className='flex justify-between items-center text-lg'>
      <Link to="/" className='flex items-center text-main gap-2'>
        <TbBuildingStore/>
        <span>Shoppy</span>
      </Link>
      <div className='flex items-center gap-2'>
        <Link to="products">Products</Link>
        {user && <Link to="/cart">Carts</Link>}
        {isAdmin && <Link to="products/new"><BsFillPencilFill/></Link>}
        {/* //TODO: 컴포넌트로 뺴기, 화면 작아질경우 userName나오지 않도록 */}
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
        {!user && <button 
          className='bg-main text-white px-2'
          onClick={login}>Login</button>}
        {user && <button 
        className='bg-main text-white px-2'
        onClick={logout}>Logout</button>}
      </div>
    </header>
  );
}

