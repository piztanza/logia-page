import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import SchedulePage from '../pages/Schedule/SchedulePage';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/schedule', element: <SchedulePage /> },
]);


