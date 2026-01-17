'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { fetchNotes } from '@/lib/api/notes';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import css from './NotesPage.module.css';

export default function NotesPage({ initialFilter }: { initialFilter: string }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', initialFilter, search, page],
    queryFn: () => fetchNotes({ tag: initialFilter, search, page, perPage: 6 }),
  });

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={(v) => { setSearch(v); setPage(1); }} />
        <Link href="/notes/action/create" className={css.button}>Create note +</Link>
      </div>
      {isLoading ? <p>Loading...</p> : data && (
        <>
          <NoteList notes={data.notes} />
          <Pagination current={page} total={data.totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}