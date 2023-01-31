import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Navigation from '../Navigation/Navigation.js';
import LogInForm from './LogInForm.js';
import SignUpForm from './SignUpForm.js';
import Difficulties from './Difficulties';
import Instructions from './Instructions.js';
import Themes from './Themes.js';
import League from '../League/League.js';
import UserProfile from '../UserProfile/UserProfile.js';

import { placeUserLeague } from '../../store/user.js';

import './styles.css';

const Menu = () => {
    const dispatch = useDispatch();

    const [shouldDisplay, setShouldDisplay] = useState(true);
    const [clickedPlay, setClickedPlay] = useState(false);
    const [clickedInstructions, setClickedInstructions] = useState(false);
    const [clickedTheme, setClickedTheme] = useState(false);
    const [clickedBack, setClickedBack] = useState(false);

    const menu = useSelector(state => state.menu);
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (document.documentElement.clientWidth < 950) setShouldDisplay(false);

        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.go(1);
        };
        
        if (user.user_name) dispatch(placeUserLeague(user.user_id))
    }, []);

    if (shouldDisplay === false) return (
        <div id='phone-display'>
            <p style={{width: '60vw', marginTop: '10vh', marginBottom: '-10vh', padding: '2vw', lineHeight: '6vh'}}>
                ThesaRush is not designed to play on a phone
            </p>
            <p style={{width: '60vw', padding: '2vw'}}>
                Please return on a desktop!
            </p>
        </div>
    );

    return (
        menu.clickedProfile === true ? <UserProfile /> :
        <div
        style={{background: menu.backgroundColor, overflowY: clickedInstructions ? 'auto' : clickedPlay && 'auto'}} 
        id='menu-box'>
            <div 
            style={{
                display: !clickedPlay && !clickedInstructions && !clickedTheme ? 'block' : 'none',
                marginBottom: '-5vh'
            }}>
                <Navigation />
            </div>

            <div style={{display: menu.clickedSignUp === false ? 'none' : 'block'}}>
                <SignUpForm />
            </div>

            <div style={{display: menu.clickedLogIn === false ? 'none' : 'block'}}>
                <LogInForm />
            </div>

            <div style={{display: menu.clickedLeague === false ? 'none' : 'block'}}>
                <League />
            </div>

            <div style={{display: (menu.clickedSignUp === false) && (menu.clickedLogIn === false) && (menu.clickedLeague === false) ? 'block' : 'none'}}>
                <div 
                className='menu-button-divs'
                onClick={() => {
                    setClickedBack(false);
                    setClickedPlay(true);
                }}
                style={{
                    position: 'relative', 
                    display: (clickedPlay === false) && (clickedInstructions === false) && (clickedTheme === false) ? 'flex' : 'none',
                    backgroundColor: 'rgb(10, 50, 100)', 
                    borderBottom: '4px solid rgb(0, 35, 80)'
                }}>
                    <button
                    className='menu-buttons'
                    >
                        Play
                    </button>
                </div>

                <div 
                className='menu-button-divs'
                onClick={() => {
                    setClickedBack(false);
                    setClickedInstructions(true);
                }}
                style={{
                    position: 'relative', 
                    display: (clickedPlay === false) && (clickedInstructions === false) && (clickedTheme === false) ? 'flex' : 'none',
                    backgroundColor: 'rgb(0, 100, 60)', 
                    borderBottom: '4px solid rgb(0, 70, 30)'
                }}>
                    <button
                    className='menu-buttons'
                    >
                        Instructions
                    </button>
                </div>

                <div 
                className='menu-button-divs'
                onClick={() => {
                    setClickedBack(false);
                    setClickedTheme(true);
                }}
                style={{
                    position: 'relative', 
                    display: (clickedPlay === false) && (clickedInstructions === false) && (clickedTheme === false) ? 'flex' : 'none',
                    backgroundColor: 'rgb(255, 140, 0)', 
                    borderBottom: '4px solid rgb(205, 90, 0)'
                }}>
                    <button
                    className='menu-buttons'
                    >
                        Theme
                    </button>
                </div>
            </div>

            <div 
            style={{
                display: clickedPlay === true ? 'flex' : 'none',
                justifyContent: 'center',
                margin: 'auto',
                flexWrap: 'wrap',
                position: 'relative', 
                maxWidth: '5vw',
            }}>

                <button
                onClick={() => {
                    setClickedBack(true);
                    setClickedPlay(false);
                }}
                style={{marginTop: '6vh', marginBottom: '6vh'}}
                className='menu-back-buttons'>
                    Back
                </button>

                <Difficulties clickedBack={clickedBack} />

            </div>

            <div 
            style={{
                display: clickedInstructions === true ? 'flex' : 'none',
                justifyContent: 'center',
                textAlign: 'left',
                margin: 'auto',
                flexWrap: 'wrap',
                position: 'relative', 
                minWidth: '25vw',
                maxWidth: '25vw',
            }}>
                <button
                style={{marginTop: '4vh', marginBottom: '2vh'}}
                onClick={() => {
                    setClickedBack(true);
                    setClickedInstructions(false);
                }}
                className='menu-back-buttons'>
                    Back
                </button>
                    
                <Instructions clickedBack={clickedBack} />
            </div>

            <div 
            style={{
                display: clickedTheme === true ? 'flex' : 'none',
                justifyContent: 'center',
                margin: 'auto',
                flexWrap: 'wrap',
                maxWidth: '5vw',
            }}>

                <button
                onClick={() => {
                    setClickedBack(true);
                    setClickedTheme(false);
                }}
                style={{marginTop: '6vh', marginBottom: '6vh'}}
                className='menu-back-buttons'>
                    Back
                </button>

                <Themes />
            </div>

        </div>
    );
};

export default Menu;