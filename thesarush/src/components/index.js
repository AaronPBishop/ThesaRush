const board = [
    [null,null,null,null,null,null,'a','e','g'],
    [null,null,null,null,null,null,'j','h','x'],
    [null,null,null,null,null,null,'e','t','o'],
    [null,null,null,null,null,null,'s','q','d'],
    [null,null,null,null,null,null,'w','c','n'],
    [null,null,null,null,null,null,'l','u','p'],
    [null,null,null,null,null,null,'y','m','f'],
    [null,null,null,null,null,null,'r','v','k'],
];

const vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W']
const goldConsonants = ['X', 'Z', 'Q'];

const randomLetter = Math.floor(Math.random() * 100);

const letterGenerator = () => {
    const randomNum = randomLetter;

    if (randomNum >= 40) return consonants[Math.floor((Math.random()*consonants.length))];
    if (randomNum >= 5 && randomNum < 40) return vowels[Math.floor((Math.random()*vowels.length))];

    return goldConsonants[Math.floor((Math.random()*goldConsonants.length))];
};

const findInsertPoint = (board, randCol) => {
    let point;

    for (let i = 0; i < board[randCol].length; i++) {
        if (randCol[i] !== null) point = (i - 3);
    };

    return point;
};


const insertColumnVal = (board) => {
    const newLetter = letterGenerator();
    const randomColumn = Math.floor((Math.random() * board.length));

    const insertPoint = findInsertPoint(board, randomColumn);
    console.log(insertPoint)

    board[randomColumn].splice(insertPoint, 1, newLetter);
};

// insertColumnVal(board);
// console.log(board);