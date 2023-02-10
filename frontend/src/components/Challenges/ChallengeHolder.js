import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setClaimedPoints } from "../../store/menu.js";
import { clearPointsRedeemed } from "../../store/challenge.js";
import { findPlayerByCredential } from "../../store/user.js";

import Challenge from "./Challenge.js";
import ChallengePoints from "./ChallengePoints.js";
import ChallengeTime from "../League/ChallengeTime.js";

const ChallengeHolder = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const pointStatus = useSelector(state => state.menu.claimedPoints);
    const pointsRedeemed = useSelector(state => state.challenge.pointsRedeemed);

    const [sentNotifications, setSentNotifications] = useState(null);
    const [receivedNotifications, setReceivedNotifications] = useState(null);

    const [clickedSent, setClickedSent] = useState(true);
    const [clickedReceived, setClickedReceived] = useState(false);
    const [clickedSendChallenge, setClickedSendChallenge] = useState(false);
    const [recipientInput, setRecipientInput] = useState('');

    useEffect(() => {
        const totalSentNotifications = user.sent_challenges.filter(challenge => (challenge.sender.score > challenge.receiver.score) && (challenge.completed === true) && (challenge.redeemed === false));
        const totalReceivedNotifications = user.received_challenges.filter(challenge => (challenge.receiver.score === null) && (challenge.completed === false));

        setSentNotifications(totalSentNotifications.length);
        setReceivedNotifications(totalReceivedNotifications.length);
    }, [user]);

    useEffect(() => {
        if (pointStatus === true) {
            const pointsTimer = setTimeout(() => {
                dispatch(setClaimedPoints(false));
                dispatch(clearPointsRedeemed());
            }, 2000);

            return () => clearTimeout(pointsTimer);
        };
    }, [pointStatus]);

    return (
        <div
        style={{
            width: '46vw',
            height: '82vh',
            border: '3px solid rgb(120, 120, 255)',
            borderRadius: '12px',
            boxShadow: 'blue 0px 0.1px 6px 1px',
            marginTop: '3vh'
        }}>
            <div style={{display: 'flex', justifyContent: 'center', margin: 'auto'}}>
                <div style={{position: 'absolute', height: '14vh'}}>
                    <ChallengePoints hidden={pointStatus} numPoints={pointsRedeemed} />
                </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '2vh'}}>
                <div 
                onClick={() => {
                    if (clickedReceived) {
                        setClickedReceived(false);
                        setClickedSent(clicked => !clicked);
                    };
                }}
                style={{borderTopLeftRadius: '12px', width: '12vw', height: '4vh'}}
                className="navigation-buttons">
                    <div
                    style={{
                        display: sentNotifications !== null && sentNotifications > 0 ? 'block' : 'none',
                        boxShadow: '0px 0px 4px 0.1px black',
                        backgroundColor: 'rgb(30, 0, 90)',
                        lineHeight: '3.4vh',
                        width: '1.5vw',
                        height: '1.5vw',
                        padding: '0.5vh',
                        borderRadius: '100px',
                        position: 'absolute',
                        marginTop: '-1.3vh',
                        marginLeft: '-0.7vw'
                    }}>
                        <b style={{fontSize: '16px'}}>{sentNotifications}</b>
                    </div>

                    <p style={{lineHeight: '0vh', color: clickedSent === true && 'rgb(95, 255, 0)'}}>Sent</p>
                </div>

                <div 
                onClick={() => {
                    if (clickedSent) {
                        setClickedSent(false);
                        setClickedReceived(clicked => !clicked)
                    };
                }}
                style={{borderTopRightRadius: '12px', width: '12vw', height: '4vh'}}
                className="navigation-buttons">
                    <div
                    style={{
                        display: receivedNotifications !== null && receivedNotifications > 0 ? 'block' : 'none',
                        boxShadow: '0px 0px 4px 0.1px black',
                        backgroundColor: 'rgb(30, 0, 90)',
                        lineHeight: '3.4vh',
                        width: '1.5vw',
                        height: '1.5vw',
                        padding: '0.5vh',
                        borderRadius: '100px',
                        position: 'absolute',
                        marginTop: '-1.3vh',
                        marginLeft: '10.7vw'
                    }}>
                        <b style={{fontSize: '16px'}}>{receivedNotifications}</b>
                    </div>

                    <p style={{lineHeight: '0vh', color: clickedReceived === true && 'rgb(95, 255, 0)'}}>Received</p>
                </div>
            </div>

            <div
            style={{display: clickedSent ? 'flex' : 'none', justifyContent: 'space-between', margin: 'auto', width: '42vw', flexWrap: 'wrap'}}>
                <div>
                    <p style={{fontFamily: 'Bungee Spice'}}>Pending</p>
                    <div 
                    style={{display: 'flex', justifyContent: 'center', margin: 'auto', backgroundColor: 'black', flexWrap: 'wrap', border: '2.5px solid rgb(120, 120, 255)', borderRadius: '12px', width: '19vw', height: '60vh', overflowY: 'auto'}}>
                        <div>
                            <input 
                            id='recipient-input' 
                            placeholder='Username or Email'
                            onChange={e => setRecipientInput(e.target.value)}
                            style={{
                                display: clickedSendChallenge ? 'block' : 'none',
                                marginTop: '2vh',
                                width: '12vw',
                                height: '5vh'
                            }}>
                            </input>

                            <div
                            onClick={async () => {
                                if (!clickedSendChallenge) {
                                    setClickedSendChallenge(true);
                                    return;
                                };

                                if (clickedSendChallenge) {
                                    if (recipientInput.length > 0) {
                                        dispatch(findPlayerByCredential(recipientInput));
                                    };

                                    setClickedSendChallenge(false);
                                };
                            }}
                            style={{
                                display: user.newChallenge.recipientId === null ? 'block' : 'none',
                                lineHeight: '5vh',
                                margin: 'auto',
                                marginTop: clickedSendChallenge ? '1vh' : '2vh',
                                width: '12vw',
                                height: '5vh',
                                backgroundColor: 'rgb(140, 0, 55)',
                                borderBottom: '3px solid rgb(105, 0, 40)',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}>
                                {!clickedSendChallenge ? 'Send Challenge' : 'Start Challenge'}
                            </div>

                            <div
                            style={{
                                display: user.newChallenge.recipientId === null ? 'none' : 'flex',
                                position: 'relative',
                                marginTop: '2vh',
                                width: '17vw'
                            }}>
                                <ChallengeTime senderId={user.user_id} receiverId={user.newChallenge.recipientId} />
                            </div>

                            <div style={{
                                display: user.newChallenge.errors.length ? 'block' : 'none',
                                fontSize: '12px', 
                                fontStyle: 'italic', 
                                color: 'rgb(95, 255, 0)', 
                                width: '16vw', 
                                height: '2.5vh', 
                                lineHeight: '4vh',
                            }}>
                                    {user.newChallenge.errors}
                            </div>

                            {
                                user.sent_challenges.sort((a, b) => b.challenge_id - a.challenge_id).map((challenge, i) => {
                                    if (challenge.completed === false) return (
                                        <div style={{display: 'flex', justifyContent: 'center', margin: 'auto', marginTop: '4vh', marginBottom: '2vh'}} key={i}>
                                            <Challenge id={challenge.challenge_id} type={'sent'} sender={challenge.sender} receiver={challenge.receiver} time={challenge.time} difficulty={challenge.difficulty} completed={challenge.completed} redeemed={challenge.redeemed} />
                                        </div>
                                    )
                                })
                            }

                            <div
                            style={{
                                display: user.sent_challenges.filter(challenge => challenge.completed === false && challenge.redeemed === false).length < 1 ? 'block' : 'none',
                                margin: 'auto',
                                marginTop: '2vh',
                                fontFamily: 'Bungee Spice',
                                width: '16vw',
                                height: '26vh',
                                borderBottom: '4px solid rgb(20, 0, 50)',
                                borderRadius: '12px',
                                background: 'linear-gradient(rgb(30, 0, 90), rgb(20, 0, 70))',
                                overflowX: 'hidden',
                                overflowY: 'auto'
                            }}>
                                <p style={{marginTop: '10vh'}}>Nothing Pending!</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <p style={{fontFamily: 'Bungee Spice'}}>Completed</p>
                    <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'black', flexWrap: 'wrap', border: '2.5px solid rgb(120, 120, 255)', borderRadius: '12px', width: '19vw', height: '60vh', overflowY: 'auto'}}>
                        {
                            user.sent_challenges.filter(challenge => challenge.completed).length > 0 ?
                            user.sent_challenges.sort((a, b) => b.challenge_id - a.challenge_id).map((challenge, i) => {
                                if (challenge.completed === true) return (
                                    <div style={{marginTop: '2vh', marginBottom: '2vh'}} key={i}>
                                        <Challenge id={challenge.challenge_id} type={'sent'} sender={challenge.sender} receiver={challenge.receiver} time={challenge.time} difficulty={challenge.difficulty} completed={challenge.completed} redeemed={challenge.redeemed} />
                                    </div>
                                )
                            })
                            :
                            <div
                            style={{
                                marginTop: '2vh',
                                fontFamily: 'Bungee Spice',
                                width: '16vw',
                                height: '26vh',
                                borderBottom: '4px solid rgb(20, 0, 50)',
                                borderRadius: '12px',
                                background: 'linear-gradient(rgb(30, 0, 90), rgb(20, 0, 70))',
                                overflowX: 'hidden',
                                overflowY: 'auto'
                            }}>
                            <p style={{marginTop: '10vh'}}>Nothing Completed!</p>
                        </div>
                        }
                    </div>
                </div>
            </div>

            <div
            style={{display: clickedReceived ? 'flex' : 'none', justifyContent: 'space-between', margin: 'auto', width: '42vw', flexWrap: 'wrap'}}>
                <div>
                    <p style={{fontFamily: 'Bungee Spice'}}>Pending</p>
                    <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'black', flexWrap: 'wrap', border: '2.5px solid rgb(120, 120, 255)', borderRadius: '12px', width: '19vw', height: '60vh', overflowY: 'auto'}}>
                        {
                            user.received_challenges.sort((a, b) => b.challenge_id - a.challenge_id).map((challenge, i) => {
                                if (challenge.completed === false) return (
                                    <div style={{marginTop: '2vh', marginBottom: '2vh'}} key={i}>
                                        <Challenge id={challenge.challenge_id} type={'received'} sender={challenge.sender} receiver={challenge.receiver} time={challenge.time} difficulty={challenge.difficulty} completed={challenge.completed} redeemed={challenge.redeemed} />
                                    </div>
                                )
                            })
                        }

                        <div
                        style={{
                            display: user.received_challenges.filter(challenge => challenge.completed === false && challenge.redeemed === false).length < 1 ? 'block' : 'none',
                            marginTop: '2vh',
                            fontFamily: 'Bungee Spice',
                            width: '16vw',
                            height: '26vh',
                            borderBottom: '4px solid rgb(20, 0, 50)',
                            borderRadius: '12px',
                            background: 'linear-gradient(rgb(30, 0, 90), rgb(20, 0, 70))',
                            overflowX: 'hidden',
                            overflowY: 'auto'
                        }}>
                            <p style={{marginTop: '10vh'}}>Nothing Pending!</p>
                        </div>
                    </div>
                </div>
                
                <div>
                    <p style={{fontFamily: 'Bungee Spice'}}>Completed</p>
                    <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'black', flexWrap: 'wrap', border: '2.5px solid rgb(120, 120, 255)', borderRadius: '12px', width: '19vw', height: '60vh', overflowY: 'auto'}}>
                        {
                            user.received_challenges.filter(challenge => challenge.completed).length > 0 ?
                            user.received_challenges.sort((a, b) => b.challenge_id - a.challenge_id).map((challenge, i) => {
                                if (challenge.completed === true) return (
                                    <div style={{marginTop: '2vh', marginBottom: '2vh'}} key={i}>
                                        <Challenge id={challenge.challenge_id} type={'received'} sender={challenge.sender} receiver={challenge.receiver} time={challenge.time} difficulty={challenge.difficulty} completed={challenge.completed} redeemed={challenge.redeemed} />
                                    </div>
                                )
                            })
                            :
                            <div
                            style={{
                                marginTop: '2vh',
                                fontFamily: 'Bungee Spice',
                                width: '16vw',
                                height: '26vh',
                                borderBottom: '4px solid rgb(20, 0, 50)',
                                borderRadius: '12px',
                                background: 'linear-gradient(rgb(30, 0, 90), rgb(20, 0, 70))',
                                overflowX: 'hidden',
                                overflowY: 'auto'
                            }}>
                            <p style={{marginTop: '10vh'}}>Nothing Completed!</p>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeHolder;