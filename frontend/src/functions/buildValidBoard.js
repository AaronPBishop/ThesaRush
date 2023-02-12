import letterGenerator from "./letterGenerator.js";
import { letterClass } from "./letterGenerator.js";

const randomColumn = (difficulty) => {
    const column = [];

    if (difficulty === 'rush') {
        for (let i = 0; i < 12; i++) {
            if (i > 7) column.push(letterGenerator('initial'));
            else column.push(null);
        };
    };
    
    if (difficulty !== 'rush') {
        for (let i = 0; i < 12; i++) {
            if (i > 8) column.push(letterGenerator('initial'));
            else column.push(null);
        };
    };
    
    return column;
};

const checkBoard = (board, difficulty) => {
    let vowels = 0;
    let rares = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== null && letterClass(board[i][j].letter) === 'vowel') vowels++;
            if (board[i][j] !== null && letterClass(board[i][j].letter) === 'rare') rares++;
        };
    };

    if (difficulty === 'rush') {
        if (vowels < 20 || vowels > 20) return false;
        if (rares > 2) return false;
        return true;
    };

    if (vowels < 15 || vowels > 15) return false;
    if (rares > 1) return false;
    return true;
};

const buildValidBoard = (difficulty) => {
    const board = [];

    for (let i = 0; i < 10; i++) board.push(randomColumn(difficulty));

    if (!checkBoard(board, difficulty)) return buildValidBoard(difficulty);
    if (checkBoard(board, difficulty)) return board;
};

export default buildValidBoard;