import Column from '../Column/Column.js';
import './styles.css';

const Board = () => {
    const board = []
    for (let i = 0; i < 8; i++) {
        board.push(<Column key={i} />)
    };

    return (
        <div className='main-board'>
            {board.map(col => col)}
        </div>
    );
};

export default Board;