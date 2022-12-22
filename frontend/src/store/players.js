const initialState = {};

export const populatePlayerData = (playerData) => {
    return {
        type: 'POPULATE_PLAYER_DATA',
        payload: playerData
    };
};

export const fetchPlayerData = () => async (dispatch) => {
    const fetchReq = await fetch(`/users/all`, {
        method: 'GET'
    });

    const fetchJSON = await fetchReq.json();
    const playerData = fetchJSON;

    dispatch(populatePlayerData(playerData));
};


const playersReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'POPULATE_PLAYER_DATA': {
            for (let key in action.payload) currentState[key] = action.payload[key];

            return currentState;
        };

        default: return currentState;
    };
};

export default playersReducer;