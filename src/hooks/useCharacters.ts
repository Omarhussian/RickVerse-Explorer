import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchCharacters, type CharacterQuery } from '../api/characters.api';
import type { Character, CharactersResponse } from '../types/character';

export interface UseCharactersParams {
  name?: string;
  status?: 'alive' | 'dead' | 'unknown' | '';
  species?: string;
  sort?: 'asc' | 'desc';
  accumulate?: boolean;
}

export interface UseCharactersResult {
  characters: Character[];
  totalCount: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  resetList: () => void;
  page: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export function useCharacters(params: UseCharactersParams): UseCharactersResult {
  const { name, status, species, sort = 'asc', accumulate = false } = params;
  const [page, setPage] = useState<number>(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<CharactersResponse['info'] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const query: CharacterQuery = useMemo(() => {
    const q: CharacterQuery = { page, name: name || undefined, species: species || undefined };
    if (status) {
      q.status = status;
    }
    return q;
  }, [page, name, status, species]);

  const resetList = useCallback(() => {
    setPage(1);
    setCharacters([]);
    setInfo(null);
    setError(null);
  }, []);

  const fetchPage = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      const data = await fetchCharacters(query);
      setInfo(data.info);
      setCharacters((prev) => {
        const merged = accumulate ? [...prev, ...data.results] : [...data.results];
        const sorted = [...merged].sort((a, b) => a.name.localeCompare(b.name));
        if (sort === 'desc') sorted.reverse();
        return sorted;
      });
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.message || 'Failed to fetch characters';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [query, sort, refreshKey]);

  useEffect(() => {
    resetList();
  }, [name, status, species, sort]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  const refetch = useCallback(() => {
    resetList();
    setTimeout(() => {
      setPage(1);
      setRefreshKey((k) => k + 1);
    }, 0);
  }, [resetList]);

  const nextPage = useCallback(() => {
    if (info?.next && !isLoading) setPage((p) => p + 1);
  }, [info?.next, isLoading]);

  const prevPage = useCallback(() => {
    if (page > 1 && !isLoading) setPage((p) => p - 1);
  }, [page, isLoading]);

  return {
    characters,
    totalCount: info?.count ?? 0,
    totalPages: info?.pages ?? 0,
    isLoading,
    error,
    refetch,
    resetList,
    page,
    setPage,
    nextPage,
    prevPage,
  };
}

export default useCharacters;

