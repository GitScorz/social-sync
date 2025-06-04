'use client';

import MainAnalytics from '@/components/ui/analytics/main-overview';
import PageTitle from '@/components/ui/analytics/page-title';
import { Session } from 'next-auth';
import dynamic from 'next/dynamic';
import React from 'react';

interface StatisticsOverviewProps {
  id: string;
  session: Session | null;
}

const Loading = dynamic(() => import('@/components/ui/loading/loading'), {
  ssr: false,
});

export default function StatisticsOverview({
  id,
  session,
}: StatisticsOverviewProps) {
  const [data, setData] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`/api/statistics?network=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <PageTitle socialNetwork={id} />
      <MainAnalytics />
    </>
  );
}
