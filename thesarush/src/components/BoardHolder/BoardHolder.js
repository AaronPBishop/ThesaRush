import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Board from '../Board/Board';
import Points from '../Points/Points';
import orderInput from '../../functions/orderInput.js';
import './styles.css';

import { resetTiles } from '../../store/tilesReducer';
import { resetInput } from '../../store/inputReducer';
import { clearTiles, rearrangeTiles, dropLetters, dropRow } from '../../store/boardReducer';
import { resetOrder } from '../../store/orderReducer.js';
import { incrementInvalidWords, determinePoints, resetPoints, incrementWords, setLongestWord } from '../../store/statsReducer.js';

import { useStatusContext } from '../../context/StatusContext.js';

const BoardHolder = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const [isValid, setIsValid] = useState(false);

    const { setCleared, submitted, setSubmitted, tileDropped } = useStatusContext();
    
    const currTiles = useSelector(state => state.tiles);

    const input = useSelector(state => state.input);
    const orderedInput = orderInput(Object.values(input));

    const invalidWords = useSelector(state => state.stats.invalidWords)
    const points = useSelector(state => state.stats.points);
 
    useEffect(() => {
        const makeSearch = async () => {
            if (orderedInput.length <= 1) return;
            
            const makeFetch = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${orderedInput}`);
            const fetchJSON = await makeFetch.json();

            if (!fetchJSON.title) {
                setIsValid(true);
                dispatch(clearTiles(currTiles));
                dispatch(rearrangeTiles());

                dispatch(determinePoints(orderedInput.length, orderedInput));
                dispatch(incrementWords());
                dispatch(setLongestWord(orderedInput));
            } else {
                dispatch(incrementInvalidWords());

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
 
        const interval = setTimeout(() => {
            setIsValid(false);
            dispatch(resetPoints());
        }, 1000);
        
        return () => clearTimeout(interval);

    }, [submitted]);

    const handleSubmit = () => {
        if (tileDropped === true) {
            setInterval(() => {
                setSubmitted((submitted) => !submitted);
            }, 400)
        };

        if (tileDropped === false) setSubmitted((submitted) => !submitted);
    };

    useEffect(() => {
        const keyDownHandler = e => {
          e.preventDefault();
    
          if (e.code === 'Space') handleSubmit();

          if (e.code === 'Tab') {
            setCleared((cleared) => !cleared);
                            
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
            <h1 id='header'>ThesaRush</h1>
            
            <div id='game-box'>

                <div style={{position: 'absolute'}}>
                    <Points hidden={isValid === false} numPoints={points} />
                </div>

                <div id='board'>
                    
                    <Board difficulty={params.difficulty} />
                    
                    <form
                    onSubmit={e => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className='input-actions'>
                            <button type='reset' id='clear' onClick={() => {
                                setCleared((cleared) => !cleared);

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