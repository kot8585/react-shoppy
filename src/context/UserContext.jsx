import { createContext, useContext, useEffect, useState } from 'react';
import { getUserState, login, logout } from '../api/auth';

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserState(setUser);
  }, []);

  return (
    <UserContext.Provider
      value={{
        uid: user && user.uid,
        user,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
