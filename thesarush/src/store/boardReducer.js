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
    let currentState = { ...state };

    switch (action.type) {
        case 'ADD_COLUMN': {
            currentState[action.payload] = action.payload;

            return currentState;
        };

        case 'CLEAR_TILES': {
            const values = Object.values(action.payload);
 
            for (let i = 0; i < values.length; i++) {
                const [col, row] = values[i];
                Object.values(currentState)[col][row] = null;
            };

            return currentState;
        };

        case 'RESET_BOARD': {
            console.log('I was here')

            return initialState;
        };

        default: return currentState;
    };
};

export default boardReducer;