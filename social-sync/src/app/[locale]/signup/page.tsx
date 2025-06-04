import { redirect } from 'next/navigation';
import React from 'react';
import './signup.css';
import Form from './form';
import { auth } from '@/auth';

export default async function SignUp() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className='pt-28 w-full h-5/6 flex justify-center items-center'>
      <Form />
    </div>
  );
}
