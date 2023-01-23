import { useDispatch, useSelector } from 'react-redux';

import { setClickedLeague, setClickedProfile, setClickedChallenges, setClickedEditAccount } from '../../store/menu.js';

import Navigation from '../Navigation/Navigation.js';
import UserStats from './UserStats.js';
import UserLives from './UserLives.js';
import UserBadges from './UserBadges.js';
import TrophyComponent from '../TrophyComponent/TrophyComponent.js';
import ChallengeHolder from '../Challenges/ChallengeHolder.js';

import './styles.css'
import EditAccount from './EditAccount.js';

const UserProfile = () => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);
    const user = useSelector(state => state.user);

    const mapBackgroundColor = {
        'Bronze': ['linear-gradient(to bottom, rgb(160, 75, 55), rgb(170, 45, 25))', 'rgb(100, 35, 15)'],
        'Silver': ['linear-gradient(to bottom, rgb(174, 162, 162), rgb(117, 130, 131))', 'rgb(87, 100, 101)'],
        'Gold': ['linear-gradient(to bottom, #FACC6B, #FABC3C)', 'rgb(190, 158, 40)'],
        'Ethereal': ['linear-gradient(to bottom, #A4508B, #5F0A87)', 'rgb(85, 10, 105)'],
        'Galaxy': ['linear-gradient(to bottom, rgb(40, 0, 100), rgb(0, 0, 10))', 'rgb(30, 0, 50)'],
        'Astral': ['linear-gradient(to bottom, rgba(250, 237, 56, 1) 10%, rgba(241, 147, 55, 1) 30%, rgba(255, 37, 174, 1)) 60%', 'rgba(185, 32, 144, 1)']
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
                            <p style={{fontFamily: 'Bungee Spice', fontSize: '20px', marginBottom: '1vh'}}>League</p>
                            <div 
                            onClick={() => {
                                dispatch(setClickedProfile(false));
                                dispatch(setClickedLeague(true));
                            }}
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '22px',
                                textShadow: 'black 0px 3px 2px',
                                lineHeight: '2vh',
                                width: '10vw',
                                height: '8vh',
                                background: mapBackgroundColor[user.league][0],
                                border: `2px solid ${mapBackgroundColor[user.league][1]}`,
                                borderRadius: '12px',
                                cursor: 'pointer'
                            }}>
                                <p>{user.league}</p>
                            </div>
                        
                            <p style={{fontFamily: 'Bungee Spice', fontSize: '20px', marginBottom: '1vh'}}>Challenges</p>
                            <div
                            onClick={() => dispatch(setClickedChallenges(true))}
                            style={{
                                lineHeight: '1vh',
                                backgroundColor: 'rgb(140, 0, 55)',
                                border: 'none',
                                borderBottom: '3.5px solid rgb(105, 0, 40)',
                                borderRadius: '12px',
                                width: '9vw',
                                height: '5vh',
                                padding: '1.5vh',
                                cursor: 'pointer'
                            }}>
                                <p>Browse All</p>
                            </div>

                            <p style={{fontFamily: 'Bungee Spice', fontSize: '20px', marginBottom: '1vh'}}>Account</p>
                            <div 
                            onClick={() => dispatch(setClickedEditAccount(true))}
                            style={{
                                lineHeight: '6vh',
                                backgroundColor: 'rgb(140, 0, 55)',
                                border: 'none',
                                borderBottom: '3.5px solid rgb(105, 0, 40)',
                                borderRadius: '12px',
                                width: '9vw',
                                height: '5vh',
                                padding: '1.5vh',
                                cursor: 'pointer'
                            }}>
                                <b>{user.user_name}</b>
                            </div>
                        
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