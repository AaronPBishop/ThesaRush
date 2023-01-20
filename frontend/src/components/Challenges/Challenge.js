import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchUserData } from '../../store/user.js';
import { populateChallengeData, setInChallenge, redeemChallenge, deleteChallenge } from "../../store/challenge.js";
import { setClickedProfile, setClickedChallenges } from  '../../store/menu.js';

const Challenge = ({ id, type, sender, receiver, time, completed, redeemed }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const timeMap = {
        60000: '1 Minute',
        120000: '2 Minutes',
        180000: '3 Minutes'
    };

    return (
        <div
        style={{
            width: '16vw',
            height: '26vh',
            borderBottom: '4px solid rgb(20, 0, 50)',
            borderRadius: '12px',
            background: 'linear-gradient(rgb(30, 0, 90), rgb(20, 0, 70))'
        }}>
            {
                type === 'sent' ?
                <div style={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    margin: 'auto', 
                    width: 'inherit', 
                    height: 'inherit',
                    flexWrap: 'wrap', 
                    lineHeight: '1vh'
                }}>
                    <div style={{lineHeight: '2.5vh'}}>
                        <p>Time: <b>{timeMap[time]}</b></p>
                        <p>Your Score: <b>{sender.score}</b></p>
                        <p style={{display: completed ? 'block' : 'none'}}>{receiver.user_name}'s Score: <b>{receiver.score}</b></p>
                        <p style={{display: !completed ? 'block' : 'none'}}>Challengee: <b>{receiver.user_name}</b></p>
                    </div>

                    <div
                    onClick={async () => {
                        await dispatch(deleteChallenge(id));
                        await dispatch(fetchUserData(user.user_id));
                    }}
                    style={{
                        display: !completed ? 'block' : 'none',
                        backgroundColor: 'rgb(140, 0, 55)',
                        border: 'none',
                        borderBottom: '3.5px solid rgb(105, 0, 40)',
                        borderRadius: '12px',
                        width: '6vw',
                        height: '1.5vh',
                        lineHeight: '1.6vh',
                        padding: '1.5vh',
                        cursor: 'pointer'
                    }}>
                        Unsend
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
                <div style={{display: 'flex', justifyContent: 'center', margin: 'auto', width: 'inherit', height: 'inherit', flexWrap: 'wrap', lineHeight: '1vh'}}>
                    <div style={{lineHeight: '2.5vh'}}>
                        <p>Time: <b>{timeMap[time]}</b></p>
                        <p>Your Score: <b>{completed ? receiver.score : 'Pending'}</b></p>
                        <p style={{display: completed ? 'block' : 'none'}}>{sender.user_name}'s Score: <b>{sender.score}</b></p>
                        <p style={{display: !completed ? 'block' : 'none'}}>Challenger: <b>{sender.user_name}</b></p>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-evenly', width: 'inherit'}}>
                        <div 
                        onClick={async () => {
                            await dispatch(deleteChallenge(id));
                            await dispatch(fetchUserData(user.user_id));
                        }}
                        style={{
                            display: !completed ? 'block' : 'none',
                            backgroundColor: 'rgb(140, 0, 55)',
                            border: 'none',
                            borderBottom: '3.5px solid rgb(105, 0, 40)',
                            borderRadius: '12px',
                            width: '5.5vw',
                            height: '3.8vh',
                            lineHeight: '2.2vh',
                            marginTop: '1vh',
                            padding: '1.5vh',
                            cursor: 'pointer'
                        }}>
                            Decline Challenge
                        </div>

                        <div 
                        onClick={async () => {
                            dispatch(setInChallenge(true, 'challengee'));
                            dispatch(populateChallengeData(id, sender.id, receiver.id, time));

                            dispatch(setClickedProfile(false));
                            dispatch(setClickedChallenges(false));

                            history.push('/game/rush');
                        }}
                        style={{
                            display: !completed ? 'block' : 'none',
                            backgroundColor: 'rgb(140, 0, 55)',
                            border: 'none',
                            borderBottom: '3.5px solid rgb(105, 0, 40)',
                            borderRadius: '12px',
                            width: '5.5vw',
                            height: '3.8vh',
                            lineHeight: '2.2vh',
                            marginTop: '1vh',
                            padding: '1.5vh',
                            cursor: 'pointer'
                        }}>
                            Accept Challenge
                        </div>
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