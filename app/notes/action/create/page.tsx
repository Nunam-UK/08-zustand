"use client"; 

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import css from '@/components/NoteForm/NoteForm.module.css';

const NoteForm = dynamic(() => import('@/components/NoteForm/NoteForm'), {
  ssr: false,
  loading: () => <p>Loading form...</p>,
});

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        
        
        <Suspense fallback={<p>Loading...</p>}>
          <NoteForm />
        </Suspense>
      </div>
    </main>
  );
}