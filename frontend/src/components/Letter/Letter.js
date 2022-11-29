import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setInput, removeInputVal, incrementOrder, setTiles, removeTile, setWait } from '../../store/gameReducer';

import { letterClass } from '../../functions/letterGenerator.js';

import './styles.css';

const Letter = ({ hidden, letter, colPos, rowPos, type, color, properties }) => {
    const dispatch = useDispatch();
    
    const order = useSelector(state => Number(state.game.order));
    
    const cleared = useSelector(state => state.game.statuses.cleared);
    const submitted = useSelector(state => state.game.statuses.submitted);

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
          dispatch(removeInputVal([colPos, rowPos].join('')));
          dispatch(removeTile([colPos, rowPos])); 
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

          color: properties === 'bomb' ? 'yellow' : 'white',

          textShadow: letterClass(letter) === 'rare' && properties !== 'bomb' && '2px 2px black',

          backgroundColor: clicked === true ? 'rgb(30, 30, 30)' 
          : properties === 'normal' ? color 
          : properties === 'bomb' ? 'rgb(255,69,0)'
          : (typeof properties === 'object') && (Object.keys(properties)[0] === 'stone') && '#383630',

          boxShadow: properties === 'bomb' ? '0px 0px 15px 5px rgb(255, 49, 49)' : (typeof properties === 'object') && (Object.keys(properties)[0] === 'stone') && '0px 0px 10px 4px #383630',

          border: clicked === true ? '2px solid yellow' 
          : (typeof properties === 'object') && (Object.keys(properties)[0] === 'stone') ? '2px solid #787366'
          : properties === 'bomb' ? '2px solid rgb(180, 65, 0)' 
          : (letterClass(letter) === 'consonant') ? '2px solid rgb(255, 255, 0)' 
          : (letterClass(letter) === 'vowel') ? '2px solid rgb(139, 0, 0)' 
          : '2px solid yellow',

          borderRadius: properties !== 'normal' ? '8px' : letterClass(letter) === 'vowel' ? '20px' : '40px',

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