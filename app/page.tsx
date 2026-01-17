import Link from 'next/link';
import css from './Home.module.css';

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        
        <div className={css.description}>
          <p>
            Your personal second brain. Manage, organize, and filter your notes with ease. 
            All your ideas, meetings, and shopping lists are now in one secure place.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/notes/filter/all" className={css.title} style={{ fontSize: '24px', textDecoration: 'underline' }}>
            Open My Notes →
          </Link>
        </div>
      </div>
    </main>
  );
}