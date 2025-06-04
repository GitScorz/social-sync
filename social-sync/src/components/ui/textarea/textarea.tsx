import React from 'react';

interface TextareaProps {
  placeholder?: string;
  value: string;
  onChange: (e: string) => void;
}

export default function Textarea({
  placeholder,
  value,
  onChange,
}: TextareaProps) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='outline-0 bg-black bg-opacity-25 w-full h-36 resize-none text-base rounded-xl p-2 border border-gray-600'
    />
  );
}
