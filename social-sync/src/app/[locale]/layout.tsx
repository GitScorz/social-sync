import '@fortawesome/fontawesome-svg-core/styles.css';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import type { Metadata, Viewport } from 'next';
import '../globals.css';
import SessionWrapper from '@/components/SessionWrapper';
import Header from '@/components/ui/header/header';
import { Inter } from 'next/font/google';
import clsx from 'clsx';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Locale } from '@/navigation';
import { getTranslations } from 'next-intl/server';
import { usePathname } from 'next/navigation';

config.autoAddCss = false;
library.add(fas, far, fab);

const inter = Inter({ subsets: ['latin'] });

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
};

export default function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();

  return (
    <SessionWrapper>
      <html lang={params.locale}>
        <NextIntlClientProvider messages={messages}>
          <body
            className={clsx(
              'relative w-full h-screen min-h-full',
              inter.className
            )}
          >
            <Header />
            {children}
            {/* <Footer /> */}
          </body>
        </NextIntlClientProvider>
      </html>
    </SessionWrapper>
  );
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: 'Social Sync',
    description: t('description'),
    icons: {
      icon: ['/favicon.ico?v=4'],
      apple: ['/apple-touch-icon.png?v=4'],
      shortcut: ['/apple-touch-icon.png'],
    },
    authors: [
      {
        name: 'Cristiano Monteiro',
      },
    ],
  };
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width',
  userScalable: false,
};
