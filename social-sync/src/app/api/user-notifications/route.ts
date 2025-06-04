import { auth } from '@/auth';
import { NotificationsDebugData } from '@/lib/mocks/notifications';
import { NextResponse } from 'next/server';
import Twitter from 'twitter-lite';

export async function GET(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!session.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(NotificationsDebugData, { status: 200 });
}
