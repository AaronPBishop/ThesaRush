const initialState = {};

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

const tilesReducer = (state = initialState, action) => {
    let currentState = { ...state };
    
    switch (action.type) {
        case 'SET_TILES': {
            currentState[action.payload] = action.payload;

            return currentState;
        };

        case 'REMOVE_TILE': {
            for (let key in currentState) {
                if (currentState[key][0] === action.payload[0] && currentState[key][1] === action.payload[1]) delete currentState[key];
            };

            return currentState;
        };

        case 'RESET_TILES': {
            for (let key in currentState) {
                delete currentState[key]
            };
            
            return currentState;
        };

        default: return currentState;
    };
};

export default tilesReducer;