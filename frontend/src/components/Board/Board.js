import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { initiateBoard, dropLettersAction } from '../../store/game.js';
import { loadOffer } from '../../store/offerStatuses.js';

import Column from '../Column/Column.js';

import letterGenerator from '../../functions/letterGenerator.js';
import checkGameOver from '../../functions/checkGameOver.js';
import { setCompletedChallenge } from '../../store/challenge.js';

import './styles.css';

const Board = ({ difficulty }) => {
    const history = useHistory();

    const dispatch = useDispatch();

    const board = useSelector(state => state.game.board);
    const user = useSelector(state => state.user);
    const paused = useSelector(state => state.offerStatuses.paused);
    const hasOffered = useSelector(state => state.offerStatuses.hasOffered);
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
            const challengeTimer = setTimeout(() => {
                setEndChallenge(true);
            }, [challengeState.time]);

            return () => clearTimeout(challengeTimer);
        };
    }, []);

    useEffect(() => {dispatch(initiateBoard(randomColumn))}, []);

    useEffect(() => {
        if (challengeState.inChallenge === false) {
            const interval = setInterval(() => {
                if (user.user_name) {
                    if (paused === false) setSwitched(switched => !switched);
                } else {
                    setSwitched(switched => !switched);
                };
            }, difficultyLevels[difficulty]);
    
            if (board.length) dispatch(dropLettersAction());
    
            if (checkGameOver(board)) {
                const gracePeriod = setTimeout(() => {
                    if (checkGameOver(board)) {
                        if (hasOffered < 2 && user.user_name && (user.points_balance >= 1000 || user.lives > 0)) {
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
    
            return () => clearInterval(interval);
        };

        if (challengeState.inChallenge === true) {
            const interval = setInterval(() => {
                if (user.user_name) {
                    if (paused === false) setSwitched(switched => !switched);
                } else {
                    setSwitched(switched => !switched);
                };
            }, difficultyLevels[difficulty]);
    
            if (board.length) dispatch(dropLettersAction());
    
            if (checkGameOver(board)) {
                const gracePeriod = setTimeout(() => {
                    if (checkGameOver(board)) history.push('/gameover');
                }, 900);

                return () => clearTimeout(gracePeriod);
            };
    
            return () => clearInterval(interval);
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
        <div>
            <center>
                {board.map((col, i) => <Column letters={col} colPos={i} key={i} />)}
            </center>
        </div>
    );
};

export default Board;