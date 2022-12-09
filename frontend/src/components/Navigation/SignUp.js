import { useDispatch, useSelector } from 'react-redux';

import { setClickedSignUp, setClickedLogIn } from '../../store/menu.js';

import './styles.css'

const SignUp = () => {
    const dispatch = useDispatch();
    const menu = useSelector(state => state.menu);

    return (
        <div 
        onClick={() => {
            if (menu.clickedLogIn === true) {
                dispatch(setClickedLogIn(false));
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