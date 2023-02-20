import performSplice from "../functions/performSplice.js";
import { insertRow } from "../functions/dropLetters.js";
import buildValidBoard from "../functions/buildValidBoard.js";
import dropLetters from "../functions/dropLetters.js";
import clearTilesFunc, { hasLightningTile, clearBottomRows, clearColumnsFunc } from "../functions/clearTiles.js";

import sfx1 from '../confirmation_001.ogg';
import sfx2 from '../confirmation_004.ogg';
import sfx3 from '../confirmation_002.ogg';
 
const shortWordSfx = new Audio(sfx1);
const medWordSfx = new Audio(sfx2);
const longWordSfx = new Audio(sfx3);

const initialState = {
    board: [],
    input: {},
    order: 0,
    tiles: {},
    finalTiles: {},
    removedChar: [],
    randKeys: [],
    clearedTiles: [],
    prevColumns: [null, null, null, null, null, null],
    prevLetters: [null, null],
    statuses: {
        cleared: false,
        submitted: false,
        earnedBomb: false,
        earnedVoid: false,
        usedLightning: false,
        earnedLightning: {
            hasEarned: false,
            strength: null
        },
    },
    stats: {
        points: 0, 
        score: 0, 
        trackScore: 0,
        invalidWords: 0,
        words: 0,
        tilesCleared: 0,
        bombardier: 0,
        stoneCrusher: 0,
        goldMiner: 0,
        wordSmith: 0,
        voidMaster: 0,
        fulminator: 0,
        longestWord: '',
        difficulty: undefined
    }
};

// BOARD ACTIONS
export const initiateBoard = () => {
    return {
        type: 'INITIATE_BOARD'
    };
};

export const clearTiles = () => {
    return {
        type: 'CLEAR_TILES'
    };
};

export const rearrangeTiles = () => {
    return {
        type: 'REARRANGE_TILES'
    };
};

export const dropLettersAction = () => {
    return {
        type: 'DROP_LETTERS'
    };
};

export const setLetter = (col, row, letter) => {
    return {
        type: 'SET_LETTER',
        payload1: col,
        payload2: row,
        payload3: letter
    };
};

export const dropRow = () => {
    return {
        type: 'DROP_ROW'
    };
};

export const clearColumn = () => {
    return {
        type: 'CLEAR_COLUMN'
    };
};

export const resetGame = () => {
    return {
        type: 'RESET_GAME'
    };
};


// INPUT ACTIONS
export const setInput = (pos, valueArr) => {
    return {
        type: 'SET_INPUT',
        payload: pos,
        payload2: valueArr
    };
};

export const removeInputVal = (pos) => {
    return {
        type: 'REMOVE_INPUT_VAL',
        payload: pos
    };
};

export const resetInput = () => {
    return {
        type: 'RESET_INPUT'
    };
};

export const removeLastChar = () => {
    return {
        type: 'REMOVE_LAST_CHAR'
    };
};


// ORDER ACTIONS
export const incrementOrder = () => {
    return {
        type: 'INCREMENT_ORDER'
    };
};

export const resetOrder = () => {
    return {
        type: 'RESET_ORDER'
    };
};


// TILE COORDINATE ACTIONS 
export const setTiles = (tilePos) => {
    return {
        type: 'SET_TILES',
        payload: tilePos
    };
};

export const removeTile = (tilePos) => {
    return {
        type: 'REMOVE_TILE',
        payload: tilePos
    };
};

export const resetTiles = () => {
    return {
        type: 'RESET_TILES'
    };
};


// STATUS ACTIONS
export const setCleared = (boolean) => {
    return {
        type: 'SET_CLEARED',
        payload: boolean
    };
};

export const setSubmitted = (boolean) => {
    return {
        type: 'SET_SUBMITTED',
        payload: boolean
    };
};

export const setUsedLightning = (boolean) => {
    return {
        type: 'SET_USED_LIGHTNING',
        payload: boolean
    };
};


// STATS ACTIONS
export const incrementInvalidWords = () => {
    return {
        type: 'INCREMENT_INVALID_WORDS'
    };
};

export const determinePoints = (points, letters) => {
    return {
        type: 'DETERMINE_POINTS',
        payload: points,
        payload2: letters
    };
};

export const addToScore = (points) => {
    return {
        type: 'ADD_TO_SCORE',
        payload: points
    };
};

export const resetPoints = () => {
    return {
        type: 'RESET_POINTS'
    };
};

export const incrementWords = () => {
    return {
        type: 'INCREMENT_WORDS'
    };
};

export const setLongestWord = (word) => {
    return {
        type: 'SET_LONGEST_WORD',
        payload: word
    };
};

export const setDifficulty = (difficulty) => {
    return {
        type: 'SET_DIFFICULTY',
        payload: difficulty
    };
};

export const resetStats = () => {
    return {
        type: 'RESET_STATS'
    };
};

// MAIN REDUCER
const gameReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        // BOARD REDUCERS
        case 'INITIATE_BOARD': {
            currentState.board = buildValidBoard(currentState.stats.difficulty);

            return currentState;
        };

        case 'CLEAR_TILES': {
            const values = Object.values(currentState.finalTiles);
            const totalVals = values.length;
            currentState.clearedTiles = values;

            if (totalVals < 6 && !hasLightningTile(currentState.board, values, totalVals)) shortWordSfx.play();

            if (totalVals >= 6 && totalVals < 8) {
                if (!hasLightningTile(currentState.board, values, totalVals)) medWordSfx.play();
                currentState.statuses.earnedBomb = true;
            };

            if (totalVals >= 8) {
                if (!hasLightningTile(currentState.board, values, totalVals)) longWordSfx.play();

                currentState.statuses.earnedLightning.hasEarned = true;
                if (totalVals < 10) currentState.statuses.earnedLightning.strength = 1;
                if (totalVals >= 10 && totalVals < 12) currentState.statuses.earnedLightning.strength = 2;
                if (totalVals >= 12) currentState.statuses.earnedLightning.strength = 3;

                currentState.stats.wordSmith += 1;
                
                const newBoard = clearBottomRows(totalVals, currentState.board, currentState.clearedTiles, currentState.randKeys);

                currentState.board = newBoard.board;
                currentState.clearedTiles = newBoard.clearedTiles;
                currentState.stats.tilesCleared += newBoard.tilesCleared;
                currentState.randKeys = newBoard.randKeys;
            };

            const newBoard = clearTilesFunc(totalVals, values, currentState.board, currentState.clearedTiles, currentState.randKeys);

            currentState.board = newBoard.board;
            currentState.clearedTiles = newBoard.clearedTiles;
            currentState.stats.tilesCleared += newBoard.tilesCleared;
            currentState.randKeys = newBoard.randKeys;
            currentState.stats.stoneCrusher += newBoard.stoneCrusher;
            currentState.stats.bombardier += newBoard.bombardier;
            currentState.stats.voidMaster += newBoard.voidMaster;
            currentState.stats.fulminator += newBoard.fulminator;
            currentState.statuses.usedLightning = newBoard.usedLightning;
            currentState.finalTiles = {};

            return currentState;
        };

        case 'REARRANGE_TILES': {
            currentState.board = performSplice(currentState.board);

            return currentState;
        };

        case 'DROP_LETTERS': {
            if (currentState.statuses.earnedLightning.hasEarned === true) {
                const newBoard = dropLetters(
                    currentState.board, currentState.prevLetters, currentState.prevColumns, {lightning: true, strength: currentState.statuses.earnedLightning.strength}
                );

                currentState.board = newBoard[0];
                currentState.prevLetters = newBoard[1];
                currentState.prevColumns = newBoard[2];
                currentState.statuses.earnedLightning.hasEarned = false;
                currentState.statuses.earnedLightning.strength = null;

                return currentState;
            };

            if (currentState.statuses.earnedBomb === true) {
                const newBoard = dropLetters(currentState.board, currentState.prevLetters, currentState.prevColumns, 'bomb');

                currentState.board = newBoard[0];
                currentState.prevLetters = newBoard[1];
                currentState.prevColumns = newBoard[2];
                currentState.statuses.earnedBomb = false;

                return currentState;
            };

            if (currentState.statuses.earnedVoid === true) {
                const newBoard = dropLetters(currentState.board, currentState.prevLetters, currentState.prevColumns, {void: true});

                currentState.board = newBoard[0];
                currentState.prevLetters = newBoard[1];
                currentState.prevColumns = newBoard[2];
                currentState.statuses.earnedVoid = false;
                currentState.stats.trackScore = 0;

                return currentState;
            };

            const newBoard = dropLetters(currentState.board, currentState.prevLetters, currentState.prevColumns);
            currentState.board = newBoard[0];
            currentState.prevLetters = newBoard[1];
            currentState.prevColumns = newBoard[2];

            return currentState;
        };

        case 'SET_LETTER': {
            currentState.board[action.payload1][action.payload2].letter = action.payload3;

            const coord = Number([action.payload1, action.payload2].join(''));

            currentState.input[coord] = [action.payload3, currentState.order];
            currentState.order += 1;

            return currentState;
        };

        case 'DROP_ROW': {
            currentState.board = insertRow(currentState.board);

            return currentState;
        };

        case 'CLEAR_COLUMN': {
            const newBoard = clearColumnsFunc(currentState.board);

            currentState.board = newBoard.board;
            currentState.clearedTiles = newBoard.clearedTiles;

            return currentState;
        };

        case 'RESET_GAME': {
            currentState.board = [];
            currentState.finalTiles = {};
            currentState.input = {};
            currentState.order = 0;
            currentState.removedChar = [];
            currentState.tiles = {};
            currentState.randKeys = [];
            currentState.clearedTiles = [];
            currentState.prevColumns = [null, null, null, null, null, null];
            currentState.prevLetters = [null, null];
            currentState.statuses.earnedLightning = {
                hasEarned: false,
                strength: 0
            };

            for (let key in currentState.statuses) { if (key !== 'earnedLightning') currentState.statuses[key] = false };
            
            return currentState;
        };


        // INPUT REDUCERS
        case 'SET_INPUT': {
            if (currentState.input[action.payload] === undefined) currentState.input[action.payload] = action.payload2;

            return currentState;
        };

        case 'REMOVE_INPUT_VAL': {
            delete currentState.input[action.payload];

            return currentState;
        };

        case 'RESET_INPUT': {
            for (let key in currentState.input) {
                delete currentState.input[key];
            };

            return currentState;
        };

        case 'REMOVE_LAST_CHAR': {
            let highestChar = 0;
            for (let i = 0; i < Object.values(currentState.input).length; i++) {
                if (Object.values(currentState.input)[i][1] > highestChar) highestChar = Object.values(currentState.input)[i][1];
            };
            
            let coordinates = [];
            for (let key in currentState.input) {
                const currLetter = currentState.input[key];

                if (currLetter[1] === highestChar) {
                    coordinates = currLetter[2];

                    delete currentState.input[key];
                };
            };

            for (let key in currentState.tiles) {
                if (currentState.tiles[key][0] === coordinates[0] && currentState.tiles[key][1] === coordinates[1]) delete currentState.tiles[key];
            };

            currentState.removedChar = [...coordinates];

            return currentState;
        };


        // ORDER REDUCERS
        case 'INCREMENT_ORDER': {
            currentState.order += 1;

            return currentState;
        };

        case 'RESET_ORDER': {
            currentState.order = 0;
            
            return currentState;
        };


        // TILE COORDINATE REDUCERS
        case 'SET_TILES': {
            currentState.tiles[action.payload] = action.payload;

            return currentState;
        };

        case 'REMOVE_TILE': {
            for (let key in currentState.tiles) {
                if (currentState.tiles[key][0] === action.payload[0] && currentState.tiles[key][1] === action.payload[1]) delete currentState.tiles[key];
            };

            return currentState;
        };

        case 'RESET_TILES': {
            for (let key in currentState.tiles) {
                delete currentState.tiles[key]
            };
            
            return currentState;
        };


        // STATUS REDUCERS
        case 'SET_CLEARED': {
            currentState.statuses.cleared = action.payload;

            return currentState;
        };

        case 'SET_SUBMITTED': {
            currentState.statuses.submitted = action.payload;
            currentState.finalTiles = { ...currentState.tiles };

            return currentState;
        };

        case 'SET_USED_LIGHTNING': {
            currentState.statuses.usedLightning = action.payload;

            return currentState;
        };


        // STATS REDUCERS
        case 'INCREMENT_INVALID_WORDS': {
            if (currentState.stats.invalidWords > 1) {
                currentState.stats.invalidWords = 0;

                return currentState;
            };

            currentState.stats.invalidWords += 1;

            return currentState;
        };

        case 'DETERMINE_POINTS': {
            const scoreMultipliers = ['X', 'Z', 'Q'];
            let multiplier = 0;

            const pointsMap = {5: 7, 6: 9, 7: 11, 8: 16, 9: 20, 10: 30, 11: 45, 12: 70, 13: 100, 14: 140, 15: 190, 16: 250};

            action.payload2.split('').forEach(letter => {
                if (scoreMultipliers.includes(letter)) {
                    multiplier += 1;
                    currentState.stats.goldMiner += 1;
                };
            });

            if (action.payload < 5) {
                currentState.stats.points += action.payload;
                currentState.stats.score += action.payload;
                currentState.stats.trackScore += action.payload;
            };

            if (action.payload > 4) {
                currentState.stats.points += pointsMap[action.payload];
                currentState.stats.score += pointsMap[action.payload];
                currentState.stats.trackScore += pointsMap[action.payload];
            };

            if (action.payload > 16) {
                currentState.stats.points += (action.payload * 20);
                currentState.stats.score += (action.payload * 20);
                currentState.stats.trackScore += (action.payload * 20);
            };

            if (multiplier > 0) {
                currentState.stats.points += action.payload *= multiplier;
                currentState.stats.score += action.payload *= multiplier;
                currentState.stats.trackScore += action.payload *= multiplier;
            };

            if (currentState.stats.trackScore >= 60) currentState.statuses.earnedVoid = true;

            return currentState;
        };

        case 'ADD_TO_SCORE': {
            currentState.stats.score += action.payload;
            currentState.stats.points += action.payload;
            currentState.stats.trackScore += action.payload;

            if (currentState.stats.trackScore >= 60) currentState.statuses.earnedVoid = true;

            return currentState;
        };

        case 'RESET_POINTS': {
            currentState.stats.points = 0;

            return currentState;
        };

        case 'INCREMENT_WORDS': {
            currentState.stats.words += 1;

            return currentState;
        };

        case 'SET_LONGEST_WORD': {
            if (action.payload.length > currentState.stats.longestWord.length) currentState.stats.longestWord = action.payload;

            return currentState;
        };

        case 'SET_DIFFICULTY': {
            currentState.stats.difficulty = action.payload;

            return currentState;
        };

        case 'RESET_STATS': {
            for (let key in currentState.stats) {
                if (key !== 'difficulty') {
                    if (key !== 'longestWord') currentState.stats[key] = 0;
                    else currentState.stats[key] = '';
                };
            };

            return currentState;
        };

        default: return currentState;
    };
};

export default gameReducer;