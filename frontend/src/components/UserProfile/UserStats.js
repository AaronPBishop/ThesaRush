import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './styles.css'

const UserStats = () => {
    const user = useSelector(state => state.user);

    const [stat, setStat] = useState('');

    useEffect(() => {
        if (stat.length) statsMap[stat][1] = !statsMap[stat][1];

        setStat('');
    }, [stat]);

    const [statsMap] = useState({
        high_score: ['High Score', false],
        points: ['Total points Earned', false],
        words: ['Valid Words Submitted', false],
        longest_word: ['Longest Word', false],
        tiles_cleared: ['Tiles Cleared', false]
    });

    return (
        <div className='user-profile-boxes'>
            <p>Player Stats</p>
            {
                Object.keys(user).map((stat, i) => {
                    return (
                        statsMap[stat] && 
                        <div 
                        onClick={() => setStat(`${stat}`)}
                        className='user-stat-boxes'
                        key={i}
                        >
                            <p style={{marginTop: statsMap[stat][1] && '-0.5vh'}}>{statsMap[stat][0]}</p>
                            {
                                statsMap[stat][1] &&
                                <p style={{
                                    marginTop: '-1vh', 
                                    color: 'rgb(223, 255, 0)', 
                                    fontWeight: 'bold', 
                                    textShadow: '0px 1px 2px black',
                                    letterSpacing: '1px'
                                }}>
                                    {user[stat]}
                                </p>
                            }
                        </div>
                    )
                })
            }
        </div>
    );
};

export default UserStats;