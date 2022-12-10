import { useDispatch } from 'react-redux';

import { logOutUser } from '../../store/user.js';

import './styles.css'

const LogOut = () => {
    const dispatch = useDispatch();

    return (
        <div 
        onClick={() => dispatch(logOutUser())}
        className="navigation-buttons">
            Log Out
        </div>
    );
};

export default LogOut;