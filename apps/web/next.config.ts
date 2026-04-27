import withPWAInit from '@ducanh2912/next-pwa';
import type { NextConfig } from 'next';

const isStorybook = process.env.STORYBOOK === 'true' || process.env.npm_lifecycle_event === 'build-storybook' || process.env.npm_lifecycle_event === 'storybook';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development' || isStorybook,
  register: false,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@fractureline/shared-types', '@fractureline/narrative-engine'],
  allowedDevOrigins: ['http://127.0.0.1:3000', 'http://localhost:3000'],
};

export default isStorybook ? nextConfig : withPWA(nextConfig);
