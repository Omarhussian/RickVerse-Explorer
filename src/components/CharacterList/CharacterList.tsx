import { memo } from 'react';
import type { Character } from '../../types/character';
import CharacterCard from '../CharacterCard/CharacterCard';
import styles from './styles.module.scss';

export interface CharacterListProps {
  characters: Character[];
}

function CharacterList({ characters }: CharacterListProps) {
  return (
    <div className={styles.grid} role="list">
      {characters.map((c) => (
        <div key={c.id} role="listitem" className={styles.item}>
          <CharacterCard character={c} />
        </div>
      ))}
    </div>
  );
}

export default memo(CharacterList);

