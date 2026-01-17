import { fetchNoteById } from '@/lib/api/notes';
import Modal from '@/components/Modal/Modal';

export default async function NoteModal({ params }: { params: { id: string } }) {
  const note = await fetchNoteById(params.id);
  return (
    <Modal>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </Modal>
  );
}