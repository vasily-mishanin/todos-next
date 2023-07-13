'use client';

import { AuthContext } from '@/store/AuthProvider';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import toast from 'react-hot-toast';

export default function UserProfile({ params }: any) {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/');
    } catch (error: any) {
      console.log('Error: ' + error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className='flex flex-col gap-4 items-center justify-center min-h-full py-2'>
      <h1 className='mb-8'>Profile</h1>
      <p>{auth.user.username}</p>
      <p>{auth.user.email}</p>
      <p>{auth.user.isAdmin ? <span>admin</span> : <span>user</span>}</p>
      <button
        className='bg-blue-500 p-2 rounded hover:bg-blue-400 text-gray-100'
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
