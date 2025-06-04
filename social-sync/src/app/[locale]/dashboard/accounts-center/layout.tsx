import { Metadata } from 'next';
import Page from './page';
import { Locale } from '@/navigation';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('accounts-center'),
  };
}

export default Page;
