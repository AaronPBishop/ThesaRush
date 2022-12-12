import { useState } from "react";

import './styles.css';

const Badge = ({ badgeType, numBadges, type='' }) => {
    const [clickedBadge, setClickedBadge] = useState(false);

    const badgeMap = {
        bombardier: ['💣', 'Bombardier', 'Used 2 bomb tiles'],
        stoneCrusher: ['🪨', 'Stone Crusher', 'Destroyed 3 stone tiles'],
        goldMiner: ['🪙', 'Gold Miner', 'Cleared 3 gold tiles'],
        wordSmith: ['🛠️', 'Word Smith', 'Submitted 8+ letter word'],
        voidMaster: ['🪄', 'Void Master', 'Used 2 void tiles']
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