'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import css from './SearchBox.module.css';

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const currentSearch = searchParams.get('search') || '';
      
      if (query === currentSearch) return;

      const params = new URLSearchParams(searchParams.toString());
      
      if (query) {
        params.set('search', query);
      } else {
        params.delete('search');
      }
      
      params.set('page', '1');
      
      router.push(`${pathname}?${params.toString()}`);
    }, 500); 

    return () => clearTimeout(timeoutId);
  }, [query, pathname, router, searchParams]); 

  return (
    <input
      type="text"
      className={css.input}
      placeholder="Search notes..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}