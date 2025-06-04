'use client';

import { DM_Sans } from 'next/font/google';
import React from 'react';

const dmsans = DM_Sans({ subsets: ['latin'] });

export default function PrivacyPolicy() {
  return (
    <div className='absolute w-full h-full max-h-full flex items-center justify-center'>
      <div
        className='text-6xl leading-none text-center tracking-[-0.075em] font-bold'
        style={{
          fontFamily: dmsans.style.fontFamily,
        }}
      >
        Politica de Privacidade
      </div>
      <div className=''></div>
    </div>
  );
}
