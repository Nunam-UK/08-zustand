'use client';
import { useNoteStore } from '@/lib/store/noteStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    }
  });

  return (
    <form className={css.form} onSubmit={(e) => { e.preventDefault(); mutation.mutate(draft); }}>
      <div className={css.formGroup}>
        <label>Title</label>
        <input 
          className={css.input} 
          name="title" 
          value={draft.title} 
          onChange={(e) => setDraft({ title: e.target.value })} 
          required 
        />
      </div>
      <div className={css.formGroup}>
        <label>Content</label>
        <textarea 
          className={css.textarea} 
          name="content" 
          rows={5} 
          value={draft.content} 
          onChange={(e) => setDraft({ content: e.target.value })} 
          required 
        />
      </div>
      <div className={css.formGroup}>
        <label>Tag</label>
        <select 
          className={css.select} 
          name="tag" 
          value={draft.tag} 
          onChange={(e) => setDraft({ tag: e.target.value })}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={() => router.back()}>Cancel</button>
        <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Create Note'}
        </button>
      </div>
    </form>
  );
}