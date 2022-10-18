import Letter from '../Letter/Letter.js';
import './styles.css';

const Column = ({ letters }) => {
    return (
        <div className='columns'>
          {letters.map((letter, i) => (
            <Letter hidden={i < 6} letter={letter} key={i} />
          ))}
        </div>
    );
};

export default Column;