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
            border: '2px solid rgb(225, 225, 40)',
            borderRadius: '12px',
            marginTop: '3vh'
        }}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div 
                onClick={() => setClickedSent(clicked => !clicked)}
                style={{borderTopLeftRadius: '12px', width: '12vw'}}
                className="navigation-buttons">
                    Sent
                </div>

                <div 
                onClick={() => setClickedReceived(clicked => !clicked)}
                style={{borderTopRightRadius: '12px', width: '12vw'}}
                className="navigation-buttons">
                    Received
                </div>
            </div>

            <div
            style={{display: clickedSent ? 'flex' : 'none', justifyContent: 'space-between', margin: 'auto', width: '38vw', flexWrap: 'wrap'}}>
                <div>
                    <p>Pending</p>
                    <div style={{display: 'flex', justifyContent: 'center', border: '1px solid red', width: '18.5vw', height: '60vh', overflowY: 'auto'}}>
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
                    <div style={{display: 'flex', justifyContent: 'center', border: '1px solid red', width: '18.5vw', height: '60vh', overflowY: 'auto'}}>
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
            style={{display: clickedReceived ? 'flex' : 'none', justifyContent: 'space-between', margin: 'auto', width: '38vw', flexWrap: 'wrap'}}>
                <div>
                    <p>Pending</p>
                    <div style={{display: 'flex', justifyContent: 'center', border: '1px solid red', width: '18.5vw', height: '60vh', overflowY: 'auto'}}>
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
                    <div style={{display: 'flex', justifyContent: 'center', border: '1px solid red', width: '18.5vw', height: '60vh', overflowY: 'auto'}}>
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