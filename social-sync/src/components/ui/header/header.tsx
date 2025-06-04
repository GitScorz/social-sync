'use client';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import Profile from './profile';
import LocaleSwitcher from '../i18n/locale-switcher';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('LandingPage');

  const { data: session } = useSession();
  const pathname = usePathname();

  const [coloredHeader, setColoredHeader] = React.useState(false);

  React.useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 50) {
        setColoredHeader(true);
      } else {
        setColoredHeader(false);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  if (pathname.includes('/dashboard')) return null;

  return (
    <header
      className='fixed z-40 top-0 left-0 right-0 w-full h-24 flex items-center justify-between p-4 px-7 text-sm transition ease-in-out duration-200 select-none'
      style={{ background: coloredHeader ? 'black' : undefined }}
    >
      <div>
        <Link href='/' className='flex items-center gap-4'>
          <div
            className='relative blur-sm size-10'
            style={{
              background:
                'linear-gradient(89.43deg, #F87BFF 0.48%, #FB92CF 24.31%, #FFDD9B 48.21%, #C2F0B1 72.62%, #2FD8FE 99.52%)',
            }}
          />
          <img
            className='absolute object-cover size-10 rounded-lg'
            src='/logo.png'
            alt='Logo'
          />
          <span className='text-base font-medium sm:block hidden '>
            Social Sync
          </span>
        </Link>
      </div>
      <div className='flex gap-4 items-center h-full'>
        <LocaleSwitcher />
        {!pathname.includes('/login') && !pathname.includes('/signup') && (
          <>
            {session?.user ? (
              <Profile session={session} pathname={pathname} />
            ) : (
              <Link
                href='/login'
                className='p-2 px-4 text-lg bg-white text-black rounded-lg cursor-pointer hover:opacity-75 transition ease-in-out duration-200'
              >
                {t('start-now')}
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}
