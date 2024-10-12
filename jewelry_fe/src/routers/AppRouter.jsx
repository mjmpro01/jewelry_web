import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { paths } from '../constants/paths';
import RootLayout from '../components/layouts/RootLayout';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import AuthLayout from '../components/layouts/AuthLayout';
import Register from '../pages/Register';

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
        element: <Home />,
      },
      {
        path: `${paths.PRODUCTS}/:slug`,
        element: <ProductDetail />,
      },
      {
        path: `${paths.CHECKOUT}`,
        element: <Checkout />,
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
])

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;