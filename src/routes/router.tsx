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
import SuperAdminRoute from './SuperAdminRoute';
import MyProfilePage from '@/components/my-profile';

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
            path: 'my-profile',
            element: <MyProfilePage />,
          },
          {
            path: 'categories',
            element: (
              <SuperAdminRoute>
                <CategoriesPage />
              </SuperAdminRoute>
            ),
          },
          {
            path: 'categories/create',
            element: (
              <SuperAdminRoute>
                <CategoryForm />
              </SuperAdminRoute>
            ),
          },
          { path: 'categories/edit/:categoryId', element: <CategoryForm /> },
          {
            path: 'companies',
            element: (
              <SuperAdminRoute>
                <CompaniesPage />
              </SuperAdminRoute>
            ),
          },
          {
            path: 'companies/create',
            element: (
              <SuperAdminRoute>
                <CompanyForm />
              </SuperAdminRoute>
            ),
          },
          { path: 'companies/edit/:companyId', element: <CompanyForm /> },
          {
            path: 'dosageForms',
            element: (
              <SuperAdminRoute>
                <DosageFormPage />
              </SuperAdminRoute>
            ),
          },
          {
            path: 'dosageForms/create',
            element: (
              <SuperAdminRoute>
                <DosageFormForm />
              </SuperAdminRoute>
            ),
          },
          {
            path: 'dosageForms/edit/:dosageFormId',
            element: (
              <SuperAdminRoute>
                <DosageFormForm />
              </SuperAdminRoute>
            ),
          },
          {
            path: 'customers',
            element: (
              <SuperAdminRoute>
                <CustomersPage />
              </SuperAdminRoute>
            ),
          },
          {
            path: 'customers/details/:userId',
            element: (
              <SuperAdminRoute>
                <CustomerDetails />
              </SuperAdminRoute>
            ),
          },
          {
            path: 'images',
            element: (
              <SuperAdminRoute>
                <ImagesPage />
              </SuperAdminRoute>
            ),
          },
          {
            path: 'images/create',
            element: (
              <SuperAdminRoute>
                <ImageForm />
              </SuperAdminRoute>
            ),
          },
          {
            path: 'images/edit/:imageId',
            element: (
              <SuperAdminRoute>
                <ImageForm />
              </SuperAdminRoute>
            ),
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
