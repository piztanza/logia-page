import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import SchedulePage from '../pages/Schedule/SchedulePage';
import ProductsPage from '../pages/Products/ProductsPage';
import { RootLayout } from '../components/layout/RootLayout';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/schedule', element: <SchedulePage /> },
    ],
  },
]);


