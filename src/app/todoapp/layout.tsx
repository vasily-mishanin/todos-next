'use client';

import { Header } from '@/containers/Header/Header';
import { AuthProvider } from '@/store/AuthProvider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <Header />
        {children}
      </AuthProvider>
    </>
  );
}
