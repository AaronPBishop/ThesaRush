const initialState = [];

export const addColumn = (column) => {
    return {
        type: 'ADD_COLUMN',
        payload: column
    };
};

const boardReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'ADD_COLUMN': {
            currentState[action.payload] = action.payload;

            return currentState;
        };

        default: return currentState;
    };
};

export default boardReducer;