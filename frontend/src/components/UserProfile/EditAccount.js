import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editUserAccountInfo, deleteUserData } from '../../store/user.js';
import { setClickedEditAccount, setClickedProfile } from '../../store/menu.js';

const EditAccount = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    
    const [userName, setUserName] = useState(user.user_name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);
    const [clickedDelete, setClickedDelete] = useState(false);

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
        dispatch(editUserAccountInfo(user.user_id, userName, email, password));
        dispatch(setClickedEditAccount(false));
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
            height: '46vh',
            backgroundColor: 'rgb(20, 20, 20)',
            border: '2px solid #FFD700',
            borderRadius: '12px'
        }}>
            {
                !clickedDelete ?
                <div>
                    <div
                    style={{
                        display: errors.length > 0 ? 'block' : 'none',
                        fontFamily: 'Roboto',
                        marginTop: '-2vh',
                        marginBottom: '1.5vh'
                    }}>
                        {errors.length > 0 && errors}
                    </div>
                
                    <form>
                        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '2vh'}}>
                            <div
                            className='edit-account-btns'
                            onClick={() => dispatch(setClickedEditAccount(false))}
                            style={{
                                lineHeight: '1.6vh',
                                marginTop: '0vh',
                                height: '2vh',
                                minWidth: '6vw',
                                maxWidth: '6vw'
                            }}>
                                Back
                            </div>
                        </div>

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
                
                        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                            <div
                            className='edit-account-btns'
                            onClick={() => setSubmitted(true)}>
                                Confirm Changes
                            </div>
                        
                            <div
                            className='edit-account-btns'
                            onClick={() => setClickedDelete(true)}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '3vh'
                            }}>
                                Delete Account
                            </div>
                        </div>
                    </form>
                </div>
                :
                <div>
                    <div
                    className='edit-account-btns'
                    onClick={() => setClickedDelete(false)}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '6vh'
                    }}>
                        Take Me Back
                    </div>

                    <p>Are you sure you want to delete?</p>
                    <p>This will erase <b>all</b> progress.</p>
                    <p>Lost data <b>cannot</b> be recovered.</p>

                    <div
                    className='edit-account-btns'
                    onClick={async () => {
                        await dispatch(setClickedEditAccount(false));
                        await dispatch(setClickedProfile(false));
                        await dispatch(deleteUserData(user.user_id));
                    }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '6vh'
                    }}>
                        Confirm Account Deletion
                    </div>
                </div>
            }
        </div>
    );
};

export default EditAccount;