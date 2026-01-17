import Link from 'next/link';
import css from './SidebarNotes.module.css';

const TAGS = ['all', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function Sidebar() {
  return (
    <aside className={css.menuList}>
      {TAGS.map((tag) => (
        <div key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag.toLowerCase()}`} className={css.menuLink}>
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </Link>
        </div>
      ))}
    </aside>
  );
}