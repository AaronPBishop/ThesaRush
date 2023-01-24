import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { setClickedLeague } from '../../store/menu.js';
import { setInChallenge, populateChallengeData } from "../../store/challenge.js";
import { spendPoints } from '../../store/user.js';

const ChallengeTime = ({ senderId, receiverId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [clickedTimeLimit, setClickedTimeLimit] = useState(false);
    const [timeSelected, setTimeSelected] = useState(0);

    const priceMap = {
        60000: 50,
        120000: 100,
        180000: 150
    };

    const rewardMap = {
        60000: 500,
        120000: 650,
        180000: 800
    };

    return (
        <div
        style={{
            display: 'flex', 
            justifyContent: 'center', 
            fontFamily: 'Roboto',
            border: '2px solid rgb(120, 120, 255)',
            borderRadius: '12px',
            width: '20vw', 
            height: '22vh',
            backgroundColor: 'black',
            flexWrap: 'wrap', 
            margin: 'auto', 
            marginBottom: '2vh',
            overflowY: 'auto'
        }}>
            {
                !clickedTimeLimit ?
                <div>
                    <p>Choose a Time</p>

                    <div 
                    className='challenge-times'
                    onClick={e => {
                        e.stopPropagation();
                        setClickedTimeLimit(true);
                        setTimeSelected(60000);
                    }}>One Minute</div>

                    <div
                    className='challenge-times' 
                    onClick={e => { 
                        e.stopPropagation();
                        setClickedTimeLimit(true);
                        setTimeSelected(120000);
                    }}>Two Minutes</div>

                    <div 
                    className='challenge-times'
                    onClick={e => {
                        e.stopPropagation();
                        setClickedTimeLimit(true);
                        setTimeSelected(180000);
                    }}>Three Minutes</div>
                </div>
                :
                <div style={{display: 'flex', justifyContent: 'center', margin: 'auto', width: '16vw', flexWrap: 'wrap', cursor: 'default'}}>
                    <p style={{marginBottom: '-0.5vh'}}>Cost Per Player: <b>{priceMap[timeSelected]} points</b></p>
                    <p style={{marginBottom: '1vh'}}>Winner Receives: <b>{rewardMap[timeSelected]} points</b></p>

                    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <div 
                        className="challenge-times"
                        style={{cursor: 'pointer', width: '6vw', height: '5vh', lineHeight: '5vh'}}>
                            Cancel
                        </div>

                        <div 
                        className="challenge-times"
                        onClick={e => {
                            e.stopPropagation();

                            dispatch(setClickedLeague(false));
                            dispatch(setInChallenge(true, 'challenger'));
                            dispatch(populateChallengeData(null, senderId, receiverId, timeSelected));
                            dispatch(spendPoints(senderId, priceMap[timeSelected]));

                            history.push('/game/rush');
                        }}
                        style={{cursor: 'pointer', width: '6vw', height: '5vh', lineHeight: '5vh'}}>
                            Start
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ChallengeTime;