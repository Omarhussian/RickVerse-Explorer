import { memo } from 'react';
import { useTimer } from '../../hooks/useTimer';
import styles from './styles.module.scss';

export interface TimerProps {
  seconds: number;
  onRefresh: () => void;
}

function Timer({ seconds, onRefresh }: TimerProps) {
  const { secondsLeft, isRunning, pause, resume, reset } = useTimer({
    initialSeconds: seconds,
    autoStart: true,
    onFinish: onRefresh,
  });

  const handleToggle = () => (isRunning ? pause() : resume());

  return (
    <div className={styles.timer} aria-live="polite" aria-label="Auto refresh">
      <span className={styles.label}>Auto-refresh in</span>
      <span className={styles.value}>{secondsLeft}s</span>
      <div className={styles.actions}>
        <button type="button" onClick={handleToggle}>
          {isRunning ? 'Pause' : 'Resume'}
        </button>
        <button
          type="button"
          onClick={() => {
            onRefresh();
            reset(seconds);
          }}
          aria-label="Refresh now"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default memo(Timer);

