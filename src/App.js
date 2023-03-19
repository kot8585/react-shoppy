import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { UserContextProvider } from "./context/UserContext";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Header />
        <Outlet />
      </UserContextProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
