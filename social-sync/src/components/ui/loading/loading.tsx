'use client';

import React from 'react';
import { ring2 } from 'ldrs';

ring2.register();

interface LoadingProps {
  size?: string;
  stroke?: string;
  color?: string;
}

export default function Loading({
  size = '35',
  stroke = '5',
  color = 'white',
}: LoadingProps) {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <l-ring-2
        size={size}
        stroke={stroke}
        stroke-length='0.25'
        bg-opacity='0.1'
        speed='0.8'
        color={color}
      ></l-ring-2>
    </div>
  );
}
