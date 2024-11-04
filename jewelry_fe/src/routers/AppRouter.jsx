import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { paths } from '../constants/paths';
import RootLayout from '../components/layouts/RootLayout';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import AuthLayout from '../components/layouts/AuthLayout';
import Register from '../pages/Register';
import AdminLayout from '../components/layouts/AdminLayout';
import Dashboard from '../pages/Admin/Dashboard';
import ManageProducts from '../pages/Admin/ManageProducts';
import ManageCategories from '../pages/Admin/ManageCategories';
import ManageOrders from '../pages/Admin/ManageOrders';
import LoginAdmin from '../pages/Admin/Login';
import ManageUsers from '../pages/Admin/ManageUsers';
import Products from '../pages/Products';
import ProfileLayout from '../components/layouts/ProfileLayout';
import ProfileInfo from '../pages/Profile/Info';
import ProfileOrders from '../pages/Profile/Orders';
import { isTokenExpired } from '../apis/axiosClient';
import variables from '../constants/variables';
import ManageBlogs from '../pages/Admin/ManageBlogs';
import Blogs from '../pages/Blogs';

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem(variables.USER_ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(variables.USER_REFRESH_TOKEN);

  if (!accessToken || isTokenExpired(accessToken)) {
    if (!refreshToken || isTokenExpired(refreshToken)) {
      localStorage.removeItem(variables.USER_ACCESS_TOKEN);
      localStorage.removeItem(variables.USER_REFRESH_TOKEN);
      localStorage.removeItem(variables.USER_PROFILE);
      return <Navigate to={paths.LOGIN} />;
    }
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
  // {
  //   path: paths.LOGIN,
  //   element: <HeaderContentLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Login />,
  //     },
  //   ],
  // },
  {
    path: paths.HOME,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: paths.PRODUCTS,
        element: <Products />,
      },
      {
        path: `${paths.PRODUCTS}/:slug`,
        element: <ProductDetail />,
      },
      {
        path: paths.BLOGS,
        element: <Blogs />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: `${paths.CHECKOUT}`,
            element: <Checkout />,
          },
          {
            path: `${paths.PROFILE}`,
            element: <ProfileLayout />,
            children: [
              {
                path: `${paths.PROFILE}${paths.INFO}`,
                element: <ProfileInfo />
              },
              {
                path: `${paths.PROFILE}${paths.ORDERS}`,
                element: <ProfileOrders />
              },
            ]
          },
        ]
      },

    ],
  },
  {
    path: `${paths.HOME}`,
    element: <AuthLayout />,
    children: [
      {
        path: `${paths.LOGIN}`,
        element: <Login />,
      },
      {
        path: `${paths.REGISTER}`,
        element: <Register />,
      },
    ]
  },
  {
    path: `${paths.ADMIN}`,
    element: <AuthLayout />,
    children: [
      {
        path: `${paths.ADMIN}${paths.LOGIN}`,
        element: <LoginAdmin />
      },
    ]
  },
  {
    path: `${paths.ADMIN}`,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={`${paths.ADMIN}${paths.LOGIN}`} replace />
      },
      {
        path: `${paths.ADMIN}${paths.LOGIN}`,
        element: <Login />,
      },
      {
        path: `${paths.ADMIN}${paths.DASHBOARD}`,
        element: <Dashboard />
      },
      {
        path: `${paths.ADMIN}${paths.MANAGE_PRODUCTS}`,
        element: <ManageProducts />,
      },
      {
        path: `${paths.ADMIN}${paths.MANAGE_CATEGORIES}`,
        element: <ManageCategories />,
      },
      {
        path: `${paths.ADMIN}${paths.MANAGE_ORDERS}`,
        element: <ManageOrders />,
      },
      {
        path: `${paths.ADMIN}${paths.MANAGE_USERS}`,
        element: <ManageUsers />,
      },
      {
        path: `${paths.ADMIN}${paths.MANAGE_BLOGS}`,
        element: <ManageBlogs />,
      }
    ]
  },
])

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;