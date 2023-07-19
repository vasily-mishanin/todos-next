'use client';
import axios from 'axios';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function VerifyEmailPage() {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = useCallback(async () => {
    try {
      await axios.post('api/users/verifyemail', { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      setVerified(false);
      console.log(error.response.data);
    }
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <div className='flex flex-col gap-4 items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl '>Verify Email </h1>
      <h2 className='p-2 bg-orange-500 text-black'>
        {token ? `Verification Token: ${token}` : 'no token'}
      </h2>

      {verified && (
        <div>
          <h2 className='text-2xl text-green-500'>
            Email Successfully Verified
          </h2>
          <Link className='text-blue-500' href='/login'>
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
