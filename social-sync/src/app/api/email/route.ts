import { auth } from '@/auth';
import { transporter, mailOptions } from '@/config/nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const session = await auth();
  const { subject, text, html } = await request.json();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!session.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      to: session.user?.email!,
      subject,
      text,
      html,
    });

    return NextResponse.json({ msg: 'Ok' }, { status: 200 });
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
