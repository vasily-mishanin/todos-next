import { Logo } from '@/components/Logo/Logo';
import { Navigation } from '@/components/Navigation/Navigation';
import './styles.css';

import { useAppSelector } from '@/store/hooks';

export function Header() {
  const auth = useAppSelector((state) => state.auth);

  console.log('Header');
  return (
    <header className='header relative flex gap-2 justify-between mb-8 font-sans px-4'>
      <Logo />
      <span className='user'>{auth.user.email}</span>
      <Navigation />
    </header>
  );
}
