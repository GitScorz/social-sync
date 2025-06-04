import { calculateGrowthRate, formatStatsCount } from '@/utils/functions';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface StatsCardProps {
  label: string;
  amount: number;
  diff: number;
  CardIcon: JSX.Element;
}

export default function StatsCard({
  label,
  amount,
  diff,
  CardIcon,
}: StatsCardProps) {
  return (
    <div className='w-full flex flex-col gap-2 p-4 sm:p-6 bg-black bg-opacity-25 rounded-2xl text-[#E7E7E7]'>
      <div className='font-semibold flex flex-col sm:flex-row sm:gap-2 sm:items-center'>
        {CardIcon}
        <span className='sm:block'>{label}</span>
      </div>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
        <div className='font-semibold text-2xl sm:text-3xl'>
          {formatStatsCount(amount)}
        </div>
        <div className='mt-2 sm:mt-0 sm:ml-4'>
          <span className='text-sm'>
            {diff > 0 ? '+' : ''}
            {diff}%
          </span>{' '}
          <FontAwesomeIcon
            size={'xs'}
            icon={faArrowTrendUp}
            style={{
              transform: diff >= 0 ? undefined : 'rotate(0.5turn)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
