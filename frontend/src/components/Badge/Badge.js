import { useState } from "react";

import './styles.css';

const Badge = ({ badgeType, numBadges, type='' }) => {
    const [clickedBadge, setClickedBadge] = useState(false);

    const badgeMap = {
        bombardier: ['💣', 'Bombardier', 'Use 3 bomb tiles'],
        stoneCrusher: ['🪨', 'Stone Crusher', 'Destroy 3 stone tiles'],
        goldMiner: ['🪙', 'Gold Miner', 'Clear 3 gold tiles'],
        wordSmith: ['🛠️', 'Word Smith', 'Submit 8+ letter word'],
        voidMaster: ['🪄', 'Void Master', 'Use 3 void tiles'],
        fulminator: ['⚡', 'Fulminator', 'Use 2 lightning tiles'],
        decimator: ['☢️', 'Decimator', 'Submit 12+ letter word']
    };

    return (
            type !== 'instructional' ?
            <div 
            style={{maxHeight: clickedBadge && '6vh'}}
            onClick={() => setClickedBadge(clicked => !clicked)}
            className='badges'>
                {
                    clickedBadge ? <p style={{marginTop: '1.5vh'}}>{badgeMap[badgeType][2]}</p> : 
                    <div>
                        <p style={{marginTop: '1vh'}}>{badgeMap[badgeType][0]} {badgeMap[badgeType][1]}: <b>{numBadges}</b></p>
                        <p style={{position: 'relative', left: '0.3vw', marginTop: '-2vh'}}>+ {numBadges * 30} points</p>
                    </div>
                }
            </div> : 
            <div 
            style={{maxHeight: clickedBadge && '6vh'}}
            onClick={() => setClickedBadge(clicked => !clicked)}
            className='instructional-badges-li'>
                {
                    clickedBadge ? 
                    <p style={{marginTop: '2.6vh'}}>{badgeMap[badgeType][2]}</p> : 
                    <div>
                        <p style={{marginTop: '2.5vh'}}>{badgeMap[badgeType][0]} {badgeMap[badgeType][1]}</p>
                        <p style={{position: 'relative', left: '0.6vw'}}>+ 30 points</p>
                    </div>
                }
            </div> 
    );
};

export default Badge;