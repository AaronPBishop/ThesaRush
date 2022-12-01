import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setInput, removeInputVal, incrementOrder, setTiles, removeTile, setLetter } from '../../store/gameReducer';

import { letterClass } from '../../functions/letterGenerator.js';

import './styles.css';

const Letter = ({ hidden, letter, colPos, rowPos, type, color, properties }) => {
    const dispatch = useDispatch();
    
    const order = useSelector(state => Number(state.game.order));
    const cleared = useSelector(state => state.game.statuses.cleared);
    const submitted = useSelector(state => state.game.statuses.submitted);
    const removedChar = useSelector(state => state.game.removedChar);

    const [hasClicked, setHasClicked] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [clickedVoid, setClickedVoid] = useState(false);
    const [newLetter, setNewLetter] = useState('');

    useEffect(() => {
        if (letter === '') setClickedVoid(true);
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

    useEffect(() => {
      if (colPos === removedChar[0] && rowPos === removedChar[1]) setClicked(false);
    }, [removedChar]);

    useEffect(() => {
      const keyDownHandler = e => {
        e.preventDefault();

        setNewLetter(String.fromCharCode(e.keyCode));
        if (properties.void) setClicked(false);
      };

      document.addEventListener('keydown', keyDownHandler);

      return () => document.removeEventListener('keydown', keyDownHandler);
    }, [clickedVoid]);

    useEffect(() => {
      if (letter === '') dispatch(setLetter(colPos, rowPos, newLetter));
    }, [newLetter]);

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

          backgroundColor: clicked === true && !properties.void ? 'rgb(30, 30, 30)' 
          : properties === 'normal' || properties === 'gold' || properties.void ? color 
          : properties === 'bomb' ? 'rgb(255,69,0)'
          : (typeof properties === 'object') && (properties.stone) && (properties.stone === 2) ? '#383630'
          : (typeof properties === 'object') && (properties.stone) && (properties.stone === 1) && 'rgb(40, 38, 30)',

          boxShadow: properties === 'bomb' ? '0px 0px 15px 5px rgb(255, 49, 49)' 
          : (typeof properties === 'object') && (properties.stone) ? '0px 0px 10px 4px #383630'
          : (typeof properties === 'object') && (properties.void) ? '0px 0px 10px 1px white' 
          : properties === 'gold' && '0px 0px 10px 1.5px #FFD700',

          border: clicked === true ? '2px solid yellow' 
          : (typeof properties === 'object') && (properties.stone) ? '2px solid #787366'
          : properties === 'bomb' ? '2px solid rgb(180, 65, 0)' 
          : (typeof properties === 'object') && (properties.void) ? '2px solid white'
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