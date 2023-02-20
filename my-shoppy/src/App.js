import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { UserContextProvider } from './context/UserContext';

const queryClient = new QueryClient();
export default function App() {
  return (
    <UserContextProvider>
      <Header />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </UserContextProvider>
  );
}

