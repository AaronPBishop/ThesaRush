import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginUserThunk } from '../../store/user.js';
import { setClickedLogIn } from '../../store/menu.js';

import { Eye } from '@styled-icons/heroicons-solid/Eye';

import './styles.css'

const LogInForm = () => {
    const dispatch = useDispatch();

    const errorState = useSelector(state => state.user.errors);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [clickedViewPass, setClickedViewPass] = useState(false);
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
            flexWrap: 'wrap',
            textAlign: 'center',
            margin: 'auto',
            marginTop: '18vh',
            paddingTop: '2vw',
            paddingBottom: '2vw',
            width: '24vw',
            height: '34vh',
            backgroundColor: 'rgb(20, 20, 20)',
            border: '2px solid #FFD700',
            borderRadius: '12px'
        }}>
            <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                textAlign: 'center',
                fontFamily: 'Roboto',
                margin: 'auto',
                marginBottom: '2vh',
                width: '16vw'
            }}>
                {errors.length > 0 && errors}
            </div>

            <label className='signup-inputs' style={{width: '18vw'}}>
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

            <label className='signup-inputs' style={{width: '20vw', marginTop: '-2vh'}}>
                <Eye
                onClick={() => setClickedViewPass(clicked => !clicked)}
                style={{
                    width: '1.2vw',
                    marginRight: '0.4vw',
                    color: 'rgb(225, 225, 225)',
                    cursor: 'pointer'
                }}>
                </Eye>

                <input
                  onKeyDown={handleKeyDown}
                  type={!clickedViewPass && 'password'}
                  className="signup-form-inputs"
                  value={password}
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{marginRight: '1.6vw'}}
                />
            </label>

            <div 
            onClick={() => setSubmitted(true)}
            className='signup-button'>
                Log In
            </div>
        </div>
    );
};

export default LogInForm;