'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';
import css from '@/components/NotesPage/NotesPage.module.css';

export default function Notes({ initialFilter }: { initialFilter: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Читаємо значення ТІЛЬКИ з URL
  const searchQuery = searchParams.get('search') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', initialFilter, searchQuery, currentPage],
    queryFn: () => fetchNotes({ 
      tag: initialFilter, 
      search: searchQuery, 
      page: currentPage, 
      perPage: 6 
    }),
    // Це зупинить нескінченні запити, якщо дані не змінилися
    staleTime: 5000, 
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    // Оновлюємо URL, useQuery сам побачить зміну через queryKey
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isError) return <div className={css.app}><p>Error loading notes.</p></div>;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <h2>{initialFilter.toUpperCase()} Notes</h2>
        <SearchBox />
        <Link href="/notes/action/create">
          <button className={css.button}>+ New Note</button>
        </Link>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <NoteList notes={data?.notes || []} />
          <Pagination 
            current={currentPage} 
            total={data?.totalPages || 1} 
            onChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
}