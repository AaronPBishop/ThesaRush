import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { resetGame, resetStats } from '../../store/gameReducer';

import './styles.css';

const GameOver = ({ points, numWords, longestWord, tilesCleared, bombardier, stoneCrusher, goldMiner }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const difficulty = useSelector(state => state.game.stats.difficulty);
    const theme = useSelector(state => state.theme);

    const [playAgain, setPlayAgain] = useState(false);
    const [badges, setBadges] = useState(0);
    const [finalScore, setFinalScore] = useState(points);

    const [clickedBombardier, setClickedBombardier] = useState(false);
    const [clickedStoneCrusher, setClickedStoneCrusher] = useState(false);
    const [clickedGoldMiner, setClickedGoldMiner] = useState(false);

    useEffect(() => {
        setBadges(bombardier + stoneCrusher + goldMiner);
    }, []);

    useEffect(() => {
        setFinalScore(finalScore + (badges * 30));
    }, [badges]);

    useEffect(() => {
        if (playAgain === true) history.push(`/game/${difficulty}`);
    }, [playAgain])
    
    return (
        <div 
        style={{backgroundColor: theme.backgroundColor}}
        id='game-over'>
            <p id='gameover-header'>Game Over!</p>

            <div id='stats-box'>
                <p>
                    Final Score: <b>{finalScore}</b>
                </p>

                <p>
                    Total Words: <b>{numWords}</b>
                </p>
                
                <p>
                    Longest Word: <b>{longestWord}</b>
                </p>

                <p>
                    Tiles Cleared: <b>{tilesCleared}</b>
                </p>

                <p>
                    Badges: <b>{badges}</b>
                </p>

                <ul 
                style={{
                    display: badges > 0 ? 'block' : 'none', 
                    marginLeft: '0.2vw',
                    listStyle: 'none', 
                    textAlign: 'left',
                    position: 'relative',
                    top: '0.5vh'
                }}>
                    <li 
                    onClick={() => setClickedBombardier(clicked => !clicked)}
                    className='badges-li'
                    style={{display: bombardier > 0 ? 'block' : 'none'}}>
                        {
                            clickedBombardier ? <p>Used 2 bomb tiles</p> : 
                            <div>
                                <p>💣 Bombardier: <b>{bombardier}</b></p>
                                <p style={{position: 'relative', left: '0.3vw'}}>+ {bombardier * 30} points</p>
                            </div>
                        }
                    </li>

                    <li
                    onClick={() => setClickedStoneCrusher(clicked => !clicked)}
                    className='badges-li' 
                    style={{display: stoneCrusher > 0 ? 'block' : 'none'}}>
                        {
                            clickedStoneCrusher ? <p>Destroyed 3 stone tiles</p> :
                            <div>
                                <p>🪨 Stone Crusher: <b>{stoneCrusher}</b></p>
                                <p style={{position: 'relative', left: '0.3vw'}}>+ {stoneCrusher * 30} points</p>
                            </div>
                        }
                    </li>

                    <li
                    onClick={() => setClickedGoldMiner(clicked => !clicked)}
                    className='badges-li' 
                    style={{display: goldMiner > 0 ? 'block' : 'none'}}>
                        {
                            clickedGoldMiner ? <p>Cleared 3 gold tiles</p> :
                            <div>
                                <p>🪙 Gold Miner: <b>{goldMiner}</b></p>
                                <p style={{position: 'relative', left: '0.3vw'}}>+ {goldMiner * 30} points</p>
                            </div>
                        }
                    </li>
                </ul>
            </div>

            <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                maxWidth: '50vw'
            }}>
                <button 
                id='play-again' 
                onClick={async e => {
                    dispatch(resetGame());
                    dispatch(resetStats());

                    setPlayAgain(true);
                    
                    e.preventDefault();
                }}>
                    Play again?
                </button>

                <button
                    onClick={e => {
                        dispatch(resetGame());
                        dispatch(resetStats());

                        history.push('/');

                        e.preventDefault();
                    }}
                    style={{
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        position: 'relative',
                        top: '10vh',
                        color: 'rgb(255, 255, 0)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        Main Menu
                    </button>
            </div>
        </div>
    );
};

export default GameOver;