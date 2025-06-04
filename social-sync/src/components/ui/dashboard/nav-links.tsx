'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faEnvelope,
  faHouse,
  faPersonShelter,
  faRectangleAd,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';

const links = [
  {
    name: 'home',
    href: '/dashboard',
    icon: <FontAwesomeIcon icon={faHouse} />,
  },
  {
    name: 'analytics',
    href: '/dashboard/analytics',
    icon: <FontAwesomeIcon icon={faChartPie} />,
  },
  {
    name: 'accounts-center',
    href: '/dashboard/accounts-center',
    icon: <FontAwesomeIcon icon={faPersonShelter} />,
  },
  {
    name: 'brands',
    href: '/dashboard/brands',
    icon: <FontAwesomeIcon icon={faRectangleAd} />,
  },
  {
    name: 'private-messages',
    href: '/dashboard/private-messages',
    icon: <FontAwesomeIcon icon={faEnvelope} />,
  },
];

export default function NavLinks({ expanded }: { expanded: boolean }) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Dashboard');

  return (
    <>
      {links.map((link) => {
        const linkIcon = link.icon;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              `flex flex-none items-center justify-start p-2 gap-2 rounded-xl text-base text-[#E7E7E7] hover:bg-white hover:bg-opacity-10 ${
                pathname === '/' + locale + link.href
                  ? 'bg-white bg-opacity-10'
                  : ''
              }`,
              !expanded && 'justify-center'
            )}
          >
            {linkIcon}
            {expanded && (
              <p className='hidden md:block'>{t(`navbar.${link.name}`)}</p>
            )}
          </Link>
        );
      })}
    </>
  );
}
