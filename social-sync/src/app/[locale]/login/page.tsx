import { redirect } from 'next/navigation';
import React from 'react';
import './login.css';
import Form from './form';
import { auth } from '@/auth';

export default async function LogIn() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <div className='w-full h-3/4 pt-28 flex justify-center items-center'>
      <Form />
    </div>
  );
}
