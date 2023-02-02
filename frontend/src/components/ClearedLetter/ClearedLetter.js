import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Stars } from '@styled-icons/bootstrap/Stars';
import { Atom } from '@styled-icons/boxicons-regular/Atom';
import { Connectdevelop } from '@styled-icons/fa-brands/Connectdevelop'

import './styles.css';

const ClearedLetter = ({ colPos, rowPos, color, properties, rotation }) => {
    const clearedTiles = useSelector(state => state.game.clearedTiles);

    const [wasCleared, setWasCleared] = useState(false);

    const [currColor, setCurrColor] = useState('');
    const [currRgba, setCurrRgba] = useState('');
    const [colorTimeUp, setColorTimeUp] = useState(false);

    const [currProperties, setCurrProperties] = useState('');
    const [propertyTimeUp, setPropertyTimeUp] = useState('');

    const toRGBA = (rgb) => rgb.split('').map(el => el === 'b' ? el = 'ba' : el === ')' ? el = ', 0.6)' : el = el).join('');

    useEffect(() => {
        if (color !== null && color !== undefined && properties === 'normal' && currColor === '') {
            setCurrColor(color);
            setCurrRgba(toRGBA(color));
        };

        if (color && currColor.length && (color !== currColor)) {
            const colorTimer = setTimeout(() => {
                setColorTimeUp(true);
            }, 1600);

            return () => clearTimeout(colorTimer);
        };
    }, [color]);

    useEffect(() => {
        if (colorTimeUp === true && color !== null && color !== undefined && properties === 'normal') {
            setCurrColor(color);
            setCurrRgba(toRGBA(color));
            setColorTimeUp(false);
        };
    }, [colorTimeUp]);

    useEffect(() => {
        if (properties && currProperties === '') {
            if (properties !== 'bomb' && !properties.void) setCurrProperties('normal');
            if (properties === 'bomb') setCurrProperties('bomb');
            if (properties.void) setCurrProperties('void');
        };

        if (properties && currProperties.length && (properties !== currProperties)) {
            const propertyTimer = setTimeout(() => {
                setPropertyTimeUp(true);
            }, 1600);

            return () => clearTimeout(propertyTimer);
        };
    }, [properties]);

    useEffect(() => {
        if (propertyTimeUp === true) {
            if (properties !== 'bomb' && !properties.void) setCurrProperties('normal');
            if (properties === 'bomb') setCurrProperties('bomb');
            if (properties.void) setCurrProperties('void');
            setPropertyTimeUp(false);
        };
    }, [propertyTimeUp]);

    useEffect(() => {for (let tile of clearedTiles) if (Number([colPos, rowPos].join('')) === Number(tile.join(''))) setWasCleared(true)}, [clearedTiles]);

    useEffect(() => {
        if (wasCleared === true) {
            const displayTime = setTimeout(() => {
                setWasCleared(false);
            }, 1400);

            return () => clearTimeout(displayTime);
        };
    }, [wasCleared]);

    return (
      <div style={{display: wasCleared === true ? 'flex' : 'none', position: 'absolute', border: 'none'}}>
        <Stars
        className='cleared-letters'
        style={{
            display: currProperties === 'normal' ? 'block' : 'none',
            transform: `rotate(${rotation}deg)`,
            color: currColor,
            backgroundColor: currRgba,
            boxShadow: `0px 0px 40px 10px ${currColor}`,
            border: 'none'
        }}>
        </Stars>

        <Atom
        className='cleared-letters'
        style={{
            display: currProperties === 'bomb' ? 'block' : 'none',
            transform: `rotate(${rotation}deg)`,
            color: 'rgb(255, 69, 0)',
            backgroundColor: 'rgba(255, 69, 0, 0.6)',
            boxShadow: '0px 0px 100px 100px rgb(255, 69, 0)',
            border: 'none'
        }}>
        </Atom>

        <Connectdevelop
        className='cleared-letters'
        style={{
            display: currProperties === 'void' ? 'block' : 'none',
            transform: `rotate(${rotation}deg)`,
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            boxShadow: '0px 0px 100px 100px rgb(255, 255, 255)',
            border: 'none'
        }}>
        </Connectdevelop>
      </div>
  );
};

export default ClearedLetter;