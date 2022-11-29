const initialState = {
    backgroundColor: 'rgb(0, 0, 0)'
};

export const setBackgroundColor = (color) => {
    return {
        type: 'SET_BACKGROUND_COLOR',
        payload: color
    };
};

const themeReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'SET_BACKGROUND_COLOR': {
            currentState.backgroundColor = action.payload;

            return currentState;
        };

        default: return currentState;
    };
};

export default themeReducer;