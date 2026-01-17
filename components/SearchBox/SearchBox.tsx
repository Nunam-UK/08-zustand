'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import css from './SearchBox.module.css';

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Локальний стейт для миттєвого відображення того, що пише користувач
  const [query, setQuery] = useState(searchParams.get('search') || '');

  // Ефект для "дебаунсу" (щоб не оновлювати URL на кожну літеру)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (query) {
        params.set('search', query);
      } else {
        params.delete('search');
      }
      
      // Скидаємо сторінку на 1 при пошуку
      params.set('page', '1');

      router.push(`${pathname}?${params.toString()}`);
    }, 500); // затримка 500 мс

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