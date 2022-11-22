import performSplice from "../functions/performSplice.js";
import insertColumnVal from "../functions/dropLetters.js";
import { insertRow } from "../functions/dropLetters.js";

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

export const dropRow = () => {
    return {
        type: 'DROP_ROW'
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

                currentState[col][row] = null;

                for (let j = currentState[col].length; j > 0; j--) {
                    if (j < row) {
                        if (currentState[col][j] !== null && currentState[col][j] !== undefined) {
                            if (currentState[col][j].type !== 'rearranged') {
                                currentState[col][j].type = 'rearranged';

                                continue;
                            };
                            
                            if (currentState[col][j].type === 'rearranged') {
                                currentState[col][j].type = 'unarranged';

                                continue;
                            };
                        };
                    };
                };
            };

            return currentState;
        };

        case 'REARRANGE_TILES': return performSplice(currentState);

        case 'DROP_LETTERS': return insertColumnVal(currentState);

        case 'DROP_ROW': return insertRow(currentState);

        case 'RESET_BOARD': return initialState;

        default: return currentState;
    };
};

export default boardReducer;