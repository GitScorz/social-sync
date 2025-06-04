'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Form() {
  const [error, setError] = React.useState('');
  const [pending, setPending] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');

    if (pending) return;

    const formData = new FormData(e.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    if (password.length < 1) {
      setError('Por favor insere uma palavra-passe.');
      return;
    }

    setPending(true);

    const response = await signIn('credentials', {
      email: email,
      password: password,
      callbackUrl: '/dashboard',
    });

    setPending(false);

    if (response?.error) {
      setError('E-mail ou palavra-passe errados!');
      return;
    }
  };

  return (
    <form
      className='w-1/4 bg-focus-color rounded-2xl px-4 pb-4 flex items-center flex-col'
      onSubmit={handleSubmit}
    >
      <div className='w-full mx-6 mt-6 flex gap-1 text-base'>
        <Link
          href='/signup'
          className='w-full p-4 text-center border-b-gray-200 border-b-2'
        >
          Registar
        </Link>
        <button
          type='button'
          className='w-full p-4 text-center border-b-main-color border-b-2'
        >
          Entrar
        </button>
      </div>

      {error !== '' && (
        <div className='w-full rounded-lg border-2 bg-red-100 border-red-600 text-black text-sm p-4 mt-4'>
          {error}
        </div>
      )}

      <label
        className='mt-4 text-start w-full text-sm after:content-["_*"] after:text-red-600'
        htmlFor='email'
      >
        E-mail:
      </label>
      <input
        name='email'
        type='email'
        placeholder='jonh.doe@example.com'
        className='w-full border-2 border-main-color rounded-lg p-2 text-sm'
      />

      <label
        className='mt-4 text-start w-full text-sm after:content-["_*"] after:text-red-600'
        htmlFor='password'
      >
        Palavra-passe:
      </label>
      <input
        name='password'
        type='password'
        placeholder='*******'
        autoComplete='current-password'
        className='w-full border-2 border-main-color rounded-lg p-2 text-sm'
      />

      <button
        type='submit'
        className='mt-4 w-full p-3 text-center text-base rounded-xl hover:opacity-75 bg-main-color text-white'
        disabled={pending}
      >
        {pending ? 'A entrar...' : 'Entrar'}
      </button>

      <div className='my-4 w-full flex items-center gap-2 text-base'>
        <hr className='w-full' />
        <span>OU</span>
        <hr className='w-full' />
      </div>

      <button
        type='button'
        className='mt-4 flex text-center justify-center gap-2 w-full border-2 border-main-color rounded-lg p-3 text-sm hover:opacity-75'
        onClick={() => signIn('google')}
      >
        <Image
          src='/google-icon.svg'
          alt='Google Logo'
          width={20}
          height={20}
        />
        <span>Continuar com o Google</span>
      </button>

      <div className='w-full text-center mt-4 text-sm'>
        Não tens uma conta?{' '}
        <Link
          href='/signup'
          className='underline cursor-pointer hover:no-underline text-main-color'
        >
          Cria uma.
        </Link>
      </div>
    </form>
  );
}
