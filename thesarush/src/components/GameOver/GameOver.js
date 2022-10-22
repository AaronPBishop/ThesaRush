import { Link } from 'react-router-dom';
import './styles.css';

const GameOver = ({ points }) => {
    return (
        <div id='game-over'>
            <p id='gameover-header'>Game Over!</p>
            <div id='stats'>
                <p id='points'>
                    Total Points: {points}
                </p>
            </div>
            <Link id='play-again' to='/' onClick={() => window.location.reload()}>Play again?</Link>
        </div>
    );
};

export default GameOver;