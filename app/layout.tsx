import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

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

export default function RootLayout({ 
  children, 
  modal 
}: { 
  children: React.ReactNode;
  modal: React.ReactNode; 
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body style={{ fontFamily: 'var(--font-roboto)' }}>
        <TanStackProvider> 
          <Header />
          <main>
            {children}
          </main>
          {modal} 
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}