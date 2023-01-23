import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setClaimedPoints } from "../../store/menu.js";
import { clearPointsRedeemed } from "../../store/challenge.js";

import Challenge from "./Challenge.js";
import ChallengePoints from "./ChallengePoints.js";

const ChallengeHolder = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const pointStatus = useSelector(state => state.menu.claimedPoints);
    const pointsRedeemed = useSelector(state => state.challenge.pointsRedeemed);

    const [clickedSent, setClickedSent] = useState(true);
    const [clickedReceived, setClickedReceived] = useState(false);

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
                    <p style={{lineHeight: '0vh', color: clickedSent === true && 'rgb(255, 255, 60)'}}>Sent</p>
                </div>

                <div 
                onClick={() => {
                    if (clickedSent) {
                        setClickedSent(false);
                        setClickedReceived(clicked => !clicked)
                    };
                }}
                style={{lineHeight: '0vh', borderTopRightRadius: '12px', width: '12vw', height: '4vh'}}
                className="navigation-buttons">
                    <p style={{color: clickedReceived === true && 'rgb(255, 255, 60)'}}>Received</p>
                </div>
            </div>

            <div
            style={{display: clickedSent ? 'flex' : 'none', justifyContent: 'space-between', margin: 'auto', width: '42vw', flexWrap: 'wrap'}}>
                <div>
                    <p style={{fontFamily: 'Bungee Spice'}}>Pending</p>
                    <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'black', flexWrap: 'wrap', border: '2.5px solid rgb(120, 120, 255)', borderRadius: '12px', width: '19vw', height: '60vh', overflowY: 'auto'}}>
                    {
                        user.sent_challenges.map((challenge, i) => {
                            if (challenge.completed === false) return (
                                <div style={{marginTop: '2vh', marginBottom: '2vh'}} key={i}>
                                    <Challenge id={challenge.challenge_id} type={'sent'} sender={challenge.sender} receiver={challenge.receiver} time={challenge.time} completed={challenge.completed} redeemed={challenge.redeemed} />
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                
                <div>
                    <p style={{fontFamily: 'Bungee Spice'}}>Completed</p>
                    <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'black', flexWrap: 'wrap', border: '2.5px solid rgb(120, 120, 255)', borderRadius: '12px', width: '19vw', height: '60vh', overflowY: 'auto'}}>
                        {
                            user.sent_challenges.map((challenge, i) => {
                                if (challenge.completed === true) return (
                                    <div style={{marginTop: '2vh', marginBottom: '2vh'}} key={i}>
                                        <Challenge id={challenge.challenge_id} type={'sent'} sender={challenge.sender} receiver={challenge.receiver} time={challenge.time} completed={challenge.completed} redeemed={challenge.redeemed} />
                                    </div>
                                )
                            })
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
                        user.received_challenges.map((challenge, i) => {
                            if (challenge.completed === false) return (
                                <div style={{marginTop: '2vh', marginBottom: '2vh'}} key={i}>
                                    <Challenge id={challenge.challenge_id} type={'received'} sender={challenge.sender} receiver={challenge.receiver} time={challenge.time} completed={challenge.completed} redeemed={challenge.redeemed} />
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                
                <div>
                    <p style={{fontFamily: 'Bungee Spice'}}>Completed</p>
                    <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'black', flexWrap: 'wrap', border: '2.5px solid rgb(120, 120, 255)', borderRadius: '12px', width: '19vw', height: '60vh', overflowY: 'auto'}}>
                        {
                            user.received_challenges.map((challenge, i) => {
                                if (challenge.completed === true) return (
                                    <div style={{marginTop: '2vh', marginBottom: '2vh'}} key={i}>
                                        <Challenge id={challenge.challenge_id} type={'received'} sender={challenge.sender} receiver={challenge.receiver} time={challenge.time} completed={challenge.completed} redeemed={challenge.redeemed} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeHolder;