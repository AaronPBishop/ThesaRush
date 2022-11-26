import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Board from '../Board/Board';
import Points from '../Points/Points';
import orderInput from '../../functions/orderInput.js';
import './styles.css';

import { 
    clearTiles, 
    rearrangeTiles, 
    dropLetters, 
    dropRow, 
    resetOrder, 
    resetTiles, 
    resetInput,
    setCleared,
    setSubmitted,
    resetGame
} from '../../store/gameReducer';

import { 
    incrementInvalidWords, 
    determinePoints, 
    resetPoints, 
    incrementWords, 
    setLongestWord,
    resetStats
} from '../../store/statsReducer.js';

const BoardHolder = () => {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    const [isValid, setIsValid] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [formInput, setFormInput] = useState('');

    const state = useSelector(state => state.game);
    const submitted = useSelector(state => state.game.submitted);
    const tileDropped = useSelector(state => state.game.tileDropped);

    const input = useSelector(state => state.game.input);
    const orderedInput = orderInput(Object.values(input));

    const invalidWords = useSelector(state => state.stats.invalidWords)
    const points = useSelector(state => state.stats.points);

    const theme = useSelector(state => state.theme);

    useEffect(() => {
        setFormInput(orderedInput);
    }, [state]);
 
    useEffect(() => {
        const makeSearch = async () => {
            if (orderedInput.length <= 1) return;
            
            const makeFetch = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${orderedInput}`);
            const fetchJSON = await makeFetch.json();

            if (!fetchJSON.title) {
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
                    for (let i = 0; i <= invalidWords; i++) dispatch(dropLetters());
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
            setInterval(() => {
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
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => document.removeEventListener('keydown', keyDownHandler);
    }, []);
    
    return (
        <div id='main-content'>
            <h1 
            onClick={e => { 
                dispatch(resetGame());
                dispatch(resetStats());

                history.push('/');

                e.preventDefault();
            }}
            id='header'>
                ThesaRush
            </h1>
            
            <div 
            id='game-box'
            style={{
                boxShadow: invalid === false ? 
                '0px 10px 20px rgb(0, 110, 0)' : 
                '0px 20px 40px 20px rgb(210, 4, 45)',
                backgroundColor: theme.backgroundColor
                }}>

                <div style={{position: 'absolute'}}>
                    <Points hidden={isValid === false} numPoints={points} />
                </div>

                <div id='board'>
                    
                    <Board difficulty={params.difficulty} invalidSubmit={''} />
                    
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
                            value={formInput}>
                            </input>

                        <button id='send' type='submit'></button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BoardHolder;