import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setDifficulty } from '../../store/statsReducer';
import { setBackgroundColor } from '../../store/themeReducer';

import './styles.css';

const Menu = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [clickedPlay, setClickedPlay] = useState(false);
    const [clickedInstructions, setClickedInstructions] = useState(false);
    const [clickedTheme, setClickedTheme] = useState(false);

    const theme = useSelector(state => state.theme);

    return (
        <div
        style={{backgroundColor: theme.backgroundColor}} 
        id='menu-box'>
            <div style={{position: 'relative', top: '25vh', visibility: (clickedPlay === false) && (clickedInstructions === false) && (clickedTheme === false) ? 'visible' : 'hidden'}}>
                <button
                className='menu-buttons'
                onClick={() => setClickedPlay(true)}
                style={{
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: 'white',
                    backgroundColor: 'transparent',
                    cursor: 'pointer'
                }}>
                    Play
                </button>
            </div>

            <div style={{position: 'relative', top: '35vh', visibility: (clickedPlay === false) && (clickedInstructions === false) && (clickedTheme === false) ? 'visible' : 'hidden'}}>
                <button
                className='menu-buttons'
                onClick={() => setClickedInstructions(true)}
                style={{
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: 'white',
                    backgroundColor: 'transparent',
                    cursor: 'pointer'
                }}>
                    Instructions
                </button>
            </div>

            <div style={{position: 'relative', top: '45vh', visibility: (clickedPlay === false) && (clickedInstructions === false) && (clickedTheme === false) ? 'visible' : 'hidden'}}>
                <button
                className='menu-buttons'
                onClick={() => setClickedTheme(true)}
                style={{
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: 'white',
                    backgroundColor: 'transparent',
                    cursor: 'pointer'
                }}>
                    Theme
                </button>
            </div>

            <div 
            style={{
                display: 'flex',
                justifyContent: 'center',
                margin: 'auto',
                flexWrap: 'wrap',
                position: 'relative', 
                top: '4vh', 
                visibility: clickedPlay === true ? 'visible' : 'hidden', 
                maxWidth: '5vw',
            }}>

                <button
                onClick={() => setClickedPlay(false)}
                style={{
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    position: 'relative',
                    bottom: '6vh',
                    color: 'rgb(255, 255, 0)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                }}>
                    Back
                </button>

                <button
                onClick={() => {
                    dispatch(setDifficulty('easy'));
                    history.push('/game/easy');
                }}
                style={{
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: 'white',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '5vh'
                }}>
                    Easy
                </button>

                <button
                onClick={() => {
                    dispatch(setDifficulty('medium'));
                    history.push('/game/medium');
                }}
                style={{
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: 'white',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '5vh'
                }}>
                    Medium
                </button>

                <button
                onClick={() => {
                    dispatch(setDifficulty('hard'));
                    history.push('/game/hard');
                }}
                style={{
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: 'white',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '5vh',
                    marginTop: '5vh'
                }}>
                    Hard
                </button>

                <button
                onClick={() => {
                    dispatch(setDifficulty('rush'));
                    history.push('/game/rush');
                }}
                style={{
                    fontFamily: 'Bungee Spice',
                    fontWeight: 'bold',
                    fontSize: '42px',
                    color: 'white',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '5vh'
                }}>
                    Rush
                </button>

            </div>

            <div 
            style={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'left',
                margin: 'auto',
                flexWrap: 'wrap',
                position: 'relative', 
                bottom: '58vh', 
                visibility: clickedInstructions === true ? 'visible' : 'hidden', 
                minWidth: '25vw',
                maxWidth: '25vw',
            }}>
                <button
                onClick={() => setClickedInstructions(false)}
                style={{
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: 'rgb(255, 255, 0)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                }}>
                    Back
                </button>

                <ol
                style={{
                    fontFamily: 'Roboto',
                    fontSize: '20px',
                    color: 'white',
                    userSelect: 'none'
                }}>
                    <li>
                        Form words by clicking letter tiles. Don't let the tiles reach the top!
                    </li>

                    <li style={{marginTop: '3vh'}}>
                        Invalid words cause new tiles to drop immediately.
                    </li>

                    <li style={{marginTop: '3vh'}}>
                        Clicked a wrong letter? Deselect and maintain the order of your word by clicking the same tile again
                    </li>

                    <li style={{marginTop: '3vh'}}>
                        Submit a word by pressing 'spacebar' or clicking the green button to the right of the input area
                    </li>

                    <li style={{marginTop: '3vh'}}>
                        Clear the input bar by pressing 'tab' or clicking the red button to the left of the input area
                    </li>

                    <li style={{marginTop: '3vh'}}>
                        Use gold letters to multiply your score x2 for each gold letter used in your word
                    </li>

                    <li style={{marginTop: '3vh'}}>
                        Rack up points by submitting longer words!
                    </li>
                </ol>

            </div>

            <div 
            style={{
                display: 'flex',
                justifyContent: 'center',
                margin: 'auto',
                flexWrap: 'wrap',
                position: 'relative', 
                bottom: '130vh', 
                visibility: clickedTheme === true ? 'visible' : 'hidden', 
                maxWidth: '5vw',
            }}>

                <button
                onClick={() => setClickedTheme(false)}
                style={{
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    position: 'relative',
                    bottom: '6vh',
                    color: 'rgb(255, 255, 0)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                }}>
                    Back
                </button>

                <button
                onClick={() => {
                    dispatch(setBackgroundColor('rgb(0, 0, 0)'));
                }}
                style={{
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: 'white',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '6vh'
                }}>
                    Classic
                </button>

                <button
                onClick={() => {
                    dispatch(setBackgroundColor('rgb(10, 10, 30)'))
                }}
                style={{
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: 'white',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '6vh'
                }}>
                    Midnight
                </button>

                <button
                onClick={() => {
                    dispatch(setBackgroundColor('rgb(45, 0, 25)'))
                }}
                style={{
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: 'white',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '6vh'
                }}>
                    Dawn
                </button>

                <button
                onClick={() => {
                    dispatch(setBackgroundColor('rgb(0, 15, 25)'))
                }}
                style={{
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: 'white',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '6vh'
                }}>
                    Meadow
                </button>
            </div>

        </div>
    );
};

export default Menu;