interface SocialNetwork {
  label: string;
  href: string;
}

export const socialNetworks: Record<string, SocialNetwork> = {
  twitter: {
    label: 'X',
    href: '/dashboard/analytics/twitter',
  },
  tiktok: {
    label: 'TikTok',
    href: '/dashboard/analytics/tiktok',
  },
  facebook: {
    label: 'Facebook',
    href: '/dashboard/analytics/facebook',
  },
  instagram: {
    label: 'Instagram',
    href: '/dashboard/analytics/instagram',
  },
};
