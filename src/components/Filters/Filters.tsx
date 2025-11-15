import type { ChangeEvent } from 'react';
import { memo } from 'react';
import styles from './styles.module.scss';

export interface FiltersState {
  status: '' | 'alive' | 'dead' | 'unknown';
  species: string;
  sort: 'asc' | 'desc';
}

export interface FiltersProps {
  value: FiltersState;
  onChange: (next: FiltersState) => void;
}

function Filters({ value, onChange }: FiltersProps) {
  const handleStatus = (e: ChangeEvent<HTMLSelectElement>) =>
    onChange({ ...value, status: e.target.value as FiltersState['status'] });
  const handleSpecies = (e: ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, species: e.target.value });
  const handleSort = (e: ChangeEvent<HTMLSelectElement>) =>
    onChange({ ...value, sort: e.target.value as FiltersState['sort'] });

  return (
    <form className={styles.form} aria-label="Filters">
      <div className={styles.group}>
        <label htmlFor="status">Status</label>
        <select id="status" value={value.status} onChange={handleStatus}>
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className={styles.group}>
        <label htmlFor="species">Species</label>
        <input
          id="species"
          type="text"
          value={value.species}
          onChange={handleSpecies}
          placeholder="e.g. Human"
        />
      </div>

      <div className={styles.group}>
        <label htmlFor="sort">Sort</label>
        <select id="sort" value={value.sort} onChange={handleSort} aria-label="Sort by name">
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>
    </form>
  );
}

export default memo(Filters);

