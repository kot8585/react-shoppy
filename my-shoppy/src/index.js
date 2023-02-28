import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />},
      { path: "products", element: <Products />},
      { path: "products/new", 
        element: (
          <ProtectedRoute requireAdmin>
            <AddProduct />
          </ProtectedRoute>
        ),
       },
      { path: "products/:productId", element: <ProductDetail />},
      { path: "cart", element: (
        <ProtectedRoute>
        <Cart />
        </ProtectedRoute>
        )},
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
