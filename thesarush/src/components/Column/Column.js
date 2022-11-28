import Letter from '../Letter/Letter.js';
import './styles.css';

const Column = ({ letters, colPos }) => {
    return (
        <div className='columns'>
          {letters.map((letter, i) => (
            <Letter 
            hidden={letter === null} 
            letter={typeof letter === 'object' && letter !== null && letter.letter} 
            colPos={colPos} 
            rowPos={i} 
            type={typeof letter === 'object' && letter !== null && letter.type}
            color={typeof letter === 'object' && letter !== null && letter.color}
            properties={typeof letter === 'object' && letter !== null && letter.properties} 
            key={i}
            />
          ))}
        </div>
    );
};

export default Column;