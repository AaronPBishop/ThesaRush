import letterGenerator from './letterGenerator.js';

const findInsertPoint = (board, randCol) => {
    let point;

    for (let i = board[randCol].length - 1; i >= 0; i--) {
        if (board[randCol][i] !== null) point = (i - 1);
    };

    return point;
};


const insertColumnVal = (board) => {
    const newLetter = letterGenerator();
    const randomColumn = Math.floor((Math.random() * board.length));

    const insertPoint = findInsertPoint(board, randomColumn);

    board[randomColumn].splice(insertPoint, 1, newLetter);
   
    return board;
};

export default insertColumnVal;