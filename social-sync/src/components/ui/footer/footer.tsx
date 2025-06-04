'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Footer() {
  const t = useTranslations('Footer');
  const pathname = usePathname();

  if (pathname.includes('/dashboard')) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className='absolute bottom-0 w-full p-6 border-t-[1px] border-white border-opacity-20 bg-black text-[#808080] flex justify-between'>
      <span>{t('description', { date: currentYear })}</span>
      <div></div>
    </footer>
  );
}
