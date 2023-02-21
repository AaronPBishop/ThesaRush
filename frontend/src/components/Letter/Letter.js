import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setInput, removeInputVal, incrementOrder, setTiles, removeTile, setLetter, setLastVoidClicked, removeLastVoidClicked } from '../../store/game';

import { EarthEurope } from '@styled-icons/fa-solid/EarthEurope';
import { Netlify } from '@styled-icons/boxicons-logos/Netlify';
import { Bomb } from '@styled-icons/fa-solid/Bomb';
import { LightningChargeFill } from '@styled-icons/bootstrap/LightningChargeFill';

import { letterClass } from '../../functions/letterGenerator.js';

import './styles.css';

const Letter = ({ hidden, letter, colPos, rowPos, type, color, properties, rotation, randKey }) => {
    const dispatch = useDispatch();
    
    const order = useSelector(state => Number(state.game.order));
    const cleared = useSelector(state => state.game.statuses.cleared);
    const submitted = useSelector(state => state.game.statuses.submitted);
    const removedChar = useSelector(state => state.game.removedChar);
    const paused = useSelector(state => state.offerStatuses.paused);
    const lastVoidClicked = useSelector(state => state.game.statuses.lastVoidClicked);

    const [hasClicked, setHasClicked] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [clickedVoid, setClickedVoid] = useState({colPos: null, rowPos: null});

    useEffect(() => {
        setHasClicked(true);

        const positions = [];
        const currValues = [];

        if (clicked) {
          if (typeof properties === 'object' && properties.void) setClickedVoid({colPos: colPos, rowPos: rowPos});
          if (!properties.void) dispatch(removeLastVoidClicked());

          positions.push([colPos, rowPos]);
          currValues.push(`${letter}`);

          const currPosition = [colPos, rowPos].join('');

          dispatch(setInput(currPosition, [letter, order, [colPos, rowPos]]));
          dispatch(incrementOrder());
        };

        if (hasClicked === true && clicked === false) {
          dispatch(removeInputVal([colPos, rowPos].join('')));
          dispatch(removeTile([colPos, rowPos])); 

          if ((typeof properties === 'object') && properties.void) {
            dispatch(removeLastVoidClicked());
            setClickedVoid({colPos: null, rowPos: null});
          };
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
      if (clickedVoid.colPos !== null && clickedVoid.rowPos !== null) dispatch(setLastVoidClicked(colPos, rowPos));

      const keyDownHandler = e => {
        e.preventDefault();

        if (String.fromCharCode(e.keyCode).match(/[A-Za-z]/) && (colPos === clickedVoid.colPos && rowPos === clickedVoid.rowPos)) {
            dispatch(setLetter(colPos, rowPos, String.fromCharCode(e.keyCode)));

            setClickedVoid({colPos: null, rowPos: null});
        };
      };

      document.addEventListener('keydown', keyDownHandler);

      return () => document.removeEventListener('keydown', keyDownHandler);
    }, [clickedVoid]);

    useEffect(() => {
      const keyDownHandler = e => {
        e.preventDefault();

        if (String.fromCharCode(e.keyCode).match(/[A-Za-z]/) && (colPos === lastVoidClicked[0] && rowPos === lastVoidClicked[1])) dispatch(setLetter(colPos, rowPos, String.fromCharCode(e.keyCode)));
      };

      document.addEventListener('keydown', keyDownHandler);

      return () => document.removeEventListener('keydown', keyDownHandler);
    }, [lastVoidClicked]);

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

          backgroundColor: clicked === true && !properties.void ? 'rgb(40, 40, 40)' 
          : properties === 'normal' || properties === 'gold' || (typeof properties === 'object') && (properties.void) ? color 
          : properties === 'bomb' ? 'rgb(255, 69, 0)'
          : (typeof properties === 'object') && (properties.stone) && (properties.stone === 2) ? 'rgb(55, 65, 50)'
          : (typeof properties === 'object') && (properties.stone) && (properties.stone === 1) ? 'rgb(45, 55, 40)'
          : (typeof properties === 'object') && (properties.lightning) && 'rgb(30, 50, 255)',

          boxShadow: clicked === true ? '0px 0px 6px 1px rgb(95, 255, 0)' :
          properties === 'bomb' ? '0px 0px 15px 5px rgb(255, 49, 49)' 
          : (typeof properties === 'object') && (properties.stone) ? '0px 0px 10px 4px rgb(50, 60, 50)'
          : (typeof properties === 'object') && (properties.void) ? '0px 0px 10px 1px white' 
          : (typeof properties === 'object') && (properties.lightning) ? '0px 0px 20px 6px rgb(0, 40, 255)'
          : properties === 'gold' && '0px 0px 10px 1.5px #FFD700',

          border: clicked === true ? '2px solid rgb(95, 255, 0)' 
          : (typeof properties === 'object') && (properties.stone) ? '2px solid rgb(40, 105, 80)'
          : properties === 'bomb' ? '2px solid rgb(180, 65, 0)' 
          : (typeof properties === 'object') && (properties.void) ? '2px solid white'
          : (typeof properties === 'object') && (properties.lightning) ? '2px solid rgb(60, 160, 255)'
          : (letterClass(letter) === 'consonant') ? '2px solid rgb(40, 0, 65)' 
          : (letterClass(letter) === 'vowel') ? '2px solid rgb(139, 0, 0)' 
          : '2px solid yellow',

          borderRadius: properties !== 'normal' ? '1vh' : letterClass(letter) === 'vowel' ? '2.5vh' : '100vh',

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
            color: clicked === true ? 'rgb(40, 40, 40)' 
            : letterClass(letter) === 'consonant' && color === 'rgb(10, 30, 95)' ? 'rgb(0, 20, 70)' 
            : letterClass(letter) === 'consonant' && color === 'rgb(5, 15, 80)' ? 'rgb(0, 0, 60)'
            : letterClass(letter) === 'vowel' && color === 'rgb(227, 11, 92)' ? 'rgb(197, 0, 72)' 
            : letterClass(letter) === 'vowel' && color === 'rgb(215, 0, 64)' && 'rgb(185, 0, 44)'
          }}>
          </EarthEurope>

          <Netlify
          style={{
            visibility: (typeof properties === 'object') && properties.stone && properties.stone === 1 ? 'visible' : 'hidden',
            transform: 'rotate(45deg)',
            width: '6vw',
            position: 'absolute',
            color: 'rgb(25, 35, 20)'
          }}>
          </Netlify>

          <Bomb
          style={{
            visibility: properties === 'bomb' && !clicked ? 'visible' : 'hidden',
            width: '3.5vw',
            position: 'absolute',
            color: 'rgba(155, 20, 0, 0.4)'
          }}>
          </Bomb>

          <LightningChargeFill
          style={{
            visibility: (typeof properties === 'object') && properties.lightning ? 'visible' : 'hidden',
            width: '5.5vw',
            position: 'absolute',
            transform: 'rotate(-6deg)',
            color: 'rgba(255, 255, 0, 0.6)'
          }}>
          </LightningChargeFill>

          <div style={{display: (typeof properties === 'object') && properties.lightning ? 'flex' : 'none', justifyContent: 'center', position: 'absolute'}}>
            <p 
            style={{
              position: 'absolute', 
              backgroundColor: 'rgb(0, 190, 255)',
              border: 'none',
              borderRadius: '3px',
              width: '0.9vw',
              color: 'white', 
              fontSize: '1.6vh', 
              fontWeight: 'bold', 
              marginTop: '-3.9vh', 
              marginLeft: '-2.8vw'
            }}>
              {(typeof properties === 'object' && properties.lightning) && properties.strength}
            </p>
          </div>
          
          <div 
          style={{
            letterSpacing: '-0.14vw', 
            textShadow: !clicked && (typeof properties === 'object') && properties.lightning ? '0px 0px 5px white' : !clicked && properties === 'normal' && '0px 0px 2.5px white', 
            zIndex: '100'
          }}>
              {letter}
          </div>
      </div>
  );
};

export default Letter;