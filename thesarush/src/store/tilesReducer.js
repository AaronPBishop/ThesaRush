const initialState = [];

export const setTiles = (tilePos) => {
    return {
        type: 'SET_TILES',
        payload: tilePos
    };
};

export const clearTile = (tilePos) => {
    return {
        type: 'CLEAR_TILE',
        payload: tilePos
    };
};

export const resetTiles = () => {
    return {
        type: 'RESET_TILES'
    };
};

const tilesReducer = (state = initialState, action) => {
    let currentState = { ...state };
    
    switch (action.type) {
        case 'SET_TILES': {
            currentState[action.payload] = action.payload;

            return currentState;
        };

        case 'CLEAR_TILE': {
            delete currentState[action.payload];

            return currentState;
        };

        case 'RESET_TILES': {
            return initialState;
        };

        default: return currentState;
    };
};

export default tilesReducer;