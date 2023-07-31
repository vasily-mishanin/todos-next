'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './styles.css';
import { Bars3Icon, Bars3BottomRightIcon } from '@heroicons/react/24/solid';

import { logout } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export function Navigation() {
  const router = useRouter();
  const currentRoute = usePathname();
  const [showMobileNavbar, setShowMobileNavbar] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const isLoggedIn = !!user.id;
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    window.location.reload();
    router.push('/todoapp');
  };

  const toggleMenu = () => {
    setShowMobileNavbar((prev) => !prev);
  };

  const linkStyle = (linkHref: string) =>
    `nav-link ${currentRoute.startsWith(linkHref) ? 'active' : ''}`;

  return (
    <nav className='flex items-center'>
      <div className='nav-btn cursor-pointer' onClick={toggleMenu}>
        {showMobileNavbar ? (
          <Bars3BottomRightIcon
            className='text-gray-700'
            style={{ width: '2rem' }}
          />
        ) : (
          <Bars3Icon className='text-gray-700' style={{ width: '2rem' }} />
        )}
      </div>

      <ul className={'nav-items' + `${showMobileNavbar ? ' nav-active' : ''}`}>
        {isLoggedIn && user.isAdmin && (
          <li>
            <Link
              href='/todoapp/users'
              className={linkStyle('/todoapp/users')}
              onClick={() => toggleMenu()}
            >
              Users
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <>
            <li>
              <Link
                href='/todoapp/todos'
                className={linkStyle('/todoapp/todos')}
                onClick={() => toggleMenu()}
              >
                Todos
              </Link>
            </li>
            <li>
              <Link
                href='/todoapp/profile'
                className={linkStyle('/todoapp/profile')}
                onClick={() => toggleMenu()}
              >
                Profile
              </Link>
            </li>
            <li>
              <button className={'logout-btn'} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}

        {!isLoggedIn && (
          <>
            <li>
              <Link
                href='/todoapp/login'
                className={linkStyle('/todoapp/login')}
                onClick={() => toggleMenu()}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href='/todoapp/signup'
                className={linkStyle('/todoapp/signup')}
                onClick={() => toggleMenu()}
              >
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
