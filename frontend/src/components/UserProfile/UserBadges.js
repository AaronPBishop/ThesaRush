import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Badge from '../Badge/Badge.js';

import './styles.css';

const UserBadges = () => {
    const user = useSelector(state => state.user);

    const [earnedBadge, setEarnedBadge] = useState(false);

    const mapUserBadges = {
        bombardier: user.bombardier,
        stoneCrusher: user.stone_crusher,
        goldMiner: user.gold_miner,
        wordSmith: user.word_smith,
        voidMaster: user.void_master,
        fulminator: user.fulminator
    };

    useEffect(() => {
        for (let key in mapUserBadges) if (mapUserBadges[key] > 0) setEarnedBadge(true);
    }, []);

    return (
        <div
        className='user-profile-boxes'>
            <p style={{width: '10vw'}}>Badges Earned</p>

            {
                !earnedBadge ? 
                <div style={{marginTop: '-15vh', fontSize: '18px'}}>
                    <p><b>No badges earned yet.</b></p>
                    <p><b>Play the game and earn some!</b></p>
                </div> :
                Object.keys(mapUserBadges).map((badge, i) => {
                    if (mapUserBadges[badge] > 0) return (
                        <Badge badgeType={badge} numBadges={mapUserBadges[badge]} key={i} />
                    );
                })
            }
        </div>
    );
};

export default UserBadges;