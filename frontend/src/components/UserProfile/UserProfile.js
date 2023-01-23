import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setClickedLeague, setClickedProfile, setClickedChallenges, setClickedEditAccount } from '../../store/menu.js';

import Navigation from '../Navigation/Navigation.js';
import UserStats from './UserStats.js';
import UserLives from './UserLives.js';
import UserBadges from './UserBadges.js';
import TrophyComponent from '../TrophyComponent/TrophyComponent.js';
import ChallengeHolder from '../Challenges/ChallengeHolder.js';
import EditAccount from './EditAccount.js';

import { StarEmphasis } from '@styled-icons/fluentui-system-filled/StarEmphasis';

import './styles.css'

const UserProfile = () => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);
    const user = useSelector(state => state.user);

    const [totalNotifications, setTotalNotifications] = useState(null);

    useEffect(() => {
        const totalSentNotifications = user.sent_challenges.filter(challenge => (challenge.sender.score > challenge.receiver.score) && (challenge.completed === true) && (challenge.redeemed === false));
        const totalReceivedNotifications = user.received_challenges.filter(challenge => (challenge.receiver.score === null) && (challenge.completed === false));

        setTotalNotifications(totalSentNotifications.length + totalReceivedNotifications.length);
    }, [user]);

    const mapBackgroundColor = {
        'Bronze': ['linear-gradient(to bottom, rgb(160, 75, 55), rgb(170, 45, 25))', 'rgb(100, 35, 15)'],
        'Silver': ['linear-gradient(to bottom, rgb(174, 162, 162), rgb(117, 130, 131))', 'rgb(87, 100, 101)'],
        'Gold': ['linear-gradient(to bottom, #FACC6B, #FABC3C)', 'rgb(190, 158, 40)'],
        'Ethereal': ['linear-gradient(to bottom, #A4508B, #5F0A87)', 'rgb(85, 10, 105)'],
        'Galaxy': ['linear-gradient(to bottom, rgb(40, 0, 100), rgb(0, 0, 10))', 'rgb(30, 0, 50)'],
        'Cosmic': ['linear-gradient(to bottom, rgba(185, 10, 180, 1) 5%, rgba(250, 35, 155, 1) 35%, rgba(255, 35, 100, 1) 95%', 'rgba(125, 0, 120, 1)']
    };

    const mapStarColor = {
        'Bronze': 'white',
        'Silver': 'blue',
        'Gold': 'purple',
        'Ethereal': 'red',
        'Galaxy': 'orange',
        'Cosmic': 'yellow'
    };

    return (
        <div 
        id='profile-box'
        style={{
            background: menu.backgroundColor, 
            minWidth: menu.clickedEditAccount ? '40vw' : '55vw',
            maxWidth: menu.clickedEditAccount ? '40vw' : '55vw'
        }}>
            {
                (!menu.clickedChallenges && !menu.clickedEditAccount) ?
                <div>
                    <Navigation hidden={true} />

                    <div id='user-trophies-container'>
                        {
                            user.trophies.length > 0 ?
                            user.trophies.map((trophy, i) => (
                                <div
                                style={{display: 'flex', justifyContent: 'center', minWidth: '16vw', maxWidth: '16vw', marginRight: '2vw', marginLeft: '2vw', marginBottom: '4vh'}}
                                onClick={e => e.stopPropagation()}>
                                    <TrophyComponent trophyType={trophy.trophy_name} container={'userProfile'} key={i} />
                                </div>
                            )) : 
                            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '24vw', marginTop: '6vh', margin: 'auto', fontSize: '24px', lineHeight: '6vh'}}>
                                <b>No Trophies Earned Yet!</b>
                                <b>Rack up badges to earn them.</b>
                            </div>
                        }
                    </div>
                    
                    <div style={{display: 'flex', justifyContent: 'space-between', width: 'contain'}}>
                        <UserBadges />
                        <UserStats />
                    
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: 'auto',
                            flexWrap: 'wrap'
                        }}>
                            <div 
                            style={{
                                backgroundColor: 'rgb(20, 20, 20)',
                                marginTop: '8.2vh',
                                width: '12vw', 
                                border: '2px solid rgb(225, 225, 40)', 
                                borderRadius: '12px'
                            }}>
                                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '-3vh'}}>
                                    <StarEmphasis
                                    style={{
                                        color: mapStarColor[user.league],
                                        width: '1.4vw'
                                    }}>
                                    </StarEmphasis>

                                    <p style={{marginLeft: '0.5vw', marginRight: '1vw'}}>Level: <b>{user.level}</b></p>
                                </div>

                                <p style={{marginBottom: '-1vh'}}>Lives Available: <b>{user.lives}</b></p>
                                <p style={{marginBottom: '-1.5vh'}}>Points Balance</p>
                                <p style={{marginBottom: '1.5vh'}}><b>{user.points_balance}</b></p>
                            </div>

                            <p style={{fontFamily: 'Bungee Spice', fontSize: '20px', marginBottom: '1vh'}}>League</p>
                            <div 
                            onClick={() => {
                                dispatch(setClickedProfile(false));
                                dispatch(setClickedLeague(true));
                            }}
                            style={{
                                marginBottom: '-1vh',
                                fontFamily: 'Roboto',
                                fontSize: '22px',
                                textShadow: 'black 0px 3px 2px',
                                lineHeight: '2vh',
                                width: '10vw',
                                height: '8vh',
                                background: mapBackgroundColor[user.league][0],
                                boxShadow: `0px 0px 6px 3px ${mapBackgroundColor[user.league][1]}`,
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer'
                            }}>
                                <p>{user.league}</p>
                            </div>
                        
                            <p style={{fontFamily: 'Bungee Spice', fontSize: '20px', marginBottom: '1vh'}}>Challenges</p>
                            <div
                            onClick={() => dispatch(setClickedChallenges(true))}
                            style={{
                                marginBottom: '-1vh',
                                backgroundColor: 'rgb(30, 0, 90)',
                                border: 'none',
                                borderBottom: '4px solid rgb(30, 0, 60)',
                                borderRadius: '12px',
                                width: '9vw',
                                height: '5vh',
                                padding: '1.5vh',
                                cursor: 'pointer'
                            }}>
                                <div
                                style={{
                                    display: totalNotifications !== null && totalNotifications > 0 ? 'block' : 'none',
                                    boxShadow: '0px 0px 4px 0.1px black',
                                    backgroundColor: 'rgb(140, 0, 55)',
                                    width: '1.2vw',
                                    padding: '0.5vh',
                                    borderRadius: '100px',
                                    position: 'absolute',
                                    marginTop: '-1.4vh',
                                    marginLeft: '-0.7vw'
                                }}>
                                    <b style={{fontSize: '14px'}}>{totalNotifications}</b>
                                </div>
                                <b style={{lineHeight: '5vh'}}>Browse All</b>
                            </div>

                            <p style={{fontFamily: 'Bungee Spice', fontSize: '20px', marginBottom: '1vh'}}>Account</p>
                            <div 
                            onClick={() => dispatch(setClickedEditAccount(true))}
                            style={{
                                marginBottom: '-1vh',
                                lineHeight: '5vh',
                                backgroundColor: 'rgb(140, 0, 55)',
                                border: 'none',
                                borderBottom: '4px solid rgb(105, 0, 40)',
                                borderRadius: '12px',
                                width: '9vw',
                                height: '5vh',
                                padding: '1.5vh',
                                cursor: 'pointer'
                            }}>
                                <b>{user.user_name}</b>
                            </div>
                        
                            <p style={{fontFamily: 'Bungee Spice', fontSize: '20px', marginBottom: '1vh'}}>Lives</p>
                            <UserLives />
                        </div>
                    </div>
                </div> 
                : menu.clickedChallenges ?
                <div>
                    <Navigation hidden={true} />
                    
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ChallengeHolder />
                    </div>
                </div>
                : menu.clickedEditAccount &&
                <EditAccount />
            }
        </div>
    );
};

export default UserProfile;