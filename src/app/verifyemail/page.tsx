'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { verifyUserEmail } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function VerifyEmailPage() {
  const [token, setToken] = useState('');
  //const [verified, setVerified] = useState(false);
  //const [error, setError] = useState(false);

  const dispatch = useAppDispatch();
  const { loading, user, error } = useAppSelector((state) => state.auth);

  // const handleVerifyUserEmail = useCallback(async () => {
  //   dispatch(verifyUserEmail({token}));
  //   // try {
  //   //   await axios.post('api/users/verifyemail', { token });
  //   //   setVerified(true);
  //   //   setError(false);
  //   // } catch (error: any) {
  //   //   setError(true);
  //   //   setVerified(false);
  //   //   console.log(error.response.data);
  //   // }
  // }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      dispatch(verifyUserEmail({ token }));
    }
  }, [token]);

  return (
    <div className='flex flex-col gap-4 items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl '>Verify Email </h1>
      <h2 className='p-2 bg-orange-500 text-black'>
        {token ? `Verification Token: ${token}` : 'no token'}
      </h2>

      {user.isVerified && (
        <div>
          <h2 className='text-2xl text-green-500'>
            Email Successfully Verified
          </h2>
          <Link className='text-blue-500 text-lg' href='/todoapp/login'>
            Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className='text-2xl bg-orange-500 text-black'>
            Your Email Not Verified - {error}
          </h2>
        </div>
      )}
    </div>
  );
}
