'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UserProfile({ params }: any) {
  const router = useRouter();

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get('/api/users/me');
      console.log(res.data);
      router.push(`/todoapp/profile/${res.data.data._id}`);
    };
    getUserDetails();
  });

  return (
    <div className='flex flex-col gap-4 items-center justify-center min-h-screen py-2'>
      <h1 className='mb-8'>Profile Page</h1>
    </div>
  );
}
