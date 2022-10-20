import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addColumn, dropLetters, resetBoard } from '../../store/boardReducer.js';
import Column from '../Column/Column.js';
import letterGenerator from '../../functions/letterGenerator.js';
import checkGameOver from '../../functions/checkGameOver.js';
import GameOver from '../GameOver/GameOver.js';
import './styles.css';

const Board = () => {
    const [switched, setSwitched] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const dispatch = useDispatch();
    const board = useSelector(state => Object.values(state.board));

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

    useEffect(() => {
        const interval = setTimeout(() => {
          setSwitched((switched) => !switched);
        }, 3000);
    
        return () => clearTimeout(interval)
    
    }, [switched]);

    useEffect(() => {
        if (board.length) dispatch(dropLetters(board));

        if (checkGameOver(board)) {
            setIsGameOver(true);
            return;
        };
    }, [switched]);

    if (isGameOver) return <GameOver />
    else return (
        <div className='main-board'>
            {board.map((col, i) => {
                return <Column letters={col} colPos={i} key={i} />})}
        </div>
    );
};

export default Board;