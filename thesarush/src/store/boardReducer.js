import { useSelector } from "react-redux";

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

export const resetBoard = () => {
    return {
        type: 'RESET_BOARD'
    };
};

const boardReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'ADD_COLUMN': {
            currentState[action.payload] = action.payload;

            return currentState;
        };

        case 'CLEAR_TILES': {
            for (let i = 0; i < action.payload.length; i++) {
                currentState[action.payload[i]] = null;
            };

            return currentState;
        };

        case 'RESET_BOARD': {
            return initialState;
        };

        default: return currentState;
    };
};

export default boardReducer;