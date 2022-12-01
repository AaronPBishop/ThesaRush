import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDifficulty } from '../../store/gameReducer';
import { useHistory } from 'react-router-dom';

import './styles.css';

const Difficulties = ({ clickedBack }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [clickedEasy, setClickedEasy] = useState(false);
    const [clickedMedium, setClickedMedium] = useState(false);
    const [clickedHard, setClickedHard] = useState(false);
    const [clickedRush, setClickedRush] = useState(false);

    useEffect(() => {
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
                        <p className='difficulty-desc'>Tiles drop every 2 seconds</p>
                        <p className='difficulty-desc'>Great for practice!</p>
                        <li
                        className='play-difficulty'
                        onClick={() => {
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
                        <p className='difficulty-desc'>Go ahead, relax</p>
                        <li
                        className='play-difficulty'
                        onClick={() => {
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
                        <li
                        className='play-difficulty'
                        onClick={() => {
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
                        <li
                        className='play-difficulty'
                        onClick={() => {
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