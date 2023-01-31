import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Stars } from '@styled-icons/bootstrap/Stars';

import './styles.css';

const ClearedLetter = ({ colPos, rowPos, color, properties, rotation }) => {
    const clearedTiles = useSelector(state => state.game.clearedTiles);

    const [wasCleared, setWasCleared] = useState(false);
    const [rgbaVal, setRgbaVal] = useState('');
    const [bombTile, setBombTile] = useState(false);
    const [voidTile, setVoidTile] = useState(false);

    const toRGBA = (rgb) => rgb.split('').map(el => el === 'b' ? el = 'ba' : el === ')' ? el = ', 0.6)' : el = el).join('');

    useEffect(() => {
        if (properties === 'bomb') setBombTile(true);
        if (properties.void) setVoidTile(true);
    }, [properties]);

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
            color: bombTile ? 'red' : voidTile ? 'black' : color.toString(),
            backgroundColor: bombTile ? 'rgba(255, 69, 0, 0.6)' : voidTile ? 'rgba(255, 255, 255, 0.6)' : rgbaVal.toString(),
            boxShadow: bombTile ? '0px 0px 100px 100px rgb(255,69,0)' : voidTile ? '0px 0px 100px 100px rgb(255, 255, 255)' : `0px 0px 40px 10px ${color}`
        }}>
        </Stars>
      </div>
  );
};

export default ClearedLetter;