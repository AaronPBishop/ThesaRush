const data = require('../dictionary/words_dictionary.json');
const allWords = Object.keys(data);

const randWordFinder = () => {
    const randWord = allWords[Math.floor(Math.random() * allWords.length)];

    if (randWord.length === 8 || randWord.length === 9) return randWord.split('');

    return randWordFinder();
};

const getBoardLetters = (board) => {
    const boardLtrs = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const currVal = board[i][j];

            if (currVal && currVal.letter && currVal.letter.length > 0) boardLtrs.push(currVal.letter);
        };
    };

    return boardLtrs;
};

const compareLetters = (randWordLtrs, boardLtrs) => {
    const boardLtrsCopy = [ ...boardLtrs ];
    let check = 0;

    for (let i = 0; i < randWordLtrs.length; i++) {
        const currRandWordLtr = randWordLtrs[i].toLowerCase(); 

        for (let j = 0; j < boardLtrsCopy.length; j++) {
            const currBoardLtr = boardLtrsCopy[j].toLowerCase();

            if (currRandWordLtr === currBoardLtr) {
                boardLtrsCopy.splice(j, 1);
                check++;
                break;
            };
        };
    };

    if (check === randWordLtrs.length) return true;
    return false;
};

const hintFinder = (board, i = 0) => {
    const randomWord = randWordFinder();
    const boardLtrs = getBoardLetters(board);

    if (boardLtrs.length < 36) return { found: false, value: 'Not Enough Letters' };
    if (i >= 100) return { found: false, value: 'No Words Found' };

    if (!compareLetters(randomWord, boardLtrs)) return hintFinder(board, i += 1);

    return { found: true, value: randomWord.join('').toUpperCase() };
};

export default hintFinder;