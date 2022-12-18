import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { clearColumn } from "../../store/game.js";
import { buyLife, spendLife } from "../../store/user.js";
import { setPaused, loadOffer } from '../../store/statuses.js';

const OfferLife = ({ userLives }) => {
    const dispatch = useDispatch();

    const [insufficient, setInsufficient] = useState(false);

    const user = useSelector(state => state.user);
    const offerState = useSelector(state => state.statuses.loadOffer);
    const backgroundColor = useSelector(state => state.menu.backgroundColor);

    useEffect(() => {if (offerState === true) dispatch(setPaused(true))}, [offerState]);

    return (
        <div
        id='offerlife-container'
        style={{display: offerState === true ? 'flex' : 'none', backgroundColor: backgroundColor}}>
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '10vw', margin: 'auto'}}>
                <div 
                onClick={() => {
                    if (userLives > 0) {
                        dispatch(spendLife(user.user_id));
                        dispatch(clearColumn());
                        dispatch(setPaused(false));
                        dispatch(loadOffer(false));

                        return;
                    };
                    
                    if (userLives < 1) {
                        if (user.points_balance >= 1000) {
                            dispatch(buyLife(user.user_id));
                            dispatch(spendLife(user.user_id));
                            dispatch(clearColumn());
                            dispatch(setPaused(false));
                            dispatch(loadOffer(false));
            
                            return;
                        } else {
                            setInsufficient(true);
                        };
                    };
                }}
                style={{
                    padding: '1vw',
                    backgroundColor: 'rgb(140, 0, 55)', 
                    borderBottom: '3.5px solid rgb(105, 0, 40)',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}>
                    {userLives > 0 ? 'USE LIFE' : insufficient === true ? 'NOT ENOUGH POINTS' : 'BUY LIFE'}
                </div>
                
                <p>{userLives > 0 ? `${userLives} lives available` : '-1000 points'}</p>
            </div>
        </div>
    );
};

export default OfferLife;