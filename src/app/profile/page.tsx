'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function UserProfile({ params }: any) {
  const router = useRouter();

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get('/api/users/me');
      console.log(res.data);
      router.push(`/profile/${res.data.data._id}`);
    };
    getUserDetails();
  });

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
    } catch (error: any) {
      console.log('Error: ' + error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className='flex flex-col gap-4 items-center justify-center min-h-screen py-2'>
      <h1 className='mb-8'>Profile</h1>
      <hr />
      <p className='text-4xl'>Profile Page</p>

      <hr />
      <button
        className='bg-blue-500 p-2 rounded hover:bg-blue-400 text-gray-100'
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
