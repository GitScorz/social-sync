import Loading from '@/components/ui/loading/loading';
import { socialNetworks } from '@/lib/constants';
import { getCardColors } from '@/utils/functions';
import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';
import StatisticsOverview from './overview';
import { auth } from '@/auth';

interface StatisticsProps {
  params: {
    socialNetwork: string;
  };
}

export async function generateMetadata(
  { params }: StatisticsProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const socialNetwork = params.socialNetwork;

  return {
    title: `${socialNetworks[socialNetwork].label} | Social Sync`,
  };
}

export default async function Statistics({ params }: StatisticsProps) {
  const session = await auth();
  const socialNetwork = params.socialNetwork;

  if (!socialNetworks[socialNetwork]) {
    redirect('/dashboard');
  }

  // mudar a cor dos cards consoante a APP tipo facebook azul, X preto, Instagram rosa etc
  const cardColors = getCardColors(socialNetwork);

  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <StatisticsOverview id={socialNetwork} session={session} />
    </div>
  );
}
