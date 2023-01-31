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
            flexWrap: 'wrap'
        }}>
            <div
            style={{
                backgroundColor: 'rgb(140, 0, 55)',
                border: 'none',
                borderBottom: '3.5px solid rgb(105, 0, 40)',
                borderRadius: '12px',
                width: '9vw',
                height: '5vh',
                padding: '1.5vh',
                cursor: 'pointer'
            }}
            onClick={() => {
                if (user.points_balance < 500) {
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
                        -500 points
                    </div>
                }
            </div>
        </div>
    );
};

export default UserLives;