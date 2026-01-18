'use client';

import { useState } from 'react';
import { NoteData } from '@/types/note';
import Link from 'next/link';
import css from '@/components/NotesPage/NotesPage.module.css';

interface NotesClientProps {
  notes: NoteData[];
  initialFilter: string;
}

export default function Notes({ notes, initialFilter }: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Реалізація пошуку (фільтруємо нотатки за заголовком або контентом)
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <h2 style={{ margin: 0 }}>{initialFilter.toUpperCase()} Notes</h2>
        
        {/* Поле пошуку стилізуємо так, щоб воно вписувалося в toolbar */}
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: '1px solid #dee2e6',
            width: '250px'
          }}
        />

        <Link href="/notes/action/create">
          <button className={css.button}>+ New Note</button>
        </Link>
      </div>

      {/* Список нотаток */}
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <li key={note.id} style={{ marginBottom: '24px' }}>
              <Link href={`/notes/${note.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 style={{ color: '#0d6efd', margin: '0 0 8px 0', textDecoration: 'underline' }}>
                  {note.title}
                </h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#444' }}>
                  {note.content.substring(0, 120)}...
                </p>
                {/* Додаємо тег, якщо він є в даних */}
                <span style={{ fontSize: '12px', color: '#999', display: 'block', marginTop: '4px' }}>
                  Tag: {note.tag}
                </span>
              </Link>
            </li>
          ))
        ) : (
          <p>No notes found matching your search.</p>
        )}
      </ul>
    </div>
  );
}