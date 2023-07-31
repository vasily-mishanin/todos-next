'use client';

import { Header } from '@/containers/Header/Header';
import { me } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkLogin = async () => {
      await dispatch(me());
    };

    checkLogin();
  }, []);

  useEffect(() => {
    const isLoggedIn = !!user.id;

    if (!isLoggedIn) {
      router.push('/todoapp/login');
    }

    if (isLoggedIn) {
      router.push('/todoapp/todos');
    }
  }, [user.id]);

  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center px-4'>
        {children}
      </main>
    </>
  );
}
