import Board from '../Board/Board';
import Points from '../Points/Points';
import './styles.css';

import { useEffect, useState } from 'react';
import { useInputContext } from '../../context/InputContext.js';
import { useDispatch, useSelector } from 'react-redux';
import { resetTiles } from '../../store/tilesReducer';
import { clearTiles, rearrangeTiles } from '../../store/boardReducer';

const MainContent = () => {
    const [isValid, setIsValid] = useState(false);
    const [score, setScore] = useState(0);

    const { inputVal, setInputVal, submitted, setSubmitted } = useInputContext();
    const dispatch = useDispatch();
    
    const board = useSelector(state => Object.values(state.board));
    const currTiles = useSelector(state => state.tiles);

    useEffect(() => {
        const makeSearch = async () => {
            if (inputVal.length === 1) return;
            
            const makeFetch = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputVal.join('')}`);
            const fetchJSON = await makeFetch.json();

            if (!fetchJSON.title) {
                setIsValid(true);
                setInputVal([]);
                setScore(inputVal.length);
            } else {
                setIsValid(false)
                setInputVal([]);
            };
        };

        makeSearch();
        setInputVal([]);

        const interval = setTimeout(() => {
            setIsValid(false)
          }, 900);
        
        return () => clearTimeout(interval)

    }, [submitted]);

    const handleSubmit = e => {
        e.preventDefault();

        setSubmitted((submitted) => !submitted);
        dispatch(resetTiles());
    };

    return (
        <div id='main-content'>
            <h1 id='header'>ThesaRush</h1>
            
            <div id='game-box'>

                <Points hidden={isValid === false} numPoints={score} />

                <div id='board'>
                    
                    <Board />
                    
                    <form onSubmit={handleSubmit}>
                        <button id='clear' onClick={() => {
                            setInputVal([]);
                            }}>
                            </button>

                            <input id='word-bar' type='text' disabled={true} value={inputVal.join('')}></input>

                        <button id='send' type='submit' onClick={() => {
                            dispatch(clearTiles(currTiles));
                            dispatch(rearrangeTiles(board));
                        }}></button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default MainContent;