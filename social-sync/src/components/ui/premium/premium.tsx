import { useTranslations } from 'use-intl';
import './premium.css';
import React from 'react';

export default function Premium() {
  const t = useTranslations('Premium');

  return (
    <>
      <p className='text-center'>{t('description')}</p>
      <div className='w-full h-full flex justify-center items-center gap-4'>
        <div className='max-w-sm rounded-xl overflow-hidden shadow-lg complex-gradient-bg text-white p-6'>
          <div className='px-6 py-4'>
            <div className='font-bold text-3xl mb-4 text-center'>Premium</div>
            <p className='text-xl text-center mb-6'>€5.99/{t('month')}</p>
            <ul className='list-disc list-inside space-y-2 text-lg'>
              <li>{t('brand-colabs')}</li>
              <li>{t('engagement-automation')}</li>
              <li>{t('dm-management')}</li>
            </ul>
          </div>
          <div className='mt-6 text-center'>
            <button className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out'>
              {t('subscribe-now')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
