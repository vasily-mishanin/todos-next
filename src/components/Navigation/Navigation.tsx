'use client';

import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export type AuthProps = {
  loggedIn: boolean;
};

export function Navigation({ loggedIn }: AuthProps) {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get('/api/users/logout'); // deletes token from cookies
      router.push('/');
      //router.refresh();
    } catch (error: any) {
      console.log('Error: ' + error.message);
      toast.error(error.message);
    }
  };

  return (
    <nav className='flex items-center border-2 p-3'>
      {loggedIn && (
        <>
          <Link
            href='/todoapp/todos'
            className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-100 hover:text-gray-600'
          >
            <span>Todos</span>
          </Link>
          <Link
            href='/todoapp/profile'
            className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-100 hover:text-gray-600'
          >
            <span>Profile</span>
          </Link>
          <button
            className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-red-200 hover:text-gray-600'
            onClick={logout}
          >
            <span>Logout</span>
          </button>
        </>
      )}

      {!loggedIn && (
        <>
          <Link
            href='/todoapp/login'
            className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-100 hover:text-gray-600'
          >
            <span>Login</span>
          </Link>
          <Link
            href='/todoapp/signup'
            className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-100 hover:text-gray-600'
          >
            <span>Signup</span>
          </Link>
        </>
      )}
    </nav>
  );
}
