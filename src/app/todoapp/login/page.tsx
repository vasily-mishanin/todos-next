'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Spinner from '@/components/Spinner/Spinner';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('Login success', response.data);
      toast.success('Login success');
      router.push(`/`);
    } catch (error: any) {
      console.log('Login failed');
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col gap-4 items-center justify-center py-2'>
      {loading ? (
        <h1 className='flex gap-4 self-center items-center'>
          <Spinner /> Logging in...
        </h1>
      ) : (
        <h1 className='mb-4 text-xl'>Sign In</h1>
      )}

      <div className='flex flex-col mb-4'>
        <label className='text-sm' htmlFor='email'>
          Email
        </label>
        <input
          className='p-2 border rounded'
          type='email'
          name='email'
          id='email'
          placeholder='email'
          value={user.email}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col mb-4'>
        <label className='text-sm' htmlFor='password'>
          Password
        </label>
        <input
          className='p-2 border rounded'
          type='password'
          name='password'
          id='password'
          placeholder='password'
          value={user.password}
          onChange={handleChange}
        />
      </div>

      <button
        className='p-1 border rounded cursor-pointer hover:bg-gray-100'
        onClick={onLogin}
        disabled={buttonDisabled}
      >
        Sign In
      </button>

      <Link
        className='text-blue-500 hover:text-blue-400'
        href='/todoapp/signup'
      >
        Visit signup page
      </Link>
    </main>
  );
}
