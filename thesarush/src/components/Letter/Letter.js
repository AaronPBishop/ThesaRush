import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setInput, removeInputVal } from '../../store/inputReducer.js';
import { setTiles } from '../../store/tilesReducer.js';
import { incrementOrder } from '../../store/orderReducer.js';

import { useStatusContext } from '../../context/StatusContext.js';
import { letterClass } from '../../functions/letterGenerator.js';

import './styles.css';

const Letter = ({ hidden, letter, colPos, rowPos, type }) => {
    const dispatch = useDispatch();
    const order = useSelector(state => Number(Object.values(state.order)));
    
    const { cleared, submitted } = useStatusContext();

    const [hasClicked, setHasClicked] = useState(false);
    const [clicked, setClicked] = useState(false);
    
    useEffect(() => {
      setHasClicked(true);
    }, [clicked]);

    useEffect(() => {
        const positions = [];
        const currValues = [];

        if (clicked) {
          positions.push([colPos, rowPos]);
          currValues.push(`${letter}`);

          const currPosition = [colPos, rowPos].join('');

          dispatch(setInput(currPosition, [letter, order]));
          dispatch(incrementOrder());
        };

        if (hasClicked === true && clicked === false) dispatch (removeInputVal([colPos, rowPos].join('')));

        for (let i = 0; i < positions.length; i++) dispatch(setTiles(positions[i]));
    }, [clicked]);

    useEffect(() => {
      setClicked(false);
    }, [submitted, cleared]);

    return (
      <div
        className={
          [
            'letters',
            type === 'new' ? 'new-letters'
            : type === 'rearranged' ? 'rearranged-letters'
            : type === 'unarranged' && 'unarranged-letters'
          ]
          .filter(Boolean)
          .join(" ")
        }
        style={{
          visibility: hidden ? 'hidden' : 'visible',

          color: 'white',

          textShadow: letterClass(letter) === 'rare' && '2px 2px black',

          backgroundColor: 
          letterClass(letter) === 'vowel' && clicked === false ?
          'rgb(215, 0, 64)' : letterClass(letter) === 'consonant' && clicked === false ?
          'rgb(20, 40, 120)' : letterClass(letter) === 'rare' && clicked === false ?
          'rgb(255, 215, 0)' : clicked === true &&
          'rgb(30, 30, 30)',

          border: clicked === false && (letterClass(letter) === 'consonant') ? 
          '2px solid rgb(255, 255, 0)' : 
          clicked === false && (letterClass(letter) === 'vowel') ?
          '2px solid rgb(139, 0, 0)' : 
          '2px solid yellow',

          cursor: 'pointer'
        }}
        disabled={clicked}
        onClick={() => {
        setClicked((clicked) => !clicked);
        }}>
        {letter}
      </div>
  )
};

export default Letter;