'use client';

import Spinner from '@/components/Spinner/Spinner';
import Table from '@/components/Table/Table';
import { AuthContext, User } from '@/store/AuthProvider';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function Users() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/users');
        setLoading(false);
        console.log('users:', res.data.data);
        setUsers(res.data.data);
      } catch (error: any) {
        setLoading(false);
        console.log(error.message);
      }
    };

    if (auth.user.isAdmin) {
      getUsers();
    } else {
      router.push('/todoapp');
    }
  }, []);

  const tableData = users.map((user) => ({
    username: user.username,
    email: user.email,
    role: user.isAdmin ? 'admin' : '',
  }));

  return (
    <section className='flex flex-col gap-4 items-center justify-center min-h-full  py-2'>
      {loading && (
        <h1 className='flex gap-4'>
          <Spinner /> Loading users...
        </h1>
      )}
      {users.length > 1 && (
        <>
          <h1 className='mb-4'>Todos Users</h1>
          <Table columns={['Name', 'Email', 'Role']} rows={tableData} />
        </>
      )}
    </section>
  );
}
