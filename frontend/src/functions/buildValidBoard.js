import letterGenerator from "./letterGenerator.js";
import { letterClass } from "./letterGenerator.js";

const randomColumn = () => {
    const column = [];

    for (let i = 0; i < 12; i++) {
        if (i > 8) column.push(letterGenerator('initial'));
        else column.push(null);
    };
    
    return column;
};

const checkBoard = (board) => {
    let vowels = 0;
    let rares = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== null && letterClass(board[i][j].letter) === 'vowel') vowels++;
            if (board[i][j] !== null && letterClass(board[i][j].letter) === 'rare') rares++;
        };
    };

    if (vowels < 14 || vowels > 15) return false;
    if (rares > 2) return false;
    return true;
};

const buildValidBoard = () => {
    const board = [];

    for (let i = 0; i < 10; i++) board.push(randomColumn());

    if (!checkBoard(board)) return buildValidBoard();
    if (checkBoard(board)) return board;
};

export default buildValidBoard;