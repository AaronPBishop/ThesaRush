import { useDispatch } from 'react-redux';

import { logOutUser } from '../../store/user.js';

import './styles.css'

const LogOut = ({ hidden }) => {
    const dispatch = useDispatch();

    return (
        <div 
        style={{visibility: hidden ? 'hidden' : 'visible', minWidth: '6vw', maxWidth: '6vw'}}
        onClick={() => dispatch(logOutUser())}
        className="navigation-buttons">
            Log Out
        </div>
    );
};

export default LogOut;