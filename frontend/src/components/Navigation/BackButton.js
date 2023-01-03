import { useSelector, useDispatch } from "react-redux";

import { setClickedChallenges } from '../../store/menu.js';

const BackButton = () => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);

    return (
        <div 
        style={{display: menu.clickedChallenges === true ? 'block' : 'none', minWidth: '6vw', maxWidth: '6vw'}}
        onClick={() => {
            dispatch(setClickedChallenges(false));
        }}
        className="navigation-buttons">
            Back
        </div>
    );
};

export default BackButton;