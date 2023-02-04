import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setClickedSignUp, setClickedLogIn, setClickedLeague } from '../../store/menu.js';
import { clearErrors } from '../../store/user.js';

import './styles.css'

const SignUp = ({ loggedIn }) => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);
    const errors = useSelector(state => state.user.errors);

    useEffect(() => {
        if (loggedIn === true) dispatch(setClickedSignUp(false));
    }, [loggedIn]);

    return (
        <div 
        style={{minWidth: '6vw', maxWidth: '6vw'}}
        onClick={() => {
            if (menu.clickedLogIn === true || menu.clickedLeague === true) {
                if (errors.length) dispatch(clearErrors());
                dispatch(setClickedLogIn(false));
                dispatch(setClickedLeague(false));
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