'use client';

import { Header } from '@/containers/Header/Header';
import { AuthProvider } from '@/store/AuthProvider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <Header />
        <main className='flex flex-col justify-center items-center'>
          {children}
        </main>
      </AuthProvider>
    </>
  );
}
