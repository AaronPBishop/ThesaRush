import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setInput, removeInputVal, incrementOrder, setTiles, removeTile, setLetter } from '../../store/game';

import { EarthEurope } from '@styled-icons/fa-solid/EarthEurope';
import { Netlify } from '@styled-icons/boxicons-logos/Netlify';

import { letterClass } from '../../functions/letterGenerator.js';

import './styles.css';

const Letter = ({ hidden, letter, colPos, rowPos, type, color, properties, rotation, randKey }) => {
    const dispatch = useDispatch();
    
    const order = useSelector(state => Number(state.game.order));
    const cleared = useSelector(state => state.game.statuses.cleared);
    const submitted = useSelector(state => state.game.statuses.submitted);
    const removedChar = useSelector(state => state.game.removedChar);
    const paused = useSelector(state => state.offerStatuses.paused);

    const [hasClicked, setHasClicked] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [clickedVoid, setClickedVoid] = useState({colPos: null, rowPos: null});
    const [newLetter, setNewLetter] = useState('');

    useEffect(() => {
        if (letter === '') setClickedVoid({colPos: colPos, rowPos: rowPos});

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

          if (properties.void) setClickedVoid({colPos: null, rowPos: null});
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

        if (String.fromCharCode(e.keyCode).match(/[A-Za-z]/) && colPos === clickedVoid.colPos && rowPos === clickedVoid.rowPos) setNewLetter(String.fromCharCode(e.keyCode));
        if (properties.void) setClicked(false);
      };

      document.addEventListener('keydown', keyDownHandler);

      return () => document.removeEventListener('keydown', keyDownHandler);
    }, [clickedVoid]);

    useEffect(() => {
      if (letter === '' && colPos === clickedVoid.colPos && rowPos === clickedVoid.rowPos) {
        dispatch(setLetter(colPos, rowPos, newLetter));
        setNewLetter('');
      };
    }, [newLetter]);

    return (
      <div
      key={randKey}
      className={
        [
          'letters',
          type === 'new' ? 'new-letters'
          : type === 'rearranged' && 'rearranged-letters'
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
          : (typeof properties === 'object') && (properties.stone) && (properties.stone === 2) ? 'rgb(55, 65, 50)'
          : (typeof properties === 'object') && (properties.stone) && (properties.stone === 1) && 'rgb(45, 55, 40)',

          boxShadow: properties === 'bomb' ? '0px 0px 15px 5px rgb(255, 49, 49)' 
          : (typeof properties === 'object') && (properties.stone) ? '0px 0px 10px 4px rgb(50, 60, 50)'
          : (typeof properties === 'object') && (properties.void) ? '0px 0px 10px 1px white' 
          : properties === 'gold' && '0px 0px 10px 1.5px #FFD700',

          border: clicked === true ? '2px solid yellow' 
          : (typeof properties === 'object') && (properties.stone) ? '2px solid rgb(40, 105, 80)'
          : properties === 'bomb' ? '2px solid rgb(180, 65, 0)' 
          : (typeof properties === 'object') && (properties.void) ? '2px solid white'
          : (letterClass(letter) === 'consonant') ? '2px solid rgb(255, 255, 0)' 
          : (letterClass(letter) === 'vowel') ? '2px solid rgb(139, 0, 0)' 
          : '2px solid yellow',

          borderRadius: properties !== 'normal' ? '8px' : letterClass(letter) === 'vowel' ? '20px' : '100vh',

          cursor: !paused && 'pointer'
        }}
        disabled={clicked}
        onClick={() => {
          if (!paused) setClicked((clicked) => !clicked);
        }}>

          <EarthEurope
          style={{
            visibility: properties === 'normal' ? 'visible' : 'hidden',
            transform: `rotate(${rotation}deg)`,
            width: '10vw',
            position: 'absolute',
            color: clicked === true ? 'rgb(30, 30, 30)' 
            : letterClass(letter) === 'consonant' && color === 'rgb(10, 30, 90)' ? 'rgb(0, 20, 70)' 
            : letterClass(letter) === 'consonant' && color === 'rgb(0, 15, 70)' ? 'rgb(0, 0, 50)'
            : letterClass(letter) === 'vowel' && color === 'rgb(227, 11, 92)' ? 'rgb(197, 0, 72)' 
            : letterClass(letter) === 'vowel' && color === 'rgb(215, 0, 64)' && 'rgb(185, 0, 44)'
          }}>
          </EarthEurope>

          <Netlify
          style={{
            visibility: properties.stone && properties.stone === 1 ? 'visible' : 'hidden',
            transform: 'rotate(45deg)',
            width: '6vw',
            position: 'absolute',
            color: 'rgb(25, 35, 20)'
          }}>
          </Netlify>
          
          <div 
          style={{
            letterSpacing: '-0.14vw', 
            textShadow: !clicked && properties === 'normal' && '0px 0px 2px white', 
            zIndex: '100'
          }}>
              {letter}
          </div>
      </div>
  );
};

export default Letter;