import { Logo } from '@/components/Logo/Logo';
import { Navigation } from '@/components/Navigation/Navigation';
import './styles.css';

import { User } from '@/store/types';
import axios from 'axios';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setAuthState } from '@/store/authSlice';

export function Header() {
  const auth = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get('/api/users/me');
        const { _id, username, email, isAdmin, isVerified } = res.data.data;
        const me: User = {
          id: _id,
          username,
          email,
          isAdmin,
          isVerified,
        };
        dispatch(setAuthState(me));
      } catch (error: any) {
        dispatch(
          setAuthState({
            id: '',
            email: '',
            username: '',
            isAdmin: false,
            isVerified: false,
          })
        );

        console.log(error.message);
      }
    };

    getUserDetails();
  }, []);

  return (
    <header className='header relative flex gap-2 justify-between mb-8 font-sans px-4'>
      <Logo />
      <span className='user'>{auth.email}</span>
      <Navigation loggedIn={!!auth.id} isAdmin={auth.isAdmin} />
    </header>
  );
}
