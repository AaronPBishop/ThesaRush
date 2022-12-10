import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { resetGame, resetStats } from '../../store/game';
import { updateUserData } from '../../store/user.js';

import './styles.css';

const GameOver = ({ points, numWords, longestWord, tilesCleared, bombardier, stoneCrusher, goldMiner, wordSmith, voidMaster }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const difficulty = useSelector(state => state.game.stats.difficulty);
    const menu = useSelector(state => state.menu);
    const user = useSelector(state => state.user);

    const [playAgain, setPlayAgain] = useState(false);
    const [badges, setBadges] = useState(0);

    const [clickedBombardier, setClickedBombardier] = useState(false);
    const [clickedStoneCrusher, setClickedStoneCrusher] = useState(false);
    const [clickedGoldMiner, setClickedGoldMiner] = useState(false);
    const [clickedWordSmith, setClickedWordSmith] = useState(false);
    const [clickedVoidMaster, setClickedVoidMaster] = useState(false);

    useEffect(() => {
        setBadges(bombardier + stoneCrusher + goldMiner + wordSmith + voidMaster);

        // if (user.user_id) dispatch(updateUserData(user.user_id, points, numWords, longestWord, tilesCleared, badges));
    }, []);

    useEffect(() => {
        if (user.user_id) dispatch(updateUserData(user.user_id, points, numWords, longestWord, tilesCleared, badges));
    }, [badges]);

    useEffect(() => {
        if (playAgain === true) history.push(`/game/${difficulty}`);
    }, [playAgain])
    
    return (
        <div 
        style={{backgroundColor: menu.backgroundColor}}
        id='game-over'>
            <p id='gameover-header'>Game Over!</p>

            <div id='stats-box'>
                <p>
                    Final Score: <b>{points}</b>
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

                    <li
                    onClick={() => setClickedWordSmith(clicked => !clicked)}
                    className='badges-li' 
                    style={{display: wordSmith > 0 ? 'block' : 'none'}}>
                        {
                            clickedWordSmith ? <p>Submitted 8+ letter word</p> :
                            <div>
                                <p>🛠️ Word Smith: <b>{wordSmith}</b></p>
                                <p style={{position: 'relative', left: '0.3vw'}}>+ {wordSmith * 30} points</p>
                            </div>
                        }
                    </li>

                    <li
                    onClick={() => setClickedVoidMaster(clicked => !clicked)}
                    className='badges-li' 
                    style={{display: voidMaster > 0 ? 'block' : 'none'}}>
                        {
                            clickedVoidMaster ? <p>Used 2 void tiles</p> :
                            <div>
                                <p>🪄 Void Master: <b>{voidMaster}</b></p>
                                <p>+ {voidMaster * 30} points</p>
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