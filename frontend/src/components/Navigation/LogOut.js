import { useDispatch, useSelector } from 'react-redux';

import { logOutUserThunk } from '../../store/user.js';

import './styles.css'

const LogOut = ({ hidden }) => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);

    return (
        <div 
        style={{display: menu.clickedChallenges === true ? 'none' : 'block', visibility: hidden ? 'hidden' : 'visible', minWidth: '9vw', maxWidth: '9vw'}}
        onClick={() => dispatch(logOutUserThunk())}
        className="navigation-buttons">
            Log Out
        </div>
    );
};

export default LogOut;