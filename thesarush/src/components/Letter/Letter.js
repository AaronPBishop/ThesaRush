import { useState } from 'react';
import './styles.css';

const Letter = ({ letter }) => {
    const [clicked, setClicked] = useState(false);

    return <div className='letters' onClick={() => setClicked(clicked)}>{letter}</div>
};

export default Letter;