import withPWAInit from '@ducanh2912/next-pwa';
import type { NextConfig } from 'next';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: false,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@fractureline/shared-types', '@fractureline/narrative-engine'],
};

export default withPWA(nextConfig);
