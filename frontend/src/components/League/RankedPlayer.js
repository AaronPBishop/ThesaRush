import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Badge from "../Badge/Badge.js";
import Trophy from "../Trophy/Trophy.js";

import './styles.css';

const RankedPlayer = ({ score, userName, index }) => {
    const ignore = ['league', 'user_name', 'trophies', 'points'];
    const badges = ['bombardier', 'stone_crusher', 'gold_miner', 'word_smith', 'void_master'];

    const user = useSelector(state => state.user);
    const rankings = useSelector(state => state.league);
    const clickedLeague = useSelector(state => state.menu.clickedLeague);

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (clickedLeague === false) setClicked(false);
    }, [clickedLeague]);

    const [statsMap] = useState({
        high_score: 'High Score',
        words: 'Valid Words Submitted',
        longest_word: 'Longest Word',
        tiles_cleared: 'Tiles Cleared',
        level: 'Level'
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
                boxShadow: '0px 1px 6px 1px black',
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
                        rankings.players[index] &&
                        orderKeys(Object.keys(rankings.players[index])).map((stat, i) => (
                            (!ignore.includes(stat) && !badges.includes(stat)) &&
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '24vw', margin: 'auto', flexWrap: 'wrap'}} key={i}>
                                <p style={{margin: '1vw'}}>{statsMap[stat]}:</p>
                                <b style={{margin: '1vw'}}>{rankings.players[index][stat]}</b>
                            </div>
                        ))          
                    }

                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '4vh'}}>
                        <div className='player-headings'>Badges</div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5vh'}}>
                        {
                            rankings.players[index] &&
                            Object.keys(rankings.players[index]).map((stat, i) => (
                                (rankings.players[index][stat] > 0 && badges.includes(stat)) &&
                                <div 
                                onClick={e => e.stopPropagation()}
                                style={{marginBottom: '1vh'}}
                                key={i}>
                                    <Badge badgeType={mapPlayerBadges[stat]} numBadges={rankings.players[index][stat]} key={i} />
                                </div>
                            ))          
                        }
                    </div>

                    <div style={{display: rankings.players[index] && rankings.players[index].trophies && rankings.players[index].trophies.length > 0 ? 'flex' : 'none', justifyContent: 'center', marginTop: '2vh'}}>
                        <div className='player-headings'>Trophies</div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5vh'}}>
                        {
                            rankings.players[index] && rankings.players[index].trophies && rankings.players[index].trophies.length > 0 &&
                            rankings.players[index].trophies.map((trophy, i) => 
                                <div
                                onClick={e => e.stopPropagation()}
                                style={{display: 'flex', justifyContent: 'center', minWidth: '16vw', maxWidth: '16vw', marginBottom: '4vh'}}
                                key={i}>
                                    <Trophy trophyType={trophy.trophy_name} key={i} />
                                </div>
                            )
                        }
                    </div>
                </div>
             
            </div>
    )
};

export default RankedPlayer;