import type { ChangeEvent } from 'react';
import styles from './SearchInput.module.scss';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  label?: string;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  id = 'search',
  label = 'Search by name',
  placeholder = 'e.g. Rick',
}: SearchInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        className={styles.input}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={label}
      />
    </div>
  );
}


