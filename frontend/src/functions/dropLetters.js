import letterGenerator from './letterGenerator.js';

const checkEmpty = (board, randCol) => {
    let check = 0;
    for (let i = board[randCol].length - 1; i >= 0; i--) {
        if (board[randCol][i] === null) check++
    };

    if (check === 12) return true;
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

export const insertRow = (board) => {
    for (let i = 0; i < board.length; i++) {
        const newLetter = letterGenerator('new', null, 'normal', true);

        const insertPoint = findInsertPoint(board, i);

        board[i].splice(insertPoint, 1, newLetter);
    };

    return board;
};

export const randColumnGenerator = (boardLen, prevColumns) => {
    const randomColumn = Math.floor((Math.random() * boardLen));

    if (prevColumns.includes(randomColumn)) return randColumnGenerator(boardLen, prevColumns);

    const spreadColumns = [...prevColumns];

    spreadColumns.shift();
    spreadColumns.push(randomColumn);

    return spreadColumns;
};

const dropLetters = (board, prevLetters, prevColumns, properties='normal') => {
    if (board.length === undefined) return [board, [null, null, null], [null, null]];

    const randomLetters = letterGenerator('new', prevLetters, properties);
    const randomColumns = randColumnGenerator(board.length, prevColumns);

    const insertPoint = findInsertPoint(board, randomColumns[2]);

    board[randomColumns[2]].splice(insertPoint, 1, randomLetters[1]);
   
    return [board, randomLetters, randomColumns];
};

export default dropLetters;