import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { initiateBoard, dropLettersAction, setTileDropped } from '../../store/game.js';
import { loadOffer } from '../../store/offerStatuses.js';

import Column from '../Column/Column.js';

import letterGenerator from '../../functions/letterGenerator.js';
import checkGameOver from '../../functions/checkGameOver.js';

import './styles.css';
import { setCompletedChallenge } from '../../store/challenge.js';

const Board = ({ difficulty }) => {
    const history = useHistory();

    const dispatch = useDispatch();

    const board = useSelector(state => state.game.board);
    const user = useSelector(state => state.user);
    const paused = useSelector(state => state.offerStatuses.paused);
    const challengeState = useSelector(state => state.challenge);

    const [switched, setSwitched] = useState(false);
    const [tripped, setTripped] = useState(false);
    const [endChallenge, setEndChallenge] = useState(false);

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

    useEffect(() => {
        if (challengeState.inChallenge === true) {
            setTimeout(() => {
                setEndChallenge(true);
            }, [challengeState.time]);
        };
    }, []);

    useEffect(() => {dispatch(initiateBoard(randomColumn))}, []);

    useEffect(() => {
        if (challengeState.inChallenge === false) {
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
                        if (user.user_name && (user.points_balance >= 1000 || user.lives > 0)) {
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
        };

        if (challengeState.inChallenge === true) {
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
                setTimeout(() => {
                    if (checkGameOver(board)) {
                       history.push('/gameover');
                    };
                }, 900);
            };
    
            return () => {
                clearInterval(interval);
                clearTimeout(resetDrop);
            };
        };
    }, [switched, paused]);

    useEffect(() => {if (paused === true) history.push('/gameover')}, [tripped]);

    useEffect(() => {
        if (endChallenge === true) {
            dispatch(setCompletedChallenge(true));

            history.push('/gameover');
        };
    }, [endChallenge]);

    return (
        <div className='main-board'>
            <center>
                {board.map((col, i) => <Column letters={col} colPos={i} key={i} />)}
            </center>
        </div>
    );
};

export default Board;