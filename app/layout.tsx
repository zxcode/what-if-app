import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// THIS IS WHERE YOU CHANGE THE TITLE AND DESCRIPTION
export const metadata: Metadata = {
  title: '/what_if?',
  description: 'Join the chaos. Buy the token.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}