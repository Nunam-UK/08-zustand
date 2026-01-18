'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import css from './NotesPage.module.css';

export default function NotesPage({ initialFilter }: { initialFilter: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading } = useQuery({
    queryKey: ['notes', initialFilter, search, page],
    queryFn: () => fetchNotes({ tag: initialFilter, search, page, perPage: 6 }),
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox />
        <Link href="/notes/action/create" className={css.button}>Create note +</Link>
      </div>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : data && (
        <>
          <NoteList notes={data.notes} />
          <Pagination 
            current={page} 
            total={data.totalPages} 
            onChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
}