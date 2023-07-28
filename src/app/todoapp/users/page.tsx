'use client';

import Spinner from '@/components/Spinner/Spinner';
import Table from '@/components/Table/Table';
import { User } from '@/store/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { fetchUsers } from '@/store/usersSlice';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toast } from 'react-hot-toast';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

export default function Users() {
  const auth = useAppSelector((state) => state.auth.user);
  const { error, loading, users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const router = useRouter();
  // const [users, setUsers] = useState<User[]>([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const getUsers = async () => {
    //   try {
    //     setLoading(true);
    //     const res = await axios.get('/api/users');
    //     setLoading(false);
    //     setUsers(res.data.data);
    //   } catch (error: any) {
    //     setLoading(false);
    //     console.log(error.message);
    //   }
    // };

    if (auth.isAdmin && users.length === 0) {
      dispatch(fetchUsers());
      if (error) {
        toast.error(error);
      }
    } else if (!auth.isAdmin) {
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
    <section className='flex flex-col gap-4 items-center justify-center min-h-full  py-2 text-gray-700 max-[600px]:justify-center'>
      {loading === 'pending' && <Spinner text='Loading users...' />}

      {users.length > 1 && (
        <>
          <h1 className='mb-4'>Todos Users</h1>

          <button
            type='button'
            className='self-end flex justify-center items-center rounded'
            style={{ width: '1.5rem', height: '1.5rem' }}
            onClick={handleUpdateUsers}
          >
            <ArrowPathIcon
              className='text-blue-500'
              style={{ width: '1rem' }}
            />
          </button>

          <Table columns={['Name', 'Email', 'Role']} rows={tableData} />
        </>
      )}
    </section>
  );
}
