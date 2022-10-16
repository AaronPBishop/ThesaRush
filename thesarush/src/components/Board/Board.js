import Column from '../Column/Column.js';

const Board = () => {
    const board = []
    for (let i = 0; i < 9; i++) {
        board.push(<Column />)
    };

    return (
        <div className='main-board'>
            {board.map(col => col)}
        </div>
    );
};

export default Board;