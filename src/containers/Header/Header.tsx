import { Logo } from '@/components/Logo/Logo';
import { AuthProps, Navigation } from '@/components/Navigation/Navigation';

export function Header({ loggedIn }: AuthProps) {
  return (
    <header className='flex gap-2 justify-between   border-2'>
      <Logo />
      <Navigation loggedIn={loggedIn} />
    </header>
  );
}
