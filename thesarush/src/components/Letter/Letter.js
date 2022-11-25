import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setInput, removeInputVal, incrementOrder, setTiles, removeTile, setWait } from '../../store/gameReducer';

import { letterClass } from '../../functions/letterGenerator.js';

import './styles.css';

const Letter = ({ hidden, letter, colPos, rowPos, type, color }) => {
    const dispatch = useDispatch();
    
    const order = useSelector(state => Number(state.game.order));
    
    const cleared = useSelector(state => state.game.cleared);
    const submitted = useSelector(state => state.game.submitted);

    const [hasClicked, setHasClicked] = useState(false);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        setHasClicked(true);

        const positions = [];
        const currValues = [];

        if (clicked) {
          positions.push([colPos, rowPos]);
          currValues.push(`${letter}`);

          const currPosition = [colPos, rowPos].join('');

          dispatch(setInput(currPosition, [letter, order]));
          dispatch(incrementOrder());
        };

        if (hasClicked === true && clicked === false) {
          setTimeout(() => {
            dispatch(removeInputVal([colPos, rowPos].join('')));
            dispatch(removeTile([colPos, rowPos])); 
          }, 150);
        };

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

          backgroundColor: clicked === true ? 'rgb(30, 30, 30)' : color,

          border: clicked === false && (letterClass(letter) === 'consonant') ? 
          '2px solid rgb(255, 255, 0)' : 
          clicked === false && (letterClass(letter) === 'vowel') ?
          '2px solid rgb(139, 0, 0)' : 
          '2px solid yellow',

          borderRadius: letterClass(letter) === 'vowel' ? '20px' : '40px',

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