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
import CompaniesPage from '@/components/companies';
import CompanyForm from '@/components/companies/Form';
import DosageFormPage from '@/components/dosageForm';
import DosageFormForm from '@/components/dosageForm/Form';
import OrderDetails from '@/components/orders/Details';
import ImagesPage from '@/components/images';
import ImageForm from '@/components/images/Form';

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
            path: 'companies',
            element: <CompaniesPage />,
          },
          {
            path: 'companies/create',
            element: <CompanyForm />,
          },
          { path: 'companies/edit/:companyId', element: <CompanyForm /> },
          {
            path: 'dosageForms',
            element: <DosageFormPage />,
          },
          {
            path: 'dosageForms/create',
            element: <DosageFormForm />,
          },
          {
            path: 'dosageForms/edit/:dosageFormId',
            element: <DosageFormForm />,
          },
          {
            path: 'customers',
            element: <CustomersPage />,
          },
          { path: 'customers/details/:userId', element: <CustomerDetails /> },
          {
            path: 'images',
            element: <ImagesPage />,
          },
          {
            path: 'images/create',
            element: <ImageForm />,
          },
          {
            path: 'images/edit/:imageId',
            element: <ImageForm />,
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
