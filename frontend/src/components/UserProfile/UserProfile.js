import { useSelector } from 'react-redux';

import Navigation from '../Navigation/Navigation.js';
import UserStats from './UserStats.js';
import UserLives from './UserLives.js';
import UserBadges from './UserBadges.js';
import Trophy from '../Trophy/Trophy.js';

import './styles.css'

const UserProfile = () => {
    const menu = useSelector(state => state.menu);
    const user = useSelector(state => state.user);

    return (
        <div 
        style={{background: menu.backgroundColor}}
        id='profile-box'>
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
                    <div style={{marginTop: '6vh', fontSize: '24px', lineHeight: '6vh'}}>
                        <b>No Trophies Earned Yet!</b>
                        <br/>
                        <b>Rack up badges to earn them.</b>
                    </div>
                }
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', width: 'contain'}}>
                <UserBadges />
                <UserStats />
                <UserLives />
            </div>
        </div>
    );
};

export default UserProfile;