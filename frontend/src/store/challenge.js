const initialState = {
    inChallenge: false,
    completedChallenge: false,
    senderId: null,
    receiverId: null,
    time: null
};


export const setInChallenge = (boolean) => {
    return {
        type: 'SET_IN_CHALLENGE',
        payload: boolean
    };
};

export const populateChallengeData = (senderId, receiverId, time) => {
    return {
        type: 'POPULATE_CHALLENGE_DATA',
        payload1: senderId,
        payload2: receiverId,
        payload3: time
    };
};

export const setCompletedChallenge = (boolean) => {
    return {
        type: 'COMPLETED_CHALLENGE',
        payload: boolean
    };
};

export const resetChallengeState = () => {
    return {
        type: 'RESET_CHALLENGE_STATE'
    };
};

export const sendChallenge = (senderId, receiverId, time) => async () => {
    await fetch(`/api/challenges/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            senderId: senderId, 
            receiverId: receiverId,
            time: time
        })
    });
};

const challengeReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'SET_IN_CHALLENGE': {
            currentState.inChallenge = action.payload;

            return currentState;
        };

        case 'POPULATE_CHALLENGE_DATA': {
            currentState.senderId = action.payload1;
            currentState.receiverId = action.payload2;
            currentState.time = action.payload3;

            return currentState;
        };

        case 'COMPLETED_CHALLENGE': {
            currentState.completedChallenge = action.payload;

            return currentState;
        };

        case 'RESET_CHALLENGE_STATE': return initialState;

        default: return currentState;
    };
};

export default challengeReducer;