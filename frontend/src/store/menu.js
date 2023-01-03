const initialState = {
    backgroundColor: 'rgb(0, 0, 0)',
    clickedSignUp: false,
    clickedLogIn: false,
    clickedProfile: false,
    clickedLeague: false,
    clickedChallenges: false
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

export const setClickedProfile = (boolean) => {
    return {
        type: 'SET_CLICKED_PROFILE',
        payload: boolean
    };
};

export const setClickedLeague = (boolean) => {
    return {
        type: 'SET_CLICKED_LEAGUE',
        payload: boolean
    };
};

export const setClickedChallenges = (boolean) => {
    return {
        type: 'SET_CLICKED_CHALLENGES',
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

        case 'SET_CLICKED_PROFILE': {
            currentState.clickedProfile = action.payload;

            return currentState;
        };

        case 'SET_CLICKED_LEAGUE': {
            currentState.clickedLeague = action.payload;

            return currentState;
        };

        case 'SET_CLICKED_CHALLENGES': {
            currentState.clickedChallenges = action.payload;

            return currentState;
        };

        default: return currentState;
    };
};

export default menuReducer;