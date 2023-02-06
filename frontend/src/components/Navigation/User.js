import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setClickedChallenges, setClickedLeague, setClickedProfile } from '../../store/menu.js';

import './styles.css';

const User = ({ userName }) => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);

    const [totalNotifications, setTotalNotifications] = useState(null);
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.user_id) {
            const totalSentNotifications = user.sent_challenges.filter(challenge => (challenge.sender.score > challenge.receiver.score) && (challenge.completed === true) && (challenge.redeemed === false));
            const totalReceivedNotifications = user.received_challenges.filter(challenge => (challenge.receiver.score === null) && (challenge.completed === false));

            setTotalNotifications(totalSentNotifications.length + totalReceivedNotifications.length);
        };
    }, [user]);

    return (
        <div 
        style={{minWidth: '8vw', maxWidth: '8vw'}}
        onClick={() => {
            dispatch(setClickedLeague(false));
            menu.clickedProfile === false ? dispatch(setClickedProfile(true)) : dispatch(setClickedProfile(false));
            menu.clickedChallenges === true && dispatch(setClickedChallenges(false));
        }}
        className="navigation-buttons">
            <div
            style={{
                display: totalNotifications !== null && totalNotifications > 0 ? 'block' : 'none',
                boxShadow: '0px 0px 4px 0.1px black',
                backgroundColor: 'rgb(30, 0, 90)',
                width: '1.2vw',
                padding: '0.2vh',
                borderRadius: '100px',
                position: 'absolute',
                marginTop: '-1.4vh',
                marginLeft: '-0.8vw'
            }}>
                <b style={{fontSize: '14px'}}>{totalNotifications}</b>
            </div>
            
            {userName}
        </div>
    );
};

export default User;