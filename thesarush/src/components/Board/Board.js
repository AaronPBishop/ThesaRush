import { useDispatch, useSelector } from 'react-redux';
import Column from '../Column/Column.js';
import './styles.css';
import resetBoard from '../../store/boardReducer.js';

const Board = () => {
    const board = useSelector(state => state.board);
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