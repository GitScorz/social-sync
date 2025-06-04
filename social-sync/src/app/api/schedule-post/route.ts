import { auth } from '@/auth';
import { createScheduledPost } from '@/lib/crud';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const session = await auth();
  const { data } = await request.json();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!session.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const resp = await createScheduledPost(session.userId, data);
    if (!resp) throw Error('Not created.');

    return NextResponse.json({ id: resp }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        msg: 'Houve um erro interno no servidor. Por favor, tente novamente mais tarde.',
      },
      { status: 500 }
    );
  }
}
