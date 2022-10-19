import { useState, useEffect } from 'react';
import './styles.css';
import { useInputContext } from '../../context/InputContext.js';

import { useDispatch } from 'react-redux';
import { setTiles } from '../../store/tilesReducer';

const Letter = ({ hidden, letter, colPos, rowPos }) => {
    const dispatch = useDispatch();

    const [clicked, setClicked] = useState(false);
    const [currLetter, setCurrLetter] = useState('');

    const { inputVal, setInputVal } = useInputContext();
    
    useEffect(() => {
        const currValues = [];
        const positions = [];

        if (clicked) {
          currValues.push(`${currLetter}`);
          positions.push([colPos, rowPos]);
        };

        for (let i = 0; i < positions.length; i++) {
          dispatch(setTiles(positions[i]))
        };

        setInputVal(inputVal.concat(currValues));
    }, [clicked]);

    return <div
    className={
      [
        'letters',
        hidden ? "hidden" : null
      ]
        .filter(Boolean)
        .join(" ")
    }
    disabled={clicked}
    onClick={() => {
      setClicked((clicked) => !clicked);
      setCurrLetter(letter);
    }}>
    {letter}
  </div>
};

export default Letter;