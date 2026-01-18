import { Metadata } from 'next';
// Змінюємо імпорт на локальний файл, який вимагає перевірка:
import Notes from './Notes.client'; 
import css from '@/components/NotesPage/NotesPage.module.css'

type Props = {
  params: Promise<{ slug: string[] }>;
};

// ... generateMetadata залишається без змін ...

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;
  const currentFilter = slug[0] || 'all';

  return (
    <main className={css.app}>
      <Notes initialFilter={currentFilter} />
    </main>
  );
}