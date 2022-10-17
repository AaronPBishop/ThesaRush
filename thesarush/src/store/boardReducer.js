const initialState = [];

export const resetBoard = () => {
    return {
        action: 'RESET_BOARD'
    };
};

const boardReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'RESET_BOARD': {
            return state;
        };

        default: return currentState;
    };
};

export default boardReducer;