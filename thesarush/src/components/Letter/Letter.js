import { useState, useEffect } from 'react';
import './styles.css';
import { useInputContext } from '../../context/InputContext.js';
import { setInput, removeInputVal } from '../../store/inputReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setTiles } from '../../store/tilesReducer';

const Letter = ({ hidden, letter, colPos, rowPos }) => {
    const dispatch = useDispatch();
    const currInput = useSelector(state => state.input);

    const [clicked, setClicked] = useState(false);
    const [order, setOrder] = useState(0);
    
    const { inputVal, setInputVal } = useInputContext();

    useEffect(() => {
        const positions = [];
        const currValues = [];

        if (clicked) {
          positions.push([colPos, rowPos]);
          currValues.push(`${letter}`);

          const currPosition = [colPos, rowPos].join('');

          dispatch(setInput(currPosition, [letter, order]));
        };

        if (clicked === false) dispatch (removeInputVal([colPos, rowPos].join('')));

        for (let i = 0; i < positions.length; i++) dispatch(setTiles(positions[i]));
        
        setOrder(order + 1)
        console.log(currInput)

        setInputVal(inputVal.concat(Object.values(currValues)));
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
    }}>
    {letter}
  </div>
};

export default Letter;