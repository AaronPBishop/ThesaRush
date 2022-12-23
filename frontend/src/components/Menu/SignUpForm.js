import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { signUpUserThunk } from '../../store/user.js';
import { setClickedSignUp } from '../../store/menu.js';

import './styles.css'

const SignUpForm = () => {
    const dispatch = useDispatch();
    
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errorsArr = [];

        const validateEmail = (email) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };

        if (submitted === true) {
            if (!validateEmail(email)) {
                errorsArr.push('Must use a valid email');
                setErrors(errorsArr);
                
                setSubmitted(false);
            } else {
                handleSubmit();
            };
        };
    }, [submitted]);

    const handleSubmit = () => {
        dispatch(signUpUserThunk(userName, email.toLowerCase(), password));

        dispatch(setClickedSignUp(false));
    };

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: 'auto',
            marginTop: '18vh',
            padding: '2vw',
            width: '16vw',
            backgroundColor: 'rgb(20, 20, 20)',
            border: '2px solid #FFD700',
            borderRadius: '12px'
        }}>
            <div
            style={{
                fontFamily: 'Roboto',
                marginBottom: '2vh'
            }}>
                {errors.length > 0 && errors}
            </div>

            <form>
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

                <button
                onClick={e => {
                    e.preventDefault();
                    setSubmitted(true);
                }}
                id='signup-button'>
                    Confirm
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;