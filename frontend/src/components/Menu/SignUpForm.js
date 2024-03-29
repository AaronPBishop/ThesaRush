import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signUpUserThunk } from '../../store/user.js';
import { setClickedSignUp } from '../../store/menu.js';

import { Eye } from '@styled-icons/heroicons-solid/Eye';

import './styles.css'

const SignUpForm = () => {
    const dispatch = useDispatch();

    const errorState = useSelector(state => state.user.errors);
    
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [clickedViewPass, setClickedViewPass] = useState(false);

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleKeyDown = e => {if (e.key === "Enter") setSubmitted(true)};

    useEffect(() => {
        const errorsArr = [];

        const validateEmail = (email) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };

        if (submitted === true) {
            if (!validateEmail(email)) {
                errorsArr.push('Must Use a Valid Email');
                setErrors(errorsArr);
                
                setSubmitted(false);
                return;
            };

            if (userName.length < 3) {
                errorsArr.push('Username Must Be 3 Characters or Longer');
                setErrors(errorsArr);
                
                setSubmitted(false);
                return;
            };

            if (userName.length > 10) {
                errorsArr.push('Username Cannot Exceed 10 Characters');
                setErrors(errorsArr);
                
                setSubmitted(false);
                return;
            };

            if (password.length < 4) {
                errorsArr.push('Password Too Short');
                setErrors(errorsArr);
                
                setSubmitted(false);
                return;
            };

            dispatch(signUpUserThunk(userName, email.toLowerCase(), password));
        };
    }, [submitted]);

    useEffect(() => {
        if (errorState.length) {
            setErrors(errorState);
            setSubmitted(false);
        } else {
            dispatch(setClickedSignUp(false));

            setUserName('');
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
            margin: 'auto',
            marginTop: '18vh',
            paddingTop: '2vw',
            paddingBottom: '2vw',
            width: '24vw',
            height: '40vh',
            backgroundColor: 'rgb(20, 20, 20)',
            border: '2px solid #FFD700',
            borderRadius: '12px'
        }}>
            <div
            style={{
                fontFamily: 'Roboto',
                marginBottom: '2vh',
                width: '16vw'
            }}>
                {errors.length > 0 && errors}
            </div>
            
            <label className='signup-inputs'>
                <input
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
                  type="text"
                  className="signup-form-inputs"
                  value={email}
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
            </label>

            <label className='signup-inputs' style={{width: '20vw'}}>
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
                Confirm
            </div>
        </div>
    );
};

export default SignUpForm;