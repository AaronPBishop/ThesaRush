const initialState = {};

export const populateLeaderBoard = (players, leagueName) => {
    return {
        type: 'POPULATE_LEADERBOARD',
        payload1: players,
        payload2: leagueName
    };
};

export const fetchLeaderBoardData = (leagueName) => async (dispatch) => {
    const fetchReq = await fetch(`/api/leagues/${leagueName}`, {
        method: 'GET'
    });

    const fetchJSON = await fetchReq.json();
    const leaderBoardData = fetchJSON;

    dispatch(populateLeaderBoard(leaderBoardData.players, leaderBoardData.league_name));
};

const leaderBoardReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'POPULATE_LEADERBOARD': {
            action.payload1.forEach(player => currentState[player.user_name] = player);
            currentState['league'] = action.payload2;

            return currentState;
        };

        default: return currentState;
    };
};

export default leaderBoardReducer;