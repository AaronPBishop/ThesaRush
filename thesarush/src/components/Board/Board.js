import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { addColumn, resetBoard } from '../../store/boardReducer.js';
import Column from '../Column/Column.js';
import { useEffect } from 'react';

const Board = () => {
    const dispatch = useDispatch();
    const board = useSelector(state => Object.values(state.board));

    const vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
    const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W']
    const goldConsonants = ['X', 'Z', 'Q'];

    const letterGenerator = () => {
        const randomGen = Math.floor(Math.random() * 100);
        const randomNum = randomGen;

        if (randomNum >= 40) return consonants[Math.floor((Math.random()*consonants.length))];
        if (randomNum >= 3 && randomNum < 40) return vowels[Math.floor((Math.random()*vowels.length))];

        return goldConsonants[Math.floor((Math.random()*goldConsonants.length))];
    };

    const randomColumn = () => {
        const column = [];

        for (let i = 0; i < 9; i++) {
            if (i > 5) column.push(letterGenerator());
            else column.push(null)
        };
        
        return column;
    };

    useEffect(() => {
        dispatch(resetBoard());

        for (let i = 0; i < 8; i++) {
            dispatch(addColumn(randomColumn()))
        };
    }, []);

    return (
        <div className='main-board'>
            {board.map((col, i) => {
                return <Column letters={col} colPos={i} key={i} />})}
        </div>
    );
};

export default Board;