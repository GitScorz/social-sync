import React from 'react';
import { Metadata } from 'next';
import MainAnalytics from '@/components/ui/analytics/main-overview';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@/navigation';
import PageTitle from '@/components/ui/analytics/page-title';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('analytics'),
  };
}

export default function Analytics() {
  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <PageTitle />
      <MainAnalytics />
    </div>
  );
}
