'use client';
import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

interface Props {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ children, onClose }: Props) {
  const router = useRouter();
  const handleClose = () => (onClose ? onClose() : router.back());

  return (
    <div className={css.backdrop} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}