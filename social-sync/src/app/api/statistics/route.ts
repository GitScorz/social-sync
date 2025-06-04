import { auth } from '@/auth';
import { findAccount, findAccountByUserId } from '@/lib/crud';
import { NextResponse } from 'next/server';
import Twitter from 'twitter-lite';

export async function GET(request: Request) {
  const session = await auth();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('network');

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!session.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  switch (id) {
    case 'twitter':
      break;
    case 'instagram':
      break;
    case 'tiktok':
      break;
    case 'facebook':
      break;
  }
  return NextResponse.json({}, { status: 200 });
}
