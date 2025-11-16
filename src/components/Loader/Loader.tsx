import { memo } from 'react';
import styles from './Loader.module.scss';

export default memo(function Loader() {
  return <div className={styles.spinner} aria-label="Loading" role="status" />;
});


