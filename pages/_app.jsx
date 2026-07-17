import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '../src/admin/context/AuthContext';
import '../src/index.css';

export default function NextApp(appProps) {
  const PageComponent = appProps.Component;
  const pageProps = appProps.pageProps;

  return (
    <HelmetProvider>
      <AuthProvider>
        <PageComponent {...pageProps} />
      </AuthProvider>
    </HelmetProvider>
  );
}
