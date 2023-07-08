'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

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
      router.push(`/profile/${user.email}`);
    } catch (error: any) {
      console.log('Login failed');
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='mb-8'>{loading ? 'Processing...' : 'Sign In'}</h1>
      <hr />

      <div className='flex flex-col  items-center mb-4'>
        <label htmlFor='email'>Email</label>
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

      <div className='flex flex-col  items-center mb-4'>
        <label htmlFor='password'>Password</label>
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

      <button className='p-1 border rounded' onClick={onLogin}>
        Sign In
      </button>

      <Link href='/signup'>Visit signup page</Link>
    </div>
  );
}
