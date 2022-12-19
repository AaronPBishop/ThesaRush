import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setClickedLogIn, setClickedSignUp, setClickedLeaderBoard } from '../../store/menu.js';

import './styles.css'

const LogIn = ({ loggedIn }) => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);

    useEffect(() => {
        if (loggedIn === true) dispatch(setClickedLogIn(false));
    }, [loggedIn]);

    return (
        <div 
        style={{minWidth: '6vw', maxWidth: '6vw'}}
        onClick={() => {
            if (menu.clickedSignUp === true || menu.clickedLeaderBoard === true) {
                dispatch(setClickedSignUp(false));
                dispatch(setClickedLeaderBoard(false));
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