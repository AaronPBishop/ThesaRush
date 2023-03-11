const initialState = {
    backgroundColor: 'rgb(0, 0, 0)',
    backDrop: 'dynamic',
    clickedSignUp: false,
    clickedLogIn: false,
    clickedProfile: false,
    clickedLeague: false,
    clickedChallenges: false,
    clickedEditAccount: false,
    claimedPoints: false
};

export const setBackgroundColor = (color) => {
    return {
        type: 'SET_BACKGROUND_COLOR',
        payload: color
    };
};

export const setBackdropType = (type) => {
    return {
        type: 'SET_BACKDROP_TYPE',
        payload: type
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

export const setClickedEditAccount = (boolean) => {
    return {
        type: 'SET_CLICKED_EDIT_ACCOUNT',
        payload: boolean
    };
};

export const setClaimedPoints = (boolean) => {
    return {
        type: 'SET_CLAIMED_POINTS',
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

        case 'SET_BACKDROP_TYPE': {
            currentState.backDrop = action.payload;

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

        case 'SET_CLICKED_EDIT_ACCOUNT': {
            currentState.clickedEditAccount = action.payload;

            return currentState;
        };

        case 'SET_CLAIMED_POINTS': {
            currentState.claimedPoints = action.payload;

            return currentState;
        };

        default: return currentState;
    };
};

export default menuReducer;