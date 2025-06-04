'use client';

import { Locale, locales } from '@/navigation';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu, MenuItem } from '../dropdown/dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

export const localesStrings: Record<Locale, string> = {
  en: '🇺🇸 English',
  'pt-PT': '🇵🇹 Português',
};

export default function LocaleSwitcher() {
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
    <Dropdown
      onOpenChange={(e, open) => setDropdownOpen(open)}
      open={dropdownOpen}
      defaultOpen={false}
    >
      <BaseMenuButton>
        <FontAwesomeIcon
          className='text-gray-500 text-xl cursor-pointer hover:text-foreground-color'
          icon={faGlobe}
        />
      </BaseMenuButton>
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
  );
}
