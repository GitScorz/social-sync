import { auth } from '@/auth';
import { fetchScheduledPosts } from '@/lib/crud';
import { LatestPosts, MainPageDebugData, TopHashtags } from '@/lib/mocks/main';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!session.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const scheduledPosts = await fetchScheduledPosts(session.userId);

    const pageData = {
      stats: MainPageDebugData,
      latestPosts: LatestPosts,
      scheduledPosts: scheduledPosts,
      hashtags: TopHashtags
    };

    return NextResponse.json(pageData, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        msg: 'Houve um erro interno no servidor. Por favor, tente novamente mais tarde.',
      },
      { status: 500 }
    );
  }
}
