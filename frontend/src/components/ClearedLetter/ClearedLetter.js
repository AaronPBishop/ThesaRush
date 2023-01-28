import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Stars } from '@styled-icons/bootstrap/Stars';

import './styles.css';

const ClearedLetter = ({ colPos, rowPos, color, properties, rotation }) => {
    const clearedTiles = useSelector(state => state.game.clearedTiles);

    const [wasCleared, setWasCleared] = useState(false);
    const [rgbaVal, setRgbaVal] = useState('');

    const toRGBA = (rgb) => rgb.split('').map(el => el === 'b' ? el = 'ba' : el === ')' ? el = ', 0.6)' : el = el).join('');

    useEffect(() => {
        if (color) setRgbaVal(toRGBA(color));

        for (let tile of clearedTiles) if (Number([colPos, rowPos].join('')) === Number(tile.join(''))) setWasCleared(true);
    }, [clearedTiles]);

    useEffect(() => {
        if (rgbaVal.length < 1 && color) setRgbaVal(toRGBA(color));
        if (wasCleared === true) {
            const displayTime = setTimeout(() => {
                setWasCleared(false);
            }, 1400);

            return () => clearTimeout(displayTime);
        };
    }, [wasCleared]);

    if (rgbaVal.length < 1) if (color) setRgbaVal(toRGBA(color));
    if (rgbaVal.length > 0) return (
      <div style={{display: wasCleared === true ? 'flex' : 'none', position: 'absolute'}}>
        <Stars
        className='cleared-letters'
        style={{
            transform: `rotate(${rotation}deg)`,
            color: `${color}`,
            backgroundColor: `${rgbaVal}`,
            boxShadow: `0px 0px 40px 10px ${color}`
        }}>
        </Stars>
      </div>
  );
};

export default ClearedLetter;