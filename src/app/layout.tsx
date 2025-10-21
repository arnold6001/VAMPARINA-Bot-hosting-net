import type { Metadata } from 'next';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'VAMPARINA Bot Hosting Net',
  description: 'Free Forever WhatsApp Bot Hosting by Arnold Chirchir',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}