'use client';
import Spinner from '@/components/Spinner/Spinner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserProfile({ params }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      setLoading(true);
      const res = await axios.get('/api/users/me');
      setLoading(false);
      router.push(`/todoapp/profile/${res.data.data._id}`);
    };
    getUserDetails();
  });

  return (
    <div className='flex flex-col gap-4 items-center justify-center min-h-full py-2'>
      {loading && <Spinner />}
    </div>
  );
}
