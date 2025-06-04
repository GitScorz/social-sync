'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import LocaleSwitcher, { localesStrings } from '../i18n/locale-switcher';
import { useLocale, useTranslations } from 'next-intl';
import { Locale, locales } from '@/navigation';
import { usePathname, useRouter } from 'next/navigation';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem } from '../dropdown/dropdown';
import { Badge } from '../badge/badge';
import clsx from 'clsx';

interface DashboardHeaderProps {
  handleSidebarState: () => void;
  handleNotificationBar: () => void;
  glassEffect: boolean;
}

export default function DashboardHeader({
  handleSidebarState,
  handleNotificationBar,
  glassEffect,
}: DashboardHeaderProps) {
  const t = useTranslations('Dashboard');
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale): void => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPathname = segments.join('/');

    router.replace(newPathname);
    router.refresh();
  };

  return (
    <div
      className={clsx(
        'relative flex justify-between items-center px-4 py-2 border-b-[1px] border-white border-opacity-10 transition-[width] duration-300 ease-in-out',
        'h-16',
        'sm:h-12',
        'md:h-14',
        glassEffect
          ? 'backdrop-filter backdrop-blur-sm bg-gray-300 bg-opacity-5'
          : undefined
      )}
    >
      <div className='flex gap-3 items-center'>
        <svg
          onClick={handleSidebarState}
          className='cursor-pointer'
          width='1em'
          height='1em'
          viewBox='0 0 18 14'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M15.875 0.125H2.125C1.79348 0.125 1.47554 0.256696 1.24112 0.491116C1.0067 0.725537 0.875 1.04348 0.875 1.375V12.625C0.875 12.9565 1.0067 13.2745 1.24112 13.5089C1.47554 13.7433 1.79348 13.875 2.125 13.875H15.875C16.2065 13.875 16.5245 13.7433 16.7589 13.5089C16.9933 13.2745 17.125 12.9565 17.125 12.625V1.375C17.125 1.04348 16.9933 0.725537 16.7589 0.491116C16.5245 0.256696 16.2065 0.125 15.875 0.125ZM2.125 8.875H3.375C3.54076 8.875 3.69973 8.80915 3.81694 8.69194C3.93415 8.57473 4 8.41576 4 8.25C4 8.08424 3.93415 7.92527 3.81694 7.80806C3.69973 7.69085 3.54076 7.625 3.375 7.625H2.125V6.375H3.375C3.54076 6.375 3.69973 6.30915 3.81694 6.19194C3.93415 6.07473 4 5.91576 4 5.75C4 5.58424 3.93415 5.42527 3.81694 5.30806C3.69973 5.19085 3.54076 5.125 3.375 5.125H2.125V3.875H3.375C3.54076 3.875 3.69973 3.80915 3.81694 3.69194C3.93415 3.57473 4 3.41576 4 3.25C4 3.08424 3.93415 2.92527 3.81694 2.80806C3.69973 2.69085 3.54076 2.625 3.375 2.625H2.125V1.375H5.25V12.625H2.125V8.875ZM15.875 12.625H6.5V1.375H15.875V12.625Z' />
        </svg>
      </div>
      <div className='flex gap-3 items-center h-full'>
        <Dropdown
          onOpenChange={(e, open) => setDropdownOpen(open)}
          open={dropdownOpen}
          defaultOpen={false}
        >
          <MenuButton>
            <FontAwesomeIcon className='cursor-pointer' icon={faGlobe} />
          </MenuButton>
          {locales.map((val) => (
            <React.Fragment key={val}>
              {locale !== val && (
                <Menu className='z-50'>
                  <MenuItem onClick={() => handleLocaleChange(val)}>
                    {localesStrings[val]}
                  </MenuItem>
                </Menu>
              )}
            </React.Fragment>
          ))}
        </Dropdown>

        <svg
          onClick={handleNotificationBar}
          className='cursor-pointer'
          width='1em'
          height='1em'
          viewBox='0 0 16 18'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M15.3282 12.7453C14.8946 11.9984 14.2501 9.88516 14.2501 7.125C14.2501 5.4674 13.5916 3.87769 12.4195 2.70558C11.2474 1.53348 9.65767 0.875 8.00007 0.875C6.34247 0.875 4.75276 1.53348 3.58065 2.70558C2.40855 3.87769 1.75007 5.4674 1.75007 7.125C1.75007 9.88594 1.10476 11.9984 0.671165 12.7453C0.560439 12.9352 0.501739 13.1509 0.500984 13.3707C0.500229 13.5905 0.557447 13.8066 0.666867 13.9973C0.776287 14.1879 0.934039 14.3463 1.12422 14.4565C1.31439 14.5667 1.53027 14.6248 1.75007 14.625H4.93835C5.08255 15.3306 5.46603 15.9647 6.02392 16.4201C6.58182 16.8756 7.2799 17.1243 8.00007 17.1243C8.72025 17.1243 9.41832 16.8756 9.97622 16.4201C10.5341 15.9647 10.9176 15.3306 11.0618 14.625H14.2501C14.4698 14.6247 14.6856 14.5665 14.8757 14.4562C15.0657 14.346 15.2234 14.1875 15.3327 13.9969C15.442 13.8063 15.4992 13.5903 15.4984 13.3705C15.4976 13.1508 15.4389 12.9351 15.3282 12.7453ZM8.00007 15.875C7.61243 15.8749 7.23435 15.7546 6.91788 15.5308C6.60141 15.3069 6.3621 14.9905 6.23288 14.625H9.76726C9.63804 14.9905 9.39873 15.3069 9.08226 15.5308C8.76579 15.7546 8.38771 15.8749 8.00007 15.875ZM1.75007 13.375C2.35163 12.3406 3.00007 9.94375 3.00007 7.125C3.00007 5.79892 3.52686 4.52715 4.46454 3.58947C5.40222 2.65178 6.67399 2.125 8.00007 2.125C9.32615 2.125 10.5979 2.65178 11.5356 3.58947C12.4733 4.52715 13.0001 5.79892 13.0001 7.125C13.0001 9.94141 13.6469 12.3383 14.2501 13.375H1.75007Z' />
        </svg>
        {/* <Badge badgeContent={5}>
          <span className='w-10 h-10 rounded-xl bg-slate-300 dark:bg-slate-400 inline-block align-middle' />
        </Badge> */}
      </div>
    </div>
  );
}
