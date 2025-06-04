'use client';

import React from 'react';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import { socialMediaList } from '../dashboard/sidebar';

export default function PageTitle({
  socialNetwork,
}: {
  socialNetwork?: string;
}) {
  const t = useTranslations('Dashboard');

  const icon = socialNetwork ? (
    socialMediaList[socialNetwork]?.icon
  ) : (
    <FontAwesomeIcon icon={faChartPie} className='text-purple-400' />
  );

  return (
    <div className='w-full flex-col'>
      <div className='font-bold text-2xl'>
        {icon} {t('navbar.analytics')}
      </div>
      <p>{t('analytics.description')}</p>
    </div>
  );
}
