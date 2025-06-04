'use client';

import MetricChart from '@/components/ui/dashboard/chart';
import StatsCard from '@/components/ui/dashboard/stats-card';
import { Post, ScheduledPost, TotalStatsData } from '@/types/dashboard';
import { calculateGrowthRate } from '@/utils/functions';
import {
  faChartSimple,
  faComment,
  faEllipsis,
  faExpand,
  faHeart,
  faHouse,
  faMapPin,
  faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React from 'react';
import './dashboard.css';
import PostContainer from '@/components/ui/dashboard/post';
import Calendar from '@/components/ui/dashboard/calendar';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { Menu, MenuItem } from '@/components/ui/dropdown/dropdown';
import Modal from '@/components/ui/modal/modal';
import Textarea from '@/components/ui/textarea/textarea';
import { socialNetworks } from '@/lib/constants';
import clsx from 'clsx';

const Loading = dynamic(() => import('@/components/ui/loading/loading'), {
  ssr: false,
});

const POSTS_TABS = [
  'home.posts.last-posts-tab',
  'home.posts.scheduled-posts-tab',
];

export default function Page() {
  const t = useTranslations('Dashboard');
  // const router = useRouter();

  const [stats, setStats] = React.useState<TotalStatsData>();
  const [latestPosts, setLatestPosts] = React.useState<Post[]>([]);
  const [scheduledPosts, setScheduledPosts] = React.useState<ScheduledPost[]>(
    []
  );

  const [isLoading, setLoading] = React.useState(true);
  const [currentPostsTab, setCurrentPostsTab] = React.useState(0);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const [showScheduleModal, setShowScheduleModal] = React.useState(false);
  const [schedulePostContent, setSchedulePostContent] = React.useState('');
  const [scheduleSocialNetwork, setScheduleSocialNetwork] =
    React.useState('twitter');
  const [scheduleDateTime, setScheduleDateTime] = React.useState('');
  const [scheduleError, setScheduleError] = React.useState('');
  const [sendingSchedulePost, setSendingSchedulePost] = React.useState(false);

  // if (!session) {
  //   router.push('/');
  // }

  React.useEffect(() => {
    fetch('/api/home')
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats);
        setLatestPosts(data.latestPosts);
        setScheduledPosts(data.scheduledPosts);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;
  if (!stats) return <p>Error.</p>;

  const onCloseScheduleModal = () => {
    setShowScheduleModal(false);
    setSchedulePostContent('');
    setScheduleSocialNetwork('twitter');
    setScheduleDateTime('');
    setScheduleError('');
  };

  const createScheduledPost = () => {
    if (sendingSchedulePost) return;
    setScheduleError('');

    if (schedulePostContent.length <= 2)
      return setScheduleError(t('home.posts.errors.error-content'));

    if (scheduleSocialNetwork.length === 0)
      return setScheduleError(t('home.posts.errors.error-social-network'));

    if (scheduleDateTime.length === 0)
      return setScheduleError(t('home.posts.errors.error-time'));

    setSendingSchedulePost(true);

    fetch('/api/schedule-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          content: schedulePostContent,
          socialNetwork: scheduleSocialNetwork,
          scheduledDate: scheduleDateTime,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSendingSchedulePost(false);
        onCloseScheduleModal();

        if (data.id) {
          setScheduledPosts([
            ...scheduledPosts,
            {
              id: data.id,
              content: schedulePostContent,
              createdTimestamp: new Date(),
              scheduledDate: scheduleDateTime,
              socialNetwork: scheduleSocialNetwork,
            },
          ]);
        }
      });
  };

  const deleteScheduledPost = (id: number) => {
    fetch('/api/delete-scheduled-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((success) => {
        if (success) {
          setScheduledPosts(scheduledPosts.filter((p) => p.id !== id));
        }
      });
  };

  const getMonthPost = (): Post => {
    let maxLikes = -1;
    let maxBookmarks = -1;
    let maxComments = -1;
    let maxPost: Post = latestPosts[0];

    latestPosts.forEach((post) => {
      if (
        post.likes > maxLikes ||
        post.bookmarks > maxBookmarks ||
        post.comments.length > maxComments
      ) {
        maxLikes = post.likes;
        maxBookmarks = post.bookmarks;
        maxComments = post.comments.length;
        maxPost = post;
      }
    });

    return maxPost;
  };

  const followersGrowRate = calculateGrowthRate(stats.metricsData, 'followers');
  const likesGrowRate = calculateGrowthRate(stats.metricsData, 'likes');
  const commentsGrowRate = calculateGrowthRate(stats.metricsData, 'comments');
  const viewsGrowRate = calculateGrowthRate(stats.metricsData, 'views');

  return (
    <div className='w-full h-full flex flex-col gap-4'>
      {/* Modal para agendar posts */}
      <Modal
        title={t('home.posts.schedule-post')}
        show={showScheduleModal}
        onClose={onCloseScheduleModal}
      >
        <label className='text-lg'>{t('home.posts.post-content')}:</label>
        <Textarea
          value={schedulePostContent}
          onChange={setSchedulePostContent}
          placeholder={t('home.posts.post-content') + '.'}
        />
        <label className='text-lg'>{t('home.posts.social-network')}</label>
        <select
          className='text-base p-2 border border-gray-600 bg-black bg-opacity-25 outline-none rounded-xl'
          onChange={(e) => setScheduleSocialNetwork(e.target.value)}
          value={scheduleSocialNetwork}
        >
          {Object.keys(socialNetworks).map((val) => (
            <option
              value={val}
              key={val}
              disabled={val === 'tiktok'}
              className='bg-black bg-opacity-90'
            >
              {socialNetworks[val].label}
            </option>
          ))}
        </select>
        <label className='text-lg'>{t('home.posts.schedule-time')}</label>
        <input
          type='datetime-local'
          value={scheduleDateTime}
          onChange={(e) => setScheduleDateTime(e.target.value)}
          min={new Date().toISOString().slice(0, 16)}
          className='border border-gray-600 p-2 text-base rounded-xl'
        />
        {scheduleError !== '' && (
          <div className='text-red-600 text-center mt-2'>{scheduleError}</div>
        )}
        <div
          className={clsx(
            'bg-main-color text-black font-medium w-full rounded-xl py-2 mt-2 text-lg hover:opacity-85 flex justify-center items-center',
            sendingSchedulePost ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
          onClick={createScheduledPost}
        >
          {sendingSchedulePost ? (
            <Loading size='25' stroke='3' />
          ) : (
            <>{t('home.posts.create')}</>
          )}
        </div>
      </Modal>

      <div className='w-full flex-col'>
        <div className='font-bold text-2xl'>
          <FontAwesomeIcon icon={faHouse} className='text-purple-400' />{' '}
          {t('navbar.home')}
        </div>
        <p>{t('home.description')}</p>
      </div>

      <div className='w-full flex gap-2 sm:gap-8'>
        <StatsCard
          label={t('followers')}
          amount={stats.followers}
          diff={followersGrowRate}
          CardIcon={<FontAwesomeIcon icon={faPeopleGroup} color='#c875fa' />}
        />

        <StatsCard
          label={t('views')}
          amount={stats.views}
          diff={viewsGrowRate}
          CardIcon={<FontAwesomeIcon icon={faExpand} color='#0c9ffa' />}
        />

        <StatsCard
          label={t('comments')}
          amount={stats.comments}
          diff={commentsGrowRate}
          CardIcon={<FontAwesomeIcon icon={faComment} />}
        />

        <StatsCard
          label={t('likes')}
          amount={stats.likes}
          diff={likesGrowRate}
          CardIcon={<FontAwesomeIcon icon={faHeart} color='red' />}
        />
      </div>

      <div className='w-full h-3/5 mt-4 flex justify-between'>
        <div className='w-[49%] h-full flex-col'>
          <div className='font-bold text-2xl'>
            <FontAwesomeIcon icon={faMapPin} className='text-purple-400' />{' '}
            {t('home.posts.title')}
          </div>
          <p>{t('home.posts.description')}</p>
          <div className='w-full h-full bg-black bg-opacity-25 rounded-2xl p-6 mt-2 flex flex-col gap-2'>
            <div className='w-full flex justify-between items-center mb-1'>
              <div className='w-full flex justify-normal items-start gap-2 text-base'>
                {Array.from({ length: 2 }, (_, index) => (
                  <div
                    key={index}
                    className='tab'
                    data-selected={currentPostsTab === index}
                    onClick={() => setCurrentPostsTab(index)}
                  >
                    {t(POSTS_TABS[index])}
                  </div>
                ))}
              </div>
              <Dropdown
                onOpenChange={(e, open) => setDropdownOpen(open)}
                open={dropdownOpen}
                defaultOpen={false}
              >
                <BaseMenuButton>
                  <FontAwesomeIcon icon={faEllipsis} className='text-xl' />
                </BaseMenuButton>
                <Menu className='z-50'>
                  <MenuItem onClick={() => setShowScheduleModal(true)}>
                    {t('home.posts.schedule-post')}
                  </MenuItem>
                </Menu>
              </Dropdown>
            </div>
            {currentPostsTab === 0 ? (
              <>
                {latestPosts.length > 0 ? (
                  <div className='w-full h-[95%] overflow-auto flex flex-col gap-4'>
                    {latestPosts.map((post) => (
                      <PostContainer key={post.id} {...post} />
                    ))}
                  </div>
                ) : (
                  <div>{t('home.posts.no-posts-lately')}</div>
                )}
              </>
            ) : (
              <div className='w-full h-[95%] overflow-auto'>
                <Calendar
                  posts={scheduledPosts}
                  deletePost={deleteScheduledPost}
                />
              </div>
            )}
          </div>
        </div>
        <div className='w-[49%] h-full flex-col'>
          <div className='font-bold text-2xl'>
            <FontAwesomeIcon icon={faChartSimple} className='text-purple-400' />{' '}
            {t('home.general-performance.title')}
          </div>
          <p>{t('home.general-performance.description')}</p>
          <div className='w-full h-full bg-black bg-opacity-25 rounded-2xl p-6 mt-2'>
            <div className='w-full h-full flex flex-col gap-2 overflow-auto'>
              <div className='text-xl font-bold'>
                {t('home.general-performance.top-performing-post')}
              </div>
              <div className='text-base'>
                <PostContainer {...getMonthPost()} />
              </div>
              <div className='text-xl font-bold'>{t('followers')}</div>
              <div className='w-[98%] bg-[#1C1C1C] rounded-lg p-2'>
                <MetricChart
                  metric='followers'
                  label={t('followers')}
                  data={stats.metricsData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
