import { useState, useEffect } from 'react';
import './styles.css';
import { useInputContext } from '../../context/InputContext.js';

const Letter = ({ letter }) => {
    const [clicked, setClicked] = useState(false);
    const [currLetter, setCurrLetter] = useState('');

    const { inputVal, setInputVal } = useInputContext();
    
    useEffect(() => {
        const currValues = [];

        if (clicked) currValues.push(`${currLetter}`)
        setInputVal(inputVal.concat(currValues))
    }, [clicked])

    return <div className='letters' disabled={clicked} onClick={() => {
        setClicked((clicked) => !clicked);
        setCurrLetter(`${letter}`)
    }}>{letter}</div>
};

export default Letter;