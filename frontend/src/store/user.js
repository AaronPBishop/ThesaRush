const initialState = {};

export const logInUser = (id, email) => {
    return {
        type: 'LOG_IN_USER',
        payload1: id,
        payload2: email
    };
};

export const populateUserData = (userData) => {
    return {
        type: 'POPULATE_USER_DATA',
        payload: userData
    };
};

// THUNKS
export const signUpUserThunk = (userName, email, password) => async (dispatch) => {
    const fetchReq = await fetch(`/users/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_name: userName, email, password})
    });

    const fetchJSON = await fetchReq.json();
    const data = [fetchJSON];

    dispatch(logInUser(data.id, email))
};


export const loginUserThunk = (email, password) => async (dispatch) => {
    const fetchReq = await fetch(`/users/${email}/${password}`, {
        method: 'GET'
    });

    const fetchJSON = await fetchReq.json();
    const data = [fetchJSON];

    dispatch(logInUser(data.id, email))
};


export const fetchUserData = (id) => async (dispatch) => {
    const fetchReq = await fetch(`/users/${id}`, {
        method: 'GET'
    });

    const fetchJSON = await fetchReq.json();
    const userData = [fetchJSON];

    dispatch(populateUserData(userData));
};


const userReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'LOG_IN_USER': {
            currentState['userId'] = action.payload1;
            currentState['userName'] = action.payload2;
            
            return currentState;
        };

        case 'POPULATE_USER_DATA': {
            action.payload.forEach(stat => currentState[stat] = stat);
            
            return currentState;
        };

        default: return currentState;
    };
};

export default userReducer;