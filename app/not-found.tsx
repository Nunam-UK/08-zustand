import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | NoteHub',
  description: 'Sorry, this page does not exist or has been moved.',
  openGraph: {
    title: '404 - Page Not Found',
    description: 'Sorry, this page does not exist.',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1>404 - Page Not Found</h1>
      <p>We couldn&apos;t find the page you&apos;re looking for.</p>
      <Link href="/notes/filter/all" style={{ color: '#0d6efd', textDecoration: 'underline' }}>
        Return to Notes
      </Link>
    </div>
  );
}