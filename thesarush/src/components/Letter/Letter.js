import { useState, useEffect } from 'react';
import './styles.css';
import { useInputContext } from '../../context/InputContext.js';

const Letter = ({ hidden, letter }) => {
    const [clicked, setClicked] = useState(false);
    const [currLetter, setCurrLetter] = useState('');

    const { inputVal, setInputVal } = useInputContext();
    
    useEffect(() => {
        const currValues = [];

        if (clicked) currValues.push(`${currLetter}`)
        setInputVal(inputVal.concat(currValues))
    }, [clicked]);

    return <div
    className={
      [
        'letters',
        hidden ? "hidden" : null // conditionally apply class
      ]
        .filter(Boolean)
        .join(" ")
    }
    disabled={clicked}
    onClick={() => {
      setClicked((clicked) => !clicked);
      setCurrLetter(letter);
    }}
  >
    {letter}
  </div>
};

export default Letter;