import { Link } from 'react-router-dom';
import './styles.css';

const GameOver = () => {
    return (
        <div id='game-over'>
            <p id='game-over-header'>Game Over!</p>
            <Link id='link' to='/' onClick={() => window.location.reload()}>Play again?</Link>
        </div>
    )
};

export default GameOver;