const initialState = {
    trophiesCopy: [],
    errors: []
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

export const copyTrophies = () => {
    return {
        type: 'COPY_TROPHIES'
    };
};

export const logOutUser = () => {
    return {
        type: 'LOG_OUT_USER'
    };
};

export const populateErrors = (errors) => {
    return {
        type: 'POPULATE_ERRORS',
        payload: errors
    };
};

export const clearErrors = () => {
    return {
        type: 'CLEAR_ERRORS'
    };
};


// THUNKS
export const authenticate = () => async (dispatch) => {
    const request = await fetch('/api/auth/', {
        headers: {'Content-Type': 'application/json'}
    });

    if (request.ok) {
        const response = await request.json();

        if (response.errors) return;

        dispatch(populateUserData(response));
    };
};


export const loginUserThunk = (email, password) => async (dispatch) => {
    const request = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_email: email, 
            password: password
        })
    });

    const response = await request.json();

    if (response.errors) {
        dispatch(populateErrors(response.errors));
        return;
    };

    if (request.ok) {
        dispatch(clearErrors());
        dispatch(fetchUserData(response.id));

        return null;
    };
};


export const signUpUserThunk = (userName, email, password) => async (dispatch) => {
    const request = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_name: userName, 
            user_email: email, 
            password: password
        })
    });

    const response = await request.json();

    if (response.errors) {
        dispatch(populateErrors(response.errors));
        return;
    };

    if (request.ok) {
        dispatch(clearErrors());
        dispatch(fetchUserData(response.id));

        return null;
    };
};


export const createRandomUser = () => async (dispatch) => {
    const request = await fetch(`/api/auth/signup/random`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
    });

    const response = await request.json();

    if (request.ok) {
        dispatch(fetchUserData(response.id));

        return null;
    };
};


export const logOutUserThunk = () => async (dispatch) => {
    await fetch(`/api/auth/logout`, {
        method: 'GET'
    });

    dispatch(logOutUser());
};


export const fetchUserData = (id) => async (dispatch) => {
    const request = await fetch(`/api/users/${id}`, {
        method: 'GET'
    });

    const response = await request.json();

    dispatch(populateUserData(response));
};


export const updateUserData = (id, highScore, points, words, longestWord, tilesCleared, bombardier, stoneCrusher, goldMiner, wordSmith, voidMaster) => async (dispatch) => {
    const request = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            high_score: highScore,
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

    const response = await request.json();

    dispatch(populateUserData(response));
};


export const editUserAccountInfo = (id, userName, email, password) => async (dispatch) => {
    const request = await fetch(`/api/users/edit/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_name: userName,
            user_email: email,
            password: password
        })
    });

    const response = await request.json();

    if (response.errors) {
        dispatch(populateErrors(response.errors));
        return;
    };

    if (response.ok) {
        dispatch(clearErrors());
        dispatch(populateUserData(response));
    };
};


export const deleteUserData = (id) => async (dispatch) => {
    await fetch(`/api/users/${id}`, {
        method: 'DELETE'
    });

    dispatch(logOutUser());
};


export const placeUserLeague = (id) => async (dispatch) => {
    const request = await fetch(`/api/users/place_league/${id}`, {
        method: 'GET'
    });

    const response = await request.json();

    dispatch(populateUserData(response));
};


export const spendPoints = (id, pointsToUse) => async (dispatch) => {
    const request = await fetch(`/api/users/points/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            points: pointsToUse
        })
    });

    const response = await request.json();

    dispatch(populateUserData(response));
};


export const incurrLoss = (id) => async (dispatch) => {
    const request = await fetch(`/api/users/loss/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}
    });

    const response = await request.json();

    dispatch(populateUserData(response));
};


export const buyLife = (id) => async (dispatch) => {
    const request = await fetch(`/api/users/lives/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}
    });

    const response = await request.json();

    if (response.status === 400) return;

    dispatch(updateLives(response.points_balance, response.lives));
};


export const spendLife = (id) => async (dispatch) => {
    const request = await fetch(`/api/users/lives/use/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}
    });

    const response = await request.json();

    dispatch(updateLives(response.points_balance, response.lives));
};


const userReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'POPULATE_USER_DATA': {
            for (let key in action.payload) currentState[key] = action.payload[key];
            
            return currentState;
        };

        case 'COPY_TROPHIES': {
            currentState.trophiesCopy = currentState.trophies;
            
            return currentState;
        };

        case 'UPDATE_LIVES': {
            currentState.points_balance = action.payload1;
            currentState.lives = action.payload2;
            
            return currentState;
        };

        case 'POPULATE_ERRORS': {
            currentState.errors = [];
            currentState.errors.push(action.payload);
            
            return currentState;
        };

        case 'CLEAR_ERRORS': {
            currentState.errors = [];
            
            return currentState;
        };

        case 'LOG_OUT_USER': return initialState;

        default: return currentState;
    };
};

export default userReducer;