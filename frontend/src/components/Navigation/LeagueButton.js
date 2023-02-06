import { useSelector, useDispatch } from "react-redux";

import { setClickedLogIn, setClickedSignUp, setClickedLeague } from '../../store/menu.js';

const LeagueButton = ({ hidden }) => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);

    return (
        <div 
        style={{display: hidden ? 'none' : 'block', minWidth: '18vw', maxWidth: '18vw'}}
        onClick={() => {
            if (menu.clickedSignUp === true || menu.clickedLogIn === true) {
                dispatch(setClickedSignUp(false));
                dispatch(setClickedLogIn(false));
            };

            menu.clickedLeague === false ? dispatch(setClickedLeague(true)) : dispatch(setClickedLeague(false));
        }}
        className="navigation-buttons">
            <p style={{fontFamily: 'Bungee Spice', textShadow: 'black 0px 2px 4px', margin: '0px'}}>League</p>
        </div>
    );
};

export default LeagueButton;