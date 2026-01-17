import { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api/notes';
import css from './NoteDetails.module.css';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const note = await fetchNoteById(id);
    return {
      title: `${note.title} | NoteHub`,
      description: note.content.substring(0, 150),
    };
  } catch {
    return { title: 'Note Details' };
  }
}

export default async function NoteDetailPage({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

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
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </main>
  );
}