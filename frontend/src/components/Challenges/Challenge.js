import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchUserData } from '../../store/user.js';
import { populateChallengeData, setInChallenge, redeemChallenge, deleteChallenge } from "../../store/challenge.js";
import { setClickedProfile, setClickedChallenges, setClaimedPoints } from  '../../store/menu.js';

import { StarEmphasis } from '@styled-icons/fluentui-system-filled/StarEmphasis';

const Challenge = ({ id, type, sender, receiver, time, completed, redeemed }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const timeMap = {
        60000: '1 Minute',
        120000: '2 Minutes',
        180000: '3 Minutes'
    };

    const mapStarColor = {
        'Bronze': 'white',
        'Silver': 'rgb(0, 110, 255)',
        'Gold': 'purple',
        'Ethereal': 'red',
        'Galaxy': 'rgb(255, 110, 0)',
        'Cosmic': 'yellow'
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

                        <div style={{display: !completed ? 'flex' : 'none', justifyContent: 'center', marginTop: '-2.5vh', padding: '1px'}}>
                            <p>Challengee:</p>
                            <StarEmphasis
                            style={{
                                marginLeft: '0.4vw',
                                marginRight: '0.2vw',
                                color: mapStarColor[receiver.league],
                                minWidth: '1.4vw',
                                maxWidth: '1.4vw'
                            }}>
                            </StarEmphasis>
                            <p><b>{receiver.user_name}</b></p>
                        </div>

                        <div style={{display: completed ? 'flex' : 'none', justifyContent: 'center', marginTop: '-2.5vh', padding: '1px'}}>
                            <StarEmphasis
                            style={{
                                marginRight: '0.2vw',
                                color: mapStarColor[receiver.league],
                                minWidth: '1.4vw',
                                maxWidth: '1.4vw'
                            }}>
                            </StarEmphasis>
                            <p>{receiver.user_name}'s Score: <b>{receiver.score}</b></p>
                        </div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', width: '10vw'}}>
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
                    </div>
                    
                    <div 
                    onClick={async () => {
                        await dispatch(redeemChallenge(id, user.user_id));
                        await dispatch(fetchUserData(user.user_id));
                        await dispatch(setClaimedPoints(true));
                    }}
                    style={{
                        marginBottom: '1vh',
                        display: completed && sender.score > receiver.score && !redeemed ? 'block' : 'none',
                        backgroundColor: 'rgb(140, 0, 55)',
                        border: 'none',
                        borderBottom: '3.5px solid rgb(105, 0, 40)',
                        borderRadius: '12px',
                        width: '8vw',
                        height: '2vh',
                        lineHeight: '2vh',
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
                        marginBottom: '2vh',
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

                        <div style={{display: !completed ? 'flex' : 'none', justifyContent: 'center', marginTop: '-2.5vh', padding: '1px'}}>
                            <StarEmphasis
                            style={{
                                marginRight: '0.2vw',
                                color: mapStarColor[sender.league],
                                minWidth: '1.4vw',
                                maxWidth: '1.4vw'
                            }}>
                            </StarEmphasis>
                            <p>Challenger: <b>{sender.user_name}</b></p>
                        </div>

                        <div style={{display: completed ? 'flex' : 'none', justifyContent: 'center', marginTop: '-2.5vh', padding: '1px'}}>
                            <StarEmphasis
                            style={{
                                marginRight: '0.2vw',
                                color: mapStarColor[sender.league],
                                minWidth: '1.4vw',
                                maxWidth: '1.4vw'
                            }}>
                            </StarEmphasis>
                            <p>{sender.user_name}'s Score: <b>{sender.score}</b></p>
                        </div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-evenly', width: 'inherit', marginBottom: '1vh'}}>
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
                            height: '2vh',
                            lineHeight: '2.3vh',
                            padding: '1.5vh',
                            cursor: 'pointer'
                        }}>
                            Decline
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
                            height: '2vh',
                            lineHeight: '2.3vh',
                            padding: '1.5vh',
                            cursor: 'pointer'
                        }}>
                            Accept
                        </div>
                    </div>
                    
                    <div 
                    onClick={async () => {
                        await dispatch(redeemChallenge(id, user.user_id));
                        await dispatch(fetchUserData(user.user_id));
                        await dispatch(setClaimedPoints(true));
                    }}
                    style={{
                        marginBottom: '2vh',
                        display: completed && receiver.score > sender.score && !redeemed ? 'block' : 'none',
                        backgroundColor: 'rgb(140, 0, 55)',
                        border: 'none',
                        borderBottom: '3.5px solid rgb(105, 0, 40)',
                        borderRadius: '12px',
                        width: '7vw',
                        height: '2vh',
                        lineHeight: '2vh',
                        padding: '1.5vh',
                        cursor: 'pointer'
                    }}>
                        Claim Points!
                    </div>

                    <div 
                    style={{
                        marginBottom: '2vh',
                        display: (completed && receiver.score > sender.score && redeemed) || (completed && sender.score === receiver.score) || (completed && receiver.score < sender.score) ? 'block' : 'none',
                        fontFamily: 'Bungee Spice',
                        fontSize: '20px',
                        width: '7vw',
                        height: '2vh',
                        lineHeight: '2vh',
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