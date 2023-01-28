import Letter from '../Letter/Letter.js';
import ClearedLetter from '../ClearedLetter/ClearedLetter.js';

import './styles.css';

const Column = ({ letters, colPos }) => {
    return (
        <div className='columns'>
          {
            letters.map((letter, i) => (
              <div key={i}>
                <Letter 
                hidden={letter === null} 
                letter={typeof letter === 'object' && letter !== null && letter.letter} 
                colPos={colPos} 
                rowPos={i} 
                type={typeof letter === 'object' && letter !== null && letter.type}
                color={typeof letter === 'object' && letter !== null && letter.color}
                properties={typeof letter === 'object' && letter !== null && letter.properties} 
                rotation={letter !== null && letter.rotation}
                randKey={letter !== null && letter.randKey}
                />
                
                <ClearedLetter 
                colPos={colPos} 
                rowPos={i} 
                color={typeof letter === 'object' && letter !== null && letter.color}
                properties={typeof letter === 'object' && letter !== null && letter.properties} 
                rotation={letter !== null && letter.rotation}
                />
              </div>
            ))
          }
        </div>
    );
};

export default Column;