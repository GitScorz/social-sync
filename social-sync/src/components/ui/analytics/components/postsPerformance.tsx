import { formatStatsCount } from '@/utils/functions';
import { useTranslations } from 'next-intl';
import React from 'react';

interface PostsPerformanceProps {
  shares: number;
  views: number;
  comments: number;
  likes: number;
}

const PostsPerformance: React.FC<PostsPerformanceProps> = ({
  likes,
  comments,
  shares,
  views,
}) => {
  const t = useTranslations('Dashboard');
  const renderGrowth = (rate: number) => (
    <span
      className={`text-sm font-semibold ml-2 ${
        rate > 0 ? 'text-green-400' : 'text-red-400'
      }`}
    >
      {rate > 0 ? `+${rate}%` : `${rate}%`}
    </span>
  );

  return (
    <div className='bg-black bg-opacity-25 p-4 rounded-lg animate__animated animate__fadeIn'>
      <div className='flex flex-col space-y-4'>
        {[
          { label: t('likes'), value: likes, rate: 15 },
          { label: t('views'), value: views, rate: 10 },
          { label: t('comments'), value: comments, rate: -5 },
          { label: t('shares'), value: shares, rate: 20 },
        ].map((item) => (
          <div key={item.label} className='flex justify-between items-center'>
            <span className='text-lg'>{item.label}:</span>
            <div className='flex items-center'>
              <span className='text-xl font-bold text-purple-400'>
                {formatStatsCount(item.value)}
              </span>
              {renderGrowth(item.rate)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPerformance;
