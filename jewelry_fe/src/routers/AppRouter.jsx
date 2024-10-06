import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { paths } from '../constants/paths';
import RootLayout from '../components/layouts/RootLayout';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';

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
    ],
  },
])

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;