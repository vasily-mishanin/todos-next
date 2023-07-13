import { Logo } from '@/components/Logo/Logo';
import { Navigation } from '@/components/Navigation/Navigation';
import './styles.css';

import { AuthContext, User } from '@/store/AuthProvider';
import axios from 'axios';
import { useContext, useEffect } from 'react';

export function Header() {
  const auth = useContext(AuthContext);
  console.log({ auth });

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        console.log('User is Logged In');
        const { _id, username, email, isAdmin, isVerified } = res.data.data;
        const me: User = {
          id: _id,
          username,
          email,
          isAdmin,
          isVerified,
        };
        console.log({ me });
        auth.setUser(me);
      } catch (error: any) {
        auth.setUser({
          id: '',
          email: '',
          username: '',
          isAdmin: false,
          isVerified: false,
        });
        console.log(error.message);
      }
    };

    getUserDetails();
  }, []);

  return (
    <header className='relative flex gap-2 justify-between mb-8 border-2'>
      <Logo />
      <span className='user'>{auth.user.email}</span>
      <Navigation loggedIn={!!auth.user.id} isAdmin={auth.user.isAdmin} />
    </header>
  );
}
