import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Navigation from '../Navigation/Navigation.js';

import { buyLife } from '../../store/user.js';

import './styles.css'

const UserProfile = () => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);
    const user = useSelector(state => state.user);

    const [clickedHighScore, setClickedHighScore] = useState(false);
    const [clickedTotalPoints, setClickedTotalPoints] = useState(false);
    const [clickedPointsBalance, setClickedPointsBalance] = useState(false);
    const [clickedValidWords, setClickedValidWords] = useState(false);
    const [clickedLongestWord, setClickedLongestWord] = useState(false);
    const [clickedTilesCleared, setClickedTilesCleared] = useState(false);
    const [clickedBadgesEarned, setClickedBadgesEarned] = useState(false);
    const [clickedLives, setClickedLives] = useState(false);

    const [error, setError] = useState('');

    return (
        <div 
        style={{backgroundColor: menu.backgroundColor}}
        id='profile-box'>
            <Navigation hidden={true} />

            <div style={{
                display: 'flex', 
                justifyContent: 'center',
                margin: 'auto',
                marginTop: '3vh',
                flexWrap: 'wrap',
                maxWidth: '75vh'
            }}>
                <div
                style={{
                    color: clickedHighScore && 'rgb(223, 255, 0)',
                    fontSize: clickedHighScore && '24px',
                    lineHeight: clickedHighScore && '2vh',
                    textShadow: clickedHighScore && '0px 1px 4px black'
                }}
                onClick={() => setClickedHighScore(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedHighScore ? <p>High Score</p> : <p>{user.high_score > 0 ? user.high_score : 'No high score achieved'}</p>}
                </div>

                <div
                style={{
                    color: clickedTotalPoints && 'rgb(223, 255, 0)',
                    fontSize: clickedTotalPoints && '24px',
                    lineHeight: clickedTotalPoints && '2vh',
                    textShadow: clickedTotalPoints && '0px 1px 4px black'
                }}
                onClick={() => setClickedTotalPoints(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedTotalPoints ? <p>Total points Earned</p> : <p>{user.points > 0 ? user.points : 'No points earned'}</p>}
                </div>

                <div
                style={{
                    color: clickedPointsBalance && 'rgb(223, 255, 0)',
                    fontSize: clickedPointsBalance && '24px',
                    lineHeight: clickedPointsBalance && '2vh',
                    textShadow: clickedPointsBalance && '0px 1px 4px black'
                }}
                onClick={() => setClickedPointsBalance(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedPointsBalance ? <p>Points Balance</p> : <p>{user.points_balance > 0 ? user.points_balance : 'No points available'}</p>}
                </div>

                <div
                style={{
                    color: clickedValidWords && 'rgb(223, 255, 0)',
                    fontSize: clickedValidWords && '24px',
                    lineHeight: clickedValidWords && '2vh',
                    textShadow: clickedValidWords && '0px 1px 4px black'
                }}
                onClick={() => setClickedValidWords(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedValidWords ? <p>Valid Words Submitted</p> : <p>{user.words > 0 ? user.words : 'No words submitted'}</p>}
                </div>

                <div
                style={{
                    color: clickedLongestWord && 'rgb(223, 255, 0)',
                    fontSize: clickedLongestWord && '20px',
                    lineHeight: clickedLongestWord && '3vh',
                    textShadow: clickedLongestWord && '0px 1px 4px black'
                }}
                onClick={() => setClickedLongestWord(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedLongestWord ? <p>Longest Word</p> : <p>{user.longest_word.length > 0 ? user.longest_word : 'No words submitted'}</p>}
                </div>

                <div
                style={{
                    color: clickedTilesCleared && 'rgb(223, 255, 0)',
                    fontSize: clickedTilesCleared && '24px',
                    lineHeight: clickedTilesCleared && '2vh',
                    textShadow: clickedTilesCleared && '0px 1px 4px black'
                }}
                onClick={() => setClickedTilesCleared(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedTilesCleared ? <p>Tiles Cleared</p> : <p>{user.tiles_cleared > 0 ? user.tiles_cleared : 'No tiles cleared'}</p>}
                </div>

                <div
                style={{
                    color: clickedBadgesEarned && 'rgb(223, 255, 0)',
                    fontSize: clickedBadgesEarned && '24px',
                    lineHeight: clickedBadgesEarned && '2vh',
                    textShadow: clickedBadgesEarned && '0px 1px 4px black'
                }}
                onClick={() => setClickedBadgesEarned(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedBadgesEarned ? <p>Badges Earned</p> : <p>{user.badges > 0 ? user.badges : 'No badges earned'}</p>}
                </div>

                <div
                style={{
                    color: clickedLives && 'rgb(223, 255, 0)',
                    fontSize: clickedLives && '24px',
                    lineHeight: clickedLives && '2vh',
                    textShadow: clickedLives && '0px 1px 4px black'
                }}
                onClick={() => setClickedLives(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedLives ? <p>Lives Available</p> : <p>{user.lives > 0 ? user.lives : 'No lives available'}</p>}
                </div>

                <div
                style={{
                    backgroundColor: 'rgb(140, 0, 55)',
                    border: 'none',
                    borderBottom: '3.5px solid rgb(105, 0, 40)',
                    borderRadius: '12px',
                    marginTop: '2vh',
                    width: '10vw',
                    padding: '1.5vh',
                    cursor: 'pointer',
                }}
                onClick={() => {
                    if (user.points_balance < 1000) {
                        setError('Not enough points');
                        return;
                    };

                    dispatch(buyLife(user.user_id));
                }}
                >
                    {
                        error.length > 0 ? error :
                        <div>
                            Buy Life
                            <br/>
                            -1,000 points
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserProfile;