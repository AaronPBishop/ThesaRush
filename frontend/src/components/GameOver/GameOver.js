import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { resetGame, resetStats } from '../../store/game';
import { resetStatuses } from '../../store/offerStatuses';
import { fetchUserData, updateUserData } from '../../store/user.js';
import { resetChallengeState, sendChallenge, updateChallenge } from '../../store/challenge';

import Badge from '../Badge/Badge.js';

import './styles.css';

const GameOver = ({ points, numWords, longestWord, tilesCleared, bombardier, stoneCrusher, goldMiner, wordSmith, voidMaster }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const difficulty = useSelector(state => state.game.stats.difficulty);
    const menu = useSelector(state => state.menu);
    const user = useSelector(state => state.user);
    const challenge = useSelector(state => state.challenge);

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

        if (challenge.inChallenge && challenge.isChallengee && challenge.completedChallenge === false) dispatch(updateChallenge(challenge.challengeId, 0));

        if (challenge.inChallenge && challenge.completedChallenge === true) {

            if (challenge.isChallenger) {
                dispatch(sendChallenge(challenge.time, points, challenge.senderId, challenge.receiverId));
                dispatch(fetchUserData(user.user_id));
            };

            if (challenge.isChallengee) {
                dispatch(updateChallenge(challenge.challengeId, points))
                dispatch(fetchUserData(user.user_id));
            };
        };
    }, []);

    useEffect(() => {
        if (playAgain === true) history.push(`/game/${difficulty}`);
    }, [playAgain])
    
    return (
        <div 
        style={{background: menu.backgroundColor}}
        id='game-over'>
            <p id='gameover-header'>Game Over!</p>
            <div
            style={{
                fontFamily: 'Roboto',
                fontSize: '20px',
                display: challenge.inChallenge ? 'flex' : 'none',
                justifyContent: 'center',
                position: 'relative',
                bottom: '14vh',
                marginBottom: '-2vh'
            }}>
                <b>{(challenge.isChallenger && challenge.completedChallenge) ? 'Challenge Sent!' : (challenge.isChallenger && challenge.completedChallenge === false) ? 'Challenge Failed' : challenge.isChallengee && challenge.completedChallenge ? 'Challenge Completed!' : challenge.isChallengee && challenge.completedChallenge === false && 'Challenge Failed'}</b>
            </div>
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
                style={{display: challenge.inChallenge && 'none'}}
                onClick={async e => {
                    dispatch(resetGame());
                    dispatch(resetStats());
                    dispatch(resetStatuses());
                    dispatch(resetChallengeState());

                    setPlayAgain(true);
                    
                    e.preventDefault();
                }}>
                    Play again?
                </button>

                <button
                    onClick={e => {
                        dispatch(resetGame());
                        dispatch(resetStats());
                        dispatch(resetStatuses());
                        dispatch(resetChallengeState());

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