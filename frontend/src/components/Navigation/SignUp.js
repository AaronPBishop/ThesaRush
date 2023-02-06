import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setClickedSignUp, setClickedLogIn, setClickedLeague } from '../../store/menu.js';
import { clearErrors, createRandomUser, loginUserThunk } from '../../store/user.js';

import './styles.css'

const SignUp = ({ loggedIn }) => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);
    const errors = useSelector(state => state.user.errors);

    useEffect(() => {
        if (loggedIn === true) dispatch(setClickedSignUp(false));
    }, [loggedIn]);

    return (
        <div>
            <div 
            style={{minWidth: '8vw', maxWidth: '8vw'}}
            onClick={async () => {
                if (menu.clickedLogIn === true || menu.clickedLeague === true) {
                    await dispatch(clearErrors());
                    await dispatch(setClickedLogIn(false));
                    await dispatch(setClickedLeague(false));
                    await dispatch(setClickedSignUp(true));

                    return;
                };

                menu.clickedSignUp === false ? dispatch(setClickedSignUp(true)) : dispatch(setClickedSignUp(false));
            }}
            className="navigation-buttons">
                Sign Up
            </div>

            <div 
            style={{position: 'absolute', minWidth: '8vw', maxWidth: '8vw', borderTopRightRadius: '6px'}}
            onClick={async () => {
                await dispatch(setClickedLogIn(false));
                await dispatch(setClickedLeague(false));
                await dispatch(setClickedSignUp(false));

                if (localStorage.getItem('email')) dispatch(loginUserThunk(localStorage.getItem('email').toLowerCase(), localStorage.getItem('password')));

                if (!localStorage.getItem('email')) dispatch(createRandomUser());
            }}
            className="navigation-buttons">
                Anonymize
            </div>
        </div>
    );
};

export default SignUp;