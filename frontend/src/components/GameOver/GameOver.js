import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { resetGame, resetStats } from '../../store/game';
import { updateUserData } from '../../store/user.js';

import Badge from '../Badge/Badge.js';

import './styles.css';

const GameOver = ({ points, numWords, longestWord, tilesCleared, bombardier, stoneCrusher, goldMiner, wordSmith, voidMaster }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const difficulty = useSelector(state => state.game.stats.difficulty);
    const menu = useSelector(state => state.menu);
    const user = useSelector(state => state.user);

    const [playAgain, setPlayAgain] = useState(false);
    const [badges, setBadges] = useState(0);

    const mapBadges = {
        bombardier: bombardier,
        stoneCrusher: stoneCrusher,
        goldMiner: goldMiner,
        wordSmith: wordSmith,
        voidMaster: voidMaster
    };

    useEffect(() => {
        setBadges(bombardier + stoneCrusher + goldMiner + wordSmith + voidMaster);
        
        if (user.user_id) dispatch(updateUserData(user.user_id, points, numWords, longestWord, tilesCleared, bombardier, stoneCrusher, goldMiner, wordSmith, voidMaster));
    }, []);

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

                {
                    badges > 0 &&
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        position: 'relative',
                        top: '1vh'
                    }}>
                        {
                            Object.keys(mapBadges).map((badge, i) => {
                                if (mapBadges[badge] > 0) return (
                                    <Badge badgeType={badge} numBadges={mapBadges[badge]} key={i} />
                                );
                            })
                        }
                    </div>
                }
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