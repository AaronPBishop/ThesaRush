const initialState = {
    paused: false,
    loadOffer: false
};

export const setPaused = (boolean) => {
    return {
        type: 'SET_PAUSED',
        payload: boolean
    };
};

export const loadOffer = (boolean) => {
    return {
        type: 'LOAD_OFFER',
        payload: boolean
    };
};

export const resetStatuses = () => {
    return {
        type: 'RESET_STATUSES'
    };
};

const offerStatusesReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'SET_PAUSED': {
            currentState.paused = action.payload;

            return currentState;
        };

        case 'LOAD_OFFER': {
            currentState.loadOffer = action.payload;

            return currentState;
        };

        case 'RESET_STATUSES': return initialState;

        default: return currentState;
    };
};

export default offerStatusesReducer;