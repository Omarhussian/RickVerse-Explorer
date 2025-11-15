import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface UseTimerOptions {
  initialSeconds: number;
  autoStart?: boolean;
  onFinish?: () => void;
}

export function useTimer(options: UseTimerOptions) {
  const { initialSeconds, autoStart = true, onFinish } = options;
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);
  const intervalRef = useRef<number | null>(null);

  const clear = () => {
    if (intervalRef.current != null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const tick = useCallback(() => {
    setSecondsLeft((prev) => {
      const next = prev - 1;
      if (next <= 0) {
        clear();
        setIsRunning(false);
        if (onFinish) onFinish();
        return 0;
      }
      return next;
    });
  }, [onFinish]);

  useEffect(() => {
    if (!isRunning) return;
    clear();
    intervalRef.current = window.setInterval(tick, 1000);
    return clear;
  }, [isRunning, tick]);

  const pause = useCallback(() => setIsRunning(false), []);
  const resume = useCallback(() => setIsRunning(true), []);
  const reset = useCallback((nextSeconds?: number) => {
    clear();
    setSecondsLeft(nextSeconds ?? initialSeconds);
    setIsRunning(autoStart);
  }, [autoStart, initialSeconds]);

  return useMemo(() => ({
    secondsLeft,
    isRunning,
    pause,
    resume,
    reset,
  }), [secondsLeft, isRunning, pause, resume, reset]);
}

export default useTimer;

