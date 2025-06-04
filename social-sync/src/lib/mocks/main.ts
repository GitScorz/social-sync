import {
  MetricsData,
  Post,
  ScheduledPost,
  TotalStatsData,
} from '@/types/dashboard';
import { generateRandomAttachments, getRandomDate } from '@/utils/functions';

const totalMetricsData: MetricsData[] = [
  {
    date: '2024-05-01',
    followers: 325742,
    likes: 789012,
    views: 345678,
    comments: 9012,
  },
  {
    date: '2024-05-02',
    followers: 334567,
    likes: 890123,
    views: 456789,
    comments: 10123,
  },
  {
    date: '2024-05-03',
    followers: 345678,
    likes: 901234,
    views: 567890,
    comments: 11234,
  },
  {
    date: '2024-05-04',
    followers: 456789,
    likes: 123456,
    views: 678901,
    comments: 12345,
  },
  {
    date: '2024-05-05',
    followers: 567890,
    likes: 234567,
    views: 789012,
    comments: 13456,
  },
  {
    date: '2024-05-06',
    followers: 678901,
    likes: 345678,
    views: 890123,
    comments: 14567,
  },
  {
    date: '2024-05-07',
    followers: 789012,
    likes: 456789,
    views: 901234,
    comments: 15678,
  },
  {
    date: '2024-05-08',
    followers: 890123,
    likes: 567890,
    views: 1023456,
    comments: 16789,
  },
  {
    date: '2024-05-09',
    followers: 901234,
    likes: 678901,
    views: 1134567,
    comments: 17890,
  },
  {
    date: '2024-05-10',
    followers: 832412,
    likes: 789012,
    views: 1245678,
    comments: 18901,
  },
  {
    date: '2024-05-11',
    followers: 1034567,
    likes: 890123,
    views: 1356789,
    comments: 19012,
  },
  {
    date: '2024-05-12',
    followers: 945678,
    likes: 901234,
    views: 1667890,
    comments: 20123,
  },
  {
    date: '2024-05-13',
    followers: 1056789,
    likes: 123456,
    views: 1978901,
    comments: 21234,
  },
  {
    date: '2024-05-14',
    followers: 1167890,
    likes: 234567,
    views: 2289012,
    comments: 22345,
  },
  {
    date: '2024-05-15',
    followers: 1178901,
    likes: 345678,
    views: 3290123,
    comments: 23456,
  },
  {
    date: '2024-05-16',
    followers: 1289012,
    likes: 456789,
    views: 3301234,
    comments: 24567,
  },
  {
    date: '2024-05-17',
    followers: 1190123,
    likes: 567890,
    views: 3323456,
    comments: 25678,
  },
  {
    date: '2024-05-18',
    followers: 1101234,
    likes: 678901,
    views: 3534567,
    comments: 26789,
  },
  {
    date: '2024-05-19',
    followers: 1125742,
    likes: 789012,
    views: 3645678,
    comments: 27890,
  },
  {
    date: '2024-05-20',
    followers: 1134567,
    likes: 890123,
    views: 3756789,
    comments: 28901,
  },
  {
    date: '2024-05-21',
    followers: 1145678,
    likes: 901234,
    views: 3967890,
    comments: 29012,
  },
  {
    date: '2024-05-22',
    followers: 1156789,
    likes: 123456,
    views: 4278901,
    comments: 30123,
  },
  {
    date: '2024-05-23',
    followers: 1267890,
    likes: 234567,
    views: 4389012,
    comments: 31234,
  },
  {
    date: '2024-05-24',
    followers: 1178901,
    likes: 345678,
    views: 4490123,
    comments: 32345,
  },
  {
    date: '2024-05-25',
    followers: 1089012,
    likes: 456789,
    views: 4701234,
    comments: 33456,
  },
  {
    date: '2024-05-26',
    followers: 1090123,
    likes: 567890,
    views: 4923456,
    comments: 34567,
  },
  {
    date: '2024-05-27',
    followers: 1101234,
    likes: 678901,
    views: 5534567,
    comments: 35678,
  },
  {
    date: '2024-05-28',
    followers: 1225742,
    likes: 789012,
    views: 5745678,
    comments: 36789,
  },
  {
    date: '2024-05-29',
    followers: 1134567,
    likes: 890123,
    views: 5856789,
    comments: 37890,
  },
  {
    date: '2024-05-30',
    followers: 1045678,
    likes: 901234,
    views: 5967890,
    comments: 38901,
  },
  {
    date: '2024-05-31',
    followers: 1156789,
    likes: 123456,
    views: 6278901,
    comments: 39012,
  },
];

export const MainPageDebugData: TotalStatsData = {
  followers: 1455923,
  comments: 101923,
  likes: 551104,
  views: 25005923,
  metricsData: totalMetricsData,
};

// Mock data para os últimos posts
export const LatestPosts: Post[] = [
  {
    id: 3,
    author: `Cristiano`,
    content: `Orgulhoso por voltar a representar Portugal no Euro. Vamos com tudo! #PartilhaAPaixão`,
    timestamp: getRandomDate(),
    likes: 1142100,
    bookmarks: 840,
    comments: Array.from({ length: 1234 }, (_, index) => ({
      id: index,
      author: '',
      content: '',
      timestamp: new Date(),
    })),
    attachments: [],
  },

  {
    id: 1,
    author: `Cristiano`,
    content: `Grande vitória, equipa! Rumo ao Europeu!`,
    timestamp: getRandomDate(),
    likes: 2480505,
    bookmarks: 1242,
    comments: Array.from({ length: 4102 }, (_, index) => ({
      id: index,
      author: '',
      content: '',
      timestamp: new Date(),
    })),
    attachments: [
      'https://pbs.twimg.com/media/GP0k3q8XQAAKj5H?format=jpg&name=4096x4096',
      'https://pbs.twimg.com/media/GP0k3q1XgAAL1Mi?format=jpg&name=4096x4096',
      'https://pbs.twimg.com/media/GP0lAwoWYAAFtZr?format=jpg&name=4096x4096',
    ],
  },
  {
    id: 2,
    author: `Cristiano`,
    content: `Parece mesmo que ainda estamos em Portugal! Obrigado pelo apoio ❤️`,
    timestamp: getRandomDate(),
    likes: 1280505,
    bookmarks: 152,
    comments: Array.from({ length: 342 }, (_, index) => ({
      id: index,
      author: '',
      content: '',
      timestamp: new Date(),
    })),
    attachments: [
      'https://pbs.twimg.com/media/GQD1SDoWwAAghoG?format=jpg&name=4096x4096',
      'https://pbs.twimg.com/media/GQD1UvbXIAAtY5k?format=jpg&name=4096x4096',
      'https://pbs.twimg.com/media/GQD1UvYXUAEuVNL?format=jpg&name=4096x4096',
      'https://pbs.twimg.com/media/GQD1XGhWQAAYqwX?format=jpg&name=4096x4096',
    ],
  },
];

export const ScheduledPosts: ScheduledPost[] = [];

export const TopHashtags = [
  {
    hashtag: '#euro2024',
    posts: 2066002,
  },
  {
    hashtag: '#portugal',
    posts: 1266002,
  },
  {
    hashtag: '#CristianoRonaldo',
    posts: 1266002,
  },
  {
    hashtag: '#bbtvi',
    posts: 1266002,
  },
  {
    hashtag: '#portugal',
    posts: 1266002,
  },
];
