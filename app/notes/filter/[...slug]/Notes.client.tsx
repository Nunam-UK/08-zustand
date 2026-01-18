'use client';

import NotesPage from '@/components/NotesPage/NotesPage';

interface NotesClientProps {
  initialFilter: string;
}

export default function Notes({ initialFilter }: NotesClientProps) {
  return <NotesPage initialFilter={initialFilter} />;
}