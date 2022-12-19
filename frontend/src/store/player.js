const initialState = {};

export const populatePlayerData = (playerData) => {
    return {
        type: 'POPULATE_PLAYER_DATA',
        payload: playerData
    };
};

export const fetchPlayerData = (id) => async (dispatch) => {
    const fetchReq = await fetch(`/users/${id}`, {
        method: 'GET'
    });

    const fetchJSON = await fetchReq.json();
    const playerData = fetchJSON;

    dispatch(populatePlayerData(playerData));
};


const playerReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'POPULATE_PLAYER_DATA': {
            const playerData = {};
            
            for (let key in action.payload) playerData[key] = action.payload[key];

            currentState[action.payload.user_id] = playerData;
            
            return currentState;
        };

        default: return currentState;
    };
};

export default playerReducer;