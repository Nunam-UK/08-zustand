import { Metadata } from 'next';
import NotesClient from '@/components/NotesPage/NotesPage';
import css from '@/components/NotesPage/NotesPage.module.css'

type Props = {
  params: Promise<{ slug: string[] }>;
};

// Динамічна генерація метаданих
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug[0] || 'all';
  const capitalized = filter.charAt(0).toUpperCase() + filter.slice(1);
  
  const title = `${capitalized} Notes | NoteHub`;
  const description = `Viewing your ${filter} category notes.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;
  const currentFilter = slug[0] || 'all';

  return (
    <main className={css.app}>
      <NotesClient initialFilter={currentFilter} />
    </main>
  );
}