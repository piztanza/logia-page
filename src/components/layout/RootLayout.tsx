import { Outlet } from 'react-router-dom';
import { ScrollToHashElement } from '../common/ScrollToHashElement';

export function RootLayout() {
  return (
    <>
      <ScrollToHashElement />
      <Outlet />
    </>
  );
}

