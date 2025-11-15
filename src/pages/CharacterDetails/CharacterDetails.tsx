import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Character } from '../../types/character';
import axiosClient from '../../api/axiosClient';
import { fetchEpisodesByIds } from '../../api/episodes.api';
import extractEpisodeIds from '../../utils/extractEpisodeIds';
import styles from './styles.module.scss';

export default function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const { data } = await axiosClient.get<Character>(`/character/${id}`);
        if (!mounted) return;
        setCharacter(data);
        const firstIds = extractEpisodeIds(data.episode, 5);
        const eps = await fetchEpisodesByIds(firstIds);
        if (!mounted) return;
        setEpisodes(eps.map((e) => e.name));
        // persist recently viewed
        try {
          const key = 'recentlyViewed';
          const curr = JSON.parse(localStorage.getItem(key) || '[]') as Character[];
          const dedup = [data, ...curr.filter((c) => c.id !== data.id)].slice(0, 5);
          localStorage.setItem(key, JSON.stringify(dedup));
        } catch {}
      } catch (err: any) {
        setError(err?.message || 'Failed to load character');
      } finally {
        setIsLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  const details = useMemo(() => {
    if (!character) return null;
    return (
      <div className={styles.grid}>
        <div className={styles.media}>
          <img src={character.image} alt={character.name} className={styles.image} />
        </div>
        <div className={styles.info}>
          <h2 className="section-title">{character.name}</h2>
          <p className={styles.meta}>
            <span data-status={character.status.toLowerCase()}>{character.status}</span>
            <span> • {character.species}</span>
            <span> • {character.gender}</span>
          </p>
          <div className={styles.rows}>
            <div>
              <span className={styles.label}>Origin</span>
              <span className={styles.value}>{character.origin?.name}</span>
            </div>
            <div>
              <span className={styles.label}>Last known</span>
              <span className={styles.value}>{character.location?.name}</span>
            </div>
          </div>
          {episodes.length > 0 && (
            <div className={styles.episodes}>
              <span className={styles.label}>First 5 episodes</span>
              <ul className={styles.list}>
                {episodes.map((n, i) => (
                  <li key={i} className={styles.listItem}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }, [character, episodes]);

  return (
    <div className="container">
      <Link to="/">← Back</Link>
      {isLoading && <p>Loading…</p>}
      {error && <p role="alert">Error: {error}</p>}
      {details}
    </div>
  );
}

