'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import PageTitle from './page-title';
import { useTranslations } from 'next-intl';
import { TotalStatsData } from '@/types/dashboard';
import FollowersChart from './components/followersChart';
import PostsPerformance from './components/postsPerformance';
import HashtagsAnalysis from './components/hashtagsAnalysis';
import { Hashtag } from '@/types/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHashtag,
  faMagnifyingGlassChart,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import './main.css';

const Loading = dynamic(() => import('@/components/ui/loading/loading'), {
  ssr: false,
});

export default function MainAnalytics() {
  const t = useTranslations('Dashboard');

  const [hashtagAnalysis, setHashtagAnalysis] = React.useState<Hashtag[]>([]);
  const [stats, setStats] = React.useState<TotalStatsData>();
  const [followerDemographics, setFollowerDemographics] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);

  const [selectedMetric, setSelectedMetric] = React.useState<
    'followers' | 'likes' | 'views' | 'comments'
  >('followers');

  React.useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => {
        setFollowerDemographics(data.followerDemographics);
        setStats(data.stats);
        setHashtagAnalysis(data.hashtags);
        setLoading(false);
      });
  }, []);

  if (isLoading || !stats) return <Loading />;

  return (
    <>
      <section className='w-full mb-8'>
        <p>{t('analytics.follower-analise')}</p>
        <FollowersChart stats={stats} />
      </section>

      <div className='w-full flex justify-between'>
        <section className='w-[49%] mb-8'>
          <h2 className='text-2xl font-semibold mb-1'>
            <FontAwesomeIcon icon={faHashtag} className='text-purple-400' />{' '}
            {t('analytics.trending-hashtags')}
          </h2>
          <HashtagsAnalysis analysis={hashtagAnalysis} />
        </section>
        <section className='w-[49%] mb-8'>
          <h2 className='text-2xl font-semibold mb-1'>
            <FontAwesomeIcon icon={faThumbsUp} className='text-purple-400' />{' '}
            {t('analytics.last-post-performance')}
          </h2>
          <PostsPerformance
            likes={1543000}
            comments={52414}
            shares={21185}
            views={4356313}
          />
        </section>
      </div>
    </>
  );
}
