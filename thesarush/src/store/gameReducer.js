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
    tileDropped: false
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
 
            for (let i = 0; i < values.length; i++) {
                const [col, row] = values[i];

                currentState.board[col][row] = null;

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
                if (currentState[key] !== 'board') currentState[key] = initialState[key];
            };

            currentState.board = [];
            
            return currentState;
        };

        default: return currentState;
    };
};

export default gameReducer;