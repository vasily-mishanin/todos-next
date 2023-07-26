import { Logo } from '@/components/Logo/Logo';
import { Navigation } from '@/components/Navigation/Navigation';
import './styles.css';

import { AuthContext, User } from '@/store/AuthProvider';
import axios from 'axios';
import { useContext, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setAuthState } from '@/store/authSlice';

export function Header() {
  //const auth = useContext(AuthContext);
  const authState = useAppSelector((state) => state.auth.authState);
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
        // auth.setUser(me);
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
        // auth.setUser({
        //   id: '',
        //   email: '',
        //   username: '',
        //   isAdmin: false,
        //   isVerified: false,
        // });
        console.log(error.message);
      }
    };

    getUserDetails();
  }, []);

  return (
    <header className='header relative flex gap-2 justify-between mb-8 font-sans px-4'>
      <Logo />
      <span className='user'>{authState.email}</span>
      <Navigation loggedIn={!!authState.id} isAdmin={authState.isAdmin} />
    </header>
  );
}
