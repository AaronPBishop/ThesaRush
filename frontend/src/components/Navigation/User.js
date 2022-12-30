import { useDispatch, useSelector } from 'react-redux';

import { setClickedLeague, setClickedProfile } from '../../store/menu.js';

import './styles.css';

const User = ({ userName }) => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);

    return (
        <div 
        style={{minWidth: '6vw', maxWidth: '14vw'}}
        onClick={() => {
            dispatch(setClickedLeague(false));
            menu.clickedProfile === false ? dispatch(setClickedProfile(true)) : dispatch(setClickedProfile(false));
        }}
        className="navigation-buttons">
            {userName}
        </div>
    );
};

export default User;