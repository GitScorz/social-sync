import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { deleteProvider } from '@/lib/crud';

export async function POST(request: Request) {
  const session = await auth();
  const { provider } = await request.json();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.userId;

  try {
    const success = await deleteProvider(provider, userId);

    if (!success) {
      throw new Error('Failed to delete account');
    }

    return NextResponse.json(
      { message: 'Account deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting account', error },
      { status: 500 }
    );
  }
}
