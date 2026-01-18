"use client"; 

import { useEffect, useState } from 'react';
import { fetchNoteById } from '@/lib/api';
import type {  NoteData } from '@/types/note'
import { useParams, useRouter } from 'next/navigation';

export default function NoteModal() {
  const params = useParams();
  const router = useRouter();
  const [note, setNote] = useState<NoteData | null>(null);
  const id = params?.id as string;

  useEffect(() => {
    if (id) {
      fetchNoteById(id)
        .then(setNote)
        .catch(console.error);
    }
  }, [id]);

  if (!note) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', color: 'black', maxWidth: '400px' }}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <button 
          onClick={() => router.back()} 
          style={{ marginTop: '16px', padding: '8px 16px', cursor: 'pointer' }}
        >
          Close
        </button>
      </div>
    </div>
  );
}