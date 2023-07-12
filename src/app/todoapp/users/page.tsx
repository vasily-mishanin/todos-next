'use client';

import { AuthContext, User } from '@/store/AuthProvider';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function Users() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get('/api/users');
        console.log('users:', res.data.data);
        setUsers(res.data.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    if (auth.user.isAdmin) {
      getUsers();
    } else {
      router.push('/todoapp');
    }
  }, []);

  return (
    <section className='flex flex-col gap-4 items-center justify-center min-h-full  py-2'>
      {users.length > 1 && (
        <>
          <h1 className='mb-4'>Todos Users</h1>

          <table>
            <thead className='bg-blue-400'>
              <tr>
                <th key='name' className='p-2'>
                  Name
                </th>
                <th key='email' className='p-2'>
                  Email
                </th>
              </tr>
            </thead>

            <tbody className='bg-blue-200'>
              {users.map((user) => (
                <tr key={user.id}>
                  <td key={user.id + 'name'} className='px-4 py-2'>
                    {user.username}
                  </td>
                  <td key={user.id + 'email'} className='px-4 py-2'>
                    {user.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}
