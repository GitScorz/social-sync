'use client';

import {
  faCalendarDays,
  faChartSimple,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { DM_Sans } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const dmsans = DM_Sans({ subsets: ['latin'] });

export default function Home() {
  const t = useTranslations('LandingPage');
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <main className='absolute w-screen'>
      <section
        className='relative w-full h-[60rem] flex justify-center items-center'
        style={{
          background:
            'linear-gradient(180deg, #000000 0%, #200D42 36.21%, #4F21A1 68.68%, #A46EDB 86.54%)',
        }}
      >
        <svg
          className='absolute w-full bottom-0 z-10'
          viewBox='0 0 1200 175'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1787.5 507C1787.5 576.835 1754.79 643.404 1695.54 703.998C1636.29 764.593 1550.54 819.186 1444.53 865.044C1232.52 956.76 939.587 1013.5 616 1013.5C292.413 1013.5 -0.516663 956.76 -212.531 865.044C-318.538 819.186 -404.294 764.593 -463.541 703.998C-522.785 643.404 -555.5 576.835 -555.5 507C-555.5 437.165 -522.785 370.596 -463.541 310.002C-404.294 249.407 -318.538 194.814 -212.531 148.956C-0.516663 57.2398 292.413 0.5 616 0.5C939.587 0.5 1232.52 57.2398 1444.53 148.956C1550.54 194.814 1636.29 249.407 1695.54 310.002C1754.79 370.596 1787.5 437.165 1787.5 507Z'
            fill='url(#radial-paint)'
            stroke='var(--main-color)'
          />
          <defs>
            <radialGradient
              id='radial-paint'
              cx='0'
              cy='0'
              r='1'
              gradientUnits='userSpaceOnUse'
              gradientTransform='translate(616 507) rotate(90) scale(521 1204.36)'
            >
              <stop offset='0.822011' />
              <stop offset='1' stopColor='#9560EB' />
            </radialGradient>
          </defs>
        </svg>

        <div className='relative w-full z-20 flex items-center flex-col gap-5'>
          <div
            className='md:text-[135px] sm:text-[94px] text-[65px] leading-none text-center tracking-[-0.075em] font-bold'
            style={{
              fontFamily: dmsans.style.fontFamily,
            }}
          >
            {t('main-title-one')}
            <br />
            {t('main-title-two')}
          </div>
          <div className='text-2xl xl:w-2/4 w-3/4 text-center tracking-[-0.036em]'>
            {t('main-description')}
          </div>
          <Link
            href={session ? '/dashboard' : '/login'}
            // onClick={() => {
            //   if (session) return router.push('dashboard');
            //   signIn();
            // }}
            className='p-2 px-4 text-lg bg-white text-black rounded-lg cursor-pointer hover:opacity-85 transition ease-in-out duration-200'
          >
            {t('start-now')}
          </Link>
        </div>
      </section>

      <section className='w-full h-fit pt-40 bg-background-color flex items-center justify-center flex-col gap-10 z-50'>
        <div
          className='md:text-6xl text-4xl leading-none text-center tracking-[-0.075em] font-bold'
          style={{
            fontFamily: dmsans.style.fontFamily,
          }}
        >
          {t('everything-you-need.title')}
        </div>

        <div className='md:text-2xl sm:text-xl text-base text-center xl:w-2/4 w-3/4 tracking-[-0.036em]'>
          {t('everything-you-need.description')}
        </div>

        <div className='flex flex-col xl:flex-row xl:justify-center items-center gap-8 w-full'>
          <div className='w-96 h-96 p-8 border-white border-[1px] border-opacity-20 bg-[#0D0D0D] rounded-xl flex items-center justify-center flex-col hover:scale-105 transition ease-in-out duration-300'>
            <div
              className='size-20 rounded-lg flex items-center justify-center text-black text-2xl'
              style={{ background: '#F87BFF' }}
            >
              <FontAwesomeIcon icon={faChartSimple} />
            </div>
            <div className='text-xl mt-4 font-bold text-center'>
              {t('everything-you-need.performance-analysis.title')}
            </div>
            <div className='text-lg text-center mt-4'>
              {t('everything-you-need.performance-analysis.description')}
            </div>
          </div>

          <div className='w-96 h-96 p-8 border-white border-[1px] border-opacity-20 bg-[#0D0D0D] rounded-xl flex items-center justify-center flex-col hover:scale-105 transition ease-in-out duration-300'>
            <div
              className='size-20 rounded-lg flex items-center justify-center text-black text-2xl'
              style={{
                background: '#C2F0B1',
              }}
            >
              <FontAwesomeIcon icon={faCalendarDays} />
            </div>
            <div className='text-xl mt-4 font-bold text-center'>
              {t('everything-you-need.content-scheduling.title')}
            </div>
            <div className='text-lg text-center mt-4'>
              {t('everything-you-need.content-scheduling.description')}
            </div>
          </div>

          <div className='w-96 h-96 p-8 border-white border-[1px] border-opacity-20 bg-[#0D0D0D] rounded-xl flex items-center justify-center flex-col hover:scale-105 transition ease-in-out duration-300'>
            <div
              className='size-20 rounded-lg flex items-center justify-center text-black text-2xl'
              style={{
                background: '#2FD8FE',
              }}
            >
              <FontAwesomeIcon icon={faComments} />
            </div>
            <div className='text-xl mt-4 font-bold text-center'>
              {t('everything-you-need.direct-message-management.title')}
            </div>
            <div className='text-lg text-center mt-4'>
              {t('everything-you-need.direct-message-management.description')}
            </div>
          </div>
        </div>
      </section>
      <section
        className='w-full h-[85rem] bg-background-color flex items-center justify-center flex-col gap-10'
        style={{
          background:
            'linear-gradient(180deg, #000000 0%, rgba(93, 44, 168, 0.85) 57.83%, #000000 100%)',
        }}
      >
        <div
          className='text-6xl leading-none text-center tracking-[-0.075em] font-bold'
          style={{
            fontFamily: dmsans.style.fontFamily,
          }}
        >
          {t('intuitive-interface.title')}
        </div>
        <div className='text-center xl:w-2/5 w-3/4 text-2xl tracking-[-0.036em]'>
          {t('intuitive-interface.description')}
        </div>
        <div className='w-full flex items-center justify-center gap-8'>
          <img
            className='w-2/6 object-contain rounded-xl hover:scale-110 transition ease-in-out duration-300'
            src='https://imgur.com/9Haq3Mt.png'
            alt='Preview'
          />
          <img
            className='w-2/6 object-contain rounded-xl hover:scale-110 transition ease-in-out duration-300'
            src='https://imgur.com/swR5toQ.png'
            alt='Preview'
          />
        </div>
      </section>
    </main>
  );
}
