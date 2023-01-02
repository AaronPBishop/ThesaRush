import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { updateChallenge, populateChallengeData, setInChallenge } from "../../store/challenge.js";

const Challenge = ({ id, type, sender, receiver, time, completed, redeemed }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <div
        style={{
            width: '16vw',
            height: '26vh',
            borderBottom: '4px solid rgb(0, 35, 80)',
            borderRadius: '12px',
            backgroundColor: 'rgb(10, 50, 100)',
        }}>
            {
                type === 'sent' ?
                <div style={{display: 'flex', justifyContent: 'center', margin: 'auto', width: '10vw', flexWrap: 'wrap', lineHeight: '1vh'}}>
                    <p>Time: <b>{time}</b></p>
                    <p>Your Score: <b>{sender.score}</b></p>
                    <p>{receiver.id}'s Score: <b>{completed ? receiver.score : 'Pending'}</b></p>
                    
                    <div 
                    onClick={() => dispatch(updateChallenge(id, sender.score))}
                    style={{
                        display: completed && !redeemed ? 'block' : 'none',
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
                </div> 
                :
                <div style={{display: 'flex', justifyContent: 'center', margin: 'auto', width: '10vw', flexWrap: 'wrap', lineHeight: '1vh'}}>
                    <p>Time: <b>{time}</b></p>
                    <p>Your Score: <b>{completed ? receiver.score : 'Pending'}</b></p>
                    <p>{sender.id}'s Score: <b>{sender.score}</b></p>

                    <div 
                    onClick={() => {
                        dispatch(setInChallenge(true, 'challengee'));
                        dispatch(populateChallengeData(sender.id, receiver.id, time));

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
                    onClick={() => dispatch(updateChallenge(id, sender.score))}
                    style={{
                        display: completed && !redeemed ? 'block' : 'none',
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
                </div> 
            }
        </div>
    );
};

export default Challenge;