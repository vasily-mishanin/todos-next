'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

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
      router.push('/login');
    } catch (error: any) {
      console.log('Signup failed: ', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='mb-8'>{loading ? 'Processing...' : 'Sign Up'}</h1>
      <hr />
      <div className='flex flex-col  items-center  mb-4'>
        <label htmlFor='username'>Username</label>
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

      <button className='p-1 border rounded' onClick={onSignup}>
        {buttonDisabled ? 'No signup' : 'Sign Up'}
      </button>

      <Link href='/login'>Visit login page</Link>
    </div>
  );
}
