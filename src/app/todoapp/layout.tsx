'use client';

import { Header } from '@/containers/Header/Header';
import { me } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { use, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { loading, error, user } = useAppSelector((state) => state.auth);
  const isLoggedIn = !!user.id;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (!isLoggedIn) {
      router.push('/todoapp/login');
    }

    if (isLoggedIn) {
      router.push('/todoapp/todos');
    }
  }, [error, isLoggedIn]);

  console.log('Layout todoapp');
  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center px-4'>
        {children}
      </main>
    </>
  );
}
