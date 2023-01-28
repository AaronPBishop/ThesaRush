import { useState } from 'react';
import { useSelector } from 'react-redux';

import StatBox from './StatBox';

import './styles.css'

const UserStats = () => {
    const user = useSelector(state => state.user);

    const [statsMap] = useState({
        high_score: 'High Score',
        points: 'Total Points Earned',
        words: 'Valid Words Submitted',
        longest_word: 'Longest Word',
        tiles_cleared: 'Tiles Cleared'
    });

    return (
        <div 
        className='user-profile-boxes'>
            <p>Player Stats</p>
            {
                Object.keys(user).map((stat, i) => statsMap[stat] && 
                <div style={{minHeight: '8vh', maxHeight: '8vh', marginBottom: '7vh'}} key={i}>
                    <StatBox statName={statsMap[stat]} statTotal={user[stat]} />
                </div>)
            }
        </div>
    );
};

export default UserStats;