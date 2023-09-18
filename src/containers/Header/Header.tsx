import { Logo } from '@/components/Logo/Logo';
import { Navigation } from '@/components/Navigation/Navigation';
import './styles.css';

import { useAppSelector } from '@/store/hooks';
import { useRef } from 'react';

export function Header() {
  const auth = useAppSelector((state) => state.auth);

  return (
    <header className='header'>
      <Logo />
      <span className='user'>{auth.user.email}</span>
      <Navigation />
    </header>
  );
}
