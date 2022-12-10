import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginUserThunk, fetchUserData } from '../../store/user.js';
import { setClickedLogIn } from '../../store/menu.js';

import './styles.css'

const LogInForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(loginUserThunk(email, password));
        dispatch(setClickedLogIn(false));
    };

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            margin: 'auto',
            marginTop: '18vh',
            padding: '2vw',
            width: '16vw',
            backgroundColor: 'rgb(20, 20, 20)',
            border: '2px solid #FFD700',
            borderRadius: '12px'
        }}>
            <form onSubmit={handleSubmit}>
                <label className='signup-inputs'>
                    <input
                      type="text"
                      className="signup-form-inputs"
                      value={email}
                      placeholder='Email'
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                </label>

                <label className='signup-inputs'>
                    <input
                      type="text"
                      className="signup-form-inputs"
                      value={password}
                      placeholder='Password'
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                </label>

                <button type='submit' id='signup-button'>
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LogInForm;