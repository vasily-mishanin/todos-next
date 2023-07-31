'use client';

import Spinner from '@/components/Spinner/Spinner';
import Table from '@/components/Table/Table';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { fetchUsers } from '@/store/usersSlice';
import './styles.css';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toast } from 'react-hot-toast';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/Button/Button';

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

          <div className='relative h-6 z-10 self-end'>
            <Button
              type='button'
              btnType='submit'
              clickHandler={handleUpdateUsers}
              isActive={true}
              disabled={false}
            >
              <ArrowPathIcon />
            </Button>
          </div>
          <Table columns={['Name', 'Email', 'Role']} rows={tableData} />
        </>
      )}
    </section>
  );
}
