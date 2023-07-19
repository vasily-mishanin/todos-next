'use client';

import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import './styles.css';
import { Bars3Icon, Bars3BottomRightIcon } from '@heroicons/react/24/solid';

export type NavigationProps = {
  loggedIn: boolean;
  isAdmin: boolean;
};

export function Navigation({ loggedIn, isAdmin }: NavigationProps) {
  const router = useRouter();
  const [showMobileNavbar, setShowMobileNavbar] = useState(false);

  const logout = async () => {
    try {
      await axios.get('/api/users/logout'); // deletes token from cookies
      router.push('/');
    } catch (error: any) {
      console.log('Error: ' + error.message);
      toast.error(error.message);
    }
  };

  const toggleMenu = () => {
    setShowMobileNavbar((prev) => !prev);
  };

  const linkBaseStyle =
    'block w-full px-3 py-2 rounded text-gray-400 items-center justify-center  hover:text-gray-600';

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
        {loggedIn && isAdmin && (
          <li>
            <Link
              href='/todoapp/users'
              className={linkBaseStyle + ' hover:bg-gray-100'}
              onClick={() => toggleMenu()}
            >
              Users
            </Link>
          </li>
        )}

        {loggedIn && (
          <>
            <li>
              <Link
                href='/todoapp/todos'
                className={linkBaseStyle + ' hover:bg-gray-100'}
                onClick={() => toggleMenu()}
              >
                Todos
              </Link>
            </li>
            <li>
              <Link
                href='/todoapp/profile'
                className={linkBaseStyle + ' hover:bg-gray-100'}
                onClick={() => toggleMenu()}
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                className={linkBaseStyle + ' hover:bg-red-200'}
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </>
        )}

        {!loggedIn && (
          <>
            <li>
              <Link
                href='/todoapp/login'
                className={linkBaseStyle + ' hover:bg-gray-100'}
                onClick={() => toggleMenu()}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href='/todoapp/signup'
                className={linkBaseStyle + ' hover:bg-gray-100'}
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
