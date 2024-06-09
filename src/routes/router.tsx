import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/components/layout';
// ROUTES
import PrivateRoute from './privateRoute';
import PersistLoggedIn from './persistLoggedIn';
import PageNotFound from './NotFound';
// PAGES
import LoginPage from '@/components/auth';
import HomePage from '@/components/dashboard';
import OrdersPage from '@/components/orders';
import CustomersPage from '@/components/customers';
import CustomerDetails from '@/components/customers/Details';
import ProductsPage from '@/components/products';
import ProductForm from '@/components/products/Form';
import CategoriesPage from '@/components/categories';
import CategoryForm from '@/components/categories/Form';
import OrderDetails from '@/components/orders/Details';

export const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        errorElement: <div>error</div>,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'orders',
            element: <OrdersPage />,
          },
          { path: 'orders/details/:orderId', element: <OrderDetails /> },
          {
            path: 'products',
            element: <ProductsPage />,
          },
          {
            path: 'products/create',
            element: <ProductForm />,
          },
          { path: 'products/edit/:productId', element: <ProductForm /> },
          {
            path: 'categories',
            element: <CategoriesPage />,
          },
          {
            path: 'categories/create',
            element: <CategoryForm />,
          },
          { path: 'categories/edit/:categoryId', element: <CategoryForm /> },
          {
            path: 'customers',
            element: <CustomersPage />,
          },
          { path: 'customers/details/:userId', element: <CustomerDetails /> },
          {
            path: 'analytics',
            element: <div>analytics</div>,
          },
        ],
      },
    ],
  },
  {
    element: <PersistLoggedIn />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
  {
    path: '/*',
    element: <PageNotFound />,
  },
]);
