import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Board from '../Board/Board';
import Points from '../Points/Points';
import GameOver from '../GameOver/GameOver.js';
import orderInput from '../../functions/orderInput.js';
import './styles.css';

import { resetTiles } from '../../store/tilesReducer';
import { resetInput } from '../../store/inputReducer';
import { clearTiles, rearrangeTiles, dropLetters } from '../../store/boardReducer';
import { resetOrder } from '../../store/orderReducer.js';

import { useStatusContext } from '../../context/StatusContext.js';

const MainContent = () => {
    const { isGameOver } = useStatusContext();

    const [isValid, setIsValid] = useState(false);
    const [score, setScore] = useState(0);
    const [totalPoints, setTotalPoints] = useState(score);

    const { submitted, setSubmitted } = useStatusContext();
    const dispatch = useDispatch();
    
    const board = useSelector(state => Object.values(state.board));
    const currTiles = useSelector(state => state.tiles);

    const input = useSelector(state => state.input);
    const orderedInput = orderInput(Object.values(input));

    useEffect(() => {
        const makeSearch = async () => {
            if (orderedInput.length === 1) return;
            
            const makeFetch = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${orderedInput}`);
            const fetchJSON = await makeFetch.json();

            if (!fetchJSON.title) {
                setIsValid(true);
                dispatch(clearTiles(currTiles));
                dispatch(rearrangeTiles(board));

                setScore(orderedInput.length);
                setTotalPoints(totalPoints + score);
            } else {
                dispatch(dropLetters(board));
            };
        };
 
        makeSearch();
        dispatch(resetInput());
        dispatch(resetOrder());
        dispatch(resetTiles());
    
        const interval = setTimeout(() => {
            setIsValid(false)
          }, 900);
        
        return () => clearTimeout(interval)

    }, [submitted]);

    const handleSubmit = e => {
        e.preventDefault();

        setSubmitted((submitted) => !submitted);
    };
    
    if (isGameOver) return <GameOver points={totalPoints} />;
    return (
        <div id='main-content'>
            <h1 id='header'>ThesaRush</h1>
            
            <div id='game-box'>

                <Points hidden={isValid === false} numPoints={score} />

                <div id='board'>
                    
                    <Board />
                    
                    <form onSubmit={handleSubmit}>
                        <button id='clear' onClick={() => {
                        
                            dispatch(resetInput());
                            dispatch(resetOrder());
                            }}>
                            </button>

                            <input id='word-bar' type='text' disabled={true} value={orderedInput}></input>

                        <button id='send' type='submit'></button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default MainContent;