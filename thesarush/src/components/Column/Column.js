import Letter from '../Letter/Letter.js';

const Column = () => {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const normalLetters = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W']
    const badLetters = ['X', 'Y', 'Z', 'Q'];

    const randomGen = Math.floor(Math.random() * 100);
    const letterGenerator = () => {
        const randomNum = randomGen;

        if (randomNum > 60) return normalLetters[Math.floor((Math.random()*normalLetters.length))];
        if (randomNum > 30 && randomNum <= 60) return vowels[Math.floor((Math.random()*vowels.length))];
        return badLetters[Math.floor((Math.random()*badLetters.length))];
    };

    const col = []
    for (let j = 0; j < 10; j++) {
        col.push(<Letter letter={letterGenerator()} />)
    };

    return (
        <div className='columns'>
            {col.map(val => val)}
        </div>
    );
};

export default Column;