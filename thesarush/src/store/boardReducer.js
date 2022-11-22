import performSplice from "../functions/performSplice.js";
import insertColumnVal from "../functions/dropLetters.js";

const initialState = [];

export const addColumn = (column) => {
    return {
        type: 'ADD_COLUMN',
        payload: column
    };
};

export const clearTiles = (tilePositions) => {
    return {
        type: 'CLEAR_TILES',
        payload: tilePositions
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

export const resetBoard = () => {
    return {
        type: 'RESET_BOARD'
    };
};

const boardReducer = (state = initialState, action) => {
    let currentState = [];
    for (let i = 0; i < state.length; i++) {
        let currCol = [ ...state[i] ];
        currentState.push(currCol);
    };

    switch (action.type) {
        case 'ADD_COLUMN': {
            currentState.push(action.payload)

            return currentState;
        };

        case 'CLEAR_TILES': {
            const values = Object.values(action.payload);
 
            for (let i = 0; i < values.length; i++) {
                const [col, row] = values[i];

                // Object.values(currentState)[col][row - 1].type = 'moved'
                Object.values(currentState)[col][row] = null;
            };

            return currentState;
        };

        case 'REARRANGE_TILES': return performSplice(currentState);

        case 'DROP_LETTERS': return insertColumnVal(currentState);

        case 'RESET_BOARD': return initialState;

        default: return currentState;
    };
};

export default boardReducer;