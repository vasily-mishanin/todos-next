'use client';
import Spinner from '@/components/Spinner/Spinner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { toast } from 'react-hot-toast';

export default function UserProfile({ params }: any) {
  const router = useRouter();
  const { loading, user, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user.id) {
      router.push(`/todoapp/profile/${user.id}`);
    }

    if (error) {
      toast.error('Profile loading failed');
    }
  });

  return (
    <div className='flex flex-col gap-4 items-center justify-center min-h-full py-2'>
      {loading === 'pending' && <Spinner text='Loading profile' />}
    </div>
  );
}
