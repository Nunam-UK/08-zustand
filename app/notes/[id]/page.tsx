import { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api/notes';
import css from './NoteDetails.module.css';
import Link from 'next/link';
import { Note } from '@/types/note';

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
  let note: Note | null = null;

  if (id && id !== 'undefined') {
    try {
      note = await fetchNoteById(id);
    } catch (e) {
      console.error('Page fetch error:', e);
    }
  }

  if (!note) {
    return (
      <main className={css.main}>
        <div className={css.container}>
          <h2>Note not found</h2>
          <Link href="/notes/filter/all" className={css.backBtn}>← Back to list</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <Link href="/notes/filter/all" className={css.backBtn}>← Back to list</Link>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <p className={css.content}>{note.content}</p>
          <div className={css.date}>
            Created: {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'N/A'}
          </div>
        </div>
      </div>
    </main>
  );
}