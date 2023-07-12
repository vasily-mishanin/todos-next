'use client';

import { AuthContext } from '@/store/AuthProvider';
import { useContext } from 'react';

export default function Todos() {
  const auth = useContext(AuthContext);

  return (
    <main className='flex flex-col gap-4 items-center justify-center min-h-screen py-2'>
      <h1 className='mb-8'>Todos Page</h1>
      {!!auth.user.id && 'Authenticated'}
    </main>
  );
}
