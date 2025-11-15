import { Suspense, useMemo, useState } from 'react';
import SearchInput from '../../components/SearchInput/SearchInput';
import Filters, { type FiltersState } from '../../components/Filters/Filters';
import CharacterList from '../../components/CharacterList/CharacterList';
import RefreshFAB from '../../components/RefreshFAB/RefreshFAB';
import Pagination from '../../components/Pagination/Pagination';
import useDebounce from '../../hooks/useDebounce';
import { useTimer } from '../../hooks/useTimer';
import { useCharacters } from '../../hooks/useCharacters';
import styles from './styles.module.scss';

export default function Home() {
  const [search, setSearch] = useState<string>('');
  const debounced = useDebounce(search, 350);

  const [filters, setFilters] = useState<FiltersState>({
    status: '',
    species: '',
    sort: 'asc',
  });

  const {
    characters, totalCount, totalPages,
    isLoading, error,
    refetch, resetList,
    page, setPage,
  } = useCharacters({
    name: debounced,
    status: filters.status,
    species: filters.species,
    sort: filters.sort,
    accumulate: false,
  });

  useMemo(() => {
    resetList();
  }, [search, filters.status, filters.species, filters.sort]);

  const { secondsLeft, isRunning, pause, resume, reset } = useTimer({
    initialSeconds: 30,
    autoStart: true,
    onFinish: () => {
      refetch();
      reset(30);
    },
  });
  const onToggleRun = () => (isRunning ? pause() : resume());
  const doRefresh = () => { refetch(); reset(30); };

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <h2 className={styles.title}>Character Explorer</h2>
        <span className={styles.meta}>{totalCount ? `Total: ${totalCount}` : ''}</span>
      </div>

      <div className={styles.controls}>
        <SearchInput value={search} onChange={setSearch} />
        <Filters value={filters} onChange={setFilters} />
      </div>

      {error && <p role="alert">Error: {error}</p>}

      <Suspense fallback={<div>Loading list…</div>}>
        <CharacterList characters={characters} />
      </Suspense>

      <div className={styles.bottomPager}>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>

      <RefreshFAB
        onRefresh={doRefresh}
        isRunning={isRunning}
        secondsLeft={secondsLeft}
        onToggleRun={onToggleRun}
      />
    </div>
  );
}

