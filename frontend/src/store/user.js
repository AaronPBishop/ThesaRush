const initialState = {};

// THUNK
export const fetchUser = (id) => async (dispatch) => {
    const fetchReq = await fetch(`/users/${id}`, {
        method: 'GET'
    });

    const fetchJSON = await fetchReq.json();
    const data = [fetchJSON];

    dispatch()
};

const userReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        default: return currentState;
    };
};

export default userReducer;