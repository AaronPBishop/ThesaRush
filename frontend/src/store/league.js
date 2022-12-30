const initialState = {};

export const clearLeagueData = () => {
    return {
        type: 'CLEAR_LEAGUE_DATA'
    };
};

export const populateLeagueData = (players, leagueName) => {
    return {
        type: 'POPULATE_LEAGUE_DATA',
        payload1: players,
        payload2: leagueName
    };
};

export const fetchLeagueData = (leagueName) => async (dispatch) => {
    const fetchReq = await fetch(`/api/leagues/${leagueName}`, {
        method: 'GET'
    });

    const fetchJSON = await fetchReq.json();
    const leaderBoardData = fetchJSON;

    dispatch(populateLeagueData(leaderBoardData.players, leaderBoardData.league_name));
};

const leagueReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'POPULATE_LEAGUE_DATA': {
            const players = {};
            action.payload1.forEach(player => players[player.user_name] = player);

            const sorted = [];
            Object.keys(players).sort((a, b) => players[b].points - players[a].points)
                                .filter(name => name !== 'league')
                                .forEach(player => sorted.push(players[player]));

            currentState['players'] = sorted;
            currentState['league'] = action.payload2;

            return currentState;
        };

        case 'CLEAR_LEAGUE_DATA': return initialState;

        default: return currentState;
    };
};

export default leagueReducer;