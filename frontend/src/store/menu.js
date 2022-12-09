const initialState = {
    backgroundColor: 'rgb(0, 0, 0)',
    clickedSignUp: false,
    clickedLogIn: false
};

export const setBackgroundColor = (color) => {
    return {
        type: 'SET_BACKGROUND_COLOR',
        payload: color
    };
};

export const setClickedSignUp = (boolean) => {
    return {
        type: 'SET_CLICKED_SIGN_UP',
        payload: boolean
    };
};

export const setClickedLogIn = (boolean) => {
    return {
        type: 'SET_CLICKED_LOG_IN',
        payload: boolean
    };
};

const menuReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'SET_BACKGROUND_COLOR': {
            currentState.backgroundColor = action.payload;

            return currentState;
        };

        case 'SET_CLICKED_SIGN_UP': {
            currentState.clickedSignUp = action.payload;

            return currentState;
        };

        case 'SET_CLICKED_LOG_IN': {
            currentState.clickedLogIn = action.payload;

            return currentState;
        };

        default: return currentState;
    };
};

export default menuReducer;