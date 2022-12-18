import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { initiateBoard, dropLettersAction, setTileDropped } from '../../store/game.js';
import { loadOffer } from '../../store/statuses.js';

import Column from '../Column/Column.js';

import letterGenerator from '../../functions/letterGenerator.js';
import checkGameOver from '../../functions/checkGameOver.js';

import './styles.css';

const Board = ({ difficulty }) => {
    const history = useHistory();

    const dispatch = useDispatch();

    const board = useSelector(state => state.game.board);
    const user = useSelector(state => state.user);
    const paused = useSelector(state => state.statuses.paused);

    const [switched, setSwitched] = useState(false);
    const [tripped, setTripped] = useState(false);

    const difficultyLevels = {
        easy: 2000,
        medium: 1500,
        hard: 1200,
        rush: 1000
    };

    const randomColumn = () => {
        const column = [];

        for (let i = 0; i < 11; i++) {
            if (i > 7) column.push(letterGenerator('initial'));
            else column.push(null);
        };
        
        return column;
    };

    useEffect(() => {dispatch(initiateBoard(randomColumn))}, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (user.user_name) {
                if (paused === false) {
                    setSwitched(switched => !switched);
    
                    dispatch(setTileDropped(true));
                };
            } else {
                setSwitched(switched => !switched);
    
                dispatch(setTileDropped(true));
            };
        }, difficultyLevels[difficulty]);

        const resetDrop = setTimeout(() => {dispatch(setTileDropped(false))}, 400);

        if (board.length) dispatch(dropLettersAction());

        if (checkGameOver(board)) {
            const gracePeriod = setTimeout(() => {
                if (checkGameOver(board)) {
                    if (user.user_name) {
                        dispatch(loadOffer(true));

                        const offerAllotment = setTimeout(() => {
                            setTripped(tripped => !tripped);

                            clearTimeout(gracePeriod);
                            clearTimeout(offerAllotment);
                        }, 6000);
                    } else {
                        clearTimeout(gracePeriod);
                        history.push('/gameover');
                    };
                };
            }, 900);
        };

        return () => {
            clearInterval(interval);
            clearTimeout(resetDrop);
        };
    }, [switched, paused]);

    useEffect(() => {if (paused === true) history.push('/gameover')}, [tripped]);

    return (
        <div className='main-board'>
            <center>
                {board.map((col, i) => <Column letters={col} colPos={i} key={i} />)}
            </center>
        </div>
    );
};

export default Board;