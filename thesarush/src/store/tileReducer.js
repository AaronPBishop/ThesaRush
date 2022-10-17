const initialState = null;

export const clearTile = (tileId) => {
    return {
        type: 'CLEAR_TILE',
        payload: tileId
    };
};

const tileReducer = (state = initialState, action) => {
    const currentState = state.slice('');
    
    switch (action.type) {
        case 'CLEAR_TILE': {
            currentState = null;

            return currentState;
        };

        default: return currentState;
    };
};

export default tileReducer;