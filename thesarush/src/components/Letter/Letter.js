import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setInput, removeInputVal } from '../../store/inputReducer.js';
import { setTiles } from '../../store/tilesReducer.js';

import { incrementOrder } from '../../store/orderReducer.js';
import './styles.css';

const Letter = ({ hidden, letter, colPos, rowPos }) => {
    const dispatch = useDispatch();
    const order = useSelector(state => Number(Object.values(state.order)));

    const [clicked, setClicked] = useState(false);

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

    return <div
    className={
      [
        'letters',
        hidden ? "hidden" : null 
        || clicked ? 'selected' : 'letters'
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