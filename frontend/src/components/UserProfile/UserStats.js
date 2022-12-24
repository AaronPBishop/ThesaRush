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
                Object.keys(user).map((stat, i) => statsMap[stat] && <StatBox statName={statsMap[stat]} statTotal={user[stat]} key={i} />)
            }
        </div>
    );
};

export default UserStats;