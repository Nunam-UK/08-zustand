import { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api';
import NoteDetails from './NoteDetails.client'; 
import css from './NoteDetails.module.css';
import Link from 'next/link';
import { NoteData } from '@/types/note';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const note = await fetchNoteById(id);
    return { title: `${note.title} | NoteHub` };
  } catch {
    return { title: 'Note Details' };
  }
}

export default async function NoteDetailPage({ params }: Props) {
  const { id } = await params;
  
  if (!id || id === 'undefined') return null;
  let note: NoteData | null = null;

  try {
    note = await fetchNoteById(id);
  } catch (e) {
    return (
      <main className={css.main}>
        <div className={css.container}>
          <h2>Note not found</h2>
          <Link href="/notes/filter/all" className={css.backBtn}>← Back to list</Link>
        </div>
      </main>
    );
  }
  return <NoteDetails note={note} />;
}