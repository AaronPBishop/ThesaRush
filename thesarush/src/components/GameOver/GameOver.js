import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './styles.css';


const GameOver = ({ points, numWords, longestWord, tilesCleared }) => {
    const history = useHistory();
    
    const difficulty = useSelector(state => state.stats.difficulty);
    const theme = useSelector(state => state.theme);
    
    return (
        <div 
        style={{backgroundColor: theme.backgroundColor}}
        id='game-over'>
            <p id='gameover-header'>Game Over!</p>

            <div id='stats-box'>
                <p>
                    Final Points: <b>{points}</b>
                </p>

                <p>
                    Total Words: <b>{numWords}</b>
                </p>

                <p>
                    Longest Word: <b>{longestWord}</b>
                </p>

                <p>
                    Tiles Cleared: <b>{tilesCleared}</b>
                </p>
            </div>

            <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                maxWidth: '50vw'
            }}>
                <button 
                id='play-again' 
                onClick={e => {
                    history.push(`/game/${difficulty}`);
                    window.location.reload(false);
                    

                    e.preventDefault();
                }}>
                    Play again?
                </button>

                <button
                    onClick={e => {
                        history.push('/');
                        window.location.reload(false);

                        e.preventDefault();
                    }}
                    style={{
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        position: 'relative',
                        top: '10vh',
                        color: 'rgb(255, 255, 0)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        Main Menu
                    </button>
            </div>
        </div>
    );
};

export default GameOver;