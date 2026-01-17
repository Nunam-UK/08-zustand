import css from './Pagination.module.css';

interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export default function Pagination({ current, total, onChange }: Props) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <ul className={css.pagination}>
      {pages.map((p) => (
        <li key={p} className={p === current ? css.active : ''} onClick={() => onChange(p)}>
          <a>{p}</a>
        </li>
      ))}
    </ul>
  );
}