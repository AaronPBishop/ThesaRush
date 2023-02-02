import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDifficulty } from '../../store/game';
import { useHistory } from 'react-router-dom';

import { copyTrophies } from '../../store/user.js';

import './styles.css';

const Difficulties = ({ clickedBack }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [clickedTraining, setClickedTraining] = useState(false);
    const [clickedEasy, setClickedEasy] = useState(false);
    const [clickedMedium, setClickedMedium] = useState(false);
    const [clickedHard, setClickedHard] = useState(false);
    const [clickedRush, setClickedRush] = useState(false);

    useEffect(() => {
        setClickedTraining(false);
        setClickedEasy(false);
        setClickedMedium(false);
        setClickedHard(false);
        setClickedRush(false);
    }, [clickedBack]);

    return (
        <div
        style={{
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            color: 'white',
            listStyle: 'none',
            textAlign: 'center'
        }}>
            <div
            className='difficulty-containers'
            style={{
                marginTop: '-2vh',
                backgroundColor: 'rgb(140, 0, 55)', 
                borderBottom: '4px solid rgb(105, 0, 40)',
                fontSize: clickedTraining === false ? '24px' : '16px'
            }}
            onClick={() => {
                setClickedTraining(clicked => !clicked);
            }}
            >
                {
                    clickedTraining === false ?
                    <li>Training</li> :
                    <div>
                        <p className='difficulty-desc'>Tiles drop every 4 seconds</p>
                        <p className='difficulty-desc'>Find your rythm, sweat-free</p>
                        <p className='difficulty-desc' style={{position: 'relative', top: '2vh', fontStyle: 'normal', color: 'rgb(95, 255, 0)'}}>Score data not saved in training!</p>
                        <li
                        className='play-difficulty'
                        onClick={() => {
                            dispatch(setDifficulty('training'));
                            history.push('/game/training');
                        }}
                        >
                            Play
                        </li>
                    </div>
                }
            </div>

            <div
            className='difficulty-containers'
            style={{
                backgroundColor: 'rgb(10, 50, 100)', 
                borderBottom: '4px solid rgb(0, 35, 80)',
                fontSize: clickedEasy === false ? '24px' : '16px'
            }}
            onClick={() => {
                setClickedEasy(clicked => !clicked);
            }}
            >
                {
                    clickedEasy === false ?
                    <li>Easy</li> :
                    <div>
                        <p className='difficulty-desc'>Tiles drop every 2.5 seconds</p>
                        <p className='difficulty-desc'>Practice up for the big leagues!</p>
                        <p className='difficulty-desc' style={{position: 'relative', top: '2vh', fontStyle: 'normal', color: 'rgb(95, 255, 0)'}}>High scores not saved on easy!</p>
                        <li
                        className='play-difficulty'
                        onClick={() => {
                            dispatch(copyTrophies());
                            dispatch(setDifficulty('easy'));
                            history.push('/game/easy');
                        }}
                        >
                            Play
                        </li>
                    </div>
                }
            </div>

            <div
            className='difficulty-containers'
            style={{
                backgroundColor: 'rgb(0, 100, 60)', 
                borderBottom: '4px solid rgb(0, 70, 30)',
                fontSize: clickedMedium === false ? '24px' : '16px'
            }}
            onClick={() => {
                setClickedMedium(clicked => !clicked);
            }}
            >
                {
                    clickedMedium === false ?
                    <li>Medium</li> :
                    <div>
                        <p className='difficulty-desc'>Tiles drop every 1.5 seconds</p>
                        <p className='difficulty-desc'>Don't get too comfortable</p>
                        <p className='difficulty-desc' style={{position: 'relative', top: '2vh', fontStyle: 'normal', color: 'rgb(95, 255, 0)'}}>Point multiplier: 1.5</p>
                        <li
                        className='play-difficulty'
                        onClick={() => {
                            dispatch(copyTrophies());
                            dispatch(setDifficulty('medium'));
                            history.push('/game/medium');
                        }}
                        >
                            Play
                        </li>
                    </div>
                }
            </div>

            <div
            className='difficulty-containers'
            style={{
                backgroundColor: 'rgb(255, 140, 0)', 
                borderBottom: '4px solid rgb(205, 90, 0)',
                fontSize: clickedHard === false ? '24px' : '16px'
            }}
            onClick={() => {
                setClickedHard(clicked => !clicked);
            }}
            >
                {
                    clickedHard === false ?
                    <li>Hard</li> :
                    <div>
                        <p className='difficulty-desc'>Tiles drop every 1.2 seconds</p>
                        <p className='difficulty-desc'>Not so easy any more!</p>
                        <p className='difficulty-desc' style={{position: 'relative', top: '2vh', fontStyle: 'normal', color: 'rgb(95, 255, 0)', textShadow: '0px 2px 4px black'}}>Point multiplier: 2</p>
                        <li
                        className='play-difficulty'
                        onClick={() => {
                            dispatch(copyTrophies());
                            dispatch(setDifficulty('hard'));
                            history.push('/game/hard');
                        }}
                        >
                            Play
                        </li>
                    </div>
                }
            </div>

            <div
            className='difficulty-containers'
            style={{
                backgroundColor: 'rgb(140, 0, 55)', 
                borderBottom: '4px solid rgb(105, 0, 40)',
                fontFamily: 'Bungee Spice', 
                textShadow: '0px 2px 4px black',
                fontSize: clickedRush === false ? '48px' : '16px'
            }}
            onClick={() => {
                setClickedRush(clicked => !clicked);
            }}
            >
                {
                    clickedRush === false ?
                    <li>Rush</li> :
                    <div>
                        <p className='difficulty-desc'>Tiles drop every second!</p>
                        <p className='difficulty-desc'>Official game-mode of ThesaRush</p>
                        <p className='difficulty-desc' style={{position: 'relative', top: '2vh', fontStyle: 'normal', color: 'rgb(95, 255, 0)'}}>Point multiplier: 3</p>
                        <li
                        className='play-difficulty'
                        onClick={() => {
                            dispatch(copyTrophies());
                            dispatch(setDifficulty('rush'));
                            history.push('/game/rush');
                        }}
                        >
                            Play
                        </li>
                    </div>
                }
            </div>
        </div>
    );
};

export default Difficulties;