import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signUpUserThunk, fetchUserData } from '../../store/user.js';

const SignUpForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(signUpUserThunk(userName, email, password));
    };

    useEffect(() => {
        if (user.userId) dispatch(fetchUserData(user.userId))
    }, [user]);

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
                      value={userName}
                      placeholder='User Name'
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                </label>

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
                    Confirm
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;