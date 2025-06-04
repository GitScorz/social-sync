'use client';

import Link from 'next/link';
import NavLinks from './nav-links';
import { signOut, useSession } from 'next-auth/react';
import clsx from 'clsx';
import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { socialNetworks } from '@/lib/constants';
import { useLocale, useTranslations } from 'next-intl';
import { faCrown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Modal from '../modal/modal';
import Premium from '../premium/premium';

export const socialMediaList: Record<string, any> = {};

Object.keys(socialNetworks).map((val) => {
  let icon = null;

  switch (val) {
    case 'twitter':
      icon = <FontAwesomeIcon icon={faXTwitter} />;
      break;
    case 'tiktok':
      icon = <FontAwesomeIcon icon={faTiktok} />;
      break;
    case 'facebook':
      icon = <FontAwesomeIcon icon={faFacebook} />;
      break;
    case 'instagram':
      icon = <FontAwesomeIcon icon={faInstagram} />;
      break;
  }

  socialMediaList[val] = {
    ...socialNetworks[val],
    icon,
  };
});

export default function Sidebar({
  expanded,
  accounts,
}: {
  expanded: boolean;
  accounts: any[];
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const locale = useLocale();
  const t = useTranslations('Dashboard');

  const [premiumModal, setPremiumModal] = useState(false);

  const linkedProviders = accounts.map((account) => account.provider);

  return (
    <>
      <Modal
        title={t('navbar.premium')}
        show={premiumModal}
        onClose={() => setPremiumModal(false)}
        customClass='!w-2/5 h-3/5'
        customIcon={faCrown}
        iconColor='#fbbe28'
      >
        <Premium />
      </Modal>
      <div
        className={clsx(
          'relative flex h-full flex-col gap-2 md:px-2 border-r-[1px] border-white border-opacity-10',
          expanded ? 'md:p-4' : 'py-4'
        )}
      >
        <section
          className={clsx(
            'flex flex-row items-center gap-2 select-none !p-3 justify-normal',
            !expanded ? 'md:!p-0 md:justify-center' : undefined
          )}
        >
          <Link href='/' className='flex flex-row gap-2 items-center'>
            <img
              className='object-cover h-10 w-10 rounded-lg'
              src='/logo.png'
              alt='Logo'
            />
            {expanded && (
              <span className='hidden md:block text-lg font-semibold'>
                Social Sync
              </span>
            )}
          </Link>
        </section>

        <section
          className={clsx(
            'flex flex-col p-3 gap-2 select-none',
            !expanded ? '!p-0 justify-center' : undefined
          )}
        >
          <span
            className={clsx(
              'text-[#E7E7E7] md:ml-0 md:text-[0.65rem] md:text-center text-opacity-40 text-base text-start ml-5',
              expanded ? 'ml-5 !text-base !text-start' : 'ml-0'
            )}
          >
            {t('navbar.premium')}
          </span>
          <div
            onClick={() => setPremiumModal(true)}
            className={clsx(
              `flex flex-none items-center justify-start p-2 gap-2 rounded-xl text-base text-[#E7E7E7] hover:bg-white hover:bg-opacity-10 cursor-pointer`,
              !expanded && 'justify-center'
            )}
          >
            <FontAwesomeIcon icon={faCrown} color='#fbbe28' />
            {expanded && (
              <p className='hidden md:block'>{t(`navbar.premium`)}</p>
            )}
          </div>
        </section>

        <section
          className={clsx(
            'flex flex-col p-3 gap-2 select-none',
            !expanded ? '!p-0 justify-center' : undefined
          )}
        >
          <span
            className={clsx(
              'text-[#E7E7E7] md:ml-0 md:text-[0.65rem] md:text-center text-opacity-40 text-base text-start ml-5',
              expanded ? 'ml-5 !text-base !text-start' : 'ml-0'
            )}
          >
            {t('navbar.dashboards')}
          </span>
          <NavLinks expanded={expanded} />
        </section>

        <section className='flex flex-col gap-2 p-3 select-none'>
          {linkedProviders.length > 1 && (
            <span
              className={clsx(
                'text-[#E7E7E7] md:ml-0 md:text-[0.65rem] md:text-center text-opacity-40 text-base text-start ml-5',
                expanded ? 'ml-5 !text-base !text-start' : 'ml-0'
              )}
            >
              {t('navbar.individual-analytics')}
            </span>
          )}
          {linkedProviders.map((provider) => {
            if (provider === 'google') return null;

            return (
              <Link
                key={provider}
                href={socialMediaList[provider].href}
                className={clsx(
                  `flex flex-none items-center justify-start p-2 gap-2 rounded-xl text-base text-[#E7E7E7] hover:bg-white hover:bg-opacity-10 ${
                    pathname === '/' + locale + socialMediaList[provider].href
                      ? 'bg-white bg-opacity-10'
                      : ''
                  }`,
                  !expanded && 'md:justify-center'
                )}
              >
                {socialMediaList[provider].icon}
                {expanded && (
                  <p className='hidden md:block'>
                    {socialMediaList[provider].label}
                  </p>
                )}
              </Link>
            );
          })}
        </section>

        <footer className='absolute right-0 px-4 bottom-6 w-full flex justify-center items-center gap-3'>
          {expanded && (
            <>
              {session?.user?.image ? (
                <div className='relative h-10 w-10 rounded-full flex items-center justify-center text-xl select-none shrink-0'>
                  <Image
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover rounded-full pointer-events-none'
                    src={session?.user?.image}
                    alt='Avatar'
                  />
                </div>
              ) : (
                <div className='h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-xl select-none shrink-0'>
                  {session?.user?.name?.split(' ')[0][0].toUpperCase()}
                </div>
              )}

              <span
                className={clsx(
                  'select-text shrink-0',
                  expanded ? 'md:block hidden' : undefined
                )}
              >
                {session?.user?.name}
              </span>
            </>
          )}

          <FontAwesomeIcon
            icon={faRightFromBracket}
            style={{ cursor: 'pointer' }}
            onClick={() =>
              signOut({
                callbackUrl: '/',
              })
            }
          />
        </footer>
      </div>
    </>
  );
}
