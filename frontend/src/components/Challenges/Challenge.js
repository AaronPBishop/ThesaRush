import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchUserData } from '../../store/user.js';
import { updateChallenge, populateChallengeData, setInChallenge, redeemChallenge } from "../../store/challenge.js";

const Challenge = ({ id, type, sender, receiver, time, completed, redeemed }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    return (
        <div
        style={{
            width: '16vw',
            height: '26vh',
            borderBottom: '4px solid rgb(20, 0, 50)',
            borderRadius: '12px',
            background: 'linear-gradient(rgb(30, 0, 90), rgb(20, 0, 70))',
        }}>
            {
                type === 'sent' ?
                <div style={{display: 'flex', justifyContent: 'center', margin: 'auto', width: '10vw', flexWrap: 'wrap', lineHeight: '1vh'}}>
                    <div style={{lineHeight: '2.5vh', marginTop: !completed && '3vh'}}>
                        <p>Time: <b>{time}</b></p>
                        <p>Your Score: <b>{sender.score}</b></p>
                        <p style={{display: completed ? 'block' : 'none'}}>{receiver.user_name}'s Score: <b>{receiver.score}</b></p>
                        <p style={{display: !completed ? 'block' : 'none'}}>Challengee: <b>{receiver.user_name}</b></p>
                    </div>
                    
                    <div 
                    onClick={async () => {
                        await dispatch(redeemChallenge(id, user.user_id));
                        await dispatch(fetchUserData(user.user_id));
                    }}
                    style={{
                        display: completed && sender.score > receiver.score && !redeemed ? 'block' : 'none',
                        backgroundColor: 'rgb(140, 0, 55)',
                        border: 'none',
                        borderBottom: '3.5px solid rgb(105, 0, 40)',
                        borderRadius: '12px',
                        width: '7vw',
                        height: '2vh',
                        lineHeight: '2vh',
                        marginTop: '1vh',
                        padding: '1.5vh',
                        cursor: 'pointer'
                    }}>
                        Claim Points!
                    </div>

                    <div 
                    style={{
                        display: (completed && sender.score > receiver.score && redeemed) || (completed && sender.score === receiver.score) || (completed && sender.score < receiver.score) ? 'block' : 'none',
                        fontFamily: 'Bungee Spice',
                        fontSize: '20px',
                        width: '7vw',
                        height: '2vh',
                        lineHeight: '2vh',
                        marginTop: '1vh',
                        padding: '1.5vh',
                    }}>
                        {sender.score > receiver.score ? '+1 Win' : receiver.score === sender.score ? 'Tied' : '+1 Loss'}
                    </div>
                </div> 
                :
                <div style={{display: 'flex', justifyContent: 'center', margin: 'auto', width: '10vw', flexWrap: 'wrap', lineHeight: '1vh'}}>
                    <div style={{lineHeight: '2.5vh'}}>
                        <p>Time: <b>{time}</b></p>
                        <p>Your Score: <b>{completed ? receiver.score : 'Pending'}</b></p>
                        <p>{completed ? `${sender.user_name}'s Score: ${sender.score}` : `Challenger: ${sender.user_name}`}</p>
                    </div>

                    <div 
                    onClick={async () => {
                        dispatch(setInChallenge(true, 'challengee'));
                        dispatch(populateChallengeData(id, sender.id, receiver.id, time));

                        history.push('/game/rush');
                    }}
                    style={{
                        display: !completed ? 'block' : 'none',
                        backgroundColor: 'rgb(140, 0, 55)',
                        border: 'none',
                        borderBottom: '3.5px solid rgb(105, 0, 40)',
                        borderRadius: '12px',
                        width: '7vw',
                        height: '4vh',
                        lineHeight: '2vh',
                        marginTop: '1vh',
                        padding: '1.5vh',
                        cursor: 'pointer'
                    }}>
                        Accept Challenge
                    </div>
                    
                    <div 
                    onClick={async () => {
                        await dispatch(redeemChallenge(id, user.user_id));
                        await dispatch(fetchUserData(user.user_id));
                    }}
                    style={{
                        display: completed && receiver.score > sender.score && !redeemed ? 'block' : 'none',
                        backgroundColor: 'rgb(140, 0, 55)',
                        border: 'none',
                        borderBottom: '3.5px solid rgb(105, 0, 40)',
                        borderRadius: '12px',
                        width: '7vw',
                        height: '2vh',
                        lineHeight: '2vh',
                        marginTop: '1vh',
                        padding: '1.5vh',
                        cursor: 'pointer'
                    }}>
                        Claim Points!
                    </div>

                    <div 
                    style={{
                        display: (completed && receiver.score > sender.score && redeemed) || (completed && sender.score === receiver.score) || (completed && receiver.score < sender.score) ? 'block' : 'none',
                        fontFamily: 'Bungee Spice',
                        fontSize: '20px',
                        width: '7vw',
                        height: '2vh',
                        lineHeight: '2vh',
                        marginTop: '1vh',
                        padding: '1.5vh',
                    }}>
                        {receiver.score > sender.score ? '+1 Win' : receiver.score === sender.score ? 'Tied' : '+1 Loss'}
                    </div>
                </div> 
            }
        </div>
    );
};

export default Challenge;