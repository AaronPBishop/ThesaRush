import { useEffect, useState } from 'react';

import Letter from '../Letter/Letter.js';
import { useBoardContext } from '../../context/BoardContext.js';
import './styles.css';

const Column = () => {
    const [randomCol, setRandomCol] = useState([]);
    const { setColumnVals } = useBoardContext();

    const vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
    const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W']
    const goldConsonants = ['X', 'Z', 'Q'];

    const randomGen = Math.floor(Math.random() * 100);
    const letterGenerator = () => {
        const randomNum = randomGen;

        if (randomNum >= 40) return consonants[Math.floor((Math.random()*consonants.length))];
        if (randomNum >= 5 && randomNum < 40) return vowels[Math.floor((Math.random()*vowels.length))];

        return goldConsonants[Math.floor((Math.random()*goldConsonants.length))];
    };

    useEffect(() => {
        const col = []

        for (let j = 0; j < 9; j++) {
            if (j >= 6) col.push(<Letter letter={letterGenerator()} key={j} />)
            if (j < 6) col.push(<Letter style={{ visibility: 'hidden' }} id='null' key={j}  />)
        };

        setRandomCol(col);
    }, []);

    return (
        <div className='columns'>
            {randomCol.map(val => val)}
        </div>
    );
};

export default Column;