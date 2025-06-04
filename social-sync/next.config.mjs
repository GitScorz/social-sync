import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'lh3.googleusercontent.com',
        port: "",
        pathname: "/a/**"
      }
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
      ],
      allowedForwardedHosts: [
        'localhost:3000',
      ],
    },
  },
};

export default withNextIntl(nextConfig);
