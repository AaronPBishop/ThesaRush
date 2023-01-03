import { useDispatch, useSelector } from 'react-redux';

import { logOutUser } from '../../store/user.js';

import './styles.css'

const LogOut = ({ hidden }) => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);

    return (
        <div 
        style={{display: menu.clickedChallenges === true ? 'none' : 'block', visibility: hidden ? 'hidden' : 'visible', minWidth: '6vw', maxWidth: '6vw'}}
        onClick={() => dispatch(logOutUser())}
        className="navigation-buttons">
            Log Out
        </div>
    );
};

export default LogOut;