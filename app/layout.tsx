import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import QueryProvider from '@/providers/QueryProvider';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'NoteHub - Your Personal Second Brain',
  description: 'Manage and organize your notes efficiently with NoteHub.',
  openGraph: {
    title: 'NoteHub - Your Personal Second Brain',
    description: 'The ultimate tool for your thoughts.',
    url: 'https://notehub-example.vercel.app',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body style={{ fontFamily: 'var(--font-roboto)' }}>
        <QueryProvider> 
          <Header />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}