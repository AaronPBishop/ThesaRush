import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Badge from "../Badge/Badge.js";
import TrophyComponent from "../TrophyComponent/TrophyComponent.js";
import ChallengeTime from "./ChallengeTime.js";

import { StarEmphasis } from '@styled-icons/fluentui-system-filled/StarEmphasis';

import './styles.css';

const RankedPlayer = ({ score, userName, index }) => {
    const ignore = ['league', 'user_name', 'trophies', 'points', 'player_id'];
    const badges = ['bombardier', 'stone_crusher', 'gold_miner', 'word_smith', 'void_master', 'fulminator'];

    const user = useSelector(state => state.user);
    const rankings = useSelector(state => state.league);
    const clickedLeague = useSelector(state => state.menu.clickedLeague);

    const [clicked, setClicked] = useState(false);
    const [hasBadges, setHasBadges] = useState(false);
    const [clickedChallenge, setClickedChallenge] = useState(false);

    const [statsMap] = useState({
        high_score: 'High Score',
        words: 'Valid Words Submitted',
        longest_word: 'Longest Word',
        tiles_cleared: 'Tiles Cleared',
        level: 'Level',
        wins: 'Wins',
        losses: 'Losses'
    });

    const mapPlayerBadges = {
        bombardier: 'bombardier',
        stone_crusher: 'stoneCrusher',
        gold_miner: 'goldMiner',
        word_smith: 'wordSmith',
        void_master: 'voidMaster',
        fulminator: 'fulminator'
    };

    const mapStarColor = {
        'Bronze': 'white',
        'Silver': 'rgb(0, 110, 255)',
        'Gold': 'purple',
        'Ethereal': 'red',
        'Galaxy': 'rgb(255, 110, 0)',
        'Cosmic': 'yellow'
    };

    const orderKeys = (keys) => {
        const order = [];

        keys.forEach(key => {if (key !== 'longest_word' && key !== 'wins' && key !== 'losses') order.push(key)});
        order.push('longest_word');
        order.push('wins');
        order.push('losses');

        return order;
    };

    useEffect(() => {
        const totalBadges = Object.keys(rankings.players[index]).filter(badge => Object.keys(mapPlayerBadges).includes(badge) && rankings.players[index][badge] > 0);

        if (totalBadges.length > 0) setHasBadges(true);
    }, []);

    useEffect(() => {
        if (clickedLeague === false) setClicked(false);
    }, [clickedLeague]);

    if (clickedChallenge) return (
        <div
        onClick={e => {
            e.stopPropagation();
            setClickedChallenge(clicked => !clicked);
        }} 
        style={{display: 'flex', justifyContent: 'center', cursor: 'pointer'}}>
            <ChallengeTime senderId={user.user_id} receiverId={rankings.players[index].player_id} />
        </div>
    );

    if (!clickedChallenge) return (
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
                minWidth: '32vw',
                maxWidth: '32vw',
                maxHeight: '6vh',
                maxHeight: !clicked && '7vh',
                cursor: 'pointer'
            }}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <StarEmphasis
                    style={{
                        marginLeft: '0.5vw',
                        marginRight: '-0.5vw',
                        color: mapStarColor[rankings.league],
                        width: '1.4vw'
                    }}>
                    </StarEmphasis>

                    <p style={{
                        textAlign: 'left',
                        width: '4vw',
                        marginLeft: '1vw',
                        color: user.user_name === userName.toString() && 'rgb(95, 255, 0)',
                        fontWeight: user.user_name === userName.toString() && 'bold'
                        }}>
                            {userName}
                    </p>
                </div>

                <div 
                onClick={e => {
                    e.stopPropagation();
                    setClickedChallenge(clicked => !clicked);
                }}
                style={{
                    display: !user.user_id || user.user_name === userName.toString() || clicked ? 'none' : 'block',
                    fontFamily: 'Roboto',
                    fontSize: '12px',
                    lineHeight: '8px',
                    height: '4vh',
                    width: '6vw',
                    backgroundColor: 'rgb(140, 0, 55)',
                    borderBottom: '3px solid rgb(105, 0, 40)',
                    borderRadius: '8px',
                    margin: 'auto',
                    cursor: 'pointer'
                }}>
                    <p>Challenge</p>
                </div>
                
                <div style={{marginRight: '0.6vw', marginTop: '2vh'}}>
                    <b 
                    style={{
                        textAlign: 'right'
                    }}>
                        {score}
                    </b>
                </div>
    
                
               <div style={{display: clicked ? 'block' : 'none', marginTop: '2vh', maxHeight: '56vh', overflowY: 'auto', overflowX: 'hidden'}}>

                    <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1vh'}}>
                        <div className='player-headings'>Stats</div>
                    </div>
                    {
                        rankings.players[index] &&
                        orderKeys(Object.keys(rankings.players[index])).map((stat, i) => (
                            (!ignore.includes(stat) && !badges.includes(stat)) &&
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '32vw', margin: 'auto', flexWrap: 'wrap'}} key={i}>
                                <p style={{margin: '1vw'}}>{statsMap[stat]}:</p>
                                <b style={{margin: '1vw'}}>{rankings.players[index][stat]}</b>
                            </div>
                        ))          
                    }

                    <div style={{
                        display: hasBadges ? 'flex' : 'none', 
                        justifyContent: 'center', 
                        marginTop: '4vh'
                    }}>
                        <div className='player-headings'>Badges</div>
                    </div>

                    <div style={{display: hasBadges ? 'flex' : 'none', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop: '2.5vh'}}>
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
                                    <TrophyComponent trophyType={trophy.trophy_name} key={i} />
                                </div>
                            )
                        }
                    </div>

                    <div style={{display: user.user_id ? 'flex' : 'none', justifyContent: 'center', marginBottom: '2vh'}}>
                        <div 
                        onClick={e => {
                            e.stopPropagation();
                            setClickedChallenge(clicked => !clicked);
                        }}
                        style={{
                            display: user.user_name === userName.toString() ? 'none' : 'block',
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                            lineHeight: '1.5vh',
                            height: '6vh',
                            width: '16vw',
                            backgroundColor: 'rgb(140, 0, 55)',
                            borderBottom: '3px solid rgb(105, 0, 40)',
                            borderRadius: '8px',
                            marginTop: '1.2vh',
                            cursor: 'pointer'
                        }}>
                            <p>Challenge</p>
                        </div>
                    </div>

                </div>
             
            </div>
    )
};

export default RankedPlayer;