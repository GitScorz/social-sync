'use client';

import React, { useState } from 'react';
import MetricChart from '../../dashboard/chart';
import { useTranslations } from 'next-intl';
import { MetricsData, TotalStatsData } from '@/types/dashboard';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Loading = dynamic(() => import('@/components/ui/loading/loading'), {
  ssr: false,
});

interface FollowersChartProps {
  stats?: TotalStatsData;
}

const POSTS_TABS = ['followers', 'views', 'comments', 'likes'];

const FollowersChart: React.FC<FollowersChartProps> = ({ stats }) => {
  if (!stats) return;

  const [currentTab, setCurrentTab] = useState(0);
  const [sendingEmail, setSendingEmail] = React.useState(false);
  const t = useTranslations('Dashboard');

  const emailData = {
    subject: t('navbar.analytics'),
    text: t('analytics.email.text'),
    html: `
      <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

            body {
              font-family: Inter, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: white;
              margin: 0;
            }

            table {
              width: 100%;
              border-spacing: 20px;
              margin: 0 auto;
            }

            td {
              /* border: 1px solid #ddd; */
              padding: 10px;
              text-align: center;
              background-color: #F4F5F5;
              border-radius: 12px;
              padding: 20px;
            }

            .main-table {
              width: 1000px;
              margin: 0 auto;
            }

            .highlight {
              font-size: 2em;
              font-weight: 900;
            }

            .title {
              font-size: 2em;
              margin: 0;
              background: linear-gradient(256.09deg, #4D7DA1 -40.81%, #5854C2 -3.71%, #5886B8 33.39%, #FF9595 66.44%, #D59CD1 107.58%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }

            .subtitle {
              font-size: .7em;
              color: #888;
              font-weight: bold;
            }

            .icon {
              width: 50px;
            }

            .wide {
              width: 75%;
            }

            .narrow {
              width: 25%;
            }

            .half {
              width: 50%;
            }

            .top-fade {
              background: radial-gradient(177.39% 137.2% at 15.25% -37.2%, rgba(7, 162, 228, 0.224) 0%, rgba(7, 162, 228, 0) 61.28%), #F4F5F5;
            }
          </style>
        </head>

        <body>
          <table class="main-table">
            <tr>
              <td colspan="2" class="highlight half top-fade">
                <span class="title">1.5M</span>
                <br>
                <span class="subtitle">Followers</span>
              </td>
              <td colspan="2" class="highlight half">
                <span class="title">671,905</span>
                <br>
                <span class="subtitle">Views (Last Month)</span>
              </td>
            </tr>
            <tr>
              <td rowspan="2" class="highlight narrow">
                <span class="title">215</span>
                <br>
                <span class="subtitle">Days Active Streak</span>
              </td>
              <td class="highlight narrow">
                <span class="title">328</span>
                <br>
                <span class="subtitle">Posts (Last Month)</span>
              </td>
              <td colspan="2" class="highlight wide">
                <span class="title">Euro 2024</span>
                <br>
                <span class="subtitle">Most Popular Posts</span>
              </td>
            </tr>
            <tr>
              <td class="highlight half">
                <span class="title">13.5k</span>
                <br>
                <span class="subtitle">Likes (Last Month)</span>
              </td>

              <td class="highlight half">
                <span class="title">44%</span>
                <br>
                <span class="subtitle">Engagement Rate</span>
              </td>
            </tr>
            <tr>
              <td colspan="4" class="highlight">
                <span class="title">5215</span>
                <br>
                <span class="subtitle">Active Users</span>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };

  const sendEmail = (subject: string, text: string, html: string) => {
    if (sendingEmail) return;

    setSendingEmail(true);

    fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        text,
        html,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSendingEmail(false);
      });
  };

  return (
    <div className='bg-black bg-opacity-25 p-4 rounded-lg'>
      <div className='w-full flex justify-normal items-start gap-2 text-base'>
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className='tab'
            data-selected={currentTab === index}
            onClick={() => setCurrentTab(index)}
          >
            {t(POSTS_TABS[index])}
          </div>
        ))}
      </div>
      <MetricChart
        metric={POSTS_TABS[currentTab] as keyof MetricsData}
        label={t(POSTS_TABS[currentTab])}
        data={stats.metricsData}
      />
      <button
        className='w-full bg-white text-black p-2 rounded-lg hover:opacity-80'
        onClick={() => {
          sendEmail(emailData.subject, emailData.text, emailData.html);
        }}
      >
        {sendingEmail ? (
          <Loading size='20' stroke='3' color='black' />
        ) : (
          <>
            <FontAwesomeIcon icon={faEnvelope} />{' '}
            {t('analytics.send-analise-email')}
          </>
        )}
      </button>
    </div>
  );
};

export default FollowersChart;
