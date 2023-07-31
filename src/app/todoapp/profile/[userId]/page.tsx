'use client';

import Spinner from '@/components/Spinner/Spinner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/store/hooks';

export default function UserProfile({ params }: any) {
  const router = useRouter();
  const { loading, user, error } = useAppSelector((state) => state.auth);

  return (
    <div className='flex flex-col gap-4 items-center justify-center min-h-full py-2'>
      {loading === 'pending' && <Spinner text='Loading profile' />}
      <h1 className='mb-8'>Profile</h1>
      <article className='flex  gap-10 border rounded-lg border-gray-200 p-8'>
        <div className='flex justify-center items-start w-32 h-32'>
          <Image
            src='/icons-avatar-80.png'
            alt='avatar'
            width='100'
            height='100'
          />
        </div>
        <div className='flex flex-col gap-4'>
          <p>
            Name: <span className='text-green-500'>{user.username}</span>
          </p>
          <p>
            Email: <span className='text-green-500'>{user.email}</span>
          </p>
          <p>
            Role:
            {user.isAdmin ? (
              <span className='text-green-500'> admin</span>
            ) : (
              <span className='text-green-500'> user</span>
            )}
          </p>
        </div>
      </article>
    </div>
  );
}
