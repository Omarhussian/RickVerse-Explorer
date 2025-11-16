import { memo, useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import styles from './ThemeToggle.module.scss';

const STORAGE_KEY = 'theme';

function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) as 'dark' | 'light' | null;
    return saved || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className={styles.toggle}>
      <button className={styles.btn} type="button" onClick={toggle} aria-label="Toggle theme">
        {theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
      </button>
    </div>
  );
}

export default memo(ThemeToggle);


