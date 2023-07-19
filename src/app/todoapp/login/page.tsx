'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Spinner from '@/components/Spinner/Spinner';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const onLogin: SubmitHandler<Inputs> = async (formData) => {
    try {
      setLoading(true);
      await axios.post('/api/users/login', formData);
      toast.success('Login success');
      router.push(`/`);
    } catch (error: any) {
      console.log('Login failed');
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputBaseStyle =
    'outline-none border p-2 rounded border-green-200  focus:border-green-400 ';
  const inputErrorStyle = 'border-red-200 focus:border-red-400';
  const inputEmailStyle =
    inputBaseStyle + `${errors.email?.message && inputErrorStyle}`;
  const inputPasswordStyle =
    inputBaseStyle + `${errors.password?.message && inputErrorStyle}`;

  return (
    <main className='flex flex-col gap-4 items-center justify-center py-2'>
      {loading ? (
        <h1 className='flex gap-4 self-center items-center'>
          <Spinner /> Logging in...
        </h1>
      ) : (
        <h1 className='mb-4 text-xl text-gray-700'>Sign In</h1>
      )}

      <form
        className='flex flex-col gap-2 mb-4 text-gray-700'
        onSubmit={handleSubmit(onLogin)}
      >
        <div className='flex flex-col'>
          <span className='text-xs text-red-300 h-4'>
            {errors.email?.message}
          </span>
          <input
            className={inputEmailStyle}
            {...register('email', {
              required: 'Required',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Enter valid email',
              },
            })}
            placeholder='Email'
          />
        </div>

        <div className='flex flex-col'>
          <span className='text-xs text-red-300 h-4'>
            {errors.password?.message}
          </span>
          <input
            className={inputPasswordStyle}
            type='password'
            {...register('password', {
              required: 'Required',
              minLength: { value: 6, message: 'Min. length is 6 characters' },
            })}
            placeholder='Password'
          />
        </div>

        <input
          className=' mt-4 p-1 border rounded cursor-pointer hover:bg-green-100'
          type='submit'
          value='Sign In'
        />
      </form>

      <Link
        className='text-blue-500 hover:text-blue-400'
        href='/todoapp/signup'
      >
        Visit signup page
      </Link>
    </main>
  );
}
