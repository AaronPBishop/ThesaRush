import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchUserData, spendPoints, copyTrophies } from '../../store/user.js';
import { populateChallengeData, setInChallenge, redeemChallenge, deleteChallenge, editChallengeRecipient } from "../../store/challenge.js";
import { setClickedProfile, setClickedChallenges, setClaimedPoints } from  '../../store/menu.js';
import { setDifficulty } from '../../store/game.js';

import { StarEmphasis } from '@styled-icons/fluentui-system-filled/StarEmphasis';

const Challenge = ({ id, type, sender, receiver, time, difficulty, completed, redeemed }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const challengeState = useSelector(state => state.challenge);

    const [clickedAccept, setClickedAccept] = useState(false);
    const [clickedModify, setClickedModify] = useState(false);
    const [recipientInput, setRecipientInput] = useState('');
    const [insufficientPoints, setInsufficientPoints] = useState(false);

    const timeMap = {
        60000: '1 Minute',
        120000: '2 Minutes',
        180000: '3 Minutes'
    };

    const priceMap = {
        60000: {
            'medium': 50,
            'hard': 75,
            'rush': 100
        },
        120000: {
            'medium': 75,
            'hard': 100,
            'rush': 125
        },
        180000: {
            'medium': 100,
            'hard': 150,
            'rush': 200
        }
    };

    const rewardMap = {
        60000: {
            'medium': 400,
            'hard': 500,
            'rush': 600
        },
        120000: {
            'medium': 600,
            'hard': 700,
            'rush': 800
        },
        180000: {
            'medium': 800,
            'hard': 900,
            'rush': 1000
        }
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
            height: '30vh',
            borderBottom: '4px solid rgb(20, 0, 50)',
            borderRadius: '12px',
            background: 'linear-gradient(rgb(30, 0, 90), rgb(20, 0, 70))',
            overflowX: 'hidden',
            overflowY: 'auto'
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
                        <p>Difficulty: <b>{difficulty ? difficulty.split('').map((el, i) => i === 0 ? el = el.toUpperCase() : el = el).join('') : 'Rush'}</b></p>
                        <p>Your Score: <b>{sender.score}</b></p>

                        <div style={{display: !completed ? 'flex' : 'none', justifyContent: 'center', marginTop: '-2.5vh', padding: '1px'}}>
                            <p>Challengee:</p>
                            <StarEmphasis
                            style={{
                                display: !clickedModify ? 'block' : 'none',
                                marginLeft: '0.4vw',
                                marginRight: '0.2vw',
                                color: mapStarColor[receiver.league],
                                minWidth: '1.4vw',
                                maxWidth: '1.4vw'
                            }}>
                            </StarEmphasis>

                            <p style={{display: !clickedModify ? 'block' : 'none'}}><b>{receiver.user_name}</b></p>
                            <input 
                            id='recipient-input' 
                            placeholder='Recipient Username'
                            onChange={e => setRecipientInput(e.target.value)}
                            style={{display: clickedModify ? 'block' : 'none', marginLeft: '0.2vw', marginRight: '-0.4vw'}}>
                            </input>
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

                    <div style={{
                        display: !completed && challengeState.error && challengeState.challengeId === id ? 'block' : 'none',
                        fontSize: '12px', 
                        fontStyle: 'italic', 
                        color: 'rgb(95, 255, 0)', 
                        width: '16vw', 
                        height: '2.5vh', 
                        lineHeight: '4vh',
                        marginTop: '-3vh'
                    }}>
                            {challengeState.error}
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-evenly', width: '16vw'}}>
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
                            Unsend
                        </div>

                        <div
                        onClick={async () => {
                            if (!clickedModify) {
                                setClickedModify(true);
                                return;
                            };

                            if (clickedModify) {
                                if (recipientInput.length > 0) {
                                    await dispatch(editChallengeRecipient(id, recipientInput));
                                    await dispatch(fetchUserData(user.user_id));
                                };

                                setClickedModify(false);
                            };
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
                            {!clickedModify ? 'Modify' : 'Save'}
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
                        lineHeight: '1vh',
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
                        <p>Difficulty: <b>{difficulty ? difficulty.split('').map((el, i) => i === 0 ? el = el.toUpperCase() : el = el).join('') : 'Rush'}</b></p>
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

                    <div>
                        {
                            !clickedAccept ?
                            <div style={{display: 'flex', justifyContent: 'space-evenly', width: 'inherit', marginBottom: '1vh', width: '16vw'}}>
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
                                onClick={() => setClickedAccept(true)}
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
                            :
                            <div style={{
                                display: 'flex', 
                                justifyContent: 'space-evenly', 
                                margin: 'auto',
                                flexWrap: 'wrap',
                                width: '15vw',
                                backgroundColor: 'black',
                                border: '2px solid rgb(120, 120, 255)',
                                borderRadius: '12px',
                            }}>
                                <p style={{marginBottom: '0.5vh'}}>Cost Per Player: <b>{priceMap[time][difficulty]} points</b></p>
                                <p style={{marginBottom: '1vh'}}>Winner Receives: <b>{rewardMap[time][difficulty]} points</b></p>
                                <b style={{display: insufficientPoints ? 'block' : 'none', fontFamily: 'Bungee Spice', marginTop: '4vh'}}>Insufficient Points</b>

                                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                    <div 
                                    className="challenge-selections"
                                    onClick={() => setClickedAccept(false)}
                                    style={{cursor: 'pointer', width: '6vw', height: '5vh', lineHeight: '5vh'}}>
                                        Cancel
                                    </div>

                                    <div 
                                    className="challenge-selections"
                                    onClick={async () => {
                                        if (user.points_balance < priceMap[time][difficulty]) {
                                            setInsufficientPoints(true);
                                            return;
                                        };

                                        if (user.points_balance >= priceMap[time][difficulty]) {
                                            await dispatch(setInChallenge(true, 'challengee'));
                                            await dispatch(populateChallengeData(id, sender.id, receiver.id, time, difficulty));

                                            await dispatch(spendPoints(user.user_id, priceMap[time][difficulty]));
                                            await dispatch(copyTrophies());

                                            if (difficulty === null) await dispatch(setDifficulty('rush'));
                                            if (difficulty !== null) await dispatch(setDifficulty(difficulty));

                                            await history.push(`/game/${difficulty === null ? 'rush' : difficulty}`);

                                            await dispatch(setClickedProfile(false));
                                            await dispatch(setClickedChallenges(false));
                                        };
                                    }}
                                    style={{cursor: 'pointer', width: '6vw', height: '5vh', lineHeight: '5vh'}}>
                                        Start
                                    </div>
                                </div>
                            </div>
                        }
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
                        marginBottom: '2vh',
                        display: (completed && receiver.score > sender.score && redeemed) || (completed && sender.score === receiver.score) || (completed && receiver.score < sender.score) ? 'block' : 'none',
                        fontFamily: 'Bungee Spice',
                        fontSize: '20px',
                        width: '7vw',
                        height: '2vh',
                        lineHeight: '1vh',
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