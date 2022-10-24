import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setInput, removeInputVal } from '../../store/inputReducer.js';
import { setTiles } from '../../store/tilesReducer.js';
import { incrementOrder } from '../../store/orderReducer.js';

import { useStatusContext } from '../../context/StatusContext.js';
import './styles.css';

const Letter = ({ hidden, letter, colPos, rowPos }) => {
    const dispatch = useDispatch();
    const order = useSelector(state => Number(Object.values(state.order)));
    const { submitted } = useStatusContext();

    const [clicked, setClicked] = useState(false);
    const [newLetter, setNewLetter] = useState(false);

    useEffect(() => {
      setNewLetter(true)
    }, [])

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
    }, [submitted])

    return <div
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
    disabled={clicked}
    onClick={() => {
      setClicked((clicked) => !clicked);
    }}>
    {letter}
  </div>
};

export default Letter;