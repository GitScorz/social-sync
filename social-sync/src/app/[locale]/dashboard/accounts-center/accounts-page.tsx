'use client';

import { faPersonShelter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn } from 'next-auth/react';
import React from 'react';
import { providersConfig } from '@/lib/providersConfig';
import { Account, UserInsert } from '@/types/auth';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const Loading = dynamic(() => import('@/components/ui/loading/loading'), {
  ssr: false,
});

export default function AccountsPage({
  accounts,
  user,
}: {
  accounts: Account[];
  user?: UserInsert | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const t = useTranslations('Dashboard');
  const linkedProviders = accounts.map((account) => account.provider);

  const deleteAccount = async (provider: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/delete-account', {
        method: 'POST',
        body: JSON.stringify({
          provider,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Failed to delete account:', data.message);
      }
    } catch (error) {
      console.error('An error occurred while deleting the account:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <div className='w-full flex-col'>
        <div className='font-bold text-2xl'>
          <FontAwesomeIcon icon={faPersonShelter} className='text-purple-400' />{' '}
          {t('navbar.accounts-center')}
        </div>
        <p>{t('accounts-center.description')}</p>
      </div>

      <div className='grid grid-cols-4 gap-7'>
        {providersConfig.map((provider, key) => {
          const isLinked = linkedProviders.includes(provider.id);

          return (
            <div
              key={key}
              className='h-56 bg-black bg-opacity-25 rounded-2xl flex flex-col justify-between items-center p-4'
            >
              <div className='w-full font-bold flex flex-col items-center justify-center gap-2'>
                {provider.component}
                <span className='text-white text-lg'>{provider.name}</span>
              </div>
              {isLinked ? (
                <>
                  <button
                    className='w-full p-3 border border-white rounded-2xl text-[#E7E7E7] text-center select-none hover:opacity-85'
                    onClick={() => {
                      if (loading) return;
                      deleteAccount(provider.id);
                    }}
                  >
                    {loading ? (
                      <Loading />
                    ) : (
                      <span>{t('accounts-center.remove')}</span>
                    )}
                  </button>
                </>
              ) : (
                <button
                  className='w-full p-3 bg-white rounded-2xl text-black text-center select-none hover:opacity-85'
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: window.location.origin,
                    })
                  }
                >
                  {t('accounts-center.connect')}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
