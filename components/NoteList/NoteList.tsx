import Link from 'next/link';
import { NoteData } from '@/types/note';
import css from './NoteList.module.css';

interface NoteWithId extends NoteData {
  _id?: string;
}

export default function NoteList({ notes }: { notes: NoteData[] }) {
  return (
    <ul className={css.list}>
      {notes.map((note, index) => {
        const n = note as NoteWithId;
       
        const noteId = n.id || n._id || index.toString();

        return (
          <li key={noteId} className={css.listItem}>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${noteId}`} className={css.link}>
                View
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

