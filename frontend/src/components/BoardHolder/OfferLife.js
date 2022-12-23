import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { clearColumn } from "../../store/game.js";
import { buyLife, spendLife } from "../../store/user.js";
import { setPaused, loadOffer } from '../../store/offerStatuses.js';

const OfferLife = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const offerState = useSelector(state => state.offerStatuses.loadOffer);
    const backgroundColor = useSelector(state => state.menu.backgroundColor);

    useEffect(() => {if (offerState === true) dispatch(setPaused(true))}, [offerState]);

    return (
        <div
        id='offerlife-container'
        style={{display: offerState === true ? 'flex' : 'none', background: backgroundColor}}>
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '10vw', margin: 'auto'}}>
                <div 
                onClick={() => {
                    if (user.lives > 0) {
                        dispatch(spendLife(user.user_id));
                        dispatch(clearColumn());
                        dispatch(setPaused(false));
                        dispatch(loadOffer(false));

                        return;
                    };
                    
                    if (user.lives < 1) {
                        dispatch(buyLife(user.user_id));
                        dispatch(spendLife(user.user_id));
                        dispatch(clearColumn());
                        dispatch(setPaused(false));
                        dispatch(loadOffer(false));
        
                        return;
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
                    {user.lives > 0 ? 'USE LIFE' : 'BUY LIFE'}
                </div>
                
                <p>{user.lives > 0 ? `${user.lives} lives available` : '-1000 points'}</p>
                <b style={{visibility: user.lives < 1 ? 'visible' : 'hidden'}}>{`${user.points_balance} points available`}</b>
            </div>
        </div>
    );
};

export default OfferLife;