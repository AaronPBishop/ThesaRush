import Letter from '../Letter/Letter.js';
import './styles.css';

const Column = ({ letters }) => {
    return (
        <div className='columns'>
          {letters.map((letter, i) => (
            <Letter key={i} letter={letter} hidden={letter === null} />
          ))}
        </div>
    );
};

export default Column;