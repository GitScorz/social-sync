import {
  faXmarkCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react';

interface ModalProps {
  title: string;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  customClass?: string;
  customIcon?: IconDefinition;
  iconColor?: string;
}

export default function Modal({
  title,
  show,
  onClose,
  customClass,
  customIcon,
  iconColor,
  children,
}: ModalProps) {
  if (!show) {
    return null;
  }

  return (
    <div
      className='fixed z-50 inset-0 bg-black bg-opacity-70 flex items-center justify-center'
      onClick={onClose}
    >
      <div
        className={clsx(
          'w-2/6 bg-focus-color p-4 shadow-lg rounded-2xl select-none',
          customClass
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className='float-right hover:opacity-80'>
          <FontAwesomeIcon icon={faXmarkCircle} />
        </button>
        <h2 className='text-2xl mb-2 font-bold'>
          {customIcon && (
            <FontAwesomeIcon icon={customIcon} color={iconColor} />
          )}{' '}
          {title}
        </h2>
        <div className='w-full h-4/5 flex flex-col gap-2'>{children}</div>
      </div>
    </div>
  );
}
