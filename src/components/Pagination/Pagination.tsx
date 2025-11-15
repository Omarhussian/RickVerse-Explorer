import { memo } from 'react';
import styles from './Pagination.module.scss';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const go = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    onChange(p);
  };

  // Render a compact window of pages around the current
  const window: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i += 1) window.push(i);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button className={styles.nav} disabled={!canPrev} onClick={() => go(page - 1)}>
        Prev
      </button>
      {start > 1 && (
        <>
          <button className={styles.page} onClick={() => go(1)}>1</button>
          {start > 2 && <span className={styles.ellipsis}>…</span>}
        </>
      )}
      {window.map((p) => (
        <button
          key={p}
          className={p === page ? styles.pageActive : styles.page}
          onClick={() => go(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className={styles.ellipsis}>…</span>}
          <button className={styles.page} onClick={() => go(totalPages)}>{totalPages}</button>
        </>
      )}
      <button className={styles.nav} disabled={!canNext} onClick={() => go(page + 1)}>
        Next
      </button>
    </nav>
  );
}

export default memo(Pagination);


