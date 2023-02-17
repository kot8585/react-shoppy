import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { UserContext } from './context/UserContext';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Header />
      <Outlet />
    </UserContext.Provider>
  );
}

