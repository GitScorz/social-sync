import { ProviderConfig } from '@/types/auth';
import Image from 'next/image';
import { socialNetworks } from './constants';

const getProviderComponent = (provider: string) => {
  const componentClass = 'select-none';
  const width = 70;
  const height = 70;

  switch (provider) {
    case 'twitter':
      return (
        <Image
          className={componentClass}
          src='/x-icon.svg'
          alt='X Logo'
          width={width}
          height={height}
        />
      );
    case 'tiktok':
      return (
        <Image
          className={componentClass}
          src='/tiktok-icon.svg'
          alt='TikTok Logo'
          width={width}
          height={height}
        />
      );
    case 'facebook':
      return (
        <Image
          className={componentClass}
          src='/facebook-icon.svg'
          alt='Facebook Logo'
          width={width}
          height={height}
        />
      );
    case 'instagram':
      return (
        <Image
          className={componentClass}
          src='/instagram-icon.svg'
          alt='Instagram Logo'
          width={width}
          height={height}
        />
      );
    default:
      return null;
  }
};

export const providersConfig: ProviderConfig[] = [];

Object.keys(socialNetworks).map((val) => {
  providersConfig.push({
    id: val,
    name: socialNetworks[val].label,
    component: getProviderComponent(val),
  });
});
