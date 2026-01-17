import Sidebar from '@/components/SidebarNotes/SidebarNotes';
import css from './LayoutNotes.module.css';

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <Sidebar />
      </aside>
      <div className={css.notesWrapper}>
        {children}
      </div>
    </div>
  );
}