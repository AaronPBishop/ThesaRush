import { useSelector, useDispatch } from "react-redux";

import { setClickedLogIn, setClickedSignUp, setClickedLeaderBoard } from '../../store/menu.js';

const LeaderBoardButton = ({ hidden }) => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);

    return (
        <div 
        style={{visibility: hidden ? 'hidden' : 'visible', minWidth: '16vw', maxWidth: '16vw'}}
        onClick={() => {
            if (menu.clickedSignUp === true || menu.clickedLogIn === true) {
                dispatch(setClickedSignUp(false));
                dispatch(setClickedLogIn(false));
            };

            menu.clickedLeaderBoard === false ? dispatch(setClickedLeaderBoard(true)) : dispatch(setClickedLeaderBoard(false));
        }}
        className="navigation-buttons">
            Leader Board
        </div>
    );
};

export default LeaderBoardButton;