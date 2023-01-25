import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { resetGame, resetStats } from '../../store/game';
import { resetStatuses } from '../../store/offerStatuses';
import { fetchUserData, updateUserData } from '../../store/user.js';
import { resetChallengeState, sendChallenge, updateChallenge } from '../../store/challenge';
import { setClickedProfile } from '../../store/menu';

import Badge from '../Badge/Badge.js';
import ChallengeStatus from './ChallengeStatus.js';

import { Trophy } from '@styled-icons/entypo/Trophy';

import './styles.css';

const GameOver = ({ points, numWords, longestWord, tilesCleared, bombardier, stoneCrusher, goldMiner, wordSmith, voidMaster }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const difficulty = useSelector(state => state.game.stats.difficulty);
    const menu = useSelector(state => state.menu);
    const user = useSelector(state => state.user);
    const challenge = useSelector(state => state.challenge);

    const [loaded, setLoaded] = useState(false);

    const [earnedNewTrophy, setEarnedNewTrophy] = useState(false);
    const [newTrophyName, setNewTrophyName] = useState('');

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
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.go(1);
        };
        
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
        if (user.trophies.length > user.trophiesCopy.length) {
            const trophyNames = user.trophiesCopy.map(trophy => trophy.trophy_name);
            const newTrophy = user.trophies.filter(trophy => !trophyNames.includes(trophy.trophy_name));

            setNewTrophyName(`${newTrophy[0].trophy_name}`);
            setEarnedNewTrophy(true);
        };
    }, [user]);

    useEffect(() => {
        if (earnedNewTrophy === true) {
            const trophyTimer = setTimeout(() => {
                setEarnedNewTrophy(false);
            }, 6000);

            return () => clearTimeout(trophyTimer);
        };
    }, [earnedNewTrophy]);

    useEffect(() => {
        if (playAgain === true) history.push(`/game/${difficulty}`);
    }, [playAgain])
    
    return (
        <div id='game-over' style={{background: menu.backgroundColor}}>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '-4.vh'}}>
                <div
                id='new-trophy-popup'
                onClick={e => {
                    dispatch(resetGame());
                    dispatch(resetStats());
                    dispatch(resetStatuses());
                    dispatch(resetChallengeState());

                    history.push('/');
                    dispatch(setClickedProfile(true));

                    e.preventDefault();
                }}
                style={{
                    display: earnedNewTrophy === true ? 'flex' : 'none',
                    justifyContent: 'space-evenly',
                    position: 'absolute',
                    backgroundColor: 'rgb(20, 20, 20)',
                    boxShadow: '0px 0px 10px 1px yellow',
                    border: '2px solid rgb(255, 255, 60)',
                    borderRadius: '8px',
                    width: '36vw',
                    marginTop: '-3vh',
                    cursor: 'pointer'
                }}>
                    <Trophy style={{color: 'gold', width: '2vw'}}>
                    </Trophy>

                    <p style={{fontFamily: 'Bungee Spice'}}>
                        You Earned a New Trophy: 
                        &nbsp; 
                        <b style={{fontFamily: 'Roboto', fontSize: '20px', lineHeight: '0vh'}}>{newTrophyName}</b>
                    </p>

                    <Trophy style={{color: 'gold', width: '2vw'}}>
                    </Trophy>
                </div>
            </div>

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
                <ChallengeStatus />
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
                        top: challenge.inChallenge === true ? '4vh' : '10vh',
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