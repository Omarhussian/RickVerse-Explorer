import { memo, useState } from 'react';
import styles from './RefreshFAB.module.scss';

export interface RefreshFABProps {
  onRefresh: () => void;
  isRunning: boolean;
  secondsLeft: number;
  onToggleRun: () => void; // pause/resume
  label?: string;
}

function RefreshFAB({
  onRefresh,
  isRunning,
  secondsLeft,
  onToggleRun,
  label = 'Refresh',
}: RefreshFABProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.fab}
        onClick={() => setOpen((o) => !o)}
        aria-label={label}
        title={label}
      >
        <span className={styles.icon} aria-hidden="true">↻</span>
      </button>
      {open && (
        <div className={styles.panel} role="dialog" aria-label="Auto refresh controls">
          <span className={styles.time}>{secondsLeft}s</span>
          <button className={styles.btn} type="button" onClick={onToggleRun}>
            {isRunning ? 'Pause' : 'Resume'}
          </button>
          <button className={styles.btn} type="button" onClick={onRefresh}>
            Refresh
          </button>
        </div>
      )}
    </>
  );
}

export default memo(RefreshFAB);


