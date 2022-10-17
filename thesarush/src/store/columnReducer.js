const initialState = [];

export const addTile = (columnIndex) => {
    return {
        type: 'ADD_TILE',
        payload: columnIndex
    };
};

const columnReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'ADD_TILE': {
            currentState[action.payload] = action.payload;

            return currentState;
        };

        default: return currentState;
    };
};

export default columnReducer;