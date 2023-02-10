import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 

import audio from "../../Station-X.webm";

import './styles.css';

const Audio = () => {
    const menu = useSelector(state => state.menu);

    const [shouldDisplay, setShouldDisplay] = useState(true);

    useEffect(() => {
        if (document.documentElement.clientWidth < 1100) setShouldDisplay(false);

        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.go(1);
        };
    }, []);

    return (
        <div
        style={{
            display: shouldDisplay === true ? 'flex' : 'none',
            justifyContent: 'center',
            position: 'absolute',
            border: '2px solid rgb(10, 255, 100)',
            borderRadius: '30vw',
            boxShadow: '0px 2px 15px rgb(0, 110, 0)',
            background: menu.backgroundColor,
            width: '6vw',
            height: '4vh'
        }}>
            <button 
            style={{
                cursor: 'pointer',
                border: 'none',
                background: menu.backgroundColor,
                color: 'white'
            }}
            onClick={e => {
                e.preventDefault();

                document.getElementById('music-player').play()

                return false;
            }}>
                <i className="fa-sharp fa-solid fa-volume-high"></i>
            </button>

            <button 
            style={{
                cursor: 'pointer',
                border: 'none',
                background: menu.backgroundColor,
                color: 'white'
            }}
            onClick={e => {
                e.preventDefault();

                document.getElementById('music-player').pause()

                return false;
            }}>
                <i className="fa-sharp fa-solid fa-volume-xmark"></i>
            </button>

            <audio id='music-player' autoPlay loop> 
                <source src={audio} type="audio/mpeg" /> 
            </audio>
        </div>
    );
};

export default Audio;