import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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
                    dispatch(setInChallenge(true, 'challenger'));
                    dispatch(populateChallengeData(senderId, receiverId, 6000));

                    history.push('/game/rush');
                }} 
                className='challenge-times'>One Minute</div>

                <div onClick={() => { 
                    dispatch(setInChallenge(true, 'challenger'));
                    dispatch(populateChallengeData(senderId, receiverId, 120000));

                    history.push('/game/rush');
                }} 
                className='challenge-times'>Two Minutes</div>

                <div onClick={() => {
                    dispatch(setInChallenge(true, 'challenger'));
                    dispatch(populateChallengeData(senderId, receiverId, 180000));

                    history.push('/game/rush');
                }} 
                className='challenge-times'>Three Minutes</div>
            </div>
        </div>
    );
};

export default ChallengeTime;