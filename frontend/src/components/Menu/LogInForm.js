import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginUserThunk } from '../../store/user.js';
import { setClickedLogIn } from '../../store/menu.js';

import './styles.css'

const LogInForm = () => {
    const dispatch = useDispatch();

    const errorState = useSelector(state => state.user.errors);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleKeyDown = e => {if (e.key === "Enter") setSubmitted(true)};

    useEffect(() => {
        if (submitted === true) {
            dispatch(loginUserThunk(email.toLowerCase(), password));
        };
    }, [submitted]);

    useEffect(() => {
        if (errorState.length) {
            setErrors(errorState);
            setSubmitted(false);
        } else {
            dispatch(setClickedLogIn(false));

            setEmail('');
            setPassword('');
            setErrors([]);
        };
    }, [dispatch, errorState]);

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            margin: 'auto',
            marginTop: '18vh',
            padding: '2vw',
            width: '16vw',
            backgroundColor: 'rgb(20, 20, 20)',
            border: '2px solid #FFD700',
            borderRadius: '12px'
        }}>
            <div>
                <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontFamily: 'Roboto',
                    margin: 'auto',
                    marginBottom: '2vh',
                    maxWidth: '12vw'
                }}>
                    {errors.length > 0 && errors}
                </div>
                <label className='signup-inputs'>
                    <input
                      onKeyDown={handleKeyDown}
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
                      onKeyDown={handleKeyDown}
                      type="password"
                      className="signup-form-inputs"
                      value={password}
                      placeholder='Password'
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                </label>

                <div 
                onClick={() => setSubmitted(true)}
                className='signup-button'>
                    Log In
                </div>
            </div>
        </div>
    );
};

export default LogInForm;