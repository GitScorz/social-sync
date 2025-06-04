'use client';

import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import React from 'react';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { Dropdown } from '@mui/base/Dropdown';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, MenuItem } from '../dropdown/dropdown';

interface ProfileProps {
  session: Session;
  pathname: string;
}

export default function Profile({ session, pathname }: ProfileProps) {
  const t = useTranslations('LandingPage');
  const locale = useLocale();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <React.Fragment>
      <svg
        className='text-gray-500 text-xl cursor-pointer hover:text-foreground-color'
        width='1em'
        height='1em'
        viewBox='0 0 19 22'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M7.32435 19.106C7.84235 19.683 8.50735 20 9.19735 20H9.19835C9.89135 20 10.5593 19.683 11.0783 19.105C11.3563 18.798 11.8303 18.773 12.1373 19.05C12.4453 19.327 12.4703 19.802 12.1933 20.109C11.3853 21.006 10.3223 21.5 9.19835 21.5H9.19635C8.07535 21.499 7.01435 21.005 6.20935 20.108C5.93235 19.801 5.95735 19.326 6.26535 19.05C6.57335 18.772 7.04735 18.797 7.32435 19.106ZM9.24715 0C13.6921 0 16.6782 3.462 16.6782 6.695C16.6782 8.358 17.1012 9.063 17.5501 9.811C17.9942 10.549 18.4972 11.387 18.4972 12.971C18.1481 17.018 13.9231 17.348 9.24715 17.348C4.57115 17.348 0.345149 17.018 0.000135307 13.035C-0.00285134 11.387 0.500149 10.549 0.944149 9.811L1.10089 9.54715C1.48682 8.88386 1.81615 8.16235 1.81615 6.695C1.81615 3.462 4.80215 0 9.24715 0ZM9.24715 1.5C5.75215 1.5 3.31615 4.238 3.31615 6.695C3.31615 8.774 2.73915 9.735 2.22915 10.583C1.82015 11.264 1.49715 11.802 1.49715 12.971C1.66415 14.857 2.90915 15.848 9.24715 15.848C15.5501 15.848 16.8341 14.813 17.0001 12.906C16.9971 11.802 16.6742 11.264 16.2652 10.583C15.7551 9.735 15.1781 8.774 15.1781 6.695C15.1781 4.238 12.7421 1.5 9.24715 1.5Z'
        />
      </svg>
      <Dropdown
        onOpenChange={(e, open) => setDropdownOpen(open)}
        open={dropdownOpen}
        defaultOpen={false}
      >
        <BaseMenuButton>
          {session.user?.image ? (
            <div className='relative size-10 rounded-full flex items-center justify-center text-xl select-none'>
              <Image
                fill
                className='object-cover rounded-full pointer-events-none'
                src={session?.user?.image}
                alt='Avatar'
              />
            </div>
          ) : (
            <div className='size-10 rounded-full bg-gray-400 flex items-center justify-center text-xl select-none'>
              {session.user?.name?.split(' ')[0][0].toUpperCase()}
            </div>
          )}
        </BaseMenuButton>
        <Menu className='z-50'>
          {!pathname.includes('/dashboard') ? (
            <MenuItem onClick={() => router.push(locale + '/dashboard')}>
              {t('dropdown.dashboard')}
            </MenuItem>
          ) : (
            <MenuItem onClick={() => router.push('/')}>Início</MenuItem>
          )}
          <MenuItem
            className='text-red-600'
            onClick={() => {
              signOut({
                callbackUrl: '/',
              });
            }}
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />{' '}
            {t('dropdown.sign-out')}
          </MenuItem>
        </Menu>
      </Dropdown>
    </React.Fragment>
  );
}
