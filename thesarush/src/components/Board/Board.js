import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addColumn, dropLetters, resetBoard } from '../../store/boardReducer.js';
import Column from '../Column/Column.js';
import letterGenerator from '../../functions/letterGenerator.js';

import checkGameOver from '../../functions/checkGameOver.js';
import { useStatusContext } from '../../context/StatusContext.js';

import './styles.css';

const Board = () => {
    const [switched, setSwitched] = useState(false);
    const { setGameOver } = useStatusContext();
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
        const interval = setInterval(() => {
          setSwitched((switched) => !switched);
        }, 3000);

        if (board.length) dispatch(dropLetters(board));

        if (checkGameOver(board)) {
            setGameOver(true);
            clearInterval(interval);
        };

        return () => clearInterval(interval);
    }, [switched]);

    return (
        <div className='main-board'>
            {board.map((col, i) => {
                return <Column letters={col} colPos={i} key={i} />})}
        </div>
    );
};

export default Board;