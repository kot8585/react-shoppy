import React, { useEffect, useState } from 'react';
import { TbBuildingStore } from 'react-icons/tb';
import { BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { login, logout, getUserState } from '../auth/firebase';

export default function Header() {
  const [user, setUser] = useState(null); 
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = () => {
    login().then((user) => {
      setUser(user);
      if(user.uid === "V9lWvlYTvVhFWCxezGb9tKuJlbz1"){
        setIsAdmin(true);
      }
    });
  }

  const handleLogout = () => {
    logout().then(() => {
      setUser(null);
      setIsAdmin(false);
    });
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
        <Link to="products">Products</Link>
        {user && <Link to="/cart">Carts</Link>}
        {isAdmin && <Link to="products/new"><BsFillPencilFill/></Link>}
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
          onClick={handleLogin}>Login</button>}
        {user && <button 
        className='bg-main text-white px-2'
        onClick={handleLogout}>Logout</button>}
      </div>
    </header>
  );
}

