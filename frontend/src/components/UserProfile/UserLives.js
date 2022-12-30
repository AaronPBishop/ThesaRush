import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { buyLife } from '../../store/user.js';

const UserLives = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const [error, setError] = useState('');

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '12vh',
            maxWidth: '10vw',
            maxHeight: '10vh',
            marginLeft: '0.2vw'
        }}>
            <p style={{marginBottom: '-1.5vh'}}>Lives Available: <b>{user.lives}</b></p>
            <p style={{marginBottom: '1.5vh'}}>Points balance: <b>{user.points_balance}</b></p>

            <div
            style={{
                backgroundColor: 'rgb(140, 0, 55)',
                border: 'none',
                borderBottom: '3.5px solid rgb(105, 0, 40)',
                borderRadius: '12px',
                width: '10vw',
                padding: '1.5vh',
                cursor: 'pointer',
            }}
            onClick={() => {
                if (user.points_balance < 1000) {
                    setError('Not enough points');
                    return;
                };
            
                dispatch(buyLife(user.user_id));
            }}>
                {
                    error.length > 0 ? error :
                    <div>
                        Buy Life
                        <br/>
                        -1,000 points
                    </div>
                }
            </div>
        </div>
    );
};

export default UserLives;