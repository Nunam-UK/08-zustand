import { Metadata } from 'next';
import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug[0] || 'all';
  const title = `${filter.charAt(0).toUpperCase() + filter.slice(1)} Notes | NoteHub`;

  return {
    title,
    description: `Browse ${filter} notes.`,
    openGraph: {
      title,
      description: `Browse ${filter} notes.`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;
  const currentFilter = slug[0] || 'all';
  const { notes } = await fetchNotes({ tag: currentFilter });

  return (
    <main>
      <Notes notes={notes} initialFilter={currentFilter} />
    </main>
  );
}