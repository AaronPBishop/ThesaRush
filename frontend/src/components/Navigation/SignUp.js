import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setClickedSignUp, setClickedLogIn, setClickedLeaderBoard } from '../../store/menu.js';

import './styles.css'

const SignUp = ({ loggedIn }) => {
    const dispatch = useDispatch();
    const menu = useSelector(state => state.menu);

    useEffect(() => {
        if (loggedIn === true) dispatch(setClickedSignUp(false));
    }, [loggedIn]);

    return (
        <div 
        style={{minWidth: '6vw', maxWidth: '6vw'}}
        onClick={() => {
            if (menu.clickedLogIn === true || menu.clickedLeaderBoard === true) {
                dispatch(setClickedLogIn(false));
                dispatch(setClickedLeaderBoard(false));
                dispatch(setClickedSignUp(true));
                return;
            };
            
            menu.clickedSignUp === false ? dispatch(setClickedSignUp(true)) : dispatch(setClickedSignUp(false));
        }}
        className="navigation-buttons">
            Sign Up
        </div>
    );
};

export default SignUp;