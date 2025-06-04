import { faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

interface Message {
  id: number;
  text: string;
  isMine: boolean;
}

interface ChatProps {
  conversationId: number;
}

export default function Chat({ conversationId }: ChatProps) {
  const t = useTranslations('Dashboard');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: 'Hey Cristiano, ready for the match tomorrow?',
      isMine: false,
    },
    {
      id: 1,
      text: 'Absolutely, Mbappe! Let’s give our best!',
      isMine: true,
    },
    {
      id: 2,
      text: 'For sure! See you on the field!',
      isMine: false,
    },
    {
      id: 3,
      text: 'By the way, great performance last week!',
      isMine: true,
    },
    {
      id: 4,
      text: 'Thanks, Cristiano! I’ve been working hard.',
      isMine: false,
    },
    {
      id: 5,
      text: 'It shows! You’re in top form.',
      isMine: true,
    },
    {
      id: 6,
      text: 'Appreciate it. Let’s make tomorrow unforgettable!',
      isMine: false,
    },
    {
      id: 7,
      text: 'Yes, let’s do this!',
      isMine: true,
    },
    {
      id: 8,
      text: 'Have you seen the new training drills?',
      isMine: false,
    },
    {
      id: 9,
      text: 'Not yet. Are they good?',
      isMine: true,
    },
    {
      id: 10,
      text: 'Very challenging but worth it.',
      isMine: false,
    },
    {
      id: 11,
      text: 'Looking forward to trying them.',
      isMine: true,
    },
    {
      id: 12,
      text: 'Great! See you at the game!',
      isMine: false,
    },
    { id: 13, text: 'See you!', isMine: true },
  ]);
  const [inputValue, setInputValue] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length,
        text: inputValue,
        isMine: true,
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  return (
    <>
      <div className='w-full h-full flex flex-col overflow-y-auto p-4 gap-1'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isMine ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`p-2 rounded-xl max-w-xs ${
                message.isMine
                  ? 'bg-[#B48CDE] text-white'
                  : 'bg-white bg-opacity-10'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='w-full flex items-center border-t-[1px] border-white border-opacity-10 p-2'>
        <div className='w-full flex justify-center items-center border-white border rounded-lg p-2'>
          <FontAwesomeIcon
            icon={faImage}
            className='text-gray-500 cursor-pointer mr-2'
          />
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='flex-1 border-none'
            placeholder={t('private-messages.type-message')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            className='text-purple-400 cursor-pointer'
            onClick={sendMessage}
          />
        </div>
      </div>
    </>
  );
}
