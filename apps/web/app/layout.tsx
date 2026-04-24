import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fractureline',
  description: 'A dual-perspective narrative web game where choices rewrite time.',
  manifest: '/manifest.webmanifest',
  applicationName: 'Fractureline',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Fractureline',
  },
  icons: {
    icon: '/icons/icon.svg',
    apple: '/icons/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#08070b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-serif antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
