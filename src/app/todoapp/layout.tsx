'use client';

import { Header } from '@/containers/Header/Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center px-4'>
        {children}
      </main>
    </>
  );
}
