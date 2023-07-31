'use client';

import Spinner from '@/components/Spinner/Spinner';
import Table from '@/components/Table/Table';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchUsers } from '@/store/usersSlice';
import './styles.css';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toast } from 'react-hot-toast';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

export default function Users() {
  const { user } = useAppSelector((state) => state.auth);
  const { error, loading, users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    if (user.isAdmin && users.length === 0) {
      dispatch(fetchUsers());
      if (error) {
        toast.error(error);
      }
    } else if (!user.isAdmin) {
      router.push('/todoapp');
    }
  }, []);

  const handleUpdateUsers = () => {
    dispatch(fetchUsers());
  };

  const tableData = users.map((user) => ({
    username: user.username,
    email: user.email,
    role: user.isAdmin ? 'admin' : '',
  }));

  return (
    <section className='users'>
      {loading === 'pending' && <Spinner text='Loading users...' />}

      {users.length > 0 && (
        <>
          <h1 className='mb-4'>Todos Users</h1>

          <button
            type='button'
            className='self-end flex justify-center items-center rounded text-blue-500'
            style={{ width: '1.5rem', height: '1.5rem' }}
            onClick={handleUpdateUsers}
          >
            <ArrowPathIcon />
          </button>

          <Table columns={['Name', 'Email', 'Role']} rows={tableData} />
        </>
      )}
    </section>
  );
}
