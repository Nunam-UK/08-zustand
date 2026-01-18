import { Metadata } from 'next';
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
    description: `Browse your ${filter} notes on NoteHub.`,
    openGraph: {
      title,
      description: `Browse your ${filter} notes on NoteHub.`,
      url: `https://your-domain.com/notes/filter/${filter}`,
      images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;
  const currentFilter = slug[0] || 'all';

  return (
    <main>
      <Notes initialFilter={currentFilter} />
    </main>
  );
}