'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Form() {
  const router = useRouter();
  const [error, setError] = React.useState('');
  const [registering, setRegistering] = React.useState(false);

  const isValidPassword = (password: string) => {
    // Verifica se a senha tem pelo menos 8 caracteres
    if (password.length < 8) {
      return false;
    }
    // Verifica se a senha contém pelo menos 1 letra maiúscula
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    // Verifica se a senha contém pelo menos 1 número
    if (!/\d/.test(password)) {
      return false;
    }
    // Verifica se a senha contém pelo menos 1 símbolo
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');

    if (registering) return;

    const formData = new FormData(e.currentTarget);

    const firstname = formData.get('firstname') as string;
    const lastname = formData.get('lastname') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (firstname.length < 1 || lastname.length < 1) {
      setError('Os campos do primeiro e último nome são obrigatórios.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    if (!isValidPassword(password)) {
      setError(
        'A password de ter pelo menos 8 caracteres, 1 letra maiúscula, 1 número e 1 símbolo.'
      );
      return;
    }

    setRegistering(true);

    const registerResponse = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstname, lastname }),
    });

    const body = await registerResponse.json();

    if (!registerResponse.ok) {
      setRegistering(false);
      setError(body.msg);
      return;
    }

    registerResponse.ok && router.push('/login');
  };

  return (
    <form
      className='w-1/4 bg-focus-color rounded-2xl px-4 pb-4 flex items-center flex-col'
      onSubmit={handleSubmit}
    >
      <div className='w-full mx-6 mt-6 flex gap-1 text-base'>
        <button
          type='button'
          data-selected={true}
          className='w-full p-4 text-center border-b-main-color border-b-2'
        >
          Registar
        </button>
        <Link
          href='/login'
          className='w-full p-4 text-center border-b-gray-200 border-b-2'
        >
          Entrar
        </Link>
      </div>

      {error !== '' && (
        <div className='w-full rounded-lg border-2 bg-red-100 border-red-600 text-black text-sm p-4 mt-4'>
          {error}
        </div>
      )}

      <label
        className='mt-4 text-start w-full text-sm after:content-["_*"] after:text-red-600'
        htmlFor='firstname'
      >
        Primeiro Nome:
      </label>
      <input
        name='firstname'
        placeholder='John'
        type='text'
        className='w-full border-2 border-main-color rounded-lg p-2 text-sm'
      />

      <label
        className='mt-4 text-start w-full text-sm after:content-["_*"] after:text-red-600'
        htmlFor='lastname'
      >
        Último Nome:
      </label>
      <input
        name='lastname'
        placeholder='Doe'
        type='text'
        className='w-full border-2 border-main-color rounded-lg p-2 text-sm'
      />

      <label
        className='mt-4 text-start w-full text-sm after:content-["_*"] after:text-red-600'
        htmlFor='email'
      >
        E-mail:
      </label>
      <input
        name='email'
        type='email'
        placeholder='john.doe@example.com'
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

      <div className='text-xs text-start w-full mt-1'>
        Pelo menos 8 caracteres, 1 letra maiúscula, 1 número e 1 símbolo.
      </div>

      <button
        type='submit'
        className='mt-4 w-full p-3 text-center text-base rounded-xl hover:opacity-75 bg-main-color text-white'
      >
        Registar
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
        Já tens uma conta?{' '}
        <Link
          href='/login'
          className='underline cursor-pointer hover:no-underline text-main-color'
        >
          Entra
        </Link>
      </div>
    </form>
  );
}
