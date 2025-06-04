'use client';

import { Post } from '@/types/dashboard';
import { formatStatsCount, formatTimestamp } from '@/utils/functions';
import {
  faBookmark,
  faComment,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import React from 'react';
import AttachmentGrid from './attachmentGrid';

export default function PostContainer({
  author,
  bookmarks,
  comments,
  content,
  id,
  likes,
  timestamp,
  attachments,
}: Post) {
  const t = useTranslations('Dashboard');

  return (
    <div className='w-[98%] bg-[#1C1C1C] px-3 py-2 flex flex-col gap-2 rounded-lg'>
      <div className='w-full flex flex-col gap-1'>
        <div className='text-base font-semibold'>@{author}</div>
        <div className='text-sm font-light'>{content}</div>
        {attachments.length > 1 ? (
          <div className='h-80'>
            <AttachmentGrid attachments={attachments} />
          </div>
        ) : attachments.length === 1 ? (
          <div className='h-80'>
            <div className='relative h-full overflow-hidden rounded-lg'>
              <img
                src={attachments[0]}
                alt='Attachment 1'
                className='w-full h-full object-cover transition duration-300 ease-in-out transform hover:scale-105'
                style={{
                  aspectRatio: '1 / 1',
                }}
              />
            </div>
          </div>
        ) : undefined}
      </div>
      <hr className='w-full' />
      <div className='w-full flex items-center justify-between font-light px-1'>
        <div className='flex gap-1 items-center'>
          <FontAwesomeIcon icon={faHeart} />
          {formatStatsCount(likes)}
        </div>
        <div className='flex gap-1 items-center'>
          <FontAwesomeIcon icon={faComment} />
          {formatStatsCount(comments.length)}
        </div>
        <div className='flex gap-1 items-center'>
          <FontAwesomeIcon icon={faBookmark} />
          {formatStatsCount(bookmarks)}
        </div>
      </div>
      <hr className='w-full' />
      <div className='text-xs text-[#E7E7E7]'>
        {t('home.posts.published-at', {
          timestamp: formatTimestamp(timestamp),
        })}
      </div>
    </div>
  );
}
