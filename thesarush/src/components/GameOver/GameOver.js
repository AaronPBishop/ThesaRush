import { Link } from 'react-router-dom';
import './styles.css';

const GameOver = ({ points, numWords, longestWord, tilesCleared }) => {
    return (
        <div id='game-over'>
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

            <Link id='play-again' to='/' onClick={() => window.location.reload()}>Play again?</Link>
        </div>
    );
};

export default GameOver;