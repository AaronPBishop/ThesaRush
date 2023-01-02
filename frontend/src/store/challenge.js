const initialState = {
    inChallenge: false,
    completedChallenge: false,
    isChallenger: false,
    isChalengee: false,
    challengeId: null,
    senderId: null,
    receiverId: null,
    time: null
};


export const setInChallenge = (boolean, playerType) => {
    return {
        type: 'SET_IN_CHALLENGE',
        payload1: boolean,
        payload2: playerType
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

export const sendChallenge = (time, score, senderId, receiverId) => async () => {
    await fetch(`/api/challenges/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            time: time,
            score: score,
            senderId: senderId, 
            receiverId: receiverId,
        })
    });
};

export const updateChallenge = (challengeId, score) => async () => {
    await fetch(`/api/challenges/${challengeId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            score: score
        })
    });
};

const challengeReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'SET_IN_CHALLENGE': {
            currentState.inChallenge = action.payload1;
            
            if (action.payload2 === 'challenger') currentState.isChallenger = true;
            if (action.payload2 === 'chalengee') currentState.isChalengee = true;

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