import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Create New Note | NoteHub',
  description: 'Easily create and save your new notes with NoteHub.',
  openGraph: {
    title: 'Create New Note | NoteHub',
    description: 'Easily create and save your new notes with NoteHub.',
    images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }],
  },
};

const NoteForm = dynamic(() => import('@/components/NoteForm/NoteForm'));

export default function CreateNotePage() {
  return (
    <main>
      <h1>Create New Note</h1>
      <Suspense fallback={<p>Loading form...</p>}>
        <NoteForm />
      </Suspense>
    </main>
  );
}