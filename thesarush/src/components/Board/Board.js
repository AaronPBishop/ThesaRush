import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { addColumn } from '../../store/boardReducer.js';
import Column from '../Column/Column.js';
import { useEffect, useState } from 'react';

const Board = () => {
    const dispatch = useDispatch();
    const board = useSelector(state => Object.values(state.board));

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
    
    const randomColumn = () => Array.from({ length: 9 }, letterGenerator);
    useEffect(() => {
        for (let i = 0; i < 8; i++) {
            dispatch(addColumn(randomColumn()))
        };
    }, []);

    return (
        <div className='main-board'>
            {board.map((letters, i) => <Column letters={letters} key={i} />)}
        </div>
    );
};

export default Board;