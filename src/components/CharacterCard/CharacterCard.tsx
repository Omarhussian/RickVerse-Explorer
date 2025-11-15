import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Character } from '../../types/character';
import styles from './CharacterCard.module.scss';

export interface CharacterCardProps {
  character: Character;
}

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link to={`/character/${character.id}`} className={styles.card} aria-label={character.name}>
      <img src={character.image} alt={character.name} className={styles.image} />
      <div className={styles.body}>
        <h3 className={styles.name}>{character.name}</h3>
        <p className={styles.meta}>
          <span className={styles.status} data-status={character.status.toLowerCase()}>
            {character.status}
          </span>
          <span> • {character.species}</span>
        </p>
        <p className={styles.origin}>Origin: {character.origin?.name}</p>
      </div>
    </Link>
  );
}

export default memo(CharacterCard);

