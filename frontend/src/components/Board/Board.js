import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { initiateBoard, dropLettersAction, setCleared, resetInput, resetOrder, resetTiles } from '../../store/game.js';
import { loadOffer } from '../../store/offerStatuses.js';

import Column from '../Column/Column.js';

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
    const difficultyState = useSelector(state => state.game.stats.difficulty);

    const [switched, setSwitched] = useState(false);
    const [tripped, setTripped] = useState(false);
    const [numDrops, setNumDrops] = useState(0);
    const [endChallenge, setEndChallenge] = useState(false);

    const difficultyLevels = {
        training: 3500,
        easy: 2000,
        medium: 1500,
        hard: 1250,
        rush: 1000
    };

    useEffect(() => {dispatch(initiateBoard())}, []);

    useEffect(() => {if (difficultyState === undefined) history.push('/')}, []);

    useEffect(() => {
        if (challengeState.inChallenge === true) {
            const challengeTimer = setTimeout(() => {
                setEndChallenge(true);
            }, [challengeState.time]);

            return () => clearTimeout(challengeTimer);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (user.user_name) {
                if (paused === false) setSwitched(switched => !switched);
            } else {
                setSwitched(switched => !switched);
            };
        }, difficultyLevels[difficulty]);
    
        if (board.length && paused === false) {
            const trainingPlus = ['training', 'easy'];
            const medPlus = ['medium', 'hard', 'rush'];

            if (trainingPlus.includes(difficulty)) dispatch(dropLettersAction());

            if (medPlus.includes(difficulty)) {
                if (numDrops === 0) {
                    dispatch(dropLettersAction());
                    setNumDrops(1);
                } else if (numDrops === 1) {
                    for (let i = 0; i <= 1; i++) dispatch(dropLettersAction());
                    setNumDrops(0);
                };
            };
        };
    
        if (checkGameOver(board)) {
            const gracePeriod = setTimeout(() => {
                if (checkGameOver(board)) {
                    if (hasOffered < 2 && user.user_name && (user.points_balance >= 500 || user.lives > 0)) {
                        dispatch(setCleared((cleared) => !cleared));
                        dispatch(resetInput());
                        dispatch(resetOrder());
                        dispatch(resetTiles());
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