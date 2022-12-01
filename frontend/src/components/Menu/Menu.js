import { useState } from 'react';
import { useSelector } from 'react-redux';

import Instructions from './Instructions.js';
import Themes from './Themes.js';

import './styles.css';
import Difficulties from './Difficulties';

const Menu = () => {
    const [clickedPlay, setClickedPlay] = useState(false);
    const [clickedInstructions, setClickedInstructions] = useState(false);
    const [clickedTheme, setClickedTheme] = useState(false);
    const [clickedBack, setClickedBack] = useState(false);

    const theme = useSelector(state => state.theme);

    return (
        <div
        style={{backgroundColor: theme.backgroundColor, overflowY: clickedInstructions ? 'auto' : clickedPlay && 'auto'}} 
        id='menu-box'>
            <div 
            className='menu-button-divs'
            onClick={() => {
                setClickedBack(false);
                setClickedPlay(true);
            }}
            style={{
                position: 'relative', 
                display: (clickedPlay === false) && (clickedInstructions === false) && (clickedTheme === false) ? 'flex' : 'none',
                backgroundColor: 'rgb(140, 0, 55)', 
                borderBottom: '4px solid rgb(105, 0, 40)'
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
                backgroundColor: 'rgb(180, 180, 0)', 
                borderBottom: '4px solid rgb(125, 125, 0)'
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
                backgroundColor: 'rgb(0, 100, 60)', 
                borderBottom: '4px solid rgb(0, 70, 30)'
            }}>
                <button
                className='menu-buttons'
                >
                    Theme
                </button>
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