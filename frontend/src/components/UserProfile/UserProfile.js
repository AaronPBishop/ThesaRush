import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Navigation from '../Navigation/Navigation.js';

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

    return (
        <div 
        style={{backgroundColor: menu.backgroundColor}}
        id='profile-box'>
            <Navigation hidden={true} />

            <div style={{
                display: 'flex', 
                justifyContent: 'center',
                margin: 'auto',
                marginTop: '4vh',
                flexWrap: 'wrap',
                maxWidth: '75vh'
            }}>
                <div
                onClick={() => setClickedHighScore(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedHighScore ? <p>High Score</p> : <p>{user.high_score > 0 ? user.high_score : 'No high score achieved'}</p>}
                </div>

                <div
                onClick={() => setClickedTotalPoints(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedTotalPoints ? <p>Total points Earned</p> : <p>{user.points > 0 ? user.points : 'No points earned'}</p>}
                </div>

                <div
                onClick={() => setClickedPointsBalance(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedPointsBalance ? <p>Points Balance Available</p> : <p>{user.points_balance > 0 ? user.points_balance : 'No points available'}</p>}
                </div>

                <div
                onClick={() => setClickedValidWords(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedValidWords ? <p>Valid Words Submitted</p> : <p>{user.words > 0 ? user.words : 'No words submitted'}</p>}
                </div>

                <div
                onClick={() => setClickedLongestWord(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedLongestWord ? <p>Longest Word</p> : <p>{user.longest_word !== null ? user.longest_word : 'No words submitted'}</p>}
                </div>

                <div
                onClick={() => setClickedTilesCleared(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedTilesCleared ? <p>Tiles Cleared</p> : <p>{user.tiles_cleared > 0 ? user.tiles_cleared : 'No tiles cleared'}</p>}
                </div>

                <div
                onClick={() => setClickedBadgesEarned(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedBadgesEarned ? <p>Badges Earned</p> : <p>{user.badges > 0 ? user.badges : 'No badges earned'}</p>}
                </div>

                <div
                onClick={() => setClickedLives(clicked => !clicked)}
                className='user-stat-boxes'
                >
                    {!clickedLives ? <p>Lives Available</p> : <p>{user.lives > 0 ? user.lives : 'No lives available'}</p>}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;