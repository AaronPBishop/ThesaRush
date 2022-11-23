import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addColumn, dropLetters, resetBoard } from '../../store/boardReducer.js';
import Column from '../Column/Column.js';
import letterGenerator from '../../functions/letterGenerator.js';

import checkGameOver from '../../functions/checkGameOver.js';
import { useStatusContext } from '../../context/StatusContext.js';

import './styles.css';

const Board = ({ difficulty }) => {
    const [switched, setSwitched] = useState(false);
    const { setGameOver, setTileDropped } = useStatusContext();

    const dispatch = useDispatch();

    const board = useSelector(state => Object.values(state.board));

    const difficultyLevels = {
        easy: 3500,
        medium: 3000,
        hard: 2000,
        rush: 1500
    };

    const randomColumn = () => {
        const column = [];

        for (let i = 0; i < 11; i++) {
            if (i > 7) column.push(letterGenerator('initial'));
            else column.push(null)
        };
        
        return column;
    };

    useEffect(() => {
        dispatch(resetBoard());

        for (let i = 0; i < 8; i++) {
            dispatch(addColumn(randomColumn()));
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
          setSwitched((switched) => !switched);

          setTileDropped(true);
        }, difficultyLevels[difficulty]);

        const resetDrop = setInterval(() => {
            setTileDropped(false);
        }, 400);

        if (board.length) dispatch(dropLetters());

        if (checkGameOver(board)) {
            setInterval(() => {
                setGameOver(true);
                clearInterval(interval);
            }, 200);
        };

        return () => {
            clearInterval(interval);
            clearInterval(resetDrop);
        };
    }, [switched]);

    return (
        <div className='main-board'>
            <center>
                {board.map((col, i) => <Column letters={col} colPos={i} />)}
            </center>
        </div>
    );
};

export default Board;