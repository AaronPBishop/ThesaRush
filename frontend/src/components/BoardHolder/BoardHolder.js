import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Board from '../Board/Board';
import Points from '../Scoring/Points';
import InGameBadges from '../Scoring/InGameBadges';
import orderInput from '../../functions/orderInput.js';
import OfferLife from './OfferLife.js';

import './styles.css';

import { 
    clearTiles, 
    rearrangeTiles, 
    dropLettersAction, 
    dropRow, 
    resetOrder, 
    resetTiles, 
    resetInput,
    setCleared,
    setSubmitted,
    resetGame,
    incrementInvalidWords, 
    determinePoints, 
    addToScore,
    resetPoints, 
    incrementWords, 
    setLongestWord,
    resetStats,
    removeLastChar
} from '../../store/game';

import { resetStatuses } from '../../store/statuses';

const BoardHolder = ({ dictionary, bombardier, stoneCrusher, goldMiner, wordSmith, voidMaster }) => {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    const [isValid, setIsValid] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const [earnedBadge, setEarnedBadge] = useState(false);
    const [currBadge, setCurrBadge] = useState('');

    const submitted = useSelector(state => state.game.statuses.submitted);
    const tileDropped = useSelector(state => state.game.statuses.tileDropped);

    const input = useSelector(state => state.game.input);
    const orderedInput = orderInput(Object.values(input));

    const invalidWords = useSelector(state => state.game.stats.invalidWords)
    const points = useSelector(state => state.game.stats.points);
    const score = useSelector(state => state.game.stats.score);

    const menu = useSelector(state => state.menu);
 
    useEffect(() => {
        const makeSearch = async () => {
            if (orderedInput.length <= 2) return;
  
            if (dictionary[orderedInput.toLowerCase()]) {
                setIsValid(true);
                dispatch(clearTiles());
                dispatch(rearrangeTiles());

                dispatch(determinePoints(orderedInput.length, orderedInput));
                dispatch(incrementWords());
                dispatch(setLongestWord(orderedInput));
            } else {
                dispatch(incrementInvalidWords());
                setInvalid(true);

                if (invalidWords <= 1) {
                    for (let i = 0; i <= invalidWords; i++) dispatch(dropLettersAction());
                };

                if (invalidWords > 1) dispatch(dropRow());
            };

            dispatch(resetInput());
            dispatch(resetOrder());
            dispatch(resetTiles());

            return;
        };

        makeSearch();
 
        const timer = setTimeout(() => {
            setIsValid(false);
            setInvalid(false);
            dispatch(resetPoints());
        }, 1000);
        
        return () => clearTimeout(timer);

    }, [submitted]);

    const handleSubmit = () => {
        if (tileDropped === true) {
            setTimeout(() => {
                dispatch(setSubmitted((submitted) => !submitted));
            }, 400)
        };

        if (tileDropped === false) dispatch(setSubmitted((submitted) => !submitted));
    };

    useEffect(() => {
        const keyDownHandler = e => {
            e.preventDefault();

    
            if (e.code === 'Space') handleSubmit();

            if (e.code === 'Tab') {
                dispatch(setCleared((cleared) => !cleared));

                dispatch(resetInput());
                dispatch(resetOrder());
                dispatch(resetTiles());
            };

            if (e.keyCode === 81) {
                dispatch(removeLastChar());
            };
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => document.removeEventListener('keydown', keyDownHandler);
    }, []);

    useEffect(() => {
        if (bombardier > 0) {
            dispatch(addToScore(30));
            setIsValid(true);
            setEarnedBadge(true);
            setCurrBadge('bombardier');

            const timer = setTimeout(() => {
                dispatch(resetPoints());
                setIsValid(false);
                setEarnedBadge(false);
            }, 1000);

            return () => clearTimeout(timer);
        };
    }, [bombardier]);

    useEffect(() => {
        if (stoneCrusher > 0) {
            dispatch(addToScore(30));
            setIsValid(true);
            setEarnedBadge(true);
            setCurrBadge('stoneCrusher');
            
            const timer = setTimeout(() => {
                dispatch(resetPoints());
                setIsValid(false);
                setEarnedBadge(false);
                setCurrBadge('');
            }, 1000);
        
            return () => clearTimeout(timer);
        };
    }, [stoneCrusher]);

    useEffect(() => {
        if (goldMiner > 0) {
            dispatch(addToScore(30));
            setIsValid(true);
            setEarnedBadge(true);
            setCurrBadge('goldMiner');
            
            const timer = setTimeout(() => {
                dispatch(resetPoints());
                setIsValid(false);
                setEarnedBadge(false);
                setCurrBadge('');
            }, 1000);
        
            return () => clearTimeout(timer);
        };
    }, [goldMiner]);

    useEffect(() => {
        if (wordSmith > 0) {
            dispatch(addToScore(30));
            setIsValid(true);
            setEarnedBadge(true);
            setCurrBadge('wordSmith');
            
            const timer = setTimeout(() => {
                dispatch(resetPoints());
                setIsValid(false);
                setEarnedBadge(false);
                setCurrBadge('');
            }, 1000);
        
            return () => clearTimeout(timer);
        };
    }, [wordSmith]);

    useEffect(() => {
        if (voidMaster > 0) {
            dispatch(addToScore(30));
            setIsValid(true);
            setEarnedBadge(true);
            setCurrBadge('voidMaster');
            
            const timer = setTimeout(() => {
                dispatch(resetPoints());
                setIsValid(false);
                setEarnedBadge(false);
                setCurrBadge('');
            }, 1000);
        
            return () => clearTimeout(timer);
        };
    }, [voidMaster]);
    
    return (
        <div id='main-content'>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div id='score-tab'>
                    Score: <b>{score}</b>
                </div>

                <h1 
                onClick={e => { 
                    dispatch(resetGame());
                    dispatch(resetStats());
                    dispatch(resetStatuses());

                    history.push('/');

                    e.preventDefault();
                }}
                id='header'>
                    ThesaRush
                </h1>
            </div>
            
            <div 
            id='game-box'
            style={{
                boxShadow: invalid === false ? 
                '0px 10px 20px rgb(0, 110, 0)' : 
                '0px 20px 40px 20px rgb(210, 4, 45)',
                background: menu.backgroundColor
            }}>

                <div style={{position: 'absolute'}}>
                    <Points hidden={isValid === false} numPoints={points} />
                    <InGameBadges hidden={earnedBadge === false} badge={currBadge} />
                </div>

                <OfferLife />

                <div id='board'>
                    
                    <Board difficulty={params.difficulty} />
                    
                    <form
                    onSubmit={e => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className='input-actions'>
                        <button type='reset' id='clear' onClick={() => {
                            dispatch(setCleared((cleared) => !cleared));
                            dispatch(resetInput());
                            dispatch(resetOrder());
                            dispatch(resetTiles());
                        }}>
                        </button>

                        <input 
                        id='word-bar' 
                        type='text' 
                        disabled={true} 
                        value={orderedInput}>
                        </input>

                        <button id='send' type='submit'></button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BoardHolder;