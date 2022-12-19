const initialState = [];

export const populateLeaderBoard = (data) => {
    return {
        type: 'POPULATE_LEADERBOARD',
        payload: data
    };
};

export const fetchLeaderBoardData = () => async (dispatch) => {
    const fetchReq = await fetch(`/users/rankings`, {
        method: 'GET'
    });

    const fetchJSON = await fetchReq.json();
    const leaderBoardData = fetchJSON;

    dispatch(populateLeaderBoard(leaderBoardData));
};

const leaderBoardReducer = (state = initialState, action) => {
    const currentState = [ ...state ];

    switch (action.type) {
        case 'POPULATE_LEADERBOARD': {
            currentState.length = 0;
            console.log(action.payload)

            for (let score in action.payload) {
                const playerObj = {};

                playerObj[score] = action.payload[score][0];
                playerObj['id'] = action.payload[score][1];
                currentState.push(playerObj);
            };

            return currentState.reverse();
        };

        default: return currentState;
    };
};

export default leaderBoardReducer;