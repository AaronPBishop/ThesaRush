const initialState = [];

export const addColumn = (column) => {
    return {
        type: 'ADD_COLUMN',
        payload: column
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

        case 'RESET_BOARD': {
            return initialState;
        };

        default: return currentState;
    };
};

export default boardReducer;