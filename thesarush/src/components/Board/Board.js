import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addColumn, dropLetters, resetBoard, setTileDropped } from '../../store/gameReducer.js';
import Column from '../Column/Column.js';
import letterGenerator from '../../functions/letterGenerator.js';

import checkGameOver from '../../functions/checkGameOver.js';

import './styles.css';
import { setDifficulty } from '../../store/statsReducer.js';

const Board = ({ difficulty }) => {
    const history = useHistory();

    const [switched, setSwitched] = useState(false);
    const [boardState, setBoardState] = useState([]);

    const dispatch = useDispatch();

    const board = useSelector(state => state.game.board);

    useEffect(() => {
        setBoardState(board);
    }, [board]);

    const difficultyLevels = {
        easy: 3000,
        medium: 2500,
        hard: 1500,
        rush: 1000
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

        for (let i = 0; i < 8; i++) dispatch(addColumn(randomColumn()));

        dispatch(setDifficulty(difficulty));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
          setSwitched((switched) => !switched);

          dispatch(setTileDropped(true));
        }, difficultyLevels[difficulty]);

        const resetDrop = setTimeout(() => {
            dispatch(setTileDropped(false));

            return;
        }, 400);

        if (board.length) dispatch(dropLetters());

        if (checkGameOver(board)) {
            setTimeout(() => {
                clearInterval(interval);
                clearInterval(resetDrop);

                history.push('/gameover');
            }, 1000);
        };

        return () => {
            clearInterval(interval);
            clearInterval(resetDrop);
        };
    }, [switched]);

    return (
        <div className='main-board'>
            <center>
                {boardState.map((col, i) => <Column letters={col} colPos={i} key={i} />)}
            </center>
        </div>
    );
};

export default Board;