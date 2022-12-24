import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Badge from "../Badge/Badge.js";
import Trophy from "../Trophy/Trophy.js";

import './styles.css';

const RankedPlayer = ({ score, userName, id }) => {
    const badges = ['bombardier', 'stone_crusher', 'gold_miner', 'word_smith', 'void_master'];

    const user = useSelector(state => state.user);
    const players = useSelector(state => state.players);
    const clickedLeaderBoard = useSelector(state => state.menu.clickedLeaderBoard);

    const [clicked, setClicked] = useState(false);

    useEffect(() => {if (clickedLeaderBoard === false) setClicked(false)}, [clickedLeaderBoard])

    const [statsMap] = useState({
        points: 'Total points Earned',
        words: 'Valid Words Submitted',
        longest_word: 'Longest Word',
        tiles_cleared: 'Tiles Cleared'
    });

    const mapPlayerBadges = {
        bombardier: 'bombardier',
        stone_crusher: 'stoneCrusher',
        gold_miner: 'goldMiner',
        word_smith: 'wordSmith',
        void_master: 'voidMaster'
    };

    const orderKeys = (keys) => {
        const order = [];

        keys.forEach(key => {if (key !== 'longest_word') order.push(key)});
        order.push('longest_word');

        return order;
    };

    return (
            <div 
            onClick={() => setClicked(clicked => !clicked)}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: 'black',
                fontFamily: 'Roboto',
                flexWrap: 'wrap',
                marginBottom: '2vh',
                border: '2px solid rgb(120, 120, 255)',
                borderRadius: '12px',
                minWidth: '24vw',
                maxWidth: '24vw',
                maxHeight: !clicked && '7vh',
                overflowY: 'auto',
                cursor: 'pointer'
            }}>
                <p style={{
                    margin: '1vw',
                    color: user.user_name === userName.toString() && 'rgb(255, 255, 60)',
                    fontWeight: user.user_name === userName.toString() && 'bold'
                    }}>
                        {userName}
                    </p>
                <b style={{margin: '1vw'}}>{score}</b>
                
               <div style={{display: clicked ? 'block' : 'none', marginTop: '2vh'}}>

                    <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1vh'}}>
                        <div className='player-headings'>Stats</div>
                    </div>
                    {
                        players[id] &&
                        orderKeys(Object.keys(players[id])).map((stat, i) => (
                            (stat !== 'trophies' && !badges.includes(stat)) &&
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '24vw', margin: 'auto', flexWrap: 'wrap'}} key={i}>
                                <p style={{margin: '1vw'}}>{statsMap[stat]}:</p>
                                <b style={{margin: '1vw'}}>{players[id][stat]}</b>
                            </div>
                        ))          
                    }

                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '4vh'}}>
                        <div className='player-headings'>Badges</div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5vh'}}>
                        {
                            players[id] &&
                            Object.keys(players[id]).map((stat, i) => (
                                (players[id][stat] > 0 && badges.includes(stat)) &&
                                <div 
                                style={{marginBottom: '1vh'}}
                                onClick={e => e.stopPropagation()}>
                                    <Badge badgeType={mapPlayerBadges[stat]} numBadges={players[id][stat]} key={i} />
                                </div>
                            ))          
                        }
                    </div>

                    <div style={{display: players[id] && players[id].trophies.length > 0 ? 'flex' : 'none', justifyContent: 'center', marginTop: '4vh'}}>
                        <div className='player-headings'>Trophies</div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5vh'}}>
                        {
                            players[id] && players[id].trophies.length > 0 &&
                            players[id].trophies.map((trophy, i) =>  <Trophy trophyType={trophy.trophy_name} key={i} />)
                        }
                    </div>
                </div>
             
            </div>
    )
};

export default RankedPlayer;