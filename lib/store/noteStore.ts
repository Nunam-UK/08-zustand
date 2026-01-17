import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NoteDraft {
  title: string;
  content: string;
  tag: string;
}

interface NoteState {
  draft: NoteDraft;
  setDraft: (newDraft: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      draft: { title: '', content: '', tag: 'Todo' },
      setDraft: (newDraft) => set((state) => ({ draft: { ...state.draft, ...newDraft } })),
      clearDraft: () => set({ draft: { title: '', content: '', tag: 'Todo' } }),
    }),
    { name: 'note-draft-storage' }
  )
);