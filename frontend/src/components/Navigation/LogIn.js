import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setClickedLogIn, setClickedSignUp, setClickedLeague } from '../../store/menu.js';
import { clearErrors } from '../../store/user.js';

import './styles.css'

const LogIn = ({ loggedIn }) => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);
    const errors = useSelector(state => state.user.errors);

    useEffect(() => {
        if (loggedIn === true) dispatch(setClickedLogIn(false));
    }, [loggedIn]);

    return (
        <div 
        style={{minWidth: '8vw', maxWidth: '8vw'}}
        onClick={async () => {
            if (menu.clickedSignUp === true || menu.clickedLeague === true) {
                await dispatch(clearErrors());
                await dispatch(setClickedSignUp(false));
                await dispatch(setClickedLeague(false));
                await dispatch(setClickedLogIn(true));

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