export interface MetricsData {
  date: string;
  followers: number;
  likes: number;
  views: number;
  comments: number;
}

export interface TotalStatsData {
  followers: number;
  views: number;
  comments: number;
  likes: number;
  metricsData: MetricsData[];
}

export type NotificationType =
  | 'comment'
  | 'like'
  | 'follow'
  | 'birthday'
  | 'system'
  | 'password_changed'
  | 'feature';

export interface Notification {
  title: string;
  avatar?: string;
  description?: string;
  type: NotificationType;
  timestamp: number;
}

export interface Post {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
  bookmarks: number;
  comments: Comment[];
  attachments: string[];
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
}

export interface ScheduledPost {
  id: number;
  content: string;
  socialNetwork: string;
  scheduledDate: string;
  createdTimestamp: Date;
}
