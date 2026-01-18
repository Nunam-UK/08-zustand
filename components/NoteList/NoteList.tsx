import Link from 'next/link';
import { NoteData } from '@/types/note';
import css from './NoteList.module.css';

export default function NoteList({ notes }: { notes: NoteData[] }) {
  if (notes.length === 0) return <p className={css.empty}>No notes found.</p>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content.substring(0, 150)}...</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View Details
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}