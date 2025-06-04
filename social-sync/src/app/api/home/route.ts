import { auth } from '@/auth';
import { fetchScheduledPosts } from '@/lib/crud';
import { LatestPosts, MainPageDebugData } from '@/lib/mocks/main';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!session.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const scheduledPosts = await fetchScheduledPosts(session.userId);

  const pageData = {
    stats: MainPageDebugData,
    latestPosts: LatestPosts,
    scheduledPosts: scheduledPosts,
  };

  return NextResponse.json(pageData, { status: 200 });
}
