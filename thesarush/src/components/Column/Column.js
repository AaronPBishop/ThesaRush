import Letter from '../Letter/Letter.js';
import './styles.css';

const Column = ({ letters, colPos }) => {
    return (
        <div className='columns'>
          {letters.map((letter, i) => (
            <Letter hidden={letter === null} letter={letter} colPos={colPos} rowPos={i} key={i} />
          ))}
        </div>
    );
};

export default Column;