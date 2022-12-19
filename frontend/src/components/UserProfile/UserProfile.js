import { useSelector } from 'react-redux';

import Navigation from '../Navigation/Navigation.js';
import UserStats from './UserStats.js';
import UserLives from './UserLives.js';
import UserBadges from './UserBadges.js';

import './styles.css'

const UserProfile = () => {
    const menu = useSelector(state => state.menu);

    return (
        <div 
        style={{background: menu.backgroundColor}}
        id='profile-box'>
            <Navigation hidden={true} />

            <div style={{display: 'flex', justifyContent: 'space-between', width: 'contain'}}>
                <UserLives />
                <UserBadges />
                <UserStats />
            </div>
        </div>
    );
};

export default UserProfile;