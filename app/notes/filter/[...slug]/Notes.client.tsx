// 'use client';

// import { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useDebounce } from 'use-debounce';
// import { useRouter, useSearchParams, usePathname } from 'next/navigation';
// import { fetchNotes } from '@/lib/api';
// import SearchBox from '@/components/SearchBox/SearchBox';
// import NoteList from '@/components/NoteList/NoteList';
// import Pagination from '@/components/Pagination/Pagination';
// import Link from 'next/link';
// import css from '@/components/NotesPage/NotesPage.module.css';

// interface NotesClientProps {
//   initialFilter: string;
// }

// export default function Notes({ initialFilter }: NotesClientProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

  
//   const [search, setSearch] = useState(searchParams.get('search') || '');
//   const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
//   const [debouncedSearch] = useDebounce(search, 500);

//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString());
//     const currentSearch = searchParams.get('search') || '';
//     const currentPage = Number(searchParams.get('page')) || 1;

//     if (debouncedSearch !== currentSearch || page !== currentPage) {
//       if (debouncedSearch) params.set('search', debouncedSearch);
//       else params.delete('search');
      
//       params.set('page', page.toString());
//       router.push(`${pathname}?${params.toString()}`, { scroll: false });
//     }
//   }, [debouncedSearch, page, pathname, router, searchParams]);


//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['notes', initialFilter, debouncedSearch, page],
//     queryFn: () => fetchNotes({
//       tag: initialFilter,
//       search: debouncedSearch,
//       page,
//       perPage: 6
//     }),
//   });

//   const handleSearchChange = (value: string) => {
//     setSearch(value);
//     setPage(1);
//   };

//   if (isError) return <div className={css.app}><p>Error loading notes.</p></div>;

//   return (
//     <div className={css.app}>
//       <div className={css.toolbar}>
//         <h2 style={{ margin: 0 }}>{initialFilter.toUpperCase()} Notes</h2>
       
//         <SearchBox value={search} onChange={handleSearchChange} />

//         <Link href="/notes/action/create">
//           <button className={css.button}>+ New Note</button>
//         </Link>
//       </div>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <NoteList notes={data?.notes || []} />
//           <Pagination
//             current={page}
//             total={data?.totalPages || 1}
//             onChange={setPage}
//           />
//         </>
//       )}
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useCallback } from 'react'; // Додано useCallback
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';
import css from '@/components/NotesPage/NotesPage.module.css';

interface NotesClientProps {
  initialFilter: string;
}

export default function Notes({ initialFilter }: NotesClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Читаємо значення прямо з URL
  const currentSearch = searchParams.get('search') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  // 2. Локальний стейт для інпуту
  const [searchInput, setSearchInput] = useState(currentSearch);
  const [debouncedSearch] = useDebounce(searchInput, 500);

  // 3. Стабільна функція оновлення URL через useCallback
  const updateUrl = useCallback((newParams: { page?: number; search?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newParams.search !== undefined) {
      if (newParams.search) params.set('search', newParams.search);
      else params.delete('search');
      params.set('page', '1'); // Скидаємо на 1 при новому пошуку
    }

    if (newParams.page !== undefined) {
      params.set('page', newParams.page.toString());
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]); // Залежності для стабільності функції

  // 4. Ефект для синхронізації пошуку (тепер із updateUrl у залежностях)
  useEffect(() => {
    if (debouncedSearch !== currentSearch) {
      updateUrl({ search: debouncedSearch });
    }
  }, [debouncedSearch, currentSearch, updateUrl]);

  // 5. Синхронізуємо інпут, якщо URL змінився (наприклад, кнопка "Назад")
  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  // 6. Запит до API
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', initialFilter, currentSearch, currentPage],
    queryFn: () => fetchNotes({ 
      tag: initialFilter, 
      search: currentSearch, 
      page: currentPage, 
      perPage: 6 
    }),
    placeholderData: (previousData) => previousData,
  });

  if (isError) return <p>Error loading notes.</p>;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <h2 style={{ margin: 0 }}>{initialFilter.toUpperCase()} Notes</h2>
        <SearchBox value={searchInput} onChange={setSearchInput} />
        <Link href="/notes/action/create">
          <button className={css.button}>+ New Note</button>
        </Link>
      </div>

      {isLoading && !data ? (
        <p>Loading...</p>
      ) : (
        <>
          <NoteList notes={data?.notes || []} />
          <Pagination 
            current={currentPage} 
            total={data?.totalPages || 1} 
            onChange={(p) => updateUrl({ page: p })} 
          />
        </>
      )}
    </div>
  );
}