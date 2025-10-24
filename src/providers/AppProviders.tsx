import { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';

export function AppProviders({ children }: PropsWithChildren) {
  return <HelmetProvider>{children}</HelmetProvider>;
}


