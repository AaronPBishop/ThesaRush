import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './styles.css';

const ClearedLetter = ({ colPos, rowPos }) => {
    const clearedTiles = useSelector(state => state.game.clearedTiles);

    const [wasCleared, setWasCleared] = useState(false);

    useEffect(() => {
        for (let tile of clearedTiles) if (Number([colPos, rowPos].join('')) === Number(tile.join(''))) setWasCleared(true);
    }, [clearedTiles]);

    useEffect(() => {
        if (wasCleared === true) {
            const displayTime = setTimeout(() => {
                setWasCleared(false);
            }, 1400);

            return () => clearTimeout(displayTime);
        };
    }, [wasCleared]);

    return (
      <div style={{display: wasCleared === true ? 'flex' : 'none', position: 'absolute'}}>
        <div className='cleared-letters'></div>
      </div>
  );
};

export default ClearedLetter;