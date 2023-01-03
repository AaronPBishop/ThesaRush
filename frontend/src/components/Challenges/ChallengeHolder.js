import { useState } from "react";
import { useSelector } from "react-redux";

import Challenge from "./Challenge.js";

const ChallengeHolder = () => {
    const user = useSelector(state => state.user);

    const [clickedSent, setClickedSent] = useState(true);
    const [clickedReceived, setClickedReceived] = useState(false);

    return (
        <div
        style={{
            width: '46vw',
            height: '82vh',
            border: '3px solid rgb(120, 120, 255)',
            borderRadius: '12px',
            boxShadow: 'blue 0px 1px 6px 1px',
            marginTop: '3vh'
        }}>
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
            style={{display: clickedSent ? 'flex' : 'none', justifyContent: 'space-between', margin: 'auto', width: '40vw', flexWrap: 'wrap'}}>
                <div>
                    <p>Pending</p>
                    <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'black', flexWrap: 'wrap', border: '2px solid rgb(255, 255, 60)', borderRadius: '12px', width: '18.5vw', height: '60vh', overflowY: 'auto'}}>
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
                    <p>Completed</p>
                    <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'black', flexWrap: 'wrap', border: '2px solid rgb(255, 255, 60)', borderRadius: '12px', width: '18.5vw', height: '60vh', overflowY: 'auto'}}>
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
            style={{display: clickedReceived ? 'flex' : 'none', justifyContent: 'space-between', margin: 'auto', width: '40vw', flexWrap: 'wrap'}}>
                <div>
                    <p>Pending</p>
                    <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'black', flexWrap: 'wrap', border: '2px solid rgb(255, 255, 60)', borderRadius: '12px', width: '18.5vw', height: '60vh', overflowY: 'auto'}}>
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
                    <p>Completed</p>
                    <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'black', flexWrap: 'wrap', border: '2px solid rgb(255, 255, 60)', borderRadius: '12px', width: '18.5vw', height: '60vh', overflowY: 'auto'}}>
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