'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faEnvelope,
  faGear,
  faHeart,
  faListCheck,
  faShieldHalved,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Notification, NotificationType } from '@/types/dashboard';

export default function NotificationsBar({
  showNotifications,
}: {
  showNotifications: boolean;
}) {
  const [data, setData] = React.useState<Notification[]>([]);
  const t = useTranslations('Dashboard');

  React.useEffect(() => {
    fetch('/api/user-notifications')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const getFormattedTitle = (type: NotificationType, title: string) => {
    switch (type) {
      case 'feature':
      case 'birthday':
      case 'password_changed':
      case 'system':
        title = t(title);
        break;
    }

    return title;
  };

  const getFormattedDescription = (
    type: NotificationType,
    description?: string
  ) => {
    switch (type) {
      case 'comment':
        description = `${t('notifications.commented')} "${description}"`;
        break;
      case 'follow':
        description = t('notifications.followed');
        break;
      case 'like':
        description = t('notifications.liked');
        break;
      case 'birthday':
        description = t('notifications.birthday-description');
        break;
      case 'password_changed':
        description = t('notifications.password-changed');
        break;
      case 'feature':
      case 'system':
        description = t(description);
        break;
    }

    return description;
  };

  const getCustomIcon = (type: NotificationType) => {
    let icon = null;

    switch (type) {
      case 'comment':
        icon = <FontAwesomeIcon className='text-xl' icon={faComment} />;
        break;
      case 'follow':
        icon = (
          <FontAwesomeIcon
            className='text-xl'
            icon={faUserPlus}
            color='#c875fa'
          />
        );
        break;
      case 'like':
        icon = (
          <FontAwesomeIcon className='text-xl' icon={faHeart} color='red' />
        );
        break;
      case 'birthday':
        icon = <span className='text-xl'>🥳</span>;
        break;
      case 'feature':
        icon = (
          <FontAwesomeIcon
            className='text-xl'
            icon={faListCheck}
            color='#22ff00'
          />
        );
        break;
      case 'password_changed':
        icon = (
          <FontAwesomeIcon
            className='text-xl'
            icon={faShieldHalved}
            color='#005ed1'
          />
        );
        break;
      case 'system':
        icon = (
          <FontAwesomeIcon className='text-xl' icon={faGear} color='#aeb4b7' />
        );
        break;
    }

    return icon;
  };

  return (
    <div
      className={clsx(
        'flex h-full flex-col gap-2 flex-shrink-0 border-l-[1px] border-white border-opacity-10 transition-[width] ease-in-out duration-300',
        showNotifications ? 'w-64 p-4' : 'w-0 p-0'
      )}
    >
      {showNotifications && (
        <>
          <div className='font-semibold text-2xl select-none'>
            {t('notifications.title')}
          </div>
          <div className='w-full flex flex-col items-center h-full max-h-full gap-4 overflow-auto scrollbar-none'>
            {data.length === 0 ? (
              <div className='w-full h-full flex flex-col gap-2 justify-center items-center'>
                <FontAwesomeIcon icon={faEnvelope} className='text-4xl' />
                <span className='text-center'>{t('notifications.none')}</span>
              </div>
            ) : (
              data
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((item, index) => (
                  <div
                    key={index}
                    className='w-full flex bg-[#000000] bg-opacity-25 p-3 rounded-xl gap-2'
                  >
                    <div className=' size-9 flex items-center justify-center rounded-full text-xl shrink-0 select-none'>
                      {getCustomIcon(item.type)}
                    </div>

                    <div className='flex flex-col'>
                      <div className='text-sm font-semibold'>
                        {getFormattedTitle(item.type, item.title)}
                      </div>
                      <div className='text-xs'>
                        {getFormattedDescription(item.type, item.description)}
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
