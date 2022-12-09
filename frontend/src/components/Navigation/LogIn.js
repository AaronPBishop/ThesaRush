import { useDispatch, useSelector } from 'react-redux';

import { setClickedLogIn, setClickedSignUp } from '../../store/menu.js';

import './styles.css'

const LogIn = () => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);

    return (
        <div 
        onClick={() => {
            if (menu.clickedSignUp === true) {
                dispatch(setClickedSignUp(false));
                dispatch(setClickedLogIn(true));
                return;
            };

            menu.clickedLogIn === false ? dispatch(setClickedLogIn(true)) : dispatch(setClickedLogIn(false))
        }}
        className="navigation-buttons">
            Log In
        </div>
    );
};

export default LogIn;