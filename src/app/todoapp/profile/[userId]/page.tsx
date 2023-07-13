'use client';

import Spinner from '@/components/Spinner/Spinner';
import { AuthContext } from '@/store/AuthProvider';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';

export default function UserProfile({ params }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get('/api/users/logout');
      setLoading(false);
      router.push('/');
    } catch (error: any) {
      setLoading(false);
      console.log('Error: ' + error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className='flex flex-col gap-4 items-center justify-center min-h-full py-2'>
      {loading && <Spinner />}
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
