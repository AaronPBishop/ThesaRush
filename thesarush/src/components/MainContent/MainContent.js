import { useEffect } from 'react';
import Board from '../Board/Board';
import { useInputContext } from '../../context/InputContext.js';
import { useDispatch, useSelector } from 'react-redux';
import { resetTiles } from '../../store/tilesReducer';
import { clearTiles } from '../../store/boardReducer';
import './styles.css';

const MainContent = () => {
    const { inputVal, setInputVal, submitted, setSubmitted } = useInputContext();
    const dispatch = useDispatch();
    const currTiles = useSelector(state => state.tiles);

    useEffect(() => {
        const makeSearch = async () => {
            const makeFetch = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputVal.join('')}`);
            const fetchJSON = await makeFetch.json();

            if (!fetchJSON.title) {
                console.log(`+${inputVal.length} points!`)
                setInputVal([]);
            } else {
                console.log(`Invalid word, you lose ${inputVal.length} points!`);
                setInputVal([]);
            };
        };

        makeSearch();
        setInputVal([]);
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

                <div id='board'>
                    
                    <Board />
                    
                    <form onSubmit={handleSubmit}>
                        <button id='clear' onClick={() => {
                            setInputVal([]);
                            }}>
                            </button>

                            <input id='word-bar' type='text' disabled={true} value={inputVal.join('')}></input>

                        <button id='send' type='submit'
                        onClick={() => {
                            dispatch(clearTiles(currTiles))
                            }}></button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default MainContent;