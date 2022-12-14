import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { setClickedLeague } from '../../store/menu.js';
import { setInChallenge, populateChallengeData } from "../../store/challenge";

const ChallengeTime = ({ senderId, receiverId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div
        style={{
            display: 'flex', 
            justifyContent: 'center', 
            fontFamily: 'Roboto',
            border: '2px solid rgb(120, 120, 255)',
            borderRadius: '12px',
            width: '20vw', 
            height: '20vh',
            backgroundColor: 'black',
            flexWrap: 'wrap', 
            margin: 'auto', 
            marginBottom: '2vh',
            overflowY: 'auto'
        }}
        >
            <div>
                <p>Choose a Time</p>

                <div onClick={() => {
                    dispatch(setClickedLeague(false));
                    dispatch(setInChallenge(true, 'challenger'));
                    dispatch(populateChallengeData(null, senderId, receiverId, 60000));

                    history.push('/game/rush');
                }} 
                className='challenge-times'>One Minute</div>

                <div onClick={() => { 
                    dispatch(setClickedLeague(false));
                    dispatch(setInChallenge(true, 'challenger'));
                    dispatch(populateChallengeData(null, senderId, receiverId, 120000));

                    history.push('/game/rush');
                }} 
                className='challenge-times'>Two Minutes</div>

                <div onClick={() => {
                    dispatch(setClickedLeague(false));
                    dispatch(setInChallenge(true, 'challenger'));
                    dispatch(populateChallengeData(null, senderId, receiverId, 180000));

                    history.push('/game/rush');
                }} 
                className='challenge-times'>Three Minutes</div>
            </div>
        </div>
    );
};

export default ChallengeTime;