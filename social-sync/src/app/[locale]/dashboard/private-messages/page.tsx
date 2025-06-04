'use client';

import { socialMediaList } from '@/components/ui/dashboard/sidebar';
import Chat from '@/components/ui/private-messages/chat';
import { formatShortTimestamp } from '@/utils/functions';
import { faEnvelope, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function PrivateMessages() {
  const t = useTranslations('Dashboard');
  const [currentConversation, setCurrentConversation] = useState<number>();
  const [conversations, setConversations] = useState([
    {
      id: 1,
      username: '@mbappe',
      lastMessage: 'See you!',
      avatar:
        'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSrKiZT1dFLDsQWhizXfkJ7j4gs5Pa_wNIChXceG3GGn3nflagpMXZbWGzT-rJ594niNJNtA7kxTGfZVY4',
      lastMessageTimestamp: Date.now() - 1241123,
      socialNetwork: 'instagram',
    },
    {
      id: 2,
      username: '@robertomartinez',
      lastMessage: 'Vas a jugar todo el tiempo punto final!',
      avatar:
        'https://images.impresa.pt/sicnot/2024-06-07-roberto-martinez-3daeccfb-1',
      lastMessageTimestamp: Date.now() - 213523123,
      socialNetwork: 'instagram',
    },
    {
      id: 3,
      username: '@jorgemendes',
      lastMessage: 'Boa sorte para o jogo craque',
      avatar:
        'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcS500s8TEJ04UM3fLUPEtYp4KJpN0hwCF5_EeZnFtKQ974lf2Q5_ZSzVUsfKCpkKXDH',
      lastMessageTimestamp: Date.now() - 413231223,
      socialNetwork: 'facebook',
    },
    {
      id: 4,
      username: '@doloresaveiro',
      lastMessage: 'Bom jogo filho',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Oxip9G_RznnzZxzK_fSJxy8TR0lK0lnI8ypjxZpLQu4HUajN',
      lastMessageTimestamp: Date.now() - 21323122,
      socialNetwork: 'twitter',
    },
    {
      id: 5,
      username: '@sportingcp',
      lastMessage: 'Já disse que não quero voltar parem de me chatear!',
      avatar:
        'https://logowik.com/content/uploads/images/sporting-lisbon5989.jpg',
      lastMessageTimestamp: Date.now() - 881323122,
      socialNetwork: 'instagram',
    },
    {
      id: 6,
      username: '@sergioconceicao',
      lastMessage:
        'É bom que passes mais a bola ao meu filho, senão vamos ter problemas estás a perceber?',
      avatar:
        'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS71wKGoOFdV-KdJwK63NmE16BR-1aio98rrmmPI5bsq8JIv1_1',
      lastMessageTimestamp: Date.now() - 581323122,
      socialNetwork: 'instagram',
    },
  ]);

  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <div className='w-full h-full flex'>
        <div className='w-3/12 h-full border-r-[1px] border-white border-opacity-10 flex-shrink-0'>
          <div className='font-bold text-2xl flex justify-center items-center gap-2 mt-4'>
            <FontAwesomeIcon icon={faEnvelope} className='text-purple-400' />{' '}
            {t('navbar.private-messages')}
          </div>

          <div className='w-full max-h-full flex flex-col mt-3'>
            {conversations
              .sort((a, b) => {
                return b.lastMessageTimestamp - a.lastMessageTimestamp;
              })
              .map((conversation, key) => (
                <div
                  className={clsx(
                    'w-full flex gap-2 items-center border-b-[1px] border-white border-opacity-10 p-4 select-none cursor-pointer hover:bg-white hover:bg-opacity-10 first:border-t-[1px]',
                    currentConversation === conversation.id &&
                      'bg-white bg-opacity-10'
                  )}
                  key={key}
                  onClick={() => setCurrentConversation(conversation.id)}
                >
                  <img
                    className='object-cover rounded-full pointer-events-none aspect-square size-10 flex-shrink-0'
                    src={conversation.avatar}
                    alt='Avatar'
                  />
                  <div className='w-full flex flex-col'>
                    <div>
                      {conversation.username} ·{' '}
                      <span className='text-white text-opacity-40'>
                        {formatShortTimestamp(
                          conversation.lastMessageTimestamp
                        )}
                      </span>
                    </div>
                    <div className='text-white text-opacity-40 text-sm'>
                      {conversation.lastMessage}
                    </div>
                  </div>
                  <div className='text-purple-400'>
                    {socialMediaList[conversation.socialNetwork].icon}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className='w-full h-full flex flex-col justify-center items-center'>
          {currentConversation ? (
            <Chat conversationId={currentConversation} />
          ) : (
            <>
              <FontAwesomeIcon icon={faMessage} className='text-5xl' />
              <div>{t('private-messages.chat-here')}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
