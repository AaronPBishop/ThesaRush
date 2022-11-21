import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setInput, removeInputVal } from '../../store/inputReducer.js';
import { setTiles } from '../../store/tilesReducer.js';
import { incrementOrder } from '../../store/orderReducer.js';

import { useStatusContext } from '../../context/StatusContext.js';
import { letterType } from '../../functions/letterGenerator.js';

import './styles.css';

const Letter = ({ hidden, letter, colPos, rowPos }) => {
    const dispatch = useDispatch();
    const order = useSelector(state => Number(Object.values(state.order)));
    const { submitted } = useStatusContext();

    const [clicked, setClicked] = useState(false);
    const [newLetter, setNewLetter] = useState(false);
    const [type, setType] = useState('');

    const board = useSelector(state => Object.values(state.board));

    useEffect(() => {
      setNewLetter(true);

      setType(letterType(letter));
    }, [board]);

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

        if (clicked === false) dispatch (removeInputVal([colPos, rowPos].join('')));

        for (let i = 0; i < positions.length; i++) dispatch(setTiles(positions[i]));
    }, [clicked]);

    useEffect(() => {
      setClicked(false);
    }, [submitted]);

    return (
      <div
        className={
          [
            'letters',
            hidden && 'hidden' 
            || (clicked && 'selected')
            || (newLetter && 'new-letter')
          ]
          .filter(Boolean)
          .join(" ")
        }
        style={{
          color:
          type === 'rare' ?
          'white' : 'white',

          textShadow: type === 'rare' && '2px 2px black',

          backgroundColor: 
          type === 'vowel' && clicked === false ?
          'rgb(194, 30, 86)' : type === 'consonant' && clicked === false ?
          'rgb(20, 40, 120)' : type === 'rare' && clicked === false ?
          '#FFD700' : clicked === true &&
          'rgb(30, 30, 30)',

          border: clicked === false && type === 'vowel' || type === 'rare' ? 
          '2px solid #39254D' : '2px solid rgb(255, 255, 0)',

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