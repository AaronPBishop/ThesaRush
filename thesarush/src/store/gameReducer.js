import performSplice from "../functions/performSplice.js";
import insertColumnVal from "../functions/dropLetters.js";
import { insertRow } from "../functions/dropLetters.js";

const initialState = {
    board: [],
    input: {},
    order: 0,
    tiles: {},
    finalTiles: {},
    cleared: false,
    submitted: false,
    tileDropped: false,
    stats: {
        invalidWords: 0,
        points: 0, 
        score: 0, 
        words: 0,
        longestWord: '',
        tilesCleared: 0,
        difficulty: undefined
    }
};

// BOARD ACTIONS
export const addColumn = (column) => {
    return {
        type: 'ADD_COLUMN',
        payload: column
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

export const dropLetters = () => {
    return {
        type: 'DROP_LETTERS'
    };
};

export const dropRow = () => {
    return {
        type: 'DROP_ROW'
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

export const setTileDropped = (boolean) => {
    return {
        type: 'SET_TILE_DROPPED',
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
        case 'ADD_COLUMN': {
            currentState.board.push(action.payload)

            return currentState;
        };

        case 'CLEAR_TILES': {
            const values = Object.values(currentState.finalTiles);

            if (values.length >= 8) {
                for (let i = 0; i < currentState.board.length; i++) {
                    const currColumn = currentState.board[i];

                    if (currColumn[currColumn.length - 1] !== null) {
                        currColumn[currColumn.length - 1] = null;
                        currentState.stats.tilesCleared += 1;

                        for (let j = currColumn.length - 1; j > 0; j--) {
                            if (currColumn[j] !== null && currColumn[j] !== undefined) {
                                if (currColumn[j].type !== 'rearranged') {
                                    currColumn[j].type = 'rearranged';
    
                                    continue;
                                };
                                
                                if (currColumn[j].type === 'rearranged') {
                                    currColumn[j].type = 'unarranged';
    
                                    continue;
                                };
                            };
                        };
                    }
                };
            };
 
            for (let i = 0; i < values.length; i++) {
                const [col, row] = values[i];

                if (currentState.board[col][row] !== null) {
                    currentState.board[col][row] = null;
                    currentState.stats.tilesCleared += 1;

                    for (let j = currentState.board[col].length; j > 0; j--) {
                        if (j < row) {
                            if (currentState.board[col][j] !== null && currentState.board[col][j] !== undefined) {
                                if (currentState.board[col][j].type !== 'rearranged') {
                                    currentState.board[col][j].type = 'rearranged';

                                    continue;
                                };

                                if (currentState.board[col][j].type === 'rearranged') {
                                    currentState.board[col][j].type = 'unarranged';

                                    continue;
                                };
                            };
                        };
                    };
                };
            };

            currentState.finalTiles = {};
            return currentState;
        };

        case 'REARRANGE_TILES': {
            currentState.board = performSplice(currentState.board);

            return currentState;
        };

        case 'DROP_LETTERS': {
            currentState.board = insertColumnVal(currentState.board);

            return currentState;
        };

        case 'DROP_ROW': {
            currentState.board = insertRow(currentState.board);

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
            currentState.cleared = action.payload;

            return currentState;
        };

        case 'SET_SUBMITTED': {
            currentState.submitted = action.payload;
            currentState.finalTiles = { ...currentState.tiles };

            return currentState;
        };

        case 'SET_TILE_DROPPED': {
            currentState.tileDropped = action.payload;

            return currentState;
        };

        case 'RESET_GAME': {
            for (let key in currentState) {
                if (currentState[key] !== 'board' && currentState[key] !== 'stats') currentState[key] = initialState[key];
            };

            currentState.board = [];
            
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

            const pointsMap = {5: 7, 6: 9, 7: 11, 8: 16, 9: 20};

            action.payload2.split('').forEach(letter => {if (scoreMultipliers.includes(letter)) multiplier += 1});

            if (action.payload < 5) {
                currentState.stats.points += action.payload;
                currentState.stats.score += action.payload;
            };

            if (action.payload > 4) {
                currentState.stats.points += pointsMap[action.payload];
                currentState.stats.score += pointsMap[action.payload];
            };

            if (action.payload > 9) {
                currentState.stats.points += (action.payload * 3);
                currentState.stats.score += (action.payload * 3);
            };

            if (multiplier > 0) {
                currentState.stats.points += action.payload *= multiplier;
                currentState.stats.score += action.payload *= multiplier;
            };

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