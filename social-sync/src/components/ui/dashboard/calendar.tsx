import { Locale } from '@/navigation';
import { ScheduledPost } from '@/types/dashboard';
import { shrinkString } from '@/utils/functions';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { socialMediaList } from './sidebar';
import CalendarDayOption from './calendarDayOption';

interface CalendarProps {
  posts: ScheduledPost[];
  deletePost: (id: number) => void;
}

export default function Calendar({ posts, deletePost }: CalendarProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('Dashboard');

  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  // Agrupa posts por dia
  const postsByDay = posts.reduce((acc, post) => {
    const day = new Date(post.scheduledDate).getDate();
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(post);
    return acc;
  }, {} as Record<number, ScheduledPost[]>);

  return (
    <div className='w-[98%] grid grid-cols-5 gap-2'>
      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
        <div key={day} className='rounded-lg p-2 bg-[#1C1C1C]'>
          <div className='text-center text-lg font-bold mb-2 select-none'>
            {day}
          </div>
          <div className='overflow-y-auto overflow-x-hidden h-32'>
            {postsByDay[day] ? (
              postsByDay[day].map((post) => (
                <div
                  key={post.id}
                  className='mb-2 p-2 bg-main-color rounded shadow'
                >
                  <CalendarDayOption id={post.id} deletePost={deletePost} />
                  <p className='text-black text-xs'>
                    {shrinkString(post.content, 32)}
                  </p>
                  <p className='text-black opacity-75 text-xs select-none flex justify-between items-center mt-2'>
                    {new Date(post.scheduledDate).toLocaleTimeString(locale, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}

                    {socialMediaList[post.socialNetwork].icon}
                  </p>
                </div>
              ))
            ) : (
              <p className='text-gray-500 text-xs text-center select-none'>
                {t('home.posts.no-scheduled-posts')}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
