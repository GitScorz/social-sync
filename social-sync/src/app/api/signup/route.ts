import { createAccount, createUser } from '@/lib/crud';
import pool from '@/utils/db';
import { sha256 } from 'js-sha256';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const { firstname, lastname, email, password } = await request.json();

  const hashedPassword = sha256(password);

  try {
    const user = await createUser({
      provider: 'credentials',
      firstname,
      lastname,
      password: hashedPassword,
    });

    await createAccount({
      providerAccountId: '0',
      provider: user.provider,
      userId: user.id.toString(),
      email,
    });

    return NextResponse.json({ msg: 'Ok' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        msg: 'Houve um erro interno no servidor. Por favor, tente novamente mais tarde.',
      },
      { status: 500 }
    );
  }
};
