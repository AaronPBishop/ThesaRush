import letterGenerator from './letterGenerator.js';

const checkEmpty = (board, randCol) => {
    let check = 0;
    for (let i = board[randCol].length - 1; i >= 0; i--) {
        if (board[randCol][i] === null) check++
    };

    if (check === 11) return true;
    return false;
};

const findInsertPoint = (board, randCol) => {
    let point;

    if (checkEmpty(board, randCol)) {
        point = board[randCol].length - 1;

        return point;
    };

    if (!checkEmpty(board, randCol)) {
        for (let i = board[randCol].length - 1; i >= 0; i--) {
            if (board[randCol][i] !== null) point = (i - 1);
        };

        return point;
    };
};


const insertColumnVal = (board) => {
    const newLetter = letterGenerator('new');
    const randomColumn = Math.floor((Math.random() * board.length));

    const insertPoint = findInsertPoint(board, randomColumn);

    board[randomColumn].splice(insertPoint, 1, newLetter);
   
    return board;
};

export default insertColumnVal;