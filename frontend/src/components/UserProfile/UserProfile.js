import { useDispatch, useSelector } from 'react-redux';

import { setClickedLeague, setClickedProfile, setClickedChallenges } from '../../store/menu.js';

import Navigation from '../Navigation/Navigation.js';
import UserStats from './UserStats.js';
import UserLives from './UserLives.js';
import UserBadges from './UserBadges.js';
import Trophy from '../Trophy/Trophy.js';
import ChallengeHolder from '../Challenges/ChallengeHolder.js';

import './styles.css'

const UserProfile = () => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);
    const user = useSelector(state => state.user);

    const mapBackgroundColor = {
        'Bronze': 'linear-gradient(to bottom, rgb(160, 75, 55), rgb(170, 45, 25))',
        'Silver': 'linear-gradient(to bottom, rgb(174, 162, 162), rgb(117, 130, 131))',
        'Gold': 'linear-gradient(to bottom, #FACC6B, #FABC3C)',
        'Ethereal': 'linear-gradient(to bottom, #A4508B, #5F0A87)',
        'Galaxy': 'linear-gradient(to bottom, rgb(40, 0, 100), rgb(0, 0, 10))'
    };

    return (
        <div 
        style={{background: menu.backgroundColor}}
        id='profile-box'>
            {
                !menu.clickedChallenges ?
                <div>
                    <Navigation hidden={true} />

                    <div id='user-trophies-container'>
                        {
                            user.trophies.length > 0 ?
                            user.trophies.map((trophy, i) => (
                                <div
                                style={{display: 'flex', justifyContent: 'center', minWidth: '16vw', maxWidth: '16vw', marginRight: '2vw', marginLeft: '2vw', marginBottom: '4vh'}}
                                onClick={e => e.stopPropagation()}>
                                    <Trophy trophyType={trophy.trophy_name} container={'userProfile'} key={i} />
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
                            <p style={{fontFamily: 'Bungee Spice', fontSize: '20px'}}>League</p>
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
                                background: mapBackgroundColor[user.league],
                                border: '2px solid yellow',
                                borderRadius: '12px',
                                cursor: 'pointer'
                            }}>
                                <p>{user.league}</p>
                            </div>
                        
                            <p style={{fontFamily: 'Bungee Spice', fontSize: '20px', marginTop: '6vh'}}>Challenges</p>
                            <div
                            onClick={() => dispatch(setClickedChallenges(true))}
                            style={{
                                backgroundColor: 'rgb(140, 0, 55)',
                                border: 'none',
                                borderBottom: '3.5px solid rgb(105, 0, 40)',
                                borderRadius: '12px',
                                width: '9vw',
                                height: '6vh',
                                padding: '1.5vh',
                                cursor: 'pointer'
                            }}>
                                <p>Browse All</p>
                            </div>
                        
                            <UserLives />
                        </div>
                    </div>
                </div> 
                : 
                <div>
                    <Navigation hidden={true} />
                    
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ChallengeHolder />
                    </div>
                </div>
            }
        </div>
    );
};

export default UserProfile;