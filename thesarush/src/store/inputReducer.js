const initialState = {};

export const setInput = (pos, valueArr) => {
    return {
        type: 'SET_INPUT',
        payload: pos,
        payload2: valueArr
    };
};

export const removeInputVal = (pos) => {
    return {
        type: 'REMOVE_INPUT_VAL',
        payload: pos
    };
};

export const resetInput = () => {
    return {
        type: 'RESET_INPUT'
    };
};

const inputReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'SET_INPUT': {
            if (currentState[action.payload] === undefined) currentState[action.payload] = action.payload2;

            return currentState;
        };

        case 'REMOVE_INPUT_VAL': {
            delete currentState[action.payload];

            return currentState;
        };

        case 'RESET_INPUT': {
            return initialState;
        };

        default: {
            return currentState;
        };
    };
};

export default inputReducer;