'use client';

import Spinner from '@/components/Spinner/Spinner';
import { AuthContext } from '@/store/AuthProvider';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import Image from 'next/image';

export default function UserProfile({ params }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);

  return (
    <div className='flex flex-col gap-4 items-center justify-center min-h-full py-2'>
      {loading && <Spinner />}
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
            Name: <span className='text-green-500'>{auth.user.username}</span>
          </p>
          <p>
            Email: <span className='text-green-500'>{auth.user.email}</span>
          </p>
          <p>
            Role:{' '}
            {auth.user.isAdmin ? (
              <span className='text-green-500'>admin</span>
            ) : (
              <span className='text-green-500'>user</span>
            )}
          </p>
        </div>
      </article>
    </div>
  );
}
