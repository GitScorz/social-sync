'use client';

import DashboardHeader from '@/components/ui/dashboard/header';
import React, { useRef } from 'react';
import NotificationsBar from './notifications-bar';
import Sidebar from './sidebar';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

interface DashboardOverviewProps {
  accounts: any[];
  user: any | null;
}

export default function DashboardOverview({
  children,
  accounts,
  user,
}: React.PropsWithChildren<DashboardOverviewProps>) {
  const pathname = usePathname();
  const [sidebarExpanded, setSidebarExpanded] = React.useState(true);
  const [showNotifications, setShowNotitifications] = React.useState(false);
  const [glassEffect, setGlassEffect] = React.useState(false);

  const scrollPage = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const scrollListener = () => {
      if (scrollPage.current) {
        console.log(scrollPage.current.scrollTop);
        if (scrollPage.current.scrollTop > 50) {
          setGlassEffect(true);
        } else {
          setGlassEffect(false);
        }
      }
    };

    const currentElement = scrollPage.current;
    if (currentElement) {
      currentElement.addEventListener('scroll', scrollListener);
    }

    return () => {
      if (currentElement) {
        currentElement.removeEventListener('scroll', scrollListener);
      }
    };
  }, []);

  return (
    <>
      <div
        className={clsx(
          'md:flex-none transition-[width] ease-in-out duration-300',
          sidebarExpanded ? 'md:w-64 w-20' : 'w-20'
        )}
      >
        <Sidebar expanded={sidebarExpanded} accounts={accounts} />
      </div>
      <div className='w-full h-full flex flex-col'>
        <DashboardHeader
          glassEffect={glassEffect}
          handleSidebarState={() => setSidebarExpanded(!sidebarExpanded)}
          handleNotificationBar={() =>
            setShowNotitifications(!showNotifications)
          }
        />
        <div
          className={clsx(
            'h-full max-h-full flex-grow p-3 overflow-y-auto md:p-8',
            pathname.includes('private-messages') && '!p-0 md:!p-0'
          )}
          ref={scrollPage}
        >
          {children}
        </div>
      </div>

      <NotificationsBar showNotifications={showNotifications} />
    </>
  );
}
