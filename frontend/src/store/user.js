const initialState = {};

export const logInUser = (id) => {
    return {
        type: 'LOG_IN_USER',
        payload: id
    };
};

export const populateUserData = (userData) => {
    return {
        type: 'POPULATE_USER_DATA',
        payload: userData
    };
};

export const updateLives = (pointsBalance, lives) => {
    return {
        type: 'UPDATE_LIVES',
        payload1: pointsBalance,
        payload2: lives
    };
};

export const logOutUser = () => {
    return {
        type: 'LOG_OUT_USER'
    };
};

// THUNKS
export const signUpUserThunk = (userName, email, password) => async (dispatch) => {
    const fetchReq = await fetch(`/users/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_name: userName, 
            email: email, 
            password: password
        })
    });

    const fetchJSON = await fetchReq.json();
    const data = fetchJSON;

    dispatch(logInUser(data.id, email))
    dispatch(fetchUserData(data.id));
};


export const loginUserThunk = (email, password) => async (dispatch) => {
    const fetchReq = await fetch(`/users/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email, 
            password: password
        })
    });

    const fetchJSON = await fetchReq.json();
    const data = fetchJSON;

    dispatch(logInUser(data.id, email));
    dispatch(fetchUserData(data.id));
};


export const fetchUserData = (id) => async (dispatch) => {
    const fetchReq = await fetch(`/users/${id}`, {
        method: 'GET'
    });

    const fetchJSON = await fetchReq.json();
    const userData = fetchJSON;

    dispatch(populateUserData(userData));
};

export const updateUserData = (id, points, words, longestWord, tilesCleared, bombardier, stoneCrusher, goldMiner, wordSmith, voidMaster) => async (dispatch) => {
    const fetchReq = await fetch(`/users/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            points: points,
            words: words,
            longest_word: longestWord,
            tiles_cleared: tilesCleared,
            bombardier: bombardier,
            stone_crusher: stoneCrusher,
            gold_miner: goldMiner,
            word_smith: wordSmith,
            void_master: voidMaster
        })
    });

    const fetchJSON = await fetchReq.json();
    const userData = fetchJSON;

    dispatch(populateUserData(userData));
};

export const buyLife = (id) => async (dispatch) => {
    const fetchReq = await fetch(`/users/lives/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}
    });

    const fetchJSON = await fetchReq.json();
    const userData = fetchJSON;

    if (userData.status === 400) return;

    dispatch(updateLives(userData.points_balance, userData.lives));
};


const userReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'LOG_IN_USER': {
            currentState['user_id'] = action.payload1;
            
            return currentState;
        };

        case 'POPULATE_USER_DATA': {
            for (let key in action.payload) currentState[key] = action.payload[key];
            
            return currentState;
        };

        case 'UPDATE_LIVES': {
            currentState.points_balance = action.payload1;
            currentState.lives = action.payload2;
            
            return currentState;
        };

        case 'LOG_OUT_USER': return initialState;

        default: return currentState;
    };
};

export default userReducer;