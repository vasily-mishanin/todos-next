'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Spinner from '@/components/Spinner/Spinner';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Signup success: ', response.data);
      router.push('/todoapp/login');
    } catch (error: any) {
      console.log('Signup failed: ', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col gap-4 items-center justify-center py-2'>
      {loading ? (
        <h1>
          <Spinner /> Registering...
        </h1>
      ) : (
        <h1 className='mb-4 text-xl'>Sign Up</h1>
      )}
      <div className='flex flex-col  mb-4'>
        <label className='text-sm' htmlFor='username'>
          Username
        </label>
        <input
          className='p-2 border rounded'
          type='text'
          name='username'
          id='username'
          placeholder='username'
          value={user.username}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col mb-4'>
        <label className='text-sm' htmlFor='email'>
          Email
        </label>
        <input
          className='p-2 border rounded'
          type='text'
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
        onClick={onSignup}
        disabled={buttonDisabled}
      >
        Sign Up
      </button>

      <Link className='text-blue-500 hover:text-blue-400' href='/todoapp/login'>
        Visit login page
      </Link>
    </main>
  );
}
